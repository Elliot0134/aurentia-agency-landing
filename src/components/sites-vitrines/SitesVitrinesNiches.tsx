"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { nichesContent, nicheCards } from "@/data/sites-vitrines-content";
import {
  Key,
  Building,
  UtensilsCrossed,
  Store,
  Briefcase,
  Dumbbell,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Key,
  Building,
  UtensilsCrossed,
  Store,
  Briefcase,
  Dumbbell,
};

export function SitesVitrinesNiches() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      // Shimmer animation on highlighted card border
      const highlighted = gridRef.current.querySelector(".niche-highlighted");
      if (highlighted) {
        const shimmer = highlighted.querySelector(".shimmer-overlay");
        if (shimmer) {
          gsap.fromTo(
            shimmer,
            { x: "-100%" },
            {
              x: "100%",
              duration: 3,
              ease: "sine.inOut",
              repeat: -1,
              repeatDelay: 2,
            }
          );
        }
      }
    },
    { scope: gridRef }
  );

  return (
    <Section>
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <TextReveal
            text={nichesContent.title}
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
          />
          <BlurReveal className="mt-4" delay={0.15}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              {nichesContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        <BlurReveal stagger={0.1}>
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
          >
            {nicheCards.map((card) => {
              const Icon = iconMap[card.icon];
              const isHighlighted = card.highlighted;

              const cardContent = (
                <SpotlightCard
                  className={`p-6 md:p-8 transition-all duration-700 ease-in-out ${
                    isHighlighted
                      ? "niche-highlighted border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5"
                      : "hover:shadow-[0_0_30px_rgba(201,100,66,0.06)]"
                  }`}
                >
                  {/* Shimmer overlay for highlighted card (gradient border shimmer) */}
                  {isHighlighted && (
                    <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
                      <div className="shimmer-overlay absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent" />
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Badge */}
                    {card.badge && (
                      <span className="inline-block px-3 py-0.5 rounded-full text-sm font-semibold tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20 mb-4">
                        {card.badge}
                      </span>
                    )}

                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 bg-foreground/5 text-foreground/70">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">
                      {card.text}
                    </p>

                    {card.linkText && card.link && (
                      <span className="inline-block mt-4 text-sm font-semibold text-orange-500 transition-colors duration-500 hover:text-orange-400">
                        {card.linkText}
                      </span>
                    )}
                  </div>
                </SpotlightCard>
              );

              if (card.link) {
                return (
                  <Link key={card.title} href={card.link} className="block">
                    {cardContent}
                  </Link>
                );
              }

              return <div key={card.title}>{cardContent}</div>;
            })}
          </div>
        </BlurReveal>

        {/* Closing text */}
        <BlurReveal className="mt-10 md:mt-12 text-center">
          <p className="text-sm text-foreground/40 italic">{nichesContent.closing}</p>
        </BlurReveal>
      </div>
    </Section>
  );
}
