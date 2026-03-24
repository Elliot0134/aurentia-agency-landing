"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import {
  conciergeriesPricingContent,
  conciergeriesSiteConfig,
} from "@/data/conciergeries-content";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ConciergeriePricing() {
  const { title, subtitle, plans, footer } = conciergeriesPricingContent;
  const bookingUrl = conciergeriesSiteConfig.bookingUrl;
  const highlightedRef = useRef<HTMLDivElement>(null);

  // Pulsing border glow on the highlighted (Croissance) card wrapper
  useGSAP(() => {
    if (!highlightedRef.current) return;

    gsap.fromTo(
      highlightedRef.current,
      { boxShadow: "0 0 40px -10px rgba(201,100,66,0.15)" },
      {
        boxShadow: "0 0 80px -10px rgba(201,100,66,0.3)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: highlightedRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  return (
    <Section id="tarifs" theme="dark" className="py-32 relative">
      {/* High luminosity orbs — narrative climax */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[15%] left-[10%]", size: "w-[500px] h-[500px]", opacity: "[0.12]" },
          { color: "ambre", position: "bottom-[20%] right-[5%]", size: "w-[450px] h-[450px]", opacity: "[0.09]" },
          { color: "rose", position: "top-[50%] left-[50%]", size: "w-[400px] h-[400px]", opacity: "[0.06]" },
          { color: "violet", position: "bottom-[40%] left-[20%]", size: "w-[300px] h-[300px]", opacity: "[0.05]" },
        ]}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <TextReveal
            text={title}
            elementType="h2"
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 justify-center"
          />
          <BlurReveal delay={0.15}>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
              {subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <BlurReveal
              key={idx}
              delay={idx * 0.1}
              className={
                plan.highlighted
                  ? "relative lg:-mt-8 lg:-mb-8 z-10"
                  : ""
              }
            >
              <div ref={plan.highlighted ? highlightedRef : undefined} className={plan.highlighted ? "rounded-3xl h-full" : "h-full"}>
              <SpotlightCard
                className={`p-8 md:p-10 h-full flex flex-col justify-between ${
                  plan.highlighted
                    ? "glass-strong border-accent-primary/50"
                    : ""
                }`}
              >
                {/* Badge "Recommandé" */}
                {plan.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-accent-gradient text-foreground text-sm font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan name + description */}
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-foreground/50 mb-8 min-h-[3rem]">
                    {plan.description}
                  </p>

                  {/* Price — bigger for highlighted */}
                  <div className="mb-8">
                    <span className={`font-black font-mono text-foreground ${
                      plan.highlighted ? "text-4xl md:text-5xl" : "text-4xl"
                    }`}>
                      {plan.price}
                    </span>
                    {plan.price !== "Sur devis" && (
                      <span className="text-foreground/50 text-sm ml-2">HT</span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-4 mb-10">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscription + CTA */}
                <div className="mt-auto pt-8 border-t border-foreground/10">
                  <div className="mb-6">
                    <span className="text-lg font-bold font-mono text-foreground block mb-1">
                      {plan.subscription}
                    </span>
                    <span className="text-sm uppercase tracking-wider text-foreground/50">
                      {plan.subscriptionLabel}
                    </span>
                  </div>

                  {plan.highlighted ? (
                    <MagneticButton
                      glow
                      className="w-full text-center py-4 flex justify-center"
                      onClick={() => window.open(bookingUrl, "_blank")}
                    >
                      {plan.cta}
                    </MagneticButton>
                  ) : (
                    <button
                      className="w-full text-center py-4 rounded-full border border-foreground/20 bg-foreground/5 hover:bg-foreground/10 text-foreground font-medium transition-all duration-500 cursor-pointer"
                      onClick={() => window.open(bookingUrl, "_blank")}
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              </SpotlightCard>
            </div>
            </BlurReveal>
          ))}
        </div>

        {/* Footer */}
        <BlurReveal delay={0.3}>
          <p className="text-center text-foreground/40 mt-12 max-w-2xl mx-auto text-sm">
            {footer}
          </p>
        </BlurReveal>
      </div>
    </Section>
  );
}
