import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Secrets en variables d'env (cf. .env.local + Vercel). Jamais hardcodés.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.AUDIT_FROM_EMAIL ?? "audit@aurentia.fr";
const REPLY_TO = process.env.AUDIT_REPLY_TO ?? "contact@aurentia.fr";
const SLACK_WEBHOOK_URL = process.env.SLACK_AUDIT_WEBHOOK_URL;

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
      html: `
        <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#1a1a18;max-width:560px;margin:0 auto;">
          <p>Bonjour,</p>
          <p>Merci pour votre demande de pré-audit gratuit pour <strong>${site}</strong>.</p>
          <p>Notre équipe analyse votre site et vous revient sous <strong>48h ouvrées</strong> avec vos premiers points d'amélioration (SEO, performance, UX, conversion).</p>
          <p>En attendant, si vous voulez le diagnostic complet et chiffré tout de suite, l'audit approfondi à 99 € HT couvre 7 domaines en détail.</p>
          <p>À très vite,<br/>L'équipe Aurentia.agency</p>
          <hr style="border:none;border-top:1px solid #e5e5e0;margin:24px 0;"/>
          <p style="font-size:14px;color:#6b6b66;">Une question ? Répondez simplement à cet email.</p>
        </div>
      `,
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
