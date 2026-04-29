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
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { saasPricingContent } from "@/data/saas-content";
import { Check, Clock, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SaasPricing() {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
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
      <SectionBackground
        variant="alt"
        showGrid
        gridOpacity={0.08}
        gridFadeDirection="both"
        orbs={[
          { color: "orange", position: "bottom-0 right-0", size: "w-[500px] h-[500px]", opacity: "[0.08]" },
          { color: "ambre", position: "top-[15%] left-[20%]", size: "w-[350px] h-[350px]", opacity: "[0.05]" },
          { color: "orange", position: "top-[40%] right-[25%]", size: "w-[250px] h-[250px]", opacity: "[0.04]" },
        ]}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <BlurReveal className="mb-5">
            <span className="inline-block px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-medium tracking-widest text-foreground/70">
              {saasPricingContent.badge}
            </span>
          </BlurReveal>

          <TextGradientReveal
            text={saasPricingContent.subtitle}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground justify-center"
          />

        </div>

        {/* Horizontal Pricing Card */}
        <div className="flex justify-center">
          <div ref={cardRef} className="opacity-0 w-full max-w-5xl">
            <SpotlightCard
              className="!border-[var(--glass-border-hover)] shadow-2xl shadow-foreground/[0.08]"
              style={{
                background: "var(--glass-nav-bg)",
                backdropFilter: "blur(24px) saturate(1.4)",
                WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              }}
            >
              <div className="relative z-10 flex flex-col lg:flex-row">
                {/* Left — Pricing info */}
                <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col gap-6">
                  {/* Label */}
                  <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-medium tracking-wider text-foreground/70 w-fit">
                    <Sparkles className="w-4 h-4" />
                    {card.label}
                  </span>

                  {/* Price */}
                  <div className="flex flex-col gap-2">
                    <span className="text-sm md:text-base text-foreground/50">
                      À partir de
                    </span>
                    <span className="text-4xl md:text-5xl font-black font-mono bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                      {card.price.toLocaleString("fr-FR")} €
                    </span>
                    <p className="text-sm text-foreground/40">{card.mention}</p>
                  </div>

                  {/* Divider */}
                  <div
                    className="w-full h-px"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, var(--color-foreground) 50%, transparent 100%)",
                      opacity: 0.1,
                    }}
                  />

                  {/* Inclus list */}
                  <ul className="space-y-3">
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
                </div>

                {/* Separator */}
                <div className="hidden lg:block w-px bg-foreground/10 my-8" />
                <div className="lg:hidden h-px bg-foreground/10 mx-8" />

                {/* Right — Cal.com embed */}
                <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col gap-4">
                  <h3 className="text-xl font-bold text-foreground">
                    Réserver un call stratégique
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    20 minutes pour comprendre votre vision, estimer le scope et le budget. Gratuit et sans engagement.
                  </p>

                  {/* Cal.com iframe */}
                  <div className="flex-1 min-h-[400px] rounded-xl overflow-hidden border border-foreground/10 bg-foreground/[0.02]">
                    <iframe
                      src="https://cal.com/elliot-estrade-ixfuya/appel-decouverte?embed=true&theme=light"
                      className="w-full h-full min-h-[400px]"
                      frameBorder="0"
                      title="Réserver un call stratégique"
                      loading="lazy"
                    />
                  </div>
                </div>
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
