// src/components/v2/sites-web/SitesWebMethod.tsx
"use client";

import type { ProcessStep } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

type SitesWebMethodProps = {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
};

export function SitesWebMethod({
  steps,
  title = "Comment on travaille",
  subtitle = "Un processus simple et transparent. Vous savez toujours où en est votre projet.",
}: SitesWebMethodProps) {
  return (
    <SectionContainer
      id="method"
      title={title}
      subtitle={subtitle}
      surface
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <BlurReveal key={step.number} delay={idx * 0.1}>
              <div className="relative flex h-full flex-col gap-5 rounded-3xl border border-foreground/10 bg-background p-8 transition-colors duration-500 ease-in-out hover:border-foreground/25">
                <div className="flex items-center justify-between">
                  {Icon ? (
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                      <Icon className="size-6" strokeWidth={1.5} />
                    </div>
                  ) : (
                    <span />
                  )}
                  <span className="select-none font-mono text-4xl font-black text-accent-primary/15">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold leading-snug text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/65">
                  {step.description}
                </p>
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
