"use client";

import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { InfiniteMarquee } from "@/components/animations/InfiniteMarquee";
import { proofStats, proofSectionContent } from "@/data/about-content";

export function AboutProof() {
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden min-h-[60vh]">
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[40%] left-[30%]", size: "w-[500px] h-[500px]", opacity: "[0.04]" },
        ]}
      />

      <div className="relative z-10">
        {/* Section title */}
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-20">
          <TextReveal
            text={proofSectionContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
          />
        </div>

        {/* Counters */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mb-20 md:mb-24">
          {proofStats.map((stat, index) => (
            <BlurReveal key={index} delay={index * 0.15}>
              <div className="relative flex flex-col items-center text-center gap-2">
                <NumberMorph
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-5xl md:text-6xl lg:text-7xl font-mono font-black text-foreground"
                />
                <span className="text-sm md:text-base text-foreground/50">
                  {stat.label}
                </span>
                {/* Accent glow under counter */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-24 h-12 bg-accent-primary/20 blur-2xl rounded-full pointer-events-none" aria-hidden="true" />
              </div>
            </BlurReveal>
          ))}
        </div>

        {/* Tech stack marquee */}
        <div className="max-w-5xl mx-auto">
          <BlurReveal>
            <div className="py-6">
              <InfiniteMarquee
                items={proofSectionContent.stackTechnologies}
                className="text-lg md:text-xl font-semibold tracking-wide text-foreground/40 uppercase"
              />
            </div>
          </BlurReveal>

          <BlurReveal delay={0.3}>
            <p className="text-base md:text-lg text-foreground/50 text-center mt-8 leading-relaxed">
              {proofSectionContent.stackClosing}
            </p>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
