"use client";

import Link from "next/link";
import { Lightbulb, Hammer, TrendingUp, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

type Step = { icon: typeof Lightbulb; label: string; sub: string };
type UseCase = {
  tag: string;
  title: string;
  steps: [Step, Step, Step];
  outcome: string;
  outcomeKpi: string;
  learnMoreHref?: string;
  learnMoreLabel?: string;
};

const useCases: UseCase[] = [
  {
    tag: "Founder · MVP",
    title: "De l'idée aux 100 premiers utilisateurs en 30 jours",
    steps: [
      { icon: Lightbulb, label: "J0 — Cadrage", sub: "2h pour caler le périmètre MVP et les user flows critiques." },
      { icon: Hammer, label: "J1 → J14 — Build", sub: "Sprint dev, Preview deploys quotidiens, vous suivez en live." },
      { icon: TrendingUp, label: "J15 → J30 — Lancement", sub: "Mise en prod, premiers users, itérations à chaud." },
    ],
    outcome: "MVP en prod et premiers payants signés.",
    outcomeKpi: "0 → 100 users en 30 j",
  },
  {
    tag: "PME · Outil interne",
    title: "5 tableurs Excel remplacés par un outil métier custom",
    steps: [
      { icon: Lightbulb, label: "Sem. 1 — Audit process", sub: "On cartographie vos workflows actuels pour ne rien casser." },
      { icon: Hammer, label: "Sem. 2-3 — Build", sub: "Outil sur-mesure intégré à votre stack existante." },
      { icon: TrendingUp, label: "Sem. 4 — Adoption", sub: "Formation équipe, migration data, vous arrêtez Excel." },
    ],
    outcome: "Process digitalisés, équipe libérée.",
    outcomeKpi: "−60% temps traitement",
  },
  {
    tag: "Agence · Whitelabel",
    title: "Une agence livre 3 SaaS clients sans recruter",
    steps: [
      { icon: Lightbulb, label: "Mois 1 — Setup partenariat", sub: "On comprend votre offre, on s'aligne sur vos process." },
      { icon: Hammer, label: "Mois 2-3 — Delivery", sub: "On code en backstage, vous gérez la relation client." },
      { icon: TrendingUp, label: "Mois 4+ — Scale", sub: "Vous facturez 2,5 à 5× ce qu'on vous facture, sans recruter." },
    ],
    outcome: "Capacité de delivery x3, marge nette préservée.",
    outcomeKpi: "+150 k€ CA en 90 j",
    learnMoreHref: "/saas/agences",
    learnMoreLabel: "Voir le modèle agence",
  },
];

export function SaaSUseCasesV2() {
  return (
    <SectionContainer
      id="use-cases"
      eyebrow="Histoires concrètes"
      title="3 chemins typiques de nos clients."
      subtitle="Vous vous reconnaîtrez probablement dans l'un d'eux. Chaque cas raconte le même thème : une idée → un livrable → des résultats."
      className="py-20 md:py-24"
      titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
    >
      <div className="flex flex-col gap-6">
        {useCases.map((uc) => (
          <BlurReveal key={uc.title}>
            <article className="group relative overflow-hidden rounded-[2rem] border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-8 transition-colors duration-500 ease-in-out hover:border-accent-primary/40 md:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
                {/* Left: title + outcome */}
                <div className="flex flex-col gap-4 lg:w-2/5">
                  <span className="inline-flex w-fit items-center rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.1em] text-accent-primary">
                    {uc.tag}
                  </span>
                  <h3 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-3xl">
                    {uc.title}
                  </h3>
                  <div className="mt-auto flex flex-col gap-1 rounded-2xl border border-accent-primary/20 bg-accent-primary/[0.06] p-5">
                    <span className="text-sm font-semibold uppercase tracking-[0.1em] text-accent-primary">
                      Résultat
                    </span>
                    <span className="font-heading text-xl font-bold text-foreground md:text-2xl">
                      {uc.outcomeKpi}
                    </span>
                    <span className="text-base text-foreground/70">{uc.outcome}</span>
                  </div>
                  {uc.learnMoreHref && uc.learnMoreLabel && (
                    <Link
                      href={uc.learnMoreHref}
                      className="group/link inline-flex w-fit items-center gap-2 text-base font-medium text-accent-primary transition-all duration-500 hover:gap-3"
                    >
                      {uc.learnMoreLabel}
                      <ArrowUpRight
                        className="size-4 transition-transform duration-500 group-hover/link:rotate-12"
                        strokeWidth={2}
                      />
                    </Link>
                  )}
                </div>

                {/* Right: timeline */}
                <div className="relative flex flex-col gap-6 lg:w-3/5">
                  {uc.steps.map((step, sIdx) => {
                    const Icon = step.icon;
                    const isLast = sIdx === uc.steps.length - 1;
                    return (
                      <div key={step.label} className="relative flex gap-4">
                        {/* Connecting line */}
                        {!isLast && (
                          <span className="absolute left-[19px] top-12 h-[calc(100%_-_8px)] w-px bg-gradient-to-b from-accent-primary/40 to-transparent" />
                        )}
                        <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-accent-primary/30 bg-background text-accent-primary">
                          <Icon className="size-4" strokeWidth={2} />
                        </span>
                        <div className="flex flex-1 flex-col gap-1 pt-1.5">
                          <span className="font-heading text-base font-bold text-foreground md:text-lg">
                            {step.label}
                          </span>
                          <p className="text-base text-foreground/65">{step.sub}</p>
                        </div>
                        {!isLast && (
                          <ArrowRight className="absolute right-0 top-2 hidden size-4 text-accent-primary/30 lg:block" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
