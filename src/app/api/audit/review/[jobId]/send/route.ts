import { NextResponse, type NextRequest } from 'next/server';
import { verifyReviewToken } from '@/lib/audit/review-token';
import { sendProAudit } from '@/lib/audit/send-pro';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Action « Envoyer au client » du gate humain de relecture Pro (lien Slack
 * historique). POST (form-encoded ou JSON) protégé par le token HMAC de review.
 * La logique d'envoi est partagée avec la zone /admin via sendProAudit.
 *
 * Tout échec d'envoi laisse le statut intact : le job reste ready_for_review.
 */

/** Lit le token depuis le body : formData (formulaire HTML) ou JSON (M2M). */
async function readToken(req: NextRequest): Promise<string | null> {
  const contentType = req.headers.get('content-type') ?? '';
  try {
    if (contentType.includes('application/json')) {
      const body = (await req.json()) as { token?: unknown };
      return typeof body.token === 'string' ? body.token : null;
    }
    const form = await req.formData();
    const token = form.get('token');
    return typeof token === 'string' ? token : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await ctx.params;

  const token = await readToken(req);
  let tokenOk = false;
  try {
    tokenOk = token !== null && verifyReviewToken(jobId, token);
  } catch {
    // AUDIT_REVIEW_SECRET absent : endpoint fermé, jamais ouvert par oubli de config.
    tokenOk = false;
  }
  if (!tokenOk || token === null) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const result = await sendProAudit(jobId);
    if (!result.ok) {
      const body = result.code === 'not_ready' ? { error: 'not_ready', status: result.status } : { error: result.code };
      return NextResponse.json(body, { status: result.httpStatus });
    }
    // Formulaire HTML → retour sur la page de review (qui affichera « envoyé »).
    if ((req.headers.get('accept') ?? '').includes('text/html')) {
      return NextResponse.redirect(new URL(`/audit/review/${jobId}?token=${token}`, req.url), 303);
    }
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error('[api/audit/review/send] POST failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
