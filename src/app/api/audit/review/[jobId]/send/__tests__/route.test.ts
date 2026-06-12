import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { makeReviewToken } from '@/lib/audit/review-token';
import type { AuditJob } from '@/lib/audit/jobs';

const { getJobMock, updateJobMock, downloadMock } = vi.hoisted(() => ({
  getJobMock: vi.fn(),
  updateJobMock: vi.fn(),
  downloadMock: vi.fn(),
}));

vi.mock('@/lib/audit/jobs', () => ({
  getJob: getJobMock,
  updateJob: updateJobMock,
}));
// Le vrai supabaseAdmin throw sans env vars : fake storage injecté à la place.
vi.mock('@/lib/supabase/admin', () => ({
  supabaseAdmin: {
    storage: { from: () => ({ download: downloadMock }) },
  },
}));

import { POST } from '../route';

const SECRET = 'secret-review-test';
const JOB_ID = 'job-1';

function fakeJob(overrides: Partial<AuditJob> = {}): AuditJob {
  return {
    id: JOB_ID,
    leadId: null,
    email: 'client@example.fr',
    url: 'https://www.exemple.fr/',
    tier: 'pro',
    channel: 'inbound',
    status: 'ready_for_review',
    stripeSessionId: 'cs_test_1',
    workflowRunId: 'wrun_1',
    score: 62,
    impactPercent: 18,
    writerModel: 'google/gemini-3.5-flash',
    subject: null,
    html: null,
    pdfPath: 'pro/job-1/audit.pdf',
    driveUrl: null,
    error: null,
    reviewToken: null,
    createdAt: '2026-06-12T10:00:00Z',
    updatedAt: '2026-06-12T11:00:00Z',
    ...overrides,
  };
}

const PDF_BYTES = new TextEncoder().encode('%PDF-1.7 fake');

/** Fake du Blob renvoyé par storage.download : seul arrayBuffer() est utilisé. */
const pdfBlob = { arrayBuffer: async () => PDF_BYTES.buffer as ArrayBuffer };

function jsonRequest(token: string, accept?: string): NextRequest {
  return new NextRequest(`http://localhost/api/audit/review/${JOB_ID}/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(accept ? { Accept: accept } : {}) },
    body: JSON.stringify({ token }),
  });
}

function formRequest(token: string, accept = 'text/html,application/xhtml+xml'): NextRequest {
  return new NextRequest(`http://localhost/api/audit/review/${JOB_ID}/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: accept },
    body: new URLSearchParams({ token }).toString(),
  });
}

function ctx(jobId = JOB_ID): { params: Promise<{ jobId: string }> } {
  return { params: Promise.resolve({ jobId }) };
}

const fetchMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('AUDIT_REVIEW_SECRET', SECRET);
  vi.stubEnv('RESEND_API_KEY', 'rs_test_key');
  vi.stubEnv('AUDIT_FROM_EMAIL', 'audit@aurentia.fr');
  vi.stubGlobal('fetch', fetchMock);
  getJobMock.mockResolvedValue(fakeJob());
  updateJobMock.mockResolvedValue(undefined);
  downloadMock.mockResolvedValue({ data: pdfBlob, error: null });
  fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: 'email_1' }), { status: 200 }));
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('POST /api/audit/review/[jobId]/send : auth', () => {
  it('401 avec un token faux, sans toucher au job', async () => {
    const res = await POST(jsonRequest('deadbeef'), ctx());
    expect(res.status).toBe(401);
    expect(getJobMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("401 avec le token d'un autre job", async () => {
    const res = await POST(jsonRequest(makeReviewToken('job-2')), ctx());
    expect(res.status).toBe(401);
  });

  it('401 sans token dans le body', async () => {
    const req = new NextRequest(`http://localhost/api/audit/review/${JOB_ID}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const res = await POST(req, ctx());
    expect(res.status).toBe(401);
  });
});

describe('POST /api/audit/review/[jobId]/send : état du job', () => {
  it('404 si le job est inconnu', async () => {
    getJobMock.mockResolvedValue(null);
    const res = await POST(jsonRequest(makeReviewToken(JOB_ID)), ctx());
    expect(res.status).toBe(404);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('409 si déjà delivered (pas de double envoi)', async () => {
    getJobMock.mockResolvedValue(fakeJob({ status: 'delivered' }));
    const res = await POST(jsonRequest(makeReviewToken(JOB_ID)), ctx());
    expect(res.status).toBe(409);
    expect((await res.json()).error).toBe('already_sent');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(updateJobMock).not.toHaveBeenCalled();
  });

  it('409 si le job n\'est pas en ready_for_review', async () => {
    getJobMock.mockResolvedValue(fakeJob({ status: 'running' }));
    const res = await POST(jsonRequest(makeReviewToken(JOB_ID)), ctx());
    expect(res.status).toBe(409);
    expect((await res.json()).error).toBe('not_ready');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('POST /api/audit/review/[jobId]/send : nominal', () => {
  it('JSON : envoie le PDF en pièce jointe via Resend puis passe le job en delivered', async () => {
    const res = await POST(jsonRequest(makeReviewToken(JOB_ID)), ctx());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ sent: true });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [resendUrl, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(resendUrl).toBe('https://api.resend.com/emails');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer rs_test_key');

    const payload = JSON.parse(init.body as string) as {
      from: string;
      to: string[];
      subject: string;
      html: string;
      attachments: Array<{ filename: string; content: string }>;
    };
    expect(payload.to).toEqual(['client@example.fr']);
    expect(payload.from).toContain('audit@aurentia.fr');
    expect(payload.subject).toBe('Votre audit complet de exemple.fr');
    expect(payload.html).toContain('pièce jointe');
    expect(payload.html).toContain('cal.com');
    expect(payload.html).not.toContain('—'); // jamais de tiret long
    expect(payload.attachments).toEqual([
      { filename: 'audit-exemple.fr.pdf', content: Buffer.from(PDF_BYTES).toString('base64') },
    ]);

    expect(updateJobMock).toHaveBeenCalledWith(JOB_ID, { status: 'delivered' });
  });

  it('formulaire HTML : 303 vers la page de review après envoi', async () => {
    const token = makeReviewToken(JOB_ID);
    const res = await POST(formRequest(token), ctx());
    expect(res.status).toBe(303);
    expect(res.headers.get('location')).toBe(`http://localhost/audit/review/${JOB_ID}?token=${token}`);
    expect(updateJobMock).toHaveBeenCalledWith(JOB_ID, { status: 'delivered' });
  });
});

describe('POST /api/audit/review/[jobId]/send : échecs sans changement de statut', () => {
  it('502 si Resend répond en erreur : statut intact', async () => {
    fetchMock.mockResolvedValue(new Response('boom', { status: 500 }));
    const res = await POST(jsonRequest(makeReviewToken(JOB_ID)), ctx());
    expect(res.status).toBe(502);
    expect(updateJobMock).not.toHaveBeenCalled();
  });

  it('502 si fetch Resend rejette (réseau) : statut intact', async () => {
    fetchMock.mockRejectedValue(new Error('ECONNRESET'));
    const res = await POST(jsonRequest(makeReviewToken(JOB_ID)), ctx());
    expect(res.status).toBe(502);
    expect(updateJobMock).not.toHaveBeenCalled();
  });

  it('502 si le téléchargement du PDF échoue : Resend jamais appelé, statut intact', async () => {
    downloadMock.mockResolvedValue({ data: null, error: { message: 'Object not found' } });
    const res = await POST(jsonRequest(makeReviewToken(JOB_ID)), ctx());
    expect(res.status).toBe(502);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(updateJobMock).not.toHaveBeenCalled();
  });

  it('502 si RESEND_API_KEY absente : statut intact', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const res = await POST(jsonRequest(makeReviewToken(JOB_ID)), ctx());
    expect(res.status).toBe(502);
    expect(updateJobMock).not.toHaveBeenCalled();
  });
});
