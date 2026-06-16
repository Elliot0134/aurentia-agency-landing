import { describe, it, expect, vi, afterEach } from 'vitest';
import { collectAudit, type CollectDeps } from '../collect';

const HTML = `<html><head>
  <title>Conciergerie Marseille | Gestion Airbnb clé en main et sereine</title>
  <meta name="description" content="Gestion complète de votre location courte durée à Marseille : annonces, accueil voyageurs, ménage professionnel. Estimation gratuite en 2 minutes.">
  <meta name="viewport" content="width=device-width">
  <link rel="canonical" href="https://exemple.fr/">
  <meta property="og:title" content="X"><meta property="og:image" content="/og.png">
  <script type="application/ld+json">{"@type":"LocalBusiness"}</script>
  </head><body><h1>Conciergerie à Marseille</h1>
  <p>Marseille Marseille Marseille Marseille</p>
  <footer>1 rue X, 13001 Marseille — 04 91 00 00 00</footer>
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

/** fetch stub global du test : route par motif d'URL. */
const fakeFetch: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const u = String(input);
  if (u.includes('pagespeedonline')) return new Response(PSI_FIXTURE, { status: 200 });
  if (u.includes('/screenshot')) return new Response(new Uint8Array([1]), { status: 200 });
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
  if (u.includes('api.exa.ai/contents')) return new Response(JSON.stringify({ results: [{ summary: 'desc test' }] }), { status: 200 });
  if (u.includes('api.exa.ai/findSimilar')) return new Response(JSON.stringify({ results: [] }), { status: 200 });
  if (u.includes('api.exa.ai/search'))
    // mentions externes : 3 résultats dont 1 du domaine audité → 2 externes
    return new Response(
      JSON.stringify({
        results: [
          { url: 'https://exemple.fr/page' },
          { url: 'https://annuaire.fr/exemple' },
          { url: 'https://blog-local.fr/exemple' },
        ],
      }),
      { status: 200 },
    );
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

const deps: CollectDeps = {
  fetchFn: fakeFetch,
  resolver: { resolve4: async () => ['1.2.3.4'], resolve6: async () => [] },
  psiApiKey: 'PSI',
  browserless: { token: 'BL' },
  exaApiKey: 'EXA',
  outDir: null, // pas d'écriture disque en test
  // stub : pas d'appel LLM réseau. National → route findSimilar (stub renvoie []).
  classifyFn: async () => ({ isLocal: false, geoQuery: null }),
  // pas d'attente réelle entre les fetches du crawl en test
  crawlOpts: { sleepFn: async () => {} },
};

describe('collectAudit', () => {
  it('flash : produit un AuditData complet sans concurrents ni impact', async () => {
    const audit = await collectAudit('exemple.fr', 'flash', deps);
    expect(audit.tier).toBe('flash');
    expect(audit.description).toBe('desc test');
    expect(audit.business.type).toBe('local');
    expect(audit.measurements.length).toBeGreaterThan(10);
    expect(audit.competitors).toEqual([]);
    expect(audit.impact).toBeNull();
    expect(audit.crawl).toBeNull(); // crawl multi-pages réservé au pro
    // desktop PSI tourne désormais aussi en flash (pas seulement en pro)
    expect(audit.measurements.some((m) => m.id === 'perf.desktop.score')).toBe(true);
    expect(audit.measurements.some((m) => m.id === 'perf.mobile.score')).toBe(true);
    // toutes les measurements ont un id unique
    const ids = audit.measurements.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('flash : keepScreenshotBuffer conserve le PNG full-page en mémoire (jamais par défaut)', async () => {
    const withBuffer = await collectAudit('exemple.fr', 'flash', { ...deps, keepScreenshotBuffer: true });
    expect(withBuffer.screenshotBuffer).toBeInstanceOf(Buffer);
    const without = await collectAudit('exemple.fr', 'flash', deps);
    expect(without.screenshotBuffer).toBeUndefined();
  });

  it("pro : inclut l'estimation d'impact", async () => {
    const audit = await collectAudit('exemple.fr', 'pro', deps);
    expect(audit.impact).not.toBeNull();
    expect(audit.impact!.items.some((i) => i.id === 'impact.lcp')).toBe(true);
  });

  it('pro : crawle les pages du sitemap et fusionne leurs measurements', async () => {
    const audit = await collectAudit('exemple.fr', 'pro', deps);
    expect(audit.crawl).not.toBeNull();
    expect(audit.crawl!.analyzedPages).toBe(3); // homepage + /contact + /services
    expect(audit.crawl!.discoveredCount).toBe(2);
    expect(audit.crawl!.pages.map((p) => p.url)).toEqual([
      'https://exemple.fr/contact',
      'https://exemple.fr/services',
    ]);
    // measurements des pages crawlées fusionnées, ids préfixés
    expect(audit.measurements.some((m) => m.id === 'page[/contact].seo.title.present')).toBe(true);
    // agrégats globaux du crawl présents
    expect(audit.measurements.some((m) => m.id === 'crawl.titles.unique')).toBe(true);
    expect(audit.measurements.some((m) => m.id === 'crawl.pages.errors')).toBe(true);
    expect(audit.measurements.some((m) => m.id === 'crawl.meta-descriptions.missing')).toBe(true);
    // unicité globale des ids préservée
    const ids = audit.measurements.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe('AI Readiness', () => {
    it('pro : inclut les measurements ai.* (llms.txt, robots IA, schema, citabilité, mentions)', async () => {
      const audit = await collectAudit('exemple.fr', 'pro', deps);
      const ai = audit.measurements.filter((m) => m.module === 'ai-readiness');
      expect(ai.length).toBeGreaterThanOrEqual(6);
      expect(ai.every((m) => m.id.startsWith('ai.'))).toBe(true);
      // llms.txt servi en texte par le stub → pass
      expect(audit.measurements.find((m) => m.id === 'ai.llms-txt')!.status).toBe('pass');
      // robots.txt du stub ne bloque aucun agent IA → pass
      const robots = audit.measurements.find((m) => m.id === 'ai.robots.ai-agents')!;
      expect(robots.status).toBe('pass');
      expect(robots.value).toBe('aucun blocage');
      // mentions : 3 résultats Exa dont 1 du domaine audité → 2 externes → warn
      const mentions = audit.measurements.find((m) => m.id === 'ai.mentions.external')!;
      expect(mentions.value).toBe(2);
      expect(mentions.status).toBe('warn');
    });

    it('flash : inclut désormais l\'AI Readiness (GEO sur la homepage)', async () => {
      const audit = await collectAudit('exemple.fr', 'flash', deps);
      const ai = audit.measurements.filter((m) => m.module === 'ai-readiness');
      expect(ai.length).toBeGreaterThanOrEqual(6);
      expect(audit.measurements.find((m) => m.id === 'ai.llms-txt')!.status).toBe('pass');
      expect(audit.measurements.find((m) => m.id === 'ai.robots.ai-agents')!.status).toBe('pass');
    });
  });

  describe('Local SEO', () => {
    it('pro + business local : measurements local.* présents (module local-seo)', async () => {
      const audit = await collectAudit('exemple.fr', 'pro', deps);
      expect(audit.business.type).toBe('local');
      const local = audit.measurements.filter((m) => m.module === 'local-seo');
      expect(local.length).toBeGreaterThanOrEqual(7);
      expect(local.every((m) => m.id.startsWith('local.'))).toBe(true);
      // fixture : téléphone visible, adresse uniquement en footer, schema LocalBusiness présent
      expect(audit.measurements.find((m) => m.id === 'local.nap.phone')!.status).toBe('pass');
      expect(audit.measurements.find((m) => m.id === 'local.nap.address')!.status).toBe('warn');
      expect(audit.measurements.find((m) => m.id === 'local.schema.localbusiness')!.status).toBe('pass');
      // GBP/avis/citations : jamais scorés automatiquement, ligne info pour la relecture
      const gbp = audit.measurements.find((m) => m.id === 'local.gbp.unverified')!;
      expect(gbp.status).toBe('info');
      expect(gbp.value).toBeNull();
    });

    it('flash : pas de Local SEO', async () => {
      const audit = await collectAudit('exemple.fr', 'flash', deps);
      expect(audit.measurements.some((m) => m.module === 'local-seo')).toBe(false);
    });
  });

  describe('accessibilité (axe-core)', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it("pro : audite l'accessibilité (homepage + 2 pages crawlées) et fusionne les measurements a11y", async () => {
      const audit = await collectAudit('exemple.fr', 'pro', deps);
      const total = audit.measurements.find((m) => m.id === 'a11y.violations.total');
      expect(total).toBeDefined();
      expect(total!.module).toBe('a11y');
      expect(total!.status).toBe('fail'); // serious présent dans le stub
      expect(total!.value).toBe(3); // 1 violation x 3 pages (homepage + /contact + /services)
      const contrast = audit.measurements.find((m) => m.id === 'a11y.color-contrast');
      expect(contrast).toBeDefined();
      expect(contrast!.value).toBe(15); // 5 nodes x 3 pages
      expect(contrast!.proof).toContain('/contact');
      expect(contrast!.proof).toContain('/services');
    });

    it("flash : pas d'audit d'accessibilité", async () => {
      const audit = await collectAudit('exemple.fr', 'flash', deps);
      expect(audit.measurements.some((m) => m.module === 'a11y')).toBe(false);
    });

    it("pro : toutes les pages axe échouent → a11y.unavailable info, jamais de faux conforme", async () => {
      vi.useFakeTimers();
      const axeFailFetch: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
        const u = String(input);
        if (u.includes('/function') && String(init?.body ?? '').includes('axe.min.js'))
          return new Response('boom', { status: 500 });
        return fakeFetch(input, init);
      }) as typeof fetch;
      const promise = collectAudit('exemple.fr', 'pro', { ...deps, fetchFn: axeFailFetch });
      await vi.runAllTimersAsync();
      const audit = await promise;
      const unavailable = audit.measurements.find((m) => m.id === 'a11y.unavailable');
      expect(unavailable).toBeDefined();
      expect(unavailable!.status).toBe('info');
      expect(unavailable!.details).toContain('indisponible');
      // aucun autre measurement a11y : pas de fausse conformité
      expect(audit.measurements.filter((m) => m.module === 'a11y')).toHaveLength(1);
    });
  });
});
