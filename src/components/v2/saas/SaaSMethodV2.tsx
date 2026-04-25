// src/components/v2/saas/SaaSMethodV2.tsx
"use client";

import { Sparkles } from "lucide-react";
import { saasData } from "@/data/v2/saas";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

export function SaaSMethodV2() {
  const { method } = saasData;

  return (
    <SectionContainer
      id="method"
      title={method.title}
      subtitle="Un processus simple et transparent. Vous savez toujours où en est votre SaaS."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {method.steps.map((step, idx) => {
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
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
