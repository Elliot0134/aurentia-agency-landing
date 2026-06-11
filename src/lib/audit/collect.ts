import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { AuditData, Tier } from './types';
import { assertSafeUrl, type DnsResolver } from './url-safety';
import { fetchPage } from './fetch-page';
import { checkOnPage } from './checks-onpage';
import { checkTech } from './checks-tech';
import { checkImages } from './checks-images';
import { runPsi, psiToMeasurements } from './psi';
import { captureScreenshot, getImageRects, buildAnnotations, type BrowserlessConfig } from './screenshot';
import { detectBusinessType } from './business-type';
import { searchCompetitors, auditCompetitors } from './competitors';
import { estimateRevenue } from './revenue';

export interface CollectDeps {
  fetchFn?: typeof fetch;
  resolver?: DnsResolver;
  psiApiKey: string;
  browserless: BrowserlessConfig;
  exaApiKey: string;
  /** Dossier d'écriture du screenshot. null = pas d'écriture (tests). */
  outDir: string | null;
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
  const [png, rects] = await Promise.all([
    captureScreenshot(page.finalUrl, deps.browserless, fetchFn),
    getImageRects(page.finalUrl, deps.browserless, fetchFn),
  ]);
  if (deps.outDir) {
    await mkdir(deps.outDir, { recursive: true });
    screenshotPath = path.join(deps.outDir, 'fullpage.png');
    await writeFile(screenshotPath, png);
  }
  const annotations = buildAnnotations(rects, measurements);

  // 7. Pro : desktop PSI + concurrents + revenue
  let competitors: AuditData['competitors'] = [];
  let revenue: AuditData['revenue'] = null;
  if (tier === 'pro') {
    const psiDesktop = await runPsi(page.finalUrl, 'desktop', deps.psiApiKey, fetchFn);
    measurements.push(...psiToMeasurements(psiDesktop));
    const domain = new URL(page.finalUrl).hostname;
    const urls = await searchCompetitors(business, domain, deps.exaApiKey, fetchFn);
    competitors = await auditCompetitors(urls, deps.psiApiKey, fetchFn);
    revenue = estimateRevenue(measurements, business.sector ?? 'default');
  }

  return {
    url: url.href,
    finalUrl: page.finalUrl,
    tier,
    collectedAt: new Date().toISOString(),
    business,
    measurements,
    annotations,
    screenshotPath,
    competitors,
    revenue,
  };
}
