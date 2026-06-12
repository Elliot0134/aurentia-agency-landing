import { describe, it, expect, vi } from 'vitest';
import { getWriterModelLabel, writeReport, writeProReport, type GenerateFn, type GenerateProFn } from '../write-report';
import type { AuditData } from '../../types';
import type { ProReportContent, ReportContent } from '../report-schema';

const audit = (): AuditData => ({
  url: 'https://x.fr', finalUrl: 'https://x.fr', tier: 'flash', collectedAt: '2026-06-11T00:00:00Z',
  description: null,
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'marseille', sector: 'conciergerie' },
  measurements: [{ id: 'perf.mobile.lcp', module: 'perf', label: 'LCP', status: 'fail', value: 11.8, unit: 's' }],
  annotations: [], screenshotPath: null, competitors: [], impact: null, crawl: null,
});
const valid: ReportContent = {
  execSummary: 'Votre site est lent et perd des visiteurs.',
  recommendation: 'refonte',
  findings: [{
    title: 'Lenteur',
    body: 'Vos visiteurs partent avant de voir votre offre. Le contenu principal met 11,8 s a apparaitre sur mobile, bien au-dela du seuil recommande. Une fois corrige, la page s affiche en moins de 3 secondes.',
    priority: 'P0',
    measurementIds: ['perf.mobile.lcp'],
  }],
  competitorAnalysis: null,
  scoreJustification: 'Texte de justification du score global pour ce test.',
};

describe('writeReport', () => {
  it('retourne le contenu si le contrat passe', async () => {
    const gen: GenerateFn = vi.fn(async () => valid);
    const r = await writeReport(audit(), { generateFn: gen });
    expect(r).toEqual(valid);
    expect(gen).toHaveBeenCalledTimes(1);
  });
  it('réessaie si le contrat échoue, puis réussit', async () => {
    const bad: ReportContent = { ...valid, execSummary: 'Site lent — très lent.' };
    const gen: GenerateFn = vi.fn().mockResolvedValueOnce(bad).mockResolvedValueOnce(valid);
    const r = await writeReport(audit(), { generateFn: gen });
    expect(r).toEqual(valid);
    expect(gen).toHaveBeenCalledTimes(2);
  });
  it('abandonne après 3 violations de contrat', async () => {
    const bad: ReportContent = { ...valid, execSummary: 'Site lent — très lent.' };
    const gen: GenerateFn = vi.fn(async () => bad);
    await expect(writeReport(audit(), { generateFn: gen })).rejects.toThrow();
    expect(gen).toHaveBeenCalledTimes(3);
  });
});

const proAudit = (): AuditData => ({ ...audit(), tier: 'pro' });

const validPro: ProReportContent = {
  ...valid,
  auditTable: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => ({
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
  strategicRecommendations: [1, 2, 3].map((i) => ({
    title: `Axe stratégique ${i}`,
    rationale: 'Justification ancrée dans les constats mesurés du site, sur trois à quatre phrases de fond pour le dirigeant.',
  })),
  funnelAnalysis: 'Sur 100 visiteurs, environ 60 partent avant que le contenu principal ne soit affiché.',
  funnelProjection: 'Après correction, la perte estimée tombe sous 20 visiteurs sur 100, estimation prudente.',
  recommendationSummary: 'Le site perd la majorité de ses visiteurs mobiles avant la prise de contact. Nous recommandons une refonte axée performance en priorité.',
};

describe('writeProReport', () => {
  it('retourne le contenu Pro si le contrat passe', async () => {
    const gen: GenerateProFn = vi.fn(async () => validPro);
    const r = await writeProReport(proAudit(), { generateFn: gen });
    expect(r).toEqual(validPro);
    expect(r.auditTable).toHaveLength(12);
    expect(gen).toHaveBeenCalledTimes(1);
  });
  it('réessaie après une violation de contrat dans un champ Pro, puis réussit', async () => {
    const bad: ProReportContent = { ...validPro, funnelAnalysis: 'Vous perdez 4 000 € par mois à cause de la lenteur du site.' };
    const gen: GenerateProFn = vi.fn().mockResolvedValueOnce(bad).mockResolvedValueOnce(validPro);
    const r = await writeProReport(proAudit(), { generateFn: gen });
    expect(r).toEqual(validPro);
    expect(gen).toHaveBeenCalledTimes(2);
  });
  it('abandonne après maxAttempts violations', async () => {
    const bad: ProReportContent = { ...validPro, funnelProjection: 'Gain estimé — environ 30% de visiteurs récupérés sur le site.' };
    const gen: GenerateProFn = vi.fn(async () => bad);
    await expect(writeProReport(proAudit(), { generateFn: gen, maxAttempts: 2 })).rejects.toThrow();
    expect(gen).toHaveBeenCalledTimes(2);
  });
});

describe('getWriterModelLabel', () => {
  it('retourne openrouter:<modèle> depuis l\'environnement, fallback "non configuré"', () => {
    const prev = process.env.OPENROUTER_MODEL;
    try {
      process.env.OPENROUTER_MODEL = 'google/gemini-3.5-flash';
      expect(getWriterModelLabel()).toBe('openrouter:google/gemini-3.5-flash');
      delete process.env.OPENROUTER_MODEL;
      expect(getWriterModelLabel()).toBe('openrouter:non configuré');
    } finally {
      if (prev !== undefined) process.env.OPENROUTER_MODEL = prev;
      else delete process.env.OPENROUTER_MODEL;
    }
  });
});
