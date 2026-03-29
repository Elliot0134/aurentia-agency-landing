"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { BrowserMockup } from "@/components/shared/BrowserMockup";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import type { Project } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!sectionRef.current) return;

    // Badge animation
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    }

    // Metadata pills stagger
    if (pillsRef.current) {
      const pills = pillsRef.current.children;
      gsap.fromTo(
        pills,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    }

    // Browser mockup slide-in
    if (mockupRef.current) {
      gsap.fromTo(
        mockupRef.current,
        { opacity: 0, x: 60, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
        }
      );
    }
  }, { scope: sectionRef, dependencies: [animationsEnabled] });

  // Extract first sentence from context for description
  const description = project.context.split(".").slice(0, 2).join(".") + ".";

  return (
    <div
      ref={sectionRef}
      className="min-h-[80vh] flex items-center py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text column */}
          <div className="order-2 md:order-1 flex flex-col gap-5">
            {/* Badge */}
            <div ref={badgeRef} className="opacity-0">
              <span className="inline-block text-sm tracking-widest uppercase font-medium text-foreground/50 border border-foreground/10 rounded-full px-4 py-1.5">
                {project.type}
              </span>
            </div>

            {/* H1 */}
            <TextReveal
              text={project.name}
              elementType="h1"
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              delay={0.3}
            />

            {/* Description */}
            <BlurReveal delay={0.3}>
              <p className="text-base md:text-lg text-foreground/50 leading-relaxed max-w-lg">
                {description}
              </p>
            </BlurReveal>

            {/* Metadata pills */}
            <div ref={pillsRef} className="flex flex-wrap gap-3 mt-2">
              <span className="text-sm font-mono text-foreground/40 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-full px-3 py-1 opacity-0">
                {project.city}
              </span>
              <span className="text-sm font-mono text-foreground/40 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-full px-3 py-1 opacity-0">
                Livre en {project.duration}
              </span>
              <span className="text-sm font-mono text-foreground/40 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-full px-3 py-1 opacity-0">
                {project.year}
              </span>
              {project.status === "En cours" && (
                <span className="text-sm font-mono text-amber-400/80 bg-amber-400/5 backdrop-blur-sm border border-amber-400/20 rounded-full px-3 py-1 opacity-0">
                  En cours
                </span>
              )}
            </div>

            {/* Live URL button */}
            {project.liveUrl && (
              <BlurReveal delay={0.6} className="mt-2">
                <MagneticButton
                  glow
                  className="px-6 py-3"
                  onClick={() =>
                    window.open(project.liveUrl, "_blank", "noopener,noreferrer")
                  }
                >
                  Voir le site live
                  <ExternalLink className="w-4 h-4 ml-2" />
                </MagneticButton>
              </BlurReveal>
            )}
          </div>

          {/* Browser mockup column */}
          <div ref={mockupRef} className="order-1 md:order-2 opacity-0">
            <BrowserMockup
              image={project.coverImage}
              url={project.liveUrl?.replace("https://", "") ?? project.slug + ".fr"}
              alt={`Screenshot de ${project.name}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
