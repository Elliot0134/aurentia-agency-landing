"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import {
  portfolioContent,
  portfolioItems,
} from "@/data/sites-vitrines-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ImageSlider({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [current, setCurrent] = useState(0);
  const [hasError, setHasError] = useState<Record<number, boolean>>({});
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

  // Check if current image has error — show gradient placeholder instead
  const allErrors = images.every((_, i) => hasError[i]);

  if (allErrors) {
    return <GradientPlaceholder className="absolute inset-0" label={name} />;
  }

  return (
    <>
      {images.map((src, i) =>
        hasError[i] ? null : (
          <Image
            key={src}
            src={src}
            alt={`${name} — ${i + 1}`}
            fill
            className={`object-cover object-top transition-all duration-700 group-hover:scale-105 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setHasError((prev) => ({ ...prev, [i]: true }))}
          />
        )
      )}

      {hasMultiple && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-auto cursor-pointer hover:bg-background/80"
            aria-label="Image pr&eacute;c&eacute;dente"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-auto cursor-pointer hover:bg-background/80"
            aria-label="Image suivante"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-40 flex gap-1.5 pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
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

export function SitesVitrinesPortfolio() {
  const gridRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".portfolio-card");
      gsap.fromTo(
        cards,
        { rotateX: 3, rotateY: -2 },
        {
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: gridRef, dependencies: [animationsEnabled] }
  );

  return (
    <Section theme="dark-alt-2" className="section-divider-orange">
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[10%] right-[20%]", size: "w-[400px] h-[300px]", opacity: "[0.04]" },
        ]}
      />

      {/* Dot pattern background */}
      <div
        className="absolute inset-0 -mx-6 md:-mx-12 pointer-events-none"
        style={{
          opacity: "var(--dot-pattern-opacity, 0.12)",
          backgroundImage:
            "radial-gradient(circle, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-12 md:mb-16">
        <BlurReveal>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10 mb-6">
            {portfolioContent.badge}
          </span>
        </BlurReveal>

        <TextReveal
          text={portfolioContent.title}
          elementType="h2"
          className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
        />

        <BlurReveal className="mt-4" delay={0.15}>
          <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
            {portfolioContent.subtitle}
          </p>
        </BlurReveal>
      </div>

      {/* Counter */}
      <BlurReveal delay={0.25}>
        <div className="relative z-10 flex items-center justify-center gap-3 mb-10 md:mb-14 font-mono">
          <NumberMorph
            value={portfolioContent.counter}
            suffix="+"
            className="text-3xl font-bold text-foreground"
          />
          <span className="text-sm uppercase tracking-wider text-foreground/50">
            {portfolioContent.counterLabel}
          </span>
        </div>
      </BlurReveal>

      {/* Grid */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
        style={{ perspective: "1000px" }}
      >
        {portfolioItems.map((item, idx) => (
          <BlurReveal key={idx} delay={idx * 0.2}>
            <SpotlightCard className="portfolio-card w-full h-[280px] md:h-[320px] p-6 flex flex-col justify-between group overflow-hidden relative cursor-pointer">
              {/* Tag badge + duration */}
              <div className="flex justify-between items-start z-10 w-full transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-sm font-mono uppercase tracking-widest py-1.5 px-3.5 rounded-full border border-foreground/10 bg-background/50 text-foreground/90 backdrop-blur-md">
                  {item.tag}
                </span>
                <span className="text-sm font-mono py-1.5 px-3.5 rounded-full border border-foreground/10 bg-foreground/10 text-foreground/90 backdrop-blur-md">
                  {item.duration}
                </span>
              </div>

              {/* Images */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[inherit]">
                <ImageSlider images={item.images} name={item.clientName} />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-foreground/[0.03] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-[1] pointer-events-none rounded-b-[inherit]" />

              {/* Bottom info */}
              <div className="z-10 transition-transform duration-500 group-hover:translate-x-1">
                <div className="flex items-end justify-between mb-1">
                  <h3 className="text-lg md:text-xl font-bold leading-snug text-foreground">
                    {item.clientName}
                  </h3>
                  <span className="text-accent-primary text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    D&eacute;couvrir&nbsp;&rarr;
                  </span>
                </div>
                <span className="text-sm text-foreground/50">
                  {item.niche}
                </span>
              </div>
            </SpotlightCard>
          </BlurReveal>
        ))}
      </div>

      {/* Link to all */}
      <BlurReveal delay={0.4}>
        <div className="relative z-10 text-center mt-10 md:mt-14">
          <Link
            href={portfolioContent.link}
            className="inline-block text-sm font-semibold text-foreground/40 transition-colors duration-500 hover:text-foreground/70"
          >
            {portfolioContent.linkText}
          </Link>
        </div>
      </BlurReveal>
    </Section>
  );
}
