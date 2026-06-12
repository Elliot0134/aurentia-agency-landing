import type { AuditData } from '../types';
import type { BrowserlessConfig } from '../screenshot';
import type { GenerateFn, GenerateProFn } from './write-report';
import { computeScore } from './score';
import { writeReport, writeProReport } from './write-report';
import { buildFlashEmailHtml } from './email-flash';
import { buildProReportHtml } from './pdf-pro-html';
import { renderPdf } from './render-pdf';
import type { ProReportContent, ReportContent } from './report-schema';
import { radarAxesFromMeasurements, svgRadar, svgScoreTargetBars } from './charts';

export interface RenderDeps {
  browserless: BrowserlessConfig;
  fetchFn?: typeof fetch;
  generateFn?: GenerateFn;
  generateProFn?: GenerateProFn;
  screenshotUrl?: string; // URL publique de la capture (annotée) — fournie par le plan 3
}

export interface RenderResult {
  score: number;
  content: ReportContent | ProReportContent;
  emailHtml?: string;
  pdfBuffer?: Buffer;
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
  // Heatmap : données pas encore disponibles (phase B), non passée.
  const axes = radarAxesFromMeasurements(audit.measurements);
  const charts =
    axes.length >= 3
      ? {
          radar: svgRadar(axes, score),
          scoreTarget: svgScoreTargetBars(
            axes.map((a) => ({ label: a.label, current: a.score, target: a.score < 9 ? 9 : 10 })),
          ),
        }
      : undefined;

  const html = await buildProReportHtml(audit, content, { score, charts });
  const pdfBuffer = await renderPdf(html, deps.browserless, deps.fetchFn);
  return { score, content, pdfBuffer };
}
