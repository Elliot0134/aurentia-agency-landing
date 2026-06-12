import type { AuditData } from '../types';
import type { BrowserlessConfig } from '../screenshot';
import type { GenerateFn, GenerateProFn } from './write-report';
import { computeScore } from './score';
import { writeReport, writeProReport } from './write-report';
import { buildFlashEmailHtml } from './email-flash';
import { buildProReportHtml } from './pdf-pro-html';
import { renderPdf } from './render-pdf';
import type { ProReportContent, ReportContent } from './report-schema';
import { radarAxesFromMeasurements, svgFunnel, svgHeatmap, svgRadar, svgScoreTargetBars } from './charts';
import { buildFunnelStages, buildHeatmapData } from './funnel';
import { buildVisualFindings } from './visual-findings';

export interface RenderDeps {
  browserless: BrowserlessConfig;
  fetchFn?: typeof fetch;
  generateFn?: GenerateFn;
  generateProFn?: GenerateProFn;
  screenshotUrl?: string; // URL publique de la capture (annotée) — fournie par le plan 3
  /** Constats visuels (B5), injectable pour les tests. Défaut : buildVisualFindings. */
  buildVisualsFn?: typeof buildVisualFindings;
}

export interface RenderResult {
  score: number;
  content: ReportContent | ProReportContent;
  emailHtml?: string;
  pdfBuffer?: Buffer;
}

/** Pathnames qui signalent une page commerciale clé (contact, tarifs, offres...). */
const KEY_PAGE_PATTERN = /contact|tarif|prix|service|offre|audit|reservation/;

/**
 * Sélectionne la page clé du crawl pour le 3e constat visuel : page en 200,
 * hors homepage, priorité aux pathnames commerciaux, sinon la première page.
 */
function selectKeyPage(audit: AuditData): { url: string; title: string | null } | undefined {
  const pages = (audit.crawl?.pages ?? []).filter((p) => p.status === 200 && p.url !== audit.finalUrl);
  if (pages.length === 0) return undefined;
  const match = pages.find((p) => {
    try {
      return KEY_PAGE_PATTERN.test(new URL(p.url).pathname.toLowerCase());
    } catch {
      return false;
    }
  });
  const page = match ?? pages[0];
  return { url: page.url, title: page.title };
}

export async function renderReport(audit: AuditData, deps: RenderDeps): Promise<RenderResult> {
  const score = computeScore(audit.measurements);

  if (audit.tier === 'flash') {
    const content = await writeReport(audit, { generateFn: deps.generateFn });
    const emailHtml = buildFlashEmailHtml(audit, content, {
      screenshotUrl: deps.screenshotUrl ?? '',
    });
    return { score, content, emailHtml };
  }

  // Chemin pro : contenu enrichi (tableau d'audit, recommandations, analyses funnel).
  const content = await writeProReport(audit, { generateFn: deps.generateProFn });

  // Charts radar + état/cible si assez de modules scorables (le radar exige 3 axes).
  const axes = radarAxesFromMeasurements(audit.measurements);
  const charts: { radar?: string; funnel?: string; scoreTarget?: string; heatmap?: string } = {};
  if (axes.length >= 3) {
    charts.radar = svgRadar(axes, score);
    charts.scoreTarget = svgScoreTargetBars(
      axes.map((a) => ({ label: a.label, current: a.score, target: a.score < 9 ? 9 : 10 })),
    );
  }

  // Funnel de perte honnête (B6) : base 100 visiteurs, pertes issues de mesures.
  // null si le site est trop sain pour justifier un funnel (pas de remplissage).
  const stages = buildFunnelStages(audit);
  if (stages) charts.funnel = svgFunnel(stages);

  // Heatmap pages × critères on-page (annexe) : seulement si >= 2 pages crawlées.
  const heatmap = buildHeatmapData(audit);
  if (heatmap) charts.heatmap = svgHeatmap(heatmap.pageLabels, heatmap.criteriaLabels, heatmap.cells);

  // Constats visuels (B5) : captures desktop + mobile de la homepage, plus le
  // premier écran desktop d'une page clé du crawl. Analysées par vision.
  // buildVisualFindings ne throw jamais ; [] → section omise (A1).
  const visualsFn = deps.buildVisualsFn ?? buildVisualFindings;
  const visuals = await visualsFn({
    homepageUrl: audit.finalUrl,
    pageTitle: audit.crawl?.pages.find((p) => p.url === audit.finalUrl)?.title ?? null,
    browserless: deps.browserless,
    fetchFn: deps.fetchFn,
    keyPage: selectKeyPage(audit),
  });

  const html = await buildProReportHtml(audit, content, {
    score,
    charts: Object.keys(charts).length > 0 ? charts : undefined,
    visuals: visuals.length > 0 ? visuals : undefined,
  });
  const pdfBuffer = await renderPdf(html, deps.browserless, deps.fetchFn);
  return { score, content, pdfBuffer };
}
