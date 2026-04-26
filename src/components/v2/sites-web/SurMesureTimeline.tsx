// src/components/v2/sites-web/SurMesureTimeline.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ProcessStep } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SurMesureTimelineProps = {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
};

export function SurMesureTimeline({
  steps,
  title = "Comment on construit votre projet",
  subtitle = "Cinq étapes claires, du premier appel à la mise en ligne. Vous savez toujours où on en est.",
}: SurMesureTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  // Progress fill on the central rail as the section scrolls
  useGSAP(
    () => {
      if (!containerRef.current || !fillRef.current) return;
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        },
      );
    },
    { scope: containerRef },
  );

  // Refresh ScrollTrigger on mount in case images/fonts shift layout
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <SectionContainer id="method" title={title} subtitle={subtitle}>
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-5xl py-6 md:py-10"
      >
        {/* Central rail (desktop) / left rail (mobile) */}
        <div
          aria-hidden
          className="absolute bottom-0 left-6 top-0 w-[2px] rounded-full bg-foreground/25 md:left-1/2 md:-translate-x-1/2"
        />
        {/* Animated fill on top of the rail */}
        <div
          ref={fillRef}
          aria-hidden
          className="absolute bottom-0 left-6 top-0 w-[2px] origin-top scale-y-0 rounded-full bg-gradient-to-b from-accent-primary via-accent-primary to-accent-primary/0 shadow-[0_0_12px_rgba(228,85,18,0.45)] md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="relative flex flex-col gap-12 md:gap-20">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLeft = idx % 2 === 0;

            return (
              <li key={step.number} className="relative">
                <div
                  className={cn(
                    "flex flex-col items-stretch gap-6",
                    "md:flex-row md:items-center md:gap-12",
                    !isLeft && "md:flex-row-reverse",
                  )}
                >
                  {/* Content card (one half on desktop, full width on mobile) */}
                  <div className="md:w-1/2">
                    <BlurReveal delay={idx * 0.05}>
                      <div
                        className={cn(
                          "group relative ml-14 overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 md:ml-0 md:p-8",
                          "transition-all duration-700 ease-in-out hover:-translate-y-1 hover:border-accent-primary/40 hover:shadow-[0_0_60px_rgba(228,85,18,0.06)]",
                          isLeft ? "md:mr-4 md:text-right" : "md:ml-4 md:text-left",
                        )}
                      >
                        {/* Big translucent step number — sits inside the card */}
                        <span
                          aria-hidden
                          className={cn(
                            "pointer-events-none absolute top-2 select-none font-mono text-7xl font-black leading-none text-accent-primary/[0.08] transition-colors duration-700 ease-in-out group-hover:text-accent-primary/20 md:top-3 md:text-8xl",
                            isLeft ? "right-4 md:right-6" : "left-4 md:left-6",
                          )}
                        >
                          {step.number}
                        </span>

                        {/* Icon */}
                        {Icon && (
                          <div
                            className={cn(
                              "relative mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-all duration-700 ease-in-out group-hover:bg-accent-primary group-hover:text-white",
                              isLeft ? "md:ml-auto" : "",
                            )}
                          >
                            <Icon className="size-7" strokeWidth={1.5} />
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="relative font-heading text-xl font-bold leading-tight text-foreground md:text-2xl">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="relative mt-3 text-sm leading-relaxed text-foreground/65 md:text-base">
                          {step.description}
                        </p>

                        {/* Accent bar */}
                        <div
                          aria-hidden
                          className={cn(
                            "relative mt-6 h-[2px] w-10 origin-left bg-accent-primary/50 transition-transform duration-700 ease-in-out group-hover:scale-x-[3] group-hover:bg-accent-primary",
                            isLeft && "md:ml-auto md:origin-right",
                          )}
                        />
                      </div>
                    </BlurReveal>
                  </div>

                  {/* Center marker dot — sits on the rail */}
                  <div
                    aria-hidden
                    className="absolute left-6 top-8 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  >
                    <div className="relative">
                      <div className="size-5 rounded-full border-[3px] border-accent-primary bg-background shadow-[0_0_14px_rgba(228,85,18,0.55)] transition-all duration-700 ease-in-out" />
                      <div className="absolute inset-0 size-5 animate-ping rounded-full bg-accent-primary/40 [animation-duration:2.5s]" />
                    </div>
                  </div>

                  {/* Spacer half (desktop only) */}
                  <div aria-hidden className="hidden md:block md:w-1/2" />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionContainer>
  );
}
