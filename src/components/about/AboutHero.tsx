"use client";

import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { aboutHeroContent } from "@/data/about-content";

export function AboutHero() {
  return (
    <Section
      className="relative h-screen flex items-center overflow-hidden"
      containerClassName="flex flex-col items-center justify-center text-center"
    >
      <SectionBackground
        showGrid
        gridOpacity={0.1}
        gridFadeDirection="bottom"
        orbs={[
          { color: "orange", position: "top-[20%] left-[10%]", size: "w-[500px] h-[500px]", opacity: "[0.08]" },
          { color: "violet", position: "top-[40%] right-[5%]", size: "w-[400px] h-[400px]", opacity: "[0.05]" },
          { color: "cyan", position: "bottom-[10%] left-[40%]", size: "w-[350px] h-[350px]", opacity: "[0.04]" },
        ]}
      />

      <div className="relative z-10">
        {/* Badge */}
        <BlurReveal delay={0.5}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent-primary/15 bg-foreground/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(201,100,66,0.08)]">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_12px_rgba(201,100,66,0.6)]" />
            <span className="text-sm font-mono tracking-wider text-foreground-muted uppercase">
              {aboutHeroContent.badge}
            </span>
          </div>
        </BlurReveal>

        {/* H1 — short, no orange */}
        <TextReveal
          elementType="h1"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.9] text-foreground max-w-4xl justify-center"
          delay={0.2}
        >
          {"20 ans d'expertise. L'IA en plus."}
        </TextReveal>

        {/* Subtitle — BlurReveal */}
        <BlurReveal delay={0.3} className="mt-8 max-w-4xl">
          <p className="text-base md:text-lg text-foreground-dim leading-relaxed">
            {aboutHeroContent.subtitle}
          </p>
        </BlurReveal>
      </div>
    </Section>
  );
}
