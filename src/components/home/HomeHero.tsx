"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { InfiniteMarquee } from "@/components/animations/InfiniteMarquee";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CalModal } from "@/components/shared/CalModal";

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

type LayerKey = keyof typeof DEPTH;

export function HomeHero() {
  const [calOpen, setCalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // Inner refs — raw DOM style controls these (x, rotateY, rotateX)
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
    // Skip mouse parallax on touch devices (mobile/tablet) — no mouse, saves GPU
    if (window.matchMedia("(pointer: coarse)").matches) return;
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
  // Render
  // ---------------------------------------------------------------------------
  return (
    <>
      <section ref={sectionRef} id="hero" className="relative">
      <div ref={pinRef} className="relative h-screen flex flex-col items-center overflow-hidden" style={{ perspective: "900px", minHeight: "100vh" }}>

        {/* Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none hero-grid will-change-transform" style={{ opacity: 0.1 }} />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 40%, var(--bg-base) 85%, var(--bg-base) 100%)" }}
        />

        {/* Hero content */}
        <div className="flex-1 flex items-center container mx-auto px-6 md:px-12 relative z-20 will-change-transform" style={{ transformStyle: "preserve-3d" }}>
          <div className="max-w-7xl mx-auto text-center flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>

            {/* Badge */}
            <div className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("badge")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <BlurReveal delay={0.2}>
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md mb-6 md:mb-8">
                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_12px_rgba(201,100,66,0.6)]" />
                    <span className="text-sm font-semibold tracking-widest text-foreground/70 uppercase">
                      Agence tech IA
                    </span>
                  </div>
                </BlurReveal>
              </div>
            </div>

            {/* Title L1 */}
            <div className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("titleL1")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-tight leading-[0.95] text-center text-foreground">
                  Des sites et apps sur-mesure.
                </h1>
              </div>
            </div>

            {/* Title L2 */}
            <div className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("titleL2")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-tight leading-[0.95] text-center text-foreground">
                  Livr&eacute;s en semaines.
                </p>
              </div>
            </div>

            {/* Subtitle */}
            <div className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("subtitle")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <BlurReveal delay={0.6}>
                  <p className="text-base md:text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed mt-4 md:mt-6">
                    Sites vitrines · Applications SaaS · Landing pages · Impl&eacute;mentation IA
                  </p>
                </BlurReveal>
              </div>
            </div>

            {/* Tags (kept for parallax layer) */}
            <div className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("tags")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
              </div>
            </div>

            {/* CTA */}
            <div className="will-change-transform" data-splash-hero style={{ transformStyle: "preserve-3d" }}>
              <div ref={setMouseLayer("cta")} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <BlurReveal
                  delay={0.8}
                  stagger={0.2}
                  className="flex flex-col items-center justify-center gap-4 z-30 mt-8 md:mt-10 mb-20"
                >
                  <MagneticButton
                    glow
                    className="w-full sm:w-auto px-8 py-4 text-base md:text-lg"
                    onClick={() => {
                      const el = document.getElementById("services");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    D&eacute;couvrir nos services &rarr;
                  </MagneticButton>
                </BlurReveal>
              </div>
            </div>

          </div>
        </div>

        {/* Secret hint */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-secret-hint pointer-events-none">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-foreground/30">
            <path d="M6 0L11 7H1L6 0Z" fill="currentColor" />
          </svg>
        </div>

        {/* Scroll indicator */}
        <a
          href="#services"
          className="relative z-20 mt-auto mb-4 flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground transition-colors duration-500"
          aria-label="Scroll vers le bas"
        >
          <div className="w-6 h-10 rounded-full border-2 border-accent-primary/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 rounded-full bg-accent-primary/60 animate-scroll-dot shadow-[0_0_6px_rgba(201,100,66,0.4)]" />
          </div>
        </a>

        {/* Marquee */}
        <div className="relative z-20 shrink-0 w-full py-4 overflow-hidden flex items-center section-divider-orange">
          <InfiniteMarquee
            items={["Sites vitrines", "Applications SaaS", "Landing pages", "Logiciel métier", "Implémentation IA", { name: "Formation IA", icon: "/images/icons/claude-icon.webp" }]}
            className="text-xl md:text-2xl font-bold font-sans tracking-widest text-foreground/60 uppercase"
          />
        </div>

      </div>
      {/* Orange glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[2] pointer-events-none w-[90%] aspect-[3/1] rounded-full" style={{ background: "var(--accent)", filter: "blur(100px)", opacity: "var(--hero-glow-opacity)" }} />
      </section>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
