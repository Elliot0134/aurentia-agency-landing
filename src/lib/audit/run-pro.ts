import { collectAudit } from './collect';
import type { CrawlOptions } from './crawl';
import type { BrowserlessConfig } from './screenshot';
import type { DnsResolver } from './url-safety';
import type { ScopeClassifyFn } from './competitors';
import type { AuditStorageClient } from './run-flash';
import { renderReport } from './render/render';
import type { GenerateProFn } from './render/write-report';
import type { buildVisualFindings } from './render/visual-findings';

/**
 * Flux Pro productisé (plan 3, T5) : collecte pro complète (crawl multi-pages,
 * axe-core, AI Readiness, impact) → rendu du rapport PDF (rédaction Pro sous
 * contrat de véracité, charts, constats visuels via buildVisualFindings) →
 * upload dans le bucket PRIVÉ audit-pdfs.
 *
 * Aucune dégradation silencieuse : le Pro est un livrable payé, tout échec
 * (collecte, rendu, upload) → throw, le workflow durable gère retries/escalade.
 * Le bucket étant privé, aucune URL publique n'est générée ici : les URLs
 * signées seront produites par la page de review (T6).
 */

const BUCKET = 'audit-pdfs';

export interface RunProInput {
  url: string;
  /** Email du client : porté par le job, pas utilisé dans la génération. */
  email: string;
  /** Identifiant du job durable : détermine le chemin du PDF dans le bucket. */
  jobId: string;
}

export interface RunProDeps {
  psiApiKey: string;
  browserless: BrowserlessConfig;
  exaApiKey: string;
  /** Client Supabase service-role injecté (cf. AuditStorageClient de run-flash). */
  supabase: AuditStorageClient;
  fetchFn?: typeof fetch;
  /** Stub LLM rédacteur Pro en test. Absent en prod → OpenRouter réel. */
  generateProFn?: GenerateProFn;
  /** Stub de classification du scope (local/national) en test. */
  classifyFn?: ScopeClassifyFn;
  /** Stub des constats visuels (captures + vision) en test. */
  buildVisualsFn?: typeof buildVisualFindings;
  /** Résolveur DNS injectable (garde anti-SSRF de collectAudit) : stub en test. */
  resolver?: DnsResolver;
  /** Options du crawl multi-pages, injectables en test (sleepFn, maxPages). */
  crawlOpts?: Pick<CrawlOptions, 'maxPages' | 'throttleMs' | 'sleepFn'>;
}

export interface RunProResult {
  /** Chemin du PDF dans le bucket privé audit-pdfs : pro/<jobId>/audit.pdf. */
  pdfPath: string;
  score: number;
  impactPercent: number | null;
  writerModel: string;
}

export async function runProAudit(input: RunProInput, deps: RunProDeps): Promise<RunProResult> {
  // 1. Collecte pro (crawl, a11y, AI Readiness, impact). Pas de screenshot buffer :
  //    les constats visuels du Pro sont capturés par buildVisualFindings au rendu.
  const audit = await collectAudit(input.url, 'pro', {
    fetchFn: deps.fetchFn,
    resolver: deps.resolver,
    psiApiKey: deps.psiApiKey,
    browserless: deps.browserless,
    exaApiKey: deps.exaApiKey,
    outDir: null,
    classifyFn: deps.classifyFn,
    crawlOpts: deps.crawlOpts,
  });

  // 2. Rendu : rédaction Pro sous contrat + charts + constats visuels → PDF.
  const rendered = await renderReport(audit, {
    browserless: deps.browserless,
    fetchFn: deps.fetchFn,
    generateProFn: deps.generateProFn,
    buildVisualsFn: deps.buildVisualsFn,
  });
  if (!rendered.pdfBuffer) {
    throw new Error('Rendu Pro sans pdfBuffer (incohérence de tier dans renderReport)');
  }

  // 3. Upload dans le bucket PRIVÉ (pas de getPublicUrl : URLs signées en T6).
  const pdfPath = `pro/${input.jobId}/audit.pdf`;
  const { error } = await deps.supabase.storage.from(BUCKET).upload(pdfPath, rendered.pdfBuffer, {
    contentType: 'application/pdf',
    upsert: true,
  });
  if (error) throw new Error(`Upload du PDF échoué : ${error.message}`);

  return {
    pdfPath,
    score: rendered.score,
    impactPercent: audit.impact?.headlinePercent ?? null,
    writerModel: rendered.writerModel,
  };
}
