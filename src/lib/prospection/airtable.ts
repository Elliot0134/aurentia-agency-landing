/**
 * Client REST Airtable bas niveau (base maître du CRM prospection, décision
 * Elliot 2026-06-12 : Airtable remplace Supabase pour les leads/touches/
 * réponses/config ; Supabase ne garde que audit_jobs et le storage).
 *
 * Tout est injectable (fetchFn, sleep, clés) pour des tests sans réseau.
 * Garde-fous réseau :
 * - throttle global ~4 req/s (Airtable limite à 5 req/s par base) ;
 * - retry sur 429 : attente 1 s, max 5 retries ;
 * - erreurs non-2xx → AirtableError avec statut + corps (diagnostic n8n).
 */

export interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: Record<string, unknown>;
}

export interface ListRecordsOptions {
  filterByFormula?: string;
  fields?: readonly string[];
  pageSize?: number;
  maxRecords?: number;
}

export interface AirtableApi {
  /** Liste les records (pagination offset automatique). */
  listRecords(table: string, options?: ListRecordsOptions): Promise<AirtableRecord[]>;
  /** Crée les records (un objet fields par record), par chunks de 10. */
  createRecords(
    table: string,
    records: ReadonlyArray<Record<string, unknown>>,
  ): Promise<AirtableRecord[]>;
  /** PATCH partiel d'un record. */
  updateRecord(table: string, recordId: string, fields: Record<string, unknown>): Promise<AirtableRecord>;
  /** PATCH partiel de plusieurs records, par chunks de 10. */
  updateRecords(
    table: string,
    updates: ReadonlyArray<{ id: string; fields: Record<string, unknown> }>,
  ): Promise<AirtableRecord[]>;
  /** Un record par id, ou null s'il n'existe pas (404). */
  getRecord(table: string, recordId: string): Promise<AirtableRecord | null>;
}

export interface AirtableClientOptions {
  apiKey?: string;
  baseId?: string;
  fetchFn?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
  /** Espacement minimal entre deux requêtes (throttle), défaut 250 ms (~4 req/s). */
  minIntervalMs?: number;
}

export class AirtableError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'AirtableError';
  }
}

/**
 * Échappe une valeur insérée dans une chaîne de formule Airtable délimitée
 * par des quotes simples : backslashes d'abord, puis quotes.
 */
export function formulaEscape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const CHUNK_SIZE = 10;
const RETRY_429_MAX = 5;
const RETRY_429_WAIT_MS = 1_000;

const defaultSleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

function chunk<T>(items: readonly T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

export function createAirtableClient(options: AirtableClientOptions = {}): AirtableApi {
  const apiKey = options.apiKey ?? process.env.AIRTABLE_API_KEY;
  const baseId = options.baseId ?? process.env.AIRTABLE_BASE_ID;
  if (!apiKey) {
    throw new AirtableError(
      "AIRTABLE_API_KEY manquante : renseigner la clé dans .env.local (le CRM prospection vit dans Airtable).",
    );
  }
  if (!baseId) {
    throw new AirtableError(
      "AIRTABLE_BASE_ID manquante : renseigner l'id de la base (appXXXX) dans .env.local.",
    );
  }
  const fetchFn = options.fetchFn ?? fetch;
  const sleep = options.sleep ?? defaultSleep;
  const minIntervalMs = options.minIntervalMs ?? 250;
  const baseUrl = `https://api.airtable.com/v0/${baseId}`;

  // Throttle global du client : les requêtes sont sérialisées et espacées de
  // minIntervalMs. Simple et suffisant (volumes CRM : centaines de records).
  let tail: Promise<void> = Promise.resolve();
  function throttled<T>(fn: () => Promise<T>): Promise<T> {
    const run = tail.then(fn);
    tail = run.then(
      () => sleep(minIntervalMs),
      () => sleep(minIntervalMs),
    );
    return run;
  }

  async function request<T>(method: string, url: string, body?: unknown): Promise<T> {
    return throttled(async () => {
      for (let attempt = 0; ; attempt++) {
        const res = await fetchFn(url, {
          method,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        });
        if (res.status === 429) {
          if (attempt >= RETRY_429_MAX) {
            throw new AirtableError(`Airtable 429 persistant après ${RETRY_429_MAX} retries (${url})`, 429);
          }
          await sleep(RETRY_429_WAIT_MS);
          continue;
        }
        if (!res.ok) {
          const detail = await res.text().catch(() => '');
          throw new AirtableError(`Airtable ${res.status} sur ${method} ${url} : ${detail.slice(0, 500)}`, res.status);
        }
        return (await res.json()) as T;
      }
    });
  }

  function tableUrl(table: string): string {
    return `${baseUrl}/${encodeURIComponent(table)}`;
  }

  return {
    async listRecords(table, listOptions = {}) {
      const collected: AirtableRecord[] = [];
      let offset: string | undefined;
      do {
        const params = new URLSearchParams();
        if (listOptions.filterByFormula !== undefined) params.set('filterByFormula', listOptions.filterByFormula);
        if (listOptions.pageSize !== undefined) params.set('pageSize', String(listOptions.pageSize));
        if (listOptions.maxRecords !== undefined) params.set('maxRecords', String(listOptions.maxRecords));
        for (const field of listOptions.fields ?? []) params.append('fields[]', field);
        if (offset !== undefined) params.set('offset', offset);
        const query = params.toString();
        const page = await request<{ records: AirtableRecord[]; offset?: string }>(
          'GET',
          `${tableUrl(table)}${query ? `?${query}` : ''}`,
        );
        collected.push(...page.records);
        offset = page.offset;
        if (listOptions.maxRecords !== undefined && collected.length >= listOptions.maxRecords) {
          return collected.slice(0, listOptions.maxRecords);
        }
      } while (offset !== undefined);
      return collected;
    },

    async createRecords(table, records) {
      const created: AirtableRecord[] = [];
      for (const batch of chunk(records, CHUNK_SIZE)) {
        const page = await request<{ records: AirtableRecord[] }>('POST', tableUrl(table), {
          records: batch.map((fields) => ({ fields })),
        });
        created.push(...page.records);
      }
      return created;
    },

    async updateRecord(table, recordId, fields) {
      return request<AirtableRecord>('PATCH', `${tableUrl(table)}/${recordId}`, { fields });
    },

    async updateRecords(table, updates) {
      const updated: AirtableRecord[] = [];
      for (const batch of chunk(updates, CHUNK_SIZE)) {
        const page = await request<{ records: AirtableRecord[] }>('PATCH', tableUrl(table), {
          records: batch,
        });
        updated.push(...page.records);
      }
      return updated;
    },

    async getRecord(table, recordId) {
      try {
        return await request<AirtableRecord>('GET', `${tableUrl(table)}/${recordId}`);
      } catch (err) {
        if (err instanceof AirtableError && err.status === 404) return null;
        throw err;
      }
    },
  };
}

let defaultApi: AirtableApi | null = null;

/**
 * Client par défaut (env AIRTABLE_API_KEY / AIRTABLE_BASE_ID), créé
 * paresseusement au premier appel : l'import du module ne lit pas l'env
 * (le build Next ne doit pas exiger les clés).
 */
export function defaultAirtableApi(): AirtableApi {
  defaultApi ??= createAirtableClient();
  return defaultApi;
}
