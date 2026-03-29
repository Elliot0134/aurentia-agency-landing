"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  PhoneCall,
  Layers,
  Code,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { processContent } from "@/data/landing-pages-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, LucideIcon> = {
  PhoneCall,
  Layers,
  Code,
  Rocket,
};

export function LandingPagesProcess() {
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!lineRef.current || !timelineRef.current) return;

    // Animated progress line
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  });

  return (
    <Section className="py-28 md:py-36 relative">
      <SectionBackground variant="base" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <BlurReveal>
            <span className="inline-block text-sm font-mono uppercase tracking-widest px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 mb-8">
              {processContent.badge}
            </span>
          </BlurReveal>

          <TextGradientReveal
            text={processContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 justify-center"
          />

          <BlurReveal delay={0.15}>
            <p className="text-lg md:text-xl text-foreground/60">
              {processContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-6xl mx-auto">
          {/* Desktop: horizontal layout */}
          <div className="hidden lg:block">
            {/* Connecting line */}
            <div className="relative mx-auto mb-12" style={{ width: "75%", marginLeft: "12.5%" }}>
              {/* Background track */}
              <div className="h-px w-full bg-foreground/10" />
              {/* Animated gradient progress */}
              <div
                ref={lineRef}
                className="absolute inset-0 h-px origin-left bg-gradient-to-r from-accent-primary/60 via-accent-secondary/40 to-accent-primary/60"
              />

              {/* Step dots on the line */}
              <div className="absolute inset-0 flex justify-between" style={{ top: "-6px" }}>
                {processContent.steps.map((step, idx) => (
                  <BlurReveal key={step.number} delay={idx * 0.15}>
                    <div className="relative flex flex-col items-center">
                      {/* Glow ring */}
                      <div className="w-3.5 h-3.5 rounded-full bg-background border-2 border-accent-primary/40 transition-all duration-700 ease-in-out hover:border-accent-primary hover:shadow-[0_0_16px_rgba(201,100,66,0.4)]" />
                    </div>
                  </BlurReveal>
                ))}
              </div>
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-4 gap-6">
              {processContent.steps.map((step, idx) => {
                const Icon = iconMap[step.icon];
                return (
                  <BlurReveal key={step.number} delay={idx * 0.2}>
                    <SpotlightCard className="h-full p-6 group">
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Number + Icon row */}
                        <div className="flex items-center justify-between mb-5">
                          <span className="text-3xl font-bold font-mono bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                            {step.number}
                          </span>
                          {Icon && (
                            <div className="w-10 h-10 rounded-xl bg-accent-primary/[0.06] border border-accent-primary/10 flex items-center justify-center transition-all duration-700 ease-in-out group-hover:bg-accent-primary/[0.12] group-hover:border-accent-primary/20">
                              <Icon
                                className="w-5 h-5 text-accent-primary/70 transition-colors duration-700 ease-in-out group-hover:text-accent-primary"
                                strokeWidth={1.5}
                              />
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-foreground mb-3">
                          {step.title}
                        </h3>

                        {/* Text */}
                        <p className="text-sm leading-relaxed text-foreground/50 mb-5 flex-1">
                          {step.text}
                        </p>

                        {/* Duration */}
                        <div className="flex items-center gap-2">
                          <div className="h-px flex-1 bg-foreground/5" />
                          <span className="text-sm font-mono text-accent-primary/60 px-3 py-1 rounded-full border border-accent-primary/10 bg-accent-primary/[0.03]">
                            {step.duration}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </BlurReveal>
                );
              })}
            </div>
          </div>

          {/* Mobile / Tablet: vertical timeline */}
          <div className="lg:hidden space-y-6 relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-primary/40 via-accent-secondary/20 to-accent-primary/40" />

            {processContent.steps.map((step, idx) => {
              const Icon = iconMap[step.icon];
              return (
                <BlurReveal key={step.number} delay={idx * 0.15}>
                  <div className="relative">
                    {/* Dot on the timeline */}
                    <div className="absolute -left-8 top-7 w-[15px] h-[15px] rounded-full border-2 border-accent-primary/40 bg-background" />

                    <SpotlightCard className="p-6 group">
                      <div className="relative z-10">
                        {/* Number + Icon row */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-bold font-mono bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                            {step.number}
                          </span>
                          {Icon && (
                            <div className="w-9 h-9 rounded-xl bg-accent-primary/[0.06] border border-accent-primary/10 flex items-center justify-center">
                              <Icon
                                className="w-4 h-4 text-accent-primary/70"
                                strokeWidth={1.5}
                              />
                            </div>
                          )}
                          <div className="flex-1" />
                          <span className="text-sm font-mono text-accent-primary/60 px-3 py-1 rounded-full border border-accent-primary/10 bg-accent-primary/[0.03]">
                            {step.duration}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-3">
                          {step.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-foreground/50">
                          {step.text}
                        </p>
                      </div>
                    </SpotlightCard>
                  </div>
                </BlurReveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
