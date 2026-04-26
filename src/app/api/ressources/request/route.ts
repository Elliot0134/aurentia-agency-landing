import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    const { error } = await supabaseAdmin.rpc("agency_register_lead", {
      p_email: email.trim().toLowerCase(),
      p_resource: resource ?? null,
      p_source: source ?? null,
      p_newsletter: newsletter ?? true,
    });

    if (error) {
      console.error("[agency_register_lead]", error);
      return NextResponse.json({ error: "db_error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ressources/request]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
