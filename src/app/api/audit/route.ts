import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ⚠️ PLACEHOLDER — remplace par l'URL de ton webhook n8n dédié au pré-audit.
// Tant que la valeur contient "REMPLACER", aucun POST n'est envoyé (mode démo) :
// la réponse reste { ok: true } pour ne pas bloquer le visiteur.
const AUDIT_WEBHOOK =
  "https://aurentia-agency.app.n8n.cloud/webhook/REMPLACER-preaudit-audit-site";

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

    if (AUDIT_WEBHOOK && !AUDIT_WEBHOOK.includes("REMPLACER")) {
      await fetch(AUDIT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: site.trim(),
          email: email.trim().toLowerCase(),
          source: source ?? "page-audit",
          date: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/audit]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
