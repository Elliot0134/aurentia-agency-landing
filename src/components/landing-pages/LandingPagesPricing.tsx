"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { pricingContent } from "@/data/landing-pages-content";
import { Check, Clock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LandingPagesPricing() {
  const { card } = pricingContent;
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95, filter: "blur(8px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  return (
    <Section id="tarifs" className="py-28 md:py-36 min-h-[50vh] relative">
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <BlurReveal>
            <span className="inline-block text-sm font-mono uppercase tracking-widest px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 mb-8">
              {pricingContent.badge}
            </span>
          </BlurReveal>

          <TextGradientReveal
            text={pricingContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 justify-center"
          />

          <BlurReveal delay={0.15}>
            <p className="text-lg md:text-xl text-foreground/60">
              {pricingContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Pricing card — glassmorphism premium */}
        <div ref={cardRef} className="max-w-lg mx-auto opacity-0">
          <SpotlightCard className="p-10 md:p-12 backdrop-blur-xl bg-foreground/[0.02] border border-foreground/10 shadow-2xl shadow-foreground/[0.05]">
            <div className="relative z-10">
              {/* Label */}
              <span className="inline-block text-sm font-mono uppercase tracking-widest text-accent-primary/80 mb-8">
                {card.label}
              </span>

              {/* Price — massive gradient text */}
              <div className="mb-3">
                <span className="text-base text-foreground/50 mr-2">
                  {card.pricePrefix}
                </span>
                <span className="text-5xl md:text-6xl font-black font-mono bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                  {card.price}
                </span>
                <span className="text-5xl md:text-6xl font-black font-mono bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                  {card.priceSuffix}
                </span>
              </div>

              {/* Mention */}
              <p className="text-sm text-foreground/50 mb-10">
                {card.mention}
              </p>

              {/* Divider */}
              <div
                className="w-full h-px mb-8"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, var(--color-foreground) 50%, transparent 100%)",
                  opacity: 0.1,
                }}
              />

              {/* Included list */}
              <ul className="flex flex-col gap-4 mb-10">
                {card.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 text-sm md:text-base leading-relaxed">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Delay */}
              <div className="flex items-center gap-2 mb-10 px-5 py-3.5 rounded-2xl border border-foreground/5 bg-foreground/[0.02]">
                <Clock
                  className="w-4 h-4 text-accent-primary/70 shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-sm font-mono text-foreground/70">
                  {card.delay}
                </span>
              </div>

              {/* CTA */}
              <MagneticButton
                glow
                className="w-full text-center py-4 flex justify-center"
                onClick={() => window.open(card.cta.href, "_blank")}
              >
                {card.cta.label}
              </MagneticButton>
            </div>
          </SpotlightCard>
        </div>

        {/* Footer text */}
        <BlurReveal delay={0.3}>
          <p className="text-center text-foreground/40 mt-12 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {pricingContent.footer}
          </p>
        </BlurReveal>
      </div>
    </Section>
  );
}
