import type { AuditData } from '../types';
import type { BrowserlessConfig } from '../screenshot';
import type { GenerateFn } from './write-report';
import { computeScore } from './score';
import { writeReport } from './write-report';
import { buildFlashEmailHtml } from './email-flash';
import { buildProReportHtml } from './pdf-pro-html';
import { renderPdf } from './render-pdf';
import type { ReportContent } from './report-schema';

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

  const html = buildProReportHtml(audit, content, { score });
  const pdfBuffer = await renderPdf(html, deps.browserless, deps.fetchFn);
  return { score, content, pdfBuffer };
}
