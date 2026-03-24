"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { conciergeriesHeroContent, conciergeriesSiteConfig } from "@/data/conciergeries-content";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { SectionBackground } from "@/components/ui/SectionBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ConciergerieHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current || !meshRef.current) return;

    // Aurora mesh opacity grows on scroll (0.3 -> 0.6)
    gsap.to(meshRef.current, {
      opacity: 0.6,
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=1000",
        scrub: true,
      },
    });

    // Stats cards glassmorphism entrance
    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll(".stat-card");
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: heroRef });

  const { badge, headline, subtitle, ctaPrimary, ctaSecondary, stats } = conciergeriesHeroContent;

  return (
    <section
      ref={heroRef}
      className="section-dark relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* SectionBackground with hero-grid + dark orbs (narrative: dark beginning) */}
      <SectionBackground
        showGrid gridOpacity={0.4} gridFadeDirection="bottom"
        orbs={[
          { color: "orange", position: "top-[20%] left-[10%]", size: "w-[500px] h-[500px]", opacity: "[0.10]" },
          { color: "ambre", position: "top-[50%] right-[15%]", size: "w-[400px] h-[400px]", opacity: "[0.06]" },
          { color: "rose", position: "bottom-[10%] left-[40%]", size: "w-[350px] h-[350px]", opacity: "[0.04]" },
        ]}
      />

      {/* Aurora background — starts at opacity 0.3 */}
      <AuroraBackground
        ref={meshRef}
        className="absolute inset-0 !h-full opacity-30 transition-opacity duration-1000"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge — fade-in + scale 0.8 -> 1, 600ms */}
          <BlurReveal delay={0.2} stagger={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-foreground/10">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-sm font-mono tracking-wider text-foreground-muted uppercase">
                {badge}
              </span>
            </div>
          </BlurReveal>

          {/* H1 — enlarged from text-5xl to text-7xl */}
          <TextGradientReveal
            text={headline}
            elementType="h1"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.9] mb-8 justify-center"
          />

          {/* Subtitle — BlurReveal, delay 0.4s */}
          <BlurReveal delay={0.4}>
            <p className="text-base md:text-lg lg:text-xl text-foreground-dim mb-12 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </BlurReveal>

          {/* CTAs — BlurReveal staggered, delay 0.7s */}
          <BlurReveal delay={0.7} stagger={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton
              glow
              onClick={() => window.open(conciergeriesSiteConfig.bookingUrl, "_blank")}
            >
              {ctaPrimary} &rarr;
            </MagneticButton>
            <a
              href="#tarifs"
              className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-500 group"
            >
              {ctaSecondary}
              <span className="inline-block transition-transform duration-500 group-hover:translate-y-1 ml-2">
                &darr;
              </span>
            </a>
          </BlurReveal>

          {/* Stats — glassmorphism cards */}
          <div
            ref={statsRef}
            className="mt-20 pt-10 border-t border-foreground/5 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="stat-card rounded-2xl border border-foreground/10 bg-foreground/[0.03] backdrop-blur-xl p-6 flex flex-col gap-2 transition-all duration-700 hover:border-foreground/20 hover:bg-foreground/[0.05]"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 30px rgba(201,100,66,0.05)",
                }}
              >
                <NumberMorph
                  value={stat.value}
                  suffix={stat.suffix}
                  className={`text-4xl font-bold font-mono ${
                    idx === 0
                      ? "text-accent-secondary"
                      : idx === 1
                        ? "text-foreground"
                        : "text-accent-primary"
                  }`}
                />
                <span className="text-sm text-foreground-muted font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
