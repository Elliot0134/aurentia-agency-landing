import { getJob, updateJob, type AuditJobStatus } from './jobs';
import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * Envoi du PDF Pro au client : logique PARTAGÉE entre l'ancienne route de
 * relecture (token HMAC) et la zone /admin (cookie). Charge le job, vérifie qu'il
 * est relisible, télécharge le PDF du bucket privé, l'envoie en pièce jointe via
 * Resend, puis passe le job en `delivered`. Tout échec d'envoi laisse le statut
 * INTACT (le job reste ready_for_review, on peut recliquer).
 *
 * Ne fait AUCUNE auth : l'appelant authentifie avant d'appeler.
 */

const BUCKET = 'audit-pdfs';
const CAL_URL = 'https://cal.com/elliot-estrade-ixfuya/appel-decouverte';

const C = {
  bg: '#f0ece2',
  card: '#ffffff',
  border: '#e9e4d8',
  text: '#2b2b28',
  muted: '#83817a',
  accent: '#c96442',
};

/** Domaine nettoyé (sans www) de l'URL auditée, pour le sujet et le nom du PDF. */
export function cleanDomain(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
}

/** Corps HTML court : carte blanche, wordmark, 2 phrases, bouton RDV cal.com. */
export function buildDeliveryEmailHtml(domain: string): string {
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

export type SendProResult =
  | { ok: true }
  | { ok: false; code: 'not_found'; httpStatus: 404 }
  | { ok: false; code: 'already_sent'; httpStatus: 409 }
  | { ok: false; code: 'not_ready'; httpStatus: 409; status: AuditJobStatus }
  | { ok: false; code: 'missing_pdf_path'; httpStatus: 500 }
  | { ok: false; code: 'resend_not_configured'; httpStatus: 502 }
  | { ok: false; code: 'pdf_download_failed'; httpStatus: 502 }
  | { ok: false; code: 'resend_failed'; httpStatus: 502 };

/** Envoie le PDF Pro du job au client. Idempotent côté statut (refuse delivered). */
export async function sendProAudit(jobId: string): Promise<SendProResult> {
  const job = await getJob(jobId);
  if (!job) return { ok: false, code: 'not_found', httpStatus: 404 };
  if (job.status === 'delivered') return { ok: false, code: 'already_sent', httpStatus: 409 };
  if (job.status !== 'ready_for_review') {
    return { ok: false, code: 'not_ready', httpStatus: 409, status: job.status };
  }
  if (!job.pdfPath) return { ok: false, code: 'missing_pdf_path', httpStatus: 500 };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, code: 'resend_not_configured', httpStatus: 502 };

  // 1. PDF depuis le bucket privé.
  const { data: pdfBlob, error: downloadError } = await supabaseAdmin.storage.from(BUCKET).download(job.pdfPath);
  if (downloadError || !pdfBlob) {
    console.error(`[send-pro] téléchargement du PDF échoué (${job.pdfPath})`, downloadError);
    return { ok: false, code: 'pdf_download_failed', httpStatus: 502 };
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
    console.error('[send-pro] fetch Resend échoué', err);
    return { ok: false, code: 'resend_failed', httpStatus: 502 };
  }
  if (!resendRes.ok) {
    const body = await resendRes.text().catch(() => '');
    console.error(`[send-pro] Resend a répondu ${resendRes.status} : ${body}`);
    return { ok: false, code: 'resend_failed', httpStatus: 502 };
  }

  // 3. Envoi confirmé → delivered.
  await updateJob(jobId, { status: 'delivered' });
  return { ok: true };
}
