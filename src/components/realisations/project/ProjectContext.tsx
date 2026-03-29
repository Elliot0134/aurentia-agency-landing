"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { AlertTriangle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectContextProps {
  context: string;
  problem: string;
}

export function ProjectContext({ context, problem }: ProjectContextProps) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    // Divider scale animation
    if (dividerRef.current) {
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Problem icon bounce
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: iconRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  });

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Block 1 — Context (glassmorphism card) */}
        <div className="mb-12 bg-foreground/[0.03] backdrop-blur-sm border border-foreground/[0.06] rounded-2xl p-6 md:p-8">
          <TextReveal
            text="Le contexte"
            elementType="h2"
            className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
          />
          <BlurReveal delay={0.15}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed md:leading-loose">
              {context}
            </p>
          </BlurReveal>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="h-px bg-foreground/10 origin-left mb-12"
        />

        {/* Block 2 — Problem (glassmorphism card) */}
        <div className="bg-foreground/[0.03] backdrop-blur-sm border border-foreground/[0.06] rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div ref={iconRef} className="opacity-0">
              <AlertTriangle className="w-5 h-5 text-amber-400/80" />
            </div>
            <TextReveal
              text="Le defi"
              elementType="h2"
              className="text-2xl md:text-3xl font-bold tracking-tight"
            />
          </div>
          <BlurReveal delay={0.15}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed md:leading-loose">
              {problem}
            </p>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
