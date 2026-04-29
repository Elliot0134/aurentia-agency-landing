"use client";

import { UserPlus, Send, Wallet } from "lucide-react";
import {
  apportSteps,
  apportStepsSection,
} from "@/data/apport-affaires-content";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cardClasses, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

const ICONS = [UserPlus, Send, Wallet];

export function ApportSteps() {
  return (
    <SectionContainer
      id="steps"
      eyebrow="Comment ça marche"
      title={apportStepsSection.title}
      subtitle={apportStepsSection.subtitle}
    >
      <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {apportSteps.map((step, idx) => {
          const Icon = ICONS[idx] ?? UserPlus;
          return (
            <BlurReveal key={step.number} delay={idx * 0.1}>
              <li
                className={cn(
                  cardClasses,
                  cardInteractiveClasses,
                  "relative flex h-full flex-col gap-5 p-8",
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
                  {step.text}
                </p>
              </li>
            </BlurReveal>
          );
        })}
      </ol>
    </SectionContainer>
  );
}
