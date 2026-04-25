// src/components/v2/shared/MethodSection.tsx
"use client";

import { Sparkles } from "lucide-react";
import type { ProcessStep } from "@/data/v2/types";
import { SectionContainer } from "./SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

type MethodSectionProps = {
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
  id?: string;
  className?: string;
};

/**
 * Visual twin of HomeMethodV2 — 4-card grid with icon, number, title, desc.
 * Accepts any number of steps (auto-adapts grid columns).
 */
export function MethodSection({
  title,
  subtitle = "Un processus simple et transparent. Vous savez toujours où en est votre projet.",
  steps,
  id = "method",
  className,
}: MethodSectionProps) {
  const cols =
    steps.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : steps.length === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <SectionContainer
      id={id}
      title={title}
      subtitle={subtitle}
      className={className}
    >
      <div className={cn("grid grid-cols-1 gap-5", cols)}>
        {steps.map((step, idx) => {
          const Icon = step.icon ?? Sparkles;
          return (
            <BlurReveal key={step.number} delay={idx * 0.1}>
              <div className="relative flex flex-col gap-5 p-8 rounded-3xl border border-transparent dark:border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] transition-colors duration-500 ease-in-out dark:hover:border-foreground/25">
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
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
