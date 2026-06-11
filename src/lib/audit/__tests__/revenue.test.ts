import { describe, it, expect } from 'vitest';
import { lcpMonthlyLoss, croMonthlyGain, combineLosses, estimateRevenue, SECTOR_BENCHMARKS } from '../revenue';
import type { Measurement } from '../types';

describe('formules unitaires', () => {
  it("lcpMonthlyLoss reproduit l'exemple de référence (10k visiteurs, LCP 4.5s, CVR 1.5%, 200€)", () => {
    // 10 000 × (4.5-2.5) × 0.008 = 160 visiteurs perdus × 1.5% × 200€ = 480 €/mois
    expect(lcpMonthlyLoss({ monthlyVisitors: 10_000, lcpSeconds: 4.5, cvr: 0.015, customerValue: 200 })).toBe(480);
  });
  it('lcpMonthlyLoss = 0 si LCP <= 2.5s', () => {
    expect(lcpMonthlyLoss({ monthlyVisitors: 10_000, lcpSeconds: 2.1, cvr: 0.015, customerValue: 200 })).toBe(0);
  });
  it('croMonthlyGain : conversions actuelles x 20% x valeur', () => {
    // 5 000 visiteurs × 2% = 100 conversions × 20% × 300€ = 6 000€
    expect(croMonthlyGain({ monthlyVisitors: 5_000, cvr: 0.02, customerValue: 300 })).toBe(6000);
  });
  it('combineLosses applique la reduction de chevauchement 0.6', () => {
    expect(combineLosses([1000, 500])).toBe(900);
  });
});

describe('estimateRevenue', () => {
  it('produit un estimate avec hypotheses quand le LCP est en echec', () => {
    const measurements: Measurement[] = [
      { id: 'perf.mobile.lcp', module: 'perf', label: 'LCP', status: 'fail', value: 4.5, unit: 's' },
    ];
    const est = estimateRevenue(measurements, 'conciergerie');
    expect(est.sector).toBe('conciergerie');
    expect(est.items.some((i) => i.id === 'revenue.lcp')).toBe(true);
    expect(est.totalMonthlyLossEur).toBeGreaterThan(0);
    expect(est.assumptions.join(' ')).toContain('estimation');
  });
  it("retourne un estimate vide si rien n'est chiffrable", () => {
    const est = estimateRevenue([], 'default');
    expect(est.items).toHaveLength(0);
    expect(est.totalMonthlyLossEur).toBe(0);
  });
});

describe('SECTOR_BENCHMARKS', () => {
  it('contient les secteurs references par business-type', () => {
    for (const key of ['conciergerie', 'artisan', 'restaurant', 'saas-b2b', 'ecommerce', 'service-pro', 'default']) {
      expect(SECTOR_BENCHMARKS[key]).toBeDefined();
    }
  });
});
