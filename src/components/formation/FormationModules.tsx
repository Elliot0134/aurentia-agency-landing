"use client";

import {
  Terminal,
  MessageSquare,
  Blocks,
  Workflow,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { formationModules, formationModulesNote } from "@/data/formation-content";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  MessageSquare,
  Blocks,
  Workflow,
  Rocket,
};

export function FormationModules() {
  return (
    <Section theme="dark-alt" className="py-28 md:py-36">
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <TextReveal
            text="Ce que vous allez ma&icirc;triser."
            elementType="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground-muted text-lg leading-relaxed">
              Un programme con&ccedil;u par des praticiens. Chaque module est
              forg&eacute; dans des projets r&eacute;els.
            </p>
          </BlurReveal>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {formationModules.map((mod, i) => {
            const Icon = iconMap[mod.icon];
            const isWide = mod.span === 2;
            const isFirst = i === 0;

            return (
              <BlurReveal
                key={i}
                delay={i * 0.15}
                className={cn(isWide && "md:col-span-2")}
              >
                <SpotlightCard
                  className="p-6 md:p-8 h-full flex flex-col gap-4"
                >
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Icon + Badge */}
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent-primary" />
                        </div>
                      )}
                      <span className="text-sm font-mono tracking-wider text-accent-primary/80 uppercase">
                        {mod.badge}
                      </span>
                    </div>

                    {/* Title with optional blinking cursor on first card */}
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                      {mod.title}
                      {isFirst && (
                        <span className="inline-block ml-1 text-accent-primary/60 animate-[terminalBlink_1s_step-end_infinite] font-mono">
                          &#9612;
                        </span>
                      )}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                      {mod.text}
                    </p>
                  </div>
                </SpotlightCard>
              </BlurReveal>
            );
          })}
        </div>

        {/* Note */}
        <BlurReveal delay={0.6}>
          <p className="text-sm text-foreground-muted text-center mt-8 max-w-xl mx-auto italic">
            {formationModulesNote}
          </p>
        </BlurReveal>
      </div>
    </Section>
  );
}
