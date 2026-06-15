import { describe, it, expect } from 'vitest';
import { runPsi, psiToMeasurements } from '../psi';

const PSI_FIXTURE = {
  lighthouseResult: {
    categories: { performance: { score: 0.42 }, seo: { score: 0.67 } },
    audits: {
      'largest-contentful-paint': { numericValue: 4200 },
      'cumulative-layout-shift': { numericValue: 0.31 },
      'total-byte-weight': { numericValue: 8_300_000 },
    },
  },
  loadingExperience: {
    metrics: { INTERACTION_TO_NEXT_PAINT: { percentile: 350 } },
  },
};

const fakeFetch = (json: unknown, status = 200): typeof fetch =>
  (async () => new Response(JSON.stringify(json), { status })) as typeof fetch;

describe('runPsi', () => {
  it('extrait scores et CWV de la réponse PSI', async () => {
    const r = await runPsi('https://exemple.fr', 'mobile', 'KEY', fakeFetch(PSI_FIXTURE));
    expect(r.performanceScore).toBe(42);
    expect(r.seoScore).toBe(67);
    expect(r.lcpMs).toBe(4200);
    expect(r.cls).toBe(0.31);
    expect(r.inpMs).toBe(350);
    expect(r.totalByteWeight).toBe(8_300_000);
  });
  it('retente sur 5xx puis jette une fois les essais épuisés', async () => {
    let calls = 0;
    const countingFetch = (async () => {
      calls += 1;
      return new Response('{}', { status: 500 });
    }) as typeof fetch;
    // délais nuls : 2 retries → 3 tentatives au total, sans attente réelle.
    await expect(runPsi('https://exemple.fr', 'mobile', 'KEY', countingFetch, [0, 0])).rejects.toThrow();
    expect(calls).toBe(3);
  });
});

describe('psiToMeasurements', () => {
  it('produit des measurements avec statut basé sur les seuils Google', async () => {
    const r = await runPsi('https://exemple.fr', 'mobile', 'KEY', fakeFetch(PSI_FIXTURE));
    const ms = psiToMeasurements(r);
    expect(ms.find((m) => m.id === 'perf.mobile.score')?.status).toBe('fail'); // 42 < 50
    expect(ms.find((m) => m.id === 'perf.mobile.lcp')?.status).toBe('fail'); // 4.2s > 4s
    expect(ms.find((m) => m.id === 'perf.mobile.cls')?.status).toBe('fail'); // 0.31 > 0.25
  });
});
