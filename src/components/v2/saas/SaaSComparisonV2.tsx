"use client";

import { Check, X, Minus } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

type Cell = "yes" | "no" | "partial" | string;

const columns = [
  { key: "freelance", label: "Freelance", sub: "Solo, fragile" },
  { key: "agence", label: "Agence classique", sub: "30k+, 6 mois" },
  { key: "nocode", label: "No-code", sub: "Bubble, Webflow" },
  { key: "aurentia", label: "Aurentia", sub: "Notre approche", highlight: true },
] as const;

type ColKey = (typeof columns)[number]["key"];

const rows: { label: string; values: Record<ColKey, Cell> }[] = [
  {
    label: "Délai de livraison MVP",
    values: { freelance: "1 à 3 mois", agence: "4 à 6 mois", nocode: "2 sem.", aurentia: "1 à 2 sem." },
  },
  {
    label: "Prix d'entrée",
    values: { freelance: "8 000 €", agence: "30 000 €+", nocode: "1 500 €", aurentia: "5 000 €" },
  },
  {
    label: "Code 100% propriétaire",
    values: { freelance: "yes", agence: "yes", nocode: "no", aurentia: "yes" },
  },
  {
    label: "Architecture production-ready",
    values: { freelance: "partial", agence: "yes", nocode: "no", aurentia: "yes" },
  },
  {
    label: "Scalable au-delà de 10k users",
    values: { freelance: "partial", agence: "yes", nocode: "no", aurentia: "yes" },
  },
  {
    label: "Vendor lock-in",
    values: { freelance: "no", agence: "no", nocode: "yes", aurentia: "no" },
  },
  {
    label: "Backstop si la personne quitte",
    values: { freelance: "no", agence: "yes", nocode: "yes", aurentia: "yes" },
  },
  {
    label: "Stack moderne (Next, Supabase…)",
    values: { freelance: "partial", agence: "partial", nocode: "no", aurentia: "yes" },
  },
  {
    label: "Support post-livraison",
    values: { freelance: "partial", agence: "yes", nocode: "yes", aurentia: "yes (30j inclus)" },
  },
];

function renderCell(value: Cell) {
  if (value === "yes") {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-primary/15 text-accent-primary">
        <Check className="size-4" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-foreground/8 text-foreground/40">
        <X className="size-4" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-foreground/10 text-foreground/55">
        <Minus className="size-4" strokeWidth={2.5} />
      </span>
    );
  }
  return <span className="text-base font-medium text-foreground/80">{value}</span>;
}

export function SaaSComparisonV2() {
  return (
    <SectionContainer
      id="comparison"
      eyebrow="Pourquoi nous"
      title="Aurentia vs les alternatives."
      subtitle="Vous hésitez avec un freelance, une agence classique ou du no-code ? Voilà la comparaison à plat — sans bullshit."
      className="py-20 md:py-24"
      titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
    >
      <BlurReveal>
        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-[2rem] border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04]">
          <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr] divide-x divide-foreground/10">
            {/* Header row */}
            <div className="bg-background/50" />
            {columns.map((col) => (
              <div
                key={col.key}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-6 text-center transition-colors duration-500",
                  col.highlight && "bg-accent-primary/10",
                )}
              >
                <span
                  className={cn(
                    "font-heading text-base font-bold md:text-lg",
                    col.highlight ? "text-accent-primary" : "text-foreground/85",
                  )}
                >
                  {col.label}
                </span>
                <span className="text-sm text-foreground/55">{col.sub}</span>
              </div>
            ))}

            {/* Body rows */}
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={cn(
                  "contents",
                  i % 2 === 0 && "[&>*]:bg-background/40",
                )}
              >
                <div className="flex items-center px-6 py-5 text-base font-medium text-foreground/85">
                  {row.label}
                </div>
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={cn(
                      "flex items-center justify-center px-4 py-5 text-center",
                      col.highlight && "bg-accent-primary/[0.06]",
                    )}
                  >
                    {renderCell(row.values[col.key])}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile — Aurentia colonne pleine + recap */}
        <div className="md:hidden flex flex-col gap-6">
          <div className="overflow-hidden rounded-[1.5rem] border border-accent-primary/30 bg-background-surface">
            <div className="bg-accent-primary/10 px-6 py-5 text-center">
              <span className="font-heading text-lg font-bold text-accent-primary">Aurentia</span>
              <p className="text-sm text-foreground/55">Notre approche</p>
            </div>
            <ul className="divide-y divide-foreground/10">
              {rows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <span className="text-base text-foreground/75">{row.label}</span>
                  <span className="shrink-0">{renderCell(row.values.aurentia)}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-sm text-foreground/55">
            Comparaison complète avec freelance, agence et no-code disponible sur desktop.
          </p>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
