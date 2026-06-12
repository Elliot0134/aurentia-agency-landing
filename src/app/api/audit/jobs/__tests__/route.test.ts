import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { UnsafeUrlError } from '@/lib/audit/url-safety';
import type { AuditJob } from '@/lib/audit/jobs';

const { startMock, createJobMock, getJobMock, updateJobMock, listArchivableProJobsMock, assertSafeUrlMock, signedPdfUrlMock } =
  vi.hoisted(() => ({
    startMock: vi.fn(),
    createJobMock: vi.fn(),
    getJobMock: vi.fn(),
    updateJobMock: vi.fn(),
    listArchivableProJobsMock: vi.fn(),
    assertSafeUrlMock: vi.fn(),
    signedPdfUrlMock: vi.fn(),
  }));

vi.mock('workflow/api', () => ({ start: startMock }));
vi.mock('@/lib/audit/jobs', () => ({
  createJob: createJobMock,
  getJob: getJobMock,
  updateJob: updateJobMock,
  listArchivableProJobs: listArchivableProJobsMock,
}));
// Le helper réel signe via supabaseAdmin.storage (réseau) : mocké ici.
vi.mock('@/lib/audit/pdf-url', () => ({ signedPdfUrl: signedPdfUrlMock }));
// Les workflows réels tirent tout le moteur (sharp, stripe...) : inutile ici,
// la route ne fait que les passer à start() qui est mocké.
vi.mock('@/workflows/audit-workflows', () => ({
  flashAuditWorkflow: vi.fn(),
  proAuditWorkflow: vi.fn(),
}));
vi.mock('@/lib/audit/url-safety', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/audit/url-safety')>();
  return { ...actual, assertSafeUrl: assertSafeUrlMock };
});

import { POST, GET, PATCH } from '../route';
import { flashAuditWorkflow, proAuditWorkflow } from '@/workflows/audit-workflows';

const SECRET = 'secret-jobs-test';

function fakeJob(overrides: Partial<AuditJob> = {}): AuditJob {
  return {
    id: 'job-1',
    leadId: null,
    email: 'prospect@example.fr',
    url: 'https://exemple.fr/',
    tier: 'flash',
    channel: 'inbound',
    status: 'queued',
    stripeSessionId: null,
    workflowRunId: null,
    score: null,
    impactPercent: null,
    writerModel: null,
    subject: null,
    html: null,
    pdfPath: null,
    driveUrl: null,
    error: null,
    reviewToken: null,
    createdAt: '2026-06-12T10:00:00Z',
    updatedAt: '2026-06-12T10:00:00Z',
    ...overrides,
  };
}

function postRequest(body: unknown, secret?: string): NextRequest {
  return new NextRequest('http://localhost/api/audit/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret !== undefined ? { 'x-audit-secret': secret } : {}),
    },
    body: JSON.stringify(body),
  });
}

function getRequest(query: string, secret?: string): NextRequest {
  return new NextRequest(`http://localhost/api/audit/jobs${query}`, {
    method: 'GET',
    headers: secret !== undefined ? { 'x-audit-secret': secret } : {},
  });
}

function patchRequest(query: string, body: unknown, secret?: string): NextRequest {
  return new NextRequest(`http://localhost/api/audit/jobs${query}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(secret !== undefined ? { 'x-audit-secret': secret } : {}),
    },
    body: JSON.stringify(body),
  });
}

const validBody = { url: 'https://exemple.fr', email: 'prospect@example.fr', tier: 'flash' };

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('AUDIT_JOBS_SECRET', SECRET);
  assertSafeUrlMock.mockResolvedValue(new URL('https://exemple.fr/'));
  createJobMock.mockResolvedValue(fakeJob());
  updateJobMock.mockResolvedValue(undefined);
  startMock.mockResolvedValue({ runId: 'wrun_1' });
  listArchivableProJobsMock.mockResolvedValue([]);
  signedPdfUrlMock.mockResolvedValue('https://supabase.example/sign/audit-pdfs/x?token=abc');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('POST /api/audit/jobs : auth', () => {
  it('401 sans header x-audit-secret', async () => {
    const res = await POST(postRequest(validBody));
    expect(res.status).toBe(401);
    expect(createJobMock).not.toHaveBeenCalled();
    expect(startMock).not.toHaveBeenCalled();
  });

  it('401 avec un mauvais secret', async () => {
    const res = await POST(postRequest(validBody, 'mauvais'));
    expect(res.status).toBe(401);
  });

  it("401 systématique si l'env AUDIT_JOBS_SECRET est absente (endpoint fermé)", async () => {
    vi.stubEnv('AUDIT_JOBS_SECRET', '');
    const res = await POST(postRequest(validBody, ''));
    expect(res.status).toBe(401);
  });
});

describe('POST /api/audit/jobs : validation', () => {
  it('400 sur body invalide (email malformé)', async () => {
    const res = await POST(postRequest({ ...validBody, email: 'pas-un-email' }, SECRET));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('invalid_body');
  });

  it('400 sur tier inconnu', async () => {
    const res = await POST(postRequest({ ...validBody, tier: 'platine' }, SECRET));
    expect(res.status).toBe(400);
  });

  it('400 sur URL refusée par la garde anti-SSRF', async () => {
    assertSafeUrlMock.mockRejectedValue(new UnsafeUrlError('IP privée interdite : 10.0.0.1'));
    const res = await POST(postRequest(validBody, SECRET));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('unsafe_url');
    expect(createJobMock).not.toHaveBeenCalled();
  });
});

describe('POST /api/audit/jobs : nominal', () => {
  it("202 : crée le job, lance flashAuditWorkflow, stocke le workflow_run_id", async () => {
    const res = await POST(
      postRequest({ url: 'exemple.fr', email: 'Prospect@Example.fr', tier: 'flash', channel: 'cold' }, SECRET),
    );
    expect(res.status).toBe(202);
    expect(await res.json()).toEqual({ jobId: 'job-1' });

    // URL normalisée par assertSafeUrl + email normalisé.
    expect(createJobMock).toHaveBeenCalledWith({
      email: 'prospect@example.fr',
      url: 'https://exemple.fr/',
      tier: 'flash',
      channel: 'cold',
    });
    expect(startMock).toHaveBeenCalledWith(flashAuditWorkflow, ['job-1']);
    expect(updateJobMock).toHaveBeenCalledWith('job-1', { workflowRunId: 'wrun_1' });
  });

  it('202 : tier pro → proAuditWorkflow, channel par défaut inbound', async () => {
    createJobMock.mockResolvedValue(fakeJob({ id: 'job-2', tier: 'pro' }));
    const res = await POST(postRequest({ ...validBody, tier: 'pro' }, SECRET));
    expect(res.status).toBe(202);
    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ tier: 'pro', channel: 'inbound' }));
    expect(startMock).toHaveBeenCalledWith(proAuditWorkflow, ['job-2']);
  });

  it('500 si start() échoue (job créé mais workflow non lancé)', async () => {
    startMock.mockRejectedValue(new Error('queue down'));
    const res = await POST(postRequest(validBody, SECRET));
    expect(res.status).toBe(500);
  });
});

describe('GET /api/audit/jobs', () => {
  it('401 sans secret', async () => {
    const res = await GET(getRequest('?id=job-1'));
    expect(res.status).toBe(401);
  });

  it('400 sans id', async () => {
    const res = await GET(getRequest('', SECRET));
    expect(res.status).toBe(400);
  });

  it('404 si le job est inconnu', async () => {
    getJobMock.mockResolvedValue(null);
    const res = await GET(getRequest('?id=inconnu', SECRET));
    expect(res.status).toBe(404);
  });

  it('200 : renvoie le job complet (polling n8n du HTML cold)', async () => {
    const job = fakeJob({ status: 'ready_to_send', html: '<html>flash</html>', subject: 'Votre pré-audit' });
    getJobMock.mockResolvedValue(job);
    const res = await GET(getRequest('?id=job-1', SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(job);
    expect(signedPdfUrlMock).not.toHaveBeenCalled();
  });

  it('200 : ajoute pdfUrl (URL signée 30 min) quand le job a un pdf_path', async () => {
    const job = fakeJob({ tier: 'pro', status: 'delivered', pdfPath: 'pro/job-1/audit.pdf' });
    getJobMock.mockResolvedValue(job);
    const res = await GET(getRequest('?id=job-1', SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ...job, pdfUrl: 'https://supabase.example/sign/audit-pdfs/x?token=abc' });
    expect(signedPdfUrlMock).toHaveBeenCalledWith('pro/job-1/audit.pdf', 1800);
  });
});

describe('GET /api/audit/jobs : mode liste (archivage Drive n8n)', () => {
  const LIST_QUERY = '?status=delivered&tier=pro&archived=false';

  it('200 : renvoie les jobs delivered pro non archivés, projetés avec pdfUrl signée', async () => {
    listArchivableProJobsMock.mockResolvedValue([
      fakeJob({
        id: 'job-pro-1',
        leadId: 'recAirtable1',
        tier: 'pro',
        status: 'delivered',
        pdfPath: 'pro/job-pro-1/audit.pdf',
        score: 58,
        html: '<html>ne doit pas fuiter dans la liste</html>',
      }),
    ]);
    const res = await GET(getRequest(`${LIST_QUERY}&limit=5`, SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      jobs: [
        {
          id: 'job-pro-1',
          leadId: 'recAirtable1',
          email: 'prospect@example.fr',
          url: 'https://exemple.fr/',
          pdfPath: 'pro/job-pro-1/audit.pdf',
          score: 58,
          pdfUrl: 'https://supabase.example/sign/audit-pdfs/x?token=abc',
        },
      ],
    });
    expect(listArchivableProJobsMock).toHaveBeenCalledWith(5);
    expect(signedPdfUrlMock).toHaveBeenCalledWith('pro/job-pro-1/audit.pdf', 1800);
  });

  it('200 : limit par défaut 20, liste vide quand rien à archiver', async () => {
    const res = await GET(getRequest(LIST_QUERY, SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ jobs: [] });
    expect(listArchivableProJobsMock).toHaveBeenCalledWith(20);
  });

  it('400 si les filtres ne sont pas exactement status=delivered&tier=pro&archived=false', async () => {
    const res = await GET(getRequest('?status=delivered&tier=pro&archived=true', SECRET));
    expect(res.status).toBe(400);
    expect(listArchivableProJobsMock).not.toHaveBeenCalled();
  });

  it('401 sans secret', async () => {
    const res = await GET(getRequest(LIST_QUERY));
    expect(res.status).toBe(401);
  });
});

describe('PATCH /api/audit/jobs?id= (drive_url)', () => {
  const driveUrl = 'https://drive.google.com/file/d/abc123/view';

  it('401 sans secret', async () => {
    const res = await PATCH(patchRequest('?id=job-1', { driveUrl }));
    expect(res.status).toBe(401);
    expect(updateJobMock).not.toHaveBeenCalled();
  });

  it('400 sans id', async () => {
    const res = await PATCH(patchRequest('', { driveUrl }, SECRET));
    expect(res.status).toBe(400);
  });

  it('400 si driveUrl n’est pas une URL', async () => {
    getJobMock.mockResolvedValue(fakeJob({ status: 'delivered' }));
    const res = await PATCH(patchRequest('?id=job-1', { driveUrl: 'pas-une-url' }, SECRET));
    expect(res.status).toBe(400);
    expect(updateJobMock).not.toHaveBeenCalled();
  });

  it('404 si le job est inconnu', async () => {
    getJobMock.mockResolvedValue(null);
    const res = await PATCH(patchRequest('?id=inconnu', { driveUrl }, SECRET));
    expect(res.status).toBe(404);
    expect(updateJobMock).not.toHaveBeenCalled();
  });

  it('404 si le job n’est pas delivered (on n’archive jamais un job non livré)', async () => {
    getJobMock.mockResolvedValue(fakeJob({ status: 'ready_for_review', tier: 'pro' }));
    const res = await PATCH(patchRequest('?id=job-1', { driveUrl }, SECRET));
    expect(res.status).toBe(404);
    expect(updateJobMock).not.toHaveBeenCalled();
  });

  it('200 nominal : set drive_url sur un job delivered', async () => {
    getJobMock.mockResolvedValue(fakeJob({ tier: 'pro', status: 'delivered', pdfPath: 'pro/job-1/audit.pdf' }));
    const res = await PATCH(patchRequest('?id=job-1', { driveUrl }, SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: 'job-1', driveUrl });
    expect(updateJobMock).toHaveBeenCalledWith('job-1', { driveUrl });
  });

  it('200 idempotent : re-PATCH écrase un drive_url déjà posé', async () => {
    getJobMock.mockResolvedValue(
      fakeJob({ tier: 'pro', status: 'delivered', driveUrl: 'https://drive.google.com/file/d/ancien/view' }),
    );
    const res = await PATCH(patchRequest('?id=job-1', { driveUrl }, SECRET));
    expect(res.status).toBe(200);
    expect(updateJobMock).toHaveBeenCalledWith('job-1', { driveUrl });
  });
});
