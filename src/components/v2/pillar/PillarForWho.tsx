// src/components/v2/pillar/PillarForWho.tsx
import type { ProfileCard } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

type PillarForWhoProps = {
  title: string;
  profiles: ProfileCard[];
};

export function PillarForWho({ title, profiles }: PillarForWhoProps) {
  return (
    <SectionContainer id="for-who" eyebrow="Pour qui" title={title} className="bg-background-surface">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          return (
            <Card
              key={profile.title}
              className={cn(cardInteractiveClasses, "flex flex-col gap-4 p-6")}
            >
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                <Icon className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{profile.title}</h3>
              <p className="text-base text-foreground/65">{profile.description}</p>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
