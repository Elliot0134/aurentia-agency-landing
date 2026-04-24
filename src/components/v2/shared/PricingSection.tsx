// src/components/v2/shared/PricingSection.tsx
import Link from "next/link";
import { Check } from "lucide-react";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "./SectionContainer";
import { cn } from "@/lib/utils";

type PricingSectionProps = {
  data: SubPageData["pricing"];
  id?: string;
  className?: string;
};

/**
 * Pricing packs visual — matches homepage card language. Centered title,
 * rounded border cards, recommended pack highlighted with accent-primary border.
 */
export function PricingSection({ data, id = "pricing", className }: PricingSectionProps) {
  const cols =
    data.packs.length === 1
      ? "md:grid-cols-1 max-w-md mx-auto"
      : data.packs.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <SectionContainer id={id} title={data.title} subtitle={data.subtitle} className={className}>
      <div className={cn("grid gap-6", cols)}>
        {data.packs.map((pack) => (
          <div
            key={pack.name}
            className={cn(
              "relative flex flex-col gap-6 rounded-3xl border bg-background-surface dark:bg-foreground/[0.04] p-8 transition-colors duration-500 ease-in-out",
              pack.recommended
                ? "border-accent-primary/60 hover:border-accent-primary"
                : "border-transparent dark:border-foreground/10 dark:hover:border-foreground/25"
            )}
          >
            {pack.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-primary px-3 py-1 text-sm font-semibold text-background">
                Recommandé
              </span>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-xl font-bold text-foreground">{pack.name}</h3>
              <p className="font-heading text-3xl font-bold text-foreground">
                {pack.price}
                {pack.priceSuffix && (
                  <span className="text-base font-medium text-foreground/55"> {pack.priceSuffix}</span>
                )}
              </p>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {pack.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-base text-foreground/75">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={pack.cta.href}
              className={cn(
                "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-500 ease-in-out",
                pack.recommended
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "border border-foreground/20 text-foreground hover:border-foreground/40"
              )}
            >
              {pack.cta.label}
            </Link>
          </div>
        ))}
      </div>
      {data.note && <p className="mt-8 text-center text-base text-foreground/55">{data.note}</p>}
    </SectionContainer>
  );
}
