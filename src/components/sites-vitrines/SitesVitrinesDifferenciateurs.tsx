"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { diffContent, differentiateurs } from "@/data/sites-vitrines-content";
import { Cpu, Hammer, Eye } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Hammer,
  Eye,
};

// Colored icon configurations per accent
const iconStyles: Record<string, { bg: string; text: string; glow: string }> = {
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    glow: "rgba(201,100,66,0.12)",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    glow: "rgba(217,150,80,0.12)",
  },
};

export function SitesVitrinesDifferenciateurs() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const icons = gridRef.current.querySelectorAll(".diff-icon");
      gsap.fromTo(
        icons,
        { scale: 0.7, rotation: 5 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
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
          <TextGradientReveal
            text={diffContent.title}
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
          />
          <BlurReveal className="mt-4" delay={0.15}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              {diffContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        <BlurReveal stagger={0.2}>
          <div
            ref={gridRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
          >
            {differentiateurs.map((pillar) => {
              const Icon = iconMap[pillar.icon];
              const style = iconStyles[pillar.accent] ?? iconStyles.orange;
              return (
                <SpotlightCard key={pillar.title} className="p-6 md:p-8">
                  <div className="relative z-10">
                    {/* Icon with colored bg + subtle glow behind */}
                    <div className="relative inline-flex mb-5">
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl pointer-events-none"
                        style={{ background: style.glow }}
                        aria-hidden="true"
                      />
                      <div
                        className={`diff-icon relative inline-flex items-center justify-center w-14 h-14 rounded-2xl ${style.bg} ${style.text}`}
                      >
                        {Icon && <Icon className="w-7 h-7" />}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">
                      {pillar.text}
                    </p>
                    {pillar.link && (
                      <Link
                        href={pillar.link.href}
                        className="inline-block mt-4 text-sm font-semibold text-foreground/40 transition-colors duration-500 hover:text-foreground/70"
                      >
                        {pillar.link.text}
                      </Link>
                    )}
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
