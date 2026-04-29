// src/components/v2/formation-ia/FormationPricingV2.tsx
"use client";

import Link from "next/link";
import { Check, Flame } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { PriceHT } from "@/components/v2/shared/PriceHT";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";
import { cn } from "@/lib/utils";

export function FormationPricingV2() {
  const { pricing } = solutionsIaFormationData;

  return (
    <SectionContainer
      id="pricing"
      eyebrow={pricing.eyebrow}
      title={pricing.title}
      subtitle={pricing.subtitle}
    >
      {/* Early bird ribbon */}
      <BlurReveal>
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-accent-primary/30 bg-accent-primary/[0.08] px-5 py-2.5 text-sm font-semibold text-accent-primary">
            <Flame className="size-4" />
            <span>{pricing.earlyBirdNote}</span>
          </div>
        </div>
      </BlurReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pricing.packs.map((pack, idx) => (
          <BlurReveal key={pack.name} delay={idx * 0.08}>
            <div
              className={cn(
                "relative flex h-full flex-col gap-6 rounded-3xl border bg-background-surface dark:bg-foreground/[0.04] p-8 transition-colors duration-500 ease-in-out",
                pack.recommended
                  ? "border-accent-primary/60 hover:border-accent-primary"
                  : "border-transparent dark:border-foreground/10 dark:hover:border-foreground/25"
              )}
            >
              {pack.badge && (
                <span
                  className={cn(
                    "absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold",
                    pack.recommended
                      ? "bg-accent-primary text-white"
                      : "bg-foreground text-background"
                  )}
                >
                  {!pack.recommended && <Flame className="size-3.5" />}
                  {pack.badge}
                </span>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {pack.name}
                </h3>
                <p className="text-base leading-relaxed text-foreground/65">
                  {pack.description}
                </p>
              </div>

              <div className="flex flex-col gap-1 border-y border-foreground/10 py-5">
                {pack.pricePrefix && (
                  <span className="text-sm uppercase tracking-wider text-accent-primary">
                    {pack.pricePrefix}
                  </span>
                )}
                <p className="font-heading text-4xl font-black text-foreground">
                  <PriceHT value={pack.price} />
                </p>
                {pack.priceSuffix && (
                  <p className="text-base text-foreground/45 line-through decoration-foreground/30">
                    {pack.priceSuffix}
                  </p>
                )}
              </div>

              <ul className="flex flex-1 flex-col gap-2.5">
                {pack.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-base text-foreground/80"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={pack.cta.href}
                className={cn(
                  "inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-base font-semibold transition-all duration-500 ease-in-out",
                  pack.recommended
                    ? "bg-accent-primary text-white hover:opacity-90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                )}
              >
                {pack.cta.label}
              </Link>
            </div>
          </BlurReveal>
        ))}
      </div>

      <BlurReveal delay={0.3}>
        <p className="mt-10 text-center text-base text-foreground/55">
          {pricing.note}
        </p>
      </BlurReveal>
    </SectionContainer>
  );
}
