"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { heroContent } from "@/data/content";
import { AuroraBackground } from "@/components/animations/AuroraBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ConciergerieHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current || !meshRef.current) return;

    gsap.to(meshRef.current, {
      opacity: 1, 
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=1000",
        scrub: true,
      },
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="section-dark relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16">
      <AuroraBackground ref={meshRef} className="absolute inset-0 !h-full opacity-30 transition-opacity duration-1000" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <BlurReveal delay={0.2} stagger={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-foreground/10">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-xs font-mono tracking-wider text-foreground-muted uppercase">
                Réservé aux conciergeries
              </span>
            </div>
          </BlurReveal>

          <TextGradientReveal 
            text={`${heroContent.headline} ${heroContent.headlineAccent}`} 
            elementType="h1"
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-tight justify-center"
          />

          <BlurReveal delay={0.6}>
            <p className="text-lg md:text-xl text-foreground-dim mb-12 max-w-2xl mx-auto leading-relaxed">
              {heroContent.subtitle}
            </p>
          </BlurReveal>

          <BlurReveal delay={0.8} stagger={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton glow onClick={() => window.open('https://cal.com/aurentia', '_blank')}>
              {heroContent.ctaPrimary} →
            </MagneticButton>
            <a href="#portfolio" className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors group">
              {heroContent.ctaSecondary} 
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1 ml-2">↓</span>
            </a>
          </BlurReveal>

          <BlurReveal delay={1.2} className="mt-20 pt-10 border-t border-foreground/5 grid grid-cols-1 md:grid-cols-3 gap-8">
            {heroContent.stats.map((stat, idx) => (
               <div key={idx} className="flex flex-col gap-2">
                 <NumberMorph value={stat.value} suffix={stat.suffix} className={`text-4xl font-bold font-mono ${idx === 0 ? 'text-accent-secondary' : idx === 1 ? 'text-foreground' : 'text-accent-primary'}`} />
                 <span className="text-sm text-foreground-muted font-medium uppercase tracking-wider">{stat.label}</span>
               </div>
            ))}
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
