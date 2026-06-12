import { describe, expect, it, vi } from 'vitest';
import {
  AirtableError,
  createAirtableClient,
  formulaEscape,
  type AirtableRecord,
} from '../airtable';

/**
 * Tests du client REST Airtable bas niveau : fetchFn et sleep injectés,
 * zéro réseau. On vérifie les URLs, la pagination offset, le chunking à 10,
 * le retry 429 et l'échappement des formules.
 */

const API_KEY = 'pat-test';
const BASE_ID = 'appTEST';

interface FakeResponseInit {
  status?: number;
  body?: unknown;
}

function fakeResponse({ status = 200, body = {} }: FakeResponseInit = {}): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response;
}

interface CapturedCall {
  url: string;
  method: string;
  body: unknown;
}

function makeClient(responses: FakeResponseInit[] | ((call: CapturedCall, index: number) => FakeResponseInit)) {
  const calls: CapturedCall[] = [];
  const sleeps: number[] = [];
  const fetchFn = vi.fn(async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const call: CapturedCall = {
      url: String(input),
      method: init?.method ?? 'GET',
      body: typeof init?.body === 'string' ? JSON.parse(init.body) : undefined,
    };
    calls.push(call);
    const spec =
      typeof responses === 'function' ? responses(call, calls.length - 1) : responses[calls.length - 1];
    if (!spec) throw new Error(`Réponse fake manquante pour l'appel ${calls.length}`);
    return fakeResponse(spec);
  });
  const client = createAirtableClient({
    apiKey: API_KEY,
    baseId: BASE_ID,
    fetchFn: fetchFn as unknown as typeof fetch,
    sleep: async (ms: number) => {
      sleeps.push(ms);
    },
  });
  return { client, calls, sleeps, fetchFn };
}

function record(id: string, fields: Record<string, unknown> = {}): AirtableRecord {
  return { id, createdTime: '2026-06-12T08:00:00.000Z', fields };
}

describe('formulaEscape', () => {
  it('échappe les quotes simples et les backslashes', () => {
    expect(formulaEscape("L'Atelier")).toBe("L\\'Atelier");
    expect(formulaEscape('a\\b')).toBe('a\\\\b');
    expect(formulaEscape("a\\'b")).toBe("a\\\\\\'b");
    expect(formulaEscape('sans rien')).toBe('sans rien');
  });
});

describe('createAirtableClient : configuration', () => {
  it("erreur claire si l'env AIRTABLE_API_KEY est absente", () => {
    vi.stubEnv('AIRTABLE_API_KEY', '');
    vi.stubEnv('AIRTABLE_BASE_ID', BASE_ID);
    expect(() => createAirtableClient()).toThrow(/AIRTABLE_API_KEY/);
    vi.unstubAllEnvs();
  });

  it("erreur claire si l'env AIRTABLE_BASE_ID est absente", () => {
    vi.stubEnv('AIRTABLE_API_KEY', API_KEY);
    vi.stubEnv('AIRTABLE_BASE_ID', '');
    expect(() => createAirtableClient()).toThrow(/AIRTABLE_BASE_ID/);
    vi.unstubAllEnvs();
  });
});

describe('listRecords', () => {
  it('passe filterByFormula, fields, pageSize et maxRecords en query, avec auth Bearer', async () => {
    const { client, calls, fetchFn } = makeClient([{ body: { records: [record('rec1')] } }]);
    const records = await client.listRecords('tblX', {
      filterByFormula: "{Email} = 'a@b.fr'",
      fields: ['Email', 'Statut funnel'],
      pageSize: 50,
      maxRecords: 10,
    });
    expect(records).toHaveLength(1);
    const url = new URL(calls[0].url);
    expect(url.pathname).toBe(`/v0/${BASE_ID}/tblX`);
    expect(url.searchParams.get('filterByFormula')).toBe("{Email} = 'a@b.fr'");
    expect(url.searchParams.getAll('fields[]')).toEqual(['Email', 'Statut funnel']);
    expect(url.searchParams.get('pageSize')).toBe('50');
    expect(url.searchParams.get('maxRecords')).toBe('10');
    const headers = (fetchFn.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
    expect(headers.Authorization).toBe(`Bearer ${API_KEY}`);
  });

  it("pagine automatiquement via l'offset jusqu'à épuisement", async () => {
    const { client, calls } = makeClient([
      { body: { records: [record('rec1'), record('rec2')], offset: 'off-1' } },
      { body: { records: [record('rec3')] } },
    ]);
    const records = await client.listRecords('tblX');
    expect(records.map((r) => r.id)).toEqual(['rec1', 'rec2', 'rec3']);
    expect(calls).toHaveLength(2);
    expect(new URL(calls[0].url).searchParams.get('offset')).toBeNull();
    expect(new URL(calls[1].url).searchParams.get('offset')).toBe('off-1');
  });

  it("s'arrête à maxRecords même si Airtable renvoie un offset", async () => {
    const { client, calls } = makeClient([
      { body: { records: [record('rec1'), record('rec2')], offset: 'off-1' } },
    ]);
    const records = await client.listRecords('tblX', { maxRecords: 2 });
    expect(records).toHaveLength(2);
    expect(calls).toHaveLength(1);
  });
});

describe('createRecords', () => {
  it('chunke par 10 et concatène les records créés', async () => {
    const { client, calls } = makeClient((call) => {
      const body = call.body as { records: Array<{ fields: Record<string, unknown> }> };
      return { body: { records: body.records.map((r, i) => record(`rec-${calls.length}-${i}`, r.fields)) } };
    });
    const inputs = Array.from({ length: 25 }, (_, i) => ({ Nom: `lead-${i}` }));
    const created = await client.createRecords('tblX', inputs);
    expect(created).toHaveLength(25);
    expect(calls).toHaveLength(3);
    expect(calls.map((c) => (c.body as { records: unknown[] }).records.length)).toEqual([10, 10, 5]);
    expect(calls[0].method).toBe('POST');
    expect((calls[0].body as { records: Array<{ fields: { Nom: string } }> }).records[0].fields.Nom).toBe('lead-0');
  });
});

describe('updateRecord / updateRecords', () => {
  it('updateRecord : PATCH du record avec les fields', async () => {
    const { client, calls } = makeClient([{ body: record('rec1', { Notes: 'ok' }) }]);
    const updated = await client.updateRecord('tblX', 'rec1', { Notes: 'ok' });
    expect(updated.fields.Notes).toBe('ok');
    expect(calls[0].method).toBe('PATCH');
    expect(new URL(calls[0].url).pathname).toBe(`/v0/${BASE_ID}/tblX/rec1`);
    expect(calls[0].body).toEqual({ fields: { Notes: 'ok' } });
  });

  it('updateRecords : PATCH par chunks de 10', async () => {
    const { client, calls } = makeClient((call) => {
      const body = call.body as { records: Array<{ id: string; fields: Record<string, unknown> }> };
      return { body: { records: body.records.map((r) => record(r.id, r.fields)) } };
    });
    const updates = Array.from({ length: 12 }, (_, i) => ({ id: `rec-${i}`, fields: { Notes: `${i}` } }));
    const updated = await client.updateRecords('tblX', updates);
    expect(updated).toHaveLength(12);
    expect(calls).toHaveLength(2);
    expect(calls[0].method).toBe('PATCH');
  });
});

describe('getRecord', () => {
  it('retourne le record, ou null sur 404', async () => {
    const { client } = makeClient([{ body: record('rec1', { Email: 'a@b.fr' }) }]);
    const found = await client.getRecord('tblX', 'rec1');
    expect(found?.fields.Email).toBe('a@b.fr');

    const { client: client404 } = makeClient([{ status: 404, body: { error: 'NOT_FOUND' } }]);
    expect(await client404.getRecord('tblX', 'recX')).toBeNull();
  });
});

describe('retry 429 et erreurs', () => {
  it('429 → attend 1 s et réessaie (succès au 2e essai)', async () => {
    const { client, sleeps } = makeClient([
      { status: 429, body: { error: 'RATE_LIMITED' } },
      { body: { records: [record('rec1')] } },
    ]);
    const records = await client.listRecords('tblX');
    expect(records).toHaveLength(1);
    expect(sleeps).toContain(1000);
  });

  it('429 persistant → AirtableError après 5 retries (6 tentatives)', async () => {
    const { client, calls } = makeClient(() => ({ status: 429, body: { error: 'RATE_LIMITED' } }));
    await expect(client.listRecords('tblX')).rejects.toThrow(AirtableError);
    expect(calls).toHaveLength(6);
  });

  it('erreur non-2xx (hors 429/404) → AirtableError avec le statut', async () => {
    const { client } = makeClient([{ status: 422, body: { error: { type: 'INVALID_REQUEST' } } }]);
    const err = await client.createRecords('tblX', [{ Nom: 'x' }]).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(AirtableError);
    expect((err as AirtableError).status).toBe(422);
  });
});
