// src/components/v2/ressources/sections/SectionConcepts.tsx
import { Quote } from "lucide-react";
import { karpathyQuote, willisonDistinction, vibeCodingStats } from "@/data/v2/vibe-coding";

export function SectionConcepts() {
  return (
    <div className="flex flex-col gap-8">
      {/* Karpathy quote */}
      <figure className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-7 md:p-9">
        <Quote
          className="absolute right-6 top-6 size-12 text-accent-primary/15 md:size-16"
          aria-hidden
        />
        <blockquote className="relative">
          <p className="font-heading text-xl leading-snug text-foreground md:text-2xl">
            « {karpathyQuote.vo} »
          </p>
          <p className="mt-3 text-base text-foreground/55 md:text-lg">{karpathyQuote.fr}</p>
        </blockquote>
        <figcaption className="relative mt-5 text-sm font-medium uppercase tracking-[0.14em] text-accent-primary">
          {karpathyQuote.source}{" "}
          <span className="text-foreground/40 normal-case tracking-normal">
            — {karpathyQuote.date}
          </span>
        </figcaption>
      </figure>

      {/* Spectrum vibe coding ↔ vibe engineering */}
      <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Le spectre
        </p>
        <h3 className="mb-6 font-heading text-xl text-foreground md:text-2xl">
          Vibe coding ←→ Vibe engineering
        </h3>

        <div className="relative pt-12 pb-2">
          {/* Top markers */}
          <div className="absolute inset-x-0 top-0 flex justify-between px-2">
            <span className="text-sm font-semibold text-foreground/70">Speed</span>
            <span className="text-sm font-semibold text-foreground/70">Discipline</span>
          </div>

          {/* The bar */}
          <div className="relative h-3 overflow-hidden rounded-full bg-foreground/[0.06]">
            <div
              className="absolute inset-y-0 left-0 right-0"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent) 0%, var(--accent) 35%, color-mix(in srgb, var(--accent) 50%, transparent) 50%, color-mix(in srgb, var(--foreground) 60%, transparent) 65%, var(--foreground) 100%)",
              }}
            />
            {/* Mid divider */}
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-background" aria-hidden />
          </div>

          {/* Bottom zone labels */}
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold text-accent-primary">Vibe coding</p>
              <p className="mt-0.5 text-foreground/55">Proto, démo, internal tools</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">Vibe engineering</p>
              <p className="mt-0.5 text-foreground/55">Auth, paiement, prod</p>
            </div>
          </div>
        </div>

        {/* TL;DR cards */}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-foreground/10 p-5">
            <p className="text-sm leading-relaxed text-foreground/80">
              Construire avec un LLM <strong className="text-foreground">sans reviewer le code</strong>.
              Speed &gt; qualité. On ship pour valider.
            </p>
          </div>
          <div className="rounded-2xl border border-accent-primary/30 bg-accent-primary/[0.05] p-5">
            <p className="text-sm leading-relaxed text-foreground/80">
              LLM + spec + tests + review.{" "}
              <strong className="text-foreground">Obligatoire</strong> dès auth, paiement ou prod.
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-foreground/45">{willisonDistinction.source}</p>
      </div>

      {/* 5 chiffres */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {vibeCodingStats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 transition-colors duration-500 ease-in-out hover:border-accent-primary/30"
          >
            <p className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              {s.value}
              {s.suffix && <span className="text-accent-primary">{s.suffix}</span>}
            </p>
            <p className="text-sm leading-snug text-foreground/60">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
