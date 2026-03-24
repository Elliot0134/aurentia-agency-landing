"use client";

import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { formationVision } from "@/data/formation-content";

export function FormationVision() {
  return (
    <Section theme="transparent" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <BlurReveal>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent-primary/15 bg-foreground/5 backdrop-blur-md mb-8">
            <span className="text-sm font-mono tracking-wider text-foreground-muted uppercase">
              {formationVision.badge}
            </span>
          </div>
        </BlurReveal>

        {/* Title */}
        <TextReveal
          text={formationVision.title}
          elementType="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12 leading-tight"
        />

        {/* Paragraphs */}
        <div className="space-y-8">
          {formationVision.paragraphs.map((para, i) => (
            <BlurReveal key={i} delay={i * 0.15}>
              <TextGradientReveal
                text={para}
                elementType="p"
                className="text-base md:text-lg leading-[1.8] text-foreground-dim"
              />
            </BlurReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
