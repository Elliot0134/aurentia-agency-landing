import { describe, it, expect } from 'vitest';
import { buildProReportHtml } from '../pdf-pro-html';
import type { AuditData } from '../../types';
import type { ReportContent } from '../report-schema';

const audit = (): AuditData => ({
  url: 'https://x.fr', finalUrl: 'https://x.fr', tier: 'pro', collectedAt: '2026-06-11T00:00:00Z',
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'marseille', sector: 'conciergerie' },
  measurements: [
    { id: 'perf.mobile.score', module: 'perf', label: 'Performance mobile', status: 'fail', value: 32, unit: '/100' },
    { id: 'tech.https', module: 'seo-tech', label: 'HTTPS', status: 'pass', value: true },
  ],
  annotations: [], screenshotPath: null,
  competitors: [{ domain: 'concurrent.fr', url: 'https://concurrent.fr', perfScoreMobile: 78, seoScore: 90, lcpMs: 1800 }],
  revenue: { sector: 'conciergerie', items: [{ id: 'revenue.lcp', label: 'LCP', monthlyLossEur: 1760, formula: 'x' }], totalMonthlyLossEur: 1056, assumptions: ['Estimation.'] },
});
const content = (): ReportContent => ({
  execSummary: 'Votre site sous-performe face a vos concurrents.',
  recommendation: 'refonte',
  findings: [
    { title: 'Performance', body: 'Score de 32 sur 100.', priority: 'P0', measurementIds: ['perf.mobile.score'] },
  ],
  competitorAnalysis: 'Vos concurrents chargent plus vite.',
});

describe('buildProReportHtml', () => {
  it('contient score, manque à gagner, concurrent et charte orange', () => {
    const html = buildProReportHtml(audit(), content(), { score: 38 });
    expect(html).toContain('38'); // score injecté
    expect(html).toContain('1 056'); // manque à gagner total formaté FR
    expect(html).toContain('concurrent.fr');
    expect(html).toContain('#F36F1C'); // charte orange (pas le bleu skill)
    expect(html).not.toContain('#1e40af');
  });
  it('ne contient ni prix de refonte ni roadmap ni tiret long', () => {
    const html = buildProReportHtml(audit(), content(), { score: 38 });
    expect(html.toLowerCase()).not.toMatch(/roadmap|devis|sprint|tjm/);
    expect(html).not.toMatch(/—|–/);
  });
});
