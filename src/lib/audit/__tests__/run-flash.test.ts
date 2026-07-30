import { describe, it, expect, beforeAll } from 'vitest';
import sharp from 'sharp';
import { runFlashAudit, type RunFlashDeps, type AuditStorageClient } from '../run-flash';
import type { ReportContent } from '../render/report-schema';
import type { VisualAnalysis } from '../render/visual-findings';

const HTML = `<html><head>
  <title>Conciergerie Marseille | Gestion Airbnb clé en main et sereine</title>
  <meta name="description" content="Gestion complète de votre location courte durée à Marseille : annonces, accueil voyageurs, ménage professionnel. Estimation gratuite en 2 minutes.">
  <meta name="viewport" content="width=device-width">
  <link rel="canonical" href="https://exemple.fr/">
  <meta property="og:title" content="X"><meta property="og:image" content="/og.png">
  </head><body><h1>Conciergerie à Marseille</h1>
  <img src="/a.jpg" alt="ok"></body></html>`;

const PSI_FIXTURE = JSON.stringify({
  lighthouseResult: {
    categories: { performance: { score: 0.42 }, seo: { score: 0.67 } },
    audits: { 'largest-contentful-paint': { numericValue: 4200 }, 'cumulative-layout-shift': { numericValue: 0.31 } },
  },
});

/** PNG full-page valide (sharp doit pouvoir le cropper), généré une fois. */
let screenshotPng: Buffer;
beforeAll(async () => {
  screenshotPng = await sharp({
    create: { width: 1440, height: 2400, channels: 3, background: { r: 250, g: 245, b: 240 } },
  })
    .png()
    .toBuffer();
});

/** fetch stub routeur (même motif que collect.test.ts) : zéro réseau. */
/** Réponse Browserless /function du code de capture (PNG base64 + validité). */
const captureFn = (png: Uint8Array | Buffer) =>
  new Response(
    JSON.stringify({
      data: { png: Buffer.from(png).toString('base64'), bodyTextLength: 5091, overlaysRemoved: 0, blockedBy: null },
      type: 'application/json',
    }),
    { status: 200 },
  );

const fakeFetch: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const u = String(input);
  if (u.includes('pagespeedonline')) return new Response(PSI_FIXTURE, { status: 200 });
  if (u.includes('/function')) {
    if (String(init?.body ?? '').includes('page.screenshot')) return captureFn(screenshotPng);
    return new Response(JSON.stringify([]), { status: 200 });
  }
  if (u.includes('api.exa.ai/contents'))
    return new Response(JSON.stringify({ results: [{ summary: 'desc test' }] }), { status: 200 });
  if (u.includes('api.exa.ai')) return new Response(JSON.stringify({ results: [] }), { status: 200 });
  if (init?.method === 'HEAD') return new Response(null, { status: 200 });
  return new Response(HTML, { status: 200 });
}) as typeof fetch;

/** Contenu rédigé valide sous le contrat de véracité (ids de mesures réels). */
const stubContent = (): ReportContent => ({
  execSummary:
    'Votre site perd une partie de ses visiteurs avant de montrer votre offre, la lenteur du chargement mobile en est la cause principale.',
  recommendation: 'optimisations',
  findings: [
    {
      title: 'Chargement mobile trop lent',
      body: 'Vos visiteurs attendent plusieurs secondes avant de voir le contenu principal sur mobile, ce qui en fait partir une partie avant même de découvrir votre offre. Corriger le chargement raccourcit ce délai.',
      priority: 'P0',
      measurementIds: ['perf.mobile.score'],
    },
  ],
  competitorAnalysis: null,
  scoreJustification: 'Le score reflète une performance mobile faible malgré un balisage SEO correct.',
});

const stubAnalysis = (): VisualAnalysis => ({
  points: [
    { sentiment: 'negatif', comment: 'Le bouton principal manque de contraste face au fond clair.' },
    { sentiment: 'positif', comment: "L'accroche du premier écran annonce clairement le service proposé." },
  ],
});

interface FakeSupabase {
  uploads: string[];
  client: AuditStorageClient;
}

/** Client Supabase FAKE structurel : enregistre les uploads, publicUrl prévisible. */
function fakeSupabase(opts: { failCapture?: boolean; failGauge?: boolean } = {}): FakeSupabase {
  const uploads: string[] = [];
  const client: AuditStorageClient = {
    storage: {
      from: (bucketId: string) => ({
        upload: async (path: string) => {
          if (opts.failCapture && path.includes('capture-')) return { error: { message: 'boom capture' } };
          if (opts.failGauge && path.includes('score-')) return { error: { message: 'boom gauge' } };
          uploads.push(`${bucketId}/${path}`);
          return { error: null };
        },
        getPublicUrl: (path: string) => ({ data: { publicUrl: `https://cdn.test/${bucketId}/${path}` } }),
      }),
    },
  };
  return { uploads, client };
}

function makeDeps(overrides: Partial<RunFlashDeps> = {}): RunFlashDeps {
  return {
    psiApiKey: 'PSI',
    browserless: { token: 'BL' },
    exaApiKey: 'EXA',
    supabase: fakeSupabase().client,
    fetchFn: fakeFetch,
    resolver: { resolve4: async () => ['1.2.3.4'], resolve6: async () => [] },
    generateFn: async () => stubContent(),
    classifyFn: async () => ({ isLocal: false, geoQuery: null }),
    analyzeFn: async () => stubAnalysis(),
    ...overrides,
  };
}

const INPUT = { url: 'exemple.fr', email: 'prospect@exemple.fr' };

describe('runFlashAudit', () => {
  it('nominal : sujet avec domaine et score, capture publique dans le html, cadran, writerModel traçable', async () => {
    const supa = fakeSupabase();
    const result = await runFlashAudit(INPUT, makeDeps({ supabase: supa.client }));

    // Sujet statique : domaine + score réel
    expect(result.subject).toBe(`Votre pré-audit de exemple.fr : ${result.score}/100`);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);

    // Capture uploadée (jpg) + cadran (png) dans le bucket public, chemins flash/<jobSlug>/
    expect(supa.uploads.some((p) => /^audit-captures\/flash\/exemple-fr\/capture-\d+\.jpg$/.test(p))).toBe(true);
    expect(supa.uploads.some((p) => /^audit-captures\/flash\/exemple-fr\/score-\d+\.png$/.test(p))).toBe(true);

    // Le html embarque l'URL publique stub de la capture et du cadran
    expect(result.html).toContain('https://cdn.test/audit-captures/flash/exemple-fr/capture-');
    expect(result.html).toContain('https://cdn.test/audit-captures/flash/exemple-fr/score-');
    expect(result.html).toContain('Votre score global');

    // Pastilles : les commentaires vision sont en légende
    expect(result.html).toContain('Le bouton principal manque de contraste face au fond clair.');

    // CTA par défaut : page /audit (pas le lien Stripe)
    expect(result.html).toContain('https://www.aurentia.agency/audit');

    // Flash : pas d'impact calculé (réservé au pro)
    expect(result.impactPercent).toBeNull();

    // Traçabilité du modèle rédacteur
    expect(result.writerModel).toMatch(/^openrouter:/);
  });

  it('vision en échec : le mail part quand même, sans pastilles', async () => {
    const result = await runFlashAudit(
      INPUT,
      makeDeps({
        analyzeFn: async () => {
          throw new Error('vision indisponible');
        },
      }),
    );
    expect(result.html).toContain('https://cdn.test/audit-captures/flash/exemple-fr/capture-');
    expect(result.html).not.toContain('manque de contraste');
  });

  it('upload du cadran en échec : le mail part quand même, sans cadran', async () => {
    const supa = fakeSupabase({ failGauge: true });
    const result = await runFlashAudit(INPUT, makeDeps({ supabase: supa.client }));
    expect(result.html).toContain('https://cdn.test/audit-captures/flash/exemple-fr/capture-');
    expect(result.html).not.toContain('Votre score global');
    expect(result.html).not.toContain('/score-');
  });

  it("upload de la capture en échec : throw (le mail repose sur la capture)", async () => {
    const supa = fakeSupabase({ failCapture: true });
    await expect(runFlashAudit(INPUT, makeDeps({ supabase: supa.client }))).rejects.toThrow(/capture/i);
  });

  it('collecte en échec (site en 500) : throw, le workflow gérera', async () => {
    const fetch500: typeof fetch = (async () => new Response('erreur', { status: 500 })) as typeof fetch;
    await expect(runFlashAudit(INPUT, makeDeps({ fetchFn: fetch500 }))).rejects.toThrow(/500/);
  });
});
