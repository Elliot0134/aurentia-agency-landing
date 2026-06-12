import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { UnsafeUrlError } from '@/lib/audit/url-safety';
import type { ProspectionLead } from '@/lib/prospection/db';

const {
  startMock,
  createJobMock,
  updateJobMock,
  findActiveFlashJobByLeadIdMock,
  assertSafeUrlMock,
  getConfigMock,
  listLeadsByStatusMock,
  updateLeadMock,
} = vi.hoisted(() => ({
  startMock: vi.fn(),
  createJobMock: vi.fn(),
  updateJobMock: vi.fn(),
  findActiveFlashJobByLeadIdMock: vi.fn(),
  assertSafeUrlMock: vi.fn(),
  getConfigMock: vi.fn(),
  listLeadsByStatusMock: vi.fn(),
  updateLeadMock: vi.fn(),
}));

vi.mock('workflow/api', () => ({ start: startMock }));
vi.mock('@/lib/audit/jobs', () => ({
  createJob: createJobMock,
  updateJob: updateJobMock,
  findActiveFlashJobByLeadId: findActiveFlashJobByLeadIdMock,
}));
vi.mock('@/workflows/audit-workflows', () => ({ flashAuditWorkflow: vi.fn() }));
vi.mock('@/lib/audit/url-safety', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/audit/url-safety')>();
  return { ...actual, assertSafeUrl: assertSafeUrlMock };
});
vi.mock('@/lib/prospection/db', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/prospection/db')>();
  return { ...actual, getConfig: getConfigMock, listLeadsByStatus: listLeadsByStatusMock, updateLead: updateLeadMock };
});

import { POST } from '../route';
import { flashAuditWorkflow } from '@/workflows/audit-workflows';

const SECRET = 'secret-prospection-test';

let leadSeq = 0;
function fakeLead(overrides: Partial<ProspectionLead> = {}): ProspectionLead {
  leadSeq += 1;
  return {
    id: `lead-${leadSeq}`,
    source: 'outbound',
    entreprise: 'Test SARL',
    contactName: 'Jean Test',
    email: `lead${leadSeq}@exemple.fr`,
    phone: null,
    siteUrl: 'https://exemple.fr',
    nicheId: null,
    phase: 'pre_audit',
    statutFunnel: 'nouveau',
    gmailThreadId: null,
    notionPageId: null,
    assignedTo: null,
    statutHumain: null,
    notes: null,
    optOut: false,
    bounce: false,
    createdAt: '2026-06-01T08:00:00Z',
    updatedAt: '2026-06-01T08:00:00Z',
    ...overrides,
  };
}

function request(body: unknown, token?: string): NextRequest {
  return new NextRequest('http://localhost/api/prospection/intake/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token !== undefined ? { 'x-webhook-token': token } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  leadSeq = 0;
  vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
  getConfigMock.mockResolvedValue(false); // sequences_paused = false
  listLeadsByStatusMock.mockResolvedValue([]);
  assertSafeUrlMock.mockImplementation(async (url: string) => new URL(url));
  let jobSeq = 0;
  createJobMock.mockImplementation(async () => ({ id: `job-${++jobSeq}` }));
  findActiveFlashJobByLeadIdMock.mockResolvedValue(null);
  updateJobMock.mockResolvedValue(undefined);
  updateLeadMock.mockResolvedValue(undefined);
  startMock.mockResolvedValue({ runId: 'wrun_1' });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('POST /api/prospection/intake/run : auth', () => {
  it('503 si PROSPECTION_API_SECRET absente (endpoint fermé)', async () => {
    vi.stubEnv('PROSPECTION_API_SECRET', '');
    const res = await POST(request({}, ''));
    expect(res.status).toBe(503);
    expect(createJobMock).not.toHaveBeenCalled();
  });

  it('401 sans header x-webhook-token ou mauvais token', async () => {
    expect((await POST(request({}))).status).toBe(401);
    expect((await POST(request({}, 'mauvais'))).status).toBe(401);
  });
});

describe('POST /api/prospection/intake/run : validation', () => {
  it('400 sur limit invalide', async () => {
    const res = await POST(request({ limit: 0 }, SECRET));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('invalid_body');
  });

  it('body vide accepté (limit par défaut 5)', async () => {
    const res = await POST(request(undefined, SECRET));
    expect(res.status).toBe(200);
  });
});

describe('POST /api/prospection/intake/run : kill switch', () => {
  it('sequences_paused=true → 200 { started: [], paused: true }, aucun job', async () => {
    getConfigMock.mockResolvedValue(true);
    listLeadsByStatusMock.mockResolvedValue([fakeLead()]);
    const res = await POST(request({}, SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ started: [], skipped: [], paused: true });
    expect(createJobMock).not.toHaveBeenCalled();
    expect(startMock).not.toHaveBeenCalled();
  });

  it('fail-closed : clé absente (null) = pause', async () => {
    getConfigMock.mockResolvedValue(null);
    const res = await POST(request({}, SECRET));
    expect((await res.json()).paused).toBe(true);
  });
});

describe('POST /api/prospection/intake/run : nominal', () => {
  it('cold (outbound) : job flash channel=cold avec leadId, lead reste nouveau (n8n confirmera)', async () => {
    const lead = fakeLead({ source: 'outbound' });
    listLeadsByStatusMock.mockResolvedValue([lead]);
    const res = await POST(request({}, SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ started: [{ leadId: lead.id, jobId: 'job-1' }], skipped: [] });
    expect(listLeadsByStatusMock).toHaveBeenCalledWith(['nouveau']);
    expect(createJobMock).toHaveBeenCalledWith({
      email: lead.email,
      url: 'https://exemple.fr/',
      tier: 'flash',
      channel: 'cold',
      leadId: lead.id,
    });
    expect(startMock).toHaveBeenCalledWith(flashAuditWorkflow, ['job-1']);
    expect(updateJobMock).toHaveBeenCalledWith('job-1', { workflowRunId: 'wrun_1' });
    // Cold : PAS de transition de statut ici, /touches/confirm s'en charge.
    expect(updateLeadMock).not.toHaveBeenCalled();
  });

  it('inbound : envoi auto par le workflow → lead passe en flash_envoye', async () => {
    const lead = fakeLead({ source: 'inbound' });
    listLeadsByStatusMock.mockResolvedValue([lead]);
    const res = await POST(request({}, SECRET));
    expect(res.status).toBe(200);
    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ channel: 'inbound', leadId: lead.id }));
    expect(updateLeadMock).toHaveBeenCalledWith(lead.id, { statutFunnel: 'flash_envoye' });
  });

  it('respecte limit, traite séquentiellement dans l’ordre', async () => {
    const leads = [fakeLead(), fakeLead(), fakeLead()];
    listLeadsByStatusMock.mockResolvedValue(leads);
    const res = await POST(request({ limit: 2 }, SECRET));
    const json = await res.json();
    expect(json.started).toHaveLength(2);
    expect(json.started.map((s: { leadId: string }) => s.leadId)).toEqual([leads[0].id, leads[1].id]);
    expect(createJobMock).toHaveBeenCalledTimes(2);
  });

  it('skip : opt_out, site_url manquant', async () => {
    const optOut = fakeLead({ optOut: true });
    const noSite = fakeLead({ siteUrl: null });
    const ok = fakeLead();
    listLeadsByStatusMock.mockResolvedValue([optOut, noSite, ok]);
    const res = await POST(request({}, SECRET));
    const json = await res.json();
    expect(json.started).toEqual([{ leadId: ok.id, jobId: 'job-1' }]);
    expect(json.skipped).toEqual([
      { leadId: optOut.id, reason: 'opt_out' },
      { leadId: noSite.id, reason: 'missing_site_url' },
    ]);
  });

  it('skip unsafe_url : la garde anti-SSRF écarte le lead sans bloquer les suivants', async () => {
    const bad = fakeLead({ siteUrl: 'http://10.0.0.1' });
    const ok = fakeLead();
    listLeadsByStatusMock.mockResolvedValue([bad, ok]);
    assertSafeUrlMock.mockImplementation(async (url: string) => {
      if (url.includes('10.0.0.1')) throw new UnsafeUrlError('IP privée interdite');
      return new URL(url);
    });
    const res = await POST(request({}, SECRET));
    const json = await res.json();
    expect(json.started).toEqual([{ leadId: ok.id, jobId: 'job-1' }]);
    expect(json.skipped).toEqual([{ leadId: bad.id, reason: 'unsafe_url:IP privée interdite' }]);
  });

  it('garde anti-doublon : un job flash actif (queued) pour le lead → skip flash_job_exists, aucun nouveau job', async () => {
    const dejaEnCours = fakeLead();
    const ok = fakeLead();
    listLeadsByStatusMock.mockResolvedValue([dejaEnCours, ok]);
    findActiveFlashJobByLeadIdMock.mockImplementation(async (leadId: string) =>
      leadId === dejaEnCours.id ? { id: 'job-actif', status: 'queued' } : null,
    );
    const res = await POST(request({}, SECRET));
    const json = await res.json();
    expect(json.skipped).toEqual([{ leadId: dejaEnCours.id, reason: 'flash_job_exists' }]);
    expect(json.started).toEqual([{ leadId: ok.id, jobId: 'job-1' }]);
    expect(createJobMock).toHaveBeenCalledTimes(1);
    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ leadId: ok.id }));
    // Lead skippé : ni workflow lancé pour lui, ni transition de statut.
    expect(startMock).toHaveBeenCalledTimes(1);
    expect(updateLeadMock).not.toHaveBeenCalled();
  });

  it('un job flash failed antérieur ne bloque pas : le helper renvoie null → nouveau job créé (retry légitime)', async () => {
    const lead = fakeLead();
    listLeadsByStatusMock.mockResolvedValue([lead]);
    // findActiveFlashJobByLeadId ne matche que les statuts actifs : pour un
    // lead dont le seul job est failed/refunded, il renvoie null.
    findActiveFlashJobByLeadIdMock.mockResolvedValue(null);
    const res = await POST(request({}, SECRET));
    const json = await res.json();
    expect(findActiveFlashJobByLeadIdMock).toHaveBeenCalledWith(lead.id);
    expect(json.started).toEqual([{ leadId: lead.id, jobId: 'job-1' }]);
    expect(json.skipped).toEqual([]);
  });

  it("un échec de création de job n'empêche pas les leads suivants", async () => {
    const fail = fakeLead();
    const ok = fakeLead();
    listLeadsByStatusMock.mockResolvedValue([fail, ok]);
    createJobMock
      .mockRejectedValueOnce(new Error('db down'))
      .mockResolvedValueOnce({ id: 'job-ok' });
    const res = await POST(request({}, SECRET));
    const json = await res.json();
    expect(json.started).toEqual([{ leadId: ok.id, jobId: 'job-ok' }]);
    expect(json.skipped).toEqual([{ leadId: fail.id, reason: 'error:db down' }]);
  });
});
