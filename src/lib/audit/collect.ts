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

  // 4. Performance (mobile toujours ; desktop en pro)
  const psiMobile = await runPsi(page.finalUrl, 'mobile', deps.psiApiKey, fetchFn);
  measurements.push(...psiToMeasurements(psiMobile));

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

  // 9. Pro : desktop PSI + estimation d'impact
  let impact: AuditData['impact'] = null;
  if (tier === 'pro') {
    const psiDesktop = await runPsi(page.finalUrl, 'desktop', deps.psiApiKey, fetchFn);
    measurements.push(...psiToMeasurements(psiDesktop));
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
  };
}
