import { NextResponse, type NextRequest } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { sendProAudit } from '@/lib/audit/send-pro';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Envoi du PDF Pro au client depuis la zone /admin. Gardé par le cookie admin
 * (pas de token HMAC). Réutilise sendProAudit. Form HTML → redirige vers la page
 * admin avec un statut ; JSON → réponse machine.
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ jobId: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { jobId } = await ctx.params;
  const wantsHtml = (req.headers.get('accept') ?? '').includes('text/html');

  const result = await sendProAudit(jobId);
  if (!result.ok) {
    if (wantsHtml) {
      return NextResponse.redirect(new URL(`/admin/audits?send=${result.code}`, req.url), 303);
    }
    const body = result.code === 'not_ready' ? { error: 'not_ready', status: result.status } : { error: result.code };
    return NextResponse.json(body, { status: result.httpStatus });
  }
  if (wantsHtml) {
    return NextResponse.redirect(new URL('/admin/audits?send=ok', req.url), 303);
  }
  return NextResponse.json({ sent: true });
}
