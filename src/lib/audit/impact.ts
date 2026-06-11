import type { Measurement, ImpactEstimate, ImpactItem } from './types';

/** Borne une valeur dans [min, max]. */
function clamp(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * % de visiteurs perdus à cause de la lenteur, dérivé du seul LCP mesuré.
 * Études Google/Akamai : chaque seconde de chargement au-delà de 2,5s fait
 * fuir ~8% des visiteurs. Plafonné à 60%, jamais en dessous de 0%.
 * Ex : LCP 6,5s → 32% ; LCP 11,8s → plafond 60% ; LCP ≤ 2,5s → 0%.
 */
export function visitorLossPercentFromLcp(lcpSeconds: number): number {
  return clamp(0, 60, Math.round((lcpSeconds - 2.5) * 8));
}

/**
 * Construit l'estimation d'impact à partir des measurements.
 * Cherche le LCP mobile en échec (fail/warn) ; s'il est problématique, en
 * déduit le % de visiteurs perdus. Aucune donnée de trafic supposée : on ne
 * produit plus aucun montant en euros (non fiable en self-service).
 */
export function estimateImpact(measurements: Measurement[]): ImpactEstimate {
  const items: ImpactItem[] = [];

  const lcp = measurements.find(
    (m) => m.id === 'perf.mobile.lcp' && (m.status === 'fail' || m.status === 'warn'),
  );
  let headlinePercent = 0;
  if (lcp && typeof lcp.value === 'number') {
    const lossPercent = visitorLossPercentFromLcp(lcp.value);
    if (lossPercent > 0) {
      headlinePercent = lossPercent;
      items.push({
        id: 'impact.lcp',
        label: 'Visiteurs perdus à cause de la lenteur de chargement',
        lossPercent,
        basis: "D'après les études Google sur le taux d'abandon selon le temps de chargement.",
      });
    }
  }

  return {
    items,
    headlinePercent,
    assumptions: [
      "Estimation basée sur la courbe d'abandon selon le temps de chargement (Google/Akamai), sans donnée de trafic du site.",
    ],
  };
}
