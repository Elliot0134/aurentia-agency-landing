// src/components/v2/ressources/VibeCodingPage.tsx
"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";
import { PageHeroCentered } from "@/components/v2/shared/PageHeroCentered";
import { vibeCodingHero, vibeCodingToc } from "@/data/v2/vibe-coding";
import { RichAccordion } from "./RichAccordion";
import { SectionConcepts } from "./sections/SectionConcepts";
import { SectionParadigmes } from "./sections/SectionParadigmes";
import { SectionOutils } from "./sections/SectionOutils";
import { SectionDecision } from "./sections/SectionDecision";
import { SectionMethode } from "./sections/SectionMethode";
import { SectionPrompts } from "./sections/SectionPrompts";
import { SectionTips } from "./sections/SectionTips";
import { SectionStack } from "./sections/SectionStack";
import { SectionRisques } from "./sections/SectionRisques";
import { SectionCTAFinal } from "./sections/SectionCTAFinal";

const SECTION_RENDERERS: Record<string, ComponentType> = {
  concepts: SectionConcepts,
  paradigmes: SectionParadigmes,
  outils: SectionOutils,
  decision: SectionDecision,
  methode: SectionMethode,
  prompts: SectionPrompts,
  tips: SectionTips,
  stack: SectionStack,
  risques: SectionRisques,
};

export function VibeCodingPage() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash || !vibeCodingToc.some((e) => e.id === hash)) return;
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

  const allOpen = openIds.size === vibeCodingToc.length;
  const toggleAll = useCallback(() => {
    setOpenIds(allOpen ? new Set() : new Set(vibeCodingToc.map((e) => e.id)));
  }, [allOpen]);

  return (
    <>
      <PageHeroCentered
        eyebrow={vibeCodingHero.eyebrow}
        headline={vibeCodingHero.headline}
        subHeadline={vibeCodingHero.subHeadline}
        cta={vibeCodingHero.cta}
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
            {vibeCodingToc.map((entry) => {
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

      <SectionCTAFinal />
    </>
  );
}
