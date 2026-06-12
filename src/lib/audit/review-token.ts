import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Token de relecture des PDF Pro : HMAC-SHA256 du jobId signé avec
 * AUDIT_REVIEW_SECRET. Le lien Slack /audit/review/<jobId>?token=<token>
 * n'est valide que si le token correspond — pas de session, pas de DB lookup
 * supplémentaire, juste une vérification cryptographique stateless.
 */

function getSecret(): string {
  const secret = process.env.AUDIT_REVIEW_SECRET;
  if (!secret) throw new Error('AUDIT_REVIEW_SECRET manquant : impossible de signer un token de review');
  return secret;
}

/** Token hex (64 caractères) déterministe pour un jobId donné. */
export function makeReviewToken(jobId: string): string {
  return createHmac('sha256', getSecret()).update(jobId).digest('hex');
}

/** Comparaison en temps constant (timingSafeEqual) : pas d'oracle de timing. */
export function verifyReviewToken(jobId: string, token: string): boolean {
  const expected = Buffer.from(makeReviewToken(jobId), 'hex');
  const provided = Buffer.from(token, 'hex');
  // Buffer.from(.., 'hex') tronque silencieusement l'input invalide :
  // une longueur différente suffit à rejeter sans fuite d'information.
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(expected, provided);
}
