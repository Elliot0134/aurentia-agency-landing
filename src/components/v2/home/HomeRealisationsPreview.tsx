"use client";

import Link from "next/link";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { realisationsStatic } from "@/data/realisations/generated";
import { HomeRealisationsPreviewClient } from "./HomeRealisationsPreviewClient";

export function HomeRealisationsPreview() {
  return (
    <SectionContainer id="realisations" title="Nos dernières réalisations">
      <HomeRealisationsPreviewClient projects={realisationsStatic} />

      <BlurReveal delay={0.3}>
        <div className="mt-12 flex justify-center">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90 group/cta"
          >
            Voir nos réalisations
            <svg className="size-4 transition-transform duration-500 group-hover/cta:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
