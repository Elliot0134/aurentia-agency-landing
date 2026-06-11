import { describe, it, expect, vi } from 'vitest';
import { writeReport, type GenerateFn } from '../write-report';
import type { AuditData } from '../../types';
import type { ReportContent } from '../report-schema';

const audit = (): AuditData => ({
  url: 'https://x.fr', finalUrl: 'https://x.fr', tier: 'flash', collectedAt: '2026-06-11T00:00:00Z',
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
