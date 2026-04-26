// src/components/v2/agence/AgenceStack.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  agenceStackTechnologies,
  agenceStackPhases,
  agenceStackSection,
  type AgenceStackTech,
} from "@/data/v2/agence-content";

function getTechByName(name: string): AgenceStackTech | undefined {
  return agenceStackTechnologies.find((t) => t.name === name);
}

export function AgenceStack() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileSelected, setMobileSelected] = useState<Record<string, string>>({});

  const phaseTechs = agenceStackPhases.map((phase) => ({
    ...phase,
    techs: phase.names
      .map(getTechByName)
      .filter((t): t is AgenceStackTech => t !== undefined),
  }));

  function getMobileSelected(phase: (typeof phaseTechs)[number]): string {
    return mobileSelected[phase.label] || phase.techs[0]?.name || "";
  }

  return (
    <SectionContainer
      id="stack"
      eyebrow={agenceStackSection.eyebrow}
      title={agenceStackSection.title}
      subtitle={agenceStackSection.subtitle}
      surface
    >
      <BlurReveal>
        <div className="mx-auto max-w-6xl">
          {/* Mobile */}
          <div className="flex flex-col gap-6 md:hidden">
            {phaseTechs.map((phase, phaseIndex) => {
              const selectedName = getMobileSelected(phase);
              const selectedTech = phase.techs.find((t) => t.name === selectedName);

              return (
                <div key={phase.label}>
                  <span className="mb-5 block text-center text-sm font-semibold uppercase tracking-[0.2em] text-foreground/40">
                    {phase.label}
                  </span>

                  <div className="mb-4 flex items-center justify-center gap-6">
                    {phase.techs.map((tech) => {
                      const isSelected = tech.name === selectedName;
                      return (
                        <button
                          key={tech.name}
                          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center"
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
                              "h-14 w-14 object-contain transition-all duration-500 ease-in-out",
                              isSelected ? "scale-110 opacity-100" : "opacity-40",
                            ].join(" ")}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {selectedTech && (
                    <div className="px-4 text-center transition-all duration-500 ease-in-out">
                      <p className="mb-1 text-sm font-semibold text-foreground">
                        {selectedTech.name}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/55">
                        {selectedTech.description}
                      </p>
                    </div>
                  )}

                  {phaseIndex < agenceStackPhases.length - 1 && (
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

          {/* Desktop */}
          <div className="hidden flex-row items-stretch gap-0 md:flex">
            {phaseTechs.map((phase, phaseIndex) => {
              const tooltipSide = phaseIndex < 2 ? "right" : "left";

              return (
                <div key={phase.label} className="flex flex-1 flex-row items-stretch">
                  <div className="flex min-w-0 flex-1 flex-col items-center">
                    <span className="mb-8 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-foreground/40">
                      {phase.label}
                    </span>
                    <div className="flex w-full flex-col items-center gap-10">
                      {phase.techs.map((tech) => {
                        const isActive = activeId === tech.name;
                        const isDimmed = activeId !== null && !isActive;

                        return (
                          <div key={tech.name} className="relative flex flex-row items-center">
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
                                  "h-14 w-14 object-contain transition-all duration-500 ease-in-out lg:h-20 lg:w-20",
                                  isActive
                                    ? "scale-115 opacity-100"
                                    : isDimmed
                                    ? "opacity-25"
                                    : "opacity-60 hover:opacity-90",
                                ].join(" ")}
                              />
                            </button>

                            <div
                              className={[
                                "pointer-events-none absolute z-30",
                                "transition-all duration-500 ease-in-out",
                                tooltipSide === "right"
                                  ? "left-full top-1/2 ml-5 w-56 -translate-y-1/2 text-left"
                                  : "right-full top-1/2 mr-5 w-56 -translate-y-1/2 text-right",
                                isActive
                                  ? "translate-y-0 scale-100 opacity-100"
                                  : "translate-y-1 scale-95 opacity-0",
                              ].join(" ")}
                              role="tooltip"
                              aria-hidden={!isActive}
                            >
                              <div className="rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 shadow-lg shadow-foreground/[0.05] backdrop-blur-xl">
                                <p className="mb-1 text-sm font-semibold text-foreground">
                                  {tech.name}
                                </p>
                                <p className="text-sm leading-relaxed text-foreground/55">
                                  {tech.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {phaseIndex < agenceStackPhases.length - 1 && (
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
    </SectionContainer>
  );
}
