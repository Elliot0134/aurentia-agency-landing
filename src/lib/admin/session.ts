import 'server-only';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, verifyAdminCookieValue } from './auth';

/** Durée de vie de la session admin : 7 jours. */
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

/**
 * Vrai si la requête courante porte un cookie admin valide. Lisible depuis un
 * Server Component (page admin) comme depuis un Route Handler (API admin).
 * L'écriture du cookie se fait sur la réponse du login (route /admin/login).
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminCookieValue(store.get(ADMIN_COOKIE)?.value);
}
