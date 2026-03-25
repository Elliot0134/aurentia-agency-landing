"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { proofSectionContent } from "@/data/about-content";

const { stackTechnologies } = proofSectionContent;

type Tech = (typeof stackTechnologies)[number];

const phases: { label: string; names: string[] }[] = [
  { label: "Design", names: ["Figma", "Canva", "Illustrator"] },
  { label: "Développement", names: ["GitHub", "Supabase", "Vercel"] },
  { label: "Intelligence", names: ["Claude AI", "N8N"] },
  { label: "Business", names: ["Stripe", "Google Drive", "WhatsApp"] },
];

function getTechByName(name: string): Tech | undefined {
  return stackTechnologies.find((t) => t.name === name);
}

export function AboutStack() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const phaseTechs = phases.map((phase) => ({
    ...phase,
    techs: phase.names
      .map(getTechByName)
      .filter((t): t is Tech => t !== undefined),
  }));

  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden">
      <SectionBackground
        variant="alt"
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
              Nos outils
            </span>
          </BlurReveal>

          <TextReveal
            text="Notre stack."
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 justify-center"
          />

          <BlurReveal delay={0.3}>
            <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              {proofSectionContent.stackClosing}
            </p>
          </BlurReveal>
        </div>

        {/* Workflow pipeline */}
        <BlurReveal>
          <div className="max-w-6xl mx-auto">
            {/* Desktop: 4 colonnes horizontales */}
            <div className="flex flex-col md:flex-row items-stretch gap-0">
              {phaseTechs.map((phase, phaseIndex) => {
                const tooltipSide = phaseIndex < 2 ? "right" : "left";

                return (
                  <div
                    key={phase.label}
                    className="flex flex-col md:flex-row items-stretch flex-1"
                  >
                    {/* Phase column */}
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      {/* Phase label */}
                      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/40 mb-8 whitespace-nowrap">
                        {phase.label}
                      </span>

                      {/* Icons */}
                      <div className="flex flex-col items-center gap-8 md:gap-10 w-full">
                        {phase.techs.map((tech) => {
                          const isActive = activeId === tech.name;
                          const isDimmed = activeId !== null && !isActive;

                          return (
                            <div key={tech.name} className="relative flex flex-col md:flex-row items-center">
                              {/* Icon */}
                              <button
                                className="cursor-default"
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

                              {/* Tooltip — glassmorphism container */}
                              <div
                                className={[
                                  "absolute z-30 pointer-events-none",
                                  "transition-all duration-500 ease-in-out",
                                  // Mobile: en dessous, centré
                                  "top-full mt-3 left-1/2 -translate-x-1/2 w-52 text-center",
                                  // Desktop: latéral selon la colonne
                                  tooltipSide === "right"
                                    ? "md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:left-full md:ml-5 md:w-56 md:text-left"
                                    : "md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:left-auto md:right-full md:mr-5 md:w-56 md:text-right",
                                  // Animation
                                  isActive
                                    ? "opacity-100 translate-y-0 scale-100"
                                    : "opacity-0 translate-y-1 scale-95",
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

                    {/* Flèches entre les phases */}
                    {phaseIndex < phases.length - 1 && (
                      <>
                        {/* Desktop: flèche horizontale */}
                        <div className="hidden md:flex items-center justify-center px-4 pt-8">
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

                        {/* Mobile: flèche verticale */}
                        <div className="flex md:hidden flex-col items-center py-5">
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
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
