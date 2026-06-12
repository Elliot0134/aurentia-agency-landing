import { describe, expect, it } from 'vitest';
import { computeDueSends, type SequencesDb, type SequencesQuery } from '../engine';

/**
 * now de référence : jeudi 12 juin 2026, 09:00 UTC = 11:00 Europe/Paris (CEST).
 * Toutes les dates des fixtures sont posées relativement à cet instant.
 */
const NOW = new Date('2026-06-12T09:00:00Z');

type Row = Record<string, unknown>;

interface FakeData {
  config?: Row[];
  leads?: Row[];
  touches?: Row[];
}

/**
 * Fake structurel de SequencesDb : filtre en mémoire les chaînes
 * select/in/eq/gte exactement comme PostgREST (gte lexicographique sur ISO).
 */
function fakeDb(data: FakeData): SequencesDb {
  const tables: Record<string, Row[]> = {
    prospection_config: data.config ?? [
      { key: 'sequences_paused', value: false },
      { key: 'cold_daily_cap', value: 10 },
    ],
    prospection_leads: data.leads ?? [],
    prospection_touches: data.touches ?? [],
  };
  function builder(rows: Row[]): SequencesQuery {
    return {
      in(column: string, values: readonly string[]) {
        return builder(rows.filter((r) => values.includes(r[column] as string)));
      },
      eq(column: string, value: string | boolean) {
        return builder(rows.filter((r) => r[column] === value));
      },
      gte(column: string, value: string) {
        return builder(rows.filter((r) => (r[column] as string) >= value));
      },
      then<T>(
        onfulfilled?: ((res: { data: unknown; error: { message: string } | null }) => T) | null,
      ) {
        return Promise.resolve({ data: rows, error: null }).then(onfulfilled);
      },
    } as SequencesQuery;
  }
  return {
    from(table: string) {
      return { select: () => builder(tables[table] ?? []) };
    },
  } as SequencesDb;
}

let leadSeq = 0;
function lead(overrides: Row = {}): Row {
  leadSeq += 1;
  return {
    id: `lead-${leadSeq}`,
    source: 'outbound',
    entreprise: 'Test SARL',
    contact_name: 'Jean Test',
    email: `lead${leadSeq}@exemple.fr`,
    phone: null,
    site_url: 'https://exemple.fr',
    niche_id: null,
    phase: 'pre_audit',
    statut_funnel: 'en_sequence',
    gmail_thread_id: `thread-${leadSeq}`,
    notion_page_id: null,
    assigned_to: null,
    statut_humain: null,
    notes: null,
    opt_out: false,
    bounce: false,
    created_at: `2026-06-01T08:00:0${leadSeq % 10}.000Z`,
    updated_at: '2026-06-01T08:00:00Z',
    ...overrides,
  };
}

function touch(leadId: string, type: string, sentAt: string, channel = 'gmail'): Row {
  return { id: `touch-${leadId}-${type}`, lead_id: leadId, type, channel, sent_at: sentAt };
}

describe('computeDueSends — kill switch', () => {
  it('sequences_paused=true → aucun envoi, un seul skipped global', async () => {
    const db = fakeDb({
      config: [
        { key: 'sequences_paused', value: true },
        { key: 'cold_daily_cap', value: 10 },
      ],
      leads: [lead()],
      touches: [],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: '*', reason: 'paused' }]);
  });

  it('config sequences_paused absente → fail-closed (pause)', async () => {
    const db = fakeDb({ config: [{ key: 'cold_daily_cap', value: 10 }], leads: [lead()] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: '*', reason: 'paused' }]);
  });
});

describe('computeDueSends — sélection des candidats', () => {
  it('exclut opt_out, bounce et statuts hors séquence dès la requête', async () => {
    const stopped1 = lead({ opt_out: true });
    const stopped2 = lead({ bounce: true });
    const stopped3 = lead({ statut_funnel: 'repondu' });
    const db = fakeDb({
      leads: [stopped1, stopped2, stopped3],
      touches: [
        touch(stopped1.id as string, 'flash', '2026-06-07T08:00:00Z'),
        touch(stopped2.id as string, 'flash', '2026-06-07T08:00:00Z'),
        touch(stopped3.id as string, 'flash', '2026-06-07T08:00:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([]);
  });

  it('phase audit → skipped no_sequence (gate humain, pas de relance)', async () => {
    const l = lead({ phase: 'audit' });
    const db = fakeDb({ leads: [l], touches: [touch(l.id as string, 'flash', '2026-06-07T08:00:00Z')] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'no_sequence' }]);
  });
});

describe('computeDueSends — cold (Gmail, ancre = flash)', () => {
  it('flash il y a 5 jours → cold_1 due via gmail dans le fil', async () => {
    const l = lead();
    const db = fakeDb({ leads: [l], touches: [touch(l.id as string, 'flash', '2026-06-07T08:00:00Z')] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toHaveLength(1);
    const payload = result.due[0];
    expect(payload.leadId).toBe(l.id);
    expect(payload.email).toBe(l.email);
    expect(payload.type).toBe('cold_1');
    expect(payload.channel).toBe('gmail');
    expect(payload.gmailThreadId).toBe(l.gmail_thread_id);
    expect(payload.templateVersion).toBe('cold_1@v1');
    expect(payload.subject.length).toBeGreaterThan(0);
    expect(payload.html).toContain('<p');
    expect(payload.text.length).toBeGreaterThan(0);
  });

  it('flash il y a 1 jour → pas encore due (not_due)', async () => {
    const l = lead();
    const db = fakeDb({ leads: [l], touches: [touch(l.id as string, 'flash', '2026-06-11T08:00:00Z')] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'not_due' }]);
  });

  it('cold sans touche flash → skipped no_anchor', async () => {
    const l = lead();
    const db = fakeDb({ leads: [l], touches: [] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'no_anchor' }]);
  });

  it('séquence cold finie → skipped not_due', async () => {
    const l = lead();
    const id = l.id as string;
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(id, 'flash', '2026-05-01T08:00:00Z'),
        touch(id, 'cold_1', '2026-05-04T08:00:00Z'),
        touch(id, 'cold_2', '2026-05-08T08:00:00Z'),
        touch(id, 'cold_3', '2026-05-15T08:00:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'not_due' }]);
  });
});

describe('computeDueSends — idempotence du jour (Europe/Paris)', () => {
  it('touche envoyée aujourd’hui (heure de Paris) → skipped already_touched_today', async () => {
    const l = lead();
    const id = l.id as string;
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(id, 'flash', '2026-06-05T08:00:00Z'),
        // 22:30 UTC le 11 = 00:30 à Paris le 12 → même jour local que NOW.
        touch(id, 'cold_1', '2026-06-11T22:30:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'already_touched_today' }]);
  });

  it('touche envoyée hier (heure de Paris) → la suivante peut partir', async () => {
    const l = lead();
    const id = l.id as string;
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(id, 'flash', '2026-06-05T08:00:00Z'),
        // 20:00 UTC le 11 = 22:00 à Paris le 11 → jour local précédent.
        touch(id, 'cold_1', '2026-06-11T20:00:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    // cold_2 due à flash + 7 j = 12 juin 08:00 UTC <= NOW.
    expect(result.due.map((p) => p.type)).toEqual(['cold_2']);
  });
});

describe('computeDueSends — cap cold quotidien', () => {
  it('3 colds dus, cap 2 → 2 envoyés + 1 skipped cold_cap (ordre created_at)', async () => {
    const l1 = lead({ created_at: '2026-06-01T08:00:00Z' });
    const l2 = lead({ created_at: '2026-06-02T08:00:00Z' });
    const l3 = lead({ created_at: '2026-06-03T08:00:00Z' });
    const db = fakeDb({
      config: [
        { key: 'sequences_paused', value: false },
        { key: 'cold_daily_cap', value: 2 },
      ],
      leads: [l3, l1, l2],
      touches: [
        touch(l1.id as string, 'flash', '2026-06-07T08:00:00Z'),
        touch(l2.id as string, 'flash', '2026-06-07T08:00:00Z'),
        touch(l3.id as string, 'flash', '2026-06-07T08:00:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due.map((p) => p.leadId)).toEqual([l1.id, l2.id]);
    expect(result.skipped).toEqual([{ leadId: l3.id, reason: 'cold_cap' }]);
  });

  it('les touches gmail déjà parties aujourd’hui consomment le cap', async () => {
    const l1 = lead({ created_at: '2026-06-01T08:00:00Z' });
    const l2 = lead({ created_at: '2026-06-02T08:00:00Z' });
    const db = fakeDb({
      config: [
        { key: 'sequences_paused', value: false },
        { key: 'cold_daily_cap', value: 2 },
      ],
      leads: [l1, l2],
      touches: [
        touch(l1.id as string, 'flash', '2026-06-07T08:00:00Z'),
        touch(l2.id as string, 'flash', '2026-06-07T08:00:00Z'),
        // Pré-audit flash parti ce matin vers un AUTRE lead (hors candidats) : compte dans le cap.
        touch('lead-hors-candidats', 'flash', '2026-06-12T06:00:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due.map((p) => p.leadId)).toEqual([l1.id]);
    expect(result.skipped).toEqual([{ leadId: l2.id, reason: 'cold_cap' }]);
  });

  it('le cap ne limite pas les envois resend (inbound)', async () => {
    const cold = lead({ created_at: '2026-06-01T08:00:00Z' });
    const inbound = lead({ source: 'inbound', created_at: '2026-06-02T08:00:00Z' });
    const db = fakeDb({
      config: [
        { key: 'sequences_paused', value: false },
        { key: 'cold_daily_cap', value: 0 },
      ],
      leads: [cold, inbound],
      touches: [
        touch(cold.id as string, 'flash', '2026-06-07T08:00:00Z'),
        touch(inbound.id as string, 'flash', '2026-06-09T08:00:00Z', 'resend'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due.map((p) => [p.leadId, p.channel])).toEqual([[inbound.id, 'resend']]);
    expect(result.skipped).toEqual([{ leadId: cold.id, reason: 'cold_cap' }]);
  });
});

describe('computeDueSends — canaux', () => {
  it('inbound → resend, sans thread Gmail', async () => {
    const l = lead({ source: 'inbound' });
    const db = fakeDb({
      leads: [l],
      touches: [touch(l.id as string, 'flash', '2026-06-09T08:00:00Z', 'resend')],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toHaveLength(1);
    expect(result.due[0].type).toBe('inbound_1');
    expect(result.due[0].channel).toBe('resend');
    expect(result.due[0].gmailThreadId).toBeNull();
  });

  it('refonte → resend', async () => {
    const l = lead({ phase: 'refonte' });
    const db = fakeDb({
      leads: [l],
      touches: [touch(l.id as string, 'flash', '2026-06-05T08:00:00Z')],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toHaveLength(1);
    expect(result.due[0].type).toBe('refonte_1');
    expect(result.due[0].channel).toBe('resend');
  });
});

describe('computeDueSends — ancre refonte', () => {
  it('sans touche refonte : ancre = dernière touche toutes catégories', async () => {
    const l = lead({ phase: 'refonte', source: 'inbound' });
    const id = l.id as string;
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(id, 'flash', '2026-05-03T08:00:00Z', 'resend'),
        touch(id, 'inbound_5', '2026-06-02T08:00:00Z', 'resend'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    // inbound_5 (la plus récente) + 1 j est passé depuis longtemps → refonte_1 due.
    expect(result.due.map((p) => p.type)).toEqual(['refonte_1']);
  });

  it('avec touche refonte : ancre = dernière touche refonte_* (cadence glissante)', async () => {
    const l = lead({ phase: 'refonte', source: 'inbound' });
    const id = l.id as string;
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(id, 'inbound_5', '2026-06-02T08:00:00Z', 'resend'),
        // refonte_1 hier → refonte_2 due à refonte_1 + 2 j → pas encore.
        touch(id, 'refonte_1', '2026-06-11T08:00:00Z', 'resend'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'not_due' }]);
  });

  it('aucune touche : ancre = updated_at du lead', async () => {
    const l = lead({ phase: 'refonte', updated_at: '2026-06-07T08:00:00Z' });
    const db = fakeDb({ leads: [l], touches: [] });
    const result = await computeDueSends(db, NOW);
    expect(result.due.map((p) => p.type)).toEqual(['refonte_1']);
  });
});

describe('computeDueSends — garde-fous de rendu', () => {
  it('site_url manquant → skipped missing_site_url', async () => {
    const l = lead({ site_url: null });
    const db = fakeDb({ leads: [l], touches: [touch(l.id as string, 'flash', '2026-06-07T08:00:00Z')] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'missing_site_url' }]);
  });

  it('linter bloquant : donnée lead contenant un tiret long → le mail ne part pas', async () => {
    const l = lead({ entreprise: 'Café — Le Central' });
    const db = fakeDb({ leads: [l], touches: [touch(l.id as string, 'flash', '2026-06-07T08:00:00Z')] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toHaveLength(1);
    expect(result.skipped[0].leadId).toBe(l.id);
    expect(result.skipped[0].reason).toMatch(/^lint:/);
  });
});
