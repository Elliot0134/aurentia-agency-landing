"use client";

import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

const notUs = [
  "WordPress qui rame avec 12 plugins",
  "Wix / Squarespace bricolés",
  "Bubble bloqué à 5 000 utilisateurs",
  "Templates Webflow vaguement modifiés",
  "Code spaghetti livré sans documentation",
  "Devis à 80k€ pour 6 mois sans visibilité",
  "Vendor lock-in qui vous tient en otage",
  "Sous-traitance offshore non encadrée",
];

const usWe = [
  "Du vrai code TypeScript, propre et typé",
  "Une stack moderne (Next.js, Supabase, Stripe)",
  "Une architecture qui scale au-delà de 100k users",
  "Du code 100% propriétaire — vous repartez avec",
  "Des Preview deploys à chaque push pour suivre en temps réel",
  "Un MVP livré en 2 semaines, pas 6 mois",
  "Un prix fixe annoncé, pas de dépassement caché",
  "Une équipe basée en France (Avignon), accessible direct",
];

export function SaaSAntiPitchV2() {
  return (
    <SectionContainer
      id="anti-pitch"
      eyebrow="Soyons clairs"
      title="Ce qu'on n'est PAS. Et ce qu'on est."
      subtitle="On préfère assumer ce qu'on ne fait pas, plutôt que prétendre tout savoir faire. Voilà la ligne, des deux côtés."
      className="py-20 md:py-24"
      titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* NOT US */}
        <BlurReveal>
          <div className="flex h-full flex-col gap-6 rounded-[2rem] border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-foreground/10 font-heading text-base font-bold text-foreground/55">
                ✕
              </span>
              <h3 className="font-heading text-xl font-bold text-foreground/70 md:text-2xl">
                Ce qu'on ne fait pas
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {notUs.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base text-foreground/55 line-through decoration-foreground/30 decoration-1"
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </BlurReveal>

        {/* US */}
        <BlurReveal delay={0.15}>
          <div className="flex h-full flex-col gap-6 rounded-[2rem] border border-accent-primary/30 bg-background-surface p-8 transition-colors duration-500 ease-in-out hover:border-accent-primary/60 md:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent-primary/15 font-heading text-base font-bold text-accent-primary">
                ✓
              </span>
              <h3 className="font-heading text-xl font-bold text-accent-primary md:text-2xl">
                Ce qu'on fait, vraiment
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {usWe.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base text-foreground/85"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </BlurReveal>
      </div>
    </SectionContainer>
  );
}
