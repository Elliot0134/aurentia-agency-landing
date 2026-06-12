import { describe, it, expect } from 'vitest';
import { validateReportContract, ContractViolation } from '../contract';
import type { AuditData } from '../../types';
import type { ProReportContent, ReportContent } from '../report-schema';

const audit = (): AuditData => ({
  url: 'https://x.fr', finalUrl: 'https://x.fr', tier: 'pro', collectedAt: '2026-06-11T00:00:00Z',
  description: null,
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'marseille', sector: 'conciergerie' },
  measurements: [
    { id: 'perf.mobile.lcp', module: 'perf', label: 'LCP', status: 'fail', value: 11.8, unit: 's' },
    { id: 'seo.images.alt', module: 'seo-onpage', label: 'alt', status: 'fail', value: 2 },
  ],
  annotations: [], screenshotPath: null, competitors: [],
  impact: { items: [{ id: 'impact.lcp', label: 'LCP', lossPercent: 60, basis: '...' }], headlinePercent: 60, assumptions: [] },
  crawl: null,
});

const okContent = (): ReportContent => ({
  execSummary: 'Votre site perd des visiteurs à cause de sa lenteur de chargement.',
  recommendation: 'refonte',
  findings: [{ title: 'Site lent', body: 'Le contenu met 11,8s à apparaitre, vos visiteurs partent.', priority: 'P0', measurementIds: ['perf.mobile.lcp'] }],
  competitorAnalysis: null,
  scoreJustification: 'Le score est tiré vers le bas par des temps de chargement excessifs. Les fondations techniques sont en place mais les performances freinent la conversion.',
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
  it('rejette tout montant €', () => {
    const c = okContent();
    c.findings[0].body = 'Vous perdez 9 999 € par mois à cause de ça.';
    expect(() => validateReportContract(c, audit())).toThrow(/montant/i);
  });
  it('accepte un % de visiteurs cité', () => {
    const c = okContent();
    c.findings[0].body = "Environ 32% de vos visiteurs partent avant de voir votre offre.";
    expect(() => validateReportContract(c, audit())).not.toThrow();
  });
});

const okProContent = (): ProReportContent => ({
  ...okContent(),
  auditTable: [1, 2, 3, 4, 5].map((i) => ({
    category: 'PERFORMANCE & TECHNIQUE' as const,
    domain: `Domaine ${i}`,
    finding: 'Le contenu principal met 11,8 s à apparaitre sur mobile.',
    impact: 'Une majorité de visiteurs mobiles partent avant de voir votre offre.',
    priority: 'Critique' as const,
    measurementIds: ['perf.mobile.lcp'],
  })),
  recommendations: [1, 2, 3, 4].map((i) => ({
    title: `Recommandation ${i}`,
    action: 'Réduire le poids des images et différer les scripts non essentiels.',
    expectedImpact: 'Affichage du contenu sous 3 secondes.',
  })),
  funnelAnalysis: 'Sur 100 visiteurs, environ 60 partent avant que le contenu principal ne soit affiché.',
  funnelProjection: 'Après correction, la perte estimée tombe sous 20 visiteurs sur 100, estimation prudente.',
  recommendationSummary: 'Le site perd la majorité de ses visiteurs mobiles avant la prise de contact. Nous recommandons une refonte axée performance en priorité.',
});

describe('validateReportContract (contenu Pro)', () => {
  it('accepte un contenu Pro conforme', () => {
    expect(() => validateReportContract(okProContent(), audit())).not.toThrow();
  });
  it('rejette un montant € dans funnelProjection', () => {
    const c = okProContent();
    c.funnelProjection = 'Après correction, vous récupérez environ 2 500 € de chiffre par mois.';
    expect(() => validateReportContract(c, audit())).toThrow(/montant/i);
  });
  it("rejette un measurementId inexistant dans une ligne du tableau d'audit", () => {
    const c = okProContent();
    c.auditTable[2].measurementIds = ['mesure.inventee'];
    expect(() => validateReportContract(c, audit())).toThrow(ContractViolation);
  });
  it('rejette un tiret long dans une recommandation', () => {
    const c = okProContent();
    c.recommendations[0].action = 'Compresser les images — puis différer les scripts.';
    expect(() => validateReportContract(c, audit())).toThrow(/tiret long/i);
  });
  it("rejette une mention d'IA dans le tableau d'audit", () => {
    const c = okProContent();
    c.auditTable[0].finding = 'Notre intelligence artificielle a repéré une lenteur importante.';
    expect(() => validateReportContract(c, audit())).toThrow(/IA|intelligence artificielle/i);
  });
  it('rejette un montant € dans recommendationSummary', () => {
    const c = okProContent();
    c.recommendationSummary = 'Une refonte du site vous fera récupérer environ 3 000 € de chiffre par mois.';
    expect(() => validateReportContract(c, audit())).toThrow(/montant/i);
  });
});
