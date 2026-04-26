// src/components/implementation-ia/ImplementationIAHeroV2.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutionsIaImplementationData } from "@/data/v2/solutions-ia-implementation";
import { PriceHT } from "@/components/v2/shared/PriceHT";

const CLIENT_LOGOS = [
  "Comparateur IA Facile",
  "French Tech",
  "AlloRestau",
  "Friend'iz",
  "HiLove",
  "Maison Enileh",
  "Savistas",
  "Golf Mentor",
];

type SolutionTagKey = "audit" | "configuration-claude" | "formation-ia";

const SOLUTION_TAGS: { key: SolutionTagKey; label: string; href: string }[] = [
  { key: "audit", label: "Audit IA", href: "/solutions-ia/audit" },
  {
    key: "configuration-claude",
    label: "Configuration Claude",
    href: "/solutions-ia/configuration-claude",
  },
  { key: "formation-ia", label: "Formation IA", href: "/solutions-ia/formation-ia" },
];

/**
 * Implémentation IA hero — mirrors HomeHeroV2 (halo, pill, H1, sub-offer chips,
 * dual CTA, priceFrom teaser, client marquee). Content is implementation-ia
 * specific, chips link to the other Solutions IA sub-pages.
 */
export function ImplementationIAHeroV2() {
  const { hero } = solutionsIaImplementationData;

  return (
    <section className="relative overflow-hidden">
      {/* Top halo — matches homepage exactly */}
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
            Implémentation IA · Avignon
          </span>

          {/* H1 */}
          <h1 className="max-w-4xl whitespace-pre-line text-foreground">
            {hero.headline}
          </h1>

          {/* Subhead */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subHeadline}
          </p>

          {/* Cross-sub-service chip tags */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SOLUTION_TAGS.map((tag) => (
              <Link
                key={tag.key}
                href={tag.href}
                className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3 py-1 text-sm text-muted-foreground transition-all duration-500 ease-in-out hover:border-foreground/40 hover:text-foreground"
              >
                <span className="h-1 w-1 rounded-full bg-muted-foreground/50 transition-colors duration-500 ease-in-out group-hover:bg-[var(--orange-500)]" />
                {tag.label}
              </Link>
            ))}
          </div>

          {/* priceFrom teaser */}
          {hero.priceFrom && (
            <p className="text-base text-foreground/65">
              À partir de{" "}
              <span className="font-bold text-foreground"><PriceHT value={hero.priceFrom} /></span>
            </p>
          )}

          {/* CTAs */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={hero.cta.primary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
            >
              {hero.cta.primary.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-in-out" />
            </Link>
            <Link
              href={hero.cta.secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40"
            >
              {hero.cta.secondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Client marquee */}
      <div className="relative z-10 py-8 md:py-10">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <p className="mb-5 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Ils nous font confiance
          </p>
          <div className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background/85 to-transparent md:w-32"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background/85 to-transparent md:w-32"
              aria-hidden
            />
            <div className="marquee-track flex gap-x-16">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="shrink-0 text-sm font-medium uppercase tracking-[0.14em] text-foreground/70"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
