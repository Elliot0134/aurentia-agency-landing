import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const N8N_WEBHOOK =
  "https://aurentia-agency.app.n8n.cloud/webhook/lead-magnet-aurentia-agency-landing";

export async function POST(req: NextRequest) {
  try {
    const { email, resource, source, newsletter } = (await req.json()) as {
      email?: string;
      resource?: string;
      source?: string | null;
      newsletter?: boolean;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        resource: resource ?? null,
        source: source ?? null,
        newsletter: newsletter ?? true,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ressources/request]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
