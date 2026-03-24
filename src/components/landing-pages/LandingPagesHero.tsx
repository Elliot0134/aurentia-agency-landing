"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { heroContent } from "@/data/landing-pages-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Floating decorative mini BrowserMockup ──────────────────── */
function FloatingBrowserMockup({ className }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div className="w-[200px] md:w-[260px] rounded-xl border border-foreground/8 bg-foreground/[0.02] overflow-hidden shadow-xl shadow-foreground/[0.03] backdrop-blur-sm">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-foreground/5 bg-foreground/[0.03]">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-foreground/10" />
            <span className="w-2 h-2 rounded-full bg-foreground/10" />
            <span className="w-2 h-2 rounded-full bg-foreground/10" />
          </div>
        </div>
        {/* Content area */}
        <div className="p-3 space-y-2">
          <div className="h-2 w-3/4 rounded bg-foreground/[0.06]" />
          <div className="h-2 w-1/2 rounded bg-foreground/[0.04]" />
          <div className="h-8 w-full rounded bg-foreground/[0.03] mt-3" />
        </div>
      </div>
    </div>
  );
}

export function LandingPagesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const mentionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mockup1Ref = useRef<HTMLDivElement>(null);
  const mockup2Ref = useRef<HTMLDivElement>(null);

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

      // Floating mockups: fade + float
      const mockups = [mockup1Ref.current, mockup2Ref.current].filter(Boolean);
      mockups.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, delay: 0.8 + i * 0.3, ease: "power2.out" }
        );
        gsap.to(el, {
          y: -12,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5 + i * 0.3,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* SectionBackground with orbs */}
      <SectionBackground
        showGrid gridOpacity={0.1} gridFadeDirection="bottom"
        orbs={[
          { color: "orange", position: "top-[25%] left-[20%]", size: "w-[500px] h-[500px]", opacity: "[0.07]" },
          { color: "violet", position: "bottom-[20%] right-[15%]", size: "w-[450px] h-[450px]", opacity: "[0.06]" },
          { color: "cyan", position: "top-[50%] left-[50%]", size: "w-[400px] h-[400px]", opacity: "[0.04]" },
        ]}
      />

      {/* Floating decorative BrowserMockups */}
      <div ref={mockup1Ref} className="opacity-0 hidden lg:block">
        <FloatingBrowserMockup className="top-[18%] -left-[2%] rotate-[-8deg] opacity-40" />
      </div>
      <div ref={mockup2Ref} className="opacity-0 hidden lg:block">
        <FloatingBrowserMockup className="bottom-[22%] -right-[1%] rotate-[6deg] opacity-30" />
      </div>

      <div className="container mx-auto px-6 md:px-12 text-center max-w-5xl relative z-10">
        {/* Badge */}
        <span
          ref={badgeRef}
          className="inline-block text-sm font-mono uppercase tracking-widest px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 mb-10 opacity-0"
        >
          {heroContent.badge}
        </span>

        {/* H1 — bumped to text-7xl */}
        <TextReveal
          text={heroContent.h1}
          elementType="h1"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.9] mb-8 justify-center"
          delay={0.1}
        />

        {/* Subtitle */}
        <BlurReveal delay={0.3}>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-5">
            {heroContent.subtitle}
          </p>
        </BlurReveal>

        {/* Mention vitrine */}
        <p
          ref={mentionRef}
          className="text-sm font-medium text-accent-primary/80 mb-12 opacity-0"
        >
          {heroContent.vitrineMention}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 opacity-0"
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
    </section>
  );
}
