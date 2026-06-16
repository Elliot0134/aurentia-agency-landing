import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Auth de la zone /admin : un seul mot de passe partagé (ADMIN_PASSWORD), pas de
 * comptes utilisateur. Le login pose un cookie HttpOnly dont la valeur est un
 * HMAC d'un payload fixe signé avec le mot de passe : stateless, et changer le
 * mot de passe invalide automatiquement les anciens cookies.
 *
 * Fonctions PURES (testables sans contexte Next). La lecture/écriture du cookie
 * via next/headers vit dans session.ts (server-only).
 */

export const ADMIN_COOKIE = 'aurentia_admin';
const COOKIE_PAYLOAD = 'admin-session-v1';

function passwordOrThrow(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error('ADMIN_PASSWORD manquant : zone admin fermée par défaut');
  return pw;
}

/** Comparaison en temps constant du mot de passe fourni. Faux si env absente. */
export function verifyAdminPassword(provided: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  const expected = Buffer.from(pw, 'utf8');
  const got = Buffer.from(provided, 'utf8');
  if (expected.length !== got.length) return false;
  return timingSafeEqual(expected, got);
}

/** Valeur de cookie signée (HMAC-SHA256 hex du payload fixe avec le mot de passe). */
export function makeAdminCookieValue(): string {
  return createHmac('sha256', passwordOrThrow()).update(COOKIE_PAYLOAD).digest('hex');
}

/** Vérifie un cookie en temps constant. Faux si absent, malformé, ou env absente. */
export function verifyAdminCookieValue(value: string | undefined | null): boolean {
  if (!value) return false;
  let expected: Buffer;
  try {
    expected = Buffer.from(makeAdminCookieValue(), 'hex');
  } catch {
    // ADMIN_PASSWORD absente : gate fermée.
    return false;
  }
  const got = Buffer.from(value, 'hex');
  if (got.length !== expected.length) return false;
  return timingSafeEqual(expected, got);
}
