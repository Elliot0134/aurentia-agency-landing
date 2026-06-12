import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import type { ProspectionLead } from '@/lib/prospection/db';

const {
  getLeadByEmailMock,
  getLeadByGmailThreadIdMock,
  insertReplyMock,
  updateLeadMock,
  classifyReplyMock,
  fetchMock,
} = vi.hoisted(() => ({
  getLeadByEmailMock: vi.fn(),
  getLeadByGmailThreadIdMock: vi.fn(),
  insertReplyMock: vi.fn(),
  updateLeadMock: vi.fn(),
  classifyReplyMock: vi.fn(),
  fetchMock: vi.fn(),
}));

vi.mock('@/lib/prospection/db', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/prospection/db')>();
  return {
    ...actual,
    getLeadByEmail: getLeadByEmailMock,
    getLeadByGmailThreadId: getLeadByGmailThreadIdMock,
    insertReply: insertReplyMock,
    updateLead: updateLeadMock,
  };
});
vi.mock('@/lib/prospection/classify-reply', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/prospection/classify-reply')>();
  return { ...actual, classifyReply: classifyReplyMock };
});

import { POST } from '../route';

const SECRET = 'secret-prospection-test';

function fakeLead(overrides: Partial<ProspectionLead> = {}): ProspectionLead {
  return {
    id: 'lead-1',
    source: 'outbound',
    entreprise: 'Test SARL',
    contactName: 'Jean Test',
    email: 'jean@exemple.fr',
    phone: null,
    siteUrl: 'https://exemple.fr',
    nicheId: null,
    phase: 'pre_audit',
    statutFunnel: 'en_sequence',
    gmailThreadId: 'thread-1',
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
  return new NextRequest('http://localhost/api/prospection/replies/classify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token !== undefined ? { 'x-webhook-token': token } : {}),
    },
    body: JSON.stringify(body),
  });
}

const validBody = {
  gmailThreadId: 'thread-1',
  gmailMessageId: 'gm-1',
  snippet: 'Oui, ça m’intéresse, appelez-moi demain',
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
  vi.stubEnv('SLACK_AUDIT_WEBHOOK_URL', 'https://hooks.slack.test/x');
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockResolvedValue({ ok: true } as Response);
  getLeadByGmailThreadIdMock.mockResolvedValue(fakeLead());
  getLeadByEmailMock.mockResolvedValue(null);
  insertReplyMock.mockResolvedValue({ duplicate: false, reply: { id: 'reply-1' } });
  updateLeadMock.mockResolvedValue(undefined);
  classifyReplyMock.mockResolvedValue({ classification: 'interesse', confidence: 0.92 });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('POST /api/prospection/replies/classify : auth, validation, lookup', () => {
  it('503 env absente, 401 token absent ou faux', async () => {
    vi.stubEnv('PROSPECTION_API_SECRET', '');
    expect((await POST(request(validBody, ''))).status).toBe(503);
    vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
    expect((await POST(request(validBody))).status).toBe(401);
    expect((await POST(request(validBody, 'mauvais'))).status).toBe(401);
  });

  it('400 sans gmailMessageId ou snippet', async () => {
    expect((await POST(request({ gmailThreadId: 'thread-1', snippet: 'x' }, SECRET))).status).toBe(400);
    expect((await POST(request({ gmailThreadId: 'thread-1', gmailMessageId: 'gm-1' }, SECRET))).status).toBe(400);
  });

  it('404 si aucun lead par gmail_thread_id ni email', async () => {
    getLeadByGmailThreadIdMock.mockResolvedValue(null);
    const res = await POST(request({ ...validBody, leadEmail: 'inconnu@exemple.fr' }, SECRET));
    expect(res.status).toBe(404);
    expect(classifyReplyMock).not.toHaveBeenCalled();
    expect(insertReplyMock).not.toHaveBeenCalled();
  });

  it('retombe sur le lookup par email quand le thread est inconnu', async () => {
    getLeadByGmailThreadIdMock.mockResolvedValue(null);
    getLeadByEmailMock.mockResolvedValue(fakeLead());
    const res = await POST(request({ ...validBody, leadEmail: 'jean@exemple.fr' }, SECRET));
    expect(res.status).toBe(200);
    expect(getLeadByEmailMock).toHaveBeenCalledWith('jean@exemple.fr');
  });
});

describe('POST /api/prospection/replies/classify : effets par classification', () => {
  it('interesse → insertReply + a_appeler + Slack 🔥 (et JAMAIS de réponse au prospect)', async () => {
    const res = await POST(request(validBody, SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      leadId: 'lead-1',
      classification: 'interesse',
      confidence: 0.92,
      statutFunnel: 'a_appeler',
    });
    expect(insertReplyMock).toHaveBeenCalledWith(
      expect.objectContaining({ leadId: 'lead-1', gmailMessageId: 'gm-1', classification: 'interesse', confidence: 0.92 }),
    );
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { statutFunnel: 'a_appeler' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const slackBody = JSON.parse((fetchMock.mock.calls[0][1] as { body: string }).body) as { text: string };
    expect(slackBody.text).toContain(':fire:');
  });

  it('question → a_appeler + Slack', async () => {
    classifyReplyMock.mockResolvedValue({ classification: 'question', confidence: 0.8 });
    await POST(request(validBody, SECRET));
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { statutFunnel: 'a_appeler' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('pas_interesse → perdu, sans Slack', async () => {
    classifyReplyMock.mockResolvedValue({ classification: 'pas_interesse', confidence: 0.9 });
    await POST(request(validBody, SECRET));
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { statutFunnel: 'perdu' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('stop → statut stop + opt_out=true (à vie)', async () => {
    classifyReplyMock.mockResolvedValue({ classification: 'stop', confidence: 0.95 });
    await POST(request(validBody, SECRET));
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { statutFunnel: 'stop', optOut: true });
  });

  it('absent → aucun changement de statut', async () => {
    classifyReplyMock.mockResolvedValue({ classification: 'absent', confidence: 0.9 });
    const res = await POST(request(validBody, SECRET));
    expect(updateLeadMock).not.toHaveBeenCalled();
    expect((await res.json()).statutFunnel).toBe('en_sequence');
  });

  it('bounce → bounce=true + perdu', async () => {
    classifyReplyMock.mockResolvedValue({ classification: 'bounce', confidence: 1 });
    await POST(request(validBody, SECRET));
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { statutFunnel: 'perdu', bounce: true });
  });

  it('confidence < 0.6 → a_trier UNIQUEMENT + Slack, quel que soit le verdict', async () => {
    classifyReplyMock.mockResolvedValue({ classification: 'pas_interesse', confidence: 0.4 });
    const res = await POST(request(validBody, SECRET));
    expect(updateLeadMock).toHaveBeenCalledTimes(1);
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { statutFunnel: 'a_trier' });
    expect((await res.json()).statutFunnel).toBe('a_trier');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('POST /api/prospection/replies/classify : idempotence', () => {
  it('gmail_message_id déjà traité (conflit unique) → 200 alreadyProcessed, AUCUN effet', async () => {
    insertReplyMock.mockResolvedValue({ duplicate: true, reply: null });
    const res = await POST(request(validBody, SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ alreadyProcessed: true });
    expect(updateLeadMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
