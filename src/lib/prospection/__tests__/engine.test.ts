import { describe, expect, it } from 'vitest';
import { computeDueSends, type EngineDb } from '../engine';
import type { ProspectionLead, ProspectionTouch, TouchChannel, TouchType } from '../db';

/**
 * now de référence : jeudi 12 juin 2026, 09:00 UTC = 11:00 Europe/Paris (CEST).
 * Toutes les dates des fixtures sont posées relativement à cet instant.
 *
 * Le moteur consomme une interface étroite de fonctions (EngineDb) : les
 * stubs ci-dessous remplacent les helpers de db.ts, zéro réseau. Le stub
 * listLeadsByStatus filtre par statut comme la vraie fonction (formule
 * Airtable) ; opt_out/bounce sont filtrés par le moteur lui-même.
 */
const NOW = new Date('2026-06-12T09:00:00Z');

interface FakeData {
  config?: Record<string, string>;
  leads?: ProspectionLead[];
  touches?: ProspectionTouch[];
}

const DEFAULT_CONFIG: Record<string, string> = {
  sequences_paused: 'false',
  cold_daily_cap: '10',
};

function fakeDb(data: FakeData): EngineDb {
  const config = data.config ?? DEFAULT_CONFIG;
  return {
    getConfig: async (key) => config[key] ?? null,
    listLeadsByStatus: async (statuts) =>
      (data.leads ?? []).filter((lead) => statuts.includes(lead.statutFunnel)),
    listTouches: async () => data.touches ?? [],
  };
}

let leadSeq = 0;
function lead(overrides: Partial<ProspectionLead> = {}): ProspectionLead {
  leadSeq += 1;
  return {
    id: `rec-lead-${leadSeq}`,
    source: 'outbound',
    entreprise: 'Test SARL',
    contactName: 'Jean Test',
    email: `lead${leadSeq}@exemple.fr`,
    phone: null,
    siteUrl: 'https://exemple.fr',
    nicheId: null,
    phase: 'pre_audit',
    statutFunnel: 'en_sequence',
    gmailThreadId: `thread-${leadSeq}`,
    assignedTo: null,
    statutHumain: null,
    notes: null,
    scoreFlash: null,
    optOut: false,
    bounce: false,
    dernierContact: null,
    createdAt: `2026-06-01T08:00:0${leadSeq % 10}.000Z`,
    ...overrides,
  };
}

function touch(leadId: string, type: TouchType, sentAt: string, channel: TouchChannel = 'gmail'): ProspectionTouch {
  return {
    id: `touch-${leadId}-${type}`,
    leadId,
    type,
    channel,
    sentAt,
    messageId: null,
    templateVersion: null,
  };
}

describe('computeDueSends — kill switch (valeurs Config string)', () => {
  it("sequences_paused='true' → aucun envoi, un seul skipped global", async () => {
    const db = fakeDb({
      config: { sequences_paused: 'true', cold_daily_cap: '10' },
      leads: [lead()],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: '*', reason: 'paused' }]);
  });

  it('clé absente (null) → fail-closed (pause)', async () => {
    const db = fakeDb({ config: { cold_daily_cap: '10' }, leads: [lead()] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: '*', reason: 'paused' }]);
  });

  it("valeur illisible ('FALSE', 'non') → pause aussi : seule 'false' exacte autorise", async () => {
    for (const value of ['FALSE', 'non', '0', ' false ']) {
      const db = fakeDb({ config: { sequences_paused: value, cold_daily_cap: '10' }, leads: [lead()] });
      const result = await computeDueSends(db, NOW);
      expect(result.skipped).toEqual([{ leadId: '*', reason: 'paused' }]);
    }
  });

  it("cold_daily_cap illisible → cap 0 (aucun cold ne part)", async () => {
    const l = lead();
    const db = fakeDb({
      config: { sequences_paused: 'false', cold_daily_cap: 'beaucoup' },
      leads: [l],
      touches: [touch(l.id, 'flash', '2026-06-07T08:00:00Z')],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'cold_cap' }]);
  });
});

describe('computeDueSends — sélection des candidats', () => {
  it('exclut opt_out, bounce (silencieux) et statuts hors séquence (hors candidats)', async () => {
    const stopped1 = lead({ optOut: true });
    const stopped2 = lead({ bounce: true });
    const stopped3 = lead({ statutFunnel: 'repondu' });
    const db = fakeDb({
      leads: [stopped1, stopped2, stopped3],
      touches: [
        touch(stopped1.id, 'flash', '2026-06-07T08:00:00Z'),
        touch(stopped2.id, 'flash', '2026-06-07T08:00:00Z'),
        touch(stopped3.id, 'flash', '2026-06-07T08:00:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([]);
  });

  it('phase audit → skipped no_sequence (gate humain, pas de relance)', async () => {
    const l = lead({ phase: 'audit' });
    const db = fakeDb({ leads: [l], touches: [touch(l.id, 'flash', '2026-06-07T08:00:00Z')] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'no_sequence' }]);
  });
});

describe('computeDueSends — cold (Gmail, ancre = flash)', () => {
  it('flash il y a 5 jours → cold_1 due via gmail dans le fil', async () => {
    const l = lead();
    const db = fakeDb({ leads: [l], touches: [touch(l.id, 'flash', '2026-06-07T08:00:00Z')] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toHaveLength(1);
    const payload = result.due[0];
    expect(payload.leadId).toBe(l.id);
    expect(payload.email).toBe(l.email);
    expect(payload.type).toBe('cold_1');
    expect(payload.channel).toBe('gmail');
    expect(payload.gmailThreadId).toBe(l.gmailThreadId);
    expect(payload.templateVersion).toBe('cold_1@v1');
    expect(payload.subject.length).toBeGreaterThan(0);
    expect(payload.html).toContain('<p');
    expect(payload.text.length).toBeGreaterThan(0);
  });

  it('flash il y a 1 jour → pas encore due (not_due)', async () => {
    const l = lead();
    const db = fakeDb({ leads: [l], touches: [touch(l.id, 'flash', '2026-06-11T08:00:00Z')] });
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
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(l.id, 'flash', '2026-05-01T08:00:00Z'),
        touch(l.id, 'cold_1', '2026-05-04T08:00:00Z'),
        touch(l.id, 'cold_2', '2026-05-08T08:00:00Z'),
        touch(l.id, 'cold_3', '2026-05-15T08:00:00Z'),
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
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(l.id, 'flash', '2026-06-05T08:00:00Z'),
        // 22:30 UTC le 11 = 00:30 à Paris le 12 → même jour local que NOW.
        touch(l.id, 'cold_1', '2026-06-11T22:30:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'already_touched_today' }]);
  });

  it('touche envoyée hier (heure de Paris) → la suivante peut partir', async () => {
    const l = lead();
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(l.id, 'flash', '2026-06-05T08:00:00Z'),
        // 20:00 UTC le 11 = 22:00 à Paris le 11 → jour local précédent.
        touch(l.id, 'cold_1', '2026-06-11T20:00:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    // cold_2 due à flash + 7 j = 12 juin 08:00 UTC <= NOW.
    expect(result.due.map((p) => p.type)).toEqual(['cold_2']);
  });
});

describe('computeDueSends — cap cold quotidien', () => {
  it('3 colds dus, cap 2 → 2 envoyés + 1 skipped cold_cap (ordre createdAt)', async () => {
    const l1 = lead({ createdAt: '2026-06-01T08:00:00Z' });
    const l2 = lead({ createdAt: '2026-06-02T08:00:00Z' });
    const l3 = lead({ createdAt: '2026-06-03T08:00:00Z' });
    const db = fakeDb({
      config: { sequences_paused: 'false', cold_daily_cap: '2' },
      leads: [l3, l1, l2],
      touches: [
        touch(l1.id, 'flash', '2026-06-07T08:00:00Z'),
        touch(l2.id, 'flash', '2026-06-07T08:00:00Z'),
        touch(l3.id, 'flash', '2026-06-07T08:00:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due.map((p) => p.leadId)).toEqual([l1.id, l2.id]);
    expect(result.skipped).toEqual([{ leadId: l3.id, reason: 'cold_cap' }]);
  });

  it('les touches gmail déjà parties aujourd’hui consomment le cap', async () => {
    const l1 = lead({ createdAt: '2026-06-01T08:00:00Z' });
    const l2 = lead({ createdAt: '2026-06-02T08:00:00Z' });
    const db = fakeDb({
      config: { sequences_paused: 'false', cold_daily_cap: '2' },
      leads: [l1, l2],
      touches: [
        touch(l1.id, 'flash', '2026-06-07T08:00:00Z'),
        touch(l2.id, 'flash', '2026-06-07T08:00:00Z'),
        // Pré-audit flash parti ce matin vers un AUTRE lead (hors candidats) : compte dans le cap.
        touch('rec-hors-candidats', 'flash', '2026-06-12T06:00:00Z'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due.map((p) => p.leadId)).toEqual([l1.id]);
    expect(result.skipped).toEqual([{ leadId: l2.id, reason: 'cold_cap' }]);
  });

  it('le cap ne limite pas les envois resend (inbound)', async () => {
    const cold = lead({ createdAt: '2026-06-01T08:00:00Z' });
    const inbound = lead({ source: 'inbound', createdAt: '2026-06-02T08:00:00Z' });
    const db = fakeDb({
      config: { sequences_paused: 'false', cold_daily_cap: '0' },
      leads: [cold, inbound],
      touches: [
        touch(cold.id, 'flash', '2026-06-07T08:00:00Z'),
        touch(inbound.id, 'flash', '2026-06-09T08:00:00Z', 'resend'),
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
      touches: [touch(l.id, 'flash', '2026-06-09T08:00:00Z', 'resend')],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toHaveLength(1);
    expect(result.due[0].type).toBe('inbound_1');
    expect(result.due[0].channel).toBe('resend');
    expect(result.due[0].gmailThreadId).toBeNull();
  });

  it('refonte (statut pro_envoye, phase dérivée) → resend', async () => {
    const l = lead({ phase: 'refonte', statutFunnel: 'pro_envoye' });
    const db = fakeDb({
      leads: [l],
      touches: [touch(l.id, 'flash', '2026-06-05T08:00:00Z')],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toHaveLength(1);
    expect(result.due[0].type).toBe('refonte_1');
    expect(result.due[0].channel).toBe('resend');
  });
});

describe('computeDueSends — ancre refonte', () => {
  it('sans touche refonte : ancre = dernière touche toutes catégories', async () => {
    const l = lead({ phase: 'refonte', statutFunnel: 'pro_envoye', source: 'inbound' });
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(l.id, 'flash', '2026-05-03T08:00:00Z', 'resend'),
        touch(l.id, 'inbound_5', '2026-06-02T08:00:00Z', 'resend'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    // inbound_5 (la plus récente) + 1 j est passé depuis longtemps → refonte_1 due.
    expect(result.due.map((p) => p.type)).toEqual(['refonte_1']);
  });

  it('avec touche refonte : ancre = dernière touche refonte_* (cadence glissante)', async () => {
    const l = lead({ phase: 'refonte', statutFunnel: 'pro_envoye', source: 'inbound' });
    const db = fakeDb({
      leads: [l],
      touches: [
        touch(l.id, 'inbound_5', '2026-06-02T08:00:00Z', 'resend'),
        // refonte_1 hier → refonte_2 due à refonte_1 + 2 j → pas encore.
        touch(l.id, 'refonte_1', '2026-06-11T08:00:00Z', 'resend'),
      ],
    });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'not_due' }]);
  });

  it('aucune touche : ancre = Dernier contact du lead, sinon createdAt', async () => {
    const l = lead({ phase: 'refonte', statutFunnel: 'pro_envoye', dernierContact: '2026-06-07T08:00:00Z' });
    const db = fakeDb({ leads: [l], touches: [] });
    const result = await computeDueSends(db, NOW);
    expect(result.due.map((p) => p.type)).toEqual(['refonte_1']);

    const sansContact = lead({
      phase: 'refonte',
      statutFunnel: 'pro_envoye',
      dernierContact: null,
      createdAt: '2026-06-07T08:00:00Z',
    });
    const db2 = fakeDb({ leads: [sansContact], touches: [] });
    const result2 = await computeDueSends(db2, NOW);
    expect(result2.due.map((p) => p.type)).toEqual(['refonte_1']);
  });
});

describe('computeDueSends — garde-fous de rendu', () => {
  it('siteUrl manquant → skipped missing_site_url', async () => {
    const l = lead({ siteUrl: null });
    const db = fakeDb({ leads: [l], touches: [touch(l.id, 'flash', '2026-06-07T08:00:00Z')] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toEqual([{ leadId: l.id, reason: 'missing_site_url' }]);
  });

  it('linter bloquant : donnée lead contenant un tiret long → le mail ne part pas', async () => {
    const l = lead({ entreprise: 'Café — Le Central' });
    const db = fakeDb({ leads: [l], touches: [touch(l.id, 'flash', '2026-06-07T08:00:00Z')] });
    const result = await computeDueSends(db, NOW);
    expect(result.due).toEqual([]);
    expect(result.skipped).toHaveLength(1);
    expect(result.skipped[0].leadId).toBe(l.id);
    expect(result.skipped[0].reason).toMatch(/^lint:/);
  });
});
