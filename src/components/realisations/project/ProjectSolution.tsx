"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as LucideIcons from "lucide-react";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import type { ProjectFeature } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectSolutionProps {
  solution: string;
  features: ProjectFeature[];
}

function getIcon(iconName: string) {
  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;
  const Icon = icons[iconName];
  return Icon ?? LucideIcons.Zap;
}

export function ProjectSolution({ solution, features }: ProjectSolutionProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll("[data-feature-card]");
    const icons = gridRef.current.querySelectorAll("[data-feature-icon]");

    gsap.fromTo(
      cards,
      { opacity: 0, filter: "blur(8px)", y: 20 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      icons,
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(2)",
        delay: 0.3,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: gridRef });

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Title */}
        <TextGradientReveal
          text="Ce qu'on a forge."
          elementType="h2"
          className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
        />

        {/* Solution intro */}
        <BlurReveal delay={0.2} className="mb-12 md:mb-16">
          <p className="text-base md:text-lg text-foreground/50 leading-relaxed max-w-3xl">
            {solution}
          </p>
        </BlurReveal>

        {/* Feature grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <SpotlightCard
                key={index}
                data-feature-card
                className="p-6 flex flex-col gap-4 transition-transform duration-700 hover:-translate-y-1 hover:border-foreground/20 opacity-0"
              >
                <div
                  data-feature-icon
                  className="relative z-10 w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center opacity-0"
                >
                  {/* Subtle glow behind icon */}
                  <div className="absolute inset-0 rounded-xl bg-accent-primary/20 blur-[12px] pointer-events-none" aria-hidden="true" />
                  <Icon className="relative w-5 h-5 text-foreground/60" />
                </div>
                <h3 className="relative z-10 text-base font-semibold text-foreground/90">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-sm text-foreground/40 leading-relaxed">
                  {feature.description}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
