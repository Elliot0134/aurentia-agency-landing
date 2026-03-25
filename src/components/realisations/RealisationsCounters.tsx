"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { NumberMorph } from "@/components/animations/NumberMorph";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 6, suffix: "+", label: "projets livres" },
  { value: 48, suffix: "h", label: "delai moyen de livraison" },
  { value: 100, suffix: "%", label: "clients satisfaits" },
  { value: 0, suffix: "", label: "template utilise" },
] as const;

export function RealisationsCounters() {
  const labelsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!labelsRef.current) return;

    const labels = labelsRef.current.querySelectorAll(".counter-label");
    if (!labels.length) return;

    gsap.fromTo(
      labels,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: labelsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: labelsRef });

  return (
    <Section className="py-16 md:py-20" theme="transparent">
      <div
        ref={labelsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 max-w-5xl mx-auto"
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="counter-label flex flex-col items-center text-center relative opacity-0"
          >
            {/* Vertical separator on desktop (not before first item) */}
            {idx > 0 && (
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-foreground/10" />
            )}

            {/* Accent glow underneath */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-accent-primary/[0.06] blur-[40px] pointer-events-none" aria-hidden="true" />

            <NumberMorph
              value={stat.value}
              suffix={stat.suffix}
              className="text-5xl md:text-6xl lg:text-7xl font-mono font-black text-foreground"
            />

            <span className="text-sm md:text-base text-foreground-muted mt-2 uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
