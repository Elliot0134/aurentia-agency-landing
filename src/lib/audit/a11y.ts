import type { Measurement, MeasurementStatus } from './types';
import { withBrowserlessRetry } from './browserless-retry';
import type { BrowserlessConfig } from './screenshot';

/** Une violation axe-core agrégée : un type de règle WCAG, N éléments touchés. */
export interface AxeViolation {
  id: string; // id de règle axe-core, ex 'color-contrast'
  impact: string; // 'minor' | 'moderate' | 'serious' | 'critical'
  description: string;
  nodes: number; // nombre d'éléments en violation sur la page
}

export interface A11yPageResult {
  url: string;
  violations: AxeViolation[];
}

const base = (c: BrowserlessConfig) => c.baseUrl ?? 'https://production-sfo.browserless.io';

const AXE_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js';

/**
 * Audit d'accessibilité réel d'une page via axe-core (WCAG 2.2 AA), exécuté
 * dans Browserless `/function`. Le code injecté est du JS pur (string), pas du
 * TS : `axe` y est un global posé par addScriptTag.
 *
 * En cas d'échec définitif (après retries) → throw. Jamais de tableau vide en
 * fallback : un échec d'outil ne doit pas passer pour une conformité.
 */
export async function runAxe(
  url: string,
  config: BrowserlessConfig,
  fetchFn: typeof fetch = fetch,
): Promise<A11yPageResult> {
  const code = `
export default async function ({ page, context }) {
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto(context.url, { waitUntil: 'load', timeout: 30000 });
  await page.addScriptTag({ url: '${AXE_CDN_URL}' });
  const results = await page.evaluate(() =>
    axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })
  );
  return {
    data: {
      violations: results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length,
      })),
    },
    type: 'application/json',
  };
}`;
  return withBrowserlessRetry('function axe', async () => {
    const res = await fetchFn(`${base(config)}/function?token=${config.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, context: { url } }),
      signal: AbortSignal.timeout(90_000),
    });
    if (!res.ok) throw new Error(`Browserless /function axe → ${res.status} pour ${url}`);
    const json = (await res.json()) as { data?: { violations?: AxeViolation[] } };
    const violations = json.data?.violations;
    if (!Array.isArray(violations)) {
      throw new Error(`Réponse axe inexploitable (data.violations absent) pour ${url}`);
    }
    return { url, violations };
  });
}

const SEVERE = new Set(['serious', 'critical']);

/** Rang de tri par sévérité (les plus graves d'abord). */
const IMPACT_RANK: Record<string, number> = { critical: 0, serious: 1, moderate: 2, minor: 3 };

const MAX_VIOLATION_TYPES = 8;

const pathnameOf = (url: string): string => {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
};

/**
 * Convertit les résultats axe multi-pages en Measurements module 'a11y' :
 * un total global + une measurement par type de violation distinct (cap 8).
 * Ne JAMAIS appeler avec un tableau vide issu d'échecs d'outil : zéro page
 * auditée n'est pas zéro violation (le caller pose a11y.unavailable).
 */
export function a11yToMeasurements(results: A11yPageResult[]): Measurement[] {
  const all = results.flatMap((r) =>
    r.violations.map((violation) => ({ ...violation, pathname: pathnameOf(r.url) })),
  );

  if (all.length === 0) {
    return [
      {
        id: 'a11y.violations.total',
        module: 'a11y',
        label: 'Violations WCAG 2.2 AA (axe-core)',
        status: 'pass',
        value: 0,
        proof: `${results.length} page(s) auditée(s) : ${results.map((r) => pathnameOf(r.url)).join(', ')}`,
        details: 'Aucune violation WCAG 2.2 AA détectée (axe-core)',
      },
    ];
  }

  const hasSevere = all.some((violation) => SEVERE.has(violation.impact));
  const totalStatus: MeasurementStatus = hasSevere ? 'fail' : 'warn';
  const topDetails = [...all]
    .sort((a, b) => (IMPACT_RANK[a.impact] ?? 9) - (IMPACT_RANK[b.impact] ?? 9) || b.nodes - a.nodes)
    .slice(0, 5)
    .map((violation) => `${violation.id} (${violation.impact}) : ${violation.nodes} éléments sur ${violation.pathname}`)
    .join(' ; ');

  const total: Measurement = {
    id: 'a11y.violations.total',
    module: 'a11y',
    label: 'Violations WCAG 2.2 AA (axe-core)',
    status: totalStatus,
    value: all.length,
    proof: `${results.length} page(s) auditée(s) : ${results.map((r) => pathnameOf(r.url)).join(', ')}`,
    details: topDetails,
  };

  // Groupage par type de violation (id de règle axe), toutes pages confondues.
  const byType = new Map<string, { impacts: Set<string>; nodes: number; pages: string[]; description: string }>();
  for (const violation of all) {
    const entry = byType.get(violation.id) ?? {
      impacts: new Set<string>(),
      nodes: 0,
      pages: [],
      description: violation.description,
    };
    entry.impacts.add(violation.impact);
    entry.nodes += violation.nodes;
    if (!entry.pages.includes(violation.pathname)) entry.pages.push(violation.pathname);
    byType.set(violation.id, entry);
  }

  const perType: Measurement[] = [...byType.entries()]
    .sort(([, a], [, b]) => {
      const rank = (entry: { impacts: Set<string> }) =>
        Math.min(...[...entry.impacts].map((impact) => IMPACT_RANK[impact] ?? 9));
      return rank(a) - rank(b) || b.nodes - a.nodes;
    })
    .slice(0, MAX_VIOLATION_TYPES)
    .map(([ruleId, entry]) => ({
      id: `a11y.${ruleId}`,
      module: 'a11y' as const,
      label: `Violation WCAG : ${ruleId}`,
      status: ([...entry.impacts].some((impact) => SEVERE.has(impact)) ? 'fail' : 'warn') as MeasurementStatus,
      value: entry.nodes,
      proof: `Pages concernées : ${entry.pages.join(', ')}`,
      details: entry.description,
    }));

  return [total, ...perType];
}
