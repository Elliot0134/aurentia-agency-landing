"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  saasProcessContent,
  processSteps,
} from "@/data/saas-content";
import type { ProcessStep } from "@/data/saas-content";
import {
  PhoneCall,
  FileText,
  Paintbrush,
  Code,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, LucideIcon> = {
  PhoneCall,
  FileText,
  Paintbrush,
  Code,
  Rocket,
};

function StepCard({ step, index }: { step: ProcessStep; index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[step.icon];

  useGSAP(() => {
    if (!nodeRef.current) return;

    // Scale bounce on scroll
    gsap.fromTo(
      nodeRef.current,
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: nodeRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        delay: index * 0.12,
      }
    );
  });

  return (
    <div className="flex flex-col items-center text-center gap-5 relative">
      {/* Number */}
      <span className="text-sm font-bold text-foreground/30 tracking-widest">
        {step.number}
      </span>

      {/* Icon node — with bounce */}
      <div ref={nodeRef} className="opacity-0">
        {Icon && (
          <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center transition-all duration-700 hover:border-foreground/20 hover:shadow-[0_0_24px_rgba(201,100,66,0.1)]">
            <Icon className="w-7 h-7 text-foreground/70" />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-bold text-foreground">
        {step.title}
      </h3>

      {/* Text */}
      <p className="text-sm text-foreground/50 leading-relaxed max-w-[260px]">
        {step.text}
      </p>

      {/* Duration badge */}
      <span className="inline-block px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-sm text-foreground/50 font-medium transition-colors duration-700">
        {step.duration}
      </span>
    </div>
  );
}

export function SaasProcess() {
  const lineRef = useRef<SVGPathElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;

    const length = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Line draw animation
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 75%",
        end: "bottom 60%",
        scrub: true,
      },
    });
  });

  return (
    <Section className="py-28 md:py-36 relative">
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          {/* Badge */}
          <BlurReveal className="mb-5">
            <span className="inline-block px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-medium tracking-widest text-foreground/70">
              {saasProcessContent.badge}
            </span>
          </BlurReveal>

          <TextGradientReveal
            text={saasProcessContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground justify-center"
          />

          <BlurReveal className="mt-6" delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
              {saasProcessContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* Horizontal line (desktop only) — draw animation */}
          <svg
            className="hidden lg:block absolute top-[80px] left-0 w-full h-[2px] overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d={`M 0 1 L ${1200} 1`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground/10"
            />
          </svg>

          {/* Steps */}
          <BlurReveal stagger={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8">
              {processSteps.map((step, i) => (
                <StepCard key={step.number} step={step} index={i} />
              ))}
            </div>
          </BlurReveal>
        </div>
      </div>
    </Section>
  );
}
