import type { AuditData } from '../types';
import type { BrowserlessConfig } from '../screenshot';
import type { GenerateFn } from './write-report';
import { computeScore } from './score';
import { writeReport } from './write-report';
import { buildFlashEmailHtml } from './email-flash';
import { buildProReportHtml } from './pdf-pro-html';
import { renderPdf } from './render-pdf';
import type { ReportContent } from './report-schema';
import { radarAxesFromMeasurements, svgRadar, svgScoreTargetBars } from './charts';

export interface RenderDeps {
  browserless: BrowserlessConfig;
  fetchFn?: typeof fetch;
  generateFn?: GenerateFn;
  screenshotUrl?: string; // URL publique de la capture (annotée) — fournie par le plan 3
}

export interface RenderResult {
  score: number;
  content: ReportContent;
  emailHtml?: string;
  pdfBuffer?: Buffer;
}

export async function renderReport(audit: AuditData, deps: RenderDeps): Promise<RenderResult> {
  const score = computeScore(audit.measurements);
  const content = await writeReport(audit, { generateFn: deps.generateFn });

  if (audit.tier === 'flash') {
    const emailHtml = buildFlashEmailHtml(audit, content, {
      screenshotUrl: deps.screenshotUrl ?? '',
    });
    return { score, content, emailHtml };
  }

  // Charts radar + état/cible si assez de modules scorables (le radar exige 3 axes).
  // Funnel et heatmap : données pas encore disponibles (phase B), non passés.
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
