import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

const { computeDueSendsMock } = vi.hoisted(() => ({ computeDueSendsMock: vi.fn() }));

vi.mock('@/lib/prospection/engine', () => ({ computeDueSends: computeDueSendsMock }));

import { GET } from '../route';

const SECRET = 'secret-prospection-test';

function request(token?: string): NextRequest {
  return new NextRequest('http://localhost/api/prospection/sequences/due', {
    method: 'GET',
    headers: token !== undefined ? { 'x-webhook-token': token } : {},
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
  computeDueSendsMock.mockResolvedValue({ due: [], skipped: [] });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('GET /api/prospection/sequences/due', () => {
  it('503 si env absente, 401 si token absent ou faux', async () => {
    vi.stubEnv('PROSPECTION_API_SECRET', '');
    expect((await GET(request(''))).status).toBe(503);
    vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
    expect((await GET(request())).status).toBe(401);
    expect((await GET(request('mauvais'))).status).toBe(401);
    expect(computeDueSendsMock).not.toHaveBeenCalled();
  });

  it('200 : relaie due + skipped du moteur pur (aucun effet de bord ici)', async () => {
    const due = [
      {
        leadId: 'lead-1',
        email: 'jean@exemple.fr',
        type: 'cold_1',
        channel: 'gmail',
        gmailThreadId: 'thread-1',
        subject: 'Sujet',
        html: '<p>Corps</p>',
        text: 'Corps',
        templateVersion: 'cold_1@v1',
      },
    ];
    const skipped = [{ leadId: 'lead-2', reason: 'not_due' }];
    computeDueSendsMock.mockResolvedValue({ due, skipped });
    const res = await GET(request(SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ due, skipped });
  });

  it('kill switch relayé tel quel (paused dans skipped)', async () => {
    computeDueSendsMock.mockResolvedValue({ due: [], skipped: [{ leadId: '*', reason: 'paused' }] });
    const res = await GET(request(SECRET));
    expect((await res.json()).skipped).toEqual([{ leadId: '*', reason: 'paused' }]);
  });

  it('500 si le moteur échoue', async () => {
    computeDueSendsMock.mockRejectedValue(new Error('db down'));
    expect((await GET(request(SECRET))).status).toBe(500);
  });
});
