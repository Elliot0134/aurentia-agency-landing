import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuditLeadForm } from "./AuditLeadForm";
import { AuditScoreCard } from "./AuditScoreCard";
import { auditData } from "@/data/v2/audit";

const { hero } = auditData;

export function AuditHero() {
  return (
    <section id="preaudit" className="w-full px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-36">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — copy + form */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {hero.headline}{" "}
            <span className="text-accent-primary">{hero.headlineAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-foreground/70 md:text-lg">
            {hero.subHeadline}
          </p>

          <div className="mt-8 max-w-xl">
            <AuditLeadForm source="hero" />
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {hero.proofs.map((proof) => (
              <li key={proof} className="flex items-center gap-2 text-sm text-foreground/60">
                <span className="text-accent-primary">●</span>
                {proof}
              </li>
            ))}
          </ul>

          {/* Séparateur "ou" */}
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-foreground/12" />
            <span className="text-sm text-foreground/40">ou</span>
            <span className="h-px flex-1 bg-foreground/12" />
          </div>

          {/* CTA secondaire — l'audit complet 99 €, bien visible dès le hero */}
          <Link
            href="#pricing"
            className="group mt-5 flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-foreground/15 px-6 py-4 transition-colors duration-500 ease-in-out hover:border-foreground/30 hover:bg-foreground/[0.03]"
          >
            <span className="text-sm text-foreground/70 md:text-base">
              Passez direct à l&apos;
              <span className="font-semibold text-foreground">audit complet</span> — livré sous 24h
            </span>
            <span className="flex shrink-0 items-baseline gap-1 font-heading text-2xl text-foreground md:text-3xl">
              99&nbsp;€
              <span className="text-sm font-medium text-foreground/45">HT</span>
              <ArrowRight className="ml-1 size-5 self-center text-foreground/40 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        {/* Right — score card (radar, cas réel anonymisé) */}
        <AuditScoreCard />
      </div>
    </section>
  );
}
