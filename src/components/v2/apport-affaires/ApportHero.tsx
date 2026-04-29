"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { apportHero } from "@/data/apport-affaires-content";
import { BlurReveal } from "@/components/animations/BlurReveal";

const PRIMARY_HREF = "/contact?subject=apporteur-d-affaires";

export function ApportHero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-foreground/10"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse 110% 90% at 50% 0%,
              color-mix(in srgb, var(--orange-500) 32%, transparent) 0%,
              color-mix(in srgb, var(--orange-500) 18%, transparent) 30%,
              color-mix(in srgb, var(--orange-500) 8%, transparent) 60%,
              transparent 100%
            )`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-12 px-6 py-24 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16 md:px-12 md:py-28">
        {/* LEFT — copy */}
        <BlurReveal className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm uppercase tracking-[0.18em] text-foreground/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-primary" />
            </span>
            {apportHero.badge}
          </span>

          <h1 className="font-heading text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {apportHero.headline}
          </h1>

          <p className="max-w-xl text-base text-foreground/70 md:text-lg">
            {apportHero.subtitle}
          </p>

          <div className="flex flex-wrap gap-2">
            {apportHero.proofs.map((proof) => (
              <span
                key={proof}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3 py-1.5 text-sm text-foreground/75"
              >
                <Check
                  className="size-3.5 text-accent-primary"
                  strokeWidth={2.5}
                />
                {proof}
              </span>
            ))}
          </div>

          <Link
            href={PRIMARY_HREF}
            className="group mt-2 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background transition-colors duration-500 ease-in-out hover:bg-foreground/90"
          >
            {apportHero.ctaLabel}
            <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </Link>
        </BlurReveal>

        {/* RIGHT — typographic anchor "10%" */}
        <BlurReveal delay={0.15} className="relative hidden md:block">
          <div className="relative aspect-square w-full">
            <div
              className="absolute inset-0 rounded-[2.5rem] bg-background-surface"
              aria-hidden
            />
            <div
              className="absolute inset-0 rounded-[2.5rem]"
              style={{
                background: `radial-gradient(
                  circle at 50% 50%,
                  color-mix(in srgb, var(--orange-500) 14%, transparent) 0%,
                  transparent 70%
                )`,
              }}
              aria-hidden
            />
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-primary">
                Commission
              </span>
              <span className="font-heading text-[12rem] font-black leading-none tracking-tighter text-foreground lg:text-[14rem]">
                {apportHero.commissionPercent}
                <span className="text-accent-primary">%</span>
              </span>
              <span className="text-base font-medium text-foreground/65">
                sur chaque projet signé
              </span>
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
