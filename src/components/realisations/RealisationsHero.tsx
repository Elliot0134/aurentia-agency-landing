"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function RealisationsHero() {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
        }
      );
    }

    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  });

  return (
    <Section
      className="min-h-[85vh] flex items-center justify-center relative"
      theme="transparent"
    >
      {/* Background: grid + orbs */}
      <SectionBackground
        showGrid gridOpacity={0.1} gridFadeDirection="bottom"
        orbs={[
          { color: "ambre", position: "top-[20%] left-[10%]", size: "w-[500px] h-[400px]", opacity: "[0.08]" },
          { color: "orange", position: "bottom-[10%] right-[15%]", size: "w-[450px] h-[350px]", opacity: "[0.05]" },
          { color: "rose", position: "top-[50%] right-[30%]", size: "w-[400px] h-[300px]", opacity: "[0.04]" },
        ]}
      />

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge */}
        <span
          ref={badgeRef}
          className="inline-block text-sm font-mono uppercase tracking-[0.2em] py-2 px-5 rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 mb-8 opacity-0"
        >
          NOS REALISATIONS
        </span>

        {/* H1 */}
        <TextReveal
          text="Chaque projet raconte une transformation."
          elementType="h1"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.9] mb-6"
        />

        {/* Subtitle */}
        <BlurReveal delay={0.3}>
          <p className="text-base md:text-lg text-foreground-muted max-w-2xl px-6 md:px-0">
            Sites vitrines, applications SaaS, landing pages. Zero template.
            Chaque pixel a une intention. Voici ce qu&apos;on a forge pour nos
            clients.
          </p>
        </BlurReveal>

        {/* Scroll indicator */}
        <div
          ref={chevronRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/30"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </Section>
  );
}
