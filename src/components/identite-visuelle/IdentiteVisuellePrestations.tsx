"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import {
  prestationsContent,
  prestationBlocks,
} from "@/data/identite-visuelle-content";
import { Pen, Palette, Layers, FileText } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Pen,
  Palette,
  Layers,
  FileText,
};

export function IdentiteVisuellePrestations() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      // Icon scale animation
      const icons = gridRef.current.querySelectorAll(".presta-icon");
      gsap.fromTo(
        icons,
        { scale: 0.5 },
        {
          scale: 1,
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

      // Card hover Y translation via GSAP for smoothness
      const cards = gridRef.current.querySelectorAll(".presta-card");
      cards.forEach((card) => {
        const el = card as HTMLElement;
        const handleEnter = () => {
          gsap.to(el, {
            y: -8,
            duration: 0.7,
            ease: "power2.out",
          });
        };
        const handleLeave = () => {
          gsap.to(el, {
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          });
        };
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    },
    { scope: gridRef }
  );

  return (
    <Section>
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <TextReveal
            text={prestationsContent.title}
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
          />
          <BlurReveal className="mt-4" delay={0.15}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              {prestationsContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Grid 2x2 — larger icons, generous gap */}
        <BlurReveal stagger={0.2}>
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
          >
            {prestationBlocks.map((block) => {
              const Icon = iconMap[block.icon];
              const isOrange = block.accent === "orange";
              const glowColor = isOrange ? "rgba(201,100,66,0.10)" : "rgba(217,150,80,0.10)";
              return (
                <SpotlightCard
                  key={block.title}
                  className="presta-card p-8 md:p-10 transition-colors duration-700 ease-in-out hover:border-foreground/10 backdrop-blur-sm"
                >
                  <div className="relative z-10">
                    {/* Icon w-12 h-12 with glassmorphism hover glow */}
                    <div className="relative inline-flex mb-6">
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl pointer-events-none opacity-0 transition-opacity duration-700 ease-in-out"
                        style={{ background: glowColor }}
                        aria-hidden="true"
                      />
                      <div
                        className={`presta-icon relative inline-flex items-center justify-center w-12 h-12 rounded-2xl ${
                          isOrange
                            ? "bg-orange-500/10 text-orange-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {Icon && <Icon className="w-6 h-6" />}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {block.title}
                    </h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">
                      {block.text}
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
