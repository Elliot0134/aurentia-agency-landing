import type { Measurement } from './types';

export type PsiStrategy = 'mobile' | 'desktop';

export interface PsiResult {
  strategy: PsiStrategy;
  performanceScore: number; // 0-100
  seoScore: number | null;
  lcpMs: number | null;
  cls: number | null;
  inpMs: number | null;
  totalByteWeight: number | null;
}

const ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export async function runPsi(
  url: string,
  strategy: PsiStrategy,
  apiKey: string,
  fetchFn: typeof fetch = fetch
): Promise<PsiResult> {
  const qs = new URLSearchParams({ url, strategy, key: apiKey });
  qs.append('category', 'PERFORMANCE');
  qs.append('category', 'SEO');
  const res = await fetchFn(`${ENDPOINT}?${qs}`, { signal: AbortSignal.timeout(60_000) });
  if (!res.ok) throw new Error(`PSI ${strategy} a répondu ${res.status} pour ${url}`);
  const data = (await res.json()) as {
    lighthouseResult?: {
      categories?: { performance?: { score?: number }; seo?: { score?: number } };
      audits?: Record<string, { numericValue?: number }>;
    };
    loadingExperience?: { metrics?: Record<string, { percentile?: number }> };
  };
  const lr = data.lighthouseResult;
  const audits = lr?.audits ?? {};
  return {
    strategy,
    performanceScore: Math.round((lr?.categories?.performance?.score ?? 0) * 100),
    seoScore: lr?.categories?.seo?.score != null ? Math.round(lr.categories.seo.score * 100) : null,
    lcpMs: audits['largest-contentful-paint']?.numericValue ?? null,
    cls: audits['cumulative-layout-shift']?.numericValue ?? null,
    inpMs: data.loadingExperience?.metrics?.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
    totalByteWeight: audits['total-byte-weight']?.numericValue ?? null,
  };
}

/** Seuils officiels Google : LCP ≤2.5s bon / >4s mauvais ; CLS ≤0.1 / >0.25 ; INP ≤200ms / >500ms. */
export function psiToMeasurements(r: PsiResult): Measurement[] {
  const p = r.strategy;
  const ms: Measurement[] = [];
  const proof = `PageSpeed Insights API, stratégie ${p}`;

  ms.push({
    id: `perf.${p}.score`,
    module: 'perf',
    label: `Score performance Lighthouse (${p})`,
    status: r.performanceScore >= 90 ? 'pass' : r.performanceScore >= 50 ? 'warn' : 'fail',
    value: r.performanceScore,
    unit: '/100',
    proof,
  });
  if (r.seoScore != null) {
    ms.push({
      id: `perf.${p}.seo-score`,
      module: 'perf',
      label: `Score SEO Lighthouse (${p})`,
      status: r.seoScore >= 90 ? 'pass' : r.seoScore >= 70 ? 'warn' : 'fail',
      value: r.seoScore,
      unit: '/100',
      proof,
    });
  }
  if (r.lcpMs != null) {
    const s = r.lcpMs / 1000;
    ms.push({
      id: `perf.${p}.lcp`,
      module: 'perf',
      label: `LCP — affichage du contenu principal (${p})`,
      status: s <= 2.5 ? 'pass' : s <= 4 ? 'warn' : 'fail',
      value: Math.round(s * 10) / 10,
      unit: 's',
      proof,
      details: 'Seuil Google : ≤ 2,5 s',
    });
  }
  if (r.cls != null) {
    ms.push({
      id: `perf.${p}.cls`,
      module: 'perf',
      label: `CLS — stabilité visuelle (${p})`,
      status: r.cls <= 0.1 ? 'pass' : r.cls <= 0.25 ? 'warn' : 'fail',
      value: Math.round(r.cls * 100) / 100,
      proof,
      details: 'Seuil Google : ≤ 0,1',
    });
  }
  if (r.inpMs != null) {
    ms.push({
      id: `perf.${p}.inp`,
      module: 'perf',
      label: `INP — réactivité aux interactions (${p})`,
      status: r.inpMs <= 200 ? 'pass' : r.inpMs <= 500 ? 'warn' : 'fail',
      value: r.inpMs,
      unit: 'ms',
      proof: 'données terrain CrUX via PSI',
      details: 'Seuil Google : ≤ 200 ms',
    });
  }
  if (r.totalByteWeight != null) {
    const mo = Math.round((r.totalByteWeight / 1_000_000) * 10) / 10;
    ms.push({
      id: `perf.${p}.weight`,
      module: 'perf',
      label: `Poids total de la page (${p})`,
      status: mo <= 2 ? 'pass' : mo <= 4 ? 'warn' : 'fail',
      value: mo,
      unit: 'Mo',
      proof,
    });
  }
  return ms;
}
