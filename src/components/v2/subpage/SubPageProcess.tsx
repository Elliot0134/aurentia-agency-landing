// src/components/v2/subpage/SubPageProcess.tsx
"use client";

import { Sparkles } from "lucide-react";
import type { ProcessStep } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

type SubPageProcessProps = {
  steps: ProcessStep[];
};

export function SubPageProcess({ steps }: SubPageProcessProps) {
  return (
    <SectionContainer
      id="process"
      eyebrow="Le processus"
      title="Comment ça se passe"
      className="bg-background-surface"
    >
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step, idx) => {
          const Icon = step.icon ?? Sparkles;
          return (
          <BlurReveal key={step.number} delay={idx * 0.1}>
            <li className="relative flex flex-col gap-5 p-8 rounded-3xl border border-transparent dark:border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] transition-colors duration-500 ease-in-out dark:hover:border-foreground/25">
              {/* Icon + step number */}
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-6" strokeWidth={1.5} />
                </div>
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
            </li>
          </BlurReveal>
          );
        })}
      </ol>
    </SectionContainer>
  );
}
