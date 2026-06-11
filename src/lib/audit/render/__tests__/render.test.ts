import { describe, it, expect, vi } from 'vitest';
import { renderReport } from '../render';
import { computeScore } from '../score';
import type { AuditData } from '../../types';
import type { GenerateFn } from '../write-report';
import type { ReportContent } from '../report-schema';
import type { BrowserlessConfig } from '../../screenshot';

const browserless: BrowserlessConfig = { token: 'tok', baseUrl: 'https://bl.test' };

const baseAudit = (tier: 'flash' | 'pro'): AuditData => ({
  url: 'https://x.fr',
  finalUrl: 'https://x.fr',
  tier,
  collectedAt: '2026-06-11T00:00:00Z',
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'marseille', sector: 'conciergerie' },
  measurements: [
    { id: 'perf.mobile.lcp', module: 'perf', label: 'LCP', status: 'fail', value: 11.8, unit: 's' },
    { id: 'seo.title', module: 'seo-onpage', label: 'Titre', status: 'pass', value: 'OK' },
  ],
  annotations: [],
  screenshotPath: null,
  competitors: [],
  revenue: null,
});

const flashContent: ReportContent = {
  execSummary: 'Votre site est lent et perd des visiteurs chaque mois.',
  recommendation: 'refonte',
  findings: [
    { title: 'Lenteur', body: 'Le contenu met 11,8s a charger.', priority: 'P0', measurementIds: ['perf.mobile.lcp'] },
  ],
  competitorAnalysis: null,
};

const proContent: ReportContent = {
  ...flashContent,
  competitorAnalysis: 'Vos concurrents chargent plus vite et captent les visiteurs.',
};

/** fetchFn stub : /pdf renvoie un binaire commençant par %PDF. */
const pdfFetch: typeof fetch = vi.fn(async () => {
  const body = Buffer.concat([Buffer.from('%PDF-1.4'), Buffer.from([0x00, 0x01, 0x02])]);
  return new Response(body, { status: 200 });
}) as unknown as typeof fetch;

describe('renderReport', () => {
  it('flash → emailHtml non vide, pas de pdfBuffer, score cohérent', async () => {
    const audit = baseAudit('flash');
    const generateFn: GenerateFn = vi.fn(async () => flashContent);
    const r = await renderReport(audit, { browserless, generateFn, fetchFn: pdfFetch });

    expect(r.emailHtml).toBeTruthy();
    expect(r.emailHtml!.length).toBeGreaterThan(0);
    expect(r.pdfBuffer).toBeUndefined();
    expect(r.content).toEqual(flashContent);
    expect(r.score).toBe(computeScore(audit.measurements));
  });

  it('pro → pdfBuffer commence par %PDF, competitorAnalysis présent, score cohérent', async () => {
    const audit = baseAudit('pro');
    const generateFn: GenerateFn = vi.fn(async () => proContent);
    const r = await renderReport(audit, { browserless, generateFn, fetchFn: pdfFetch });

    expect(r.pdfBuffer).toBeInstanceOf(Buffer);
    expect(r.pdfBuffer!.subarray(0, 4).toString('latin1')).toBe('%PDF');
    expect(r.emailHtml).toBeUndefined();
    expect(r.content.competitorAnalysis).toBe(proContent.competitorAnalysis);
    expect(r.score).toBe(computeScore(audit.measurements));
  });
});
