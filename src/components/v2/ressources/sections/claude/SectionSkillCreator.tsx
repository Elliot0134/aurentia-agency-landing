// src/components/v2/ressources/sections/claude/SectionSkillCreator.tsx
import { Sparkles } from "lucide-react";
import { skillCreatorMetaPrompt } from "@/data/v2/implementer-claude";
import { CopyableBlock } from "../../CopyableBlock";

export function SectionSkillCreator() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
          <Sparkles className="size-5" strokeWidth={1.7} aria-hidden />
        </div>
        <p className="text-base text-foreground/70 md:text-lg">
          Le pattern méta : <strong className="text-foreground">Claude crée tes Skills à ta place</strong>. Tu
          décris un process que tu répètes 3+ fois/semaine, Claude pose les bonnes questions, te sort un{" "}
          <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">SKILL.md</code> propre,
          et te donne la commande pour l&apos;installer.
        </p>
      </div>

      <CopyableBlock
        title="Le meta-prompt skill creator"
        description="Colle dans Claude Code (ou Claude.ai). Il pose 7 questions, génère le SKILL.md, et te donne la commande mkdir + cat pour l'installer."
        language="markdown"
        content={skillCreatorMetaPrompt}
      />

      <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Workflow recommandé
        </p>
        <ol className="mt-3 flex flex-col gap-2 text-base text-foreground/80">
          <li>
            <strong className="text-foreground">1.</strong> Identifie 1 process que tu répètes 3+ fois/semaine
            (audit, recap, propale, brief, follow-up…).
          </li>
          <li>
            <strong className="text-foreground">2.</strong> Lance le meta-prompt, réponds aux 7 questions
            comme à un junior qui doit reproduire ton process.
          </li>
          <li>
            <strong className="text-foreground">3.</strong> Récupère le SKILL.md, drag-drop dans{" "}
            <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">~/.claude/skills/</code>.
          </li>
          <li>
            <strong className="text-foreground">4.</strong> Test sur 3 cas différents. Ajuste la sortie si pas
            calibrée. <strong className="text-foreground">Recommence</strong> pour le process suivant.
          </li>
        </ol>
        <p className="mt-4 text-sm text-foreground/60">
          Cible :{" "}
          <strong className="font-semibold text-foreground/75">5-10 Skills custom à 3 mois</strong> = ta
          machine de guerre opérationnelle, alignée à 100% sur ta façon de bosser.
        </p>
      </div>
    </div>
  );
}
