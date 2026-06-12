import { describe, it, expect } from 'vitest';
import { computeScore } from '../score';
import type { Measurement } from '../../types';

const m = (id: string, module: Measurement['module'], status: Measurement['status']): Measurement =>
  ({ id, module, status, label: id, value: null });

describe('computeScore', () => {
  it('100 si tout pass', () => {
    const ms: Measurement[] = [
      m('perf.mobile.score', 'perf', 'pass'),
      m('seo.title.present', 'seo-onpage', 'pass'),
      m('tech.https', 'seo-tech', 'pass'),
      m('images.broken', 'images', 'pass'),
    ];
    expect(computeScore(ms)).toBe(100);
  });
  it('pénalise les fails selon la pondération module', () => {
    const ms: Measurement[] = [
      m('perf.mobile.score', 'perf', 'fail'),    // perf 40% → 0
      m('seo.title.present', 'seo-onpage', 'pass'), // 25% → plein
      m('tech.https', 'seo-tech', 'pass'),          // 25% → plein
      m('images.broken', 'images', 'pass'),         // 10% → plein
    ];
    expect(computeScore(ms)).toBe(60); // 0*40 + 100*60 = 60
  });
  it('ignore les measurements info et les modules absents (re-normalise les poids)', () => {
    const ms: Measurement[] = [
      m('perf.mobile.score', 'perf', 'fail'),
      m('seo.title.present', 'seo-onpage', 'pass'),
      m('x', 'seo-onpage', 'info'), // ignoré
    ];
    // modules présents : perf(40) + seo-onpage(25) = 65 de poids → renormalisé
    // perf 0% × 40 + seo-onpage 100% × 25 = 25 sur 65 → 38
    expect(computeScore(ms)).toBe(38);
  });
});
