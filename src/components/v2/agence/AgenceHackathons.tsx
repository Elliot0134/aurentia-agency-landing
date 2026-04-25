// src/components/v2/agence/AgenceHackathons.tsx
"use client";

import { Trophy, Zap, Users } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { LinkedInEmbed } from "@/components/shared/LinkedInEmbed";
import {
  agenceHackathons,
  agenceHackathonsSection,
  type AgenceHackathonCard,
  type AgenceHackathonTeammate,
} from "@/data/v2/agence-content";

function DescriptionWithTeammates({
  description,
  teammates,
}: {
  description: string;
  teammates?: AgenceHackathonTeammate[];
}) {
  if (!teammates?.length || !description.includes("{teammates}")) {
    return <>{description}</>;
  }

  const teammateLinks = teammates.map((t, i) => (
    <span key={t.name}>
      {t.linkedinUrl ? (
        <a
          href={t.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-2 transition-colors duration-500 ease-in-out hover:text-accent-primary"
        >
          {t.name}
        </a>
      ) : (
        <span className="text-foreground">{t.name}</span>
      )}
      {i < teammates.length - 1 && (i === teammates.length - 2 ? " et " : ", ")}
    </span>
  ));

  const parts = description.split("{teammates}");
  return (
    <>
      {parts[0]}
      {teammateLinks}
      {parts[1]}
    </>
  );
}

function HackathonCardContent({ card }: { card: AgenceHackathonCard }) {
  return (
    <div className="flex flex-col gap-5">
      <LinkedInEmbed url={card.linkedinEmbedUrl} />
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold text-accent-primary">
          <Trophy className="h-4 w-4" />
          {card.result}
        </span>
        <span className="text-sm text-foreground/50">{card.date}</span>
      </div>
      <h4 className="text-lg font-bold text-foreground md:text-xl">
        {card.title}
      </h4>
      <p className="text-base leading-relaxed text-foreground/65">
        <DescriptionWithTeammates
          description={card.description}
          teammates={card.teammates}
        />
      </p>
    </div>
  );
}

export function AgenceHackathons() {
  const soloCards = agenceHackathons.filter((c) => c.phase === "solo");
  const duoCard = agenceHackathons.find((c) => c.phase === "duo");

  return (
    <SectionContainer
      id="hackathons"
      eyebrow={agenceHackathonsSection.eyebrow}
      title={agenceHackathonsSection.title}
      subtitle={agenceHackathonsSection.subtitle}
      innerClassName="max-w-5xl"
    >
      {/* Phase solo */}
      <BlurReveal>
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5">
            <Zap className="h-5 w-5 text-accent-primary" />
          </div>
          <h3 className="text-lg font-semibold uppercase tracking-wide text-foreground/80 md:text-xl">
            {agenceHackathonsSection.phaseLabels.solo}
          </h3>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>
      </BlurReveal>

      <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {soloCards.map((card, i) => (
          <BlurReveal key={card.title} delay={i * 0.2}>
            <HackathonCardContent card={card} />
          </BlurReveal>
        ))}
      </div>

      {/* Bridge */}
      <BlurReveal delay={0.2}>
        <div className="relative my-12 flex items-center justify-center md:my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
          </div>
          <div className="relative z-10 rounded-full border border-accent-primary/20 bg-background px-6 py-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-primary md:text-base">
              {agenceHackathonsSection.phaseLabels.bridge}
            </p>
          </div>
        </div>
      </BlurReveal>

      {/* Phase duo */}
      <BlurReveal delay={0.1}>
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-primary/20 bg-accent-primary/10">
            <Users className="h-5 w-5 text-accent-primary" />
          </div>
          <h3 className="text-lg font-semibold uppercase tracking-wide text-foreground/80 md:text-xl">
            {agenceHackathonsSection.phaseLabels.duo}
          </h3>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>
      </BlurReveal>

      {duoCard && (
        <BlurReveal delay={0.3}>
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="w-full shrink-0 md:w-[45%]">
              <LinkedInEmbed url={duoCard.linkedinEmbedUrl} />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold text-accent-primary">
                  <Trophy className="h-4 w-4" />
                  {duoCard.result}
                </span>
                <span className="text-sm text-foreground/50">{duoCard.date}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground md:text-2xl">
                {duoCard.title}
              </h3>
              <p className="text-base leading-relaxed text-foreground/65">
                <DescriptionWithTeammates
                  description={duoCard.description}
                  teammates={duoCard.teammates}
                />
              </p>
            </div>
          </div>
        </BlurReveal>
      )}

      {/* Closing */}
      <BlurReveal delay={0.6}>
        <p className="mx-auto mt-16 max-w-2xl text-center text-base italic leading-relaxed text-foreground/55 md:text-lg">
          {agenceHackathonsSection.closing}
        </p>
      </BlurReveal>
    </SectionContainer>
  );
}
