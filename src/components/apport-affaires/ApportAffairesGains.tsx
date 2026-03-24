"use client";

import { Section } from "@/components/ui/Section";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { cn } from "@/lib/utils";
import { apportGainsSection, apportGains } from "@/data/apport-affaires-content";

export function ApportAffairesGains() {
  return (
    <Section theme="dark" className="py-28 md:py-36">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-primary/[0.04] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <TextGradientReveal
            text={apportGainsSection.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/50 text-base md:text-lg leading-relaxed">
              {apportGainsSection.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Gains grid */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {apportGains.map((gain, i) => (
            <BlurReveal key={gain.type} delay={i * 0.15}>
              <SpotlightCard
                className={cn(
                  "p-8 h-full transition-all duration-700 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(201,100,66,0.08)]",
                  gain.span === 2 && "md:col-span-2"
                )}
              >
                <div className="relative z-10 flex flex-col gap-4">
                  {/* Type label */}
                  <span className="text-sm font-medium tracking-wide uppercase text-foreground/40">
                    {gain.type}
                  </span>

                  {/* Project price */}
                  <p className="text-foreground/50 text-sm">
                    Projet&nbsp;:&nbsp;
                    <span className="text-foreground/70 font-medium">
                      {gain.projectPrice.toLocaleString("fr-FR")}&nbsp;&euro;
                    </span>
                  </p>

                  {/* Commission — hero number with gradient */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-foreground/40 font-medium">
                      Votre commission&nbsp;:
                    </span>
                    <NumberMorph
                      value={gain.commission}
                      suffix="€"
                      className={cn(
                        "font-mono font-black bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmerGradient_3s_linear_infinite]",
                        gain.span === 2 ? "text-4xl" : "text-3xl"
                      )}
                    />
                  </div>

                  {/* Detail */}
                  <p className="text-foreground/40 text-sm leading-relaxed mt-1">
                    {gain.detail}
                  </p>
                </div>
              </SpotlightCard>
            </BlurReveal>
          ))}
        </div>

        {/* Note */}
        <BlurReveal delay={0.6}>
          <p className="text-center text-foreground/40 text-sm leading-relaxed mt-12 max-w-2xl mx-auto">
            {apportGainsSection.note}
          </p>
        </BlurReveal>
      </div>
    </Section>
  );
}
