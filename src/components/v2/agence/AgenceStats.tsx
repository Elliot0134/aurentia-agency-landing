// src/components/v2/agence/AgenceStats.tsx
"use client";

import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { agenceStats, agenceStatsSection } from "@/data/v2/agence-content";

export function AgenceStats() {
  return (
    <SectionContainer
      id="stats"
      title={agenceStatsSection.title}
      subtitle={agenceStatsSection.subtitle}
      surface
    >
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {agenceStats.map((stat, index) => (
          <BlurReveal key={stat.label} delay={index * 0.15}>
            <div className="relative flex flex-col items-center gap-2 text-center">
              <NumberMorph
                value={stat.value}
                suffix={stat.suffix}
                className="text-5xl font-mono font-black text-foreground md:text-6xl lg:text-7xl"
              />
              <span className="text-sm text-foreground/60 md:text-base">
                {stat.label}
              </span>
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-24 -translate-x-1/2 -translate-y-1/4 rounded-full bg-accent-primary/20 blur-2xl"
                aria-hidden="true"
              />
            </div>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
