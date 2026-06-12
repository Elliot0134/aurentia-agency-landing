import type { StatutFunnel } from './sequences';

/**
 * Mapping du statut humain saisi dans Notion (texte libre par les humains
 * après un call) vers le statut funnel machine (WF4 remontant,
 * /api/prospection/leads/sync). Insensible aux accents et à la casse :
 * "Gagné", "gagne", "GAGNÉ " se valent.
 *
 * Tout statut humain non mappé est conservé tel quel dans statut_humain mais
 * ne touche PAS le statut funnel (retour null).
 */

/** Normalise pour comparaison : trim, minuscules, accents retirés (NFD). */
function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const MAPPING: Record<string, StatutFunnel> = {
  gagne: 'gagne',
  perdu: 'perdu',
  'a appeler': 'a_appeler',
};

/** Statut funnel correspondant au statut humain Notion, ou null si non mappé. */
export function statutFunnelFromStatutHumain(statutHumain: string): StatutFunnel | null {
  return MAPPING[normalize(statutHumain)] ?? null;
}
