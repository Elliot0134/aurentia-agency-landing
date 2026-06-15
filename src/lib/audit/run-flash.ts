import sharp from 'sharp';
import { collectAudit } from './collect';
import type { BrowserlessConfig } from './screenshot';
import type { DnsResolver } from './url-safety';
import type { ScopeClassifyFn } from './competitors';
import { computeScore } from './render/score';
import { renderScoreGaugePng } from './render/score-chart';
import { buildFlashEmailHtml } from './render/email-flash';
import { analyzeHero } from './render/hero-analysis';
import type { VisualAnalyzeFn } from './render/visual-findings';
import { getWriterModelLabel, writeReport, type GenerateFn } from './render/write-report';

/**
 * Flux Flash productisé (plan 3, T2) : reprend le pipeline éprouvé des scripts
 * de test en une fonction pure appelable par le workflow durable.
 * collect flash → crop premier écran (capture PROPRE, aucune pastille incrustée :
 * décision actée, le placement automatique n'est pas fiable) → vision hero en
 * légende → uploads Supabase (bucket public) → cadran score → rédaction sous
 * contrat → HTML du mail.
 *
 * Robustesse : vision en échec → capture seule ; cadran en échec → mail sans
 * cadran (un Flash gratuit dégradé vaut mieux que pas de Flash). En revanche
 * collecte, upload de la capture ou rédaction en échec → throw (le workflow gère).
 */

const BUCKET = 'audit-captures';
const HERO_CROP_HEIGHT = 1000;
const EMAIL_IMAGE_WIDTH = 1100;
const JPEG_QUALITY = 92;
const DEFAULT_CTA_URL = 'https://www.aurentia.agency/audit';

export interface RunFlashInput {
  url: string;
  /** Email du prospect : porté par le job, pas utilisé dans la génération. */
  email: string;
}

/**
 * Sous-ensemble structurel du client Supabase utilisé ici (storage upload +
 * URL publique). Le vrai SupabaseClient service-role y est assignable ; les
 * tests injectent un fake objet sans réseau.
 */
export interface AuditStorageClient {
  storage: {
    from(bucketId: string): {
      upload(
        path: string,
        body: Buffer,
        options?: { contentType?: string; upsert?: boolean },
      ): Promise<{ error: { message: string } | null }>;
      getPublicUrl(path: string): { data: { publicUrl: string } };
    };
  };
}

export interface RunFlashDeps {
  psiApiKey: string;
  browserless: BrowserlessConfig;
  exaApiKey: string;
  /** Client Supabase service-role injecté (cf. AuditStorageClient). */
  supabase: AuditStorageClient;
  fetchFn?: typeof fetch;
  /** Résolveur DNS injectable (garde anti-SSRF de collectAudit) : stub en test. */
  resolver?: DnsResolver;
  /** Stub LLM rédacteur en test. Absent en prod → OpenRouter réel. */
  generateFn?: GenerateFn;
  /** Stub de classification du scope (local/national) en test. */
  classifyFn?: ScopeClassifyFn;
  /** Stub vision en test (signature de buildVisualFindings/analyzeHero). */
  analyzeFn?: VisualAnalyzeFn;
  /** Logo de l'en-tête. Défaut : logo clair hébergé (géré par buildFlashEmailHtml). */
  logoUrl?: string;
  /** Cible du CTA principal. Défaut : la page /audit du site. */
  ctaUrl?: string;
  /** Notification best-effort d'une dégradation non bloquante (PSI indispo...). */
  onDegraded?: (msg: string) => void;
}

export interface RunFlashResult {
  subject: string;
  html: string;
  score: number;
  impactPercent: number | null;
  writerModel: string;
}

/** Slug du job depuis le domaine nettoyé (sans www, alphanumérique-tirets). */
function jobSlug(url: string): string {
  const host = new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  return host.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Crop premier écran (hauteur min(1000, height)), resize 1100, JPEG q92. */
async function cropHeroJpeg(fullPagePng: Buffer): Promise<Buffer> {
  const meta = await sharp(fullPagePng).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (width <= 0 || height <= 0) throw new Error('Capture illisible (dimensions absentes)');
  return sharp(fullPagePng)
    .extract({ left: 0, top: 0, width, height: Math.min(HERO_CROP_HEIGHT, height) })
    .resize({ width: EMAIL_IMAGE_WIDTH })
    .jpeg({ quality: JPEG_QUALITY })
    .toBuffer();
}

/** Défaut : l'analyse vision hero (OpenRouter), contextualisée. */
const defaultAnalyze: VisualAnalyzeFn = (png, context) => analyzeHero(png, { context });

export async function runFlashAudit(input: RunFlashInput, deps: RunFlashDeps): Promise<RunFlashResult> {
  // 1. Collecte flash, screenshot full-page gardé en mémoire (pas de disque).
  //    Échec (site injoignable, PSI down...) → throw, le workflow gère.
  const audit = await collectAudit(input.url, 'flash', {
    fetchFn: deps.fetchFn,
    resolver: deps.resolver,
    psiApiKey: deps.psiApiKey,
    browserless: deps.browserless,
    exaApiKey: deps.exaApiKey,
    outDir: null,
    keepScreenshotBuffer: true,
    classifyFn: deps.classifyFn,
    onDegraded: deps.onDegraded,
  });
  if (!audit.screenshotBuffer) {
    throw new Error('Capture full-page absente de la collecte (keepScreenshotBuffer)');
  }

  // 2. Premier écran : capture PROPRE (pas d'annotation incrustée sur l'image).
  const heroJpeg = await cropHeroJpeg(audit.screenshotBuffer);

  // 3. Vision hero → commentaires en légende (pastilles numérotées sous la
  //    capture : x/y/w/h à 0, comme le flux validé). Vision en échec → capture seule.
  const analyzeFn = deps.analyzeFn ?? defaultAnalyze;
  try {
    const analysis = await analyzeFn(heroJpeg, "premier écran de la page d'accueil sur ordinateur (desktop)");
    audit.annotations = analysis.points.map((p) => ({ x: 0, y: 0, width: 0, height: 0, note: p.comment }));
  } catch {
    audit.annotations = [];
  }

  // 4. Upload de la capture (bucket public) : le mail repose dessus → échec = throw.
  const bucket = deps.supabase.storage.from(BUCKET);
  const slug = jobSlug(audit.finalUrl);
  const ts = Date.now();
  const capturePath = `flash/${slug}/capture-${ts}.jpg`;
  const { error: captureError } = await bucket.upload(capturePath, heroJpeg, {
    contentType: 'image/jpeg',
    upsert: true,
  });
  if (captureError) throw new Error(`Upload de la capture échoué : ${captureError.message}`);
  const screenshotUrl = bucket.getPublicUrl(capturePath).data.publicUrl;

  // 5. Cadran de score : rendu + upload. Échec → mail sans cadran (dégradé accepté).
  const score = computeScore(audit.measurements);
  let scoreGaugeUrl: string | undefined;
  try {
    const gaugePng = await renderScoreGaugePng(score, deps.browserless, deps.fetchFn);
    const gaugePath = `flash/${slug}/score-${ts}.png`;
    const { error: gaugeError } = await bucket.upload(gaugePath, gaugePng, {
      contentType: 'image/png',
      upsert: true,
    });
    if (gaugeError) throw new Error(gaugeError.message);
    scoreGaugeUrl = bucket.getPublicUrl(gaugePath).data.publicUrl;
  } catch {
    scoreGaugeUrl = undefined;
  }

  // 6. Rédaction sous contrat de véracité (3 essais) : échec → throw.
  const content = await writeReport(audit, { generateFn: deps.generateFn });

  // 7. HTML du mail Flash (charte orange, fonction pure).
  const html = buildFlashEmailHtml(audit, content, {
    screenshotUrl,
    scoreGaugeUrl,
    logoUrl: deps.logoUrl,
    proUrl: deps.ctaUrl ?? DEFAULT_CTA_URL,
  });

  // 8. Sujet statique (pas de LLM : zéro risque de dérive dans l'objet du mail).
  const domain = new URL(audit.finalUrl).hostname.replace(/^www\./, '');
  const subject = `Votre pré-audit de ${domain} : ${score}/100`;

  return {
    subject,
    html,
    score,
    impactPercent: audit.impact?.headlinePercent ?? null,
    writerModel: getWriterModelLabel(),
  };
}
