"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { heroContent } from "@/data/identite-visuelle-content";
import { ChevronDown } from "lucide-react";

export function IdentiteVisuelleHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Badge animation
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
        );
      }

      // Decorative shapes
      const shapes = sectionRef.current.querySelectorAll("[data-shape]");
      shapes.forEach((shape, i) => {
        gsap.fromTo(
          shape,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: 0.3 + i * 0.15,
            ease: "power2.out",
          }
        );
        // Floating animation
        gsap.to(shape, {
          y: `random(-12, 12)`,
          x: `random(-8, 8)`,
          rotation: `random(-5, 5)`,
          duration: `random(4, 6)`,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
        });
      });

      // Chevron bounce loop
      if (chevronRef.current) {
        gsap.fromTo(
          chevronRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 1 }
        );
        gsap.to(chevronRef.current, {
          y: 8,
          duration: 1.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.2,
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* SectionBackground with hero-grid + warm ambre-dominant orbs */}
      <SectionBackground
        showGrid gridOpacity={0.2} gridFadeDirection="bottom"
        orbs={[
          { color: "ambre", position: "bottom-0 right-0", size: "w-[550px] h-[550px]", opacity: "[0.10]" },
          { color: "ambre", position: "top-[20%] left-[10%]", size: "w-[400px] h-[400px]", opacity: "[0.06]" },
          { color: "rose", position: "bottom-[20%] left-0", size: "w-[300px] h-[350px]", opacity: "[0.04]" },
          { color: "orange", position: "top-[40%] right-[20%]", size: "w-[250px] h-[250px]", opacity: "[0.05]" },
        ]}
      />

      {/* Decorative geometric shapes — craft visual feel */}
      <div
        data-shape
        className="absolute top-[15%] right-[12%] w-16 h-16 rounded-full border border-foreground/[0.06] opacity-0"
        aria-hidden="true"
      />
      <div
        data-shape
        className="absolute bottom-[25%] left-[8%] w-24 h-px bg-foreground/[0.08] rotate-45 opacity-0"
        aria-hidden="true"
      />
      <div
        data-shape
        className="absolute top-[35%] left-[15%] w-8 h-8 border border-foreground/[0.06] rotate-45 opacity-0"
        aria-hidden="true"
      />
      <div
        data-shape
        className="absolute bottom-[35%] right-[18%] w-12 h-12 rounded-full border border-orange-500/10 opacity-0"
        aria-hidden="true"
      />
      <div
        data-shape
        className="absolute top-[55%] right-[8%] w-20 h-px bg-amber-500/10 -rotate-12 opacity-0"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-5xl">
        {/* Badge */}
        <div ref={badgeRef} className="opacity-0 mb-6 md:mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10">
            {heroContent.badge}
          </span>
        </div>

        {/* H1 — accent gradient on "identité visuelle" */}
        <TextReveal
          elementType="h1"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.9] text-foreground justify-center"
        >
          Votre{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            identité visuelle
          </span>
          . Forgée par 20 ans de direction créative.
        </TextReveal>

        {/* Subtitle */}
        <BlurReveal className="mt-6 md:mt-8" delay={0.3}>
          <p className="text-base md:text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            {heroContent.subtitle}
          </p>
        </BlurReveal>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0 mt-8 md:mt-10 flex flex-col items-center gap-4">
          <a
            href={heroContent.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <MagneticButton
              glow
              className="w-full sm:w-auto px-8 py-4 text-base md:text-lg"
            >
              {heroContent.cta}
            </MagneticButton>
          </a>
          <p className="text-sm text-foreground/40">{heroContent.proof}</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      >
        <ChevronDown className="w-6 h-6 text-foreground/30" />
      </div>
    </section>
  );
}
