"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Paintbrush,
  Sparkles,
  Smartphone,
  Search,
  Gauge,
  Moon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { featuresContent } from "@/data/landing-pages-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Paintbrush,
  Sparkles,
  Smartphone,
  Search,
  Gauge,
  Moon,
};

export function LandingPagesFeatures() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const icons = gridRef.current.querySelectorAll(".feature-icon");
      gsap.fromTo(
        icons,
        { scale: 0.5, rotation: 5 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <Section>
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <TextReveal
            text={featuresContent.title}
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
          />
          <BlurReveal className="mt-4" delay={0.15}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              {featuresContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        <BlurReveal stagger={0.15}>
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
          >
            {featuresContent.cards.map((card) => {
              const Icon = iconMap[card.icon];
              return (
                <SpotlightCard
                  key={card.title}
                  className="p-6 md:p-8"
                >
                  <div className="relative z-10">
                    <div className="feature-icon inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 bg-orange-500/10 text-orange-500">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-foreground/50 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
