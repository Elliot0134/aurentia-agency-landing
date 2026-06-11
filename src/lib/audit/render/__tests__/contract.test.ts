import { describe, it, expect } from 'vitest';
import { validateReportContract, ContractViolation } from '../contract';
import type { AuditData } from '../../types';
import type { ReportContent } from '../report-schema';

const audit = (): AuditData => ({
  url: 'https://x.fr', finalUrl: 'https://x.fr', tier: 'pro', collectedAt: '2026-06-11T00:00:00Z',
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'marseille', sector: 'conciergerie' },
  measurements: [
    { id: 'perf.mobile.lcp', module: 'perf', label: 'LCP', status: 'fail', value: 11.8, unit: 's' },
    { id: 'seo.images.alt', module: 'seo-onpage', label: 'alt', status: 'fail', value: 2 },
  ],
  annotations: [], screenshotPath: null, competitors: [],
  revenue: { sector: 'conciergerie', items: [{ id: 'revenue.lcp', label: 'LCP', monthlyLossEur: 1760, formula: '...' }], totalMonthlyLossEur: 1056, assumptions: [] },
});

const okContent = (): ReportContent => ({
  execSummary: 'Votre site perd des visiteurs à cause de sa lenteur de chargement.',
  recommendation: 'refonte',
  findings: [{ title: 'Site lent', body: 'Le contenu met 11,8s à apparaitre, vos visiteurs partent.', priority: 'P0', measurementIds: ['perf.mobile.lcp'] }],
  competitorAnalysis: null,
});

describe('validateReportContract', () => {
  it('accepte un contenu conforme', () => {
    expect(() => validateReportContract(okContent(), audit())).not.toThrow();
  });
  it('rejette un measurementId inexistant', () => {
    const c = okContent();
    c.findings[0].measurementIds = ['perf.mobile.lcp', 'inexistant.xyz'];
    expect(() => validateReportContract(c, audit())).toThrow(ContractViolation);
  });
  it('rejette un tiret long où que ce soit', () => {
    const c = okContent();
    c.execSummary = 'Votre site est lent — très lent.';
    expect(() => validateReportContract(c, audit())).toThrow(/tiret long/i);
  });
  it('rejette une mention d’IA', () => {
    const c = okContent();
    c.findings[0].body = 'Notre intelligence artificielle a détecté un problème.';
    expect(() => validateReportContract(c, audit())).toThrow(/IA|intelligence artificielle/i);
  });
  it('rejette une affirmation de position Google', () => {
    const c = okContent();
    c.findings[0].body = 'Vous êtes en position 8 sur Google.';
    expect(() => validateReportContract(c, audit())).toThrow(/position Google/i);
  });
  it('rejette un montant € absent des revenue items', () => {
    const c = okContent();
    c.findings[0].body = 'Vous perdez 9 999 € par mois à cause de ça.';
    expect(() => validateReportContract(c, audit())).toThrow(/montant/i);
  });
  it('accepte un montant € présent dans les revenue items', () => {
    const c = okContent();
    c.findings[0].body = 'Vous perdez environ 1 760 € par mois.';
    expect(() => validateReportContract(c, audit())).not.toThrow();
  });
});
