import {
  loadJob,
  markRunning,
  runFlash,
  sendResend,
  markDelivered,
  saveDraft,
  handleFlashFailure,
  collectPro,
  renderPro,
  makeReviewTokenStep,
  markReadyForReview,
  notifyReviewReady,
  setLeadReviewLink,
  handleProFailure,
} from './audit-steps';

/**
 * Workflows durables du moteur d'audit (WDK, directive "use workflow").
 *
 * Gestion d'erreur : chaque step est retryé automatiquement par le runtime
 * (3 retries par défaut, FatalError = pas de retry). La doc WDK ne propose
 * pas de hook d'échec de run ; le pattern documenté pour réagir à un échec
 * définitif est le try/catch de compensation au niveau du workflow avec des
 * steps de rollback puis re-throw (errors-and-retries.mdx, "Rolling Back
 * Failed Steps"). C'est ce qu'on applique : le catch n'est atteint QUE
 * lorsqu'un step a définitivement échoué (retries épuisés ou FatalError),
 * on marque alors le job failed/refunded + escalade Slack via des steps
 * dédiés, puis on re-throw pour que le run WDK soit lui aussi marqué failed.
 */

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/**
 * Flash (gratuit) : collecte + rédaction, puis selon le canal :
 * - inbound : envoi direct au prospect via Resend → status `delivered`.
 * - cold : brouillon stocké dans le job → status `ready_to_send`
 *   (n8n le déposera en draft Gmail ; JAMAIS d'envoi automatique en cold).
 */
export async function flashAuditWorkflow(jobId: string) {
  'use workflow';

  // Hors du try : job introuvable = FatalError, rien à compenser en DB.
  const job = await loadJob(jobId);

  try {
    await markRunning(jobId);
    const result = await runFlash(job.url, job.email);

    if (job.channel === 'inbound') {
      await sendResend(job.email, result.subject, result.html);
      await markDelivered(jobId, result);
      return { jobId, status: 'delivered' as const, score: result.score };
    }

    await saveDraft(jobId, result);
    return { jobId, status: 'ready_to_send' as const, score: result.score };
  } catch (err) {
    await handleFlashFailure(jobId, job.url, errorMessage(err));
    throw err;
  }
}

/**
 * Pro (99 EUR HT) : collecte complète + PDF dans le bucket privé, puis gate
 * humain : token de review HMAC + lien Slack de relecture. En cas d'échec
 * définitif : refund Stripe automatique si possible (status `refunded`),
 * sinon `failed` + escalade Slack (détail dans handleProFailure).
 */
export async function proAuditWorkflow(jobId: string) {
  'use workflow';

  const job = await loadJob(jobId);

  try {
    await markRunning(jobId);
    // Deux steps : la collecte (longue) est acquise avant que le rendu ne
    // commence, donc un échec au rendu ne la refait pas. L'AuditData transite
    // en JSON entre les deux, sans aucun Buffer.
    const audit = await collectPro(job.url);
    const result = await renderPro(jobId, audit, job.email);
    const reviewToken = await makeReviewTokenStep(jobId);
    await markReadyForReview(jobId, result, reviewToken);
    await notifyReviewReady(jobId, job.url, reviewToken);
    // Lien de relecture aussi dans Airtable (champ Audit PDF) pour relire depuis
    // le CRM. Best-effort, no-op si l'audit n'est pas rattaché à un lead.
    await setLeadReviewLink(job.leadId, jobId);
    return { jobId, status: 'ready_for_review' as const, score: result.score };
  } catch (err) {
    await handleProFailure(jobId, job.url, job.stripeSessionId, errorMessage(err));
    throw err;
  }
}
