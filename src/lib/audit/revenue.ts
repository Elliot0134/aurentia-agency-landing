import type { Measurement, RevenueEstimate, RevenueItem } from './types';

export interface SectorBenchmark {
  monthlyTraffic: number; // médian "acteur moyen"
  cvr: number; // taux de conversion médian
  customerValue: number; // valeur client / panier médian (€)
  source: string;
}

/** Médians issus de revenue-impact-formulas.md (ahrefs/similarweb/Hubspot 2024-2025). */
export const SECTOR_BENCHMARKS: Record<string, SectorBenchmark> = {
  conciergerie: { monthlyTraffic: 5_500, cvr: 0.025, customerValue: 800, source: 'ahrefs/similarweb + Hubspot 2024-2025 (médians secteur conciergerie)' },
  artisan: { monthlyTraffic: 3_500, cvr: 0.025, customerValue: 300, source: 'ahrefs/similarweb + Hubspot 2024-2025 (médians artisans locaux)' },
  restaurant: { monthlyTraffic: 10_000, cvr: 0.055, customerValue: 50, source: 'ahrefs/similarweb + Hubspot 2024-2025 (médians restauration)' },
  'saas-b2b': { monthlyTraffic: 50_000, cvr: 0.05, customerValue: 2_000, source: 'ahrefs/similarweb + Hubspot 2024-2025 (médians SaaS B2B)' },
  ecommerce: { monthlyTraffic: 125_000, cvr: 0.0225, customerValue: 80, source: 'ahrefs/similarweb + Hubspot 2024-2025 (médians e-commerce)' },
  'service-pro': { monthlyTraffic: 3_000, cvr: 0.025, customerValue: 2_500, source: 'ahrefs/similarweb + Hubspot 2024-2025 (médians professions de conseil)' },
  default: { monthlyTraffic: 3_000, cvr: 0.02, customerValue: 300, source: 'benchmarks intersectoriels prudents (Statista/ahrefs/Hubspot 2024-2025)' },
};

/**
 * Formule 3.1 : chaque seconde de LCP > 2.5s coûte ~0.8% de visiteurs (Google/Akamai).
 * Coefficient 0.008 (0.8% par seconde) — calibré pour correspondre aux benchmarks de référence.
 * Exemple : 10 000 visiteurs × (4.5-2.5)s × 0.008 = 160 visiteurs perdus × 1.5% CVR × 200€ = 480€/mois.
 */
export function lcpMonthlyLoss(p: {
  monthlyVisitors: number;
  lcpSeconds: number;
  cvr: number;
  customerValue: number;
}): number {
  const excess = Math.max(0, p.lcpSeconds - 2.5);
  const lostVisitors = p.monthlyVisitors * excess * 0.008;
  return Math.round(lostVisitors * p.cvr * p.customerValue);
}

/** Formule 3.4 : gain CRO conservateur de 20% sur les conversions actuelles. */
export function croMonthlyGain(p: {
  monthlyVisitors: number;
  cvr: number;
  customerValue: number;
  gainRate?: number;
}): number {
  const conversions = p.monthlyVisitors * p.cvr;
  return Math.round(conversions * (p.gainRate ?? 0.2) * p.customerValue);
}

/** Section 4 : ne pas additionner naïvement — réduction de chevauchement 0.6. */
export function combineLosses(items: number[]): number {
  return Math.round(items.reduce((a, b) => a + b, 0) * 0.6);
}

/**
 * Construit l'estimation à partir des measurements en échec.
 * v1 : LCP (si fail) + gain CRO (si >= 3 fails on-page/tech, signal d'un site négligé).
 */
export function estimateRevenue(measurements: Measurement[], sectorKey: string): RevenueEstimate {
  const b = SECTOR_BENCHMARKS[sectorKey] ?? SECTOR_BENCHMARKS.default;
  const items: RevenueItem[] = [];

  const lcp = measurements.find((m) => m.id === 'perf.mobile.lcp' && m.status === 'fail');
  if (lcp && typeof lcp.value === 'number') {
    const loss = lcpMonthlyLoss({
      monthlyVisitors: b.monthlyTraffic,
      lcpSeconds: lcp.value,
      cvr: b.cvr,
      customerValue: b.customerValue,
    });
    if (loss > 0) {
      items.push({
        id: 'revenue.lcp',
        label: 'Visiteurs perdus avant chargement (LCP)',
        monthlyLossEur: loss,
        formula: `${b.monthlyTraffic} visiteurs × (${lcp.value}s − 2,5s) × 0,8% × ${b.cvr * 100}% CVR × ${b.customerValue}€`,
      });
    }
  }

  const failCount = measurements.filter(
    (m) => m.status === 'fail' && (m.module === 'seo-onpage' || m.module === 'seo-tech')
  ).length;
  if (failCount >= 3) {
    const gain = croMonthlyGain({ monthlyVisitors: b.monthlyTraffic, cvr: b.cvr, customerValue: b.customerValue });
    items.push({
      id: 'revenue.cro',
      label: 'Gain potentiel en corrigeant les fondamentaux (CRO/SEO)',
      monthlyLossEur: gain,
      formula: `${b.monthlyTraffic} visiteurs × ${b.cvr * 100}% CVR × 20% de gain conservateur × ${b.customerValue}€`,
    });
  }

  return {
    sector: sectorKey,
    items,
    totalMonthlyLossEur: combineLosses(items.map((i) => i.monthlyLossEur)),
    assumptions: [
      `Ces montants sont une estimation (ordre de grandeur), pas une promesse.`,
      `Hypothèses : trafic ${b.monthlyTraffic} visites/mois, conversion ${b.cvr * 100}%, valeur client ${b.customerValue}€.`,
      `Source : ${b.source}.`,
      `Réduction de chevauchement de 40% appliquée au total (un visiteur perdu ne l'est qu'une fois).`,
    ],
  };
}
