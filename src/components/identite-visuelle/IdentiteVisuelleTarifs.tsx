"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { tarifsContent } from "@/data/identite-visuelle-content";
import { Check, ShieldCheck, Palette, Layers, FileText, Pen } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icons for price factors to add visual richness
const factorIcons = [Palette, Layers, FileText, Pen, ShieldCheck];

export function IdentiteVisuelleTarifs() {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!listRef.current) return;

      const items = listRef.current.querySelectorAll("[data-factor]");
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: listRef }
  );

  return (
    <Section className="min-h-[40vh]">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
        <BlurReveal className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10">
            {tarifsContent.badge}
          </span>
        </BlurReveal>

        <TextGradientReveal
          text={tarifsContent.title}
          elementType="h2"
          className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
        />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Premium glow behind card */}
        <div
          className="absolute inset-0 -inset-x-8 -inset-y-4 rounded-3xl blur-[60px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(217,150,80,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <SpotlightCard className="relative p-8 md:p-12 backdrop-blur-sm border-foreground/[0.08]">
          <div className="relative z-10">
            {/* Description */}
            <BlurReveal>
              <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-8">
                {tarifsContent.text}
              </p>
            </BlurReveal>

            {/* Divider */}
            <div
              className="w-full h-px mb-8"
              style={{
                background: "linear-gradient(90deg, transparent 0%, var(--color-foreground) 50%, transparent 100%)",
                opacity: 0.1,
              }}
            />

            {/* Price factors with icons */}
            <BlurReveal delay={0.15}>
              <h3 className="text-lg font-bold text-foreground mb-5">
                Ce qui influence le prix
              </h3>
            </BlurReveal>

            <div ref={listRef} className="flex flex-col gap-4 mb-8">
              {tarifsContent.factors.map((factor, idx) => {
                const FactorIcon = factorIcons[idx % factorIcons.length];
                return (
                  <div
                    key={factor}
                    data-factor
                    className="flex items-start gap-3 opacity-0"
                  >
                    <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <FactorIcon className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <span className="text-sm text-foreground/60">
                      {factor}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Guarantee */}
            <BlurReveal delay={0.3}>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] mb-8">
                <ShieldCheck className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-sm font-medium text-foreground/70">
                  {tarifsContent.guarantee}
                </p>
              </div>
            </BlurReveal>

            {/* CTA */}
            <BlurReveal delay={0.35}>
              <div className="flex flex-col items-center gap-4">
                <a
                  href={tarifsContent.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <MagneticButton className="w-full sm:w-auto px-8 py-3.5 text-base">
                    {tarifsContent.cta}
                  </MagneticButton>
                </a>
              </div>
            </BlurReveal>

            {/* Divider */}
            <div
              className="w-full h-px my-8"
              style={{
                background: "linear-gradient(90deg, transparent 0%, var(--color-foreground) 50%, transparent 100%)",
                opacity: 0.1,
              }}
            />

            {/* Cross-sell */}
            <BlurReveal delay={0.4}>
              <div className="text-center">
                <p className="text-sm text-foreground/40">
                  {tarifsContent.crossSell}{" "}
                  <Link
                    href={tarifsContent.crossSellLink.href}
                    className="text-orange-500 font-semibold transition-colors duration-500 hover:text-orange-400"
                  >
                    {tarifsContent.crossSellLink.text}
                  </Link>
                </p>
              </div>
            </BlurReveal>
          </div>
        </SpotlightCard>
      </div>
    </Section>
  );
}
