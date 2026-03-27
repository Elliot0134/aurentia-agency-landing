"use client";

import { Trophy, Zap, Users } from "lucide-react";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  hackathonCards,
  hackathonSectionContent,
  type HackathonTeammate,
} from "@/data/about-content";

const soloCards = hackathonCards.filter((c) => c.phase === "solo");
const duoCard = hackathonCards.find((c) => c.phase === "duo");

function DescriptionWithTeammates({
  description,
  teammates,
}: {
  description: string;
  teammates?: HackathonTeammate[];
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
          className="text-foreground hover:text-amber-500 underline underline-offset-2 transition-colors duration-500"
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

function LinkedInEmbed({ url, expanded = false }: { url: string; expanded?: boolean }) {
  if (!url) {
    return (
      <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 text-center">
        <p className="text-sm text-foreground/40">
          Post LinkedIn — bientôt disponible
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden">
      <iframe
        src={url}
        width="100%"
        frameBorder="0"
        allowFullScreen
        title="Post LinkedIn"
        className="w-full"
        style={{ height: expanded ? 520 : 440 }}
      />
    </div>
  );
}

export function AboutHackathons() {
  return (
    <section className="relative py-28 md:py-36 px-4 sm:px-6 md:px-12 overflow-hidden">
      <SectionBackground
        variant="alt"
        orbs={[
          {
            color: "ambre",
            position: "top-[20%] right-[10%]",
            size: "w-[400px] h-[400px]",
            opacity: "[0.05]",
          },
        ]}
      />

      <div className="relative z-10">
        {/* Section header */}
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-20">
          <BlurReveal>
            <span className="inline-block rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-sm font-medium tracking-widest uppercase text-foreground/60 mb-6">
              {hackathonSectionContent.badge}
            </span>
          </BlurReveal>

          <TextReveal
            text={hackathonSectionContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 justify-center"
          />

          <BlurReveal delay={0.3}>
            <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              {hackathonSectionContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* ── Phase 1 : Solo ── */}
          <BlurReveal>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground/80 uppercase tracking-wide">
                {hackathonSectionContent.phaseLabels.solo}
              </h3>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
          </BlurReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
            {soloCards.map((card, i) => (
              <BlurReveal key={i} delay={i * 0.2}>
                <div className="flex flex-col gap-5">
                  {/* LinkedIn embed */}
                  <LinkedInEmbed url={card.linkedinEmbedUrl} expanded />

                  {/* Badge + date */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-500">
                      <Trophy className="w-4 h-4" />
                      {card.result}
                    </span>
                    <span className="text-sm text-foreground/40">{card.date}</span>
                  </div>

                  <h4 className="text-lg md:text-xl font-bold text-foreground">
                    {card.title}
                  </h4>

                  <p className="text-base text-foreground/60 leading-relaxed">
                    <DescriptionWithTeammates description={card.description} teammates={card.teammates} />
                  </p>
                </div>
              </BlurReveal>
            ))}
          </div>

          {/* ── Bridge : La rencontre ── */}
          <BlurReveal delay={0.2}>
            <div className="relative flex items-center justify-center my-12 md:my-16">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
              </div>
              <div className="relative z-10 bg-background px-6 py-3 rounded-full border border-amber-500/20">
                <p className="text-sm md:text-base font-semibold text-amber-500 tracking-wide uppercase">
                  {hackathonSectionContent.phaseLabels.bridge}
                </p>
              </div>
            </div>
          </BlurReveal>

          {/* ── Phase 2 : Duo ── */}
          <BlurReveal delay={0.1}>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Users className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground/80 uppercase tracking-wide">
                {hackathonSectionContent.phaseLabels.duo}
              </h3>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
          </BlurReveal>

          {duoCard && (
            <BlurReveal delay={0.3}>
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* LinkedIn embed à gauche */}
                <div className="w-full md:w-[45%] shrink-0">
                  <LinkedInEmbed url={duoCard.linkedinEmbedUrl} expanded />
                </div>

                {/* Content à droite */}
                <div className="flex flex-col justify-center flex-1 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-500">
                      <Trophy className="w-4 h-4" />
                      {duoCard.result}
                    </span>
                    <span className="text-sm text-foreground/40">{duoCard.date}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {duoCard.title}
                  </h3>

                  <p className="text-base text-foreground/60 leading-relaxed">
                    <DescriptionWithTeammates description={duoCard.description} teammates={duoCard.teammates} />
                  </p>
                </div>
              </div>
            </BlurReveal>
          )}
        </div>

        {/* Closing phrase */}
        <BlurReveal delay={0.6}>
          <p className="text-base md:text-lg text-foreground/50 text-center max-w-2xl mx-auto mt-16 leading-relaxed italic">
            {hackathonSectionContent.closing}
          </p>
        </BlurReveal>
      </div>
    </section>
  );
}
