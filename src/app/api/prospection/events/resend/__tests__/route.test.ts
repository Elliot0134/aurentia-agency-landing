import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

const { getLeadByEmailMock, updateLeadMock } = vi.hoisted(() => ({
  getLeadByEmailMock: vi.fn(),
  updateLeadMock: vi.fn(),
}));

vi.mock('@/lib/prospection/db', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/prospection/db')>();
  return { ...actual, getLeadByEmail: getLeadByEmailMock, updateLead: updateLeadMock };
});

import { POST } from '../route';

const SECRET = 'secret-prospection-test';

function request(body: unknown, token?: string): NextRequest {
  return new NextRequest('http://localhost/api/prospection/events/resend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token !== undefined ? { 'x-webhook-token': token } : {}),
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

const bounced = { type: 'email.bounced', created_at: '2026-06-12T10:00:00Z', data: { to: ['jean@exemple.fr'], email_id: 'e-1' } };

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
  getLeadByEmailMock.mockResolvedValue({ id: 'lead-1', email: 'jean@exemple.fr' });
  updateLeadMock.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('POST /api/prospection/events/resend : auth', () => {
  it('503 env absente, 401 token absent ou faux', async () => {
    vi.stubEnv('PROSPECTION_API_SECRET', '');
    expect((await POST(request(bounced, ''))).status).toBe(503);
    vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
    expect((await POST(request(bounced))).status).toBe(401);
    expect((await POST(request(bounced, 'mauvais'))).status).toBe(401);
  });
});

describe('POST /api/prospection/events/resend : 200 systématique (pas de retry storm)', () => {
  it('payload illisible → 200 ignored, aucun effet', async () => {
    const res = await POST(request('{pas du json', SECRET));
    expect(res.status).toBe(200);
    expect((await res.json()).ignored).toBe('invalid_json');
    expect(updateLeadMock).not.toHaveBeenCalled();
  });

  it('payload sans type → 200 ignored', async () => {
    const res = await POST(request({ foo: 'bar' }, SECRET));
    expect(res.status).toBe(200);
    expect((await res.json()).ignored).toBe('invalid_body');
  });

  it('email.delivered → 200 sans effet', async () => {
    const res = await POST(request({ ...bounced, type: 'email.delivered' }, SECRET));
    expect(res.status).toBe(200);
    expect(getLeadByEmailMock).not.toHaveBeenCalled();
    expect(updateLeadMock).not.toHaveBeenCalled();
  });

  it('lead inconnu → 200 ignored', async () => {
    getLeadByEmailMock.mockResolvedValue(null);
    const res = await POST(request(bounced, SECRET));
    expect(res.status).toBe(200);
    expect((await res.json()).ignored).toBe('lead_not_found');
    expect(updateLeadMock).not.toHaveBeenCalled();
  });
});

describe('POST /api/prospection/events/resend : effets', () => {
  it('email.bounced → bounce=true + statut perdu', async () => {
    const res = await POST(request(bounced, SECRET));
    expect(res.status).toBe(200);
    expect(getLeadByEmailMock).toHaveBeenCalledWith('jean@exemple.fr');
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { bounce: true, statutFunnel: 'perdu' });
  });

  it('email.complained → bounce + perdu + opt_out=true (plainte spam = à vie)', async () => {
    const res = await POST(request({ ...bounced, type: 'email.complained' }, SECRET));
    expect(res.status).toBe(200);
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { bounce: true, statutFunnel: 'perdu', optOut: true });
  });

  it("email dans data.to en casse mixte → normalisé avant lookup", async () => {
    await POST(request({ ...bounced, data: { to: [' Jean@Exemple.FR '] } }, SECRET));
    expect(getLeadByEmailMock).toHaveBeenCalledWith('jean@exemple.fr');
  });

  it('500 si la mise à jour échoue (Resend retentera, update idempotente)', async () => {
    updateLeadMock.mockRejectedValue(new Error('db down'));
    expect((await POST(request(bounced, SECRET))).status).toBe(500);
  });
});
