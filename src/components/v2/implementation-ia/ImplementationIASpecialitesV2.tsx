// src/components/v2/implementation-ia/ImplementationIASpecialitesV2.tsx
"use client";

import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Workflow, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card, cardClasses, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

type Specialite = {
  icon: LucideIcon;
  title: string;
  pitch: string;
  bullets: string[];
  highlight?: boolean;
  cta?: { label: string; href: string };
};

const SPECIALITES: Specialite[] = [
  {
    icon: BrainCircuit,
    title: "Configuration Claude",
    pitch:
      "On transforme Claude en vrai copilote business pour vous et votre équipe — connecté à vos outils, à votre data, à vos process.",
    bullets: [
      "CLAUDE.md sur-mesure pour votre métier",
      "Skills Claude custom (rédaction, recherche, CRM, ops…)",
      "MCP servers branchés à vos outils (Notion, Gmail, Drive, Supabase…)",
      "Memory persistante pour des conversations contextuelles",
      "Setup multi-utilisateurs versionné et reproductible",
    ],
    highlight: true,
    cta: {
      label: "Voir la page dédiée",
      href: "/solutions-ia/configuration-claude",
    },
  },
  {
    icon: Workflow,
    title: "Agents & automatisations",
    pitch:
      "Des agents IA qui exécutent les tâches récurrentes à votre place — connectés à votre stack, déclenchés par vos vrais événements.",
    bullets: [
      "Agents conversationnels métier (sales, support, RH…)",
      "Workflows n8n / Make orchestrés avec l'IA",
      "Automatisations event-driven (mails, formulaires, webhooks…)",
      "Connecteurs sur-mesure si pas d'API publique",
      "Dashboards de pilotage et de mesure du ROI",
    ],
  },
  {
    icon: Wrench,
    title: "Skills métier sur-mesure",
    pitch:
      "Des modules IA spécialisés sur vos cas d'usage : génération, analyse, qualification, traitement — chaque skill devient un membre virtuel de l'équipe.",
    bullets: [
      "Génération de contrats, devis, propositions",
      "Analyse de documents (factures, dossiers, CV…)",
      "Qualification de leads et préparation de RDV",
      "Réponse automatique aux tickets / mails / DM",
      "Reporting et synthèses produits sur demande",
    ],
  },
];

export function ImplementationIASpecialitesV2() {
  return (
    <SectionContainer
      id="specialites"
      eyebrow="Trois spécialités, une seule mission"
      title="Configuration Claude, agents, skills métier — selon ce dont vous avez besoin"
      subtitle="On ne vend pas trois prestations. On en livre une — et selon votre cas d'usage, elle est faite de l'une, l'autre, ou les trois."
      className="py-32 md:py-40"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SPECIALITES.map((item) => {
          const Icon = item.icon;
          const innerCardContent = (
            <>
              {item.highlight && (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold text-accent-primary">
                  Spécialité phare
                </span>
              )}

              <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                <Icon className="size-6" strokeWidth={1.5} />
              </div>

              <h3 className="font-heading text-xl font-bold text-foreground">
                {item.title}
              </h3>

              <p className="text-base leading-relaxed text-foreground/70">
                {item.pitch}
              </p>

              <ul className="mt-2 flex flex-col gap-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-base leading-relaxed text-foreground/65"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-primary/70" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {item.cta && (
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-accent-primary transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                  {item.cta.label} <ArrowUpRight className="size-4" />
                </span>
              )}
            </>
          );

          if (item.cta) {
            return (
              <Link
                key={item.title}
                href={item.cta.href}
                className={cn(
                  cardClasses,
                  cardInteractiveClasses,
                  "group relative flex h-full flex-col gap-5 p-7",
                  item.highlight &&
                    "ring-1 ring-accent-primary/20 dark:ring-accent-primary/30",
                )}
              >
                {innerCardContent}
              </Link>
            );
          }

          return (
            <Card
              key={item.title}
              className="group relative flex h-full flex-col gap-5 p-7 transition-all duration-500 ease-in-out dark:hover:border-foreground/20 hover:shadow-sm"
            >
              {innerCardContent}
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
