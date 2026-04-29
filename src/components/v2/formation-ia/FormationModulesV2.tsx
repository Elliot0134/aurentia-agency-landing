// src/components/v2/formation-ia/FormationModulesV2.tsx
"use client";

import { Clock, Layers } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";

export function FormationModulesV2() {
  const { modules } = solutionsIaFormationData;

  return (
    <SectionContainer
      id="modules"
      eyebrow={modules.eyebrow}
      title={modules.title}
      subtitle={modules.subtitle}
      surface
    >
      {/* Top stats strip */}
      <BlurReveal>
        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 rounded-3xl border border-foreground/10 bg-background/60 dark:bg-foreground/[0.02] px-8 py-5">
          <div className="flex items-center gap-3">
            <Layers className="size-5 text-accent-primary" />
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-black text-foreground">
                {modules.totalModules}
              </span>
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                modules vidéo
              </span>
            </div>
          </div>
          <div className="hidden h-10 w-px bg-foreground/10 sm:block" />
          <div className="flex items-center gap-3">
            <Clock className="size-5 text-accent-primary" />
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-black text-foreground">
                {modules.totalDuration}
              </span>
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                de formation effective
              </span>
            </div>
          </div>
          <div className="hidden h-10 w-px bg-foreground/10 sm:block" />
          <div className="flex items-center gap-3">
            <span className="font-heading text-2xl font-black text-accent-primary">
              5
            </span>
            <span className="text-sm uppercase tracking-wider text-muted-foreground">
              parcours
            </span>
          </div>
        </div>
      </BlurReveal>

      {/* Tracks grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {modules.tracks.map((track, idx) => {
          const Icon = track.icon;
          return (
            <BlurReveal key={track.title} delay={idx * 0.06}>
              <Card className="group relative flex h-full flex-col gap-4 p-6 transition-colors duration-500 dark:hover:border-foreground/25">
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-sm font-semibold text-accent-primary/80">
                    Parcours {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold leading-snug text-foreground">
                    {track.title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2 text-sm text-foreground/55">
                    <span>{track.modules} modules</span>
                    <span className="size-1 rounded-full bg-foreground/30" />
                    <span>{track.duration} de vidéo</span>
                  </div>
                </div>

                <ul className="mt-auto flex flex-col gap-2 border-t border-foreground/10 pt-4">
                  {track.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-sm leading-snug text-foreground/70"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent-primary" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </Card>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
