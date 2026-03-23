"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { BlurReveal } from "@/components/animations/BlurReveal";

// Bento layout on 3 cols:
// ┌──────────┬──────────┬──────────┐
// │Compar-IA │Compar-IA │  Maison  │
// │  (2col   │  2row)   │  Enileh  │
// ├──────────┼──────────┼──────────┤
// │ Savistas │ Friend'iz│  Allo    │
// │          │          │  Restau  │
// ├──────────┼──────────┼──────────┤
// │          │          │  Golf    │
// └──────────┴──────────┴──────────┘
const projects = [
  {
    name: "Comparateur-IA-Facile",
    tag: "SaaS",
    services: ["Charte graphique", "Design UI", "Développement", "SEO"],
    images: [
      "/images/portfolio/comparateur-ia-1.webp",
      "/images/portfolio/comparateur-ia-2.webp",
      "/images/portfolio/comparateur-ia-3.webp",
    ],
    layout: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Maison Enileh",
    tag: "Site Vitrine",
    services: ["Charte graphique", "Design UI", "Développement", "SEO"],
    images: ["/images/portfolio/maison-enileh-1.webp"],
    layout: "md:col-span-1",
  },
  {
    name: "Savistas",
    tag: "SaaS + Landing",
    services: ["Charte graphique", "Design UI", "Développement", "Landing page"],
    images: ["/images/portfolio/savistas-1.webp"],
    layout: "md:col-span-1",
  },
  {
    name: "Friend'iz",
    tag: "E-commerce",
    services: ["Charte graphique", "Design UI", "Développement"],
    images: ["/images/portfolio/friendiz-1.webp"],
    layout: "md:col-span-1",
  },
  {
    name: "Allo Restau",
    tag: "Landing + SaaS",
    services: ["Charte graphique", "Design UI", "Développement", "SEO"],
    images: [
      "/images/portfolio/allo-restau-1.webp",
      "/images/portfolio/allo-restau-2.webp",
      "/images/portfolio/allo-restau-3.webp",
    ],
    layout: "md:col-span-1",
  },
  {
    name: "Golf Mentor",
    tag: "Site Vitrine + SaaS",
    services: ["Charte graphique", "Design UI", "Développement", "SEO"],
    images: ["/images/portfolio/golf-mentor-1.webp"],
    layout: "md:col-span-1",
  },
];

function ImageSlider({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const hasMultiple = images.length > 1;

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c + 1) % images.length);
    },
    [images.length]
  );

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrent((c) => (c - 1 + images.length) % images.length);
    },
    [images.length]
  );

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${name} — ${i + 1}`}
          fill
          className={`object-cover object-top transition-all duration-700 group-hover:scale-105 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ))}

      {hasMultiple && (
        <>
          {/* Nav arrows — visible on hover */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer hover:bg-background/80"
            aria-label="Image précédente"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer hover:bg-background/80"
            aria-label="Image suivante"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "bg-accent-primary w-4 shadow-[0_0_8px_rgba(201,100,66,0.5)]"
                    : "bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export function HomePortfolio() {
  return (
    <Section id="portfolio" theme="dark-alt-2" className="pt-32 pb-16 relative overflow-hidden section-divider-orange">
      {/* Subtle orange ambient glow */}
      <div className="absolute -top-20 right-1/4 w-[500px] h-[300px] bg-accent-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <TextReveal
            text="Nos dernières réalisations."
            elementType="h2"
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          />
        </div>

        <BlurReveal delay={0.25}>
          <div className="flex items-center gap-12 font-mono">
            <div className="flex flex-col items-start">
              <NumberMorph value={100} suffix="%" className="text-3xl font-bold text-foreground" />
              <span className="text-sm uppercase tracking-wider text-foreground-muted mt-1">
                Sur-mesure
              </span>
            </div>
            <div className="w-px h-10 bg-foreground/10" />
            <div className="flex flex-col items-start">
              <NumberMorph value={0} suffix=" template" className="text-3xl font-bold text-foreground" />
              <span className="text-sm uppercase tracking-wider text-foreground-muted mt-1">
                Utilisé
              </span>
            </div>
          </div>
        </BlurReveal>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 md:auto-rows-[240px]">
        {projects.map((proj, idx) => (
          <BlurReveal key={idx} delay={idx * 0.1} className={proj.layout}>
            <SpotlightCard className="w-full h-full p-6 flex flex-col justify-between group overflow-hidden relative cursor-pointer">
              {/* Tag badge */}
              <div className="flex justify-between items-start z-10 w-full transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-sm font-mono uppercase tracking-widest py-1.5 px-3.5 rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md">
                  {proj.tag}
                </span>
              </div>

              {/* Images with slider */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[inherit]">
                <ImageSlider images={proj.images} name={proj.name} />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-foreground/[0.03] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Bottom: project name + services */}
              <div className="z-10 transition-transform duration-500 group-hover:translate-x-1 [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
                <div className="flex items-end justify-between mb-2">
                  <h3 className="text-lg md:text-xl font-bold leading-snug text-white">{proj.name}</h3>
                  <span className="text-accent-primary text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Découvrir&nbsp;→
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {proj.services.map((service) => (
                    <span
                      key={service}
                      className="text-sm font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </BlurReveal>
        ))}
      </div>
    </Section>
  );
}
