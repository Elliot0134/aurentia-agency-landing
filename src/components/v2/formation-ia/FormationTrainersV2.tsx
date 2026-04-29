// src/components/v2/formation-ia/FormationTrainersV2.tsx
"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";

type Trainer = {
  name: string;
  role: string;
  pitch: string;
  recent: string; // "Ce qu'il a livré récemment"
  image: string;
  linkedin: string;
};

const TRAINERS: Trainer[] = [
  {
    name: "Elliot",
    role: "CEO · Architecte IA",
    pitch:
      "Construit Aurentia (SaaS création d'entreprise IA) et accompagne PME et freelances sur leur stratégie IA depuis 3 ans.",
    recent:
      "Plateforme Aurentia (Next.js + Supabase + Claude API), 6 verticales en cours.",
    image: "/images/team/elliot.webp",
    linkedin: "https://www.linkedin.com/in/elliot-estrade-8b7754201/",
  },
  {
    name: "Matthieu",
    role: "CTO · Lead Claude Code",
    pitch:
      "Pionnier Claude Code dans l'équipe — c'est lui qui a converti tout le monde. Formateur Epitech Marseille.",
    recent:
      "Architecture Comparateur-IA-Facile, sécurité et review code de chaque projet client.",
    image: "/images/team/matthieu-droite.webp",
    linkedin: "https://www.linkedin.com/in/mathieu-bousquet-178454315/",
  },
  {
    name: "Fabien",
    role: "Production Lead · 20 ans craft",
    pitch:
      "Co-fondateur de l'agence Le Prisme à Avignon. 20 ans à livrer du web pour des marques — l'œil qui ne laisse rien passer.",
    recent:
      "Direction créative et accompagnement client sur tous les projets sites web Aurentia.",
    image: "/images/team/fabien.webp",
    linkedin: "https://www.linkedin.com/in/fabienestrade/",
  },
  {
    name: "Olivier",
    role: "Stratégie · Serial entrepreneur",
    pitch:
      "Cofondateur d'achat-vip.com (millions de membres), ex-DG de Smily France. Apporte la vision business sur chaque mission.",
    recent:
      "Sparring stratégique avec les dirigeants formés — pricing, positionnement, GTM.",
    image: "/images/team/olivier-droite.webp",
    linkedin: "https://www.linkedin.com/in/olivier-le-floch-0899a9/",
  },
];

function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-background-surface dark:bg-foreground/[0.03]">
        <Image
          src={trainer.image}
          alt={trainer.name}
          fill
          className="object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
        <a
          href={trainer.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${trainer.name}`}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-foreground/15 bg-background/70 text-foreground/70 backdrop-blur-md transition-all duration-500 hover:bg-background/90 hover:text-foreground"
        >
          <Linkedin className="size-4" />
        </a>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <span className="font-mono text-sm uppercase tracking-widest text-accent-primary">
            {trainer.role}
          </span>
          <h3 className="mt-1 text-2xl font-black text-foreground">{trainer.name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-foreground/70">{trainer.pitch}</p>
        <div className="mt-auto rounded-2xl border border-foreground/10 bg-background/50 dark:bg-foreground/[0.03] p-3 text-sm">
          <p className="mb-1 font-semibold text-foreground/55 uppercase tracking-wider text-sm">
            Livré récemment
          </p>
          <p className="leading-snug text-foreground/75">{trainer.recent}</p>
        </div>
      </div>
    </Card>
  );
}

export function FormationTrainersV2() {
  return (
    <SectionContainer
      id="trainers"
      eyebrow="L'angle Aurentia"
      title={solutionsIaFormationData.trainersTitle}
      subtitle={solutionsIaFormationData.trainersSubtitle}
      surface
      innerClassName="max-w-[1200px]"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TRAINERS.map((trainer, idx) => (
          <BlurReveal key={trainer.name} delay={idx * 0.08}>
            <TrainerCard trainer={trainer} />
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
