// src/components/v2/sites-web/SitesWebPricing.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Check, CreditCard, Gift } from "lucide-react";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { PriceHT } from "@/components/v2/shared/PriceHT";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

type SitesWebPricingProps = {
  data: SubPageData["pricing"];
};

export function SitesWebPricing({ data }: SitesWebPricingProps) {
  const cols =
    data.packs.length === 1
      ? "md:grid-cols-1 max-w-md mx-auto"
      : data.packs.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <SectionContainer
      id="pricing"
      title={data.title}
      subtitle={
        data.subtitle ??
        "Des prix clairs. Pas de facturation cachée, pas de frais mensuels obligatoires."
      }
    >
      <div className={cn("grid gap-6", cols)}>
        {data.packs.map((pack, idx) => (
          <BlurReveal key={pack.name} delay={idx * 0.1}>
            <div
              className={cn(
                "relative flex h-full flex-col gap-6 rounded-3xl p-8 transition-colors duration-500 ease-in-out",
                pack.recommended
                  ? "bg-accent-primary/[0.06] hover:bg-accent-primary/[0.09]"
                  : "bg-background-surface hover:bg-foreground/[0.04] dark:bg-foreground/[0.03] dark:hover:bg-foreground/[0.05]",
              )}
            >
              {pack.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-primary px-3 py-1 text-sm font-semibold text-white">
                  {pack.highlightLabel ?? "Recommandé"}
                </span>
              )}
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {pack.name}
                </h3>
                {pack.pricePrefix && (
                  <p className="text-sm font-medium text-foreground/55">
                    {pack.pricePrefix}
                  </p>
                )}
                {pack.price && (
                  <p className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                    <PriceHT value={pack.price} />
                    {pack.priceSuffix && (
                      <span className="text-base font-medium text-foreground/55">
                        {" "}
                        {pack.priceSuffix}
                      </span>
                    )}
                  </p>
                )}
                {pack.priceNote && (
                  <p className="text-sm text-foreground/50">{pack.priceNote}</p>
                )}
                {pack.description && (
                  <p className="mt-1 text-base text-foreground/70">
                    {pack.description}
                  </p>
                )}
              </div>

              <ul className="flex flex-1 flex-col gap-2.5">
                {pack.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-base text-foreground/80"
                  >
                    <Check className="mt-1 size-4 shrink-0 text-accent-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              {pack.bonus && pack.bonus.length > 0 && (
                <div className="rounded-2xl border border-accent-primary/15 bg-accent-primary/[0.04] p-4">
                  <div className="mb-2 flex items-center gap-1.5">
                    <Gift className="size-4 text-accent-primary" />
                    <span className="text-sm font-semibold text-accent-primary">
                      Bonus inclus
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1">
                    {pack.bonus.map((b) => (
                      <li
                        key={b}
                        className="text-base leading-snug text-foreground/65"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pack.subscription && (
                <div className="flex items-start gap-2 rounded-xl border border-foreground/5 bg-foreground/[0.02] p-3">
                  <CreditCard className="mt-0.5 size-4 shrink-0 text-foreground/40" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold leading-snug text-foreground/80">
                      Abo : <PriceHT value={pack.subscription} />
                      <span className="ml-1.5 font-normal text-accent-primary">
                        — 1er mois offert
                      </span>
                    </p>
                    {pack.subscriptionDetails && (
                      <p className="text-sm leading-snug text-foreground/45">
                        {pack.subscriptionDetails}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <Link
                href={pack.cta.href}
                className={cn(
                  "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-500 ease-in-out",
                  pack.recommended
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

      {(data.conditions?.length || data.sideLink) && (
        <BlurReveal className="mt-8 md:mt-10" delay={0.3}>
          <div className="flex flex-col gap-6 rounded-3xl border border-transparent bg-background-surface p-6 dark:border-foreground/10 dark:bg-foreground/[0.04] md:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            {data.conditions && data.conditions.length > 0 && (
              <ul className="grid flex-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {data.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/70 md:text-base">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent-primary"
                      strokeWidth={2.5}
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            )}
            {data.sideLink && (
              <Link
                href={data.sideLink.href}
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-2xl border border-accent-primary/20 bg-accent-primary/10 px-5 py-3 text-sm font-semibold text-accent-primary transition-all duration-500 ease-in-out hover:border-accent-primary/40 hover:bg-accent-primary/15 lg:self-auto"
              >
                {data.sideLink.label}
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </BlurReveal>
      )}

      {data.note && !data.sideLink && (
        <p className="mt-8 text-center text-base text-foreground/55">
          {data.note}
        </p>
      )}
      {data.note && data.sideLink && (
        <p className="mt-4 text-center text-sm text-foreground/50">
          {data.note}
        </p>
      )}
    </SectionContainer>
  );
}
