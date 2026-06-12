/**
 * Cadences des trois séquences de relances et calcul de l'étape due.
 * Spec : repo aurentia-prospection, docs/superpowers/specs/2026-06-12-sequences-relances-n8n-design.md §3bis.
 *
 * Principe central : l'état de séquence n'est JAMAIS stocké, il se calcule
 * depuis les touches (table prospection_touches) à chaque exécution.
 *
 * Sémantique des offsets : chaque `offsetDays` est un J+N relatif à la touche
 * d'ANCRAGE de la séquence (pas à la touche précédente) :
 * - cold / inbound : l'ancre est la touche `flash` (le pré-audit envoyé) ;
 *   cold_2 part donc à flash + 7 jours, quelle que soit la date de cold_1.
 * - refonte : l'ancre est fournie par l'engine (voir la règle d'ancre refonte
 *   documentée dans engine.ts : dernière touche refonte_* si existante, sinon
 *   dernière touche toutes catégories, sinon lead.updated_at).
 */

export type SequenceKind = 'cold' | 'inbound' | 'refonte';

export interface CadenceStep {
  /** Type de touche (valeur du check prospection_touches.type). */
  type: string;
  /** Jours après l'ancre de séquence (J+N, voir en-tête du fichier). */
  offsetDays: number;
}

export const CADENCES: Record<SequenceKind, CadenceStep[]> = {
  cold: [
    { type: 'cold_1', offsetDays: 3 },
    { type: 'cold_2', offsetDays: 7 },
    { type: 'cold_3', offsetDays: 14 },
  ],
  inbound: [
    { type: 'inbound_1', offsetDays: 2 },
    { type: 'inbound_2', offsetDays: 3 },
    { type: 'inbound_3', offsetDays: 7 },
    { type: 'inbound_4', offsetDays: 15 },
    { type: 'inbound_5', offsetDays: 30 },
  ],
  refonte: [
    { type: 'refonte_1', offsetDays: 1 },
    { type: 'refonte_2', offsetDays: 2 },
    { type: 'refonte_3', offsetDays: 3 },
    { type: 'refonte_4', offsetDays: 7 },
    { type: 'refonte_5', offsetDays: 15 },
  ],
};

export type LeadPhase = 'pre_audit' | 'audit' | 'refonte';
export type LeadSource = 'outbound' | 'inbound';
export type StatutFunnel =
  | 'nouveau'
  | 'flash_envoye'
  | 'en_sequence'
  | 'repondu'
  | 'a_trier'
  | 'a_appeler'
  | 'nurture'
  | 'stop'
  | 'perdu'
  | 'pro_paye'
  | 'pro_envoye'
  | 'gagne';

const DAY_MS = 86_400_000;

/**
 * Prochaine étape due de la séquence, ou null si la séquence est finie ou si
 * la prochaine étape n'est pas encore due (`anchorAt + offsetDays <= now`,
 * inclusif). La dernière étape déjà envoyée est la plus avancée dans la
 * cadence parmi les touches du lead (les touches hors cadence sont ignorées ;
 * une étape intermédiaire manquante, ex envoi manuel legacy, n'est pas
 * rejouée). Les jours sont des durées fixes de 24 h : un changement d'heure
 * DST décale une relance d'une heure, sans effet sur une cadence quotidienne.
 */
export function nextDueStep(
  kind: SequenceKind,
  anchorAt: Date,
  touches: { type: string; sent_at: string }[],
  now: Date,
): CadenceStep | null {
  const cadence = CADENCES[kind];
  const sentTypes = new Set(touches.map((t) => t.type));
  let lastSentIndex = -1;
  for (let i = 0; i < cadence.length; i++) {
    if (sentTypes.has(cadence[i].type)) lastSentIndex = i;
  }
  const next = cadence[lastSentIndex + 1];
  if (!next) return null; // séquence finie
  const dueAt = anchorAt.getTime() + next.offsetDays * DAY_MS;
  return dueAt <= now.getTime() ? next : null;
}

/**
 * Séquence applicable à un lead selon sa phase et sa source :
 * - phase `refonte` → séquence refonte (il a payé l'audit Pro, CTA RDV) ;
 * - phase `pre_audit` → cold (sourcé outbound) ou inbound (opt-in site) ;
 * - phase `audit` → null : le gate humain de relecture du PDF Pro est en
 *   cours, on ne relance JAMAIS un client pendant la production de son audit.
 */
export function sequenceKindForLead(lead: {
  phase: LeadPhase;
  source: LeadSource;
}): SequenceKind | null {
  if (lead.phase === 'refonte') return 'refonte';
  if (lead.phase === 'pre_audit') return lead.source === 'outbound' ? 'cold' : 'inbound';
  return null; // phase 'audit' : gate humain en cours
}

/** Statuts funnel qui stoppent définitivement toute relance automatique. */
const STOPPED_STATUTS: ReadonlySet<StatutFunnel> = new Set([
  'repondu',
  'a_trier',
  'a_appeler',
  'stop',
  'perdu',
  'gagne',
  'nurture',
]);

/**
 * Vrai si plus aucune relance automatique ne doit partir vers ce lead :
 * opt-out (à vie), bounce, ou statut funnel rendu à l'humain / terminal.
 */
export function isSequenceStopped(lead: {
  opt_out: boolean;
  bounce: boolean;
  statut_funnel: StatutFunnel;
}): boolean {
  return lead.opt_out || lead.bounce || STOPPED_STATUTS.has(lead.statut_funnel);
}
