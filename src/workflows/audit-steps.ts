import Stripe from 'stripe';
import { FatalError } from 'workflow';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getJob, updateJob, type AuditJob } from '@/lib/audit/jobs';
import { runFlashAudit, type RunFlashResult, type AuditStorageClient } from '@/lib/audit/run-flash';
import { runProAudit, type RunProResult } from '@/lib/audit/run-pro';
import { makeReviewToken } from '@/lib/audit/review-token';
import type { BrowserlessConfig } from '@/lib/audit/screenshot';

/**
 * Steps des workflows durables d'audit (directive "use step" : plein accès
 * Node, retries automatiques par le runtime WDK, 3 par défaut).
 *
 * Séparés du fichier des workflows comme recommandé par la doc WDK
 * (foundations/workflows-and-steps.mdx : "Splitting up steps and workflows
 * will also help avoid most bundler related bugs").
 *
 * Convention d'erreur : Error ordinaire = retryable (réseau, API down),
 * FatalError = définitif (config manquante, job introuvable, 4xx).
 */

/** Deps réelles du moteur, construites depuis les env vars au moment du step. */
export interface EngineDeps {
  psiApiKey: string;
  browserless: BrowserlessConfig;
  exaApiKey: string;
  supabase: AuditStorageClient;
}

export function depsProd(): EngineDeps {
  const psiApiKey = process.env.PSI_API_KEY;
  const browserlessToken = process.env.BROWSERLESS_TOKEN;
  const exaApiKey = process.env.EXA_API_KEY;
  if (!psiApiKey || !browserlessToken || !exaApiKey) {
    // Config manquante : retenter ne changera rien → FatalError.
    throw new FatalError('Config moteur incomplète : PSI_API_KEY, BROWSERLESS_TOKEN et EXA_API_KEY requis');
  }
  return {
    psiApiKey,
    browserless: { token: browserlessToken, baseUrl: process.env.BROWSERLESS_URL },
    exaApiKey,
    supabase: supabaseAdmin,
  };
}

/** Notification Slack best-effort : ne throw JAMAIS (une notif perdue ne doit
 * ni faire échouer un run ni déclencher un refund). Env absente → log. */
async function postSlack(text: string): Promise<void> {
  const webhookUrl = process.env.SLACK_AUDIT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log(`[audit-workflow] SLACK_AUDIT_WEBHOOK_URL absente, notification non envoyée : ${text}`);
    return;
  }
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) console.error(`[audit-workflow] Slack a répondu ${res.status} : ${text}`);
  } catch (err) {
    console.error('[audit-workflow] notification Slack échouée', err);
  }
}

// ---------------------------------------------------------------------------
// Steps communs
// ---------------------------------------------------------------------------

export async function loadJob(jobId: string): Promise<AuditJob> {
  'use step';
  const job = await getJob(jobId);
  // Job introuvable : données invalides, inutile de retenter → FatalError.
  if (!job) throw new FatalError(`Job d'audit introuvable : ${jobId}`);
  return job;
}

export async function markRunning(jobId: string): Promise<void> {
  'use step';
  await updateJob(jobId, { status: 'running' });
}

// ---------------------------------------------------------------------------
// Steps Flash
// ---------------------------------------------------------------------------

export async function runFlash(url: string, email: string): Promise<RunFlashResult> {
  'use step';
  return runFlashAudit({ url, email }, depsProd());
}

/** Envoi du mail Flash inbound via l'API Resend (HTTP direct, pas de SDK). */
export async function sendResend(email: string, subject: string, html: string): Promise<void> {
  'use step';
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUDIT_FROM_EMAIL;
  if (!apiKey || !from) {
    throw new FatalError('RESEND_API_KEY et AUDIT_FROM_EMAIL requis pour envoyer le Flash inbound');
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: `Aurentia.agency <${from}>`,
      to: [email],
      reply_to: process.env.AUDIT_REPLY_TO ?? 'contact@aurentia.fr',
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    // 4xx (payload/destinataire invalide) : retenter ne changera rien.
    if (res.status >= 400 && res.status < 500) {
      throw new FatalError(`Resend a refusé le mail (${res.status}) : ${body}`);
    }
    throw new Error(`Resend en erreur (${res.status}) : ${body}`); // 5xx → retry
  }
}

export async function markDelivered(jobId: string, result: RunFlashResult): Promise<void> {
  'use step';
  await updateJob(jobId, {
    status: 'delivered',
    score: result.score,
    impactPercent: result.impactPercent,
    writerModel: result.writerModel,
    subject: result.subject,
  });
}

/** Canal cold : on stocke le brouillon, n8n le déposera en draft Gmail.
 * Conformément à la règle du projet : JAMAIS d'envoi automatique en cold. */
export async function saveDraft(jobId: string, result: RunFlashResult): Promise<void> {
  'use step';
  await updateJob(jobId, {
    status: 'ready_to_send',
    score: result.score,
    impactPercent: result.impactPercent,
    writerModel: result.writerModel,
    subject: result.subject,
    html: result.html,
  });
}

/** Échec définitif du Flash (retries WDK épuisés ou FatalError) :
 * marque le job failed + escalade Slack. Appelé depuis le catch du workflow
 * (pattern saga documenté, cf. errors-and-retries.mdx). */
export async function handleFlashFailure(jobId: string, url: string, message: string): Promise<void> {
  'use step';
  await updateJob(jobId, { status: 'failed', error: message });
  await postSlack(`:rotating_light: Audit Flash en échec définitif : ${url} (job ${jobId}) : ${message}`);
}

// ---------------------------------------------------------------------------
// Steps Pro
// ---------------------------------------------------------------------------

export async function runPro(jobId: string, url: string, email: string): Promise<RunProResult> {
  'use step';
  return runProAudit({ url, email, jobId }, depsProd());
}

export async function makeReviewTokenStep(jobId: string): Promise<string> {
  'use step';
  if (!process.env.AUDIT_REVIEW_SECRET) {
    throw new FatalError('AUDIT_REVIEW_SECRET manquant : impossible de signer le token de review');
  }
  return makeReviewToken(jobId);
}

export async function markReadyForReview(jobId: string, result: RunProResult, reviewToken: string): Promise<void> {
  'use step';
  await updateJob(jobId, {
    status: 'ready_for_review',
    pdfPath: result.pdfPath,
    score: result.score,
    impactPercent: result.impactPercent,
    writerModel: result.writerModel,
    reviewToken,
  });
}

/** Lien de relecture humaine du PDF Pro (gate humain 24h avant envoi). */
export function buildReviewMessage(jobId: string, siteUrl: string, token: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');
  return `PDF Pro prêt à relire : ${siteUrl} — ${base}/audit/review/${jobId}?token=${token}`;
}

export async function notifyReviewReady(jobId: string, siteUrl: string, token: string): Promise<void> {
  'use step';
  await postSlack(buildReviewMessage(jobId, siteUrl, token));
}

/**
 * Échec définitif du Pro : le client a PAYÉ 99 EUR HT, on ne le laisse jamais
 * dans le vide. Chemin documenté :
 *
 * 1. Si le job porte un stripe_session_id ET que STRIPE_SECRET_KEY est
 *    configurée : remboursement automatique du payment_intent de la session
 *    Checkout. Refund OK → status `refunded`.
 * 2. Refund impossible (pas de session, pas de clé, payment_intent absent)
 *    ou refund en erreur (API Stripe down, déjà remboursé...) → status
 *    `failed` + l'erreur est loguée : Elliot rembourse à la main depuis le
 *    dashboard Stripe.
 * 3. Dans TOUS les cas : escalade Slack avec le détail (site, job, cause,
 *    état du refund) pour qu'un humain reprenne la main.
 *
 * Ce step ne throw jamais volontairement : il tourne dans le catch du
 * workflow, l'erreur d'origine est re-levée juste après pour que le run WDK
 * soit bien marqué failed. (Si updateJob lui-même échoue, le step est retryé
 * par le runtime — le refund Stripe est idempotent côté logique car un
 * payment_intent déjà remboursé renvoie une erreur attrapée par le try/catch.)
 */
export async function handleProFailure(
  jobId: string,
  url: string,
  stripeSessionId: string | null,
  message: string,
): Promise<void> {
  'use step';
  let refunded = false;
  let refundNote = 'pas de remboursement automatique (stripe_session_id ou STRIPE_SECRET_KEY absent)';

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeSessionId && stripeKey) {
    try {
      const stripe = new Stripe(stripeKey);
      const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
      const paymentIntentId =
        typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
      if (paymentIntentId) {
        await stripe.refunds.create({ payment_intent: paymentIntentId });
        refunded = true;
        refundNote = `remboursé automatiquement (payment_intent ${paymentIntentId})`;
      } else {
        refundNote = `session ${stripeSessionId} sans payment_intent : remboursement manuel requis`;
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      refundNote = `remboursement automatique ÉCHOUÉ (${detail}) : remboursement manuel requis`;
      console.error(`[audit-workflow] refund Stripe échoué pour le job ${jobId}`, err);
    }
  }

  await updateJob(jobId, { status: refunded ? 'refunded' : 'failed', error: message });
  await postSlack(
    `:rotating_light: Audit Pro en échec définitif : ${url} (job ${jobId})\nCause : ${message}\nStripe : ${refundNote}`,
  );
}
