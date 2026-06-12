import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const { retrieveMock, refundCreateMock, updateJobMock, getJobMock } = vi.hoisted(() => ({
  retrieveMock: vi.fn(),
  refundCreateMock: vi.fn(),
  updateJobMock: vi.fn(),
  getJobMock: vi.fn(),
}));

vi.mock('stripe', () => ({
  default: class FakeStripe {
    checkout = { sessions: { retrieve: retrieveMock } };
    refunds = { create: refundCreateMock };
  },
}));
vi.mock('@/lib/audit/jobs', () => ({
  getJob: getJobMock,
  updateJob: updateJobMock,
}));

import { FatalError } from 'workflow';
import { depsProd, loadJob, handleProFailure, buildReviewMessage, notifyReviewReady } from '../audit-steps';

const fetchMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockResolvedValue(new Response('ok', { status: 200 }));
  // Slack et Stripe désactivés par défaut : chaque test active ce qu'il teste.
  vi.stubEnv('SLACK_AUDIT_WEBHOOK_URL', '');
  vi.stubEnv('STRIPE_SECRET_KEY', '');
  updateJobMock.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('depsProd', () => {
  it('throw FatalError (pas de retry inutile) si une env du moteur manque', () => {
    vi.stubEnv('PSI_API_KEY', '');
    vi.stubEnv('BROWSERLESS_TOKEN', 'tok');
    vi.stubEnv('EXA_API_KEY', 'exa');
    expect(() => depsProd()).toThrow(FatalError);
  });

  it('construit les deps depuis les env vars', () => {
    vi.stubEnv('PSI_API_KEY', 'psi');
    vi.stubEnv('BROWSERLESS_TOKEN', 'tok');
    vi.stubEnv('BROWSERLESS_URL', 'https://browserless.local');
    vi.stubEnv('EXA_API_KEY', 'exa');
    const deps = depsProd();
    expect(deps.psiApiKey).toBe('psi');
    expect(deps.browserless).toEqual({ token: 'tok', baseUrl: 'https://browserless.local' });
    expect(deps.exaApiKey).toBe('exa');
    expect(deps.supabase).toBeDefined();
  });
});

describe('loadJob', () => {
  it('throw FatalError si le job est introuvable', async () => {
    getJobMock.mockResolvedValue(null);
    await expect(loadJob('inconnu')).rejects.toThrow(FatalError);
  });

  it('retourne le job quand il existe', async () => {
    getJobMock.mockResolvedValue({ id: 'job-1', status: 'queued' });
    await expect(loadJob('job-1')).resolves.toEqual({ id: 'job-1', status: 'queued' });
  });
});

describe('buildReviewMessage', () => {
  it('contient le site et le lien de review avec jobId + token', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.aurentia.agency/');
    const msg = buildReviewMessage('job-1', 'https://exemple.fr/', 'abc123');
    expect(msg).toContain('PDF Pro prêt à relire : https://exemple.fr/');
    expect(msg).toContain('https://www.aurentia.agency/audit/review/job-1?token=abc123');
  });
});

describe('notifyReviewReady', () => {
  it('poste sur le webhook Slack quand il est configuré', async () => {
    vi.stubEnv('SLACK_AUDIT_WEBHOOK_URL', 'https://hooks.slack.test/T1');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.aurentia.agency');
    await notifyReviewReady('job-1', 'https://exemple.fr/', 'tok');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://hooks.slack.test/T1');
    expect(JSON.parse(String(init.body)).text).toContain('/audit/review/job-1?token=tok');
  });

  it('ne throw pas si la webhook est absente (log seulement)', async () => {
    await expect(notifyReviewReady('job-1', 'https://exemple.fr/', 'tok')).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('ne throw pas si Slack est injoignable', async () => {
    vi.stubEnv('SLACK_AUDIT_WEBHOOK_URL', 'https://hooks.slack.test/T1');
    fetchMock.mockRejectedValue(new Error('ECONNREFUSED'));
    await expect(notifyReviewReady('job-1', 'https://exemple.fr/', 'tok')).resolves.toBeUndefined();
  });
});

describe('handleProFailure (échec définitif du Pro)', () => {
  it('sans stripe_session_id : marque failed, pas de refund', async () => {
    await handleProFailure('job-1', 'https://exemple.fr/', null, 'collecte KO');
    expect(retrieveMock).not.toHaveBeenCalled();
    expect(refundCreateMock).not.toHaveBeenCalled();
    expect(updateJobMock).toHaveBeenCalledWith('job-1', { status: 'failed', error: 'collecte KO' });
  });

  it('sans STRIPE_SECRET_KEY : marque failed même avec une session', async () => {
    await handleProFailure('job-1', 'https://exemple.fr/', 'cs_123', 'collecte KO');
    expect(retrieveMock).not.toHaveBeenCalled();
    expect(updateJobMock).toHaveBeenCalledWith('job-1', { status: 'failed', error: 'collecte KO' });
  });

  it('refund OK : rembourse le payment_intent de la session et marque refunded', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_x');
    retrieveMock.mockResolvedValue({ payment_intent: 'pi_42' });
    refundCreateMock.mockResolvedValue({ id: 're_1' });

    await handleProFailure('job-1', 'https://exemple.fr/', 'cs_123', 'rendu KO');

    expect(retrieveMock).toHaveBeenCalledWith('cs_123');
    expect(refundCreateMock).toHaveBeenCalledWith({ payment_intent: 'pi_42' });
    expect(updateJobMock).toHaveBeenCalledWith('job-1', { status: 'refunded', error: 'rendu KO' });
  });

  it('refund en erreur (API Stripe) : marque failed, ne throw pas', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_x');
    retrieveMock.mockRejectedValue(new Error('stripe down'));

    await expect(handleProFailure('job-1', 'https://exemple.fr/', 'cs_123', 'rendu KO')).resolves.toBeUndefined();
    expect(updateJobMock).toHaveBeenCalledWith('job-1', { status: 'failed', error: 'rendu KO' });
  });

  it('session sans payment_intent : marque failed (remboursement manuel)', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_x');
    retrieveMock.mockResolvedValue({ payment_intent: null });

    await handleProFailure('job-1', 'https://exemple.fr/', 'cs_123', 'rendu KO');
    expect(refundCreateMock).not.toHaveBeenCalled();
    expect(updateJobMock).toHaveBeenCalledWith('job-1', { status: 'failed', error: 'rendu KO' });
  });

  it('escalade Slack avec le détail quand la webhook est configurée', async () => {
    vi.stubEnv('SLACK_AUDIT_WEBHOOK_URL', 'https://hooks.slack.test/T1');
    await handleProFailure('job-1', 'https://exemple.fr/', null, 'collecte KO');
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const text = JSON.parse(String(init.body)).text as string;
    expect(text).toContain('https://exemple.fr/');
    expect(text).toContain('job-1');
    expect(text).toContain('collecte KO');
  });
});
