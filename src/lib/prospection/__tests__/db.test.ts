import { describe, expect, it } from 'vitest';
import {
  createLead,
  findTouchByMessageId,
  getConfig,
  getLeadByEmail,
  getLeadByGmailThreadId,
  getLeadById,
  getLeadByNotionPageId,
  insertReply,
  insertTouch,
  listLeadsByStatus,
  listLeadsChangedSince,
  setConfig,
  touchesForLead,
  updateLead,
  type ProspectionDb,
  type ProspectionQuery,
  type ProspectionTable,
} from '../db';

/**
 * Fake structurel de ProspectionDb (même approche que le fake SequencesDb des
 * tests engine) : tables en mémoire, filtres appliqués comme PostgREST,
 * contrainte unique sur prospection_replies.gmail_message_id simulée.
 */

type Row = Record<string, unknown>;

function leadRow(overrides: Row = {}): Row {
  return {
    id: 'lead-1',
    source: 'outbound',
    entreprise: 'Test SARL',
    contact_name: 'Jean Test',
    email: 'jean@exemple.fr',
    phone: null,
    site_url: 'https://exemple.fr',
    niche_id: null,
    phase: 'pre_audit',
    statut_funnel: 'nouveau',
    gmail_thread_id: null,
    notion_page_id: null,
    assigned_to: null,
    statut_humain: null,
    notes: null,
    opt_out: false,
    bounce: false,
    created_at: '2026-06-01T08:00:00Z',
    updated_at: '2026-06-01T08:00:00Z',
    ...overrides,
  };
}

interface Fake {
  db: ProspectionDb;
  tables: Record<ProspectionTable, Row[]>;
}

function makeFake(initial: Partial<Record<ProspectionTable, Row[]>> = {}): Fake {
  const tables: Record<ProspectionTable, Row[]> = {
    prospection_leads: initial.prospection_leads ?? [],
    prospection_touches: initial.prospection_touches ?? [],
    prospection_replies: initial.prospection_replies ?? [],
    prospection_config: initial.prospection_config ?? [],
  };
  let seq = 0;

  function builder(rows: Row[]): ProspectionQuery {
    return {
      eq: (column: string, value: string | boolean) => builder(rows.filter((r) => r[column] === value)),
      in: (column: string, values: readonly string[]) =>
        builder(rows.filter((r) => values.includes(r[column] as string))),
      gte: (column: string, value: string) => builder(rows.filter((r) => (r[column] as string) >= value)),
      order: (column: string, { ascending }: { ascending: boolean }) =>
        builder(
          [...rows].sort((a, b) => {
            const cmp = String(a[column]).localeCompare(String(b[column]));
            return ascending ? cmp : -cmp;
          }),
        ),
      limit: (count: number) => builder(rows.slice(0, count)),
      maybeSingle: () => Promise.resolve({ data: rows[0] ?? null, error: null }),
      then: <T>(onfulfilled?: ((res: { data: unknown; error: null }) => T) | null) =>
        Promise.resolve({ data: rows, error: null }).then(onfulfilled),
    } as ProspectionQuery;
  }

  const db = {
    from(table: ProspectionTable) {
      return {
        select: () => builder(tables[table]),
        insert(values: Record<string, unknown>) {
          return {
            select: () => ({
              single: () => {
                if (
                  table === 'prospection_replies' &&
                  tables[table].some((r) => r.gmail_message_id === values.gmail_message_id)
                ) {
                  return Promise.resolve({
                    data: null,
                    error: { message: 'duplicate key value violates unique constraint', code: '23505' },
                  });
                }
                seq += 1;
                const row: Row = {
                  id: `row-${seq}`,
                  created_at: '2026-06-12T10:00:00Z',
                  updated_at: '2026-06-12T10:00:00Z',
                  ...(table === 'prospection_touches' ? { sent_at: '2026-06-12T10:00:00Z', message_id: null, template_version: null } : {}),
                  ...(table === 'prospection_replies'
                    ? { received_at: '2026-06-12T10:00:00Z', confidence: null, snippet: null }
                    : {}),
                  ...(table === 'prospection_leads' ? leadRow({ id: `row-${seq}` }) : {}),
                  ...values,
                };
                tables[table].push(row);
                return Promise.resolve({ data: row, error: null });
              },
            }),
          };
        },
        update(values: Record<string, unknown>) {
          return {
            eq: (column: string, value: string) => {
              for (const r of tables[table]) {
                if (r[column] === value) Object.assign(r, values);
              }
              return Promise.resolve({ error: null });
            },
          };
        },
        upsert(values: Record<string, unknown>) {
          const existing = tables[table].find((r) => r.key === values.key);
          if (existing) Object.assign(existing, values);
          else tables[table].push({ ...values });
          return Promise.resolve({ error: null });
        },
      };
    },
  } as ProspectionDb;

  return { db, tables };
}

describe('leads : lectures', () => {
  it('getLeadByEmail : trouve le lead, mappe snake_case → camelCase, normalise la casse', async () => {
    const { db } = makeFake({ prospection_leads: [leadRow()] });
    const lead = await getLeadByEmail('  Jean@Exemple.FR ', db);
    expect(lead).not.toBeNull();
    expect(lead?.contactName).toBe('Jean Test');
    expect(lead?.siteUrl).toBe('https://exemple.fr');
    expect(lead?.statutFunnel).toBe('nouveau');
    expect(lead?.optOut).toBe(false);
  });

  it('getLeadByEmail : null si absent', async () => {
    const { db } = makeFake();
    expect(await getLeadByEmail('inconnu@exemple.fr', db)).toBeNull();
  });

  it('getLeadById / getLeadByGmailThreadId / getLeadByNotionPageId : filtrent sur la bonne colonne', async () => {
    const { db } = makeFake({
      prospection_leads: [
        leadRow({ id: 'lead-a', gmail_thread_id: 'thread-a', notion_page_id: 'notion-a', email: 'a@exemple.fr' }),
        leadRow({ id: 'lead-b', gmail_thread_id: 'thread-b', notion_page_id: 'notion-b', email: 'b@exemple.fr' }),
      ],
    });
    expect((await getLeadById('lead-b', db))?.email).toBe('b@exemple.fr');
    expect((await getLeadByGmailThreadId('thread-a', db))?.id).toBe('lead-a');
    expect((await getLeadByNotionPageId('notion-b', db))?.id).toBe('lead-b');
    expect(await getLeadByNotionPageId('notion-x', db)).toBeNull();
  });

  it('listLeadsByStatus : filtre par statut et trie par created_at croissant', async () => {
    const { db } = makeFake({
      prospection_leads: [
        leadRow({ id: 'l2', statut_funnel: 'nouveau', created_at: '2026-06-02T00:00:00Z', email: 'l2@x.fr' }),
        leadRow({ id: 'l3', statut_funnel: 'perdu', created_at: '2026-06-03T00:00:00Z', email: 'l3@x.fr' }),
        leadRow({ id: 'l1', statut_funnel: 'flash_envoye', created_at: '2026-06-01T00:00:00Z', email: 'l1@x.fr' }),
      ],
    });
    const leads = await listLeadsByStatus(['nouveau', 'flash_envoye'], db);
    expect(leads.map((l) => l.id)).toEqual(['l1', 'l2']);
  });

  it('listLeadsChangedSince : updated_at >= since (inclusif), tri croissant, limite', async () => {
    const { db } = makeFake({
      prospection_leads: [
        leadRow({ id: 'l1', updated_at: '2026-06-10T00:00:00Z', email: 'l1@x.fr' }),
        leadRow({ id: 'l3', updated_at: '2026-06-12T00:00:00Z', email: 'l3@x.fr' }),
        leadRow({ id: 'l2', updated_at: '2026-06-11T00:00:00Z', email: 'l2@x.fr' }),
      ],
    });
    const leads = await listLeadsChangedSince('2026-06-11T00:00:00Z', db);
    expect(leads.map((l) => l.id)).toEqual(['l2', 'l3']);
    const limited = await listLeadsChangedSince('2026-06-11T00:00:00Z', db, 1);
    expect(limited.map((l) => l.id)).toEqual(['l2']);
  });
});

describe('leads : écritures', () => {
  it('createLead : insère en snake_case, email normalisé, retourne le lead mappé', async () => {
    const { db, tables } = makeFake();
    const lead = await createLead(
      { source: 'inbound', email: 'New@Exemple.fr', contactName: 'Léa', siteUrl: 'https://nouveau.fr' },
      db,
    );
    expect(lead.email).toBe('new@exemple.fr');
    expect(lead.contactName).toBe('Léa');
    expect(tables.prospection_leads[0].contact_name).toBe('Léa');
    expect(tables.prospection_leads[0].site_url).toBe('https://nouveau.fr');
  });

  it('updateLead : mappe le patch camelCase vers les colonnes snake_case', async () => {
    const { db, tables } = makeFake({ prospection_leads: [leadRow()] });
    await updateLead('lead-1', { statutFunnel: 'flash_envoye', gmailThreadId: 'thread-9', optOut: true }, db);
    const row = tables.prospection_leads[0];
    expect(row.statut_funnel).toBe('flash_envoye');
    expect(row.gmail_thread_id).toBe('thread-9');
    expect(row.opt_out).toBe(true);
  });

  it('updateLead : patch vide = no-op (aucune requête)', async () => {
    const { db, tables } = makeFake({ prospection_leads: [leadRow()] });
    await updateLead('lead-1', {}, db);
    expect(tables.prospection_leads[0].statut_funnel).toBe('nouveau');
  });
});

describe('touches', () => {
  it('insertTouch + touchesForLead : insère et relit (tri sent_at croissant)', async () => {
    const { db } = makeFake();
    await insertTouch({ leadId: 'lead-1', type: 'flash', channel: 'gmail', sentAt: '2026-06-10T08:00:00Z' }, db);
    await insertTouch(
      { leadId: 'lead-1', type: 'cold_1', channel: 'gmail', sentAt: '2026-06-13T08:00:00Z', messageId: 'msg-2', templateVersion: 'cold_1@v1' },
      db,
    );
    await insertTouch({ leadId: 'lead-2', type: 'flash', channel: 'resend', sentAt: '2026-06-11T08:00:00Z' }, db);
    const touches = await touchesForLead('lead-1', db);
    expect(touches.map((t) => t.type)).toEqual(['flash', 'cold_1']);
    expect(touches[1].messageId).toBe('msg-2');
    expect(touches[1].templateVersion).toBe('cold_1@v1');
  });

  it('findTouchByMessageId : trouve par message_id, null sinon', async () => {
    const { db } = makeFake();
    await insertTouch({ leadId: 'lead-1', type: 'cold_1', channel: 'gmail', messageId: 'msg-42' }, db);
    expect((await findTouchByMessageId('msg-42', db))?.leadId).toBe('lead-1');
    expect(await findTouchByMessageId('msg-absent', db)).toBeNull();
  });
});

describe('replies', () => {
  it('insertReply : insère et retourne la réponse mappée', async () => {
    const { db } = makeFake();
    const result = await insertReply(
      { leadId: 'lead-1', gmailMessageId: 'gm-1', classification: 'interesse', confidence: 0.92, snippet: 'Oui, appelez-moi' },
      db,
    );
    expect(result.duplicate).toBe(false);
    expect(result.reply?.classification).toBe('interesse');
    expect(result.reply?.gmailMessageId).toBe('gm-1');
  });

  it('insertReply : conflit gmail_message_id (23505) → duplicate true, pas une erreur', async () => {
    const { db, tables } = makeFake();
    await insertReply({ leadId: 'lead-1', gmailMessageId: 'gm-1', classification: 'question' }, db);
    const second = await insertReply({ leadId: 'lead-1', gmailMessageId: 'gm-1', classification: 'question' }, db);
    expect(second.duplicate).toBe(true);
    expect(second.reply).toBeNull();
    expect(tables.prospection_replies).toHaveLength(1);
  });
});

describe('config', () => {
  it('getConfig : valeur jsonb si présente, null si absente', async () => {
    const { db } = makeFake({ prospection_config: [{ key: 'sequences_paused', value: false }] });
    expect(await getConfig('sequences_paused', db)).toBe(false);
    expect(await getConfig('clef_absente', db)).toBeNull();
  });

  it('setConfig : upsert (crée puis remplace)', async () => {
    const { db, tables } = makeFake();
    await setConfig('cold_daily_cap', 10, db);
    expect(tables.prospection_config).toEqual([{ key: 'cold_daily_cap', value: 10 }]);
    await setConfig('cold_daily_cap', 20, db);
    expect(tables.prospection_config).toEqual([{ key: 'cold_daily_cap', value: 20 }]);
  });
});
