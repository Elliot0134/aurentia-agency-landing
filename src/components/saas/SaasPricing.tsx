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
import { NumberMorph } from "@/components/animations/NumberMorph";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { saasPricingContent } from "@/data/saas-content";
import { Check, Clock, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SaasPricing() {
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

  const { card, bottomText } = saasPricingContent;

  return (
    <Section id="pricing" className="py-28 md:py-36 min-h-[50vh] relative">
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <BlurReveal className="mb-5">
            <span className="inline-block px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-medium tracking-widest text-foreground/70">
              {saasPricingContent.badge}
            </span>
          </BlurReveal>

          <TextGradientReveal
            text={saasPricingContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground justify-center"
          />

          <BlurReveal className="mt-6" delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
              {saasPricingContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Pricing Card — glassmorphism premium */}
        <div className="flex justify-center">
          <div ref={cardRef} className="opacity-0 w-full max-w-lg">
            <SpotlightCard className="p-10 md:p-12 backdrop-blur-xl bg-foreground/[0.02] border border-foreground/10 shadow-2xl shadow-foreground/[0.05]">
              <div className="relative z-10 flex flex-col items-center text-center gap-8">
                {/* Label */}
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-medium tracking-wider text-foreground/70">
                  <Sparkles className="w-4 h-4" />
                  {card.label}
                </span>

                {/* Price — massive gradient text */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm md:text-base text-foreground/50">
                    À partir de
                  </span>
                  <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                    <NumberMorph
                      value={card.price}
                      className="text-5xl md:text-6xl font-black bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
                    />
                    <span className="ml-1">€</span>
                  </span>
                </div>

                {/* Mention */}
                <p className="text-sm text-foreground/40">{card.mention}</p>

                {/* Divider */}
                <div
                  className="w-full h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, var(--color-foreground) 50%, transparent 100%)",
                    opacity: 0.1,
                  }}
                />

                {/* Inclus list */}
                <ul className="w-full space-y-4 text-left">
                  {card.inclus.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-foreground/70"
                    >
                      <Check className="w-5 h-5 text-foreground/40 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Delivery */}
                <div className="flex items-center gap-2 text-sm text-foreground/50">
                  <Clock className="w-4 h-4" />
                  <span>{card.delay}</span>
                </div>

                {/* Divider */}
                <div
                  className="w-full h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, var(--color-foreground) 50%, transparent 100%)",
                    opacity: 0.1,
                  }}
                />

                {/* CTA */}
                <a
                  href={card.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <MagneticButton
                    glow
                    className="px-10 py-4 text-base w-full sm:w-auto"
                  >
                    {card.cta}
                  </MagneticButton>
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Bottom text */}
        <BlurReveal className="mt-10" delay={0.3}>
          <p className="text-center text-sm text-foreground/40 max-w-xl mx-auto leading-relaxed">
            {bottomText}
          </p>
        </BlurReveal>
      </div>
    </Section>
  );
}
