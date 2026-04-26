// src/components/v2/ressources/sections/claude/SectionChoisirPlan.tsx
"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { plans, planQuiz, type PlanQuizOption } from "@/data/v2/implementer-claude";
import { cn } from "@/lib/utils";

const RANK: Record<PlanQuizOption["value"], number> = {
  free: 0,
  pro: 1,
  max100: 2,
  max200: 3,
  team: 4,
  enterprise: 5,
};

const PLAN_BY_VALUE: Record<PlanQuizOption["value"], string> = {
  free: "Free",
  pro: "Pro",
  max100: "Max 5×",
  max200: "Max 20×",
  team: "Team",
  enterprise: "Enterprise",
};

export function SectionChoisirPlan() {
  const [a1, setA1] = useState<PlanQuizOption["value"] | null>(null);
  const [a2, setA2] = useState<PlanQuizOption["value"] | null>(null);
  const [a3, setA3] = useState<PlanQuizOption["value"] | null>(null);

  const reco = useMemo(() => {
    if (!a1 || !a2 || !a3) return null;
    if (a1 === "team") return "team";
    if (a1 === "enterprise") return "enterprise";
    const candidates = [a2, a3];
    return candidates.reduce((acc, v) => (RANK[v] > RANK[acc] ? v : acc), "pro");
  }, [a1, a2, a3]);

  const recoLabel = reco ? PLAN_BY_VALUE[reco] : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Quiz */}
      <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Quiz 2 min
        </p>
        <h3 className="mb-6 font-heading text-xl text-foreground md:text-2xl">
          Réponds aux 3 questions, on te dit quel plan prendre
        </h3>

        <div className="flex flex-col gap-6">
          <Question
            label="1. Tu es seul ou en équipe ?"
            options={planQuiz.q1.options}
            value={a1}
            onChange={setA1}
          />
          <Question
            label="2. Combien d'heures/jour tu passes sur Claude ?"
            options={planQuiz.q2.options}
            value={a2}
            onChange={setA2}
          />
          <Question
            label="3. Tu fais surtout du…"
            options={planQuiz.q3.options}
            value={a3}
            onChange={setA3}
          />
        </div>

        {recoLabel && (
          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-accent-primary/30 bg-accent-primary/[0.07] p-5">
            <Sparkles className="size-5 shrink-0 text-accent-primary" aria-hidden />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                Notre reco
              </p>
              <p className="text-base text-foreground md:text-lg">
                Prends le plan{" "}
                <strong className="font-bold text-accent-primary">{recoLabel}</strong>. Détail ci-dessous.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Plans grid */}
      <div className="grid gap-3 md:grid-cols-3">
        {plans.map((p) => {
          const isReco = recoLabel === p.name;
          return (
            <div
              key={p.name}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border p-5 transition-all duration-500 ease-in-out",
                isReco
                  ? "border-accent-primary/50 bg-accent-primary/[0.06]"
                  : "border-foreground/10 bg-foreground/[0.02]"
              )}
            >
              <div className="flex items-baseline justify-between">
                <h4 className="font-heading text-lg text-foreground">{p.name}</h4>
                {isReco && (
                  <span className="rounded-full bg-accent-primary/15 px-2.5 py-0.5 text-sm font-semibold text-accent-primary">
                    Notre reco
                  </span>
                )}
              </div>
              <p>
                <span className="font-heading text-2xl font-bold text-foreground">{p.price}</span>
                <span className="text-sm text-foreground/55">{p.period}</span>
              </p>
              <p className="text-sm text-foreground/65">{p.forWho}</p>
              <ul className="mt-1 flex flex-col gap-1.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-foreground/75">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Règle d'or */}
      <blockquote className="border-l-2 border-accent-primary pl-5">
        <p className="font-heading text-lg leading-snug text-foreground md:text-xl">
          « Surpayer (Max $200 sur usage modéré) et sous-payer (Pro $20 sur usage intensif) coûtent tous les deux cher. Mappe le profil au plan, pas l&apos;inverse. »
        </p>
        <footer className="mt-2 text-sm text-foreground/55">— Règle d&apos;or pricing Claude</footer>
      </blockquote>
    </div>
  );
}

function Question({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: PlanQuizOption[];
  value: PlanQuizOption["value"] | null;
  onChange: (v: PlanQuizOption["value"]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-base font-semibold text-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value + o.label}
              type="button"
              onClick={() => onChange(o.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-500 ease-in-out",
                active
                  ? "border-accent-primary bg-accent-primary text-white"
                  : "border-foreground/15 bg-background text-foreground/75 hover:border-foreground/30"
              )}
            >
              {active && <ArrowRight className="size-4" aria-hidden />}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
