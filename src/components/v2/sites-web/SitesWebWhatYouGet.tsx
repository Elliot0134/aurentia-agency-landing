// src/components/v2/sites-web/SitesWebWhatYouGet.tsx
"use client";

import { Check } from "lucide-react";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { RadialScoreRing } from "@/components/v2/shared/RadialScoreRing";
import { cn } from "@/lib/utils";

type SitesWebWhatYouGetProps = {
  data: SubPageData["whatYouGet"];
  subtitle?: string;
};

export function SitesWebWhatYouGet({
  data,
  subtitle,
}: SitesWebWhatYouGetProps) {
  const resolvedSubtitle =
    subtitle ??
    data.subtitle ??
    "Tout ce dont vous avez besoin pour lancer — rien de superflu, rien de caché.";

  // Grouped rendering (new)
  if (data.groups && data.groups.length > 0) {
    return (
      <SectionContainer
        id="what-you-get"
        title={data.title}
        subtitle={resolvedSubtitle}
        titleClassName="whitespace-pre-line"
      >
        <div
          className={cn(
            "grid gap-5 md:gap-6",
            data.groups.length === 2 && "md:grid-cols-2",
            data.groups.length === 3 && "md:grid-cols-3",
            data.groups.length >= 4 && "md:grid-cols-2",
          )}
        >
          {data.groups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <BlurReveal key={group.title} delay={idx * 0.08} className="h-full">
                <Card
                  className={cn(
                    cardInteractiveClasses,
                    "group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-7 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:border-accent-primary/40 hover:shadow-[0_0_50px_rgba(228,85,18,0.06)] md:p-8",
                  )}
                >
                  {/* Ambient corner glow on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent-primary/10 opacity-0 blur-3xl transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                  />

                  {/* Icon + Title + pitch — fixed height + items-center so icon truly centers with text,
                      and the divider below sits at the same y across all 4 cards */}
                  <div className="relative flex h-24 items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                      <Icon className="size-7" strokeWidth={1.5} />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center gap-1.5">
                      <h3 className="font-heading text-xl font-bold leading-tight text-foreground md:text-2xl">
                        {group.title}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-snug text-foreground/60 md:text-base">
                        {group.pitch}
                      </p>
                    </div>
                  </div>

                  {/* Content: scores or text items — no mt-auto so divider sits right under top block */}
                  {group.scores && group.scores.length > 0 ? (
                    <div className="relative border-t border-foreground/10 pt-6">
                      <div
                        className={cn(
                          "mx-auto grid gap-2",
                          group.scores.length === 2 && "grid-cols-2",
                          group.scores.length === 3 && "grid-cols-3",
                          group.scores.length >= 4 && "grid-cols-2 sm:grid-cols-4",
                        )}
                      >
                        {group.scores.map((s, sIdx) => (
                          <RadialScoreRing
                            key={s.label}
                            label={s.label}
                            value={s.value}
                            delay={sIdx * 150}
                          />
                        ))}
                      </div>
                    </div>
                  ) : group.items && group.items.length > 0 ? (
                    <ul className="relative flex flex-col gap-3 border-t border-foreground/10 pt-6">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80 md:text-base"
                        >
                          <span className="flex h-[1.625em] shrink-0 items-center">
                            <span className="size-1.5 rounded-full bg-accent-primary" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Card>
              </BlurReveal>
            );
          })}
        </div>
      </SectionContainer>
    );
  }

  // Fallback: flat items list (legacy)
  return (
    <SectionContainer
      id="what-you-get"
      title={data.title}
      subtitle={resolvedSubtitle}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {data.items.map((item, idx) => (
          <BlurReveal key={item} delay={idx * 0.05}>
            <div className="flex items-start gap-4 rounded-2xl border border-foreground/10 bg-background-surface p-5 transition-colors duration-500 ease-in-out hover:border-foreground/25 dark:bg-foreground/[0.04]">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-primary/15 text-accent-primary">
                <Check className="size-4" strokeWidth={2.25} />
              </span>
              <span className="text-base leading-relaxed text-foreground/85">
                {item}
              </span>
            </div>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
