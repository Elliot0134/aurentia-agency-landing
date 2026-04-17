// src/components/v2/agence/AgenceValuesV2.tsx
import { Sun, Zap, Shield, Eye, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  agenceValues,
  agenceValuesSection,
  type AgenceValueCard,
} from "@/data/v2/agence-content";

const ICON_MAP: Record<AgenceValueCard["icon"], LucideIcon> = {
  Sun,
  Zap,
  Shield,
  Eye,
  Users,
};

export function AgenceValuesV2() {
  return (
    <SectionContainer
      id="valeurs"
      title={agenceValuesSection.title}
      subtitle={agenceValuesSection.subtitle}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {agenceValues.map((card, index) => {
          const Icon = ICON_MAP[card.icon];
          const isWide = card.span === 2;

          return (
            <BlurReveal
              key={card.title}
              delay={index * 0.08}
              className={isWide ? "md:col-span-2" : ""}
            >
              <div className="group flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] p-7 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-sm">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-foreground/65">
                  {card.text}
                </p>
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
