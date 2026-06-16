import { describe, it, expect } from 'vitest';
import { crawlSite, aggregateCrawlMeasurements, type CrawledPage } from '../crawl';

/** HTML minimal d'une page interne, avec title + meta description valides. */
const pageHtml = (title: string): string =>
  `<html><head><title>${title}</title>
  <meta name="description" content="Description suffisamment longue pour le check : contenu factuel de la page, environ cent caracteres.">
  </head><body><h1>${title}</h1></body></html>`;

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://site.fr/contact</loc></url>
  <url><loc>https://site.fr/services</loc></url>
  <url><loc>https://site.fr/mentions-legales</loc></url>
</urlset>`;

/** Routeur de stub : sitemap déclaré dans robots.txt + pages internes. */
const sitemapFetch = (overrides: Record<string, Response | (() => Response)> = {}): typeof fetch =>
  (async (input: RequestInfo | URL) => {
    const u = String(input);
    const hit = Object.entries(overrides).find(([k]) => u === k || u.endsWith(k));
    if (hit) return typeof hit[1] === 'function' ? hit[1]() : hit[1].clone();
    if (u.endsWith('/robots.txt'))
      return new Response('User-agent: *\nSitemap: https://site.fr/sitemap.xml', { status: 200 });
    if (u.endsWith('/sitemap.xml')) return new Response(SITEMAP, { status: 200 });
    if (u.endsWith('/contact')) return new Response(pageHtml('Contact'), { status: 200 });
    if (u.endsWith('/services')) return new Response(pageHtml('Nos services'), { status: 200 });
    return new Response('not found', { status: 404 });
  }) as typeof fetch;

const noSleep = async (): Promise<void> => {};

describe('crawlSite — découverte via sitemap', () => {
  it('découvre les pages du sitemap déclaré dans robots.txt et exclut les pages légales', async () => {
    const result = await crawlSite('https://site.fr/', '<html></html>', {
      fetchFn: sitemapFetch(),
      sleepFn: noSleep,
    });
    expect(result.source).toBe('sitemap');
    expect(result.pages.map((p) => p.url)).toEqual(['https://site.fr/contact', 'https://site.fr/services']);
    expect(result.discoveredCount).toBe(2); // mentions-legales exclue avant le cap
    expect(result.pages[0].title).toBe('Contact');
    expect(result.pages[0].status).toBe(200);
  });

  it('préfixe les ids des measurements par page[<pathname>] et ajoute le pathname dans proof', async () => {
    const result = await crawlSite('https://site.fr/', '<html></html>', {
      fetchFn: sitemapFetch(),
      sleepFn: noSleep,
    });
    const contact = result.pages[0];
    const ids = contact.measurements.map((m) => m.id);
    expect(ids).toContain('page[/contact].seo.title.present');
    expect(ids).toContain('page[/contact].seo.meta-description.present');
    // unicité globale entre pages
    const allIds = result.pages.flatMap((p) => p.measurements.map((m) => m.id));
    expect(new Set(allIds).size).toBe(allIds.length);
    const title = contact.measurements.find((m) => m.id === 'page[/contact].seo.title.present');
    expect(title?.proof).toContain('/contact');
    expect(title?.status).toBe('pass');
  });

  it('suit un sitemap index (sous-sitemaps, max 3)', async () => {
    const index = `<?xml version="1.0"?><sitemapindex>
      <sitemap><loc>https://site.fr/sitemap-pages.xml</loc></sitemap>
      <sitemap><loc>https://site.fr/sitemap-blog.xml</loc></sitemap>
    </sitemapindex>`;
    const sub1 = '<urlset><url><loc>https://site.fr/contact</loc></url></urlset>';
    const sub2 = '<urlset><url><loc>https://site.fr/services</loc></url></urlset>';
    const result = await crawlSite('https://site.fr/', '<html></html>', {
      fetchFn: sitemapFetch({
        '/sitemap.xml': () => new Response(index, { status: 200 }),
        '/sitemap-pages.xml': () => new Response(sub1, { status: 200 }),
        '/sitemap-blog.xml': () => new Response(sub2, { status: 200 }),
      }),
      sleepFn: noSleep,
    });
    expect(result.source).toBe('sitemap');
    expect(result.pages.map((p) => p.url).sort()).toEqual(['https://site.fr/contact', 'https://site.fr/services']);
  });

  it('throttle : appelle sleepFn avant chaque fetch de page avec throttleMs', async () => {
    const calls: number[] = [];
    const result = await crawlSite('https://site.fr/', '<html></html>', {
      fetchFn: sitemapFetch(),
      throttleMs: 250,
      sleepFn: async (ms) => {
        calls.push(ms);
      },
    });
    expect(result.pages).toHaveLength(2);
    expect(calls).toEqual([250, 250]);
  });

  it('tolère une page en erreur (404) sans faire échouer le crawl', async () => {
    const result = await crawlSite('https://site.fr/', '<html></html>', {
      fetchFn: sitemapFetch({ '/contact': () => new Response('nope', { status: 404 }) }),
      sleepFn: noSleep,
    });
    const contact = result.pages.find((p) => p.url === 'https://site.fr/contact');
    expect(contact).toBeDefined();
    expect(contact?.status).toBe(404);
    expect(contact?.title).toBeNull();
    expect(contact?.measurements).toEqual([]);
    // l'autre page est analysée normalement
    const services = result.pages.find((p) => p.url === 'https://site.fr/services');
    expect(services?.measurements.length).toBeGreaterThan(0);
  });

  it('tolère une erreur réseau (status 0, measurements vides)', async () => {
    const result = await crawlSite('https://site.fr/', '<html></html>', {
      fetchFn: sitemapFetch({
        '/contact': () => {
          throw new Error('ECONNRESET');
        },
      }),
      sleepFn: noSleep,
    });
    const contact = result.pages.find((p) => p.url === 'https://site.fr/contact');
    expect(contact?.status).toBe(0);
    expect(contact?.measurements).toEqual([]);
  });

  it('cap maxPages : analyse au plus N pages, discoveredCount = total avant cap', async () => {
    const result = await crawlSite('https://site.fr/', '<html></html>', {
      fetchFn: sitemapFetch(),
      maxPages: 1,
      sleepFn: noSleep,
    });
    expect(result.pages).toHaveLength(1);
    expect(result.discoveredCount).toBe(2);
  });
});

describe('crawlSite — fallback liens internes', () => {
  const HOME = `<html><body>
    <a href="/contact">Contact</a>
    <a href="https://site.fr/services?utm=x">Services</a>
    <a href="/contact#form">Ancre dupliquée</a>
    <a href="/brochure.pdf">PDF exclu</a>
    <a href="https://externe.fr/page">Externe exclu</a>
    <a href="/cgv">Légal exclu</a>
    <a href="/">Homepage exclue</a>
  </body></html>`;

  const noSitemapFetch: typeof fetch = (async (input: RequestInfo | URL) => {
    const u = String(input);
    if (u.endsWith('/robots.txt')) return new Response('User-agent: *', { status: 200 });
    if (u.endsWith('/sitemap.xml')) return new Response('not found', { status: 404 });
    if (u.endsWith('/contact')) return new Response(pageHtml('Contact'), { status: 200 });
    if (u.endsWith('/services')) return new Response(pageHtml('Nos services'), { status: 200 });
    return new Response('not found', { status: 404 });
  }) as typeof fetch;

  it('sans sitemap exploitable, extrait les liens internes (même origine, dédup, sans fichiers/légal)', async () => {
    const result = await crawlSite('https://site.fr/', HOME, {
      fetchFn: noSitemapFetch,
      sleepFn: noSleep,
    });
    expect(result.source).toBe('links');
    expect(result.pages.map((p) => p.url).sort()).toEqual(['https://site.fr/contact', 'https://site.fr/services']);
    expect(result.discoveredCount).toBe(2);
  });

  it('exclut les fichiers machine (.md type /agents.md) même quand ils répondent 200', async () => {
    const home = `<html><body>
      <a href="/contact">Contact</a>
      <a href="/agents.md">Instructions agents IA</a>
    </body></html>`;
    const fetchFn: typeof fetch = (async (input: RequestInfo | URL) => {
      const u = String(input);
      if (u.endsWith('/robots.txt')) return new Response('User-agent: *', { status: 200 });
      if (u.endsWith('/sitemap.xml')) return new Response('not found', { status: 404 });
      if (u.endsWith('/contact')) return new Response(pageHtml('Contact'), { status: 200 });
      // fichier machine servi en 200 (cas réel friendiz.fr) : ne doit JAMAIS devenir une page auditée
      if (u.endsWith('/agents.md')) return new Response('# Agent Instructions', { status: 200 });
      return new Response('not found', { status: 404 });
    }) as typeof fetch;
    const result = await crawlSite('https://site.fr/', home, { fetchFn, sleepFn: noSleep });
    expect(result.pages.map((p) => p.url)).toEqual(['https://site.fr/contact']);
    expect(result.pages.some((p) => p.url.endsWith('.md'))).toBe(false);
  });
});

describe('aggregateCrawlMeasurements', () => {
  const page = (over: Partial<CrawledPage>): CrawledPage => ({
    url: 'https://site.fr/p',
    title: 'T',
    status: 200,
    measurements: [],
    ...over,
  });
  const metaPresent = (path: string, present: boolean): CrawledPage['measurements'][number] => ({
    id: `page[${path}].seo.meta-description.present`,
    module: 'seo-onpage',
    label: 'Meta description présente',
    status: present ? 'pass' : 'fail',
    value: present ? 'desc' : null,
  });

  it('détecte les titles dupliqués', () => {
    const ms = aggregateCrawlMeasurements([
      page({ url: 'https://site.fr/a', title: 'Même titre' }),
      page({ url: 'https://site.fr/b', title: 'Même titre' }),
      page({ url: 'https://site.fr/c', title: 'Unique' }),
    ]);
    const unique = ms.find((m) => m.id === 'crawl.titles.unique');
    expect(unique?.status).toBe('fail');
    expect(unique?.details).toContain('Même titre');
    expect(unique?.module).toBe('seo-onpage');
  });

  it('passe quand tous les titles non-null sont uniques', () => {
    const ms = aggregateCrawlMeasurements([
      page({ title: 'A' }),
      page({ title: 'B' }),
      page({ title: null, status: 404 }),
    ]);
    expect(ms.find((m) => m.id === 'crawl.titles.unique')?.status).toBe('pass');
  });

  it('compte les pages en erreur', () => {
    const ms = aggregateCrawlMeasurements([page({}), page({ url: 'https://site.fr/404', status: 404, title: null })]);
    const errors = ms.find((m) => m.id === 'crawl.pages.errors');
    expect(errors?.status).toBe('fail');
    expect(errors?.value).toBe(1);
    const ok = aggregateCrawlMeasurements([page({})]).find((m) => m.id === 'crawl.pages.errors');
    expect(ok?.status).toBe('pass');
    expect(ok?.value).toBe(0);
  });

  it('compte les pages sans meta description', () => {
    const ms = aggregateCrawlMeasurements([
      page({ url: 'https://site.fr/a', measurements: [metaPresent('/a', true)] }),
      page({ url: 'https://site.fr/b', measurements: [metaPresent('/b', false)] }),
    ]);
    const missing = ms.find((m) => m.id === 'crawl.meta-descriptions.missing');
    expect(missing?.status).toBe('fail');
    expect(missing?.value).toBe(1);
  });
});
