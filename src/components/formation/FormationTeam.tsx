"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { formationTrainers } from "@/data/formation-content";

export function FormationTeam() {
  return (
    <Section theme="dark" className="py-28 md:py-36">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-primary/[0.04] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <BlurReveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent-primary/15 bg-foreground/5 backdrop-blur-md mb-8">
              <span className="text-sm font-mono tracking-wider text-foreground-muted uppercase">
                VOS FORMATEURS
              </span>
            </div>
          </BlurReveal>

          <TextReveal
            text="On enseigne ce qu&rsquo;on pratique. Chaque jour."
            elementType="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground-muted text-lg leading-relaxed">
              Pas des th&eacute;oriciens. Pas des influenceurs IA. Des
              praticiens qui construisent avec Claude au quotidien.
            </p>
          </BlurReveal>
        </div>

        {/* Trainer cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {formationTrainers.map((trainer, i) => (
            <BlurReveal key={i} delay={i * 0.3}>
              <SpotlightCard className="p-0 h-full flex flex-col overflow-hidden group bg-foreground/[0.03] backdrop-blur-xl border-foreground/[0.08]">
                <div className="relative z-10 flex flex-col h-full">
                  {/* Photo */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={trainer.photo}
                      alt={trainer.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col gap-3 flex-1">
                    {/* Name + LinkedIn */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold tracking-tight text-foreground">
                        {trainer.name}
                      </h3>
                      <a
                        href={trainer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn de ${trainer.name}`}
                        className="text-foreground-muted hover:text-accent-primary transition-colors duration-500"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>

                    {/* Role */}
                    <p className="text-sm text-foreground-muted">{trainer.role}</p>

                    {/* Badges with glow */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {trainer.badges.map((badge, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-1 rounded-full text-sm bg-accent-primary/[0.08] text-foreground-muted border border-accent-primary/[0.12] shadow-[0_0_8px_rgba(201,100,66,0.06)] transition-all duration-500 hover:shadow-[0_0_16px_rgba(201,100,66,0.12)] hover:border-accent-primary/20"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-sm md:text-base text-foreground-dim leading-relaxed mt-2">
                      {trainer.bio}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </BlurReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
