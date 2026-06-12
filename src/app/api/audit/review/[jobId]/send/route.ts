import { NextResponse, type NextRequest } from 'next/server';
import { getJob, updateJob } from '@/lib/audit/jobs';
import { verifyReviewToken } from '@/lib/audit/review-token';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Action « Envoyer au client » du gate humain de relecture Pro.
 *
 * POST (form-encoded depuis la page review, ou JSON) protégé par le token
 * HMAC de review. Télécharge le PDF du bucket privé, l'envoie au client en
 * pièce jointe via Resend, puis passe le job en `delivered`.
 *
 * Tout échec d'envoi → 502 SANS toucher au statut : le job reste
 * ready_for_review, Elliot peut recliquer.
 */

const BUCKET = 'audit-pdfs';
const CAL_URL = 'https://cal.com/elliot-estrade-ixfuya/appel-decouverte';

// Charte mail (warm terracotta sur crème), alignée sur src/app/api/audit/route.ts.
const C = {
  bg: '#f0ece2',
  card: '#ffffff',
  border: '#e9e4d8',
  text: '#2b2b28',
  muted: '#83817a',
  accent: '#c96442',
};

/** Domaine nettoyé (sans www) de l'URL auditée, pour le sujet et le nom du PDF. */
function cleanDomain(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
}

/** Corps HTML court : carte blanche, wordmark, 2 phrases, bouton RDV cal.com. */
function buildDeliveryEmailHtml(domain: string): string {
  return `
  <!doctype html>
  <html lang="fr">
  <body style="margin:0;padding:0;background:${C.bg};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Votre audit complet de ${domain} est en pièce jointe.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.card};border:1px solid ${C.border};border-radius:20px;overflow:hidden;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <tr><td style="padding:32px 36px 8px;">
            <div style="font-size:20px;font-weight:700;letter-spacing:-0.02em;color:${C.accent};">Aurentia<span style="color:${C.text};">.agency</span></div>
            <div style="font-size:13px;color:${C.muted};margin-top:4px;">Sites web &middot; IA &middot; automatisation</div>
          </td></tr>
          <tr><td style="padding:16px 36px 8px;color:${C.text};font-size:16px;line-height:1.65;">
            <p style="margin:0 0 16px;">Bonjour,</p>
            <p style="margin:0 0 16px;">Votre audit complet de <strong>${domain}</strong> est en pi&egrave;ce jointe de cet email.</p>
            <p style="margin:0 0 20px;">Pour passer en revue les recommandations ensemble et prioriser les actions, r&eacute;servez un cr&eacute;neau :</p>
            <a href="${CAL_URL}" style="display:inline-block;background:${C.accent};color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 26px;border-radius:12px;">R&eacute;server mon appel d&eacute;couverte</a>
          </td></tr>
          <tr><td style="padding:20px 36px 4px;color:${C.text};font-size:16px;line-height:1.65;">
            <p style="margin:0;">&Agrave; tr&egrave;s vite,<br/>L'&eacute;quipe Aurentia.agency</p>
          </td></tr>
          <tr><td style="padding:20px 36px 32px;">
            <div style="border-top:1px solid ${C.border};padding-top:16px;font-size:13px;color:${C.muted};line-height:1.5;">
              Une question ? R&eacute;pondez simplement &agrave; cet email, on vous lit.
            </div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}

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
    const job = await getJob(jobId);
    if (!job) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    if (job.status === 'delivered') {
      return NextResponse.json({ error: 'already_sent' }, { status: 409 });
    }
    if (job.status !== 'ready_for_review') {
      return NextResponse.json({ error: 'not_ready', status: job.status }, { status: 409 });
    }
    if (!job.pdfPath) {
      // Incohérence de données : ready_for_review sans PDF, un humain doit regarder.
      return NextResponse.json({ error: 'missing_pdf_path' }, { status: 500 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'resend_not_configured' }, { status: 502 });
    }

    // 1. PDF depuis le bucket privé.
    const { data: pdfBlob, error: downloadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .download(job.pdfPath);
    if (downloadError || !pdfBlob) {
      console.error(`[api/audit/review/send] téléchargement du PDF échoué (${job.pdfPath})`, downloadError);
      return NextResponse.json({ error: 'pdf_download_failed' }, { status: 502 });
    }
    const pdfBase64 = Buffer.from(await pdfBlob.arrayBuffer()).toString('base64');

    // 2. Envoi Resend avec pièce jointe.
    const domain = cleanDomain(job.url);
    const from = process.env.AUDIT_FROM_EMAIL ?? 'audit@aurentia.fr';
    let resendRes: Response;
    try {
      resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: `Aurentia.agency <${from}>`,
          to: [job.email],
          reply_to: process.env.AUDIT_REPLY_TO ?? 'contact@aurentia.fr',
          subject: `Votre audit complet de ${domain}`,
          html: buildDeliveryEmailHtml(domain),
          attachments: [{ filename: `audit-${domain}.pdf`, content: pdfBase64 }],
        }),
      });
    } catch (err) {
      console.error('[api/audit/review/send] fetch Resend échoué', err);
      return NextResponse.json({ error: 'resend_failed' }, { status: 502 });
    }
    if (!resendRes.ok) {
      const body = await resendRes.text().catch(() => '');
      console.error(`[api/audit/review/send] Resend a répondu ${resendRes.status} : ${body}`);
      // Statut volontairement intact : le job reste ready_for_review, on peut recliquer.
      return NextResponse.json({ error: 'resend_failed' }, { status: 502 });
    }

    // 3. Envoi confirmé → delivered.
    await updateJob(jobId, { status: 'delivered' });

    // Formulaire HTML → retour sur la page review (qui affichera « envoyé »).
    if ((req.headers.get('accept') ?? '').includes('text/html')) {
      return NextResponse.redirect(new URL(`/audit/review/${jobId}?token=${token}`, req.url), 303);
    }
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error('[api/audit/review/send] POST failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
