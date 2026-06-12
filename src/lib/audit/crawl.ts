import * as cheerio from 'cheerio';
import type { Measurement } from './types';
import { fetchPage } from './fetch-page';
import { checkOnPage } from './checks-onpage';

export interface CrawledPage {
  url: string;
  title: string | null;
  status: number; // 0 = erreur réseau (pas de réponse HTTP)
  measurements: Measurement[]; // checks on-page de cette page (ids préfixés page[<pathname>].)
}

export interface CrawlResult {
  pages: CrawledPage[]; // homepage EXCLUE (déjà analysée par collect)
  discoveredCount: number; // total d'URLs internes retenues (après filtrage, avant cap)
  source: 'sitemap' | 'links';
}

export interface CrawlOptions {
  fetchFn?: typeof fetch;
  maxPages?: number; // défaut 9 (homepage + 9 = 10 pages analysées)
  throttleMs?: number; // défaut 1000 : espace les requêtes vers le même site (anti-bot hébergeurs)
  sleepFn?: (ms: number) => Promise<void>; // injectable en test pour éviter l'attente réelle
}

/** Extensions de fichiers sans valeur d'audit on-page. */
const FILE_EXTENSION = /\.(pdf|jpe?g|png|gif|webp|avif|svg|ico|zip|rar|docx?|xlsx?|pptx?|mp[34]|webm|css|js|json|xml|txt)$/i;

/** Pages légales : aucune valeur d'audit, exclues du crawl. */
const LEGAL_PATTERNS = [
  /mentions?-l[eé]gales?/i,
  /politique-(de-)?confidentialit/i,
  /conditions-g[eé]n[eé]rales/i,
  /(^|\/)cg(vu|v|u)(\/|$)/i,
];

const MAX_SUB_SITEMAPS = 3;
const FETCH_TIMEOUT_MS = 10_000;

const defaultSleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Pathname normalisé : sans trailing slash (sauf racine). */
function normalizePath(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function isLegalPath(pathname: string): boolean {
  return LEGAL_PATTERNS.some((re) => re.test(pathname));
}

/** Texte d'une URL distante, null si erreur réseau ou status non-2xx. */
async function fetchText(url: string, fetchFn: typeof fetch): Promise<string | null> {
  try {
    const res = await fetchFn(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** Première URL de sitemap déclarée dans robots.txt, null sinon. */
function sitemapUrlFromRobots(robotsTxt: string): string | null {
  const match = robotsTxt.match(/^sitemap:\s*(\S+)/im);
  return match ? match[1] : null;
}

/** Les <loc> d'un urlset. Si sitemap index : suit les sous-sitemaps (max 3). */
async function fetchSitemapLocs(sitemapUrl: string, fetchFn: typeof fetch): Promise<string[]> {
  const xml = await fetchText(sitemapUrl, fetchFn);
  if (xml === null) return [];
  const $ = cheerio.load(xml, { xmlMode: true });

  if ($('sitemapindex').length > 0) {
    const subUrls = $('sitemap > loc')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter((u) => u.length > 0)
      .slice(0, MAX_SUB_SITEMAPS);
    const locs: string[] = [];
    for (const subUrl of subUrls) {
      const subXml = await fetchText(subUrl, fetchFn);
      if (subXml === null) continue;
      const sub$ = cheerio.load(subXml, { xmlMode: true });
      locs.push(...sub$('url > loc').map((_, el) => sub$(el).text().trim()).get());
    }
    return locs.filter((l) => l.length > 0);
  }

  return $('url > loc')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((l) => l.length > 0);
}

/** Découverte via sitemap (robots.txt puis /sitemap.xml). Null si rien d'exploitable. */
async function discoverFromSitemap(origin: string, fetchFn: typeof fetch): Promise<string[] | null> {
  const robotsTxt = await fetchText(`${origin}/robots.txt`, fetchFn);
  const declared = robotsTxt !== null ? sitemapUrlFromRobots(robotsTxt) : null;
  const sitemapUrl = declared ?? `${origin}/sitemap.xml`;
  const locs = await fetchSitemapLocs(sitemapUrl, fetchFn);
  return locs.length > 0 ? locs : null;
}

/** Hrefs des <a> du HTML homepage, résolus en URLs absolues. */
function discoverFromLinks(homepageUrl: string, html: string): string[] {
  const $ = cheerio.load(html);
  const hrefs: string[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) hrefs.push(href);
  });
  const urls: string[] = [];
  for (const href of hrefs) {
    try {
      urls.push(new URL(href, homepageUrl).href);
    } catch {
      // href invalide : ignoré
    }
  }
  return urls;
}

/** Même origine, hors homepage/légal/fichiers, dédup par pathname normalisé. */
function filterInternal(candidates: string[], homepage: URL): URL[] {
  const homePath = normalizePath(homepage.pathname);
  const seen = new Set<string>();
  const out: URL[] = [];
  for (const candidate of candidates) {
    let u: URL;
    try {
      u = new URL(candidate, homepage.href);
    } catch {
      continue;
    }
    if (u.origin !== homepage.origin) continue;
    u.hash = '';
    u.search = '';
    const pathname = normalizePath(u.pathname);
    if (pathname === homePath) continue;
    if (FILE_EXTENSION.test(pathname)) continue;
    if (isLegalPath(pathname)) continue;
    if (seen.has(pathname)) continue;
    seen.add(pathname);
    u.pathname = pathname;
    out.push(u);
  }
  return out;
}

/** Fetch + checks on-page d'une page interne. Erreur tolérée : measurements vides. */
async function analyzePage(pageUrl: URL, fetchFn: typeof fetch): Promise<CrawledPage> {
  const pathname = pageUrl.pathname;
  try {
    const page = await fetchPage(pageUrl.href, fetchFn);
    if (page.status >= 400) {
      return { url: pageUrl.href, title: null, status: page.status, measurements: [] };
    }
    const title = page.$('head title').first().text().trim() || null;
    const measurements = checkOnPage(page.$, page.finalUrl).map((m) => ({
      ...m,
      id: `page[${pathname}].${m.id}`,
      proof: m.proof ? `${m.proof} [page ${pathname}]` : `page ${pathname}`,
    }));
    return { url: pageUrl.href, title, status: page.status, measurements };
  } catch {
    return { url: pageUrl.href, title: null, status: 0, measurements: [] };
  }
}

/**
 * Découvre les pages internes d'un site (sitemap, sinon liens internes de la
 * homepage) et analyse les checks on-page de chacune. La homepage est exclue :
 * elle est déjà analysée par collect. Chaque fetch de page est espacé de
 * throttleMs (anti-bot : certains hébergeurs renvoient 429 en rafale).
 */
export async function crawlSite(
  homepageUrl: string,
  homepageHtml: string,
  opts: CrawlOptions = {},
): Promise<CrawlResult> {
  const fetchFn = opts.fetchFn ?? fetch;
  const maxPages = opts.maxPages ?? 9;
  const throttleMs = opts.throttleMs ?? 1000;
  const sleep = opts.sleepFn ?? defaultSleep;
  const homepage = new URL(homepageUrl);

  let source: CrawlResult['source'] = 'sitemap';
  let candidates = await discoverFromSitemap(homepage.origin, fetchFn);
  if (candidates === null) {
    source = 'links';
    candidates = discoverFromLinks(homepage.href, homepageHtml);
  }

  const internal = filterInternal(candidates, homepage);
  const discoveredCount = internal.length;

  const pages: CrawledPage[] = [];
  for (const pageUrl of internal.slice(0, maxPages)) {
    await sleep(throttleMs);
    pages.push(await analyzePage(pageUrl, fetchFn));
  }

  return { pages, discoveredCount, source };
}

/**
 * Mesures GLOBALES dérivées du crawl (module seo-onpage) : unicité des titles,
 * pages en erreur, meta descriptions manquantes. Fusionnées dans
 * audit.measurements en pro.
 */
export function aggregateCrawlMeasurements(pages: CrawledPage[]): Measurement[] {
  const proof = `${pages.length} pages internes crawlées`;

  // Titles dupliqués (parmi les titles non-null)
  const titleCounts = new Map<string, number>();
  for (const page of pages) {
    if (page.title !== null) titleCounts.set(page.title, (titleCounts.get(page.title) ?? 0) + 1);
  }
  const duplicates = [...titleCounts.entries()].filter(([, n]) => n > 1).map(([t]) => t);

  // Pages en erreur (HTTP >= 400 ou erreur réseau)
  const errorPages = pages.filter((p) => p.status >= 400 || p.status === 0);

  // Pages sans meta description (d'après le check on-page de chaque page)
  const missingMeta = pages.filter((p) =>
    p.measurements.some((m) => m.id.endsWith('.seo.meta-description.present') && m.status === 'fail'),
  );

  return [
    {
      id: 'crawl.titles.unique',
      module: 'seo-onpage',
      label: 'Titres <title> uniques sur les pages internes',
      status: duplicates.length === 0 ? 'pass' : 'fail',
      value: duplicates.length === 0,
      proof,
      details:
        duplicates.length > 0
          ? `Titres dupliqués : ${duplicates.map((t) => `"${t}"`).join(', ')}`
          : undefined,
    },
    {
      id: 'crawl.pages.errors',
      module: 'seo-onpage',
      label: 'Pages internes en erreur',
      status: errorPages.length === 0 ? 'pass' : 'fail',
      value: errorPages.length,
      unit: 'pages',
      proof,
      details:
        errorPages.length > 0
          ? errorPages.map((p) => `${p.url} (HTTP ${p.status})`).join(', ')
          : undefined,
    },
    {
      id: 'crawl.meta-descriptions.missing',
      module: 'seo-onpage',
      label: 'Pages internes sans meta description',
      status: missingMeta.length === 0 ? 'pass' : 'fail',
      value: missingMeta.length,
      unit: 'pages',
      proof,
      details:
        missingMeta.length > 0 ? missingMeta.map((p) => p.url).join(', ') : undefined,
    },
  ];
}
