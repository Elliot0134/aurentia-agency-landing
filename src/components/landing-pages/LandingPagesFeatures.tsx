"use client";

import {
  Paintbrush,
  Sparkles,
  Smartphone,
  Search,
  Gauge,
  Moon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { featuresContent } from "@/data/landing-pages-content";

const iconMap: Record<string, LucideIcon> = {
  Paintbrush,
  Sparkles,
  Smartphone,
  Search,
  Gauge,
  Moon,
};

export function LandingPagesFeatures() {
  return (
    <Section className="py-28 md:py-36 relative">
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <TextReveal
            text={featuresContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 justify-center"
          />
          <BlurReveal delay={0.15}>
            <p className="text-lg md:text-xl text-foreground/60">
              {featuresContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Bento grid — cards with gradient border effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {featuresContent.cards.map((card, idx) => {
            const Icon = iconMap[card.icon];
            return (
              <BlurReveal key={card.icon} delay={idx * 0.12}>
                <div className="group relative rounded-2xl p-px bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 transition-all duration-700 hover:from-accent-primary/30 hover:via-accent-primary/5 hover:to-accent-secondary/20">
                  <SpotlightCard className="p-8 md:p-10 h-full rounded-[15px]">
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon — colored */}
                      <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-6 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(201,100,66,0.15)]">
                        {Icon && (
                          <Icon
                            className="w-6 h-6 text-accent-primary"
                            strokeWidth={1.5}
                          />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                        {card.title}
                      </h3>

                      {/* Text */}
                      <p className="text-sm md:text-base leading-relaxed text-foreground/60">
                        {card.text}
                      </p>
                    </div>
                  </SpotlightCard>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
