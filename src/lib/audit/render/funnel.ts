import type { AuditData, Measurement, MeasurementStatus } from '../types';
import type { FunnelStage, HeatCell } from './charts';

/* ----------------------------------------------------------------------------
 * Funnel de perte honnête (tâche B6).
 *
 * On ne connaît PAS le trafic réel du prospect : le funnel est donc exprimé en
 * volumes RELATIFS, « sur 100 visiteurs qui arrivent ». Chaque perte vient
 * d'une MESURE de l'audit :
 *   - perte lenteur   → audit.impact.headlinePercent (calculé du LCP mesuré)
 *   - friction mobile → perf.mobile.score en fail (décote benchmark prudente)
 *   - parcours        → tech.viewport.present en fail OU >= 2 fails on-page
 * Aucun étage inventé : si le site est sain, pas de funnel (null), pas de
 * remplissage artificiel. Zéro euro, libellés « est. » sur chaque perte.
 * ------------------------------------------------------------------------- */

const MOBILE_FRICTION_RATE = 0.2; // décote prudente si Lighthouse mobile en fail
const JOURNEY_FRICTION_RATE = 0.15; // décote prudente parcours/fondamentaux

function findMeasurement(audit: AuditData, id: string): Measurement | undefined {
  return audit.measurements.find((m) => m.id === id);
}

/** Fails on-page de la homepage uniquement (les ids des pages crawlées sont préfixés page[...]). */
function homepageOnPageFails(audit: AuditData): number {
  return audit.measurements.filter(
    (m) => m.module === 'seo-onpage' && m.status === 'fail' && !m.id.startsWith('page['),
  ).length;
}

/**
 * Construit les étages du funnel de perte, base 100 visiteurs. Retourne null
 * si moins de 3 étages (site trop sain pour justifier un funnel).
 */
export function buildFunnelStages(audit: AuditData): FunnelStage[] | null {
  const stages: FunnelStage[] = [{ label: 'Visiteurs qui arrivent sur le site (base)', value: 100 }];
  let remaining = 100;

  // Étage lenteur : perte issue de l'impact LCP mesuré.
  if (audit.impact && audit.impact.headlinePercent > 0) {
    const percent = Math.round(audit.impact.headlinePercent);
    remaining = Math.round(remaining - audit.impact.headlinePercent);
    stages.push({
      label: 'Visiteurs encore presents apres le chargement (est.)',
      value: remaining,
      lossNote: `~${percent}% partent avant l'affichage du contenu (LCP mesuré, est.)`,
    });
  }

  // Étage friction mobile : uniquement si le score Lighthouse mobile est en fail.
  if (findMeasurement(audit, 'perf.mobile.score')?.status === 'fail') {
    remaining = Math.round(remaining * (1 - MOBILE_FRICTION_RATE));
    stages.push({
      label: 'Visiteurs apres friction mobile (est.)',
      value: remaining,
      lossNote: 'experience mobile degradee (score Lighthouse mesure), est. -20%',
    });
  }

  // Étage parcours/fondamentaux : viewport absent ou >= 2 fails on-page homepage.
  const viewportFail = findMeasurement(audit, 'tech.viewport.present')?.status === 'fail';
  if (viewportFail || homepageOnPageFails(audit) >= 2) {
    remaining = Math.round(remaining * (1 - JOURNEY_FRICTION_RATE));
    stages.push({
      label: 'Visiteurs apres parcours et fondamentaux (est.)',
      value: remaining,
      lossNote: 'parcours et fondamentaux a corriger, est. -15%',
    });
  }

  stages.push({ label: 'Visiteurs qui peuvent devenir contact/client', value: remaining });

  // Moins de 3 étages = base + final sans aucune perte mesurée : pas de funnel.
  return stages.length >= 3 ? stages : null;
}

/* ----------------------------------------------------------------------------
 * Heatmap pages × critères on-page (annexe technique).
 *
 * Lignes = homepage ('/') + pathname de chaque page crawlée. Colonnes = les 4
 * critères on-page mesurés sur chaque page. Une cellule = le pire statut des
 * mesures associées (fail > warn > pass), 'na' si la page n'a pas de mesure
 * (page en erreur lors du crawl).
 * ------------------------------------------------------------------------- */

export interface HeatmapData {
  pageLabels: string[];
  criteriaLabels: string[];
  cells: HeatCell[][];
}

/** Critère affiché → ids de mesures on-page agrégées (pire statut retenu). */
const HEATMAP_CRITERIA: ReadonlyArray<readonly [string, readonly string[]]> = [
  ['Title', ['seo.title.present', 'seo.title.length']],
  ['Meta desc', ['seo.meta-description.present', 'seo.meta-description.length']],
  ['H1', ['seo.h1.unique']],
  ['Images alt', ['seo.images.alt']],
];

const CELL_BY_STATUS: Partial<Record<MeasurementStatus, HeatCell>> = {
  pass: 'ok',
  warn: 'warn',
  fail: 'fail',
};

const CELL_SEVERITY: Record<HeatCell, number> = { na: 0, ok: 1, warn: 2, fail: 3 };

function worstCell(statuses: HeatCell[]): HeatCell {
  return statuses.reduce<HeatCell>((worst, s) => (CELL_SEVERITY[s] > CELL_SEVERITY[worst] ? s : worst), 'na');
}

function cellFor(audit: AuditData, prefix: string, ids: readonly string[]): HeatCell {
  const found = ids
    .map((id) => findMeasurement(audit, `${prefix}${id}`))
    .filter((m): m is Measurement => m !== undefined)
    .map((m) => CELL_BY_STATUS[m.status] ?? 'na');
  return found.length > 0 ? worstCell(found) : 'na';
}

function pathnameOf(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

/**
 * Données de la heatmap pages × critères. Retourne null si moins de 2 pages
 * crawlées (la heatmap n'apporte rien sur la homepage seule).
 */
export function buildHeatmapData(audit: AuditData): HeatmapData | null {
  const crawledPages = audit.crawl?.pages ?? [];
  if (crawledPages.length < 2) return null;

  // [label, préfixe d'id de mesure] : homepage = ids nus, pages crawlées = page[<pathname>].
  const rows: ReadonlyArray<readonly [string, string]> = [
    ['/', ''],
    ...crawledPages.map((p): readonly [string, string] => {
      const pathname = pathnameOf(p.url);
      return [pathname, `page[${pathname}].`];
    }),
  ];

  return {
    pageLabels: rows.map(([label]) => label),
    criteriaLabels: HEATMAP_CRITERIA.map(([label]) => label),
    cells: rows.map(([, prefix]) => HEATMAP_CRITERIA.map(([, ids]) => cellFor(audit, prefix, ids))),
  };
}
