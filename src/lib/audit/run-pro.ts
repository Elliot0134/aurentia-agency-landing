import { collectAudit } from './collect';
import type { AuditData } from './types';
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
  /** Notification best-effort d'une dégradation non bloquante (PSI indispo...). */
  onDegraded?: (msg: string) => void;
}

export interface RunProResult {
  /** Chemin du PDF dans le bucket privé audit-pdfs : pro/<jobId>/audit.pdf. */
  pdfPath: string;
  score: number;
  impactPercent: number | null;
  writerModel: string;
}

/**
 * Étape 1 : collecte pro (crawl, a11y, AI Readiness, impact).
 *
 * Séparée du rendu pour que le workflow durable en fasse un step distinct :
 * `runPro` était un seul step de ~5 minutes, donc chaque retry du WDK
 * repartait de zéro et refaisait tout (incident du 2026-07-29 : 5 tentatives,
 * 36 minutes, aucun livrable).
 *
 * Le résultat traverse une frontière de step, donc il doit rester
 * SÉRIALISABLE : pas de `keepScreenshotBuffer` ici, aucun Buffer dans
 * l'AuditData. Les constats visuels du Pro sont capturés au rendu par
 * buildVisualFindings, pas ici.
 */
export async function collectProAudit(url: string, deps: RunProDeps): Promise<AuditData> {
  return collectAudit(url, 'pro', {
    fetchFn: deps.fetchFn,
    resolver: deps.resolver,
    psiApiKey: deps.psiApiKey,
    browserless: deps.browserless,
    exaApiKey: deps.exaApiKey,
    outDir: null,
    classifyFn: deps.classifyFn,
    crawlOpts: deps.crawlOpts,
    onDegraded: deps.onDegraded,
  });
}

/**
 * Étape 2 : rédaction sous contrat + charts + constats visuels → PDF → upload.
 *
 * Le rendu et l'upload restent dans le MÊME step à dessein : le PDF est un
 * Buffer, il ne doit pas transiter par le store durable entre deux steps.
 */
export async function renderProAudit(
  audit: AuditData,
  input: Pick<RunProInput, 'jobId' | 'email'>,
  deps: RunProDeps,
): Promise<RunProResult> {
  const rendered = await renderReport(audit, {
    browserless: deps.browserless,
    fetchFn: deps.fetchFn,
    generateProFn: deps.generateProFn,
    buildVisualsFn: deps.buildVisualsFn,
  });
  if (!rendered.pdfBuffer) {
    throw new Error('Rendu Pro sans pdfBuffer (incohérence de tier dans renderReport)');
  }

  // Upload dans le bucket PRIVÉ (pas de getPublicUrl : URLs signées en T6).
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

/** Composition des deux étapes : conservée pour les appels hors workflow. */
export async function runProAudit(input: RunProInput, deps: RunProDeps): Promise<RunProResult> {
  const audit = await collectProAudit(input.url, deps);
  return renderProAudit(audit, input, deps);
}
