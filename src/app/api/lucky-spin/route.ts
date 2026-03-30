import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ── Prize definitions (server-side source of truth) ── */
const PRIZES = [
  { label: "Skills Claude Code", weight: 45, isLoss: false },
  { label: "Perdu", weight: 10, isLoss: true },
  { label: "Formation Claude", weight: 40, isLoss: false },
  { label: "50€ Crédits", weight: 0, isLoss: false },
  { label: "Skills Claude", weight: 0, isLoss: false },
  { label: "Perdu", weight: 5, isLoss: true },
];

function pickPrize(): number {
  const weighted = PRIZES
    .map((p, i) => ({ index: i, weight: p.weight }))
    .filter((p) => p.weight > 0);
  const total = weighted.reduce((s, p) => s + p.weight, 0);
  let rand = Math.random() * total;
  for (const p of weighted) {
    rand -= p.weight;
    if (rand <= 0) return p.index;
  }
  return 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email ?? "").trim().toLowerCase();

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Server-side prize pick
    const prizeIndex = pickPrize();
    const prizeLabel = PRIZES[prizeIndex].label;

    // Log in DB
    const { error: insertError } = await supabase
      .from("lucky_spin_entries")
      .insert({ email, prize_label: prizeLabel, prize_index: prizeIndex });

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    return NextResponse.json({ prizeIndex, prizeLabel });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
