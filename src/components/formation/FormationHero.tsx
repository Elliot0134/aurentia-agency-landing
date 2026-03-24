"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { formationHero } from "@/data/formation-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FormationHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const els = sectionRef.current.querySelectorAll("[data-hero-reveal]");
      gsap.fromTo(
        els,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    },
    { scope: sectionRef }
  );

  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-28 md:py-36"
    >
      {/* SectionBackground with violet + orange orbs */}
      <SectionBackground
        variant="base"
        showGrid gridOpacity={0.2} gridFadeDirection="bottom"
        orbs={[
          { color: "violet", position: "top-[30%] left-[20%]", size: "w-[500px] h-[500px]", opacity: "[0.10]" },
          { color: "orange", position: "top-[50%] right-[15%]", size: "w-[400px] h-[400px]", opacity: "[0.05]" },
        ]}
      />

      {/* Floating particles — decorative */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-accent-primary/30 animate-[floatParticle_6s_ease-in-out_infinite]" />
        <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-accent-secondary/25 animate-[floatParticle_8s_ease-in-out_1s_infinite]" />
        <div className="absolute top-[35%] right-[35%] w-1 h-1 rounded-full bg-accent-primary/20 animate-[floatParticle_7s_ease-in-out_2s_infinite]" />
        <div className="absolute bottom-[25%] left-[30%] w-1.5 h-1.5 rounded-full bg-accent-secondary/30 animate-[floatParticle_9s_ease-in-out_0.5s_infinite]" />
        <div className="absolute top-[75%] left-[60%] w-1 h-1 rounded-full bg-accent-primary/25 animate-[floatParticle_7.5s_ease-in-out_3s_infinite]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Badge with glow pulse */}
        <div data-hero-reveal>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent-primary/15 bg-foreground/5 backdrop-blur-md mb-8 animate-[glowPulse_3s_ease-in-out_infinite]">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_12px_rgba(201,100,66,0.6)]" />
            <span className="text-sm font-mono tracking-wider text-foreground-muted uppercase">
              {formationHero.badge}
            </span>
          </div>
        </div>

        {/* H1 */}
        <TextReveal
          text={formationHero.headline}
          elementType="h1"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.9] justify-center mb-6 max-w-5xl"
        />

        {/* Subtitle */}
        <BlurReveal delay={0.3}>
          <p className="text-base sm:text-lg md:text-xl text-foreground-dim max-w-2xl mx-auto leading-relaxed mb-10">
            {formationHero.subtitle}
          </p>
        </BlurReveal>

        {/* CTA */}
        <BlurReveal delay={0.6}>
          <div className="flex flex-col items-center gap-4">
            <MagneticButton glow className="px-8 py-3.5" onClick={scrollToWaitlist}>
              {formationHero.ctaLabel}&nbsp;&nbsp;&rarr;
            </MagneticButton>

            {/* Micro-proofs */}
            <p className="text-sm text-foreground-muted">
              {formationHero.proofs.join(" \u00B7 ")}
            </p>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
