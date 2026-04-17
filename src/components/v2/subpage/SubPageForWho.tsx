// src/components/v2/subpage/SubPageForWho.tsx
import type { ProfileCard } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

type SubPageForWhoProps = {
  profiles: ProfileCard[];
};

export function SubPageForWho({ profiles }: SubPageForWhoProps) {
  return (
    <SectionContainer
      id="for-who"
      eyebrow="Pour qui c'est"
      title="C'est exactement ce qu'il vous faut si…"
      className="bg-background-surface"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          return (
            <Card
              key={profile.title}
              className={cn(cardInteractiveClasses, "flex items-start gap-4 p-6")}
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Icon className="size-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-lg font-bold text-foreground">{profile.title}</h3>
                <p className="text-base text-foreground/65">{profile.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
