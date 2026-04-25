// src/components/v2/agence/AgenceFinalCTA.tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { CalModal } from "@/components/shared/CalModal";
import { agenceFinalCTA } from "@/data/v2/agence-content";

export function AgenceFinalCTA() {
  const [calOpen, setCalOpen] = useState(false);

  return (
    <>
      <SectionContainer
        id="contact"
        className="relative overflow-hidden py-28 md:py-40"
        innerClassName="max-w-2xl"
      >
        {/* Decorative orange halo */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                ellipse 70% 80% at 50% 50%,
                color-mix(in srgb, var(--orange-500) 18%, transparent) 0%,
                color-mix(in srgb, var(--orange-500) 10%, transparent) 25%,
                color-mix(in srgb, var(--orange-500) 4%, transparent) 55%,
                transparent 80%
              )`,
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-5 text-center">
          <BlurReveal>
            <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent">
                {agenceFinalCTA.title}
              </span>
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.2} className="max-w-lg">
            <p className="text-base leading-relaxed text-foreground/60 md:text-lg">
              {agenceFinalCTA.subtitle}
            </p>
          </BlurReveal>

          <BlurReveal delay={0.3} className="mt-4">
            <button
              type="button"
              onClick={() => setCalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
            >
              {agenceFinalCTA.cta}
              <span className="transition-transform duration-500 ease-in-out">&rarr;</span>
            </button>
          </BlurReveal>

          <BlurReveal delay={0.4} className="mt-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
              {agenceFinalCTA.proofs.map((proof) => (
                <div
                  key={proof}
                  className="flex items-center gap-2 text-sm text-foreground/40"
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-accent-primary" />
                  <span>{proof}</span>
                </div>
              ))}
            </div>
          </BlurReveal>
        </div>
      </SectionContainer>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
