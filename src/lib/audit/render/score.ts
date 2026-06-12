import type { Measurement, ModuleId } from '../types';

const WEIGHTS: Partial<Record<ModuleId, number>> = {
  perf: 40,
  'seo-onpage': 25,
  'seo-tech': 25,
  images: 10,
};

/** Score /100 = moyenne pondérée du taux de réussite par module présent (poids renormalisés). */
export function computeScore(measurements: Measurement[]): number {
  let weightedSum = 0;
  let totalWeight = 0;
  for (const [moduleId, weight] of Object.entries(WEIGHTS) as [ModuleId, number][]) {
    const ms = measurements.filter((x) => x.module === moduleId && x.status !== 'info');
    if (ms.length === 0) continue;
    const passRate = ms.filter((x) => x.status === 'pass').length / ms.length;
    weightedSum += passRate * weight;
    totalWeight += weight;
  }
  if (totalWeight === 0) return 0;
  return Math.round((weightedSum / totalWeight) * 100);
}
