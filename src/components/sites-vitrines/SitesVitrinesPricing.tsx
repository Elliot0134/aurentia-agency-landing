"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import {
  pricingContent,
  pricingPlans,
} from "@/data/sites-vitrines-content";
import { Check, Gift, ArrowRight, CreditCard } from "lucide-react";

export function SitesVitrinesPricing() {
  return (
    <Section>
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
        <BlurReveal className="mb-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10">
            {pricingContent.badge}
          </span>
        </BlurReveal>

        <TextGradientReveal
          text={pricingContent.title}
          elementType="h2"
          className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
        />
        <BlurReveal className="mt-3" delay={0.15}>
          <p className="text-base text-foreground/50">
            {pricingContent.subtitle}
          </p>
        </BlurReveal>
      </div>

      {/* Plans grid */}
      <BlurReveal stagger={0.12}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 max-w-6xl mx-auto items-stretch">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className="relative flex">
              {/* Popular label */}
              {plan.highlighted && plan.highlightLabel && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-3 py-0.5 rounded-full text-sm font-bold tracking-wider bg-accent-primary text-background shadow-lg shadow-accent-primary/20">
                    {plan.highlightLabel}
                  </span>
                </div>
              )}

              <SpotlightCard
                className={`flex-1 flex flex-col transition-all duration-700 ${
                  plan.highlighted
                    ? "border-accent-primary/30 bg-gradient-to-b from-accent-primary/[0.04] to-transparent ring-1 ring-accent-primary/10"
                    : ""
                }`}
              >
                <div className="relative z-10 flex flex-col h-full p-5 md:p-6">
                  {/* Plan name + price */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <span className="text-3xl md:text-4xl font-black font-mono bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.priceNote && (
                      <p className="text-sm text-foreground/40 mt-0.5">
                        {plan.priceNote}
                      </p>
                    )}
                    <p className="text-sm text-foreground/50 mt-1.5">
                      {plan.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-foreground/[0.06] mb-4" />

                  {/* Features */}
                  <div className="space-y-2 mb-4 flex-1">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5">
                        <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-accent-primary/10 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-accent-primary" />
                        </div>
                        <span className="text-sm text-foreground/60">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bonus */}
                  <div className="p-3 rounded-xl bg-accent-primary/[0.04] border border-accent-primary/10 mb-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Gift className="w-3.5 h-3.5 text-accent-primary" />
                      <span className="text-sm font-semibold text-accent-primary">
                        Bonus inclus
                      </span>
                    </div>
                    {plan.bonus.map((b) => (
                      <p key={b} className="text-sm text-foreground/50 leading-snug">
                        {b}
                      </p>
                    ))}
                  </div>

                  {/* Subscription */}
                  <div className="flex items-start gap-2 mb-4 p-2.5 rounded-lg bg-foreground/[0.02] border border-foreground/5">
                    <CreditCard className="w-3.5 h-3.5 text-foreground/40 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground/70 leading-snug">
                        Abo : {plan.subscription}
                        <span className="font-normal text-accent-primary ml-1.5">
                          — 1er mois offert
                        </span>
                      </p>
                      <p className="text-sm text-foreground/40 leading-snug mt-0.5">
                        {plan.subscriptionDetails}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={plan.ctaLink}
                    className={`mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-500 ${
                      plan.highlighted
                        ? "bg-foreground text-background hover:opacity-90"
                        : "bg-foreground/5 text-foreground border border-foreground/10 hover:bg-foreground/10 hover:border-foreground/20"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </BlurReveal>

      {/* Conditions + Note conciergerie */}
      <BlurReveal className="mt-8 md:mt-10 max-w-6xl mx-auto" delay={0.3}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {pricingContent.conditions.map((c) => (
              <p key={c} className="text-sm text-foreground/40">
                {c}
              </p>
            ))}
          </div>
          <Link
            href={pricingContent.noteLink}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-primary/10 text-accent-primary font-semibold text-sm border border-accent-primary/15 hover:bg-accent-primary/20 hover:border-accent-primary/30 transition-all duration-500"
          >
            Packs conciergeries
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </BlurReveal>
    </Section>
  );
}
