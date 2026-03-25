"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { saasProjects } from "@/data/saas-content";
import type { SaasProject } from "@/data/saas-content";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   PROJECT CARD — image carousel with arrows inside
   ═══════════════════════════════════════════════════════ */

function ProjectCard({ project }: { project: SaasProject }) {
  const [currentImg, setCurrentImg] = useState(0);
  const hasMultiple = project.screenshots.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((i) => (i === 0 ? project.screenshots.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((i) => (i === project.screenshots.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="w-[380px] md:w-[420px] shrink-0 group/project">
      <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.04] backdrop-blur-xl overflow-hidden h-full flex flex-col transition-[border-color,background-color] duration-700 hover:border-foreground/20 hover:bg-foreground/[0.08]">
        {/* Screenshot carousel */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.screenshots.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${project.title} – ${i + 1}`}
              fill
              className="object-cover transition-opacity duration-500"
              style={{ opacity: i === currentImg ? 1 : 0 }}
              sizes="420px"
            />
          ))}

          {/* Arrows — only if multiple images */}
          {hasMultiple && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-foreground/70 text-background flex items-center justify-center opacity-0 group-hover/project:opacity-100 transition-opacity duration-500 hover:bg-foreground cursor-pointer z-10"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-foreground/70 text-background flex items-center justify-center opacity-0 group-hover/project:opacity-100 transition-opacity duration-500 hover:bg-foreground cursor-pointer z-10"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {project.screenshots.map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: "var(--color-foreground)",
                      opacity: i === currentImg ? 0.9 : 0.3,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3 className="text-lg md:text-xl font-bold text-foreground group-hover/project:text-accent-secondary transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-mono rounded-full border border-foreground/10 bg-foreground/5 text-foreground/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA — bottom right */}
          {project.link && (
            <div className="flex justify-end mt-2">
              <a
                href={project.link}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold transition-all duration-500 hover:opacity-90 group/link"
              >
                Voir en détail
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/link:translate-x-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN — JS-driven auto-scroll + manual arrows
   ═══════════════════════════════════════════════════════ */

const SPEED = 0.6;

export function LandingPagesExemples() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollPos = useRef(0);
  const animRef = useRef<number>(0);

  const filteredProjects = saasProjects.filter((p) => p.title !== "Aurentia SaaS");
  const duplicatedProjects = [...filteredProjects, ...filteredProjects];
  const halfWidth = useRef(0);

  useEffect(() => {
    if (!wrapperRef.current) return;
    halfWidth.current = wrapperRef.current.scrollWidth / 2;
  }, []);

  useEffect(() => {
    if (isHovered || !wrapperRef.current) return;

    const el = wrapperRef.current;
    const tick = () => {
      scrollPos.current += SPEED;
      if (halfWidth.current > 0 && scrollPos.current >= halfWidth.current) {
        scrollPos.current -= halfWidth.current;
      }
      el.style.transform = `translate3d(${-scrollPos.current}px, 0, 0)`;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered]);

  return (
    <Section id="exemples" className="py-28 md:py-36 relative">
      <SectionBackground variant="base" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 container mx-auto px-6 md:px-12">
          <BlurReveal className="mb-4">
            <span className="inline-block px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-medium tracking-widest text-foreground/70">
              RÉALISATIONS
            </span>
          </BlurReveal>

          <TextReveal
            text="Des pages qui marquent les esprits."
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground justify-center"
          />
        </div>

        {/* Marquee container */}
        <div
          className="w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={wrapperRef}
            className="flex gap-6 w-max"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {duplicatedProjects.map((project, i) => (
              <ProjectCard
                key={`${project.title}-${i}`}
                project={project}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
