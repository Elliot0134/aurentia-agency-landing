"use client";

import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { pricingContent } from "@/data/content";
import { Check } from "lucide-react";

export function ConciergeriePricing() {
  return (
    <Section id="tarifs" theme="dark" className="py-32">
      <div className="text-center mb-20">
        <TextReveal 
          text={pricingContent.title} 
          elementType="h2"
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 justify-center"
        />
        <p className="text-foreground-muted max-w-2xl mx-auto">{pricingContent.footer}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {pricingContent.plans.map((plan, idx) => (
          <BlurReveal key={idx} delay={idx * 0.1} className={plan.highlighted ? "relative lg:-mt-8 lg:-mb-8 z-10" : ""}>
            <SpotlightCard className={`p-8 md:p-10 h-full flex flex-col justify-between ${plan.highlighted ? "glass-strong border-accent-primary/50 shadow-[0_0_80px_rgba(201,100,66,0.15)]" : ""}`}>
              
              {plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-accent-gradient text-foreground text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-foreground-muted mb-8 h-12">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-black font-mono text-foreground">{plan.price}</span>
                  {plan.price !== "Sur devis" && <span className="text-foreground-muted text-sm ml-2">HT</span>}
                </div>

                <ul className="flex flex-col gap-4 mb-10">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8 border-t border-foreground/10">
                <div className="mb-6">
                  <span className="text-lg font-bold font-mono text-foreground block mb-1">{plan.subscription}</span>
                  <span className="text-xs uppercase tracking-wider text-foreground-muted">{plan.subscriptionLabel}</span>
                </div>

                {plan.highlighted ? (
                  <MagneticButton glow className="w-full text-center py-4 flex justify-center" onClick={() => window.open('https://cal.com/aurentia', '_blank')}>
                    {plan.cta}
                  </MagneticButton>
                ) : (
                  <button className="w-full text-center py-4 rounded-full border border-foreground/20 bg-foreground/5 hover:bg-foreground/10 text-foreground font-medium transition-colors cursor-none" onClick={() => window.open('https://cal.com/aurentia', '_blank')}>
                    {plan.cta}
                  </button>
                )}
              </div>
            </SpotlightCard>
          </BlurReveal>
        ))}
      </div>
    </Section>
  );
}
