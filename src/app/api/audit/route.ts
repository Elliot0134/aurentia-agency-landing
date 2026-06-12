import { NextResponse, type NextRequest } from "next/server";
import { STRIPE_PAYMENT_LINK } from "@/data/v2/payment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Secrets en variables d'env (cf. .env.local + Vercel). Jamais hardcodés.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.AUDIT_FROM_EMAIL ?? "audit@aurentia.fr";
const REPLY_TO = process.env.AUDIT_REPLY_TO ?? "contact@aurentia.fr";
const SLACK_WEBHOOK_URL = process.env.SLACK_AUDIT_WEBHOOK_URL;

// Charte mail — alignée sur le thème v2 du site ([data-v2-root]) :
// fond eggshell quasi-blanc, surfaces gris clair, accent orange.
const C = {
  bg: "#F4F4F5", // surface neutre (cadre extérieur)
  card: "#FFFFFF", // carte blanche
  border: "#E5E5E5", // neutral-100
  text: "#0A0A0A", // foreground
  muted: "#767676", // neutral-500
  accent: "#F36F1C", // orange-500
  accentDark: "#BD3F11", // orange-700
  tintBg: "#FFF7ED", // orange-50 (encart CTA)
  tintBorder: "#FBE2C8", // orange-100/200 adouci
};

/** Échappe l'input visiteur avant injection dans le HTML du mail. */
function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

/** Template HTML du mail de confirmation pré-audit. */
function buildEmailHtml(site: string): string {
  const safeSite = escapeHtml(site);
  return `
  <!doctype html>
  <html lang="fr">
  <body style="margin:0;padding:0;background:${C.bg};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Votre pré-audit gratuit est en route — et votre audit complet en 1 clic.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.card};border:1px solid ${C.border};border-radius:20px;overflow:hidden;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <!-- Header -->
          <tr><td style="padding:32px 36px 8px;">
            <div style="font-size:20px;font-weight:700;letter-spacing:-0.02em;color:${C.accent};">Aurentia<span style="color:${C.text};">.agency</span></div>
            <div style="font-size:13px;color:${C.muted};margin-top:4px;">Sites web · IA · automatisation</div>
          </td></tr>
          <!-- Body -->
          <tr><td style="padding:16px 36px 8px;color:${C.text};font-size:16px;line-height:1.65;">
            <p style="margin:0 0 16px;">Bonjour,</p>
            <p style="margin:0 0 16px;">Merci pour votre demande de pré-audit gratuit pour <a href="${safeSite}" style="color:${C.accent};font-weight:600;text-decoration:none;">${safeSite}</a>.</p>
            <p style="margin:0 0 16px;">Notre équipe analyse votre site et vous revient sous <strong>48h ouvrées</strong> avec vos premiers points d'amélioration : SEO, performance, UX et conversion.</p>
          </td></tr>
          <!-- CTA box -->
          <tr><td style="padding:8px 36px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.tintBg};border:1px solid ${C.tintBorder};border-radius:16px;">
              <tr><td style="padding:24px 24px 26px;">
                <div style="font-size:17px;font-weight:700;color:${C.text};margin-bottom:6px;">Pas envie d'attendre ?</div>
                <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:${C.muted};">L'audit complet et chiffré couvre <strong style="color:${C.text};">7 domaines en détail</strong> avec un plan d'action priorisé. Livré rapidement, payable en ligne.</p>
                <a href="${STRIPE_PAYMENT_LINK}" style="display:inline-block;background:${C.accent};color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 26px;border-radius:12px;">Obtenir l'audit complet — 99 € HT →</a>
                <div style="font-size:13px;color:${C.muted};margin-top:12px;">Paiement sécurisé via Stripe.</div>
              </td></tr>
            </table>
          </td></tr>
          <!-- Sign-off -->
          <tr><td style="padding:16px 36px 4px;color:${C.text};font-size:16px;line-height:1.65;">
            <p style="margin:0;">À très vite,<br/>L'équipe Aurentia.agency</p>
          </td></tr>
          <!-- Footer -->
          <tr><td style="padding:20px 36px 32px;">
            <div style="border-top:1px solid ${C.border};padding-top:16px;font-size:13px;color:${C.muted};line-height:1.5;">
              Une question ? Répondez simplement à cet email, on vous lit.
            </div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}

/** Mail de confirmation envoyé au prospect après sa demande de pré-audit. */
async function sendClientEmail(site: string, email: string) {
  if (!RESEND_API_KEY) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `Aurentia.agency <${FROM_EMAIL}>`,
      to: [email],
      reply_to: REPLY_TO,
      subject: "Votre pré-audit gratuit est en route 🚀",
      html: buildEmailHtml(site),
    }),
  });
}

/** Notification Slack à l'équipe pour qu'aucun lead ne passe à la trappe. */
async function notifySlack(site: string, email: string, source: string) {
  if (!SLACK_WEBHOOK_URL) return;
  await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `🔔 *Nouveau pré-audit gratuit*\n• Site : ${site}\n• Email : ${email}\n• Source : ${source}`,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { site, email, source } = (await req.json()) as {
      site?: string;
      email?: string;
      source?: string | null;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (!site || site.trim().length < 3) {
      return NextResponse.json({ error: "invalid_site" }, { status: 400 });
    }

    const cleanSite = site.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSource = source ?? "page-audit";

    // Les deux envois en parallèle. On ne bloque pas le visiteur si l'un échoue :
    // on logue mais on renvoie quand même { ok: true }.
    const results = await Promise.allSettled([
      sendClientEmail(cleanSite, cleanEmail),
      notifySlack(cleanSite, cleanEmail, cleanSource),
    ]);
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`[api/audit] ${i === 0 ? "email" : "slack"} failed`, r.reason);
      }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/audit]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
