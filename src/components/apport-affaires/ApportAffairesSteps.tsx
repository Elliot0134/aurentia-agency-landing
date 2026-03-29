"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { apportStepsSection, apportSteps } from "@/data/apport-affaires-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ApportAffairesSteps() {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!lineRef.current || !sectionRef.current) return;

      const line = lineRef.current;
      const length = line.getTotalLength();

      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 50%",
          scrub: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [animationsEnabled] }
  );

  return (
    <Section ref={sectionRef} theme="dark-alt" className="py-28 md:py-36">
      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <TextReveal
            text={apportStepsSection.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/50 text-base md:text-lg leading-relaxed">
              {apportStepsSection.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Steps grid */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Connection line — desktop horizontal */}
          <svg
            aria-hidden="true"
            className="absolute top-1/2 left-0 w-full h-1 hidden md:block -translate-y-1/2 pointer-events-none"
            preserveAspectRatio="none"
          >
            <line
              ref={lineRef}
              x1="16.6%"
              y1="50%"
              x2="83.3%"
              y2="50%"
              stroke="currentColor"
              className="text-accent-primary/30"
              strokeWidth="2"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {apportSteps.map((step, i) => (
              <BlurReveal key={step.number} delay={i * 0.25}>
                <div
                  className={cn(
                    "relative p-8 rounded-3xl border border-foreground/5 bg-foreground/[0.02]",
                    "transition-all duration-700 ease-in-out hover:-translate-y-1 hover:border-foreground/10"
                  )}
                >
                  {/* Step number — glassmorphism circle */}
                  <div className="w-12 h-12 rounded-full bg-foreground/[0.05] backdrop-blur-md border border-foreground/[0.08] flex items-center justify-center mb-4">
                    <span className="text-lg font-mono font-black text-accent-primary/80">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-foreground/50 text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </BlurReveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
