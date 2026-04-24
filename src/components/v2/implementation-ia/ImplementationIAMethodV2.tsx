// src/components/v2/implementation-ia/ImplementationIAMethodV2.tsx
"use client";

import { Sparkles } from "lucide-react";
import { solutionsIaImplementationData } from "@/data/v2/solutions-ia-implementation";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

/**
 * Mirror of HomeMethodV2 — 5-step grid for the implémentation-IA process.
 * Shares the same card chrome, accent icon badge and large step number.
 */
export function ImplementationIAMethodV2() {
  const steps = solutionsIaImplementationData.process;

  const cols =
    steps.length >= 5
      ? "sm:grid-cols-2 lg:grid-cols-5"
      : steps.length === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <SectionContainer
      id="method"
      title="Comment on travaille"
      subtitle="Un processus simple et transparent. Vous savez toujours où en est votre implémentation."
    >
      <div className={cn("grid grid-cols-1 gap-5", cols)}>
        {steps.map((step, idx) => {
          const Icon = step.icon ?? Sparkles;
          return (
            <BlurReveal key={step.number} delay={idx * 0.1}>
              <Card
                className={cn(
                  cardInteractiveClasses,
                  "relative flex flex-col gap-5 p-8",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <span className="select-none font-mono text-4xl font-black text-accent-primary/15">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-snug text-foreground">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-foreground/65">
                  {step.description}
                </p>
              </Card>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
