// src/components/v2/sites-web/SitesWebHero.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CommercialPillarData, SubPageData } from "@/data/v2/types";

type HeroData =
  | CommercialPillarData["hero"]
  | (SubPageData["hero"] & { priceFrom?: string });

type SitesWebHeroProps = {
  hero: HeroData;
  stats?: { value: string; label: string }[];
};

export function SitesWebHero({ hero, stats }: SitesWebHeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* ══════════════════════════════════════════════
           DECOR — top halo (matches HomeHeroV2 exactly)
           ══════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════
           MAIN — centered hero
           ══════════════════════════════════════════════ */}
      <div className="relative z-10 pt-20 md:pt-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 py-12 text-center md:px-12 md:py-20">
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange-500)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orange-500)]" />
            </span>
            {hero.eyebrow}
          </span>

          {/* H1 */}
          <h1 className="max-w-4xl whitespace-pre-line text-foreground">
            {hero.headline}
          </h1>

          {/* Subhead */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subHeadline}
          </p>

          {/* Badges — small pills (same treatment as service tags in HomeHeroV2) */}
          {hero.badges && hero.badges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {hero.badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3 py-1 text-sm text-muted-foreground transition-colors duration-500 ease-in-out"
                  >
                    {Icon ? (
                      <Icon className="size-3.5 text-accent-primary" strokeWidth={1.75} />
                    ) : (
                      <span className="h-1 w-1 rounded-full bg-accent-primary" />
                    )}
                    {badge.label}
                  </span>
                );
              })}
            </div>
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

      {/* ══════════════════════════════════════════════
           STATS BAND — inside layout width, subtle divider
           ══════════════════════════════════════════════ */}
      {stats && stats.length > 0 && (
        <div className="relative z-10 pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
            <div className="grid grid-cols-2 gap-6 rounded-3xl border border-foreground/10 bg-background-surface/60 p-6 md:grid-cols-4 md:p-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 text-center transition-all duration-500 ease-in-out"
                >
                  <span className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-sm text-foreground/60 md:text-base">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
