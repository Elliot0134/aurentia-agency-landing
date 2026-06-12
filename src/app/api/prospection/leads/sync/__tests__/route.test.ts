import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

const { getLeadByNotionPageIdMock, getLeadByAirtableRecordIdMock, updateLeadMock } = vi.hoisted(() => ({
  getLeadByNotionPageIdMock: vi.fn(),
  getLeadByAirtableRecordIdMock: vi.fn(),
  updateLeadMock: vi.fn(),
}));

vi.mock('@/lib/prospection/db', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/prospection/db')>();
  return {
    ...actual,
    getLeadByNotionPageId: getLeadByNotionPageIdMock,
    getLeadByAirtableRecordId: getLeadByAirtableRecordIdMock,
    updateLead: updateLeadMock,
  };
});

import { POST } from '../route';

const SECRET = 'secret-prospection-test';

function request(body: unknown, token?: string): NextRequest {
  return new NextRequest('http://localhost/api/prospection/leads/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token !== undefined ? { 'x-webhook-token': token } : {}),
    },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
  getLeadByNotionPageIdMock.mockResolvedValue({ id: 'lead-1' });
  getLeadByAirtableRecordIdMock.mockResolvedValue({ id: 'lead-air-1' });
  updateLeadMock.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('POST /api/prospection/leads/sync', () => {
  it('503 env absente, 401 token absent ou faux', async () => {
    vi.stubEnv('PROSPECTION_API_SECRET', '');
    expect((await POST(request({ changes: [] }, ''))).status).toBe(503);
    vi.stubEnv('PROSPECTION_API_SECRET', SECRET);
    expect((await POST(request({ changes: [] }))).status).toBe(401);
    expect((await POST(request({ changes: [] }, 'mauvais'))).status).toBe(401);
  });

  it('400 sans tableau changes ou sans aucun id (ni airtableRecordId ni notionPageId)', async () => {
    expect((await POST(request({}, SECRET))).status).toBe(400);
    expect((await POST(request({ changes: [{ statutHumain: 'Gagné' }] }, SECRET))).status).toBe(400);
  });

  it('lookup par airtableRecordId : lead retrouvé et patché, jamais de lookup Notion', async () => {
    const res = await POST(
      request({ changes: [{ airtableRecordId: 'recAAA', statutHumain: 'Gagné' }] }, SECRET),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ applied: 1, ignored: 0 });
    expect(getLeadByAirtableRecordIdMock).toHaveBeenCalledWith('recAAA');
    expect(getLeadByNotionPageIdMock).not.toHaveBeenCalled();
    expect(updateLeadMock).toHaveBeenCalledWith('lead-air-1', { statutHumain: 'Gagné', statutFunnel: 'gagne' });
  });

  it('sync mixte : un change Airtable + un change Notion dans le même batch', async () => {
    const res = await POST(
      request(
        {
          changes: [
            { airtableRecordId: 'recAAA', statutHumain: 'Gagné' },
            { notionPageId: 'notion-1', notes: 'rappelé' },
          ],
        },
        SECRET,
      ),
    );
    expect(await res.json()).toEqual({ applied: 2, ignored: 0 });
    expect(getLeadByAirtableRecordIdMock).toHaveBeenCalledWith('recAAA');
    expect(getLeadByNotionPageIdMock).toHaveBeenCalledWith('notion-1');
    expect(updateLeadMock).toHaveBeenNthCalledWith(1, 'lead-air-1', { statutHumain: 'Gagné', statutFunnel: 'gagne' });
    expect(updateLeadMock).toHaveBeenNthCalledWith(2, 'lead-1', { notes: 'rappelé' });
  });

  it("statut humain 'Gagné' → statut_humain + statut_funnel gagne", async () => {
    const res = await POST(request({ changes: [{ notionPageId: 'notion-1', statutHumain: 'Gagné' }] }, SECRET));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ applied: 1, ignored: 0 });
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { statutHumain: 'Gagné', statutFunnel: 'gagne' });
  });

  it("mapping insensible accents/casse : 'à appeler' → a_appeler, 'PERDU' → perdu", async () => {
    await POST(
      request(
        {
          changes: [
            { notionPageId: 'n-1', statutHumain: 'à appeler' },
            { notionPageId: 'n-2', statutHumain: 'PERDU', notes: 'rappelé 2x' },
          ],
        },
        SECRET,
      ),
    );
    expect(updateLeadMock).toHaveBeenNthCalledWith(1, 'lead-1', { statutHumain: 'à appeler', statutFunnel: 'a_appeler' });
    expect(updateLeadMock).toHaveBeenNthCalledWith(2, 'lead-1', {
      statutHumain: 'PERDU',
      statutFunnel: 'perdu',
      notes: 'rappelé 2x',
    });
  });

  it('statut humain non reconnu : conservé dans statut_humain SANS toucher le funnel', async () => {
    await POST(request({ changes: [{ notionPageId: 'n-1', statutHumain: 'En discussion' }] }, SECRET));
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { statutHumain: 'En discussion' });
  });

  it('notes seules : appliquées', async () => {
    await POST(request({ changes: [{ notionPageId: 'n-1', notes: 'veut un devis' }] }, SECRET));
    expect(updateLeadMock).toHaveBeenCalledWith('lead-1', { notes: 'veut un devis' });
  });

  it('page Notion orpheline → ignored, le batch continue', async () => {
    getLeadByNotionPageIdMock.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: 'lead-2' });
    const res = await POST(
      request(
        {
          changes: [
            { notionPageId: 'orpheline', statutHumain: 'Gagné' },
            { notionPageId: 'n-2', statutHumain: 'Perdu' },
          ],
        },
        SECRET,
      ),
    );
    expect(await res.json()).toEqual({ applied: 1, ignored: 1 });
    expect(updateLeadMock).toHaveBeenCalledTimes(1);
    expect(updateLeadMock).toHaveBeenCalledWith('lead-2', { statutHumain: 'Perdu', statutFunnel: 'perdu' });
  });

  it('changement vide (ni statut ni notes) → ignored', async () => {
    const res = await POST(request({ changes: [{ notionPageId: 'n-1' }] }, SECRET));
    expect(await res.json()).toEqual({ applied: 0, ignored: 1 });
    expect(updateLeadMock).not.toHaveBeenCalled();
  });
});
