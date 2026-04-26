// src/components/v2/saas/SaaSSubOffersV2.tsx
"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, EyeOff } from "lucide-react";
import { saasData } from "@/data/v2/saas";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

export function SaaSSubOffersV2() {
  const { subOffers } = saasData;
  if (subOffers.variant !== "single") return null;

  return (
    <SectionContainer
      id="offers"
      title={subOffers.title}
      subtitle="Quatre manières de bosser avec nous. Toujours avec la même exigence : du code propre, livré vite, prêt à scaler."
      className="py-20 md:py-24"
      titleClassName="text-4xl md:text-5xl lg:text-6xl mb-4 font-normal"
      innerClassName="max-w-5xl"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {subOffers.items.map((item) => {
          return (
            <BlurReveal key={item.title}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-8 transition-colors duration-700 ease-in-out hover:shadow-sm dark:hover:border-foreground/25">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-[1.75rem]">
                    {item.title}
                  </h3>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-foreground/35 transition-all duration-500 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                    strokeWidth={1.5}
                  />
                </div>

                <p className="mt-3 text-base text-foreground/55">
                  {item.description}
                </p>

                {item.meta && (
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground/40">
                    <Clock className="size-3.5" strokeWidth={1.5} />
                    {item.meta}
                  </span>
                )}
              </article>
            </BlurReveal>
          );
        })}

        {/* CTA bandeau marque blanche — pleine largeur dans la grid */}
        <BlurReveal className="md:col-span-2">
          <Link
            href="/saas/agences"
            className="group flex flex-col items-start justify-between gap-4 rounded-2xl bg-accent-primary p-6 transition-colors duration-700 ease-in-out hover:bg-accent-primary/90 sm:flex-row sm:items-center sm:gap-6 md:px-8"
          >
            <div className="flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <EyeOff className="size-4" strokeWidth={2} />
              </span>
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold text-white md:text-lg">
                  Vous êtes une agence ? On code en marque blanche.
                </span>
                <span className="text-sm text-white/80 md:text-base">
                  Étendez votre offre tech sans recruter — on devient votre département dev invisible.
                </span>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-base font-medium text-white transition-all duration-500 group-hover:gap-3">
              Découvrir le modèle
              <ArrowRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </span>
          </Link>
        </BlurReveal>
      </div>
    </SectionContainer>
  );
}
