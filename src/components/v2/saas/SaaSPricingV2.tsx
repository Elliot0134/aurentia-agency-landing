"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

const mainPack = {
  name: "MVP en 2 semaines",
  price: "5 000 €",
  priceNote: "à partir de — paiement en 3× possible",
  description:
    "Votre SaaS en production, deux semaines après le premier appel. Tout est inclus pour partir vendre.",
  features: [
    "Architecture production-ready (Next.js + Supabase)",
    "Authentification + gestion des rôles",
    "Base de données structurée + RLS",
    "Paiements Stripe (abonnements, one-shot)",
    "Dashboard utilisateur + back-office admin",
    "Déploiement en production sur votre domaine",
    "Code 100% propriétaire — vous repartez avec",
    "30 jours de support inclus",
  ],
  cta: { label: "Lancer mon MVP", href: "/contact" },
};

const customBand = {
  title: "Un autre besoin ? On chiffre en 48h.",
  description:
    "Refonte SaaS, outil interne métier, intégration IA, partenariat tech en whitelabel — chaque projet sur-mesure mérite un chiffrage précis.",
  examples: [
    "Refonte SaaS existant",
    "Outil interne métier",
    "Intégration IA dans un produit",
    "Partenariat tech agences",
  ],
  cta: { label: "Demander un chiffrage", href: "/contact" },
};

export function SaaSPricingV2() {
  return (
    <SectionContainer
      id="pricing"
      title="Un prix clair, le sur-mesure pour le reste."
      className="py-20 md:py-24"
      titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main pack — 2/3 largeur sur desktop */}
        <BlurReveal className="lg:col-span-2">
          <div className="relative h-full overflow-hidden rounded-[2rem] border border-accent-primary/30 bg-background-surface p-8 transition-colors duration-500 ease-in-out hover:border-accent-primary/60 md:p-12">
            {/* Sparkle badge */}
            <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-accent-primary px-3 py-1 text-sm font-semibold text-white">
              <Sparkles className="size-3.5" strokeWidth={2} />
              Notre offre signature
            </span>

            {/* Name + Price */}
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                {mainPack.name}
              </h3>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-heading text-5xl font-bold text-accent-primary md:text-6xl">
                  {mainPack.price}
                </span>
                <span className="text-base text-foreground/55">
                  {mainPack.priceNote}
                </span>
              </div>
              <p className="mt-2 text-base text-foreground/70 md:text-lg">
                {mainPack.description}
              </p>
            </div>

            {/* Features grid — 2 cols on desktop pour aérer */}
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {mainPack.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-base text-foreground/80"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-primary/15 text-accent-primary">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href={mainPack.cta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-base font-medium text-background transition-all duration-500 ease-in-out hover:gap-3"
              >
                {mainPack.cta.label}
                <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </BlurReveal>

        {/* Custom band — 1/3 largeur, vertical */}
        <BlurReveal delay={0.15}>
          <div className="flex h-full flex-col gap-6 rounded-[2rem] border border-transparent bg-background-surface p-8 transition-colors duration-500 ease-in-out hover:shadow-sm dark:border-foreground/10 dark:bg-foreground/[0.04] dark:hover:border-foreground/25 md:p-10">
            <div className="flex flex-col gap-3">
              <h4 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                {customBand.title}
              </h4>
              <p className="text-base text-foreground/65">
                {customBand.description}
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {customBand.examples.map((ex) => (
                <li
                  key={ex}
                  className="text-base text-foreground/65"
                >
                  · {ex}
                </li>
              ))}
            </ul>
            <Link
              href={customBand.cta.href}
              className="group mt-auto inline-flex items-center gap-2 self-start rounded-full border border-foreground/25 px-6 py-3.5 text-base font-medium text-foreground transition-all duration-500 ease-in-out hover:border-foreground hover:gap-3"
            >
              {customBand.cta.label}
              <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" strokeWidth={2} />
            </Link>
          </div>
        </BlurReveal>
      </div>
    </SectionContainer>
  );
}
