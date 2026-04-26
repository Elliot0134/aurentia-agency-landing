// src/components/v2/ressources/sections/claude/SectionClaudeMd.tsx
"use client";

import { useState } from "react";
import { Briefcase, Building2, User } from "lucide-react";
import {
  claudeMdAgence,
  claudeMdGeneratorPrompt,
  claudeMdPme,
  claudeMdSoloFounder,
} from "@/data/v2/implementer-claude";
import { CopyableBlock } from "../../CopyableBlock";
import { cn } from "@/lib/utils";

type Variant = "solo" | "agence" | "pme";

const VARIANTS: { id: Variant; label: string; icon: typeof User; content: string }[] = [
  { id: "solo", label: "Solo founder", icon: User, content: claudeMdSoloFounder },
  { id: "agence", label: "Agence", icon: Briefcase, content: claudeMdAgence },
  { id: "pme", label: "PME 5-30", icon: Building2, content: claudeMdPme },
];

export function SectionClaudeMd() {
  const [variant, setVariant] = useState<Variant>("solo");
  const current = VARIANTS.find((v) => v.id === variant)!;

  return (
    <div className="flex flex-col gap-8">
      <p className="text-base text-foreground/70 md:text-lg">
        Le <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">CLAUDE.md</code> est
        le fichier qui dit à Claude qui tu es, comment te parler, et tes règles non-négos. Sauvegarde-le dans{" "}
        <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">~/.claude/CLAUDE.md</code> (global)
        ou à la racine d&apos;un projet (local). C&apos;est <strong className="text-foreground">le levier #1</strong> pour
        que Claude soit aligné dès le premier prompt.
      </p>

      {/* Generator prompt */}
      <CopyableBlock
        title="Le prompt qui génère ton CLAUDE.md à partir de ton site"
        description="Colle ce prompt dans Claude.ai, remplis les variables, Claude lit ton site et te sort un CLAUDE.md sur-mesure."
        language="markdown"
        content={claudeMdGeneratorPrompt}
      />

      {/* Variant tabs */}
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          3 templates prêts à copier
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {VARIANTS.map((v) => {
            const Icon = v.icon;
            const active = v.id === variant;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariant(v.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-500 ease-in-out",
                  active
                    ? "border-accent-primary bg-accent-primary text-white"
                    : "border-foreground/15 bg-background text-foreground/75 hover:border-foreground/30"
                )}
              >
                <Icon className="size-4" aria-hidden />
                {v.label}
              </button>
            );
          })}
        </div>
        <CopyableBlock language="markdown" content={current.content} />
      </div>
    </div>
  );
}
