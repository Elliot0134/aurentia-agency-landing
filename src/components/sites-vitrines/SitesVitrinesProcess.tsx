"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { processContent, processSteps } from "@/data/sites-vitrines-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stepIcons = [
  // 01 — L'échange (phone/chat)
  <svg key="icon-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  // 02 — La création (code/wand)
  <svg key="icon-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 4-1 8 6-4-4 8" /><path d="M3 20h4l10-10a1 1 0 0 0 0-1.41l-2.59-2.59a1 1 0 0 0-1.41 0L3 16v4z" /></svg>,
  // 03 — Validation (check-circle)
  <svg key="icon-3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  // 04 — Lancement (rocket)
  <svg key="icon-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
];

export function SitesVitrinesProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate progress line fill
      const lineFill = sectionRef.current.querySelector(".timeline-line-fill");
      if (lineFill) {
        gsap.fromTo(
          lineFill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 1.2,
            },
          }
        );
      }

      // Animate vertical line fill (mobile)
      const verticalFill = sectionRef.current.querySelector(".timeline-line-fill-vertical");
      if (verticalFill) {
        gsap.fromTo(
          verticalFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 1.2,
            },
          }
        );
      }

      // Animate dots
      const dots = sectionRef.current.querySelectorAll(".timeline-dot");
      dots.forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.05,
          }
        );
      });

      // Animate cards
      const cards = sectionRef.current.querySelectorAll(".process-step-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <Section>
      <div ref={sectionRef}>
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <BlurReveal className="mb-6">
            <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold tracking-widest bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
              {processContent.badge}
            </span>
          </BlurReveal>

          <TextGradientReveal
            text={processContent.title}
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tight text-foreground justify-center"
          />
          <BlurReveal className="mt-5" delay={0.15}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-2xl mx-auto">
              {processContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Timeline — Desktop */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Horizontal line */}
          <div className="absolute top-[88px] left-0 right-0 h-[2px]">
            <div className="absolute inset-0 bg-foreground/[0.06] rounded-full" />
            <div className="timeline-line-fill absolute inset-0 bg-gradient-to-r from-accent-primary/60 via-accent-secondary/50 to-accent-primary/60 rounded-full origin-left" />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.number} className="process-step-card relative flex flex-col items-center opacity-0">
                {/* Dot on the timeline */}
                <div className="relative z-10 mb-8">
                  {/* Glow ring */}
                  <div className="absolute inset-[-12px] rounded-full bg-accent-primary/10 blur-md opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  {/* Outer ring */}
                  <div className="timeline-dot w-10 h-10 rounded-full bg-background border-2 border-foreground/10 flex items-center justify-center relative opacity-0 transition-all duration-700 hover:border-accent-primary/50 hover:shadow-[0_0_20px_rgba(201,100,66,0.2)]">
                    {/* Inner active dot */}
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary shadow-[0_0_8px_rgba(201,100,66,0.4)]" />
                  </div>
                </div>

                {/* Card */}
                <SpotlightCard className="w-full group">
                  <div className="relative p-6 h-full">
                    {/* Step number + icon row */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[56px] font-black font-mono leading-none text-foreground/[0.04] select-none">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary/15 to-accent-secondary/10 border border-accent-primary/15 flex items-center justify-center text-accent-primary/80 group-hover:from-accent-primary/25 group-hover:to-accent-secondary/15 group-hover:border-accent-primary/30 group-hover:shadow-[0_0_24px_rgba(201,100,66,0.15)] transition-all duration-700">
                        {stepIcons[index]}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent-secondary transition-colors duration-500">
                      {step.title}
                    </h3>

                    {/* Duration badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/[0.06] border border-accent-primary/10 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/60 animate-pulse" />
                      <span className="text-sm font-mono font-medium text-accent-primary/70">
                        {step.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/50 text-[15px] leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline — Mobile & Tablet */}
        <div className="lg:hidden relative max-w-lg mx-auto">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-[23px] md:left-[27px] w-[2px]">
            <div className="absolute inset-0 bg-foreground/[0.06] rounded-full" />
            <div className="timeline-line-fill-vertical absolute inset-0 bg-gradient-to-b from-accent-primary/60 via-accent-secondary/50 to-accent-primary/60 rounded-full origin-top" />
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={step.number} className="process-step-card relative flex gap-5 md:gap-6 opacity-0">
                {/* Dot */}
                <div className="relative z-10 shrink-0 mt-6">
                  <div className="timeline-dot w-12 h-12 md:w-14 md:h-14 rounded-full bg-background border-2 border-foreground/10 flex items-center justify-center opacity-0 transition-all duration-700">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary shadow-[0_0_8px_rgba(201,100,66,0.4)]" />
                  </div>
                </div>

                {/* Card */}
                <SpotlightCard className="flex-1 group">
                  <div className="relative p-5">
                    {/* Step number watermark */}
                    <span className="absolute top-3 right-4 text-[48px] font-black font-mono leading-none text-foreground/[0.03] select-none pointer-events-none">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary/15 to-accent-secondary/10 border border-accent-primary/15 flex items-center justify-center text-accent-primary/80 mb-4 group-hover:from-accent-primary/25 group-hover:to-accent-secondary/15 group-hover:border-accent-primary/30 group-hover:shadow-[0_0_20px_rgba(201,100,66,0.15)] transition-all duration-700">
                      {stepIcons[index]}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent-secondary transition-colors duration-500">
                      {step.title}
                    </h3>

                    {/* Duration badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/[0.06] border border-accent-primary/10 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/60 animate-pulse" />
                      <span className="text-sm font-mono font-medium text-accent-primary/70">
                        {step.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/50 text-[15px] leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
