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
  const lineRef = useRef<SVGPathElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;

    const length = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Line draw animation
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 75%",
        end: "bottom 60%",
        scrub: true,
      },
    });
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
        <div ref={timelineRef} className="max-w-5xl mx-auto">
          {/* Desktop: horizontal 4-col grid with line draw */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
            {/* Connecting line — draw animation */}
            <svg
              className="absolute top-[64px] left-[12.5%] right-[12.5%] w-[75%] h-[2px] overflow-visible"
              preserveAspectRatio="none"
            >
              <path
                ref={lineRef}
                d="M 0 1 L 1000 1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-foreground/10"
              />
            </svg>

            {processContent.steps.map((step, idx) => {
              const Icon = iconMap[step.icon];
              return (
                <BlurReveal key={step.number} delay={idx * 0.2}>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Number + icon node — with scale bounce */}
                    <div className="w-[128px] h-[128px] rounded-3xl border border-foreground/5 bg-foreground/[0.02] flex flex-col items-center justify-center mb-8 transition-all duration-700 ease-in-out hover:border-accent-primary/20 hover:bg-accent-primary/[0.03] hover:scale-105 hover:shadow-[0_0_30px_rgba(201,100,66,0.1)]">
                      <span className="text-2xl font-bold font-mono text-accent-primary/80 mb-1">
                        {step.number}
                      </span>
                      {Icon && (
                        <Icon
                          className="w-5 h-5 text-foreground/40"
                          strokeWidth={1.5}
                        />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>

                    {/* Text */}
                    <p className="text-sm md:text-base leading-relaxed text-foreground/60 mb-4">
                      {step.text}
                    </p>

                    {/* Duration */}
                    <span className="text-sm font-mono text-accent-primary/70 px-4 py-1.5 rounded-full border border-accent-primary/15 bg-accent-primary/[0.04]">
                      {step.duration}
                    </span>
                  </div>
                </BlurReveal>
              );
            })}
          </div>

          {/* Mobile / Tablet: vertical timeline */}
          <div className="lg:hidden space-y-10 relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-foreground/10" />

            {processContent.steps.map((step, idx) => {
              const Icon = iconMap[step.icon];
              return (
                <BlurReveal key={step.number} delay={idx * 0.2}>
                  <div className="relative flex gap-6 pl-14">
                    {/* Dot on the timeline */}
                    <div className="absolute left-4 top-2 w-4 h-4 rounded-full border-2 border-accent-primary/40 bg-background" />

                    <SpotlightCard className="flex-1 p-7">
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xl font-bold font-mono text-accent-primary/80">
                            {step.number}
                          </span>
                          {Icon && (
                            <Icon
                              className="w-5 h-5 text-foreground/40"
                              strokeWidth={1.5}
                            />
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-3">
                          {step.title}
                        </h3>

                        <p className="text-sm md:text-base leading-relaxed text-foreground/60 mb-4">
                          {step.text}
                        </p>

                        <span className="text-sm font-mono text-accent-primary/70 px-4 py-1.5 rounded-full border border-accent-primary/15 bg-accent-primary/[0.04]">
                          {step.duration}
                        </span>
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
