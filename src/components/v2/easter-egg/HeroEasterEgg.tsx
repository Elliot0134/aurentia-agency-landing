"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SecretSlotMachine3D, type ShowcaseItem } from "./SecretSlotMachine3D";
import type { Prize } from "./easterEggData";
import { TextReveal } from "@/components/animations/TextReveal";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   Easter-egg — two full-screen sections (no sticky/pin):
   1. "La curiosité paie toujours" title
   2. Roulette wheel + form
   ───────────────────────────────────────────── */

export interface HeroEasterEggProps {
  /** Override default prize pool (client-side display only). */
  prizes?: Prize[];
  /** Override default showcase cards shown below the machine. */
  showcase?: ShowcaseItem[];
  /** Override the prize-label → landing-page URL map. */
  prizeUrlMap?: Record<string, string | null>;
  /** Custom slot-machine headline. */
  title?: string;
  /** Custom slot-machine tagline. */
  tagline?: string;
}

export function HeroEasterEgg({
  prizes,
  showcase,
  prizeUrlMap,
  title,
  tagline,
}: HeroEasterEggProps = {}) {
  const wrapperRef = useRef<HTMLElement>(null);
  const titleSectionRef = useRef<HTMLDivElement>(null);
  const titleContentRef = useRef<HTMLDivElement>(null);
  const rouletteSectionRef = useRef<HTMLDivElement>(null);
  const rouletteContentRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const animationsEnabled = useAnimationsEnabled();

  const handleClose = useCallback(() => {
    const wrapperHeight = wrapperRef.current?.offsetHeight ?? 0;
    window.scrollTo({ top: wrapperHeight, behavior: "smooth" });
    setHasInteracted(true);
  }, []);

  // ── Section 1: Title fade-in ──
  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!titleSectionRef.current || !titleContentRef.current) return;

    gsap.fromTo(
      titleContentRef.current,
      { opacity: 0, scale: 0.92, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleSectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: true,
        },
      }
    );
  }, { scope: titleSectionRef, dependencies: [animationsEnabled] });

  // ── Section 2: Roulette fade-in ──
  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!rouletteSectionRef.current || !rouletteContentRef.current) return;

    gsap.fromTo(
      rouletteContentRef.current,
      { opacity: 0, scale: 0.9, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rouletteSectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: true,
        },
      }
    );
  }, { scope: rouletteSectionRef, dependencies: [animationsEnabled] });

  return (
    <section ref={wrapperRef} className="relative -mb-px" data-easter-egg>

      {/* ═══════════════════════════════════════
          SECTION 1 — Roulette wheel
          ═══════════════════════════════════════ */}
      <div ref={rouletteSectionRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute -inset-px z-0 pointer-events-none hero-grid" style={{ opacity: 0.1 }} />

        <div ref={rouletteContentRef} className="relative z-10 w-full">
          {hasInteracted ? (
            <div className="text-center text-foreground-dim">
              <p className="text-sm font-mono tracking-wider">
                Easter egg d&eacute;j&agrave; d&eacute;couvert
              </p>
              <button
                onClick={handleClose}
                className="mt-4 text-sm text-foreground-muted hover:text-foreground transition-colors underline underline-offset-4"
              >
                Retour au site &darr;
              </button>
            </div>
          ) : (
            <div className="w-full">
              <SecretSlotMachine3D
                onClose={handleClose}
                prizes={prizes}
                showcase={showcase}
                prizeUrlMap={prizeUrlMap}
                title={title}
                tagline={tagline}
              />
            </div>
          )}
        </div>

        {/* Down arrow */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button
            onClick={handleClose}
            className="w-6 h-10 rounded-full border-2 border-foreground-dim/30 flex items-start justify-center p-1.5 hover:border-foreground-muted transition-colors"
            aria-label="Retour au site"
          >
            <div className="w-1 h-2.5 rounded-full bg-foreground-dim/30 animate-scroll-dot" />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          SECTION 2 — "La curiosité paie toujours"
          ═══════════════════════════════════════ */}
      <div ref={titleSectionRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute -inset-px z-0 pointer-events-none hero-grid" style={{ opacity: 0.1 }} />

        <div ref={titleContentRef} className="relative z-10 w-full text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.06] backdrop-blur-xl border border-foreground/[0.1] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
            <span className="text-sm font-mono tracking-[0.15em] uppercase text-accent-primary">
              Easter egg
            </span>
          </div>

          <div className="space-y-0">
            <TextReveal
              elementType="h2"
              className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-foreground leading-[1.05] justify-center"
            >
              La curiosité
            </TextReveal>
            <TextReveal
              elementType="h2"
              className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-foreground leading-[1.05] justify-center"
              delay={0.15}
            >
              paie{" "}
              <span className="text-accent-primary relative">
                toujours
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent-primary/30 rounded-full" />
              </span>.
            </TextReveal>
          </div>

          <p className="text-base sm:text-lg text-foreground-muted max-w-lg mx-auto leading-relaxed mt-6">
            Tu as scroll&eacute; l&agrave; o&ugrave; personne ne regarde.
            C&rsquo;est exactement ce qui fait un bon entrepreneur.{" "}
            <strong className="text-foreground">On te r&eacute;compense.</strong>
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-foreground-dim/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 rounded-full bg-foreground-dim/30 animate-scroll-dot" />
          </div>
        </div>
      </div>

    </section>
  );
}
