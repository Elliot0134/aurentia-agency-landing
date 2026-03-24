"use client";

import { Code, Briefcase, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { formationAudience } from "@/data/formation-content";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Briefcase,
  Users,
};

export function FormationAudience() {
  return (
    <Section theme="transparent" className="py-24 md:py-32">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <TextReveal
            text="Pour qui."
            elementType="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground-muted text-lg leading-relaxed">
              Que vous codiez depuis 10 ans ou que vous d&eacute;couvriez
              l&apos;IA, il y a un parcours pour vous.
            </p>
          </BlurReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {formationAudience.map((persona, i) => {
            const Icon = iconMap[persona.icon];

            return (
              <BlurReveal key={i} delay={i * 0.2}>
                <SpotlightCard className="p-6 md:p-8 h-full flex flex-col gap-4">
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Icon */}
                    {Icon && (
                      <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent-primary" />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {persona.title}
                    </h3>

                    {/* Text */}
                    <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                      {persona.text}
                    </p>

                    {/* Badge */}
                    <span className="inline-flex self-start px-3 py-1 rounded-full text-sm font-medium bg-accent-primary/10 text-accent-primary">
                      {persona.badge}
                    </span>
                  </div>
                </SpotlightCard>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
