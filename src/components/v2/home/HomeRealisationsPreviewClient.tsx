"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";

// Layout classes picked by index — preserves the V1 bento layout (hero + 5 small).
const LAYOUTS = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
] as const;

function PhoneMockup({ image, name, large = false }: { image: string; name: string; large?: boolean }) {
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none translate-x-[30%] scale-95 opacity-0 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hidden md:block">
      <div className={`relative rounded-[24px] border-[3px] border-foreground/20 bg-background/80 backdrop-blur-sm shadow-2xl shadow-foreground/[0.08] overflow-hidden ${large ? "w-[130px] h-[270px]" : "w-[78px] h-[160px]"}`}>
        <div className={`absolute left-1/2 -translate-x-1/2 bg-foreground rounded-full z-10 ${large ? "top-[9px] w-[40px] h-[12px]" : "top-[5px] w-[26px] h-[8px]"}`} />
        <div className={`absolute overflow-hidden ${large ? "inset-[4px] rounded-[20px]" : "inset-[3px] rounded-[16px]"}`}>
          <Image
            src={image}
            alt={`${name} — mobile`}
            fill
            className="object-cover object-top"
            sizes={large ? "130px" : "78px"}
          />
        </div>
        <div className={`absolute left-1/2 -translate-x-1/2 bg-foreground/30 rounded-full z-10 ${large ? "bottom-[6px] w-[36px] h-[3px]" : "bottom-[4px] w-[24px] h-[2px]"}`} />
      </div>
    </div>
  );
}

type CardProject = {
  slug: string;
  name: string;
  type: string;
  duration: string;
  tags: string[];
  images: string[];
  layout: string;
};

function ProjectCard({ proj }: { proj: CardProject }) {
  const [current, setCurrent] = useState(0);
  const hasMultiple = proj.images.length > 1;

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrent((c) => (c + 1) % proj.images.length);
    },
    [proj.images.length]
  );

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrent((c) => (c - 1 + proj.images.length) % proj.images.length);
    },
    [proj.images.length]
  );

  const isLarge = proj.layout.includes("row-span-2");

  return (
    <Link href={`/realisations/${proj.slug}`} className="block w-full h-full">
      <SpotlightCard className="w-full h-full p-4 md:p-5 flex flex-col justify-between group overflow-hidden relative cursor-pointer" data-cursor="click">
        {/* Images (background) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[inherit]">
          {proj.images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${proj.name} — ${i + 1}`}
              fill
              className={`object-cover object-top transition-all duration-700 group-hover:scale-105 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ))}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-foreground/[0.04] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Top gradient */}
        <div className="absolute inset-x-0 top-0 h-20 md:h-14 bg-gradient-to-b from-foreground/30 to-transparent z-[1] pointer-events-none rounded-t-[inherit]" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-28 md:h-24 bg-gradient-to-t from-foreground/55 via-foreground/20 to-transparent z-[1] pointer-events-none rounded-b-[inherit]" />

        {/* Tag + duration */}
        <div className="flex justify-between items-start z-10 w-full transition-transform duration-500 group-hover:-translate-y-1">
          <span className="text-sm font-mono uppercase tracking-widest py-1 px-3 rounded-full border border-foreground/20 bg-background/55 text-foreground backdrop-blur-md">
            {proj.type}
          </span>
          <span className="text-sm font-mono py-1 px-3 rounded-full border border-foreground/20 bg-background/45 text-foreground backdrop-blur-md">
            {proj.duration}
          </span>
        </div>

        <PhoneMockup image={proj.images[0]} name={proj.name} large={isLarge} />

        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/20 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer hover:bg-background/85"
              aria-label="Image précédente"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/20 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer hover:bg-background/85"
              aria-label="Image suivante"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-1.5">
              {proj.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    i === current
                      ? "bg-accent-primary w-4 shadow-[0_0_8px_rgba(201,100,66,0.5)]"
                      : "bg-background/60 w-1.5 hover:bg-background/90"
                  }`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Name + tags */}
        <div className="z-10 transition-transform duration-500 group-hover:translate-x-1">
          <div className="flex items-end justify-between mb-2">
            <h3 className="text-base md:text-lg font-bold leading-snug text-background">{proj.name}</h3>
            <span className="text-accent-primary text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
              Découvrir&nbsp;→
            </span>
          </div>
          {isLarge && proj.tags.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-1.5">
              {proj.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-foreground/20 bg-background/55 text-foreground backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </SpotlightCard>
    </Link>
  );
}

export function HomeRealisationsPreviewClient({
  projects,
}: {
  projects: ProjectFrontmatter[];
}) {
  // Show max 6, preserving the featured-first ordering already done by loader.
  const cards: CardProject[] = projects.slice(0, 6).map((p, i) => ({
    slug: p.slug,
    name: p.name,
    type: p.type,
    duration: p.duration,
    tags: p.tags ?? [],
    images: p.images && p.images.length > 0 ? p.images : [p.coverImage],
    layout: LAYOUTS[i] ?? "md:col-span-1",
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[195px] md:auto-rows-[215px]">
      {cards.map((proj, idx) => (
        <BlurReveal key={proj.slug} delay={idx * 0.1} className={proj.layout}>
          <ProjectCard proj={proj} />
        </BlurReveal>
      ))}
    </div>
  );
}
