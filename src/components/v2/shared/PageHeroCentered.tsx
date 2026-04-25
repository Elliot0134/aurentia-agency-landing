// src/components/v2/shared/PageHeroCentered.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Badge, DualCTA as DualCTAType } from "@/data/v2/types";
import { ServiceBadge } from "./ServiceBadge";

type PageHeroCenteredProps = {
  eyebrow: string;
  headline: string;
  subHeadline: string;
  priceFrom?: string;
  badges?: Badge[];
  cta: DualCTAType;
};

/**
 * Reusable centered hero matching the /v2 homepage visual language.
 * Orange halo at the top, pill eyebrow, large headline, subheadline,
 * optional badges, primary+secondary CTA row.
 */
export function PageHeroCentered({
  eyebrow,
  headline,
  subHeadline,
  priceFrom,
  badges,
  cta,
}: PageHeroCenteredProps) {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Orange halo at top — same as HomeHeroV2 */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[500px]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse 130% 100% at 50% 0%,
              color-mix(in srgb, var(--orange-500) 45%, transparent) 0%,
              color-mix(in srgb, var(--orange-500) 36%, transparent) 12%,
              color-mix(in srgb, var(--orange-500) 26%, transparent) 25%,
              color-mix(in srgb, var(--orange-500) 18%, transparent) 38%,
              color-mix(in srgb, var(--orange-500) 11%, transparent) 52%,
              color-mix(in srgb, var(--orange-500) 6%, transparent) 66%,
              color-mix(in srgb, var(--orange-500) 2%, transparent) 82%,
              transparent 100%
            )`,
          }}
        />
      </div>

      {/* Main — centered hero */}
      <div className="relative z-10 pt-20 md:pt-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 py-12 text-center md:px-12 md:py-20">
          {/* Pill eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange-500)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orange-500)]" />
            </span>
            {eyebrow}
          </span>

          {/* Headline */}
          <h1 className="max-w-4xl whitespace-pre-line text-foreground">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subHeadline}
          </p>

          {/* priceFrom — for subpages */}
          {priceFrom && (
            <p className="text-base text-foreground/65">
              À partir de <span className="font-bold text-foreground">{priceFrom}</span>
            </p>
          )}

          {/* Badges — rendered as service badges if provided */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {badges.map((b) => (
                <ServiceBadge key={b.label} badge={b} />
              ))}
            </div>
          )}

          {/* CTAs — primary orange, secondary outline */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={cta.primary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
            >
              {cta.primary.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-in-out" />
            </Link>
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40"
            >
              {cta.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
