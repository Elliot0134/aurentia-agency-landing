import { describe, it, expect } from 'vitest';
import {
  createJob,
  getJob,
  updateJob,
  findLatestJobByEmail,
  findJobByStripeSessionId,
  findActiveFlashJobByLeadId,
  type AuditJobsDb,
} from '../jobs';

/** Ligne snake_case complète telle que renvoyée par PostgREST. */
function fakeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: 'job-1',
    lead_id: null,
    email: 'prospect@example.fr',
    url: 'https://exemple.fr/',
    tier: 'flash',
    channel: 'inbound',
    status: 'queued',
    stripe_session_id: null,
    workflow_run_id: null,
    score: null,
    impact_percent: null,
    writer_model: null,
    subject: null,
    html: null,
    pdf_path: null,
    error: null,
    review_token: null,
    created_at: '2026-06-12T10:00:00Z',
    updated_at: '2026-06-12T10:00:00Z',
    ...overrides,
  };
}

interface FakeCalls {
  inserted: Record<string, unknown>[];
  updated: Array<{ values: Record<string, unknown>; id: string }>;
  selected: Array<{ column: string; value: string }>;
  ordered: Array<{ column: string; ascending: boolean; limit: number | null }>;
  inFiltered: Array<{ column: string; values: readonly string[]; limit: number | null }>;
}

/** Fake structurel du client Supabase : capture les appels, zéro réseau. */
function fakeDb(opts: {
  insertResult?: { data: unknown; error: { message: string } | null };
  selectResult?: { data: unknown; error: { message: string } | null };
  listResult?: { data: unknown; error: { message: string } | null };
  updateError?: { message: string } | null;
}): { db: AuditJobsDb; calls: FakeCalls } {
  const calls: FakeCalls = { inserted: [], updated: [], selected: [], ordered: [], inFiltered: [] };
  const db: AuditJobsDb = {
    from: () => ({
      insert: (values: Record<string, unknown>) => {
        calls.inserted.push(values);
        return {
          select: () => ({
            single: () => Promise.resolve(opts.insertResult ?? { data: fakeRow(), error: null }),
          }),
        };
      },
      select: () => ({
        eq: (column: string, value: string) => {
          calls.selected.push({ column, value });
          return {
            maybeSingle: () => Promise.resolve(opts.selectResult ?? { data: null, error: null }),
            order: (orderColumn: string, options: { ascending: boolean }) => {
              const ordered = { column: orderColumn, ascending: options.ascending, limit: null as number | null };
              calls.ordered.push(ordered);
              return {
                limit: (count: number) => {
                  ordered.limit = count;
                  return Promise.resolve(opts.listResult ?? { data: [], error: null });
                },
              };
            },
            eq: (column2: string, value2: string) => {
              calls.selected.push({ column: column2, value: value2 });
              return {
                in: (inColumn: string, values: readonly string[]) => {
                  const filtered = { column: inColumn, values, limit: null as number | null };
                  calls.inFiltered.push(filtered);
                  return {
                    limit: (count: number) => {
                      filtered.limit = count;
                      return Promise.resolve(opts.listResult ?? { data: [], error: null });
                    },
                  };
                },
              };
            },
          };
        },
      }),
      update: (values: Record<string, unknown>) => ({
        eq: (_col: string, id: string) => {
          calls.updated.push({ values, id });
          return Promise.resolve({ error: opts.updateError ?? null });
        },
      }),
    }),
  };
  return { db, calls };
}

describe('createJob', () => {
  it('insère les colonnes snake_case et retourne le job mappé en camelCase', async () => {
    const { db, calls } = fakeDb({ insertResult: { data: fakeRow(), error: null } });
    const job = await createJob(
      { email: 'prospect@example.fr', url: 'https://exemple.fr/', tier: 'flash', channel: 'inbound' },
      db,
    );
    expect(calls.inserted).toEqual([
      { email: 'prospect@example.fr', url: 'https://exemple.fr/', tier: 'flash', channel: 'inbound' },
    ]);
    expect(job.id).toBe('job-1');
    expect(job.status).toBe('queued');
    expect(job.stripeSessionId).toBeNull();
    expect(job.createdAt).toBe('2026-06-12T10:00:00Z');
  });

  it('transmet stripe_session_id quand fourni (job pro payé)', async () => {
    const { db, calls } = fakeDb({
      insertResult: { data: fakeRow({ tier: 'pro', stripe_session_id: 'cs_123' }), error: null },
    });
    const job = await createJob(
      { email: 'p@e.fr', url: 'https://exemple.fr/', tier: 'pro', channel: 'inbound', stripeSessionId: 'cs_123' },
      db,
    );
    expect(calls.inserted[0].stripe_session_id).toBe('cs_123');
    expect(job.stripeSessionId).toBe('cs_123');
  });

  it("throw si l'insert échoue", async () => {
    const { db } = fakeDb({ insertResult: { data: null, error: { message: 'duplicate key' } } });
    await expect(
      createJob({ email: 'p@e.fr', url: 'https://exemple.fr/', tier: 'flash', channel: 'cold' }, db),
    ).rejects.toThrow(/duplicate key/);
  });
});

describe('getJob', () => {
  it('retourne le job mappé quand la ligne existe', async () => {
    const { db, calls } = fakeDb({
      selectResult: { data: fakeRow({ status: 'running', workflow_run_id: 'wrun_1' }), error: null },
    });
    const job = await getJob('job-1', db);
    expect(calls.selected).toEqual([{ column: 'id', value: 'job-1' }]);
    expect(job?.status).toBe('running');
    expect(job?.workflowRunId).toBe('wrun_1');
  });

  it('retourne null quand la ligne est absente', async () => {
    const { db } = fakeDb({ selectResult: { data: null, error: null } });
    expect(await getJob('inconnu', db)).toBeNull();
  });

  it('throw si la lecture échoue', async () => {
    const { db } = fakeDb({ selectResult: { data: null, error: { message: 'timeout' } } });
    await expect(getJob('job-1', db)).rejects.toThrow(/timeout/);
  });
});

describe('updateJob', () => {
  it('mappe le patch camelCase vers les colonnes snake_case', async () => {
    const { db, calls } = fakeDb({});
    await updateJob(
      'job-1',
      { status: 'delivered', score: 62, impactPercent: 14, writerModel: 'gemini', pdfPath: 'pro/job-1/audit.pdf' },
      db,
    );
    expect(calls.updated).toEqual([
      {
        id: 'job-1',
        values: {
          status: 'delivered',
          score: 62,
          impact_percent: 14,
          writer_model: 'gemini',
          pdf_path: 'pro/job-1/audit.pdf',
        },
      },
    ]);
  });

  it('ignore les champs undefined et ne touche pas la DB sur un patch vide', async () => {
    const { db, calls } = fakeDb({});
    await updateJob('job-1', {}, db);
    expect(calls.updated).toEqual([]);
  });

  it('throw si la mise à jour échoue', async () => {
    const { db } = fakeDb({ updateError: { message: 'connection refused' } });
    await expect(updateJob('job-1', { status: 'failed' }, db)).rejects.toThrow(/connection refused/);
  });
});

describe('findLatestJobByEmail', () => {
  it('filtre par email, trie created_at desc, limite à 1 et mappe la ligne', async () => {
    const { db, calls } = fakeDb({
      listResult: { data: [fakeRow({ id: 'job-flash', url: 'https://exemple.fr/' })], error: null },
    });
    const job = await findLatestJobByEmail('prospect@example.fr', db);
    expect(calls.selected).toEqual([{ column: 'email', value: 'prospect@example.fr' }]);
    expect(calls.ordered).toEqual([{ column: 'created_at', ascending: false, limit: 1 }]);
    expect(job?.id).toBe('job-flash');
    expect(job?.url).toBe('https://exemple.fr/');
  });

  it("retourne null quand aucun job n'existe pour cet email", async () => {
    const { db } = fakeDb({ listResult: { data: [], error: null } });
    expect(await findLatestJobByEmail('inconnu@example.fr', db)).toBeNull();
  });

  it('throw si la lecture échoue', async () => {
    const { db } = fakeDb({ listResult: { data: null, error: { message: 'timeout' } } });
    await expect(findLatestJobByEmail('p@e.fr', db)).rejects.toThrow(/timeout/);
  });
});

describe('findActiveFlashJobByLeadId', () => {
  it('filtre lead_id + tier=flash + statuts actifs (failed et refunded exclus : retry légitime)', async () => {
    const { db, calls } = fakeDb({
      listResult: { data: [fakeRow({ id: 'job-actif', lead_id: 'lead-1', tier: 'flash', status: 'queued' })], error: null },
    });
    const job = await findActiveFlashJobByLeadId('lead-1', db);
    expect(calls.selected).toEqual([
      { column: 'lead_id', value: 'lead-1' },
      { column: 'tier', value: 'flash' },
    ]);
    expect(calls.inFiltered).toEqual([
      {
        column: 'status',
        values: ['queued', 'running', 'ready_to_send', 'ready_for_review', 'delivered'],
        limit: 1,
      },
    ]);
    expect(job?.id).toBe('job-actif');
    expect(job?.status).toBe('queued');
  });

  it('retourne null quand le lead n’a aucun job flash actif (ex. uniquement failed/refunded)', async () => {
    const { db } = fakeDb({ listResult: { data: [], error: null } });
    expect(await findActiveFlashJobByLeadId('lead-1', db)).toBeNull();
  });

  it('throw si la lecture échoue', async () => {
    const { db } = fakeDb({ listResult: { data: null, error: { message: 'timeout' } } });
    await expect(findActiveFlashJobByLeadId('lead-1', db)).rejects.toThrow(/timeout/);
  });
});

describe('findJobByStripeSessionId', () => {
  it('retourne le job mappé quand la session est connue', async () => {
    const { db, calls } = fakeDb({
      selectResult: { data: fakeRow({ id: 'job-pro', tier: 'pro', stripe_session_id: 'cs_123' }), error: null },
    });
    const job = await findJobByStripeSessionId('cs_123', db);
    expect(calls.selected).toEqual([{ column: 'stripe_session_id', value: 'cs_123' }]);
    expect(job?.id).toBe('job-pro');
    expect(job?.stripeSessionId).toBe('cs_123');
  });

  it('retourne null quand la session est inconnue', async () => {
    const { db } = fakeDb({ selectResult: { data: null, error: null } });
    expect(await findJobByStripeSessionId('cs_inconnu', db)).toBeNull();
  });

  it('throw si la lecture échoue', async () => {
    const { db } = fakeDb({ selectResult: { data: null, error: { message: 'timeout' } } });
    await expect(findJobByStripeSessionId('cs_123', db)).rejects.toThrow(/timeout/);
  });
});
