// src/components/v2/agence/AgenceApproach.tsx
import { Cpu, Hammer, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  agenceApproach,
  agenceApproachSection,
  type AgenceApproachPillar,
} from "@/data/v2/agence-content";

const ICON_MAP: Record<AgenceApproachPillar["icon"], LucideIcon> = {
  Cpu,
  Hammer,
  Handshake,
};

const ICON_BG_MAP: Record<AgenceApproachPillar["accentColor"], string> = {
  orange: "bg-orange-500/10 text-orange-500",
  amber: "bg-amber-500/10 text-amber-500",
  cyan: "bg-cyan-500/10 text-cyan-500",
};

const ORB_GLOW_MAP: Record<AgenceApproachPillar["accentColor"], string> = {
  orange: "bg-orange-500/15",
  amber: "bg-amber-500/12",
  cyan: "bg-cyan-500/12",
};

export function AgenceApproach() {
  return (
    <SectionContainer
      id="approche"
      title={agenceApproachSection.title}
      subtitle={agenceApproachSection.subtitle}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {agenceApproach.map((pillar, index) => {
          const Icon = ICON_MAP[pillar.icon];

          return (
            <BlurReveal key={pillar.title} delay={index * 0.15} className="h-full">
              <div className="relative h-full">
                <div
                  className={`pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${ORB_GLOW_MAP[pillar.accentColor]}`}
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col items-start gap-5 rounded-2xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] p-8 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-sm md:p-10">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${ICON_BG_MAP[pillar.accentColor]}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/55 md:text-base">
                    {pillar.text}
                  </p>
                </div>
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
