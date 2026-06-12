import { describe, it, expect } from 'vitest';
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
  if (u.includes('/function')) return new Response(JSON.stringify([]), { status: 200 });
  if (u.includes('api.exa.ai/contents')) return new Response(JSON.stringify({ results: [{ summary: 'desc test' }] }), { status: 200 });
  if (u.includes('api.exa.ai/findSimilar')) return new Response(JSON.stringify({ results: [] }), { status: 200 });
  if (u.includes('api.exa.ai')) return new Response(JSON.stringify({ results: [] }), { status: 200 });
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
});
