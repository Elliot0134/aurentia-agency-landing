// src/components/v2/home/HomeHackathonsCompact.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { HackathonCardContent } from "@/components/v2/agence/HackathonCardContent";
import { agenceHackathons } from "@/data/v2/agence-content";

export function HomeHackathonsCompact() {
  return (
    <SectionContainer
      id="hackathons"
      eyebrow="Reconnaissance"
      title="3 podiums en hackathons IA"
      subtitle="L'équipe a livré sous contrainte ce qu'on livre pour vous, en intensité maximale."
      alignHeader="center"
      innerClassName="max-w-6xl"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {agenceHackathons.map((card, i) => (
          <BlurReveal key={card.title} delay={i * 0.15}>
            <HackathonCardContent card={card} />
          </BlurReveal>
        ))}
      </div>

      <BlurReveal delay={0.5}>
        <div className="mt-12 flex justify-center">
          <Link
            href="/a-propos#hackathons"
            className="group inline-flex items-center gap-2 text-base font-medium text-foreground transition-all duration-500 ease-in-out hover:gap-3"
          >
            Voir le détail
            <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-0.5" />
          </Link>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
