"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { ChevronDown } from "lucide-react";
import { heroContent } from "@/data/landing-pages-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LandingPagesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const mentionRef = useRef<HTMLParagraphElement>(null);
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

      // Mention vitrine: fade-in + pulse
      if (mentionRef.current) {
        gsap.fromTo(
          mentionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.out",
            onComplete: () => {
              if (mentionRef.current) {
                gsap.to(mentionRef.current, {
                  opacity: 0.7,
                  duration: 2,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              }
            },
          }
        );
      }

      // CTAs: fade-in + translateY
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" }
        );
      }

      // Chevron bounce
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* SectionBackground with orbs */}
      <SectionBackground
        showGrid gridOpacity={0.1} gridFadeDirection="all"
        orbs={[
          { color: "orange", position: "top-[25%] left-[20%]", size: "w-[500px] h-[500px]", opacity: "[0.07]" },
          { color: "violet", position: "bottom-[20%] right-[15%]", size: "w-[450px] h-[450px]", opacity: "[0.06]" },
          { color: "cyan", position: "top-[50%] left-[50%]", size: "w-[400px] h-[400px]", opacity: "[0.04]" },
        ]}
      />

      <div className="container mx-auto px-6 md:px-12 text-center max-w-7xl relative z-10">
        {/* Badge */}
        <span
          ref={badgeRef}
          className="inline-block text-sm font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 mb-6 md:mb-8 opacity-0"
        >
          {heroContent.badge}
        </span>

        {/* H1 */}
        <BlurReveal delay={0.15}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-tight text-foreground text-center">
            Des landing pages qui{" "}
            <span className="bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent">convertissent</span>.
            <br />
            Pas qui décorent.
          </h1>
        </BlurReveal>

        {/* Subtitle */}
        <BlurReveal className="mt-6 md:mt-8" delay={0.3}>
          <p className="text-base md:text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            {heroContent.subtitle}
          </p>
        </BlurReveal>

        {/* Mention vitrine */}
        <p
          ref={mentionRef}
          className="text-sm font-medium text-accent-primary/80 mt-4 opacity-0"
        >
          {heroContent.vitrineMention}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-10 opacity-0"
        >
          <a
            href={heroContent.ctaPrimary.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MagneticButton glow className="px-10 py-4 text-base">
              {heroContent.ctaPrimary.label}
            </MagneticButton>
          </a>
          <a href={heroContent.ctaSecondary.href}>
            <MagneticButton className="px-10 py-4 text-base">
              {heroContent.ctaSecondary.label}
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
