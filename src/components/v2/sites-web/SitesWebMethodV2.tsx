// src/components/v2/sites-web/SitesWebMethodV2.tsx
"use client";

import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";
import { sitesWebData } from "@/data/v2/sites-web";

/**
 * Sites Web method — data-driven variant of HomeMethodV2. Same 4-column grid,
 * same card treatment (icon badge, step number watermark, title, desc).
 * Steps come from `sitesWebData.method.steps`.
 */
export function SitesWebMethodV2() {
  const { steps } = sitesWebData.method;

  return (
    <SectionContainer
      id="method"
      title={sitesWebData.method.title}
      subtitle="Pas de devis qui traîne 3 semaines. Pas de réunions inutiles. Un process direct et efficace."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <BlurReveal key={step.number} delay={idx * 0.1}>
              <Card className={cn(cardInteractiveClasses, "relative flex flex-col gap-5 p-8")}>
                <div className="flex items-center justify-between">
                  {Icon ? (
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-primary/10 text-accent-primary">
                      <Icon className="size-6" strokeWidth={1.5} />
                    </div>
                  ) : (
                    <span />
                  )}
                  <span className="text-4xl font-black font-mono text-accent-primary/15 select-none">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground leading-snug">
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
