import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import type { ProspectionLead } from '@/lib/prospection/db';

const { getLeadByIdMock, findTouchByMessageIdMock, insertTouchMock, updateLeadMock } = vi.hoisted(() => ({
  getLeadByIdMock: vi.fn(),
  findTouchByMessageIdMock: vi.fn(),
  insertTouchMock: vi.fn(),
  updateLeadMock: vi.fn(),
}));

vi.mock('@/lib/prospection/db', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/prospection/db')>();
  return {
    ...actual,
    getLeadById: getLeadByIdMock,
    findTouchByMessageId: findTouchByMessageIdMock,
    insertTouch: insertTouchMock,
    updateLead: updateLeadMock,
  };
});

import { POST } from '../route';

const SECRET = 'secret-prospection-test';
const LEAD_ID = 'recLEAD000000001';

function fakeLead(overrides: Partial<ProspectionLead> = {}): ProspectionLead {
  return {
    id: LEAD_ID,
    source: 'outbound',
    entreprise: 'Test SARL',
    contactName: 'Jean Test',
    email: 'jean@exemple.fr',
    phone: null,
    siteUrl: 'https://exemple.fr',
    nicheId: null,
    phase: 'pre_audit',
    statutFunnel: 'nouveau',
    gmailThreadId: null,
    assignedTo: null,
    statutHumain: null,
    notes: null,
    scoreFlash: null,
    optOut: false,
    bounce: false,
    dernierContact: null,
    createdAt: '2026-06-01T08:00:00Z',
    ...overrides,
  };
}

function request(body: unknown, token?: string): NextRequest {
  return new NextRequest('http://localhost/api/prospection/touches/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token !== undefined ? { 'x-webhook-token': token } : {}),
    },
    body: JSON.stringify(body),
  });
}

const validBody = { leadId: LEAD_ID, type: 'flash', channel: 'gmail' };
const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
  getLeadByIdMock.mockResolvedValue(fakeLead());
  findTouchByMessageIdMock.mockResolvedValue(null);
  insertTouchMock.mockResolvedValue({ id: 'recTOUCH1' });
  updateLeadMock.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('POST /api/prospection/touches/confirm : auth et validation', () => {
  it('503 env absente, 401 token absent ou faux', async () => {
    vi.stubEnv('PROSPECTION_API_SECRET', '');
    expect((await POST(request(validBody, ''))).status).toBe(503);
    vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
    expect((await POST(request(validBody))).status).toBe(401);
    expect((await POST(request(validBody, 'mauvais'))).status).toBe(401);
  });

  it('400 sur type de touche inconnu, leadId vide ou canal inconnu', async () => {
    expect((await POST(request({ ...validBody, type: 'spam_1' }, SECRET))).status).toBe(400);
    expect((await POST(request({ ...validBody, leadId: '' }, SECRET))).status).toBe(400);
    expect((await POST(request({ ...validBody, channel: 'pigeon' }, SECRET))).status).toBe(400);
  });

  it('404 si le lead est inconnu', async () => {
    getLeadByIdMock.mockResolvedValue(null);
    const res = await POST(request(validBody, SECRET));
    expect(res.status).toBe(404);
    expect(insertTouchMock).not.toHaveBeenCalled();
  });
});

describe('POST /api/prospection/touches/confirm : transitions', () => {
  it('flash : insère la touche (lien lead + label lisible) et passe le lead en flash_envoye + Gmail Thread + Dernier contact', async () => {
    const res = await POST(
      request({ ...validBody, messageId: 'msg-1', gmailThreadId: 'thread-1', templateVersion: 'flash@v1' }, SECRET),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ confirmed: true, duplicate: false });
    expect(insertTouchMock).toHaveBeenCalledWith({
      leadId: LEAD_ID,
      leadLabel: 'Test SARL',
      type: 'flash',
      channel: 'gmail',
      messageId: 'msg-1',
      templateVersion: 'flash@v1',
    });
    expect(updateLeadMock).toHaveBeenCalledWith(LEAD_ID, {
      statutFunnel: 'flash_envoye',
      gmailThreadId: 'thread-1',
      dernierContact: expect.stringMatching(ISO_DATE),
    });
  });

  it('flash sans gmailThreadId : statut + Dernier contact seulement', async () => {
    await POST(request(validBody, SECRET));
    expect(updateLeadMock).toHaveBeenCalledWith(LEAD_ID, {
      statutFunnel: 'flash_envoye',
      dernierContact: expect.stringMatching(ISO_DATE),
    });
  });

  it('relance (cold_1) sur lead flash_envoye → en_sequence', async () => {
    getLeadByIdMock.mockResolvedValue(fakeLead({ statutFunnel: 'flash_envoye' }));
    const res = await POST(request({ ...validBody, type: 'cold_1' }, SECRET));
    expect(res.status).toBe(200);
    expect(updateLeadMock).toHaveBeenCalledWith(LEAD_ID, {
      statutFunnel: 'en_sequence',
      dernierContact: expect.stringMatching(ISO_DATE),
    });
  });

  it("relance sur lead déjà avancé (a_appeler) : touche tracée + Dernier contact, statut PAS écrasé", async () => {
    getLeadByIdMock.mockResolvedValue(fakeLead({ statutFunnel: 'a_appeler' }));
    const res = await POST(request({ ...validBody, type: 'inbound_2', channel: 'resend' }, SECRET));
    expect(res.status).toBe(200);
    expect(insertTouchMock).toHaveBeenCalled();
    expect(updateLeadMock).toHaveBeenCalledWith(LEAD_ID, {
      dernierContact: expect.stringMatching(ISO_DATE),
    });
  });
});

describe('POST /api/prospection/touches/confirm : idempotence', () => {
  it('messageId déjà tracé → 200 duplicate, AUCUNE écriture', async () => {
    findTouchByMessageIdMock.mockResolvedValue({ id: 'recTOUCH1', messageId: 'msg-1' });
    const res = await POST(request({ ...validBody, messageId: 'msg-1' }, SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ confirmed: true, duplicate: true });
    expect(insertTouchMock).not.toHaveBeenCalled();
    expect(updateLeadMock).not.toHaveBeenCalled();
  });
});
