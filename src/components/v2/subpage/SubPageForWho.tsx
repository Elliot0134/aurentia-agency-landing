// src/components/v2/subpage/SubPageForWho.tsx
"use client";

import type { ProfileCard } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

type SubPageForWhoProps = {
  profiles: ProfileCard[];
};

export function SubPageForWho({ profiles }: SubPageForWhoProps) {
  return (
    <SectionContainer
      id="for-who"
      eyebrow="Ça parle de vous"
      title="Vous êtes au bon endroit si…"
      surface
    >
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {profiles.map((profile, idx) => {
          const Icon = profile.icon;
          const num = String(idx + 1).padStart(2, "0");
          return (
            <BlurReveal key={profile.title} delay={idx * 0.08} className="h-full">
              <Card
                className={cn(
                  cardInteractiveClasses,
                  "group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-foreground/10 bg-background p-7 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:border-accent-primary/40 hover:shadow-[0_0_50px_rgba(228,85,18,0.06)] md:p-8",
                )}
              >
                {/* Ambient corner glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent-primary/10 opacity-0 blur-3xl transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                />

                {/* Top row: icon + number */}
                <div className="relative flex items-start justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                    <Icon className="size-7" strokeWidth={1.5} />
                  </div>
                  <span className="select-none font-mono text-3xl font-black leading-none text-accent-primary/15 transition-colors duration-500 ease-in-out group-hover:text-accent-primary/30">
                    {num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="relative font-heading text-xl font-bold leading-tight text-foreground md:text-2xl">
                  {profile.title}
                </h3>

                {/* Description */}
                <p className="relative text-sm leading-relaxed text-foreground/65 md:text-base">
                  {profile.description}
                </p>

                {/* Bottom accent bar — grows on hover */}
                <div
                  aria-hidden
                  className="relative mt-auto h-[2px] w-10 origin-left bg-accent-primary/50 transition-transform duration-500 ease-in-out group-hover:scale-x-[3] group-hover:bg-accent-primary"
                />
              </Card>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
