import { describe, it, expect, vi } from 'vitest';
import { renderReport } from '../render';
import type { buildVisualFindings } from '../visual-findings';
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
  crawl: null,
});

const flashContent: ReportContent = {
  execSummary: 'Votre site est lent et perd des visiteurs chaque mois.',
  recommendation: 'refonte',
  findings: [
    {
      title: 'Lenteur',
      body: 'Vos visiteurs partent avant de voir votre offre. Le contenu principal met 11,8 s a apparaitre sur mobile, bien au-dela du seuil recommande. Une fois corrige, la page s affiche en moins de 3 secondes.',
      priority: 'P0',
      measurementIds: ['perf.mobile.lcp'],
    },
  ],
  competitorAnalysis: null,
  scoreJustification: 'Texte de justification du score global pour ce test.',
};

const proContent: ProReportContent = {
  ...flashContent,
  competitorAnalysis: 'Vos concurrents chargent plus vite et captent les visiteurs.',
  auditTable: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => ({
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
  strategicRecommendations: [1, 2, 3].map((i) => ({
    title: i === 1 ? 'Construire une stratégie de contenu locale durable' : `Axe stratégique ${i}`,
    rationale:
      'Vos pages actuelles ne couvrent pas les recherches locales de vos clients. Publier des contenus dédiés à chaque zone renforce durablement votre visibilité.',
  })),
  funnelAnalysis: 'Sur 100 visiteurs, environ 60 partent avant que le contenu principal ne soit affiché.',
  funnelProjection: 'Après correction, la perte estimée tombe sous 20 visiteurs sur 100, estimation prudente.',
  recommendationSummary: 'Le site perd la majorité de ses visiteurs mobiles avant la prise de contact. Nous recommandons une refonte axée performance en priorité.',
  aiVisibilityAnalysis: 'Votre site reste peu lisible pour les moteurs de réponse comme ChatGPT ou Perplexity. Structurer des passages factuels citables et relier vos profils externes ouvre un canal de découverte en forte croissance.',
};

/** fetchFn stub : /pdf renvoie un binaire commençant par %PDF. */
const pdfFetch: typeof fetch = vi.fn(async () => {
  const body = Buffer.concat([Buffer.from('%PDF-1.4'), Buffer.from([0x00, 0x01, 0x02])]);
  return new Response(body, { status: 200 });
}) as unknown as typeof fetch;

/** Stub constats visuels : aucun finding (la section est omise). */
const noVisuals = vi.fn(async () => []);

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
    expect(r.writerModel).toMatch(/^openrouter:/); // traçabilité du modèle rédacteur
  });

  it('pro → pdfBuffer commence par %PDF, competitorAnalysis présent, score cohérent', async () => {
    const audit = baseAudit('pro');
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    const r = await renderReport(audit, { browserless, generateProFn, fetchFn: pdfFetch, buildVisualsFn: noVisuals });

    expect(r.pdfBuffer).toBeInstanceOf(Buffer);
    expect(r.pdfBuffer!.subarray(0, 4).toString('latin1')).toBe('%PDF');
    expect(r.emailHtml).toBeUndefined();
    expect(r.content.competitorAnalysis).toBe(proContent.competitorAnalysis);
    expect(r.score).toBe(computeScore(audit.measurements));
    expect(r.writerModel).toMatch(/^openrouter:/); // traçabilité du modèle rédacteur
  });

  it('pro avec >= 3 modules scorables → charts radar et état/cible injectés dans le HTML envoyé', async () => {
    const audit = baseAudit('pro');
    audit.measurements.push({ id: 'images.alt', module: 'images', label: 'Alt manquants', status: 'warn', value: 3 });

    const fetchSpy = vi.fn(async (..._args: Parameters<typeof fetch>) => {
      const body = Buffer.concat([Buffer.from('%PDF-1.4'), Buffer.from([0x00])]);
      return new Response(body, { status: 200 });
    });
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    await renderReport(audit, {
      browserless,
      generateProFn,
      fetchFn: fetchSpy as unknown as typeof fetch,
      buildVisualsFn: noVisuals,
    });

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
    await renderReport(audit, {
      browserless,
      generateProFn,
      fetchFn: fetchSpy as unknown as typeof fetch,
      buildVisualsFn: noVisuals,
    });

    const init = fetchSpy.mock.calls[0]?.[1] as RequestInit | undefined;
    const payload = JSON.parse(String(init?.body)) as { html: string };
    expect(payload.html).toContain('Navigation mobile distinctive'); // ligne auditTable du stub
    expect(payload.html).toContain('Accélérer le chargement mobile en priorité'); // titre de reco du stub
    expect(payload.html).toContain('Recommandations stratégiques'); // section des axes 6-12 mois
    expect(payload.html).toContain('Construire une stratégie de contenu locale durable'); // axe du stub
    expect(payload.html).toContain('Sur 100 visiteurs, environ 60 partent'); // funnelAnalysis
    expect(payload.html).toContain('estimation prudente'); // funnelProjection
  });

  it('pro avec crawl → la page clé (pathname commercial, status 200, hors homepage) est passée à buildVisualsFn', async () => {
    const audit = baseAudit('pro');
    audit.crawl = {
      analyzedPages: 4,
      discoveredCount: 6,
      pages: [
        { url: 'https://x.fr', title: 'Accueil', status: 200 }, // homepage : exclue
        { url: 'https://x.fr/blog', title: 'Blog', status: 200 },
        { url: 'https://x.fr/tarifs', title: 'Tarifs', status: 200 }, // prioritaire (pathname commercial)
        { url: 'https://x.fr/contact', title: 'Contact', status: 404 }, // exclue (pas 200)
      ],
    };
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    const buildVisualsFn = vi.fn<typeof buildVisualFindings>(async () => []);
    await renderReport(audit, { browserless, generateProFn, fetchFn: pdfFetch, buildVisualsFn });

    expect(buildVisualsFn.mock.calls[0]?.[0].keyPage).toEqual({ url: 'https://x.fr/tarifs', title: 'Tarifs' });
  });

  it('pro avec crawl sans pathname commercial → première page 200 hors homepage ; sans crawl → keyPage undefined', async () => {
    const audit = baseAudit('pro');
    audit.crawl = {
      analyzedPages: 3,
      discoveredCount: 3,
      pages: [
        { url: 'https://x.fr/a-propos', title: 'A propos', status: 200 },
        { url: 'https://x.fr/blog', title: 'Blog', status: 200 },
      ],
    };
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    const buildVisualsFn = vi.fn<typeof buildVisualFindings>(async () => []);
    await renderReport(audit, { browserless, generateProFn, fetchFn: pdfFetch, buildVisualsFn });
    expect(buildVisualsFn.mock.calls[0]?.[0].keyPage).toEqual({ url: 'https://x.fr/a-propos', title: 'A propos' });

    const noCrawl = baseAudit('pro'); // crawl: null
    const buildVisualsFn2 = vi.fn<typeof buildVisualFindings>(async () => []);
    await renderReport(noCrawl, { browserless, generateProFn, fetchFn: pdfFetch, buildVisualsFn: buildVisualsFn2 });
    expect(buildVisualsFn2.mock.calls[0]?.[0].keyPage).toBeUndefined();
  });

  it('pro avec impact mesuré → le funnel SVG (base 100) est injecté dans le HTML envoyé', async () => {
    const audit = baseAudit('pro');
    audit.impact = {
      items: [{ id: 'impact.lcp', label: 'Lenteur LCP', lossPercent: 25, basis: 'LCP mesuré 11,8 s' }],
      headlinePercent: 25,
      assumptions: ['estimation prudente'],
    };

    const fetchSpy = vi.fn(async (..._args: Parameters<typeof fetch>) => {
      const body = Buffer.concat([Buffer.from('%PDF-1.4'), Buffer.from([0x00])]);
      return new Response(body, { status: 200 });
    });
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    await renderReport(audit, {
      browserless,
      generateProFn,
      fetchFn: fetchSpy as unknown as typeof fetch,
      buildVisualsFn: noVisuals,
    });

    const init = fetchSpy.mock.calls[0]?.[1] as RequestInit | undefined;
    const payload = JSON.parse(String(init?.body)) as { html: string };
    // Les labels d'étages sont wrappés sur 2 lignes au-delà de 38 caractères :
    // on vérifie les fragments de chaque ligne, pas la chaîne entière.
    expect(payload.html).toContain('Visiteurs qui arrivent sur le site'); // étage 1 du funnel SVG (ligne 1)
    expect(payload.html).toContain('(base)'); // étage 1 (ligne 2)
    expect(payload.html).toContain('contact/client'); // étage final
  });

  it('pro → les constats visuels (B5) sont injectés dans le HTML envoyé à /pdf', async () => {
    const audit = baseAudit('pro');
    const fetchSpy = vi.fn(async (..._args: Parameters<typeof fetch>) => {
      const body = Buffer.concat([Buffer.from('%PDF-1.4'), Buffer.from([0x00])]);
      return new Response(body, { status: 200 });
    });
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    const buildVisualsFn = vi.fn<typeof buildVisualFindings>(async () => [
      {
        title: 'Accueil sur ordinateur',
        imageDataUri: 'data:image/jpeg;base64,QUJDRA==',
        legend: ['Accroche claire et lisible'],
        analysis: '1 point fort relevé sur ce premier écran.',
        kind: 'desktop' as const,
      },
    ]);

    await renderReport(audit, {
      browserless,
      generateProFn,
      fetchFn: fetchSpy as unknown as typeof fetch,
      buildVisualsFn,
    });

    expect(buildVisualsFn).toHaveBeenCalledOnce();
    expect(buildVisualsFn.mock.calls[0]?.[0]).toMatchObject({ homepageUrl: audit.finalUrl, browserless });

    const init = fetchSpy.mock.calls[0]?.[1] as RequestInit | undefined;
    const payload = JSON.parse(String(init?.body)) as { html: string };
    expect(payload.html).toContain('Accueil sur ordinateur');
    expect(payload.html).toContain('data:image/jpeg;base64,QUJDRA==');
    expect(payload.html).toContain('Accroche claire et lisible');
  });

  it('pro → visuals [] : la section constats visuels est omise', async () => {
    const audit = baseAudit('pro');
    const fetchSpy = vi.fn(async (..._args: Parameters<typeof fetch>) => {
      const body = Buffer.concat([Buffer.from('%PDF-1.4'), Buffer.from([0x00])]);
      return new Response(body, { status: 200 });
    });
    const generateProFn: GenerateProFn = vi.fn(async () => proContent);
    await renderReport(audit, {
      browserless,
      generateProFn,
      fetchFn: fetchSpy as unknown as typeof fetch,
      buildVisualsFn: noVisuals,
    });

    const init = fetchSpy.mock.calls[0]?.[1] as RequestInit | undefined;
    const payload = JSON.parse(String(init?.body)) as { html: string };
    expect(payload.html).not.toContain('Constats visuels');
  });
});
