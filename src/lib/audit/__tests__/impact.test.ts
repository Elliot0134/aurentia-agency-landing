import { describe, it, expect } from 'vitest';
import { visitorLossPercentFromLcp, estimateImpact } from '../impact';
import type { Measurement } from '../types';

describe('visitorLossPercentFromLcp', () => {
  it('LCP 6,5s -> 32% ((6.5-2.5)*8)', () => {
    expect(visitorLossPercentFromLcp(6.5)).toBe(32);
  });
  it('LCP 11,8s -> plafonné à 60%', () => {
    expect(visitorLossPercentFromLcp(11.8)).toBe(60);
  });
  it('LCP <= 2,5s -> 0%', () => {
    expect(visitorLossPercentFromLcp(2.1)).toBe(0);
  });
});

describe('estimateImpact', () => {
  it('produit un item + headlinePercent quand le LCP est en échec', () => {
    const measurements: Measurement[] = [
      { id: 'perf.mobile.lcp', module: 'perf', label: 'LCP', status: 'fail', value: 6.5, unit: 's' },
    ];
    const est = estimateImpact(measurements);
    expect(est.headlinePercent).toBe(32);
    expect(est.items).toHaveLength(1);
    expect(est.items[0].id).toBe('impact.lcp');
    expect(est.items[0].lossPercent).toBe(32);
  });
  it('retourne headlinePercent 0 et items vides sans LCP problématique', () => {
    const est = estimateImpact([]);
    expect(est.headlinePercent).toBe(0);
    expect(est.items).toHaveLength(0);
  });
});
