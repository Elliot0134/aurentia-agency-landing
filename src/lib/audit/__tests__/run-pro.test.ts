import { describe, it, expect, vi, afterEach } from 'vitest';
import { runProAudit, type RunProDeps } from '../run-pro';
import type { AuditStorageClient } from '../run-flash';
import type { ProReportContent } from '../render/report-schema';

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

/** HTML d'une page interne crawlée (titre + meta desc propres à la page). */
const pageHtml = (title: string) => `<html><head><title>${title}</title>
  <meta name="description" content="Description de la page ${title}, assez longue pour les checks on-page du crawl multi-pages.">
  </head><body><h1>${title}</h1></body></html>`;

const SITEMAP = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://exemple.fr/contact</loc></url>
  <url><loc>https://exemple.fr/services</loc></url>
</urlset>`;

const PDF_BODY = Buffer.concat([Buffer.from('%PDF-1.4'), Buffer.from([0x00, 0x01, 0x02])]);

/** fetch stub routeur pro (motif de collect.test.ts) + /pdf Browserless : zéro réseau. */
const fakeFetch: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const u = String(input);
  if (u.includes('pagespeedonline')) return new Response(PSI_FIXTURE, { status: 200 });
  if (u.includes('/screenshot')) return new Response(new Uint8Array([1]), { status: 200 });
  if (u.includes('/pdf')) return new Response(new Uint8Array(PDF_BODY), { status: 200 });
  if (u.includes('/function')) {
    // deux appels /function distincts : axe (le code injecté charge axe.min.js) vs getImageRects
    if (String(init?.body ?? '').includes('axe.min.js'))
      return new Response(
        JSON.stringify({
          data: { violations: [{ id: 'color-contrast', impact: 'serious', description: 'Contraste insuffisant', nodes: 5 }] },
        }),
        { status: 200 },
      );
    return new Response(JSON.stringify([]), { status: 200 });
  }
  if (u.includes('api.exa.ai/contents'))
    return new Response(JSON.stringify({ results: [{ summary: 'desc test' }] }), { status: 200 });
  if (u.includes('api.exa.ai')) return new Response(JSON.stringify({ results: [] }), { status: 200 });
  if (u.endsWith('/llms.txt')) return new Response('# Exemple\nConciergerie à Marseille.', { status: 200 });
  if (u.endsWith('/robots.txt'))
    return new Response('User-agent: *\nSitemap: https://exemple.fr/sitemap.xml', { status: 200 });
  if (u.endsWith('/sitemap.xml')) return new Response(SITEMAP, { status: 200 });
  if (u.endsWith('/contact')) return new Response(pageHtml('Contact'), { status: 200 });
  if (u.endsWith('/services')) return new Response(pageHtml('Nos services'), { status: 200 });
  if (init?.method === 'HEAD') return new Response(null, { status: 200 });
  return new Response(HTML, { status: 200 });
}) as typeof fetch;

/**
 * Contenu Pro valide sous le contrat de véracité : les measurementIds référencent
 * des mesures réellement produites par la collecte stubée (PSI fixture).
 */
const stubProContent = (): ProReportContent => ({
  execSummary: 'Votre site perd une partie de ses visiteurs mobiles avant de montrer votre offre.',
  recommendation: 'optimisations',
  findings: [
    {
      title: 'Chargement mobile trop lent',
      body: 'Vos visiteurs attendent plusieurs secondes avant de voir le contenu principal sur mobile, ce qui en fait partir une partie avant même de découvrir votre offre. Corriger le chargement raccourcit ce délai.',
      priority: 'P0',
      measurementIds: ['perf.mobile.lcp'],
    },
  ],
  competitorAnalysis: null,
  scoreJustification: 'Le score reflète une performance mobile faible malgré un balisage SEO correct.',
  auditTable: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => ({
    category: 'PERFORMANCE & TECHNIQUE' as const,
    domain: i === 1 ? 'Navigation mobile distinctive' : `Domaine ${i}`,
    finding: 'Le contenu principal met plusieurs secondes à apparaitre sur mobile.',
    impact: 'Une partie des visiteurs mobiles partent avant de voir votre offre.',
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
  funnelAnalysis: 'Sur 100 visiteurs, une part importante part avant que le contenu principal ne soit affiché.',
  funnelProjection: 'Après correction, la perte estimée diminue nettement sur 100 visiteurs, estimation prudente.',
  recommendationSummary:
    'Le site perd une partie de ses visiteurs mobiles avant la prise de contact. Nous recommandons des optimisations axées performance en priorité.',
  aiVisibilityAnalysis:
    'Votre site reste peu lisible pour les moteurs de réponse comme ChatGPT ou Perplexity. Structurer des passages factuels citables et relier vos profils externes ouvre un canal de découverte en forte croissance.',
});

interface RecordedUpload {
  bucket: string;
  path: string;
  contentType?: string;
  upsert?: boolean;
  body: Buffer;
}

interface FakeStorage {
  uploads: RecordedUpload[];
  publicUrlCalls: () => number;
  client: AuditStorageClient;
}

/** Client Supabase FAKE structurel : enregistre les uploads, compte les getPublicUrl. */
function fakeStorage(opts: { failUpload?: boolean } = {}): FakeStorage {
  const uploads: RecordedUpload[] = [];
  let publicUrlCalls = 0;
  const client: AuditStorageClient = {
    storage: {
      from: (bucketId: string) => ({
        upload: async (path: string, body: Buffer, options?: { contentType?: string; upsert?: boolean }) => {
          if (opts.failUpload) return { error: { message: 'bucket indisponible' } };
          uploads.push({ bucket: bucketId, path, contentType: options?.contentType, upsert: options?.upsert, body });
          return { error: null };
        },
        getPublicUrl: (path: string) => {
          publicUrlCalls += 1;
          return { data: { publicUrl: `https://cdn.test/${bucketId}/${path}` } };
        },
      }),
    },
  };
  return { uploads, publicUrlCalls: () => publicUrlCalls, client };
}

function makeDeps(overrides: Partial<RunProDeps> = {}): RunProDeps {
  return {
    psiApiKey: 'PSI',
    browserless: { token: 'BL' },
    exaApiKey: 'EXA',
    supabase: fakeStorage().client,
    fetchFn: fakeFetch,
    resolver: { resolve4: async () => ['1.2.3.4'], resolve6: async () => [] },
    generateProFn: async () => stubProContent(),
    classifyFn: async () => ({ isLocal: false, geoQuery: null }),
    buildVisualsFn: async () => [],
    crawlOpts: { sleepFn: async () => {} },
    ...overrides,
  };
}

const INPUT = { url: 'exemple.fr', email: 'prospect@exemple.fr', jobId: 'job-123' };

describe('runProAudit', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('nominal : PDF uploadé dans le bucket privé audit-pdfs sous pro/<jobId>/audit.pdf', async () => {
    const storage = fakeStorage();
    const result = await runProAudit(INPUT, makeDeps({ supabase: storage.client }));

    expect(result.pdfPath).toBe('pro/job-123/audit.pdf');

    // Un seul upload : le PDF, dans le bon bucket, au bon chemin, en application/pdf upsert
    expect(storage.uploads).toHaveLength(1);
    const upload = storage.uploads[0];
    expect(upload.bucket).toBe('audit-pdfs');
    expect(upload.path).toBe('pro/job-123/audit.pdf');
    expect(upload.contentType).toBe('application/pdf');
    expect(upload.upsert).toBe(true);
    expect(upload.body.subarray(0, 4).toString('latin1')).toBe('%PDF');

    // Bucket PRIVÉ : aucune URL publique générée (les URLs signées viendront de la review T6)
    expect(storage.publicUrlCalls()).toBe(0);

    // Score réel + impact pro (LCP 4,2 s mesuré → perte estimée) + traçabilité du rédacteur
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.impactPercent).not.toBeNull();
    expect(result.impactPercent).toBeGreaterThan(0);
    expect(result.writerModel).toMatch(/^openrouter:/);
  });

  it('échec du rendu (Browserless /pdf en 500 après retries) : throw, rien uploadé', async () => {
    vi.useFakeTimers();
    const pdfFail: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input).includes('/pdf')) return new Response('boom', { status: 500 });
      return fakeFetch(input, init);
    }) as typeof fetch;
    const storage = fakeStorage();

    const promise = runProAudit(INPUT, makeDeps({ fetchFn: pdfFail, supabase: storage.client }));
    const expectation = expect(promise).rejects.toThrow(/pdf/i);
    await vi.runAllTimersAsync();
    await expectation;
    expect(storage.uploads).toHaveLength(0);
  });

  it("échec de l'upload du PDF : throw (livrable payé, aucune dégradation silencieuse)", async () => {
    const storage = fakeStorage({ failUpload: true });
    await expect(runProAudit(INPUT, makeDeps({ supabase: storage.client }))).rejects.toThrow(
      /bucket indisponible/,
    );
  });
});
