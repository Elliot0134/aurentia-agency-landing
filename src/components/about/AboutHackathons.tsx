"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import {
  hackathonCards,
  hackathonSectionContent,
} from "@/data/about-content";

export function AboutHackathons() {
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden">
      <SectionBackground
        variant="alt"
        orbs={[
          { color: "ambre", position: "top-[20%] right-[10%]", size: "w-[400px] h-[400px]", opacity: "[0.05]" },
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
          />

          <BlurReveal delay={0.3}>
            <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              {hackathonSectionContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Hackathon cards */}
        <div className="max-w-5xl mx-auto flex flex-col gap-10 md:gap-14">
          {hackathonCards.map((card, index) => {
            const isEven = index % 2 === 0;

            return (
              <BlurReveal key={index} delay={index * 0.3}>
                <SpotlightCard className="group !bg-foreground/[0.03] backdrop-blur-xl border-foreground/[0.08] hover:shadow-[0_0_30px_rgba(217,150,80,0.1)] transition-shadow duration-700">
                  <div
                    className={`relative z-10 flex flex-col ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-6 md:gap-8 p-6 md:p-8`}
                  >
                    {/* Photo */}
                    <div className="w-full md:w-[40%] shrink-0">
                      <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-foreground/5">
                        <Image
                          src={card.photo}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center flex-1 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-500">
                          <Trophy className="w-4 h-4" />
                          {card.result}
                        </span>
                        <span className="text-sm text-foreground/40">
                          {card.date}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-foreground">
                        {card.title}
                      </h3>

                      <p className="text-base text-foreground/60 leading-relaxed">
                        {card.description}
                      </p>

                      {/* LinkedIn embed placeholder */}
                      <div className="mt-4 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 text-center">
                        <p className="text-sm text-foreground/40">
                          Post LinkedIn
                        </p>
                        <p className="text-sm text-foreground/30 mt-1 break-all">
                          {card.linkedinEmbed}
                        </p>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </BlurReveal>
            );
          })}
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
