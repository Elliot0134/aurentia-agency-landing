"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { processContent, processSteps } from "@/data/identite-visuelle-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function IdentiteVisuelleProcess() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!timelineRef.current) return;

      // Animate the connecting line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              end: "top 35%",
              scrub: true,
            },
          }
        );
      }

      // Organic node scale animation
      const nodes = timelineRef.current.querySelectorAll(".process-node-iv");
      nodes.forEach((node, i) => {
        gsap.fromTo(
          node,
          { scale: 0.4, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.12,
          }
        );
      });
    },
    { scope: timelineRef, dependencies: [animationsEnabled] }
  );

  return (
    <Section theme="dark-alt-2" className="section-divider-orange">
      <SectionBackground
        orbs={[
          { color: "ambre", position: "top-[20%] left-[10%]", size: "w-[300px] h-[300px]", opacity: "[0.04]" },
          { color: "rose", position: "bottom-[20%] right-[15%]", size: "w-[200px] h-[200px]", opacity: "[0.03]" },
        ]}
      />

      <div className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          {/* Badge */}
          <BlurReveal className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-orange-500/10 text-orange-500 border border-orange-500/20">
              {processContent.badge}
            </span>
          </BlurReveal>

          <TextGradientReveal
            text={processContent.title}
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
          />
          <BlurReveal className="mt-4" delay={0.15}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              {processContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Timeline — more organic/rounded */}
        <div
          ref={timelineRef}
          className="relative max-w-6xl mx-auto"
        >
          {/* Horizontal line (desktop only) — softer gradient for craft feel */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px bg-foreground/10">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-r from-amber-500/40 via-orange-500/40 to-rose-500/30 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {processSteps.map((step, index) => (
              <BlurReveal key={step.number} delay={index * 0.3}>
                <div className="relative flex flex-col items-center text-center lg:items-center">
                  {/* Number — more rounded/organic with warm glow */}
                  <div className="process-node-iv relative z-10 flex items-center justify-center w-[76px] h-[76px] rounded-full bg-foreground/5 border border-foreground/10 mb-5 opacity-0">
                    {/* Warm glow ring */}
                    <div
                      className="absolute inset-[-6px] rounded-full blur-md pointer-events-none"
                      style={{ background: "radial-gradient(circle, rgba(217,150,80,0.12) 0%, transparent 70%)" }}
                      aria-hidden="true"
                    />
                    <span className="relative text-3xl font-mono font-black text-foreground/80">
                      {step.number}
                    </span>
                  </div>

                  {/* Vertical connector (mobile / tablet) */}
                  {index < processSteps.length - 1 && (
                    <div className="lg:hidden absolute top-[76px] left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-foreground/10 to-transparent" />
                  )}

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
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
