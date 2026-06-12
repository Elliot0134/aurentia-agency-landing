import { describe, it, expect, vi } from 'vitest';
import { writeReport, writeProReport, type GenerateFn, type GenerateProFn } from '../write-report';
import type { AuditData } from '../../types';
import type { ProReportContent, ReportContent } from '../report-schema';

const audit = (): AuditData => ({
  url: 'https://x.fr', finalUrl: 'https://x.fr', tier: 'flash', collectedAt: '2026-06-11T00:00:00Z',
  description: null,
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'marseille', sector: 'conciergerie' },
  measurements: [{ id: 'perf.mobile.lcp', module: 'perf', label: 'LCP', status: 'fail', value: 11.8, unit: 's' }],
  annotations: [], screenshotPath: null, competitors: [], impact: null,
});
const valid: ReportContent = {
  execSummary: 'Votre site est lent et perd des visiteurs.',
  recommendation: 'refonte',
  findings: [{ title: 'Lenteur', body: 'Le contenu met 11,8s a charger.', priority: 'P0', measurementIds: ['perf.mobile.lcp'] }],
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
};

describe('writeProReport', () => {
  it('retourne le contenu Pro si le contrat passe', async () => {
    const gen: GenerateProFn = vi.fn(async () => validPro);
    const r = await writeProReport(proAudit(), { generateFn: gen });
    expect(r).toEqual(validPro);
    expect(r.auditTable).toHaveLength(5);
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
