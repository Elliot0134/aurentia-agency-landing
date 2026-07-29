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
  getLeadByEmailMock,
  createLeadMock,
  updateLeadMock,
  assertSafeUrlMock,
} = vi.hoisted(() => ({
  constructEventMock: vi.fn(),
  startMock: vi.fn(),
  createJobMock: vi.fn(),
  updateJobMock: vi.fn(),
  findLatestJobByEmailMock: vi.fn(),
  findJobByStripeSessionIdMock: vi.fn(),
  getLeadByEmailMock: vi.fn(),
  createLeadMock: vi.fn(),
  updateLeadMock: vi.fn(),
  assertSafeUrlMock: vi.fn(),
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
vi.mock('@/lib/prospection/db', () => ({
  getLeadByEmail: getLeadByEmailMock,
  createLead: createLeadMock,
  updateLead: updateLeadMock,
}));
// assertSafeUrl fait une résolution DNS réelle : on garde UnsafeUrlError (vrai
// type, utilisé dans les assertions) et on ne mocke que la fonction.
vi.mock('@/lib/audit/url-safety', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/audit/url-safety')>();
  return { ...actual, assertSafeUrl: assertSafeUrlMock };
});

import { POST } from '../route';
import { proAuditWorkflow } from '@/workflows/audit-workflows';
import { UnsafeUrlError } from '@/lib/audit/url-safety';

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

interface FakeCustomField {
  key: string;
  type: string;
  text?: { value: string | null };
}

interface FakeSession {
  id: string;
  customer_details: { email: string | null } | null;
  customer_email: string | null;
  custom_fields?: FakeCustomField[];
}

/** Champ « URL à analyser » du Payment Link Pro, tel que Stripe le renvoie. */
function urlField(value: string | null): FakeCustomField {
  return { key: 'urlanalyser', type: 'text', text: { value } };
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
  getLeadByEmailMock.mockResolvedValue(null);
  createLeadMock.mockResolvedValue({ id: 'lead-pro' });
  updateLeadMock.mockResolvedValue(undefined);
  assertSafeUrlMock.mockImplementation(async (raw: string) => new URL(raw));
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
    // Lead Airtable : créé en pro_paye (pas de lead existant), relié au job.
    expect(createLeadMock).toHaveBeenCalledWith(
      expect.objectContaining({ source: 'inbound', email: 'client@example.fr', statutFunnel: 'pro_paye' }),
    );
    expect(createJobMock).toHaveBeenCalledWith({
      email: 'client@example.fr',
      url: 'https://exemple.fr/',
      tier: 'pro',
      channel: 'inbound',
      stripeSessionId: 'cs_test_1',
      leadId: 'lead-pro',
    });
    expect(startMock).toHaveBeenCalledWith(proAuditWorkflow, ['job-pro-1']);
    expect(updateJobMock).toHaveBeenCalledWith('job-pro-1', { workflowRunId: 'wrun_pro_1' });
  });

  it('lead existant : passe le lead en pro_paye (pas de doublon)', async () => {
    findLatestJobByEmailMock.mockResolvedValue(fakeJob({ url: 'https://exemple.fr/' }));
    getLeadByEmailMock.mockResolvedValue({ id: 'lead-existant', siteUrl: 'https://exemple.fr/' });
    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(updateLeadMock).toHaveBeenCalledWith('lead-existant', expect.objectContaining({ statutFunnel: 'pro_paye' }));
    expect(createLeadMock).not.toHaveBeenCalled();
    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ leadId: 'lead-existant' }));
  });

  it('paiement encaissé même si Airtable échoue (best-effort)', async () => {
    findLatestJobByEmailMock.mockResolvedValue(fakeJob({ url: 'https://exemple.fr/' }));
    getLeadByEmailMock.mockRejectedValue(new Error('airtable down'));
    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ tier: 'pro', leadId: undefined }));
    expect(startMock).toHaveBeenCalled();
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

/**
 * Le Payment Link Pro demande « URL à analyser » en champ obligatoire : c'est
 * le client qui déclare le site à auditer, c'est donc la SOURCE DE VÉRITÉ.
 * Le repli sur le dernier flash de l'email reste utile (Flash cold puis achat)
 * mais ne doit jamais primer : incident du 2026-07-29 (paiement avec un email
 * sans flash antérieur → job bloqué alors que l'URL était dans Stripe).
 */
describe('POST /api/stripe/webhook : URL déclarée dans le champ Stripe', () => {
  it("utilise l'URL du champ Stripe quand aucun flash n'existe pour cet email", async () => {
    constructEventMock.mockReturnValue(
      completedEvent({ custom_fields: [urlField('https://bimbo-cosmetique.com/')] }),
    );
    findLatestJobByEmailMock.mockResolvedValue(null);

    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);

    expect(assertSafeUrlMock).toHaveBeenCalledWith('https://bimbo-cosmetique.com/');
    expect(createJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://bimbo-cosmetique.com/', tier: 'pro' }),
    );
    expect(startMock).toHaveBeenCalledWith(proAuditWorkflow, ['job-pro-1']);
    expect(updateJobMock).toHaveBeenCalledWith('job-pro-1', { workflowRunId: 'wrun_pro_1' });
  });

  it("le champ Stripe prime sur le dernier flash quand le client a payé pour un AUTRE site", async () => {
    constructEventMock.mockReturnValue(
      completedEvent({ custom_fields: [urlField('https://site-paye.fr/')] }),
    );
    findLatestJobByEmailMock.mockResolvedValue(fakeJob({ tier: 'flash', url: 'https://ancien-flash.fr/' }));

    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ url: 'https://site-paye.fr/' }));
  });

  it('champ Stripe vide : repli sur le dernier flash de cet email', async () => {
    constructEventMock.mockReturnValue(completedEvent({ custom_fields: [urlField('   ')] }));
    findLatestJobByEmailMock.mockResolvedValue(fakeJob({ tier: 'flash', url: 'https://exemple.fr/' }));

    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ url: 'https://exemple.fr/' }));
    expect(startMock).toHaveBeenCalled();
  });

  it("URL saisie inexploitable : escalade Slack, JAMAIS de repli sur un autre site", async () => {
    constructEventMock.mockReturnValue(completedEvent({ custom_fields: [urlField('http://192.168.1.1/')] }));
    // Un flash existe pour cet email, mais le client a DÉCLARÉ un autre site :
    // auditer silencieusement l'ancien serait pire que bloquer.
    findLatestJobByEmailMock.mockResolvedValue(fakeJob({ tier: 'flash', url: 'https://ancien-flash.fr/' }));
    assertSafeUrlMock.mockRejectedValue(new UnsafeUrlError('IP privée'));
    createJobMock.mockResolvedValue(fakeJob({ id: 'job-pro-3', url: '' }));

    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);

    expect(createJobMock).toHaveBeenCalledWith(expect.objectContaining({ url: '' }));
    expect(startMock).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const text = JSON.parse(String(init.body)).text as string;
    expect(text).toContain('sans URL connue');
    // La saisie du client est reportée telle quelle : sans elle, impossible de
    // savoir quoi corriger côté humain.
    expect(text).toContain('http://192.168.1.1/');
  });

  it("normalise l'URL saisie (assertSafeUrl fait foi, pas la saisie brute)", async () => {
    constructEventMock.mockReturnValue(completedEvent({ custom_fields: [urlField('bimbo-cosmetique.com')] }));
    assertSafeUrlMock.mockResolvedValue(new URL('https://bimbo-cosmetique.com/'));

    const res = await POST(webhookRequest());
    expect(res.status).toBe(200);
    expect(createJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://bimbo-cosmetique.com/' }),
    );
  });
});
