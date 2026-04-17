"use client";

import { MessageSquare, Pencil, Paintbrush, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

type Step = {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "On échange",
    desc: "Un appel pour comprendre votre projet, vos objectifs et vos contraintes. On analyse votre marché et on vous propose une stratégie claire.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "On crée",
    desc: "Design sur-mesure, développement, itérations avec vos retours. Vous suivez chaque étape et validez avant qu'on avance.",
    icon: Pencil,
  },
  {
    num: "03",
    title: "On livre",
    desc: "Votre projet est en ligne. On s'assure que tout fonctionne parfaitement — performance, mobile, SEO — avant de vous remettre les clés.",
    icon: Paintbrush,
  },
  {
    num: "04",
    title: "On accompagne",
    desc: "30 jours de support inclus, formation IA offerte, évolutions sur-mesure. Votre site continue de grandir avec vous.",
    icon: Headphones,
  },
];

export function HomeMethodV2() {
  return (
    <SectionContainer
      id="method"
      title="Comment on travaille"
      subtitle="Un processus simple et transparent. Vous savez toujours où en est votre projet."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <BlurReveal key={step.num} delay={idx * 0.1} className="h-full">
              <Card className={cn(cardInteractiveClasses, "relative flex h-full flex-col gap-5 p-8")}>
                {/* Icon + step number */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-primary/10 text-accent-primary">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-4xl font-black font-mono text-accent-primary/15 select-none">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-foreground/65">
                  {step.desc}
                </p>
              </Card>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
