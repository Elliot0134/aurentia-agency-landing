// src/components/v2/ressources/AurentiaPluginSection.tsx
//
// Section dédiée au plugin Aurentia v2 sur la page /ressources/implementation-ia-ftgp.
// Composée de :
//   - un hero plugin (titre, version, description, badge French Tech, CTA download)
//   - une infographie 3 étapes (Install → Onboarding /start → 11 skills) avec connecteurs
//   - une grille des 11 skills regroupés par catégorie
//   - un second bouton télécharger en bas (rappel)

import { ArrowRight, Check, Download } from "lucide-react";
import { Card, cardClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

/**
 * Nœud d'organigramme parent — pilule arrondie, orange saturé.
 */
function OrgParentNode({
  label,
  sublabel,
}: {
  label: string;
  sublabel?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full px-5 py-2.5 shadow-lg shadow-accent-primary/20 transition-transform duration-500 ease-in-out hover:scale-[1.02] md:px-6 md:py-3",
        "bg-gradient-to-br from-accent-primary to-accent-secondary",
      )}
    >
      <span
        aria-hidden
        className="inline-block size-2 shrink-0 rounded-full bg-primary-foreground/90"
      />
      <span className="flex items-baseline gap-2 font-semibold tracking-tight text-primary-foreground">
        {sublabel ? (
          <span className="font-mono text-sm opacity-75">{sublabel}</span>
        ) : null}
        <span className="text-sm md:text-base">{label}</span>
      </span>
    </div>
  );
}

/**
 * Nœud d'organigramme enfant — mini-card qui affiche la catégorie + la liste
 * des skills (commandes) qu'elle regroupe.
 */
function OrgCategoryNode({
  label,
  skills,
}: {
  label: string;
  skills: { name: string }[];
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2.5 rounded-2xl border border-accent-primary/35 bg-accent-primary/[0.08] px-3 py-3 transition-all duration-500 ease-in-out hover:bg-accent-primary/[0.14] md:px-4 md:py-3.5",
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="inline-block size-1.5 shrink-0 rounded-full bg-accent-primary"
        />
        <span className="text-sm font-semibold tracking-tight text-foreground md:text-[15px]">
          {label}
        </span>
      </div>
      <ul className="flex flex-col gap-1 pl-4">
        {skills.map((s) => (
          <li
            key={s.name}
            className="font-mono text-sm tracking-tight text-foreground/70"
          >
            /{s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

type Step = {
  number: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
};

type Skill = {
  name: string;
  description: string;
};

type SkillCategory = {
  label: string;
  skills: Skill[];
};

type AurentiaPluginSectionProps = {
  version: string;
  download: {
    label: string;
    filename: string;
    href: string;
    size: string;
  };
  steps: Step[];
  skillCategories: SkillCategory[];
  partnerLabel: string;
};

export function AurentiaPluginSection({
  version,
  download,
  steps,
  skillCategories,
  partnerLabel,
}: AurentiaPluginSectionProps) {
  return (
    <div className="flex flex-col gap-10 md:gap-12">
      {/* Hero du plugin — badges + features bullets + CTA download */}
      <div
        className={cn(
          cardClasses,
          "overflow-hidden p-7 md:p-10",
        )}
      >
        <div className="flex flex-col gap-8 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          {/* Colonne gauche : badges + features */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.12em] text-accent-primary">
                v{version}
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 text-sm font-medium text-foreground/75">
                {partnerLabel}
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              {[
                "11 skills business adaptés au droit français",
                "Sous-flux onboarding /start (capture business profile)",
                "Compatible Claude Desktop, claude.ai et Claude Code",
                "Aucune inscription, téléchargement direct",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-primary/15 text-accent-primary"
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/80 md:text-[15px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne droite : CTAs (centrés verticalement) */}
          <div className="flex flex-col items-start gap-4 md:items-end">
            <a
              href={download.href}
              download={download.filename}
              className="inline-flex items-center gap-2.5 rounded-2xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90 md:text-base"
            >
              <Download className="size-4" aria-hidden />
              {download.label}
              <span className="ml-2 font-mono text-sm text-background/65">
                {download.size}
              </span>
            </a>
            <a
              href="#etapes-plugin"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all duration-500 ease-in-out hover:gap-3 hover:text-accent-primary md:text-base"
            >
              Voir comment ça marche
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* Infographie organigramme */}
      <div id="etapes-plugin" className="flex flex-col gap-5 scroll-mt-28">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Comment ça marche
        </p>
        <h4 className="font-heading text-2xl tracking-tight text-foreground md:text-3xl">
          Un routeur central, quatre catégories de skills
        </h4>

        {/* Frame avec gradient doux — diagramme directement dedans */}
        <div className="relative mt-3 overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent-primary/[0.10] via-accent-primary/[0.04] to-transparent p-6 md:p-12">
          {/* Desktop : organigramme horizontal */}
          <div className="hidden md:flex md:flex-col md:items-center">
            {/* Parent node */}
            <OrgParentNode label="aurentia" sublabel="/start" />

            {/* Trunk vertical */}
            <div aria-hidden className="h-10 w-px bg-accent-primary/35" />

            {/* Container des 4 branches */}
            <div className="relative w-full">
              {/* Barre horizontale (du centre du 1er node au centre du 4e) */}
              <div
                aria-hidden
                className="absolute top-0 h-px bg-accent-primary/35"
                style={{ left: "12.5%", right: "12.5%" }}
              />

              {/* 4 branches verticales + nodes */}
              <div className="grid grid-cols-4 items-start gap-3 lg:gap-5">
                {skillCategories.map((category) => (
                  <div
                    key={category.label}
                    className="flex w-full flex-col items-center"
                  >
                    <div aria-hidden className="h-10 w-px bg-accent-primary/35" />
                    <OrgCategoryNode
                      label={category.label}
                      skills={category.skills}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile : stack vertical */}
          <div className="flex flex-col items-stretch md:hidden">
            <div className="flex justify-center">
              <OrgParentNode label="aurentia" sublabel="/start" />
            </div>
            <div className="my-3 self-center">
              <div aria-hidden className="h-6 w-px bg-accent-primary/35" />
            </div>
            <div className="flex flex-col items-stretch gap-3">
              {skillCategories.map((category, index) => (
                <div
                  key={category.label}
                  className="flex flex-col items-stretch"
                >
                  <OrgCategoryNode
                    label={category.label}
                    skills={category.skills}
                  />
                  {index < skillCategories.length - 1 && (
                    <div className="my-3 self-center">
                      <div
                        aria-hidden
                        className="h-6 w-px bg-accent-primary/35"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mini récap textuel des 3 étapes */}
        <div className="mt-2 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/40 p-4"
              >
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-4" strokeWidth={1.7} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-sm font-semibold tracking-[0.14em] text-foreground/45">
                    {step.number}
                  </span>
                  <span className="font-display text-sm font-semibold tracking-tight text-foreground md:text-[15px]">
                    {step.title}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grille des 11 skills par catégorie */}
      <div className="flex flex-col gap-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Les 11 skills
        </p>
        <h4 className="font-heading text-2xl tracking-tight text-foreground md:text-3xl">
          Ce que tu peux faire avec
        </h4>

        <div className="mt-3 grid gap-5 md:grid-cols-2 md:gap-6">
          {skillCategories.map((category) => (
            <Card key={category.label} className="flex flex-col gap-4 p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-foreground/[0.06] px-3 py-1 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/75">
                  {category.label}
                </span>
              </div>
              <ul className="flex flex-col gap-3">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="flex flex-col gap-1">
                    <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
                      /{skill.name}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {skill.description}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Second CTA download (rappel en bas) */}
      <div
        className={cn(
          cardClasses,
          "flex flex-col items-start gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8",
        )}
      >
        <div className="flex flex-col gap-1.5">
          <p className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
            Prêt à l&apos;essayer ?
          </p>
          <p className="text-sm text-muted-foreground md:text-[15px]">
            Téléchargement direct, aucune inscription. Compatible Claude Desktop, claude.ai et Claude Code.
          </p>
        </div>
        <a
          href={download.href}
          download={download.filename}
          className="inline-flex items-center gap-2.5 rounded-2xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90 md:text-base"
        >
          <Download className="size-4" aria-hidden />
          {download.label}
          <span className="ml-2 font-mono text-sm text-background/65">
            {download.size}
          </span>
        </a>
      </div>
    </div>
  );
}
