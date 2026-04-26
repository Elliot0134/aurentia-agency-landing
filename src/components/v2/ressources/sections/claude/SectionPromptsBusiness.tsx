// src/components/v2/ressources/sections/claude/SectionPromptsBusiness.tsx
"use client";

import { useMemo, useState } from "react";
import { businessPrompts, type BusinessPrompt } from "@/data/v2/implementer-claude";
import { CopyableBlock } from "../../CopyableBlock";
import { cn } from "@/lib/utils";

const CATEGORIES: BusinessPrompt["category"][] = [
  "Sales",
  "Ops",
  "Marketing",
  "Finance",
  "RH",
];

export function SectionPromptsBusiness() {
  const [cat, setCat] = useState<BusinessPrompt["category"] | "all">("all");

  const filtered = useMemo(
    () => (cat === "all" ? businessPrompts : businessPrompts.filter((p) => p.category === cat)),
    [cat]
  );

  return (
    <div className="flex flex-col gap-8">
      <p className="text-base text-foreground/70 md:text-lg">
        15 prompts <strong className="text-foreground">déjà calibrés</strong>, classés par fonction métier.
        Copie, adapte les variables{" "}
        <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">[VARIABLE]</code>, lance
        dans Claude. Sauvegarde tes préférés dans ton launcher (Raycast, Alfred) pour y accéder en 2 secondes.
      </p>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(["all", ...CATEGORIES] as const).map((c) => {
          const active = c === cat;
          const label = c === "all" ? "Tous" : c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-500 ease-in-out",
                active
                  ? "border-accent-primary bg-accent-primary text-white"
                  : "border-foreground/15 bg-background text-foreground/75 hover:border-foreground/30"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((p) => (
          <CopyableBlock
            key={p.title}
            title={`${p.category} — ${p.title}`}
            language="markdown"
            content={p.content}
          />
        ))}
      </div>
    </div>
  );
}
