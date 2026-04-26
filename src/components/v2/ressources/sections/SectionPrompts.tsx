// src/components/v2/ressources/sections/SectionPrompts.tsx
import { Sparkles } from "lucide-react";
import { magicPrompt, brainstormSkill } from "@/data/v2/vibe-coding";
import { CopyableBlock } from "../CopyableBlock";
import { EmailGate } from "../EmailGate";

export function SectionPrompts() {
  return (
    <div className="flex flex-col gap-8">
      {/* Featured skill — header simple + EmailGate qui contient teaser + form */}
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
            <Sparkles className="size-5" strokeWidth={1.7} aria-hidden />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
              Le skill du guide
            </p>
            <h3 className="font-heading text-lg text-foreground md:text-xl">
              Co-pilote vibe coding — brainstorm + PRD calibré plateforme
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/65">
              À coller comme custom instruction dans Claude, ChatGPT ou Cursor. Il
              brainstorme l&apos;idée, va lire les docs officielles de la plateforme cible
              (Lovable, Bolt, v0, Stitch, Cursor, Claude Code…) et sort un PRD prêt à
              coller.
            </p>
          </div>
        </div>

        <EmailGate
          resourceId="vibe-coding-skill"
          resourceLabel="le skill brainstorm + PRD plateforme"
          description="On l'envoie par email, et il s'affiche aussi tout de suite ci-dessous."
          ctaLabel="Recevoir le skill"
        >
          <CopyableBlock language={brainstormSkill.language} content={brainstormSkill.content} />
        </EmailGate>
      </div>

      {/* Universal magic prompt — pas de gate */}
      <CopyableBlock
        title={magicPrompt.title}
        description={magicPrompt.description}
        language={magicPrompt.language}
        content={magicPrompt.content}
      />
    </div>
  );
}
