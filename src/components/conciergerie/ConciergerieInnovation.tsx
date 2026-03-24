"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { conciergeriesInnovationContent } from "@/data/conciergeries-content";
import type { LucideProps } from "lucide-react";
import { Monitor, BarChart3, Target } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Monitor,
  BarChart3,
  Target,
};

const STEP_NUMBERS = ["01", "02", "03"];

export function ConciergerieInnovation() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardsRef.current) return;

    // Animate step number glow pulse on each card
    const glows = cardsRef.current.querySelectorAll(".step-glow");
    glows.forEach((glow) => {
      gsap.fromTo(
        glow,
        { opacity: 0.3 },
        {
          opacity: 0.7,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: glow,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  });

  const { badge, title, subtitle, items, conclusion } =
    conciergeriesInnovationContent;

  return (
    <Section theme="dark-alt" className="py-32 min-h-[80vh] relative">
      {/* More orbs — narrative builds color */}
      <SectionBackground
        variant="alt"
        orbs={[
          { color: "orange", position: "top-[15%] left-[5%]", size: "w-[450px] h-[450px]", opacity: "[0.08]" },
          { color: "violet", position: "bottom-[20%] right-[10%]", size: "w-[350px] h-[350px]", opacity: "[0.06]" },
          { color: "ambre", position: "top-[60%] left-[50%]", size: "w-[300px] h-[300px]", opacity: "[0.05]" },
        ]}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Badge */}
        <BlurReveal className="text-center mb-6">
          <span className="inline-block text-sm font-mono tracking-widest uppercase text-accent-primary">
            {badge}
          </span>
        </BlurReveal>

        {/* Title — "AVANT" highlighted via gradient */}
        <div className="text-center mb-4">
          <TextGradientReveal
            text={title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight justify-center"
          />
        </div>

        {/* Subtitle */}
        <BlurReveal className="text-center mb-16">
          <p className="text-lg md:text-xl text-foreground/60">{subtitle}</p>
        </BlurReveal>

        {/* 3 Innovation Cards with large step numbers */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {items.map((item, idx) => {
            const IconComponent = iconMap[item.icon];
            return (
              <BlurReveal key={idx} delay={idx * 0.2}>
                <SpotlightCard className="p-8 h-full min-h-[320px] flex flex-col border-foreground/5 relative group">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />

                  {/* Large step number with glow behind */}
                  <div className="absolute top-6 right-6 pointer-events-none">
                    <div className="step-glow absolute inset-0 rounded-full bg-accent-primary/20 blur-2xl scale-150" />
                    <span className="relative text-3xl font-black text-accent-primary/30 font-mono tracking-tighter">
                      {STEP_NUMBERS[idx]}
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-primary/10 transition-colors duration-700 group-hover:bg-accent-primary/20">
                      {IconComponent && (
                        <IconComponent className="h-7 w-7 text-accent-primary" />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-foreground/60 leading-relaxed flex-1">
                      {item.description}
                    </p>
                  </div>
                </SpotlightCard>
              </BlurReveal>
            );
          })}
        </div>

        {/* Conclusion */}
        <BlurReveal delay={0.5} className="max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              {conclusion}
            </p>
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
