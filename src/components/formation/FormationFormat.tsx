"use client";

import { Play, FileText, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { formationFormats } from "@/data/formation-content";

const iconMap: Record<string, LucideIcon> = {
  Play,
  FileText,
  Package,
};

export function FormationFormat() {
  return (
    <Section theme="transparent" className="py-24 md:py-32">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <TextReveal
            text="Comment \u00E7a se passe."
            elementType="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground-muted text-lg leading-relaxed">
              Un format con&ccedil;u pour des professionnels qui n&apos;ont pas
              le temps de perdre du temps.
            </p>
          </BlurReveal>
        </div>

        {/* Format blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {formationFormats.map((fmt, i) => {
            const Icon = iconMap[fmt.icon];

            return (
              <BlurReveal key={i} delay={i * 0.2}>
                <div className="flex flex-col gap-4 text-center md:text-left">
                  {/* Icon */}
                  {Icon && (
                    <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mx-auto md:mx-0 transition-transform duration-700 hover:scale-110 hover:rotate-0">
                      <Icon className="w-6 h-6 text-accent-primary" />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {fmt.title}
                  </h3>

                  {/* Text */}
                  <p className="text-sm md:text-base text-foreground-muted leading-relaxed">
                    {fmt.text}
                  </p>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
