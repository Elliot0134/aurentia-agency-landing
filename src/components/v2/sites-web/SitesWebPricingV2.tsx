// src/components/v2/sites-web/SitesWebPricingV2.tsx
"use client";

import Link from "next/link";
import { Check, Gift, CreditCard } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { PriceHT } from "@/components/v2/shared/PriceHT";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { sitesWebExtra } from "@/data/v2/sites-web";
import { cn } from "@/lib/utils";

export function SitesWebPricingV2() {
  const { pricing } = sitesWebExtra;

  return (
    <SectionContainer
      id="pricing"
      title={pricing.title}
      subtitle={pricing.subtitle}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {pricing.packs.map((pack, idx) => (
          <BlurReveal key={pack.name} delay={idx * 0.1}>
            <div
              className={cn(
                "relative flex h-full flex-col gap-6 rounded-3xl border bg-background p-8 transition-colors duration-500 ease-in-out",
                pack.popular
                  ? "border-accent-primary/60 hover:border-accent-primary"
                  : "border-foreground/10 hover:border-foreground/25",
              )}
            >
              {/* Popular badge */}
              {pack.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-primary px-4 py-1 text-sm font-semibold text-white">
                  Populaire
                </span>
              )}

              {/* Name + Price */}
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="font-heading text-xl font-bold text-accent-primary">
                  {pack.name}
                </h3>
                <span className="whitespace-nowrap font-heading text-3xl font-bold text-accent-primary md:text-4xl">
                  <PriceHT value={pack.price} />
                </span>
                {pack.priceSuffix && (
                  <span className="text-sm text-foreground/55">
                    {pack.priceSuffix}
                  </span>
                )}
                {pack.tagline && (
                  <p className="mt-1 text-sm text-foreground/65">
                    {pack.tagline}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="flex flex-col gap-2.5">
                <span className="text-sm font-semibold uppercase tracking-wider text-foreground/40">
                  Inclus
                </span>
                <ul className="flex flex-col gap-2">
                  {pack.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-foreground/80"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bonuses */}
              {pack.bonuses.length > 0 && (
                <div className="mt-auto flex flex-col gap-2.5">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-accent-primary">
                    <Gift className="size-3.5" />
                    Bonus inclus
                  </span>
                  <ul className="flex flex-col gap-2">
                    {pack.bonuses.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-foreground/80"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Subscription */}
              <div className={cn(
                "flex flex-col gap-2 rounded-xl border border-foreground/10 bg-background-surface p-4 dark:bg-foreground/[0.03]",
                pack.bonuses.length === 0 && "mt-auto",
              )}>
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 text-foreground/50" />
                  <span className="text-sm font-semibold text-foreground">
                    <PriceHT value={pack.subscription} />
                  </span>
                </div>
                <p className="text-sm text-foreground/55">
                  {pack.subscriptionNote}
                </p>
              </div>

              {/* CTA */}
              <Link
                href={pack.cta.href}
                className={cn(
                  "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-500 ease-in-out",
                  pack.popular
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground/40",
                )}
              >
                {pack.cta.label}
              </Link>
            </div>
          </BlurReveal>
        ))}
      </div>

      {/* Payment terms */}
      <BlurReveal delay={0.4}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {pricing.paymentTerms.map((term) => (
            <span
              key={term}
              className="inline-flex items-center gap-2 text-sm text-foreground/55"
            >
              <Check className="size-3.5 text-accent-primary" />
              {term}
            </span>
          ))}
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
