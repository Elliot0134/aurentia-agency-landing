import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { UnsafeUrlError } from '@/lib/audit/url-safety';

const { startMock, createJobMock, updateJobMock, getLeadByIdMock, assertSafeUrlMock, postSlackMock } = vi.hoisted(
  () => ({
    startMock: vi.fn(),
    createJobMock: vi.fn(),
    updateJobMock: vi.fn(),
    getLeadByIdMock: vi.fn(),
    assertSafeUrlMock: vi.fn(),
    postSlackMock: vi.fn(),
  }),
);

vi.mock('workflow/api', () => ({ start: startMock }));
vi.mock('@/workflows/audit-workflows', () => ({ proAuditWorkflow: vi.fn(), flashAuditWorkflow: vi.fn() }));
vi.mock('@/lib/audit/jobs', () => ({ createJob: createJobMock, updateJob: updateJobMock }));
vi.mock('@/lib/prospection/db', () => ({ getLeadById: getLeadByIdMock }));
vi.mock('@/lib/audit/url-safety', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/audit/url-safety')>();
  return { ...actual, assertSafeUrl: assertSafeUrlMock };
});
// requireWebhookToken réel (on teste l'auth) ; postSlack mocké (pas de réseau).
vi.mock('@/lib/prospection/api-auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/prospection/api-auth')>();
  return { ...actual, postSlack: postSlackMock };
});

import { POST } from '../route';
import { proAuditWorkflow } from '@/workflows/audit-workflows';

const SECRET = 'prospection-secret-test';

function req(body: unknown, token: string | null = SECRET): NextRequest {
  return new NextRequest('https://www.aurentia.agency/api/prospection/pro/launch', {
    method: 'POST',
    headers: token !== null ? { 'content-type': 'application/json', 'x-webhook-token': token } : { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/prospection/pro/launch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
    getLeadByIdMock.mockResolvedValue({ id: 'recABC', email: 'client@exemple.fr', siteUrl: 'https://exemple.fr/' });
    assertSafeUrlMock.mockResolvedValue(new URL('https://exemple.fr/'));
    createJobMock.mockResolvedValue({ id: 'job-pro-9' });
    startMock.mockResolvedValue({ runId: 'wrun_pro_9' });
    updateJobMock.mockResolvedValue(undefined);
  });
  afterEach(() => vi.unstubAllEnvs());

  it('lance un job Pro pour le lead et démarre le workflow', async () => {
    const res = await POST(req({ leadId: 'recABC' }));
    expect(res.status).toBe(202);
    await expect(res.json()).resolves.toEqual({ jobId: 'job-pro-9' });
    expect(createJobMock).toHaveBeenCalledWith({
      email: 'client@exemple.fr',
      url: 'https://exemple.fr/',
      tier: 'pro',
      channel: 'inbound',
      leadId: 'recABC',
    });
    expect(startMock).toHaveBeenCalledWith(proAuditWorkflow, ['job-pro-9']);
    expect(updateJobMock).toHaveBeenCalledWith('job-pro-9', { workflowRunId: 'wrun_pro_9' });
  });

  it('401 sans token valide', async () => {
    const res = await POST(req({ leadId: 'recABC' }, 'mauvais'));
    expect(res.status).toBe(401);
    expect(createJobMock).not.toHaveBeenCalled();
  });

  it('503 si le secret n’est pas configuré (endpoint fermé)', async () => {
    vi.stubEnv('PROSPECTION_API_SECRET', '');
    const res = await POST(req({ leadId: 'recABC' }));
    expect(res.status).toBe(503);
  });

  it('404 si le lead est introuvable', async () => {
    getLeadByIdMock.mockResolvedValue(null);
    const res = await POST(req({ leadId: 'recXXX' }));
    expect(res.status).toBe(404);
    expect(createJobMock).not.toHaveBeenCalled();
  });

  it('400 si le lead n’a pas de site', async () => {
    getLeadByIdMock.mockResolvedValue({ id: 'recABC', email: 'client@exemple.fr', siteUrl: null });
    const res = await POST(req({ leadId: 'recABC' }));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: 'lead_sans_site' });
    expect(createJobMock).not.toHaveBeenCalled();
  });
});
