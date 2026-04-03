"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { InfiniteMarquee } from "@/components/animations/InfiniteMarquee";
import {
  saasStackContent,
  marqueeItems,
} from "@/data/saas-content";

const phases: { label: string; names: string[] }[] = [
  { label: "Design", names: ["Figma", "Canva", "Illustrator"] },
  { label: "Développement", names: ["GitHub", "Supabase", "Vercel"] },
  { label: "Intelligence", names: ["Claude AI", "N8N"] },
  { label: "Business", names: ["Stripe", "Google Drive", "WhatsApp"] },
];

interface TechInfo {
  name: string;
  icon: string;
  description: string;
}

const techData: TechInfo[] = [
  { name: "Figma", icon: "/images/icons/figma-icon.webp", description: "Prototypage et design collaboratif. Chaque maquette est validée avant de coder." },
  { name: "Canva", icon: "/images/icons/canva-icon.webp", description: "Création visuelle rapide. Mockups, visuels, assets marketing." },
  { name: "Illustrator", icon: "/images/icons/illustrator-icon.webp", description: "Design vectoriel précis. Logos, icônes, illustrations sur-mesure." },
  { name: "GitHub", icon: "/images/icons/github-icon.webp", description: "Versioning et collaboration. Chaque ligne de code est tracée et revue." },
  { name: "Supabase", icon: "/images/icons/supaabse-icon.webp", description: "Base de données, auth, storage, realtime. Le backend complet, open-source." },
  { name: "Vercel", icon: "/images/icons/vercel-icon.webp", description: "Déploiement instantané. Edge network mondial." },
  { name: "Claude AI", icon: "/images/icons/claude-icon.webp", description: "Notre copilote IA. Code, design, contenu — il accélère chaque étape." },
  { name: "N8N", icon: "/images/icons/n8n-icon.webp", description: "Automatisation sur-mesure. On connecte vos outils entre eux." },
  { name: "Stripe", icon: "/images/icons/stripe-icon.webp", description: "Paiements, abonnements, facturation. Billing intégré." },
  { name: "Google Drive", icon: "/images/icons/google-drive-icon.webp", description: "Espace partagé client. Briefs, assets, livrables — tout au même endroit." },
  { name: "WhatsApp", icon: "/images/icons/whatsapp-icon.webp", description: "Communication directe. On répond vite, sans formalités inutiles." },
];

function getTechByName(name: string): TechInfo | undefined {
  return techData.find((t) => t.name === name);
}

export function SaasStack() {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Mobile: track selected tech per phase (default = first tech)
  const [mobileSelected, setMobileSelected] = useState<Record<string, string>>({});

  const phaseTechs = phases.map((phase) => ({
    ...phase,
    techs: phase.names
      .map(getTechByName)
      .filter((t): t is TechInfo => t !== undefined),
  }));

  function getMobileSelected(phase: typeof phaseTechs[number]): string {
    return mobileSelected[phase.label] || phase.techs[0]?.name || "";
  }

  return (
    <Section id="stack" className="py-28 md:py-36 relative">
      <SectionBackground
        variant="base"
        orbs={[
          {
            color: "orange",
            position: "top-[30%] left-[50%]",
            size: "w-[500px] h-[500px]",
            opacity: "[0.04]",
          },
        ]}
      />

      <div className="relative z-10">
        {/* Section header */}
        <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
          <BlurReveal>
            <span className="inline-block rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-sm font-medium tracking-widest uppercase text-foreground/60 mb-6">
              Notre stack
            </span>
          </BlurReveal>

          <TextReveal
            text={saasStackContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 justify-center"
          />

          <BlurReveal delay={0.3}>
            <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              {saasStackContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Workflow pipeline */}
        <BlurReveal>
          <div className="max-w-6xl mx-auto">

            {/* ── Mobile layout ── */}
            <div className="flex flex-col gap-6 md:hidden">
              {phaseTechs.map((phase, phaseIndex) => {
                const selectedName = getMobileSelected(phase);
                const selectedTech = phase.techs.find((t) => t.name === selectedName);

                return (
                  <div key={phase.label}>
                    {/* Phase label */}
                    <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-foreground/40 mb-5 text-center">
                      {phase.label}
                    </span>

                    {/* Icons row */}
                    <div className="flex items-center justify-center gap-6 mb-4">
                      {phase.techs.map((tech) => {
                        const isSelected = tech.name === selectedName;
                        return (
                          <button
                            key={tech.name}
                            className="min-h-11 min-w-11 flex items-center justify-center cursor-pointer"
                            onClick={() =>
                              setMobileSelected((prev) => ({
                                ...prev,
                                [phase.label]: tech.name,
                              }))
                            }
                            aria-label={tech.name}
                            aria-pressed={isSelected}
                          >
                            <Image
                              src={tech.icon}
                              alt={tech.name}
                              width={80}
                              height={80}
                              className={[
                                "w-14 h-14 object-contain transition-all duration-500 ease-in-out",
                                isSelected
                                  ? "opacity-100 scale-110"
                                  : "opacity-40",
                              ].join(" ")}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected tech description */}
                    {selectedTech && (
                      <div className="text-center px-4 transition-all duration-500 ease-in-out">
                        <p className="text-sm font-semibold text-foreground mb-1">
                          {selectedTech.name}
                        </p>
                        <p className="text-sm text-foreground/50 leading-relaxed">
                          {selectedTech.description}
                        </p>
                      </div>
                    )}

                    {/* Arrow between phases */}
                    {phaseIndex < phases.length - 1 && (
                      <div className="flex flex-col items-center pt-6">
                        <svg
                          width="24"
                          height="40"
                          viewBox="0 0 24 40"
                          className="text-foreground/30"
                          aria-hidden
                        >
                          <line x1="12" y1="0" x2="12" y2="28" stroke="currentColor" strokeWidth="2" />
                          <polygon points="6,28 12,40 18,28" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Desktop layout (md+) ── */}
            <div className="hidden md:flex flex-row items-stretch gap-0">
              {phaseTechs.map((phase, phaseIndex) => {
                const tooltipSide = phaseIndex < 2 ? "right" : "left";

                return (
                  <div
                    key={phase.label}
                    className="flex flex-row items-stretch flex-1"
                  >
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/40 mb-8 whitespace-nowrap">
                        {phase.label}
                      </span>

                      <div className="flex flex-col items-center gap-10 w-full">
                        {phase.techs.map((tech) => {
                          const isActive = activeId === tech.name;
                          const isDimmed = activeId !== null && !isActive;

                          return (
                            <div
                              key={tech.name}
                              className={[
                                "relative flex flex-row items-center",
                                isActive ? "z-50" : "z-10",
                              ].join(" ")}
                            >
                              <button
                                className="cursor-default relative"
                                onMouseEnter={() => setActiveId(tech.name)}
                                onMouseLeave={() => setActiveId(null)}
                                onFocus={() => setActiveId(tech.name)}
                                onBlur={() => setActiveId(null)}
                                aria-label={tech.name}
                              >
                                <Image
                                  src={tech.icon}
                                  alt={tech.name}
                                  width={80}
                                  height={80}
                                  className={[
                                    "w-14 h-14 lg:w-20 lg:h-20 object-contain transition-all duration-500 ease-in-out",
                                    isActive
                                      ? "opacity-100 scale-115"
                                      : isDimmed
                                      ? "opacity-25"
                                      : "opacity-60 hover:opacity-90",
                                  ].join(" ")}
                                />
                              </button>

                              {/* Tooltip — glassmorphism, centered vertically on icon */}
                              <div
                                className={[
                                  "absolute pointer-events-none",
                                  "transition-all duration-500 ease-in-out",
                                  "top-1/2 -translate-y-1/2",
                                  tooltipSide === "right"
                                    ? "left-full ml-5 w-56 text-left"
                                    : "right-full mr-5 w-56 text-right",
                                  isActive
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-95",
                                ].join(" ")}
                                role="tooltip"
                                aria-hidden={!isActive}
                              >
                                <div className="rounded-xl backdrop-blur-xl bg-foreground/[0.04] border border-foreground/10 shadow-lg shadow-foreground/[0.05] px-4 py-3">
                                  <p className="text-sm font-semibold text-foreground mb-1">
                                    {tech.name}
                                  </p>
                                  <p className="text-sm text-foreground/50 leading-relaxed">
                                    {tech.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {phaseIndex < phases.length - 1 && (
                      <div className="flex items-center justify-center px-4 pt-8">
                        <svg
                          width="40"
                          height="24"
                          viewBox="0 0 40 24"
                          className="text-foreground/30"
                          aria-hidden
                        >
                          <line x1="0" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="2" />
                          <polygon points="28,6 40,12 28,18" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </BlurReveal>

        {/* Marquee */}
        <div className="mt-16 md:mt-20">
          <InfiniteMarquee
            items={marqueeItems}
            className="text-foreground/40 font-medium text-base"
          />
        </div>
      </div>
    </Section>
  );
}
