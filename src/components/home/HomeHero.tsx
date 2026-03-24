"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { InfiniteMarquee } from "@/components/animations/InfiniteMarquee";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Mouse parallax config
const MAX_MOVE = 10;
const MAX_TILT = 12;

const DEPTH = {
  badge: 1.0,
  titleL1: 1.5,
  titleL2: 3.2,
  subtitle: 0.5,
  tags: 0.7,
  cta: 4.0,
} as const;

// Scroll parallax config — reduced for smoother exit
const SCROLL_SPEED = {
  badge: -25,
  titleL1: -50,
  titleL2: -110,
  subtitle: -80,
  tags: -95,
  cta: -130,
} as const;

const SYLLABLES = [
  {
    letters: "Aur",
    title: "Aurora — L'Aube",
    desc: "Du latin Aurora, l'aube. Un nouveau départ lumineux pour chaque projet, chaque ambition.",
  },
  {
    letters: "ent",
    title: "ent — Entreprendre",
    desc: "Au cœur du nom, les trois lettres de ceux qui bâtissent. Entreprise. Entrepreneur. Entreprendre. On construit avec ceux qui osent.",
  },
  {
    letters: "ia",
    title: "IA — Intelligence Artificielle",
    desc: "Le catalyseur. L'IA ne remplace pas l'expertise — elle la démultiplie. Chaque ambition, amplifiée.",
  },
] as const;

type LayerKey = keyof typeof DEPTH;

// Base scroll distance for animations (pixels)
const BASE_PIN = 2500;

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // Outer refs — GSAP scroll controls these (yPercent)
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleL1Ref = useRef<HTMLDivElement>(null);
  const titleL2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const aurentiaRef = useRef<HTMLDivElement>(null);
  const syl0 = useRef<HTMLSpanElement>(null);
  const syl1 = useRef<HTMLSpanElement>(null);
  const syl2 = useRef<HTMLSpanElement>(null);
  const desc0 = useRef<HTMLDivElement>(null);
  const desc1 = useRef<HTMLDivElement>(null);
  const desc2 = useRef<HTMLDivElement>(null);
  // Inner refs — raw DOM style controls these (x, rotateY, rotateX)
  // These are the .mouse-layer divs inside each layer
  const mouseLayersRef = useRef<Map<LayerKey, HTMLDivElement>>(new Map());
  const setMouseLayer = useCallback((key: LayerKey) => (el: HTMLDivElement | null) => {
    if (el) mouseLayersRef.current.set(key, el);
    else mouseLayersRef.current.delete(key);
  }, []);

  // ---------------------------------------------------------------------------
  // Mouse 3D parallax — uses raw DOM style, ZERO GSAP involvement
  // ---------------------------------------------------------------------------
  const mouseTarget = useRef({ nx: 0, ny: 0 });
  const mouseCurrent = useRef({ nx: 0, ny: 0 });
  const isInside = useRef(false);
  const rafId = useRef<number>(0);
  const loopRunning = useRef(false);

  const applyParallax = useCallback((nx: number, ny: number) => {
    mouseLayersRef.current.forEach((el, key) => {
      const depth = DEPTH[key];
      const factor = depth / 4;
      const tx = -nx * MAX_MOVE * depth;
      const ty = -ny * MAX_MOVE * depth * 0.6;
      const ry = nx * MAX_TILT * factor;
      const rx = -ny * MAX_TILT * factor;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateY(${ry}deg) rotateX(${rx}deg)`;
    });
  }, []);

  const startLoop = useCallback(() => {
    if (loopRunning.current) return;
    loopRunning.current = true;
    const LERP_SPEED = 0.07;
    const tick = () => {
      const cur = mouseCurrent.current;
      const tgt = mouseTarget.current;
      cur.nx += (tgt.nx - cur.nx) * LERP_SPEED;
      cur.ny += (tgt.ny - cur.ny) * LERP_SPEED;
      applyParallax(cur.nx, cur.ny);
      if (!isInside.current) {
        const dist = Math.abs(cur.nx) + Math.abs(cur.ny);
        if (dist < 0.001) {
          applyParallax(0, 0);
          loopRunning.current = false;
          return;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  }, [applyParallax]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!pinRef.current) return;
    const rect = pinRef.current.getBoundingClientRect();
    mouseTarget.current.nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    mouseTarget.current.ny = (e.clientY - rect.top) / rect.height * 2 - 1;
  }, []);

  const handleMouseEnter = useCallback(() => {
    isInside.current = true;
    startLoop();
  }, [startLoop]);

  const handleMouseLeave = useCallback(() => {
    isInside.current = false;
    mouseTarget.current = { nx: 0, ny: 0 };
  }, []);

  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // ---------------------------------------------------------------------------
  // Scroll animations — single master timeline with GSAP pin (no CSS sticky)
  // ---------------------------------------------------------------------------
  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current || !aurentiaRef.current) return;

    const syls = [syl0.current, syl1.current, syl2.current];
    const descs = [desc0.current, desc1.current, desc2.current];

    // Extra pin distance to allow buffer after "ia" + overlap for parallax
    // Preserves original animation speed (2.14px per timeline unit)
    const EXTRA = 100;
    const pinDistance = BASE_PIN + EXTRA;
    const holdUnits = (EXTRA / BASE_PIN) * 1400; // proportional hold to keep speed

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${pinDistance}`,
        pin: true,
        pinType: "transform",
        scrub: true,
        pinSpacing: true,
      },
    });

    // Hold — keeps Aurentia visible during the extra scroll after animations
    master.to({}, { duration: holdUnits }, 1400);

    // === PHASE 1 (0 → 400): Hero content s'en va — très lent et progressif ===
    // Each layer gets its own opacity + blur for a cascading reverse effect
    [
      { ref: badgeRef, yPercent: SCROLL_SPEED.badge, fadeStart: 80 },
      { ref: titleL1Ref, yPercent: SCROLL_SPEED.titleL1, fadeStart: 0 },
      { ref: titleL2Ref, yPercent: SCROLL_SPEED.titleL2, fadeStart: 30 },
      { ref: subtitleRef, yPercent: SCROLL_SPEED.subtitle, fadeStart: 60 },
      { ref: tagsRef, yPercent: SCROLL_SPEED.tags, fadeStart: 100 },
      { ref: ctaRef, yPercent: SCROLL_SPEED.cta, fadeStart: 50 },
    ].forEach(({ ref, yPercent, fadeStart }) => {
      if (!ref.current) return;
      master.to(ref.current, { yPercent, ease: "none", duration: 400 }, 0);
      master.to(ref.current, {
        opacity: 0, filter: "blur(6px)", ease: "none", duration: 200,
      }, fadeStart);
    });

    master.to(contentRef.current, {
      y: "-80vh", z: -800, rotateX: 20,
      ease: "none", duration: 400,
    }, 0);

    // Grid — subtle background drift across full animation
    if (gridRef.current) {
      master.to(gridRef.current, { y: -30, ease: "none", duration: 1400 }, 0);
    }

    // === PHASE 2 (80 → 350): "Aurentia" arrive presque en même temps ===
    master.fromTo(
      aurentiaRef.current,
      { yPercent: 50, scale: 0.1, opacity: 0 },
      { yPercent: 0, scale: 1, opacity: 1, ease: "none", duration: 270 },
      80,
    );

    // === PHASE 3: Syllabes s'éclairent une par une (lent, mou) ===
    syls.forEach(s => { if (s) gsap.set(s, { opacity: 0.3 }); });
    descs.forEach(d => { if (d) gsap.set(d, { opacity: 0, y: 20 }); });

    // "Aur" : 420 → 680
    if (syls[0] && descs[0]) {
      const span = 260;
      const tl0 = gsap.timeline();
      tl0.fromTo(syls[0], { opacity: 0.2, scale: 1 }, { opacity: 1, scale: 1.12, duration: span * 0.25, ease: "none" });
      tl0.fromTo(descs[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: span * 0.2, ease: "none" }, span * 0.05);
      tl0.to(syls[0], { opacity: 0.2, scale: 1, duration: span * 0.3, ease: "none" }, span * 0.7);
      tl0.to(descs[0], { opacity: 0, y: -20, duration: span * 0.3, ease: "none" }, span * 0.7);
      master.add(tl0, 420);
    }

    // "ent" : 730 → 990
    if (syls[1] && descs[1]) {
      const span = 260;
      const tl1 = gsap.timeline();
      tl1.fromTo(syls[1], { opacity: 0.2, scale: 1 }, { opacity: 1, scale: 1.12, duration: span * 0.25, ease: "none" });
      tl1.fromTo(descs[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: span * 0.2, ease: "none" }, span * 0.05);
      tl1.to(syls[1], { opacity: 0.2, scale: 1, duration: span * 0.3, ease: "none" }, span * 0.7);
      tl1.to(descs[1], { opacity: 0, y: -20, duration: span * 0.3, ease: "none" }, span * 0.7);
      master.add(tl1, 730);
    }

    // "ia" : 1040 → 1280
    if (syls[2] && descs[2]) {
      const span = 240;
      const tl2 = gsap.timeline();
      tl2.fromTo(syls[2], { opacity: 0.2, scale: 1 }, { opacity: 1, scale: 1.12, duration: span * 0.4, ease: "none" });
      tl2.fromTo(descs[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: span * 0.3, ease: "none" }, span * 0.1);
      master.add(tl2, 1040);
    }

  }, { scope: sectionRef });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <section ref={sectionRef} id="hero" className="relative">
      <div ref={pinRef} className="relative h-screen flex flex-col items-center overflow-hidden" style={{ perspective: "900px", minHeight: "100vh" }}>

        {/* Grid */}
        <div ref={gridRef} className="absolute inset-0 z-0 pointer-events-none hero-grid will-change-transform" style={{ opacity: 0.1 }} />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 25%, var(--bg-base) 75%, var(--bg-base) 100%)" }}
        />

        {/* Hero content — flex-1 to fill available space, centered */}
        <div ref={contentRef} className="flex-1 flex items-center container mx-auto px-6 md:px-12 relative z-20 will-change-transform" style={{ transformStyle: "preserve-3d" }}>
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>

            {/* Each layer: outer div = GSAP scroll, inner .mouse-layer = raw DOM mouse parallax */}
            <div ref={badgeRef} className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("badge")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <BlurReveal delay={0.2}>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent-primary/15 bg-foreground/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(201,100,66,0.08)]">
                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_12px_rgba(201,100,66,0.6)]" />
                    <span className="text-sm font-mono tracking-wider text-foreground-muted uppercase">
                      Agence tech IA
                    </span>
                  </div>
                </BlurReveal>
              </div>
            </div>

            <div ref={titleL1Ref} className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("titleL1")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading tracking-tighter leading-[0.9] text-center text-foreground font-bold">
                  Une nouvelle aube
                </h1>
              </div>
            </div>

            <div ref={titleL2Ref} className="will-change-transform mb-8" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("titleL2")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading tracking-tighter leading-[0.9] text-center text-foreground font-bold">
                  pour le web.
                </p>
              </div>
            </div>

            <div ref={subtitleRef} className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("subtitle")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <BlurReveal delay={0.6}>
                  <p className="text-lg sm:text-xl md:text-2xl text-foreground-dim mb-6 max-w-4xl mx-auto leading-relaxed">
                    La puissance de l&apos;<strong className="text-foreground font-bold">IA</strong>. La rigueur de <strong className="text-foreground font-bold">20 ans</strong> de m&eacute;tier. La <strong className="text-foreground font-bold">vitesse</strong> en plus.
                  </p>
                </BlurReveal>
              </div>
            </div>

            <div ref={tagsRef} className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("tags")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <p className="text-sm md:text-base text-foreground-muted mb-12">
                  Sites vitrines · Applications SaaS · Landing pages
                </p>
              </div>
            </div>

            <div ref={ctaRef} className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("cta")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <BlurReveal
                  delay={0.8}
                  stagger={0.2}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6 z-30 mb-20"
                >
                  <button
                    onClick={() => window.open("https://cal.com/aurentia", "_blank")}
                    className={cn(
                      "relative rounded-full inline-flex items-center justify-center isolate overflow-hidden group/magnetic",
                      "bg-foreground text-background hover:opacity-90 transition-all",
                      "px-6 py-3 font-medium cursor-pointer transition-[shadow,opacity,background-color] duration-500",
                      "hover:shadow-[0_0_40px_rgba(43,43,43,0.3)]"
                    )}
                  >
                    <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/20 to-transparent opacity-0 group-hover/magnetic:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <span className="relative z-10 pointer-events-none text-shadow-sm font-semibold tracking-wide flex items-center justify-center">
                      D&eacute;couvrir &rarr;
                    </span>
                  </button>
                  <a
                    href="#portfolio"
                    className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-500 group flex items-center gap-2"
                  >
                    Voir nos r&eacute;alisations
                    <span className="inline-block transition-transform duration-500 group-hover:translate-y-1 mt-0.5">
                      &darr;
                    </span>
                  </a>
                </BlurReveal>
              </div>
            </div>

          </div>
        </div>

        {/* "Aurentia" — syllabes */}
        <div
          ref={aurentiaRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none will-change-transform"
          style={{ opacity: 0 }}
        >
          {/* Le mot */}
          <div className="flex items-baseline tracking-tighter">
            {SYLLABLES.map((syl, i) => (
              <span
                key={syl.letters}
                ref={[syl0, syl1, syl2][i]}
                className="font-heading font-bold text-foreground text-[14vw] leading-none select-none will-change-transform transition-colors"
                style={{ textShadow: '0 0 80px rgba(201,100,66,0.15)' }}
              >
                {syl.letters}
              </span>
            ))}
          </div>

          {/* Zone description — position fixe sous le mot */}
          <div className="relative h-24 mt-8 md:mt-12 w-full max-w-2xl">
            {SYLLABLES.map((syl, i) => (
              <div
                key={syl.letters}
                ref={[desc0, desc1, desc2][i]}
                className="absolute inset-0 flex flex-col items-center text-center opacity-0"
              >
                <span className="text-sm md:text-base font-mono tracking-[0.2em] uppercase text-accent-primary">
                  {syl.title}
                </span>
                <p className="mt-3 text-sm md:text-lg text-foreground/60 leading-relaxed max-w-lg">
                  {syl.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Secret hint */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-secret-hint pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-foreground-dim/30">
            <path d="M6 0L11 7H1L6 0Z" fill="currentColor" />
          </svg>
        </div>

        {/* Scroll indicator — pushed to bottom via mt-auto */}
        <a
          href="#equipe"
          className="relative z-20 mt-auto mb-4 flex flex-col items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
          aria-label="Scroll vers le bas"
        >
          <div className="w-6 h-10 rounded-full border-2 border-accent-primary/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 rounded-full bg-accent-primary/60 animate-scroll-dot shadow-[0_0_6px_rgba(201,100,66,0.4)]" />
          </div>
        </a>

        {/* Orange glow at bottom — wide flat arc (stronger in light mode) */}
        <div className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 z-[2] pointer-events-none w-[90%] aspect-[3/1] rounded-full" style={{ background: "var(--accent)", filter: "blur(100px)", opacity: "var(--hero-glow-opacity)" }} />

        {/* Marquee — flex child at the very bottom of the hero */}
        <div className="relative z-20 shrink-0 w-full py-4 overflow-hidden flex items-center section-divider-orange">
          <InfiniteMarquee
            items={["Sur-mesure", "Propulsé par l'IA", "Perfection", "Zéro template", "Artisanat digital", "Design unique"]}
            className="text-xl md:text-2xl font-bold font-sans tracking-widest text-foreground/60 uppercase"
          />
        </div>

      </div>
    </section>
  );
}
