"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { AuroraBackground } from "@/components/animations/AuroraBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SYLLABLES = [
  {
    letters: "AUR",
    label: "Or (Excellence)",
    gradient: "from-foreground via-[#e9e6dc] to-foreground",
    description: "Aurum · Aurora",
    glowColor: "rgba(218, 217, 212, 0.4)",
  },
  {
    letters: "ENT",
    label: "Entité (Croissance)",
    gradient: "from-accent-secondary via-accent-primary to-accent-secondary",
    description: "Ens · Entreprendre",
    glowColor: "rgba(201, 100, 66, 0.4)",
  },
  {
    letters: "IA",
    label: "Intelligence (IA)",
    gradient: "from-foreground via-[#dbd3f0] to-foreground",
    description: "Intelligence Artificielle",
    glowColor: "rgba(156, 135, 245, 0.4)",
  },
] as const;

export function HomeAurentiaName() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const ctx = containerRef.current;

      const syllables = ctx.querySelectorAll<HTMLElement>(".syllable-card");
      const plusSigns = ctx.querySelectorAll<HTMLElement>(".plus-sign");
      const labels = ctx.querySelectorAll<HTMLElement>(".syllable-label");
      const descriptions = ctx.querySelectorAll<HTMLElement>(".syllable-desc");
      const glows = ctx.querySelectorAll<HTMLElement>(".syllable-glow");
      const subtitle = ctx.querySelector<HTMLElement>(".name-subtitle");
      const tagline = ctx.querySelector<HTMLElement>(".name-tagline");
      const divider = ctx.querySelector<HTMLElement>(".name-divider");
      const flash = ctx.querySelector<HTMLElement>(".combine-flash");

      // Master timeline triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ctx,
          start: "top 65%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // ── Phase 1: Each syllable flies in with 3D rotation ──
      tl.fromTo(
        syllables,
        {
          y: 120,
          rotationX: -90,
          rotationY: 15,
          scale: 0.3,
          opacity: 0,
          z: -800,
          transformPerspective: 1200,
        },
        {
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          z: 0,
          stagger: 0.25,
          duration: 1.4,
          ease: "expo.out",
        }
      );

      // Plus signs fade in between syllables
      tl.fromTo(
        plusSigns,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(2)",
        },
        "-=0.8"
      );

      // Labels slide up under each syllable
      tl.fromTo(
        labels,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Descriptions fade in
      tl.fromTo(
        descriptions,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // ── Phase 2: Glows pulse once per syllable ──
      tl.fromTo(
        glows,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1.2,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );

      tl.to(glows, {
        scale: 1,
        opacity: 0.6,
        duration: 0.4,
        ease: "power2.in",
      });

      // ── Phase 3: Luminous flash when they "combine" ──
      tl.to(
        flash,
        {
          opacity: 1,
          duration: 0.15,
          ease: "power4.in",
        },
        "+=0.2"
      );

      tl.to(flash, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Divider expands
      tl.fromTo(
        divider,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // ── Phase 4: Subtitle and tagline reveal ──
      tl.fromTo(
        subtitle,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );

      tl.fromTo(
        tagline,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // ── Infinite: Gradient position cycling on all gradient texts ──
      const gradientEls = ctx.querySelectorAll<HTMLElement>(".aur-grad");
      gsap.to(gradientEls, {
        backgroundPosition: "200% center",
        duration: 6,
        repeat: -1,
        ease: "linear",
      });

      // ── Infinite: Subtle float on syllable cards ──
      syllables.forEach((card, i) => {
        gsap.to(card, {
          y: "+=8",
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });

      // ── Infinite: Glow pulse ──
      glows.forEach((glow, i) => {
        gsap.to(glow, {
          opacity: 0.8,
          scale: 1.15,
          duration: 2 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.7,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <Section
      ref={containerRef}
      theme="dark"
      className="relative !py-32 md:!py-48 flex items-center justify-center overflow-hidden border-y border-foreground/5 z-10"
    >
      <AuroraBackground intensity="light" />

      {/* Luminous flash overlay — fires when syllables combine */}
      <div
        className="combine-flash pointer-events-none absolute inset-0 z-20 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(176,87,48,0.35) 0%, rgba(201,100,66,0.15) 40%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 w-full text-center"
        style={{ perspective: "1200px" }}
      >
        {/* ── Syllable decomposition ── */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-2 lg:gap-4">
          {SYLLABLES.map((syl, i) => (
            <div key={syl.letters} className="contents">
              {/* Plus sign between syllables (desktop only) */}
              {i > 0 && (
                <span className="plus-sign hidden md:flex items-center text-4xl md:text-5xl lg:text-6xl font-extralight text-accent-secondary/60 select-none mx-2 lg:mx-4">
                  +
                </span>
              )}

              {/* Syllable card */}
              <div className="syllable-card relative flex flex-col items-center will-change-transform">
                {/* Background glow per syllable */}
                <div
                  className="syllable-glow pointer-events-none absolute -inset-8 md:-inset-16 rounded-full blur-3xl opacity-0"
                  style={{ background: syl.glowColor }}
                />

                {/* Main letters */}
                <span
                  className={`aur-grad relative bg-gradient-to-r ${syl.gradient} bg-clip-text text-transparent bg-[length:200%_auto] text-6xl md:text-[8rem] lg:text-[12rem] font-black tracking-tighter leading-none select-none`}
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  {syl.letters}
                </span>

                {/* Label */}
                <span className="syllable-label mt-3 md:mt-5 text-sm md:text-sm font-mono tracking-[0.25em] uppercase text-foreground/50">
                  {syl.label}
                </span>

                {/* Latin description */}
                <span className="syllable-desc mt-1 text-sm font-light italic tracking-wide text-foreground/30">
                  {syl.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="name-divider mx-auto mt-16 md:mt-24 h-px w-32 md:w-64 origin-center bg-gradient-to-r from-transparent via-accent-secondary/50 to-transparent" />

        {/* ── Subtitle ── */}
        <p className="name-subtitle mt-10 md:mt-14 text-lg md:text-2xl lg:text-3xl font-light text-foreground/70 leading-relaxed max-w-3xl mx-auto">
          L&apos;aube dor&eacute;e de l&apos;entreprise, propuls&eacute;e par
          l&apos;Intelligence Artificielle.
        </p>

        {/* ── Tagline — oversize gradient ── */}
        <p className="name-tagline mt-8 md:mt-12">
          <span className="aur-grad inline-block bg-gradient-to-r from-accent-secondary via-accent-primary to-accent-secondary bg-clip-text text-transparent bg-[length:200%_auto] text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            Du potentiel &agrave; la lumi&egrave;re.
          </span>
        </p>
      </div>
    </Section>
  );
}
