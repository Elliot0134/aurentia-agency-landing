import { verifyReviewToken } from './review-token';
import type { AuditJobStatus } from './jobs';

/**
 * Garde de la page de relecture Pro (/audit/review/<jobId>) : décision pure
 * token + statut → quoi afficher. Extraite du server component pour être
 * testable sans rendu React.
 *
 * - 'invalid'   : token absent/faux, secret manquant, ou job inconnu → page « Lien invalide ».
 * - 'not-ready' : token OK mais le job n'est pas (encore) relisible → info statut.
 * - 'ok'        : relecture possible (ready_for_review) ou déjà envoyé (delivered).
 */

export type ReviewGateResult = 'invalid' | 'not-ready' | 'ok';

/** Statuts affichables sur la page : à relire, ou déjà envoyé (lecture seule). */
export const REVIEWABLE_STATUSES: readonly AuditJobStatus[] = ['ready_for_review', 'delivered'];

export function evaluateReviewGate(
  jobId: string,
  token: string | undefined,
  status: AuditJobStatus | null,
  verify: (jobId: string, token: string) => boolean = verifyReviewToken,
): ReviewGateResult {
  if (!token) return 'invalid';

  let tokenOk: boolean;
  try {
    tokenOk = verify(jobId, token);
  } catch {
    // AUDIT_REVIEW_SECRET absent (verifyReviewToken throw) : gate fermée par défaut.
    tokenOk = false;
  }
  if (!tokenOk) return 'invalid';

  // Job inconnu : ne rien révéler de plus qu'un lien invalide.
  if (status === null) return 'invalid';

  return REVIEWABLE_STATUSES.includes(status) ? 'ok' : 'not-ready';
}
