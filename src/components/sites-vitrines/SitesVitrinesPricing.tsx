"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { NumberMorph } from "@/components/animations/NumberMorph";
import {
  pricingContent,
  pricingIncluded,
} from "@/data/sites-vitrines-content";
import { Check } from "lucide-react";

export function SitesVitrinesPricing() {
  return (
    <Section className="min-h-[50vh]">
      <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
        {/* Badge */}
        <BlurReveal className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10">
            {pricingContent.badge}
          </span>
        </BlurReveal>

        <TextGradientReveal
          text={pricingContent.title}
          elementType="h2"
          className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
        />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Glow behind card */}
        <div
          className="absolute inset-0 -inset-x-8 -inset-y-4 rounded-3xl blur-[60px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(201,100,66,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <SpotlightCard className="relative p-8 md:p-12 backdrop-blur-sm border-foreground/[0.08]">
          <div className="relative z-10">
            {/* Price — gradient text, larger */}
            <div className="text-center mb-8 md:mb-10">
              <BlurReveal delay={0.2}>
                <p className="text-base md:text-lg text-foreground/50 mb-2">
                  {pricingContent.priceLabel}
                </p>
              </BlurReveal>
              <div className="flex items-baseline justify-center">
                <NumberMorph
                  value={pricingContent.priceValue}
                  suffix={pricingContent.priceSuffix}
                  className="text-5xl md:text-6xl font-mono font-black bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
                />
              </div>
              <BlurReveal delay={0.3} className="mt-4">
                <p className="text-sm text-foreground/40 max-w-lg mx-auto leading-relaxed">
                  {pricingContent.subtitle}
                </p>
              </BlurReveal>
            </div>

            {/* Divider */}
            <div
              className="w-full h-px mb-8 md:mb-10"
              style={{
                background: "linear-gradient(90deg, transparent 0%, var(--color-foreground) 50%, transparent 100%)",
                opacity: 0.1,
              }}
            />

            {/* Included list */}
            <BlurReveal stagger={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {pricingIncluded.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-orange-500" />
                    </div>
                    <span className="text-sm text-foreground/60">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </BlurReveal>

            {/* Note */}
            <BlurReveal className="mt-8 md:mt-10" delay={0.4}>
              <div className="text-center">
                <p className="text-sm text-foreground/40">
                  {pricingContent.note}{" "}
                  <Link
                    href={pricingContent.noteLink}
                    className="text-orange-500 font-semibold transition-colors duration-500 hover:text-orange-400"
                  >
                    Voir les packs conciergeries &rarr;
                  </Link>
                </p>
              </div>
            </BlurReveal>
          </div>
        </SpotlightCard>
      </div>
    </Section>
  );
}
