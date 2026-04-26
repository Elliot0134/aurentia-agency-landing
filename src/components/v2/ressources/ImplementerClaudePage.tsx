// src/components/v2/ressources/ImplementerClaudePage.tsx
"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";
import { PageHeroCentered } from "@/components/v2/shared/PageHeroCentered";
import { implementerClaudeHero, implementerClaudeToc } from "@/data/v2/implementer-claude";
import { RichAccordion } from "./RichAccordion";
import { SectionChoisirPlan } from "./sections/claude/SectionChoisirPlan";
import { SectionProduits } from "./sections/claude/SectionProduits";
import { SectionClaudeMd } from "./sections/claude/SectionClaudeMd";
import { SectionMemory } from "./sections/claude/SectionMemory";
import { SectionMcp } from "./sections/claude/SectionMcp";
import { SectionContext7 } from "./sections/claude/SectionContext7";
import { SectionSkills } from "./sections/claude/SectionSkills";
import { SectionSkillCreator } from "./sections/claude/SectionSkillCreator";
import { SectionPromptsBusiness } from "./sections/claude/SectionPromptsBusiness";
import { Section14Jours } from "./sections/claude/Section14Jours";
import { SectionRisquesClaude } from "./sections/claude/SectionRisquesClaude";
import { SectionCTAFinalClaude } from "./sections/claude/SectionCTAFinalClaude";

const SECTION_RENDERERS: Record<string, ComponentType> = {
  "choisir-plan": SectionChoisirPlan,
  produits: SectionProduits,
  "claude-md": SectionClaudeMd,
  memory: SectionMemory,
  mcp: SectionMcp,
  context7: SectionContext7,
  skills: SectionSkills,
  "skill-creator": SectionSkillCreator,
  prompts: SectionPromptsBusiness,
  "14-jours": Section14Jours,
  risques: SectionRisquesClaude,
};

export function ImplementerClaudePage() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash || !implementerClaudeToc.some((e) => e.id === hash)) return;
    const id = window.requestAnimationFrame(() => {
      setOpenIds((prev) => {
        if (prev.has(hash)) return prev;
        const next = new Set(prev);
        next.add(hash);
        return next;
      });
      window.setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  const allOpen = openIds.size === implementerClaudeToc.length;
  const toggleAll = useCallback(() => {
    setOpenIds(allOpen ? new Set() : new Set(implementerClaudeToc.map((e) => e.id)));
  }, [allOpen]);

  return (
    <>
      <PageHeroCentered
        eyebrow={implementerClaudeHero.eyebrow}
        headline={implementerClaudeHero.headline}
        subHeadline={implementerClaudeHero.subHeadline}
        cta={implementerClaudeHero.cta}
      />

      <section className="w-full px-6 pb-12 pt-4 md:px-12 md:pb-16">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={toggleAll}
              className="text-sm font-medium text-foreground/60 underline-offset-4 transition-colors duration-500 ease-in-out hover:text-accent-primary hover:underline"
            >
              {allOpen ? "Tout fermer" : "Tout ouvrir"}
            </button>
          </div>
          <div className="flex min-w-0 flex-col">
            {implementerClaudeToc.map((entry) => {
              const Renderer = SECTION_RENDERERS[entry.id];
              if (!Renderer) return null;
              return (
                <RichAccordion
                  key={entry.id}
                  id={entry.id}
                  title={entry.label}
                  open={openIds.has(entry.id)}
                  onToggle={() => toggle(entry.id)}
                >
                  <Renderer />
                </RichAccordion>
              );
            })}
          </div>
        </div>
      </section>

      <SectionCTAFinalClaude />
    </>
  );
}
