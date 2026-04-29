// src/components/v2/formation-ia/FormationSkillsLibraryV2.tsx
"use client";

import { Sparkles } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";

export function FormationSkillsLibraryV2() {
  const { skillsLibrary } = solutionsIaFormationData;

  return (
    <SectionContainer
      id="skills-library"
      eyebrow={skillsLibrary.eyebrow}
      title={skillsLibrary.title}
      subtitle={skillsLibrary.subtitle}
    >
      {/* Total counter */}
      <BlurReveal>
        <div className="mb-12 flex flex-col items-center gap-2 text-center">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-7xl font-black text-accent-primary md:text-8xl">
              {skillsLibrary.totalCount}
            </span>
            <span className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              skills
            </span>
          </div>
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Classés par métier · prêts à l'emploi
          </p>
        </div>
      </BlurReveal>

      {/* Categories grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skillsLibrary.categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <BlurReveal key={cat.title} delay={idx * 0.04}>
              <Card className="group relative flex h-full flex-col gap-4 p-6 transition-colors duration-500 dark:hover:border-foreground/25">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </div>
                  <span className="rounded-full bg-foreground/[0.04] px-2.5 py-1 font-mono text-sm text-foreground/55">
                    {cat.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold leading-tight text-foreground">
                    {cat.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">
                    {cat.blurb}
                  </p>
                </div>

                <ul className="mt-auto flex flex-col gap-1.5 border-t border-foreground/10 pt-4">
                  {cat.examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-center gap-2 text-sm text-foreground/70 transition-colors duration-500 group-hover:text-foreground/85"
                    >
                      <Sparkles className="size-3 shrink-0 text-accent-primary/60" />
                      <span className="font-mono text-sm">{ex}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </BlurReveal>
          );
        })}
      </div>

      <BlurReveal delay={0.4}>
        <p className="mt-10 text-center text-sm text-foreground/55">
          Catalogue complet remis le jour 1 · enrichi tous les mois
        </p>
      </BlurReveal>
    </SectionContainer>
  );
}
