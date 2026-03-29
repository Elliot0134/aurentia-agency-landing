"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { aboutHeroContent } from "@/data/about-content";
import { ChevronDown } from "lucide-react";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!sectionRef.current) return;

      // Badge: fade-in + scale
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

      // Chevron: infinite bounce
      if (chevronRef.current) {
        gsap.fromTo(
          chevronRef.current,
          { opacity: 0 },
          { opacity: 1, delay: 1, duration: 0.6 }
        );
        gsap.to(chevronRef.current, {
          y: 8,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2,
        });
      }
    },
    { scope: sectionRef, dependencies: [animationsEnabled] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <SectionBackground
        showGrid gridOpacity={0.1} gridFadeDirection="all"
        orbs={[
          { color: "orange", position: "top-[20%] left-[10%]", size: "w-[500px] h-[500px]", opacity: "[0.08]" },
          { color: "ambre", position: "top-[40%] right-[5%]", size: "w-[400px] h-[400px]", opacity: "[0.05]" },
          { color: "orange", position: "bottom-[10%] left-[40%]", size: "w-[350px] h-[350px]", opacity: "[0.04]" },
        ]}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-7xl">
        {/* Badge */}
        <div ref={badgeRef} className="opacity-0 mb-6 md:mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10">
            {aboutHeroContent.badge}
          </span>
        </div>

        {/* H1 */}
        <BlurReveal delay={0.15}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-tight text-foreground text-center">
            <span className="bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent">
              20 ans
            </span>
            {" d'expertise."}
            <br />
            {"L'IA en "}
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              plus
            </span>
            .
          </h1>
        </BlurReveal>

        {/* Subtitle */}
        <BlurReveal className="mt-6 md:mt-8" delay={0.3}>
          <p className="text-base md:text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            {aboutHeroContent.subtitle}
          </p>
        </BlurReveal>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0 mt-8 md:mt-10 flex flex-col items-center gap-4">
          <a href="#equipe" className="w-full sm:w-auto">
            <MagneticButton
              glow
              className="w-full sm:w-auto px-8 py-4 text-base md:text-lg"
            >
              Découvrir l&apos;équipe
            </MagneticButton>
          </a>
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
