"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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
    slug: "comparateur-ia-facile",
    name: "Comparateur-IA-Facile",
    tag: "SaaS",
    duration: "2 semaines",
    services: ["Charte graphique", "Design UI", "Développement", "SEO"],
    images: [
      "/images/portfolio/comparateur-ia-1.webp",
      "/images/portfolio/comparateur-ia-2.webp",
      "/images/portfolio/comparateur-ia-3.webp",
    ],
    layout: "md:col-span-2 md:row-span-2",
  },
  {
    slug: "maison-enileh",
    name: "Maison Enileh",
    tag: "Site Vitrine",
    duration: "48h",
    services: ["Charte graphique", "Design UI", "Développement", "SEO"],
    images: ["/images/portfolio/maison-enileh-1.webp"],
    layout: "md:col-span-1",
  },
  {
    slug: "savistas",
    name: "Savistas",
    tag: "SaaS + Landing",
    duration: "72h",
    services: ["Charte graphique", "Design UI", "Développement", "Landing page"],
    images: ["/images/portfolio/savistas-1.webp"],
    layout: "md:col-span-1",
  },
  {
    slug: "friendiz",
    name: "Friend'iz",
    tag: "E-commerce",
    duration: "2 semaines",
    services: ["Charte graphique", "Design UI", "Développement"],
    images: ["/images/portfolio/friendiz-1.webp"],
    layout: "md:col-span-1",
  },
  {
    slug: "allo-restau",
    name: "Allo Restau",
    tag: "Landing + SaaS",
    duration: "72h",
    services: ["Charte graphique", "Design UI", "Développement", "SEO"],
    images: [
      "/images/portfolio/allo-restau-1.webp",
      "/images/portfolio/allo-restau-2.webp",
      "/images/portfolio/allo-restau-3.webp",
    ],
    layout: "md:col-span-1",
  },
  {
    slug: "golf-mentor",
    name: "Golf Mentor",
    tag: "Site Vitrine + SaaS",
    duration: "48h",
    services: ["Charte graphique", "Design UI", "Développement", "SEO"],
    images: ["/images/portfolio/golf-mentor-1.webp"],
    layout: "md:col-span-1",
  },
];

function PhoneMockup({ image, name, large = false }: { image: string; name: string; large?: boolean }) {
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none translate-x-[30%] scale-95 opacity-0 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hidden md:block">
      <div className={`relative rounded-[24px] border-[3px] border-foreground/20 bg-background/80 backdrop-blur-sm shadow-2xl shadow-foreground/[0.08] overflow-hidden ${large ? "w-[150px] h-[310px]" : "w-[90px] h-[185px]"}`}>
        {/* Notch / Dynamic Island */}
        <div className={`absolute left-1/2 -translate-x-1/2 bg-foreground rounded-full z-10 ${large ? "top-[10px] w-[45px] h-[14px]" : "top-[6px] w-[30px] h-[10px]"}`} />
        {/* Screen content */}
        <div className={`absolute overflow-hidden ${large ? "inset-[4px] rounded-[20px]" : "inset-[3px] rounded-[16px]"}`}>
          <Image
            src={image}
            alt={`${name} — mobile`}
            fill
            className="object-cover object-top"
            sizes={large ? "150px" : "90px"}
          />
        </div>
        {/* Home indicator */}
        <div className={`absolute left-1/2 -translate-x-1/2 bg-foreground/30 rounded-full z-10 ${large ? "bottom-[7px] w-[40px] h-[4px]" : "bottom-[5px] w-[28px] h-[3px]"}`} />
      </div>
    </div>
  );
}

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
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer hover:bg-background/80"
            aria-label="Image précédente"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer hover:bg-background/80"
            aria-label="Image suivante"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-40 flex gap-1.5 pointer-events-auto">
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
      {/* Dot pattern background — rendered at section level via portal-like absolute positioning */}
      <div className="absolute inset-0 -mx-6 md:-mx-12 pointer-events-none" style={{ opacity: "var(--dot-pattern-opacity, 0.12)", backgroundImage: "radial-gradient(circle, var(--text-primary) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      {/* Subtle orange ambient glow */}
      <div className="absolute -top-20 right-1/4 w-[500px] h-[300px] bg-accent-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <TextReveal
            text="Nos dernières réalisations."
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-4"
          />
        </div>

        <BlurReveal delay={0.25}>
          <div className="flex items-center gap-6 md:gap-12 font-mono">
            <div className="flex flex-col items-start">
              <NumberMorph value={100} suffix="%" className="text-3xl font-bold text-foreground" />
              <span className="text-sm uppercase tracking-wider text-foreground/50 mt-1">
                Sur-mesure
              </span>
            </div>
            <div className="w-px h-10 bg-foreground/10" />
            <div className="flex flex-col items-start">
              <NumberMorph value={0} suffix=" template" className="text-3xl font-bold text-foreground" />
              <span className="text-sm uppercase tracking-wider text-foreground/50 mt-1">
                Utilisé
              </span>
            </div>
          </div>
        </BlurReveal>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[260px] md:auto-rows-[240px]">
        {projects.map((proj, idx) => (
          <BlurReveal key={idx} delay={idx * 0.1} className={proj.layout}>
            <Link href={`/realisations/${proj.slug}`} className="block w-full h-full">
            <SpotlightCard className="w-full h-full p-5 md:p-6 flex flex-col justify-between group overflow-hidden relative cursor-pointer" data-cursor="click">
              {/* Tag badge + duration */}
              <div className="flex justify-between items-start z-10 w-full transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-sm font-mono uppercase tracking-widest py-1.5 px-3.5 rounded-full border border-foreground/10 bg-background/50 text-foreground/90 backdrop-blur-md">
                  {proj.tag}
                </span>
                <span className="text-sm font-mono py-1.5 px-3.5 rounded-full border border-foreground/10 bg-foreground/10 text-foreground/90 backdrop-blur-md">
                  {proj.duration}
                </span>
              </div>

              {/* Images with slider */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[inherit]">
                <ImageSlider images={proj.images} name={proj.name} />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-foreground/[0.03] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Top gradient fade — legibility for badges on mobile */}
              <div className="absolute inset-x-0 top-0 h-24 md:h-16 bg-gradient-to-b from-background/70 to-transparent z-[1] pointer-events-none rounded-t-[inherit]" />

              {/* Phone mockup — slides in from left on hover */}
              <PhoneMockup image={proj.images[0]} name={proj.name} large={proj.layout.includes("row-span-2")} />

              {/* Bottom gradient fade — stronger on mobile for text legibility */}
              <div className="absolute inset-x-0 bottom-0 h-36 md:h-28 bg-gradient-to-t from-background via-background/60 to-transparent z-[1] pointer-events-none rounded-b-[inherit]" />

              {/* Bottom: project name + services */}
              <div className="z-10 transition-transform duration-500 group-hover:translate-x-1 [text-shadow:_0_2px_12px_rgba(0,0,0,0.6)]">
                <div className="flex items-end justify-between mb-2">
                  <h3 className="text-lg md:text-xl font-bold leading-snug text-foreground">{proj.name}</h3>
                  <span className="text-accent-primary text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Découvrir&nbsp;→
                  </span>
                </div>
                {proj.name === "Comparateur-IA-Facile" && (
                  <div className="hidden md:flex flex-wrap gap-1.5">
                    {proj.services.map((service) => (
                      <span
                        key={service}
                        className="text-sm font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-foreground/15 bg-background/40 text-foreground/80 backdrop-blur-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </SpotlightCard>
            </Link>
          </BlurReveal>
        ))}
      </div>
    </Section>
  );
}
