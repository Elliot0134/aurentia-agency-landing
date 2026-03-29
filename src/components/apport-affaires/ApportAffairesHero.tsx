"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { apportHero } from "@/data/apport-affaires-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ApportAffairesHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!sectionRef.current) return;

      // Badge fade-in + scale
      gsap.fromTo(
        sectionRef.current.querySelector("[data-badge]"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      // CTA scale in
      gsap.fromTo(
        sectionRef.current.querySelector("[data-cta]"),
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
      );

      // Proofs fade
      gsap.fromTo(
        sectionRef.current.querySelector("[data-proofs]"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
      );
    },
    { scope: sectionRef, dependencies: [animationsEnabled] }
  );

  return (
    <Section theme="dark" className="min-h-[85vh] flex items-center py-28 md:py-36">
      {/* SectionBackground with ambre + orange orbs */}
      <SectionBackground
        variant="base"
        showGrid gridOpacity={0.1} gridFadeDirection="bottom"
        orbs={[
          { color: "ambre", position: "top-[30%] left-[25%]", size: "w-[600px] h-[500px]", opacity: "[0.08]" },
          { color: "orange", position: "top-[50%] right-[20%]", size: "w-[400px] h-[400px]", opacity: "[0.05]" },
        ]}
      />

      <div
        ref={sectionRef}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        {/* Badge */}
        <span
          data-badge
          className="inline-block text-sm font-medium tracking-widest uppercase text-accent-primary/80 mb-8 opacity-0"
        >
          {apportHero.badge}
        </span>

        {/* Big 10% number with animated gradient shimmer */}
        <div className="mb-6">
          <NumberMorph
            value={apportHero.commissionPercent}
            suffix="%"
            className="text-8xl md:text-9xl font-mono font-black bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmerGradient_3s_linear_infinite]"
          />
        </div>

        {/* H1 */}
        <TextReveal
          text={apportHero.headline}
          elementType="h1"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.9] mb-6 justify-center"
        />

        {/* Subtitle */}
        <BlurReveal delay={0.3}>
          <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {apportHero.subtitle}
          </p>
        </BlurReveal>

        {/* CTA */}
        <div data-cta className="opacity-0">
          <MagneticButton
            glow
            className="px-8 py-4 text-base"
            onClick={() => {
              const ctaSection = document.getElementById("apport-cta");
              ctaSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {apportHero.ctaLabel}&nbsp;&nbsp;&rarr;
          </MagneticButton>
        </div>

        {/* Micro-proofs */}
        <div
          data-proofs
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8 opacity-0"
        >
          {apportHero.proofs.map((proof, i) => (
            <span
              key={i}
              className="text-sm text-foreground/30 font-medium"
            >
              {proof}
              {i < apportHero.proofs.length - 1 && (
                <span className="ml-4 text-foreground/10">&middot;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
