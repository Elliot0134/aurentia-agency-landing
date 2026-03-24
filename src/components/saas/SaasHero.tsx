"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { saasHeroContent } from "@/data/saas-content";
import { ChevronDown } from "lucide-react";

export function SaasHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Badge: fade-in + scale
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
        );
      }

      // CTAs: fade-in + translateY
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
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
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* SectionBackground with hero-grid + orbs */}
      <SectionBackground
        showGrid gridOpacity={0.2} gridFadeDirection="bottom"
        orbs={[
          { color: "violet", position: "top-[20%] left-[15%]", size: "w-[500px] h-[500px]", opacity: "[0.08]" },
          { color: "orange", position: "top-[40%] right-[10%]", size: "w-[450px] h-[450px]", opacity: "[0.06]" },
          { color: "cyan", position: "bottom-[15%] left-[40%]", size: "w-[400px] h-[400px]", opacity: "[0.04]" },
        ]}
      />

      <div className="container mx-auto px-6 md:px-12 text-center relative z-10 max-w-5xl">
        {/* Badge */}
        <div ref={badgeRef} className="mb-10 opacity-0">
          <span className="inline-block px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-medium tracking-widest text-foreground/70">
            {saasHeroContent.badge}
          </span>
        </div>

        {/* H1 — bumped to text-7xl */}
        <TextReveal
          text={saasHeroContent.headline}
          elementType="h1"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.9] text-foreground justify-center"
        />

        {/* Subtitle */}
        <BlurReveal className="mt-8 md:mt-10" delay={0.3}>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            {saasHeroContent.subtitle}
          </p>
        </BlurReveal>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 opacity-0"
        >
          <a
            href={saasHeroContent.ctaPrimaryHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MagneticButton glow className="px-10 py-4 text-base">
              {saasHeroContent.ctaPrimary}
            </MagneticButton>
          </a>
          <a href={saasHeroContent.ctaSecondaryHref}>
            <MagneticButton className="px-10 py-4 text-base">
              {saasHeroContent.ctaSecondary}
            </MagneticButton>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0"
      >
        <ChevronDown className="w-6 h-6 text-foreground/30" />
      </div>
    </section>
  );
}
