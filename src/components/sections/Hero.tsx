"use client";

import { heroContent, siteConfig } from "@/data/content";
import { useScrollReveal, useCountUp } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

export function Hero() {
  const titleRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 1 });
  const subtitleRef = useScrollReveal<HTMLParagraphElement>({ y: 20, delay: 0.3 });
  const ctaRef = useScrollReveal<HTMLDivElement>({ y: 20, delay: 0.5 });
  const badgesRef = useScrollReveal<HTMLDivElement>({ y: 20, delay: 0.7, children: true });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden section-dark">
      {/* Aurora Background */}
      <AuroraBackground />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Headline */}
        <div ref={titleRef}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-foreground mb-4">
            {heroContent.headline}
            <br />
            <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              {heroContent.headlineAccent}
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed mt-6 mb-10"
        >
          {heroContent.subtitle}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow px-8 py-4 rounded-full text-base font-semibold text-foreground"
          >
            {heroContent.ctaPrimary} →
          </a>
          <a
            href="#portfolio"
            className="text-[var(--foreground-muted)] hover:text-foreground transition-colors text-sm flex items-center gap-2"
          >
            {heroContent.ctaSecondary} ↓
          </a>
        </div>

        {/* Badges */}
        <div ref={badgesRef} className="flex flex-wrap justify-center gap-3 mt-12">
          {heroContent.badges.map((badge) => (
            <span
              key={badge}
              className="glass-strong px-4 py-2 rounded-full text-sm sm:text-sm text-foreground/80"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 mt-16 sm:mt-24 flex flex-wrap justify-center gap-8 sm:gap-16">
        {heroContent.stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-[var(--foreground-dim)]" />
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const countRef = useCountUp(value, { suffix });

  return (
    <div className="text-center">
      <span ref={countRef} className="text-3xl sm:text-4xl font-black font-mono text-foreground">
        0
      </span>
      <p className="text-sm sm:text-sm text-[var(--foreground-dim)] mt-1">{label}</p>
    </div>
  );
}
