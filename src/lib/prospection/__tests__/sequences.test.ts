import { describe, expect, it } from 'vitest';
import {
  CADENCES,
  isSequenceStopped,
  nextDueStep,
  sequenceKindForLead,
  type SequenceKind,
  type StatutFunnel,
} from '../sequences';

const DAY_MS = 86_400_000;

/** Ancre fixe pour tous les tests : 2026-06-01T10:00:00Z. */
const ANCHOR = new Date('2026-06-01T10:00:00Z');

function daysAfterAnchor(days: number): Date {
  return new Date(ANCHOR.getTime() + days * DAY_MS);
}

function touch(type: string, sentDaysAfterAnchor: number): { type: string; sent_at: string } {
  return { type, sent_at: daysAfterAnchor(sentDaysAfterAnchor).toISOString() };
}

describe('CADENCES', () => {
  it('contient les 3 séquences avec le bon nombre de touches', () => {
    expect(CADENCES.cold.map((s) => s.type)).toEqual(['cold_1', 'cold_2', 'cold_3']);
    expect(CADENCES.inbound.map((s) => s.type)).toEqual([
      'inbound_1',
      'inbound_2',
      'inbound_3',
      'inbound_4',
      'inbound_5',
    ]);
    expect(CADENCES.refonte.map((s) => s.type)).toEqual([
      'refonte_1',
      'refonte_2',
      'refonte_3',
      'refonte_4',
      'refonte_5',
    ]);
  });

  it('a des offsets strictement croissants (offsets relatifs à la même ancre)', () => {
    for (const kind of Object.keys(CADENCES) as SequenceKind[]) {
      const offsets = CADENCES[kind].map((s) => s.offsetDays);
      for (let i = 1; i < offsets.length; i++) {
        expect(offsets[i]).toBeGreaterThan(offsets[i - 1]);
      }
    }
  });
});

describe('nextDueStep — cold', () => {
  it('rien envoyé : cold_1 pas due avant J+3', () => {
    expect(nextDueStep('cold', ANCHOR, [], daysAfterAnchor(2.9))).toBeNull();
  });

  it('rien envoyé : cold_1 due à J+3 exactement (inclusif)', () => {
    expect(nextDueStep('cold', ANCHOR, [], daysAfterAnchor(3))).toEqual({
      type: 'cold_1',
      offsetDays: 3,
    });
  });

  it('cold_1 envoyée : cold_2 due à J+7 de l’ancre, pas avant', () => {
    const touches = [touch('flash', 0), touch('cold_1', 3)];
    expect(nextDueStep('cold', ANCHOR, touches, daysAfterAnchor(6.5))).toBeNull();
    expect(nextDueStep('cold', ANCHOR, touches, daysAfterAnchor(7))).toEqual({
      type: 'cold_2',
      offsetDays: 7,
    });
  });

  it('cold_2 envoyée : cold_3 due à J+14 de l’ancre', () => {
    const touches = [touch('cold_1', 3), touch('cold_2', 7)];
    expect(nextDueStep('cold', ANCHOR, touches, daysAfterAnchor(13))).toBeNull();
    expect(nextDueStep('cold', ANCHOR, touches, daysAfterAnchor(14))).toEqual({
      type: 'cold_3',
      offsetDays: 14,
    });
  });

  it('séquence finie : null même longtemps après', () => {
    const touches = [touch('cold_1', 3), touch('cold_2', 7), touch('cold_3', 14)];
    expect(nextDueStep('cold', ANCHOR, touches, daysAfterAnchor(365))).toBeNull();
  });

  it('ignore les touches hors cadence (flash, inbound_*)', () => {
    const touches = [touch('flash', 0), touch('inbound_1', 2)];
    expect(nextDueStep('cold', ANCHOR, touches, daysAfterAnchor(3))).toEqual({
      type: 'cold_1',
      offsetDays: 3,
    });
  });

  it('reprend après la touche la plus avancée même si une intermédiaire manque', () => {
    // cold_2 tracée sans cold_1 (envoi manuel legacy) : la prochaine est cold_3.
    const touches = [touch('cold_2', 7)];
    expect(nextDueStep('cold', ANCHOR, touches, daysAfterAnchor(14))).toEqual({
      type: 'cold_3',
      offsetDays: 14,
    });
  });
});

describe('nextDueStep — inbound', () => {
  it('rien envoyé : inbound_1 due à J+2', () => {
    expect(nextDueStep('inbound', ANCHOR, [], daysAfterAnchor(1.5))).toBeNull();
    expect(nextDueStep('inbound', ANCHOR, [], daysAfterAnchor(2))).toEqual({
      type: 'inbound_1',
      offsetDays: 2,
    });
  });

  it('inbound_4 envoyée : inbound_5 due à J+30', () => {
    const touches = [
      touch('inbound_1', 2),
      touch('inbound_2', 3),
      touch('inbound_3', 7),
      touch('inbound_4', 15),
    ];
    expect(nextDueStep('inbound', ANCHOR, touches, daysAfterAnchor(29))).toBeNull();
    expect(nextDueStep('inbound', ANCHOR, touches, daysAfterAnchor(30))).toEqual({
      type: 'inbound_5',
      offsetDays: 30,
    });
  });

  it('séquence inbound finie : null', () => {
    const touches = [
      touch('inbound_1', 2),
      touch('inbound_2', 3),
      touch('inbound_3', 7),
      touch('inbound_4', 15),
      touch('inbound_5', 30),
    ];
    expect(nextDueStep('inbound', ANCHOR, touches, daysAfterAnchor(100))).toBeNull();
  });
});

describe('nextDueStep — refonte', () => {
  it('rien envoyé : refonte_1 due à J+1', () => {
    expect(nextDueStep('refonte', ANCHOR, [], daysAfterAnchor(0.5))).toBeNull();
    expect(nextDueStep('refonte', ANCHOR, [], daysAfterAnchor(1))).toEqual({
      type: 'refonte_1',
      offsetDays: 1,
    });
  });

  it('refonte_4 envoyée : refonte_5 due à J+15 de l’ancre', () => {
    const touches = [
      touch('refonte_1', 1),
      touch('refonte_2', 2),
      touch('refonte_3', 3),
      touch('refonte_4', 7),
    ];
    expect(nextDueStep('refonte', ANCHOR, touches, daysAfterAnchor(14))).toBeNull();
    expect(nextDueStep('refonte', ANCHOR, touches, daysAfterAnchor(15))).toEqual({
      type: 'refonte_5',
      offsetDays: 15,
    });
  });
});

describe('sequenceKindForLead', () => {
  it('phase refonte → refonte, quelle que soit la source', () => {
    expect(sequenceKindForLead({ phase: 'refonte', source: 'outbound' })).toBe('refonte');
    expect(sequenceKindForLead({ phase: 'refonte', source: 'inbound' })).toBe('refonte');
  });

  it('phase pre_audit + outbound → cold', () => {
    expect(sequenceKindForLead({ phase: 'pre_audit', source: 'outbound' })).toBe('cold');
  });

  it('phase pre_audit + inbound → inbound', () => {
    expect(sequenceKindForLead({ phase: 'pre_audit', source: 'inbound' })).toBe('inbound');
  });

  it('phase audit → null (gate humain en cours, pas de relance)', () => {
    expect(sequenceKindForLead({ phase: 'audit', source: 'outbound' })).toBeNull();
    expect(sequenceKindForLead({ phase: 'audit', source: 'inbound' })).toBeNull();
  });
});

describe('isSequenceStopped', () => {
  const base = { opt_out: false, bounce: false, statut_funnel: 'en_sequence' as StatutFunnel };

  it('opt_out → stoppé', () => {
    expect(isSequenceStopped({ ...base, opt_out: true })).toBe(true);
  });

  it('bounce → stoppé', () => {
    expect(isSequenceStopped({ ...base, bounce: true })).toBe(true);
  });

  it.each([
    'repondu',
    'a_trier',
    'a_appeler',
    'stop',
    'perdu',
    'gagne',
    'nurture',
  ] as StatutFunnel[])('statut %s → stoppé', (statut) => {
    expect(isSequenceStopped({ ...base, statut_funnel: statut })).toBe(true);
  });

  it.each(['nouveau', 'flash_envoye', 'en_sequence', 'pro_paye', 'pro_envoye'] as StatutFunnel[])(
    'statut %s → pas stoppé',
    (statut) => {
      expect(isSequenceStopped({ ...base, statut_funnel: statut })).toBe(false);
    },
  );
});
