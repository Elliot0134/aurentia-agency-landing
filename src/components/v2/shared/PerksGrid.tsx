// src/components/v2/shared/PerksGrid.tsx
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

export type Perk = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type PerksGridProps = {
  items: Perk[];
  title: string;
  subtitle?: string;
  id?: string;
  className?: string;
};

/**
 * Visual twin of HomeWhyAurentia — 3-col grid, rounded cards, soft borders,
 * icon-in-tile with accent color, hover border lift.
 */
export function PerksGrid({
  items,
  title,
  subtitle,
  id = "perks",
  className,
}: PerksGridProps) {
  return (
    <SectionContainer
      id={id}
      title={title}
      subtitle={subtitle}
      className={cn("py-32 md:py-40", className)}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="group flex flex-col gap-4 rounded-2xl p-7 transition-all duration-500 ease-in-out dark:hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                <Icon className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-base text-foreground/65">{item.description}</p>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
