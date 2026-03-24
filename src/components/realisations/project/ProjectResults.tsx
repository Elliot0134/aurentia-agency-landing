"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import type { ProjectResult } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectResultsProps {
  results: ProjectResult[];
}

export function ProjectResults({ results }: ProjectResultsProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll("[data-result-card]");
    const values = gridRef.current.querySelectorAll("[data-result-value]");

    // Cards blur reveal staggered
    gsap.fromTo(
      cards,
      { opacity: 0, filter: "blur(8px)", y: 20 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
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

    // Count-up animation for values that are numbers
    values.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const rawValue = htmlEl.dataset.value ?? "";

      // Try to extract a number from the value
      const numericMatch = rawValue.match(/^[+-]?(\d+)/);
      if (numericMatch) {
        const target = parseInt(numericMatch[1], 10);
        const prefix = rawValue.match(/^([+-])/)?.[1] ?? "";
        const suffix = rawValue.replace(/^[+-]?\d+/, "");

        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: htmlEl,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            htmlEl.textContent = `${prefix}${Math.round(counter.val)}${suffix}`;
          },
        });
      }
    });
  }, { scope: gridRef });

  if (!results.length) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Title */}
        <TextGradientReveal
          text="Les resultats parlent."
          elementType="h2"
          className="text-3xl md:text-4xl font-bold tracking-tight mb-10 md:mb-14"
        />

        {/* Metrics grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {results.map((result, index) => (
            <SpotlightCard
              key={index}
              data-result-card
              className="p-5 md:p-6 flex flex-col gap-2 transition-transform duration-700 hover:-translate-y-1 hover:border-foreground/20 opacity-0"
            >
              <div className="relative z-10">
                {/* Subtle accent glow behind metric */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent-primary/[0.08] blur-[20px] pointer-events-none" aria-hidden="true" />
                <span
                  data-result-value
                  data-value={result.value}
                  className="relative text-4xl md:text-5xl font-mono font-black text-foreground/90"
                >
                  {result.value}
                </span>
              </div>
              <span className="relative z-10 text-sm font-semibold text-foreground/60">
                {result.metric}
              </span>
              {result.context && (
                <span className="relative z-10 text-sm text-foreground/30 leading-relaxed mt-1">
                  {result.context}
                </span>
              )}
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
