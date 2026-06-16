import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminPassword, makeAdminCookieValue, ADMIN_COOKIE } from '@/lib/admin/auth';
import { ADMIN_SESSION_MAX_AGE } from '@/lib/admin/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Login de la zone /admin : POST form du mot de passe. Si correct, pose le
 * cookie de session signé SUR la réponse (fiable en Route Handler) et redirige
 * vers /admin/audits. Sinon, retour avec ?error=1.
 */
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const password = form?.get('password');

  if (typeof password === 'string' && verifyAdminPassword(password)) {
    const res = NextResponse.redirect(new URL('/admin/audits', req.url), 303);
    res.cookies.set(ADMIN_COOKIE, makeAdminCookieValue(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/admin',
      maxAge: ADMIN_SESSION_MAX_AGE,
    });
    return res;
  }
  return NextResponse.redirect(new URL('/admin/audits?error=1', req.url), 303);
}
