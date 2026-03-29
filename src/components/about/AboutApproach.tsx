"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, Hammer, Handshake } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import {
  approachPillars,
  approachSectionContent,
} from "@/data/about-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Cpu,
  Hammer,
  Handshake,
};

// Distinct accent bg for each pillar: orange, ambre, cyan
const iconBgMap: Record<string, string> = {
  orange: "bg-orange-500/10",
  amber: "bg-amber-500/10",
  cyan: "bg-cyan-500/10",
};

const accentMap: Record<string, string> = {
  orange: "text-orange-400",
  amber: "text-amber-400",
  cyan: "text-cyan-400",
};

const glowMap: Record<string, string> = {
  orange: "shadow-orange-500/20",
  amber: "shadow-amber-500/20",
  cyan: "shadow-cyan-500/20",
};

// Orb glow colors matching each pillar accent
const orbGlowMap: Record<string, string> = {
  orange: "bg-orange-500/15",
  amber: "bg-amber-500/12",
  cyan: "bg-cyan-500/12",
};

export function AboutApproach() {
  const iconsRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!iconsRef.current) return;

    const icons = iconsRef.current.querySelectorAll("[data-icon]");

    gsap.fromTo(
      icons,
      { scale: 0.7, rotation: 5, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: iconsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: iconsRef, dependencies: [animationsEnabled] });

  return (
    <Section
      id="approach"
      theme="dark"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[30%] left-[5%]", size: "w-[300px] h-[300px]", opacity: "[0.05]" },
          { color: "cyan", position: "bottom-[20%] right-[10%]", size: "w-[250px] h-[250px]", opacity: "[0.04]" },
        ]}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <TextGradientReveal
            text={approachSectionContent.title}
            elementType="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight justify-center"
          />
        </div>

        {/* Subtitle */}
        <BlurReveal className="text-center mb-16 md:mb-20">
          <p className="text-base md:text-lg text-foreground/40 max-w-xl mx-auto">
            {approachSectionContent.subtitle}
          </p>
        </BlurReveal>

        {/* 3 Pillar Cards */}
        <div ref={iconsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {approachPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon];

            return (
              <BlurReveal key={pillar.title} delay={index * 0.2} className="h-full">
                <div className="relative h-full">
                  {/* Subtle glow orb behind card */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-3xl pointer-events-none ${orbGlowMap[pillar.accentColor]}`}
                    aria-hidden="true"
                  />
                  <SpotlightCard className="relative p-8 md:p-10 flex flex-col items-start gap-5 h-full">
                    {/* Icon */}
                    <div
                      data-icon
                      className={`w-12 h-12 rounded-2xl ${iconBgMap[pillar.accentColor]} flex items-center justify-center shadow-lg ${glowMap[pillar.accentColor]}`}
                    >
                      {Icon && (
                        <Icon
                          className={`w-6 h-6 ${accentMap[pillar.accentColor]}`}
                        />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                      {pillar.title}
                    </h3>

                    {/* Text */}
                    <p className="text-sm md:text-base text-foreground/50 leading-relaxed">
                      {pillar.text}
                    </p>
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
