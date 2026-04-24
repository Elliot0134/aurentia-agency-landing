// src/components/v2/agence/AProposHero.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aProposData } from "@/data/v2/agence-a-propos";

const SECTION_TAGS: { key: string; label: string; sectionId: string }[] = [
  { key: "equipe", label: "L'équipe", sectionId: "equipe" },
  { key: "manifesto", label: "Manifeste", sectionId: "manifesto" },
  { key: "values", label: "Nos valeurs", sectionId: "values" },
  { key: "contact", label: "Nous contacter", sectionId: "contact" },
];

export function AProposHero() {
  const { hero } = aProposData;

  const handleTagClick = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="apropos-hero" className="relative overflow-hidden">
      {/* Top halo — same radial orange halo as other /v2 heroes */}
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

      <div className="relative z-10 pt-20 md:pt-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 py-12 text-center md:px-12 md:py-20">
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange-500)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orange-500)]" />
            </span>
            {hero.eyebrow} · Avignon
          </span>

          {/* H1 */}
          <h1 className="max-w-4xl whitespace-pre-line font-heading text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>

          {/* Subhead */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subHeadline}
          </p>

          {/* Section tags */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SECTION_TAGS.map((tag) => (
              <button
                key={tag.key}
                type="button"
                onClick={() => handleTagClick(tag.sectionId)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3 py-1 text-sm text-muted-foreground transition-all duration-500 ease-in-out hover:border-foreground/40 hover:text-foreground"
              >
                <span className="h-1 w-1 rounded-full bg-muted-foreground/50 transition-colors duration-500 ease-in-out group-hover:bg-[var(--orange-500)]" />
                {tag.label}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/v2/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
            >
              Travailler avec nous
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-in-out" />
            </Link>
            <Link
              href="#equipe"
              onClick={(e) => {
                e.preventDefault();
                handleTagClick("equipe");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40"
            >
              Rencontrer l&apos;équipe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
