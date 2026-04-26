"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";

type Member = {
  name: string;
  role: string;
  desc: string;
  details: string;
  imageRight: string;
  imageLeft: string;
  linkedin: string;
};

// Full bios for the a-propos page — longer than the homepage preview.
const team: Member[] = [
  {
    name: "Elliot",
    role: "CEO, Vision & IA",
    desc: "Stratégie, direction produit et IA. Le moteur d'Aurentia.",
    details:
      "À l'origine d'Aurentia. Entrepreneur multi-projets et architecte IA. Fondateur d'ESST Solutions et de Friend'iz (CBD pour animaux). Co-créateur de Comparateur-IA-Facile.com avec Matthieu et Olivier. Chez Aurentia, il porte la vision, la stratégie et la direction produit/IA.",
    imageRight: "/images/team/elliot.webp",
    imageLeft: "/images/team/elliot.webp",
    linkedin: "https://www.linkedin.com/in/elliot-estrade-8b7754201/",
  },
  {
    name: "Matthieu",
    role: "CTO, Lead Technique",
    desc: "Le pilier technique. Sécurité, performance et fiabilité — sans exception.",
    details:
      "Développeur full-stack et formateur à Epitech Marseille. Pionnier Claude Code au sein de l'équipe — c'est lui qui nous a tous convertis. Architecture technique et code review sur chaque projet.",
    imageRight: "/images/team/matthieu-droite.webp",
    imageLeft: "/images/team/matthieu-gauche.webp",
    linkedin: "https://www.linkedin.com/in/mathieu-bousquet-178454315/",
  },
  {
    name: "Fabien",
    role: "Production Lead",
    desc: "20 ans de craft web. La rigueur, l'expérience, l'oeil qui ne laisse rien passer.",
    details:
      "Co-fondateur et directeur de l'agence de communication Le Prisme à Avignon. 20 ans de création de sites web, design graphique et stratégie de marque. Expert en identité visuelle, direction créative et accompagnement client.",
    imageRight: "/images/team/fabien.webp",
    imageLeft: "/images/team/fabien.webp",
    linkedin: "https://www.linkedin.com/in/fabienestrade/",
  },
  {
    name: "Olivier",
    role: "Stratégie & Business",
    desc: "L'entrepreneur visionnaire. Stratégie, croissance et développement business.",
    details:
      "Cofondateur d'achat-vip.com (millions de membres), ex-DG de Smily France (centaines de M€ de volume). Serial entrepreneur e-commerce et SaaS — de vente-privee à la location saisonnière.",
    imageRight: "/images/team/olivier-droite.webp",
    imageLeft: "/images/team/olivier-gauche.webp",
    linkedin: "https://www.linkedin.com/in/olivier-le-floch-0899a9/",
  },
  {
    name: "Stéphane",
    role: "E-commerce & Scale",
    desc: "La culture du scale-up. 25 ans de serial entrepreneur, vision e-commerce et IA.",
    details:
      "Serial entrepreneur, 4 sociétés créées et cédées. CEO d'Achatvip (45 M€ de CA, 2,7M membres) et co-fondateur d'Inshop chez Veepee — Trophée de l'Innovation E-commerce 2013. Aujourd'hui CEO de Cryptoliquidity, où il combine DeFi et IA au quotidien.",
    imageRight: "/images/team/stephane.webp",
    imageLeft: "/images/team/stephane.webp",
    linkedin: "https://www.linkedin.com/in/st%C3%A9phane-guillemot-26763a5/",
  },
];

function TeamCard({ member, idx }: { member: Member; idx: number }) {
  return (
    <div className="relative p-4 h-full flex flex-col justify-end rounded-3xl bg-background-surface dark:bg-foreground/[0.04] border border-foreground/10 group overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={idx % 2 === 0 ? member.imageRight : member.imageLeft}
          alt={member.name}
          fill
          className={`object-contain transition-transform duration-700 group-hover:scale-105 md:hidden ${
            idx % 2 === 0 ? "object-right-top" : "object-left-top"
          }`}
          sizes="100vw"
        />
        <Image
          src={member.imageRight}
          alt={member.name}
          fill
          className="object-contain object-right-top transition-transform duration-700 group-hover:scale-105 hidden md:block"
          sizes="50vw"
        />
      </div>

      {/* LinkedIn icon */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute top-3 z-20 w-9 h-9 rounded-full bg-background/60 backdrop-blur-md border border-foreground/15 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-background/85 transition-all duration-500 pointer-events-auto ${
          idx % 2 === 0 ? "left-3" : "right-3 md:left-3 md:right-auto"
        }`}
        aria-label={`LinkedIn de ${member.name}`}
      >
        <Linkedin className="size-4" />
      </a>

      {/* Text content */}
      <div
        className={`relative z-10 text-foreground transition-all duration-500 ${
          idx % 2 === 1 ? "text-right md:text-left" : ""
        }`}
      >
        <span className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-0.5 block opacity-90">
          {member.role}
        </span>
        <h3 className="text-2xl font-black mb-2">{member.name}</h3>
        {/* Desc + details — floating panel for readability over photos */}
        <div className="rounded-2xl bg-background/80 dark:bg-foreground/[0.08] backdrop-blur-md p-3">
          <p className="leading-snug text-sm opacity-75">{member.desc}</p>
          {/* Details — revealed on hover */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
            <div className="overflow-hidden">
              <p className="leading-snug text-sm mt-2 pt-2 opacity-60 border-t border-foreground/15">
                {member.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AProposTeam() {
  const firstRow = team.slice(0, 2);
  const secondRow = team.slice(2);

  return (
    <SectionContainer
      id="equipe"
      title="Les cinq fondateurs"
      subtitle="Une équipe resserrée, complémentaire, qui pilote chaque projet de A à Z. Pas de sous-traitance, pas d'intermédiaires."
      className="relative"
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-[240px] md:auto-rows-[320px]">
          {firstRow.map((member, idx) => (
            <BlurReveal key={member.name} delay={idx * 0.2} className="h-full">
              <TeamCard member={member} idx={idx} />
            </BlurReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[240px] md:auto-rows-[320px]">
          {secondRow.map((member, idx) => (
            <BlurReveal key={member.name} delay={(idx + 2) * 0.2} className="h-full">
              <TeamCard member={member} idx={idx + 2} />
            </BlurReveal>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center pt-32">
        <TextGradientReveal
          text="Tant que ce n'est pas parfait, on ne lance pas."
          elementType="p"
          className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight justify-center opacity-80"
        />
      </div>
    </SectionContainer>
  );
}
