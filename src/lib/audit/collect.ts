import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { AuditData, Tier } from './types';
import { assertSafeUrl, type DnsResolver } from './url-safety';
import { fetchPage } from './fetch-page';
import { checkOnPage } from './checks-onpage';
import { checkTech } from './checks-tech';
import { checkImages } from './checks-images';
import { runPsi, psiToMeasurements } from './psi';
import { captureScreenshot, getImageRects, type BrowserlessConfig } from './screenshot';
import { buildScreenshotAnnotations } from './screenshot-annotations';
import { detectBusinessType } from './business-type';
import {
  searchCompetitorsByQuery,
  findSimilarCompetitors,
  describeSite,
  auditCompetitors,
  classifyBusinessScope,
  type ScopeClassifyFn,
} from './competitors';
import { estimateImpact } from './impact';
import { crawlSite, aggregateCrawlMeasurements, type CrawlOptions } from './crawl';
import { runAxe, a11yToMeasurements, type A11yPageResult } from './a11y';
import { checkAiReadiness } from './ai-readiness';

export interface CollectDeps {
  fetchFn?: typeof fetch;
  resolver?: DnsResolver;
  psiApiKey: string;
  browserless: BrowserlessConfig;
  exaApiKey: string;
  /** Dossier d'écriture du screenshot. null = pas d'écriture (tests). */
  outDir: string | null;
  /**
   * Stub de classification du scope (local/national), injecté en test pour
   * éviter l'appel réseau LLM. Absent en prod → vrai appel OpenRouter.
   */
  classifyFn?: ScopeClassifyFn;
  /** Options du crawl multi-pages (pro). Injectable en test (sleepFn, maxPages). */
  crawlOpts?: Pick<CrawlOptions, 'maxPages' | 'throttleMs' | 'sleepFn'>;
}

export async function collectAudit(rawUrl: string, tier: Tier, deps: CollectDeps): Promise<AuditData> {
  const fetchFn = deps.fetchFn ?? fetch;

  // 1. Sécurité
  const url = await assertSafeUrl(rawUrl, deps.resolver);

  // 2. Page principale
  const page = await fetchPage(url.href, fetchFn);
  if (page.status >= 400) {
    throw new Error(`Le site répond ${page.status} : audit impossible`);
  }

  // 3. Checks déterministes
  const measurements = [
    ...checkOnPage(page.$, page.finalUrl),
    ...(await checkTech(page.$, page.finalUrl, fetchFn)),
    ...(await checkImages(page.$, page.finalUrl, fetchFn)),
  ];

  // 4. Performance : mobile ET desktop, en flash comme en pro.
  const psiMobile = await runPsi(page.finalUrl, 'mobile', deps.psiApiKey, fetchFn);
  measurements.push(...psiToMeasurements(psiMobile));
  const psiDesktop = await runPsi(page.finalUrl, 'desktop', deps.psiApiKey, fetchFn);
  measurements.push(...psiToMeasurements(psiDesktop));

  // 5. Détection business
  const business = detectBusinessType(page.$);

  // 6. Screenshot + annotations prouvables
  let screenshotPath: string | null = null;
  const png = await captureScreenshot(page.finalUrl, deps.browserless, fetchFn);
  const rects = await getImageRects(page.finalUrl, deps.browserless, fetchFn);
  if (deps.outDir) {
    await mkdir(deps.outDir, { recursive: true });
    screenshotPath = path.join(deps.outDir, 'fullpage.png');
    await writeFile(screenshotPath, png);
  }
  const annotations = buildScreenshotAnnotations(measurements, rects);

  // 7. Description du site (contexte secteur via Exa) : enrichit la rédaction.
  const description = await describeSite(page.finalUrl, deps.exaApiKey, fetchFn);

  // 8. Concurrents : benchmark perf/SEO, calculé pour flash ET pro (valeur
  // ajoutée du gratuit). Les fonctions avalent les concurrents injoignables,
  // donc une erreur réseau ne fait pas planter l'audit. Stratégie scope-aware :
  // une classification LLM décide à partir de la description Exa si le business
  // est local-physique (recherche géo) ou national/en ligne (findSimilar).
  const domain = new URL(page.finalUrl).hostname;
  const scope = await classifyBusinessScope(description, business.city, {
    classifyFn: deps.classifyFn,
  });
  const competitorUrls =
    scope.isLocal && scope.geoQuery
      ? await searchCompetitorsByQuery(scope.geoQuery, domain, deps.exaApiKey, fetchFn)
      : await findSimilarCompetitors(page.finalUrl, domain, deps.exaApiKey, fetchFn);
  const competitors: AuditData['competitors'] = await auditCompetitors(
    competitorUrls,
    deps.psiApiKey,
    fetchFn,
  );

  // 9. Pro : crawl multi-pages (sitemap/liens internes) + estimation d'impact.
  // Les measurements des pages crawlées (ids préfixés page[<pathname>].) et les
  // agrégats sont fusionnés dans le même tableau ; seul le résumé va dans crawl.
  let impact: AuditData['impact'] = null;
  let crawl: AuditData['crawl'] = null;
  if (tier === 'pro') {
    const crawlResult = await crawlSite(page.finalUrl, page.html, { fetchFn, ...deps.crawlOpts });
    for (const crawled of crawlResult.pages) {
      measurements.push(...crawled.measurements);
    }
    measurements.push(...aggregateCrawlMeasurements(crawlResult.pages));
    crawl = {
      analyzedPages: crawlResult.pages.length + 1, // + homepage
      discoveredCount: crawlResult.discoveredCount,
      pages: crawlResult.pages.map(({ url, title, status }) => ({ url, title, status })),
    };

    // Accessibilité réelle (axe-core, WCAG 2.2 AA) : homepage + jusqu'à 2 pages
    // crawlées en 200, séquentiel (Browserless free tier mono-session). Une page
    // qui échoue est sautée ; si TOUTES échouent → a11y.unavailable (info), car
    // un échec d'outil ne doit jamais passer pour une conformité.
    const axeTargets = [
      page.finalUrl,
      ...crawlResult.pages.filter((p) => p.status === 200).slice(0, 2).map((p) => p.url),
    ];
    const axeResults: A11yPageResult[] = [];
    for (const target of axeTargets) {
      try {
        axeResults.push(await runAxe(target, deps.browserless, fetchFn));
      } catch {
        // page sautée (échec définitif après retries) : aucune fausse donnée
      }
    }
    if (axeResults.length > 0) {
      measurements.push(...a11yToMeasurements(axeResults));
    } else {
      measurements.push({
        id: 'a11y.unavailable',
        module: 'a11y',
        label: "Audit d'accessibilité (axe-core)",
        status: 'info',
        value: null,
        details: "Audit d'accessibilité indisponible pendant la génération, à vérifier en relecture",
      });
    }

    // AI Readiness : visibilité auprès des moteurs IA (llms.txt, robots IA,
    // schema, citabilité, mentions Exa). checkTech ne retourne pas le contenu
    // du robots.txt, donc on le refetch ici (GET simple, déjà en cache serveur).
    let robotsTxt: string | null = null;
    try {
      const robotsRes = await fetchFn(`${new URL(page.finalUrl).origin}/robots.txt`, {
        signal: AbortSignal.timeout(10_000),
      });
      if (robotsRes.ok) robotsTxt = await robotsRes.text();
    } catch {
      robotsTxt = null;
    }
    const hostname = new URL(page.finalUrl).hostname.replace(/^www\./, '');
    const brand = hostname.split('.')[0] ?? hostname;
    measurements.push(
      ...(await checkAiReadiness({
        finalUrl: page.finalUrl,
        $: page.$,
        robotsTxt,
        brand,
        exaApiKey: deps.exaApiKey,
        fetchFn,
      })),
    );

    impact = estimateImpact(measurements);
  }

  return {
    url: url.href,
    finalUrl: page.finalUrl,
    tier,
    collectedAt: new Date().toISOString(),
    description,
    business,
    measurements,
    annotations,
    screenshotPath,
    competitors,
    impact,
    crawl,
  };
}
