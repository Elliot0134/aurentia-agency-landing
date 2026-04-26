// src/components/v2/ressources/sections/claude/SectionSkills.tsx
"use client";

import { useState } from "react";
import { businessSkills } from "@/data/v2/implementer-claude";
import { CopyableBlock } from "../../CopyableBlock";
import { cn } from "@/lib/utils";

export function SectionSkills() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = businessSkills[activeIdx];

  return (
    <div className="flex flex-col gap-8">
      <p className="text-base text-foreground/70 md:text-lg">
        Un <strong className="text-foreground">Skill</strong>, c&apos;est un fichier markdown qui apprend à Claude un
        process métier (faire un audit site, drafter une propale, gérer un email client). Tu copies, tu
        sauvegardes dans{" "}
        <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">~/.claude/skills/</code>, et
        Claude le charge automatiquement quand le contexte matche.
      </p>

      {/* Skill tabs */}
      <div className="flex flex-wrap gap-2">
        {businessSkills.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === activeIdx;
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-500 ease-in-out",
                isActive
                  ? "border-accent-primary bg-accent-primary text-white"
                  : "border-foreground/15 bg-background text-foreground/75 hover:border-foreground/30"
              )}
            >
              <Icon className="size-4" aria-hidden />
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
          <h4 className="font-heading text-lg text-foreground">{active.name}</h4>
          <p className="mt-1 text-sm text-foreground/70">{active.tagline}</p>
          <p className="mt-3 text-sm text-foreground/55">
            <strong className="font-semibold text-foreground/75">Sauvegarde dans :</strong>{" "}
            <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">
              ~/.claude/skills/{active.filename}
            </code>
          </p>
        </div>

        <CopyableBlock language="markdown" content={active.content} />
      </div>
    </div>
  );
}
