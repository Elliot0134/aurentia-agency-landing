import { describe, it, expect, vi } from 'vitest';
import { renderReport } from '../render';
import { computeScore } from '../score';
import type { AuditData } from '../../types';
import type { GenerateFn, GenerateProFn } from '../write-report';
import type { ProReportContent, ReportContent } from '../report-schema';
import type { BrowserlessConfig } from '../../screenshot';

const browserless: BrowserlessConfig = { token: 'tok', baseUrl: 'https://bl.test' };

const baseAudit = (tier: 'flash' | 'pro'): AuditData => ({
  url: 'https://x.fr',
  finalUrl: 'https://x.fr',
  tier,
  collectedAt: '2026-06-11T00:00:00Z',
  description: null,
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'marseille', sector: 'conciergerie' },
  measurements: [
    { id: 'perf.mobile.lcp', module: 'perf', label: 'LCP', status: 'fail', value: 11.8, unit: 's' },
    { id: 'seo.title', module: 'seo-onpage', label: 'Titre', status: 'pass', value: 'OK' },
  ],
  annotations: [],
  screenshotPath: null,
  competitors: [],
  impact: null,
});

const flashContent: ReportContent = {
  execSummary: 'Votre site est lent et perd des visiteurs chaque mois.',
  recommendation: 'refonte',
  findings: [
    { title: 'Lenteur', body: 'Le contenu met 11,8s a charger.', priority: 'P0', measurementIds: ['perf.mobile.lcp'] },
  ],
  competitorAnalysis: null,
  scoreJustification: 'Texte de justification du score global pour ce test.',
};

const proContent: ProReportContent = {
  ...flashContent,
  competitorAnalysis: 'Vos concurrents chargent plus vite et captent les visiteurs.',
  auditTable: [1, 2, 3, 4, 5].map((i) => ({
    category: 'PERFORMANCE & TECHNIQUE' as const,
    domain: i === 1 ? 'Navigation mobile distinctive' : `Domaine ${i}`,
    finding: 'Le contenu principal met 11,8 s à apparaitre sur mobile.',
    impact: 'Une majorité de visiteurs mobiles partent avant de voir votre offre.',
    priority: 'Critique' as const,
    measurementIds: ['perf.mobile.lcp'],
  })),
  recommendations: [1, 2, 3, 4].map((i) => ({
    title: i === 1 ? 'Accélérer le chargement mobile en priorité' : `Recommandation ${i}`,
    action: 'Réduire le poids des images et différer les scripts non essentiels.',
    expectedImpact: 'Affichage du contenu sous 3 secondes.',
  })),
  funnelAnalysis: 'Sur 100 visiteurs, environ 60 partent avant que le contenu principal ne soit affiché.',
  funnelProjection: 'Après correction, la perte estimée tombe sous 20 visiteurs sur 100, estimation prudente.',
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
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    const r = await renderReport(audit, { browserless, generateProFn, fetchFn: pdfFetch });

    expect(r.pdfBuffer).toBeInstanceOf(Buffer);
    expect(r.pdfBuffer!.subarray(0, 4).toString('latin1')).toBe('%PDF');
    expect(r.emailHtml).toBeUndefined();
    expect(r.content.competitorAnalysis).toBe(proContent.competitorAnalysis);
    expect(r.score).toBe(computeScore(audit.measurements));
  });

  it('pro avec >= 3 modules scorables → charts radar et état/cible injectés dans le HTML envoyé', async () => {
    const audit = baseAudit('pro');
    audit.measurements.push({ id: 'images.alt', module: 'images', label: 'Alt manquants', status: 'warn', value: 3 });

    const fetchSpy = vi.fn(async (..._args: Parameters<typeof fetch>) => {
      const body = Buffer.concat([Buffer.from('%PDF-1.4'), Buffer.from([0x00])]);
      return new Response(body, { status: 200 });
    });
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    await renderReport(audit, { browserless, generateProFn, fetchFn: fetchSpy as unknown as typeof fetch });

    const init = fetchSpy.mock.calls[0]?.[1] as RequestInit | undefined;
    const payload = JSON.parse(String(init?.body)) as { html: string };
    expect(payload.html).toContain('<polygon'); // radar
    expect(payload.html).toContain('cible 9'); // barres état/cible
  });

  it('pro → le contenu rédigé par le LLM (auditTable, recommandations, funnel) alimente le HTML', async () => {
    const audit = baseAudit('pro');
    const fetchSpy = vi.fn(async (..._args: Parameters<typeof fetch>) => {
      const body = Buffer.concat([Buffer.from('%PDF-1.4'), Buffer.from([0x00])]);
      return new Response(body, { status: 200 });
    });
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    await renderReport(audit, { browserless, generateProFn, fetchFn: fetchSpy as unknown as typeof fetch });

    const init = fetchSpy.mock.calls[0]?.[1] as RequestInit | undefined;
    const payload = JSON.parse(String(init?.body)) as { html: string };
    expect(payload.html).toContain('Navigation mobile distinctive'); // ligne auditTable du stub
    expect(payload.html).toContain('Accélérer le chargement mobile en priorité'); // titre de reco du stub
    expect(payload.html).toContain('Sur 100 visiteurs, environ 60 partent'); // funnelAnalysis
    expect(payload.html).toContain('estimation prudente'); // funnelProjection
  });
});
