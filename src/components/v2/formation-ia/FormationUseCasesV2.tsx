// src/components/v2/formation-ia/FormationUseCasesV2.tsx
"use client";

import { ArrowRight, TrendingUp } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";

export function FormationUseCasesV2() {
  const { useCases } = solutionsIaFormationData;

  return (
    <SectionContainer
      id="use-cases"
      eyebrow={useCases.eyebrow}
      title={useCases.title}
      subtitle={useCases.subtitle}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {useCases.items.map((uc, idx) => (
          <BlurReveal key={uc.persona} delay={idx * 0.05}>
            <Card className="group flex h-full flex-col gap-4 p-6 transition-colors duration-500 dark:hover:border-foreground/25">
              {/* Persona */}
              <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
                <span className="font-mono text-sm uppercase tracking-widest text-accent-primary">
                  {uc.persona}
                </span>
                <TrendingUp className="size-4 text-accent-primary/60" />
              </div>

              {/* Pain → Gain */}
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-sm uppercase tracking-wider text-foreground/45">
                    Avant
                  </p>
                  <p className="mt-1 text-base leading-snug text-foreground/75">
                    {uc.pain}
                  </p>
                </div>

                <ArrowRight className="size-4 text-accent-primary" />

                <div>
                  <p className="text-sm uppercase tracking-wider text-accent-primary">
                    Après formation
                  </p>
                  <p className="mt-1 text-base leading-snug text-foreground">
                    {uc.gain}
                  </p>
                </div>
              </div>

              {/* Metric */}
              <div className="mt-auto rounded-2xl bg-accent-primary/[0.08] px-4 py-3">
                <p className="text-sm font-semibold text-accent-primary">
                  → {uc.metric}
                </p>
              </div>
            </Card>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
