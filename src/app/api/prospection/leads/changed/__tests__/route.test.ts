import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

const { listLeadsChangedSinceMock } = vi.hoisted(() => ({ listLeadsChangedSinceMock: vi.fn() }));

vi.mock('@/lib/prospection/db', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/prospection/db')>();
  return { ...actual, listLeadsChangedSince: listLeadsChangedSinceMock };
});

import { GET } from '../route';

const SECRET = 'secret-prospection-test';

function request(query: string, token?: string): NextRequest {
  return new NextRequest(`http://localhost/api/prospection/leads/changed${query}`, {
    method: 'GET',
    headers: token !== undefined ? { 'x-webhook-token': token } : {},
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
  listLeadsChangedSinceMock.mockResolvedValue([]);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('GET /api/prospection/leads/changed', () => {
  it('503 env absente, 401 token absent ou faux', async () => {
    vi.stubEnv('PROSPECTION_API_SECRET', '');
    expect((await GET(request('?since=2026-06-12T00:00:00Z', ''))).status).toBe(503);
    vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
    expect((await GET(request('?since=2026-06-12T00:00:00Z'))).status).toBe(401);
    expect((await GET(request('?since=2026-06-12T00:00:00Z', 'mauvais'))).status).toBe(401);
  });

  it('400 si since manquant ou non ISO', async () => {
    expect((await GET(request('', SECRET))).status).toBe(400);
    expect((await GET(request('?since=hier', SECRET))).status).toBe(400);
  });

  it('200 : leads complets + serverTime (curseur du run n8n suivant), limite 100', async () => {
    const leads = [{ id: 'lead-1', email: 'jean@exemple.fr', statutFunnel: 'a_appeler' }];
    listLeadsChangedSinceMock.mockResolvedValue(leads);
    const before = Date.now();
    const res = await GET(request('?since=2026-06-12T00:00:00Z', SECRET));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.leads).toEqual(leads);
    expect(listLeadsChangedSinceMock).toHaveBeenCalledWith('2026-06-12T00:00:00.000Z', undefined, 100);
    const serverTime = Date.parse(json.serverTime);
    expect(serverTime).toBeGreaterThanOrEqual(before - 1000);
    expect(serverTime).toBeLessThanOrEqual(Date.now());
  });

  it('500 si la lecture échoue', async () => {
    listLeadsChangedSinceMock.mockRejectedValue(new Error('db down'));
    expect((await GET(request('?since=2026-06-12T00:00:00Z', SECRET))).status).toBe(500);
  });
});
