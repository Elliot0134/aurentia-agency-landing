import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import type { AuditJob } from '@/lib/audit/jobs';

const {
  constructEventMock,
  startMock,
  createJobMock,
  updateJobMock,
  findLatestJobByEmailMock,
  findJobByStripeSessionIdMock,
} = vi.hoisted(() => ({
  constructEventMock: vi.fn(),
  startMock: vi.fn(),
  createJobMock: vi.fn(),
  updateJobMock: vi.fn(),
  findLatestJobByEmailMock: vi.fn(),
  findJobByStripeSessionIdMock: vi.fn(),
}));

// Le SDK Stripe réel exige une vraie clé et signe en crypto : on ne teste pas
// Stripe, on teste la route. constructEvent est le seul point de contact.
vi.mock('stripe', () => ({
  default: class FakeStripe {
    webhooks = { constructEvent: constructEventMock };
  },
}));
vi.mock('workflow/api', () => ({ start: startMock }));
// Les workflows réels tirent tout le moteur (sharp, stripe...) : inutile ici,
// la route ne fait que les passer à start() qui est mocké.
vi.mock('@/workflows/audit-workflows', () => ({
  flashAuditWorkflow: vi.fn(),
  proAuditWorkflow: vi.fn(),
}));
vi.mock('@/lib/audit/jobs', () => ({
  createJob: createJobMock,
  updateJob: updateJobMock,
  findLatestJobByEmail: findLatestJobByEmailMock,
  findJobByStripeSessionId: findJobByStripeSessionIdMock,
}));

import { POST } from '../route';
import { proAuditWorkflow } from '@/workflows/audit-workflows';

const WEBHOOK_SECRET = 'whsec_test';
const SLACK_URL = 'https://hooks.slack.test/services/T0/B0/x';

function fakeJob(overrides: Partial<AuditJob> = {}): AuditJob {
  return {
    id: 'job-pro-1',
    leadId: null,
    email: 'client@example.fr',
    url: 'https://exemple.fr/',
    tier: 'pro',
    channel: 'inbound',
    status: 'queued',
    stripeSessionId: 'cs_test_1',
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

interface FakeSession {
  id: string;
  customer_details: { email: string | null } | null;
  customer_email: string | null;
}

function completedEvent(session: Partial<FakeSession> = {}): { type: string; data: { object: FakeSession } } {
  return {
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_1',
        customer_details: { email: 'Client@Example.fr' },
        customer_email: null,
        ...session,
      },
    },
  };
}

function webhookRequest(body = '{"raw":"payload"}', signature: string | null = 't=1,v1=sig'): NextRequest {
  return new NextRequest('http://localhost/api/stripe/webhook', {
    method: 'POST',
    headers: signature !== null ? { 'stripe-signature': signature } : {},
    body,
  });
}

const fetchMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('STRIPE_WEBHOOK_SECRET', WEBHOOK_SECRET);
  vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_x');
  vi.stubEnv('SLACK_AUDIT_WEBHOOK_URL', SLACK_URL);
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockResolvedValue(new Response('ok', { status: 200 }));
  constructEventMock.mockReturnValue(completedEvent());
  findJobByStripeSessionIdMock.mockResolvedValue(null);
  findLatestJobByEmailMock.mockResolvedValue(null);
  createJobMock.mockResolvedValue(fakeJob());
  updateJobMock.mockResolvedValue(undefined);
  startMock.mockResolvedValue({ runId: 'wrun_pro_1' });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('POST /api/stripe/webhook : signature', () => {
  it("400 si l'env STRIPE_WEBHOOK_SECRET est absente (endpoint fermé)", async () => {
    vi.stubEnv('STRIPE_WEBHOOK_SECRET', '');
    const res = await POST(webhookRequest());
    expect(res.status).toBe(400);
    expect(constructEventMock).not.toHaveBeenCalled();
    expect(createJobMock).not.toHaveBeenCalled();
  });

  it('400 sans header stripe-signature', async () => {
    const res = await POST(webhookRequest('{}', null));
    expect(res.status).toBe(400);
    expect(constructEventMock).not.toHaveBeenCalled();
  });

  it('400 si la signature est invalide (constructEvent throw)', async () => {
    constructEventMock.mockImplementation(() => {
      throw new Error('No signatures found matching the expected signature for payload');
    });
    const res = await POST(webhookRequest());
    expect(res.status).toBe(400);
    expect(createJobMock).not.toHaveBeenCalled();
    expect(startMock).not.toHaveBeenCalled();
  });

  it('vérifie la signature sur le body BRUT (bytes exacts, pas re-sérialisé)', async () => {
    const raw = '{"id": "evt_1",  "spacing":   "exact"}';
    await POST(webhookRequest(raw, 't=2,v1=abc'));
    expect(constructEventMock).toHaveBeenCalledWith(raw, 't=2,v1=abc', WEBHOOK_SECRET);
  });
});

describe('POST /api/stripe/webhook : events ignorés et idempotence', () => {
  it('200 sans rien faire sur un autre type d’event', async () => {
    constructEventMock.mockReturnValue({ type: 'payment_intent.succeeded', data: { object: {} } });
    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
    expect(createJobMock).not.toHaveBeenCalled();
    expect(startMock).not.toHaveBeenCalled();
  });

  it('200 idempotent si un job existe déjà pour ce stripe_session_id', async () => {
    findJobByStripeSessionIdMock.mockResolvedValue(fakeJob());
    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
    expect(findJobByStripeSessionIdMock).toHaveBeenCalledWith('cs_test_1');
    expect(createJobMock).not.toHaveBeenCalled();
    expect(startMock).not.toHaveBeenCalled();
    expect(updateJobMock).not.toHaveBeenCalled();
  });
});

describe('POST /api/stripe/webhook : checkout.session.completed', () => {
  it("crée le job pro avec l'URL du dernier flash de cet email et lance le workflow", async () => {
    findLatestJobByEmailMock.mockResolvedValue(fakeJob({ id: 'job-flash-1', tier: 'flash', url: 'https://exemple.fr/' }));
    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });

    expect(findLatestJobByEmailMock).toHaveBeenCalledWith('client@example.fr');
    expect(createJobMock).toHaveBeenCalledWith({
      email: 'client@example.fr',
      url: 'https://exemple.fr/',
      tier: 'pro',
      channel: 'inbound',
      stripeSessionId: 'cs_test_1',
    });
    expect(startMock).toHaveBeenCalledWith(proAuditWorkflow, ['job-pro-1']);
    expect(updateJobMock).toHaveBeenCalledWith('job-pro-1', { workflowRunId: 'wrun_pro_1' });
  });

  it('retombe sur customer_email quand customer_details est vide', async () => {
    constructEventMock.mockReturnValue(
      completedEvent({ customer_details: null, customer_email: 'Fallback@Example.fr' }),
    );
    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ email: 'fallback@example.fr' }));
  });

  it('sans flash connu : job créé avec url vide, PAS de workflow, notification Slack', async () => {
    findLatestJobByEmailMock.mockResolvedValue(null);
    createJobMock.mockResolvedValue(fakeJob({ id: 'job-pro-2', url: '' }));

    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });

    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ url: '', tier: 'pro' }));
    expect(startMock).not.toHaveBeenCalled();
    expect(updateJobMock).not.toHaveBeenCalled();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [slackUrl, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(slackUrl).toBe(SLACK_URL);
    const payload = JSON.parse(String(init.body)) as { text: string };
    expect(payload.text).toContain('client@example.fr');
    expect(payload.text).toContain('sans URL connue');
  });

  it('sans email du tout : 200 (pas de retry Stripe inutile) + escalade Slack, aucun job', async () => {
    constructEventMock.mockReturnValue(completedEvent({ customer_details: null, customer_email: null }));
    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(createJobMock).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(String(init.body)).text).toContain('cs_test_1');
  });

  it('500 si la création du job échoue (Stripe retentera la livraison)', async () => {
    createJobMock.mockRejectedValue(new Error('db down'));
    const res = await POST(webhookRequest());
    expect(res.status).toBe(500);
  });
});
