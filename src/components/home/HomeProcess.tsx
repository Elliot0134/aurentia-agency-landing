"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/animations/TextReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Visual: Chat bubbles for "On échange" ──
function VisualChat() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="chat-bubble-1 absolute left-[10%] top-[22%] bg-accent-primary/15 border border-accent-primary/25 rounded-2xl rounded-bl-sm px-5 py-3 opacity-0">
        <div className="w-20 h-2 bg-accent-primary/40 rounded-full mb-2" />
        <div className="w-14 h-2 bg-accent-primary/25 rounded-full" />
      </div>
      <div className="chat-bubble-2 absolute right-[8%] top-[45%] bg-foreground/[0.06] border border-foreground/10 rounded-2xl rounded-br-sm px-5 py-3 opacity-0">
        <div className="w-24 h-2 bg-foreground/15 rounded-full mb-2" />
        <div className="w-16 h-2 bg-foreground/10 rounded-full mb-2" />
        <div className="w-10 h-2 bg-foreground/10 rounded-full" />
      </div>
      <div className="chat-dots absolute left-[15%] bottom-[18%] flex gap-1.5 opacity-0">
        <div className="w-2 h-2 rounded-full bg-accent-primary/50 animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-accent-primary/40 animate-pulse [animation-delay:200ms]" />
        <div className="w-2 h-2 rounded-full bg-accent-primary/30 animate-pulse [animation-delay:400ms]" />
      </div>
    </div>
  );
}

// ── Visual: Design layout for "On conçoit" ──
function VisualDesign() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="design-frame w-full max-w-[220px] aspect-[4/3] bg-background/60 border border-foreground/10 rounded-xl p-3 flex flex-col gap-2 opacity-0 scale-95">
        <div className="flex gap-2">
          <div className="design-block w-1/3 h-3 bg-foreground/[0.05] border border-foreground/[0.08] rounded transition-colors duration-700" />
          <div className="flex-1" />
          <div className="design-block w-6 h-3 bg-foreground/[0.05] border border-foreground/[0.08] rounded transition-colors duration-700" />
        </div>
        <div className="design-block flex-1 bg-foreground/[0.05] border border-foreground/[0.08] rounded-lg transition-colors duration-700" />
        <div className="grid grid-cols-3 gap-1.5 h-8">
          <div className="design-block bg-foreground/[0.05] border border-foreground/[0.08] rounded transition-colors duration-700" />
          <div className="design-block bg-foreground/[0.05] border border-foreground/[0.08] rounded transition-colors duration-700" />
          <div className="design-block bg-foreground/[0.05] border border-foreground/[0.08] rounded transition-colors duration-700" />
        </div>
      </div>
    </div>
  );
}

// ── Visual: Launch for "On lance" ──
function VisualLaunch() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="launch-trail absolute bottom-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-0">
        <div className="w-1 h-6 bg-gradient-to-b from-accent-primary/60 to-transparent rounded-full" />
        <div className="w-0.5 h-10 bg-gradient-to-b from-accent-primary/40 to-transparent rounded-full" />
        <div className="w-0.5 h-8 bg-gradient-to-b from-accent-primary/20 to-transparent rounded-full" />
      </div>
      <div className="launch-arrow opacity-0">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-accent-primary">
          <path d="M24 38V10M24 10L14 20M24 10L34 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="10" r="3" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
      <div className="launch-badge-1 absolute top-[22%] right-[10%] flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5 opacity-0">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-sm font-mono text-green-400/80">Live</span>
      </div>
      <div className="launch-badge-2 absolute bottom-[25%] left-[8%] flex items-center gap-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full px-3 py-1.5 opacity-0">
        <span className="text-sm font-mono text-accent-primary/80">SSL</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-primary" /></svg>
      </div>
    </div>
  );
}

// ── Visual: Support pulse for "On accompagne" ──
function VisualSupport() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="support-line w-[80%] h-12 opacity-0" viewBox="0 0 200 40" fill="none">
        <path
          d="M0 20 L40 20 L50 8 L60 32 L70 14 L80 26 L90 20 L200 20"
          stroke="url(#pulse-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id="pulse-gradient" x1="0" y1="0" x2="200" y2="0">
            <stop offset="0%" stopColor="rgba(201,100,66,0.2)" />
            <stop offset="40%" stopColor="rgba(201,100,66,0.8)" />
            <stop offset="60%" stopColor="rgba(201,100,66,0.8)" />
            <stop offset="100%" stopColor="rgba(201,100,66,0.2)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="support-metric-1 absolute top-[18%] left-[12%] bg-foreground/[0.04] border border-foreground/8 rounded-xl px-3 py-2 opacity-0">
        <span className="text-sm font-mono text-foreground/40 block">Uptime</span>
        <span className="text-lg font-bold font-mono text-accent-primary">99.9%</span>
      </div>
      <div className="support-metric-2 absolute bottom-[18%] right-[10%] bg-foreground/[0.04] border border-foreground/8 rounded-xl px-3 py-2 opacity-0">
        <span className="text-sm font-mono text-foreground/40 block">Support</span>
        <span className="text-lg font-bold font-mono text-green-400/90">&lt;2h</span>
      </div>
    </div>
  );
}

const steps = [
  {
    num: "01",
    title: "On échange",
    desc: "On prend le temps de comprendre votre vision, votre marché, vos ambitions. Chaque projet commence par une conversation.",
    Visual: VisualChat,
  },
  {
    num: "02",
    title: "On conçoit",
    desc: "Design sur-mesure et développement pixel-perfect. Chaque détail est pensé, chaque interaction est forgée avec soin.",
    Visual: VisualDesign,
  },
  {
    num: "03",
    title: "On lance",
    desc: "Mise en production, configuration du domaine, SEO technique. Tout est en place pour performer dès le premier jour.",
    Visual: VisualLaunch,
  },
  {
    num: "04",
    title: "On accompagne",
    desc: "On ne disparaît pas après la livraison. Support direct, évolutions sur-mesure — votre projet grandit avec vous.",
    Visual: VisualSupport,
  },
];

export function HomeProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Wait for client-side hydration before determining layout mode
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setIsReady(true);

    const onResize = () => {
      const nowMobile = window.innerWidth < 768;
      if (nowMobile !== mobile) {
        // Full reload on breakpoint cross to avoid GSAP conflicts
        window.location.reload();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(() => {
    if (!isReady || !sectionRef.current || !trackRef.current || !pinnedRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const cards = track.querySelectorAll<HTMLElement>(".process-card");

    if (!isMobile) {
      // ── DESKTOP: horizontal scroll ──
      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      // Main horizontal tween — cards are visible by default, no fade needed
      // since they start in the viewport or slide in naturally
      const horizontalTween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll * 1.3}`,
          scrub: 1.2,
          pin: pinnedRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress line fills with scrub
      const progressFill = section.querySelector(".progress-line-fill");
      if (progressFill) {
        gsap.fromTo(progressFill,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalScroll * 1.3}`,
              scrub: 1.2,
            },
          }
        );
      }

      // Step dots activate with scrub
      const dots = section.querySelectorAll(".progress-dot");
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          backgroundColor: "rgb(201,100,66)",
          borderColor: "rgb(201,100,66)",
          scale: 1.4,
          boxShadow: "0 0 12px rgba(201,100,66,0.6)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${(totalScroll * 1.3 * i) / (steps.length - 1)} top`,
            end: () => `top+=${(totalScroll * 1.3 * (i + 0.3)) / (steps.length - 1)} top`,
            scrub: 1,
          },
        });
      });

      // Per-card animations using containerAnimation for correct horizontal triggers
      cards.forEach((card, idx) => {
        // Card entrance: fade + slide from right, tied to horizontal scroll position
        gsap.fromTo(card,
          { opacity: 0, x: 80, filter: "blur(8px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "left 90%",
              end: "left 60%",
              scrub: 1,
              containerAnimation: horizontalTween,
            },
          }
        );

        // Internal card animations also tied to horizontal scroll
        animateCardHorizontal(card, idx, horizontalTween);
      });

    } else {
      // ── MOBILE: vertical stack ──
      cards.forEach((card, idx) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );

        animateCardVertical(card, idx);
      });
    }
  }, { scope: sectionRef, dependencies: [isReady, isMobile] });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative section-dark-alt section-divider-orange"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div ref={pinnedRef} className="relative z-10 min-h-screen flex flex-col justify-center py-20 md:py-0">
        {/* ── Header ── */}
        <div className="px-6 md:px-12 mb-10 md:mb-14">
          <TextReveal
            text="Notre méthode."
            elementType="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          />
          <p className="text-foreground-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            Un processus clair, du premier échange à l&apos;accompagnement continu.
          </p>
        </div>

        {/* ── Progress line (desktop) ── */}
        <div className="hidden md:block relative h-[2px] mx-12 mb-14">
          <div className="absolute inset-0 bg-foreground/5 rounded-full" />
          <div className="progress-line-fill absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary rounded-full shadow-[0_0_12px_rgba(201,100,66,0.6)]" />
          <div className="absolute inset-0 flex justify-between items-center">
            {steps.map((_, i) => (
              <div
                key={i}
                className="progress-dot w-3 h-3 rounded-full bg-background border-2 border-foreground/10 relative z-10 transition-all duration-500"
              />
            ))}
          </div>
        </div>

        {/* ── Horizontal track (desktop) / Vertical stack (mobile) ── */}
        <div className="overflow-visible">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-6 px-6 md:px-12 md:gap-8 md:w-max"
          >
            {steps.map((step) => (
              <SpotlightCard
                key={step.num}
                className="process-card w-full md:w-[460px] lg:w-[520px] min-h-[400px] group shrink-0"
              >
                <div className="flex flex-col h-full p-8">
                  {/* Visual area */}
                  <div className="relative w-full h-[200px] mb-6 rounded-xl bg-background/40 border border-foreground/[0.06] overflow-hidden">
                    <step.Visual />
                    <span className="absolute top-3 right-4 text-[80px] font-black font-mono leading-none text-accent-primary/[0.06] select-none pointer-events-none">
                      {step.num}
                    </span>
                  </div>

                  {/* Text content */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-mono font-bold text-accent-primary/80 tracking-wider">
                        {step.num}
                      </span>
                      <div className="w-6 h-[1px] bg-accent-primary/30" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-accent-secondary transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-foreground-muted leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}

            {/* Spacer so the last card can be fully visible */}
            <div className="hidden md:block shrink-0 w-[calc(100vw-520px-96px)] lg:w-[calc(100vw-580px-96px)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Desktop: per-card animations using containerAnimation ──
function animateCardHorizontal(card: Element, idx: number, containerAnimation: gsap.core.Tween) {
  switch (idx) {
    case 0: {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "left 70%",
          end: "left 40%",
          scrub: 1,
          containerAnimation,
        },
      });
      tl.fromTo(card.querySelector(".chat-bubble-1"),
        { opacity: 0, x: -20, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1 }
      );
      tl.fromTo(card.querySelector(".chat-bubble-2"),
        { opacity: 0, x: 20, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        0.3
      );
      tl.fromTo(card.querySelector(".chat-dots"),
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0.6
      );
      break;
    }
    case 1: {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "left 70%",
          end: "left 40%",
          scrub: 1,
          containerAnimation,
        },
      });
      tl.fromTo(card.querySelector(".design-frame"),
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5 }
      );
      tl.fromTo(card.querySelectorAll(".design-block"),
        { backgroundColor: "rgba(250,249,246,0.03)", borderColor: "rgba(250,249,246,0.08)" },
        {
          backgroundColor: "rgba(176,87,48,0.18)",
          borderColor: "rgba(176,87,48,0.4)",
          stagger: 0.08,
          duration: 0.4,
        },
        0.3
      );
      break;
    }
    case 2: {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "left 70%",
          end: "left 40%",
          scrub: 1,
          containerAnimation,
        },
      });
      tl.fromTo(card.querySelector(".launch-trail"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
      tl.fromTo(card.querySelector(".launch-arrow"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.2
      );
      tl.fromTo(card.querySelector(".launch-badge-1"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4 },
        0.5
      );
      tl.fromTo(card.querySelector(".launch-badge-2"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4 },
        0.6
      );
      break;
    }
    case 3: {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "left 70%",
          end: "left 40%",
          scrub: 1,
          containerAnimation,
        },
      });
      const line = card.querySelector(".support-line");
      if (line) {
        const path = line.querySelector("path");
        if (path) {
          const length = (path as SVGPathElement).getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(path, { strokeDashoffset: 0, duration: 1 });
          tl.fromTo(line, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);
        }
      }
      tl.fromTo(card.querySelector(".support-metric-1"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.4
      );
      tl.fromTo(card.querySelector(".support-metric-2"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.6
      );
      break;
    }
  }
}

// ── Mobile: per-card animations using vertical scroll triggers ──
function animateCardVertical(card: Element, idx: number) {
  const trigger = card;
  const start = "top 80%";

  switch (idx) {
    case 0: {
      const tl = gsap.timeline({ scrollTrigger: { trigger, start } });
      tl.fromTo(card.querySelector(".chat-bubble-1"),
        { opacity: 0, x: -20, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" }
      );
      tl.fromTo(card.querySelector(".chat-bubble-2"),
        { opacity: 0, x: 20, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" },
        "-=0.4"
      );
      tl.fromTo(card.querySelector(".chat-dots"),
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );
      break;
    }
    case 1: {
      const tl = gsap.timeline({ scrollTrigger: { trigger, start } });
      tl.fromTo(card.querySelector(".design-frame"),
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
      tl.fromTo(card.querySelectorAll(".design-block"),
        { backgroundColor: "rgba(250,249,246,0.03)", borderColor: "rgba(250,249,246,0.08)" },
        {
          backgroundColor: "rgba(176,87,48,0.18)",
          borderColor: "rgba(176,87,48,0.4)",
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
      break;
    }
    case 2: {
      const tl = gsap.timeline({ scrollTrigger: { trigger, start } });
      tl.fromTo(card.querySelector(".launch-trail"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      tl.fromTo(card.querySelector(".launch-arrow"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "back.out(2)" },
        "-=0.4"
      );
      tl.fromTo(card.querySelector(".launch-badge-1"),
        { opacity: 0, scale: 0.8, x: 10 },
        { opacity: 1, scale: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" },
        "-=0.2"
      );
      tl.fromTo(card.querySelector(".launch-badge-2"),
        { opacity: 0, scale: 0.8, x: -10 },
        { opacity: 1, scale: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" },
        "-=0.3"
      );
      break;
    }
    case 3: {
      const tl = gsap.timeline({ scrollTrigger: { trigger, start } });
      const line = card.querySelector(".support-line");
      if (line) {
        const path = line.querySelector("path");
        if (path) {
          const length = (path as SVGPathElement).getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" });
          tl.fromTo(line, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
        }
      }
      tl.fromTo(card.querySelector(".support-metric-1"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.6"
      );
      tl.fromTo(card.querySelector(".support-metric-2"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
      break;
    }
  }
}
