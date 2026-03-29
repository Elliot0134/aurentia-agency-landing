"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { SafeImage } from "@/components/ui/SafeImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectNavigationProps {
  prevProject: Project;
  nextProject: Project;
}

export function ProjectNavigation({
  prevProject,
  nextProject,
}: ProjectNavigationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll("[data-nav-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, filter: "blur(8px)", y: 20 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef, dependencies: [animationsEnabled] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Previous project */}
          <Link
            href={`/realisations/${prevProject.slug}`}
            data-nav-card
            className="group relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden border border-foreground/5 transition-all duration-700 hover:scale-[1.03] hover:shadow-lg hover:shadow-accent-primary/10 opacity-0"
          >
            {/* Background image — visible */}
            <SafeImage
              src={prevProject.coverImage}
              alt={prevProject.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/60 transition-all duration-700 group-hover:bg-background/50" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <span className="text-sm text-foreground/40 mb-2">
                Projet precedent
              </span>
              <div className="flex items-center gap-3">
                <ArrowLeft className="w-5 h-5 text-foreground/60 transition-transform duration-500 group-hover:-translate-x-1" />
                <span className="text-xl md:text-2xl font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-500">
                  {prevProject.name}
                </span>
              </div>
            </div>
          </Link>

          {/* Next project */}
          <Link
            href={`/realisations/${nextProject.slug}`}
            data-nav-card
            className="group relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden border border-foreground/5 transition-all duration-700 hover:scale-[1.03] hover:shadow-lg hover:shadow-accent-primary/10 opacity-0"
          >
            {/* Background image — visible */}
            <SafeImage
              src={nextProject.coverImage}
              alt={nextProject.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/60 transition-all duration-700 group-hover:bg-background/50" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 items-end text-right">
              <span className="text-sm text-foreground/40 mb-2">
                Projet suivant
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-500">
                  {nextProject.name}
                </span>
                <ArrowRight className="w-5 h-5 text-foreground/60 transition-transform duration-500 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
