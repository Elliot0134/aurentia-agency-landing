"use client";

import { useRef, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
// SpotlightCard removed — open layout without cards

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useGSAP(() => {
    if (!ref.current || hasAnimated.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = prefix + Math.round(obj.val).toLocaleString("fr-FR") + suffix;
        }
      },
      onComplete: () => { hasAnimated.current = true; },
    });
  });

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const CHART_BARS = [22, 38, 30, 52, 44, 65, 58, 80, 72, 94];

/* ── Inline SVG icons (no emojis) ── */
const PaletteIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" /><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" /><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" /><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);
const SmartphoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
  </svg>
);
const _RocketIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export function HomeServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const vitrineRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !cardsRef.current) return;

      // ── Helper: pop-in with stagger ──
      const popIn = (
        tl: gsap.core.Timeline,
        els: NodeListOf<Element> | Element[] | null,
        opts?: { stagger?: number; duration?: number; y?: number; scale?: number; ease?: string }
      ) => {
        if (!els || (els instanceof NodeList && els.length === 0)) return;
        const { stagger = 0.06, duration = 0.35, y = 10, scale = 0.92, ease = "back.out(1.4)" } = opts || {};
        tl.fromTo(
          els,
          { opacity: 0, y, scale, transformOrigin: "center center" },
          { opacity: 1, y: 0, scale: 1, stagger, duration, ease },
        );
      };

      const cards = cardsRef.current.querySelectorAll(".service-card");

      // ── Cards + ServiceInfo appear immediately with a soft fade ──
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
        }
      );

      // ── All 3 mockup designs build simultaneously ──
      // Each card has its own internal timeline, but they all start at the same time

      const buildTrigger = {
        scrollTrigger: { trigger: cardsRef.current, start: "top 75%" },
      };

      // ━━━ Card 1 — Vitrine build ━━━
      if (vitrineRef.current) {
        const v = vitrineRef.current;
        const tl = gsap.timeline(buildTrigger);

        tl.fromTo(v.querySelectorAll(".v-dot"),
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, stagger: 0.06, duration: 0.25, ease: "back.out(2)" },
        );
        const urlBar = v.querySelector(".v-url");
        if (urlBar) {
          tl.fromTo(urlBar,
            { opacity: 0, scaleX: 0, transformOrigin: "left center" },
            { opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.out" },
            "-=0.1"
          );
        }
        popIn(tl, v.querySelectorAll(".v-nav"), { stagger: 0.04, duration: 0.25, y: 6, scale: 0.95 });
        const hero = v.querySelector(".v-hero");
        if (hero) {
          tl.fromTo(hero,
            { opacity: 0, scale: 0.9, y: 8 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.3)" },
          );
        }
        popIn(tl, v.querySelectorAll(".v-text"), { stagger: 0.06, duration: 0.3, y: 6, scale: 0.97 });
        popIn(tl, v.querySelectorAll(".v-feat"), { stagger: 0.08, duration: 0.3, y: 8, scale: 0.88 });
        const trust = v.querySelector(".v-trust");
        if (trust) {
          tl.fromTo(trust, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
        }
      }

      // ━━━ Card 2 — Landing build ━━━
      if (landingRef.current) {
        const l = landingRef.current;
        const tl = gsap.timeline(buildTrigger);

        tl.fromTo(l.querySelectorAll(".l-dot"),
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, stagger: 0.06, duration: 0.25, ease: "back.out(2)" },
        );
        const urlBar = l.querySelector(".l-url");
        if (urlBar) {
          tl.fromTo(urlBar,
            { opacity: 0, scaleX: 0, transformOrigin: "left center" },
            { opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.out" },
            "-=0.1"
          );
        }
        const badge = l.querySelector(".l-badge");
        if (badge) {
          tl.fromTo(badge,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" },
          );
        }
        popIn(tl, l.querySelectorAll(".l-text"), { stagger: 0.06, duration: 0.3, y: 6, scale: 0.97 });
        popIn(tl, l.querySelectorAll(".l-cta"), { stagger: 0.08, duration: 0.3, y: 6, scale: 0.92 });
        const social = l.querySelector(".l-social");
        if (social) {
          tl.fromTo(social, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
        }
        popIn(tl, l.querySelectorAll(".l-metric"), { stagger: 0.08, duration: 0.3, y: 8, scale: 0.88 });
        popIn(tl, l.querySelectorAll(".l-plan"), { stagger: 0.1, duration: 0.35, y: 8, scale: 0.9 });
      }

      // ━━━ Card 3 — Dashboard build ━━━
      if (dashRef.current) {
        const d = dashRef.current;
        const tl = gsap.timeline(buildTrigger);

        popIn(tl, d.querySelectorAll(".d-sidebar"), { stagger: 0.05, duration: 0.25, y: 6, scale: 0.88 });
        const topbar = d.querySelector(".d-topbar");
        if (topbar) {
          tl.fromTo(topbar, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1");
        }
        const banner = d.querySelector(".d-banner");
        if (banner) {
          tl.fromTo(banner,
            { opacity: 0, scale: 0.92, y: 6 },
            { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(1.3)" },
          );
        }
        popIn(tl, d.querySelectorAll(".d-kpi"), { stagger: 0.08, duration: 0.3, y: 8, scale: 0.88 });
        const bars = d.querySelectorAll(".chart-bar");
        if (bars.length) {
          tl.fromTo(bars,
            { scaleY: 0, transformOrigin: "bottom center" },
            { scaleY: 1, stagger: 0.04, ease: "back.out(1.5)", duration: 0.4 },
          );
        }
        const label = d.querySelector(".mrr-label");
        if (label) {
          tl.fromTo(label,
            { opacity: 0, scale: 0.85, y: 4 },
            { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" },
          );
        }
        popIn(tl, d.querySelectorAll(".d-feed"), { stagger: 0.08, duration: 0.3, y: 6, scale: 0.93 });
      }
    },
    { scope: containerRef }
  );

  // ── Auto-scroll on hover (desktop only) ──
  const hoverTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map());

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const scrollArea = card.querySelector(".mockup-scroll-area") as HTMLElement | null;
    const inner = card.querySelector(".mockup-inner") as HTMLElement | null;
    if (!scrollArea || !inner) return;
    const scrollDistance = inner.scrollHeight - scrollArea.clientHeight;
    if (scrollDistance <= 0) return;

    hoverTweens.current.get(card)?.kill();

    const tween = gsap.to(inner, {
      y: -scrollDistance,
      duration: scrollDistance / 80,
      ease: "none",
    });
    hoverTweens.current.set(card, tween);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const inner = card.querySelector(".mockup-inner") as HTMLElement | null;
    if (!inner) return;

    hoverTweens.current.get(card)?.kill();

    const tween = gsap.to(inner, {
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    hoverTweens.current.set(card, tween);
  }, []);

  // Cleanup tweens on unmount
  useEffect(() => {
    const tweens = hoverTweens.current;
    return () => { tweens.forEach((t) => t.kill()); };
  }, []);

  return (
    <Section
      ref={containerRef}
      id="services"
      theme="dark"
      className="min-h-screen section-divider-orange relative overflow-hidden flex flex-col justify-center py-20 lg:py-24"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="mb-10 relative z-10 max-w-4xl">
        <BlurReveal>
          <span className="inline-block text-sm font-mono uppercase tracking-[0.2em] text-accent-primary/70 mb-4">Services</span>
        </BlurReveal>
        <TextReveal
          text="On crée ce dont votre business a besoin."
          elementType="h2"
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
        />
      </div>

      {/* Services grid — open layout, no cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 relative z-10">

        {/* ━━━ COLUMN 1 — Sites Vitrines ━━━ */}
        <div className="service-card group flex flex-col">
            <ServiceTitle title="Sites Vitrines" />
            <div
              ref={vitrineRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="mockup-viewport aspect-[16/10] lg:aspect-auto lg:h-[280px] bg-background-surface border border-foreground/[0.08] rounded-xl overflow-hidden transition-all duration-700 group-hover:border-accent-primary/20 group-hover:shadow-[0_0_50px_rgba(201,100,66,0.08)] group-hover:scale-[1.02] select-none relative"
            >
              {/* Floating ambient orb */}
              <div className="absolute top-8 right-6 w-24 h-24 bg-accent-primary/[0.06] rounded-full blur-2xl animate-[float-y_8s_ease-in-out_infinite]" />

              <div className="flex flex-col h-full relative z-10">
                {/* Browser chrome */}
                <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 border-b border-foreground/[0.06] bg-background-surface">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="v-dot w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="v-dot w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="v-dot w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="v-url flex-1 h-5 rounded-md bg-foreground/[0.04] flex items-center px-2.5">
                    <span className="text-sm text-foreground/20 font-mono truncate">votre-entreprise.fr</span>
                  </div>
                </div>

                {/* Nav */}
                <div className="shrink-0 flex items-center justify-between px-4 py-1.5 border-b border-foreground/[0.04] bg-background-surface">
                  <div className="v-nav flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-accent-primary/20 border border-accent-primary/30" />
                    <span className="text-sm font-bold text-foreground/70">MonEntreprise</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="v-nav text-sm text-foreground/25">Accueil</span>
                    <span className="v-nav text-sm text-foreground/25">Services</span>
                    <span className="v-nav text-sm bg-foreground text-background px-2 py-0.5 rounded-md font-medium">Contact</span>
                  </div>
                </div>

                {/* Scrollable content area */}
                <div className="mockup-scroll-area flex-1 overflow-hidden">
                <div className="mockup-inner flex flex-col">

                {/* Hero */}
                <div className="v-hero relative mx-3 mt-2.5 rounded-lg overflow-hidden bg-accent-primary/[0.06] border border-accent-primary/10 p-4">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/[0.08] rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <p className="v-text text-sm font-bold text-foreground/85 leading-snug">Votre vitrine digitale,</p>
                    <p className="v-text text-sm font-bold text-foreground/85 leading-snug">votre <span className="text-accent-primary">image de marque.</span></p>
                    <p className="v-text text-sm text-foreground/35 mt-1.5">Entreprise · Restaurant · Cabinet</p>
                  </div>
                </div>

                {/* Features row */}
                <div className="grid grid-cols-3 gap-1.5 px-3 py-2">
                  {[
                    { icon: <PaletteIcon />, label: "Design" },
                    { icon: <SearchIcon />, label: "SEO" },
                    { icon: <SmartphoneIcon />, label: "Responsive" },
                  ].map(({ icon, label }, i) => (
                    <div key={i} className="v-feat rounded-md bg-accent-primary/[0.04] border border-accent-primary/15 p-2 text-center">
                      <span className="flex justify-center text-accent-primary/60 mb-0.5">{icon}</span>
                      <p className="text-sm text-foreground/45 font-medium">{label}</p>
                    </div>
                  ))}
                </div>

                {/* ── Extended content (hover scroll) ── */}
                <div className="px-3 pb-3 flex flex-col gap-2">
                  {/* Trust bar */}
                  <div className="v-trust flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-accent-primary/40 to-amber-600/30 border border-background-surface" />
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400/40 to-violet-600/30 border border-background-surface" />
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400/40 to-emerald-600/30 border border-background-surface" />
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-2 h-2 text-amber-400/80" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-foreground/25 font-mono">12 sites livrés</span>
                  </div>

                  {/* About */}
                  <div className="rounded-lg bg-foreground/[0.02] border border-foreground/[0.06] p-2.5 flex gap-2.5">
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br from-accent-primary/15 to-amber-600/10 border border-accent-primary/10" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground/55 font-bold mb-0.5">Notre histoire</p>
                      <p className="text-sm text-foreground/30 leading-relaxed">Accompagnement digital sur-mesure depuis 2019.</p>
                    </div>
                  </div>

                  {/* Contact form */}
                  <div className="rounded-lg bg-foreground/[0.02] border border-foreground/[0.06] p-2.5">
                    <p className="text-sm text-foreground/45 font-medium mb-1.5">Contactez-nous</p>
                    <div className="flex gap-1.5 mb-1.5">
                      <div className="flex-1 h-5 rounded bg-foreground/[0.04] border border-foreground/[0.06]" />
                      <div className="flex-1 h-5 rounded bg-foreground/[0.04] border border-foreground/[0.06]" />
                    </div>
                    <div className="w-full h-5 rounded bg-foreground/[0.04] border border-foreground/[0.06] mb-1.5" />
                    <div className="w-full h-6 rounded-md bg-foreground text-background flex items-center justify-center">
                      <span className="text-sm font-medium">Envoyer</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-foreground/[0.06] pt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground/30">MonEntreprise</span>
                    <span className="text-sm text-foreground/15 font-mono">© 2024</span>
                  </div>
                </div>
                </div>{/* /mockup-inner */}
                </div>{/* /mockup-scroll-area */}
              </div>
            </div>

            <ServiceDetails
              desc="Un beau site, fait pour vous. Visible sur Google, parfait sur mobile, prêt à recevoir vos clients."
              tags={["SEO", "Animations", "Sur-mesure", "Responsive"]}
              price="1 200€"
              priceLabel="À partir de"
              href="/sites-vitrines"
            />
        </div>

        {/* ━━━ COLUMN 2 — Landing Pages ━━━ */}
        <div className="service-card group flex flex-col">
            <ServiceTitle title="Landing Pages" />
            <div
              ref={landingRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="mockup-viewport aspect-[16/10] lg:aspect-auto lg:h-[280px] bg-background-surface border border-foreground/[0.08] rounded-xl overflow-hidden transition-all duration-700 group-hover:border-accent-primary/20 group-hover:shadow-[0_0_50px_rgba(201,100,66,0.08)] group-hover:scale-[1.02] select-none relative"
            >
              {/* Floating orb */}
              <div className="absolute top-16 left-6 w-20 h-20 bg-accent-primary/[0.05] rounded-full blur-2xl animate-[float-y_9s_ease-in-out_infinite]" />

              <div className="flex flex-col h-full relative z-10">
                {/* Browser chrome */}
                <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 border-b border-foreground/[0.06] bg-background-surface">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="l-dot w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="l-dot w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="l-dot w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="l-url flex-1 h-5 rounded-md bg-foreground/[0.04] flex items-center px-2.5">
                    <span className="text-sm text-foreground/20 font-mono truncate">votre-landing.io</span>
                  </div>
                </div>

                {/* Scrollable content area */}
                <div className="mockup-scroll-area flex-1 overflow-hidden">
                <div className="mockup-inner flex flex-col">

                {/* Hero section */}
                <div className="flex flex-col items-center text-center px-4 pt-3 pb-2">
                  <div className="l-badge flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-emerald-400/80 font-mono">+127 inscrits cette semaine</span>
                  </div>
                  <p className="l-text text-sm font-bold text-foreground/90 leading-tight">Transformez vos visiteurs</p>
                  <p className="l-text text-sm font-bold leading-tight mb-1">
                    <span className="text-accent-primary">en clients.</span>
                  </p>
                  <p className="l-text text-sm text-foreground/30 leading-relaxed max-w-[200px]">
                    Des pages qui convertissent. Pas juste jolies.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <div className="l-cta bg-foreground text-background text-sm font-semibold px-3 py-1 rounded-md">
                      Lancer mon projet
                    </div>
                    <span className="l-cta text-sm text-foreground/35 border border-foreground/[0.1] px-2.5 py-1 rounded-md">Résultats</span>
                  </div>
                </div>

                {/* Social proof */}
                <div className="l-social flex items-center justify-center gap-3 mb-2 px-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1.5">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400/60 to-violet-600/40 border-2 border-background-surface" />
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400/60 to-blue-600/40 border-2 border-background-surface" />
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400/60 to-emerald-600/40 border-2 border-background-surface" />
                    </div>
                    <span className="text-sm text-foreground/25 font-mono">+2k clients</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-2 h-2 text-amber-400/80" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* ── Extended content (hover scroll) ── */}
                {/* Conversion metrics */}
                <div className="grid grid-cols-3 gap-1.5 px-3 mb-2">
                  {[
                    { label: "Taux conv.", value: "12.4%", color: "text-emerald-400/70" },
                    { label: "Coût/lead", value: "€2.30", color: "text-accent-primary/70" },
                    { label: "ROI", value: "×8.5", color: "text-violet-400/70" },
                  ].map(({ label, value, color }, i) => (
                    <div key={i} className="l-metric rounded-md bg-foreground/[0.02] border border-foreground/[0.06] p-1.5 text-center">
                      <p className={`text-sm font-bold font-mono ${color}`}>{value}</p>
                      <p className="text-sm text-foreground/20 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Before/After */}
                <div className="px-3 pb-3 flex flex-col gap-2">
                  <div className="rounded-lg bg-foreground/[0.02] border border-foreground/[0.06] p-2.5">
                    <p className="text-sm text-foreground/40 font-medium mb-1.5">Avant / Après</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="rounded-md bg-foreground/[0.03] border border-foreground/[0.06] p-1.5 text-center">
                        <p className="text-sm font-bold font-mono text-foreground/30">1.2%</p>
                        <p className="text-sm text-foreground/15">Avant</p>
                      </div>
                      <div className="rounded-md bg-accent-primary/[0.06] border border-accent-primary/15 p-1.5 text-center">
                        <p className="text-sm font-bold font-mono text-accent-primary/80">12.4%</p>
                        <p className="text-sm text-accent-primary/35">Après</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="rounded-lg bg-gradient-to-br from-accent-primary/[0.06] to-accent-primary/[0.02] border border-accent-primary/15 p-3 text-center">
                    <p className="text-sm text-foreground/60 font-bold mb-1">Prêt à convertir ?</p>
                    <div className="bg-foreground text-background text-sm font-semibold px-4 py-1.5 rounded-md inline-block">Commencer</div>
                  </div>
                </div>
                </div>{/* /mockup-inner */}
                </div>{/* /mockup-scroll-area */}
              </div>
            </div>

            <ServiceDetails
              desc="Une page, un objectif : que vos visiteurs passent à l'action. Plus de clics, plus de clients."
              tags={["Conversion", "A/B Testing", "Analytics", "Performance"]}
              price="1&thinsp;500€"
              priceLabel="À partir de"
              href="/landing-pages"
            />
        </div>

        {/* ━━━ COLUMN 3 — Applications SaaS ━━━ */}
        <div className="service-card group flex flex-col">
            <ServiceTitle title="App / SaaS / Logiciel métier" />
            <div
              ref={dashRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="mockup-viewport aspect-[16/10] lg:aspect-auto lg:h-[280px] bg-background-surface border border-foreground/[0.08] rounded-xl overflow-hidden transition-all duration-700 group-hover:border-accent-primary/20 group-hover:shadow-[0_0_50px_rgba(201,100,66,0.08)] group-hover:scale-[1.02] select-none relative"
            >
              {/* Floating orb */}
              <div className="absolute top-20 right-4 w-20 h-20 bg-accent-primary/[0.04] rounded-full blur-2xl animate-[float-y_7s_ease-in-out_infinite_1s]" />

              <div className="flex h-full relative z-10">
                {/* Sidebar */}
                <div className="w-10 shrink-0 border-r border-foreground/[0.06] bg-background-surface flex flex-col items-center py-2.5 gap-1.5">
                  <div className="d-sidebar w-5 h-5 rounded bg-accent-primary/20 border border-accent-primary/30 flex items-center justify-center mb-1">
                    <div className="w-2 h-2 rounded-sm bg-accent-primary/60" />
                  </div>
                  <div className="d-sidebar w-5 h-5 rounded bg-accent-primary/10 border border-accent-primary/20" />
                  <div className="d-sidebar w-5 h-5 rounded bg-foreground/[0.03] border border-foreground/[0.06]" />
                  <div className="d-sidebar w-5 h-5 rounded bg-foreground/[0.03] border border-foreground/[0.06]" />
                  <div className="d-sidebar mt-auto w-5 h-5 rounded-full bg-gradient-to-br from-violet-400/40 to-blue-500/30 border border-foreground/[0.1]" />
                </div>

                {/* Main */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Top bar */}
                  <div className="shrink-0 d-topbar flex items-center justify-between px-3 py-1.5 border-b border-foreground/[0.06] bg-background-surface">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground/55">Votre produit</span>
                      <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-1.5 py-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm text-emerald-400/80 font-mono">Live</span>
                      </div>
                    </div>
                    <div className="h-4 rounded border border-foreground/[0.08] bg-foreground/[0.02] px-1.5 flex items-center">
                      <span className="text-sm text-foreground/20">⌘K</span>
                    </div>
                  </div>

                  {/* Scrollable content area */}
                  <div className="mockup-scroll-area flex-1 overflow-hidden">
                  <div className="mockup-inner flex flex-col p-2.5 gap-1.5">
                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="d-kpi rounded border border-accent-primary/20 bg-accent-primary/[0.05] p-1.5 flex flex-col gap-0.5 relative overflow-hidden">
                        <span className="text-sm text-accent-primary/50 font-mono">MRR</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold text-accent-primary/90 font-mono"><CountUp value={12} prefix="€" suffix="K" /></span>
                          <span className="text-sm text-emerald-400/60">↑24%</span>
                        </div>
                        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent-primary/0 via-accent-primary/50 to-accent-primary/0 animate-[shimmer_3s_ease-in-out_infinite]" style={{ width: "200%" }} />
                      </div>
                      <div className="d-kpi rounded border border-foreground/[0.06] bg-foreground/[0.02] p-1.5 flex flex-col gap-0.5">
                        <span className="text-sm text-foreground/30 font-mono">Users</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold text-foreground/60 font-mono"><CountUp value={847} /></span>
                          <span className="text-sm text-emerald-400/50">↑18%</span>
                        </div>
                      </div>
                      <div className="d-kpi rounded border border-foreground/[0.06] bg-foreground/[0.02] p-1.5 flex flex-col gap-0.5">
                        <span className="text-sm text-foreground/30 font-mono">NPS</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold text-foreground/60 font-mono"><CountUp value={72} /></span>
                          <span className="text-sm text-emerald-400/50">↑5</span>
                        </div>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="rounded border border-foreground/[0.06] bg-foreground/[0.015] p-2 flex flex-col">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-foreground/25 font-mono">Croissance</span>
                        <span className="mrr-label font-mono text-sm font-bold text-accent-primary opacity-0">+342%</span>
                      </div>
                      <div className="h-[50px] flex items-end gap-[3px]">
                        {CHART_BARS.map((h, i) => (
                          <div
                            key={i}
                            className="chart-bar flex-1 rounded-t-sm transition-colors duration-700 group-hover:!bg-accent-primary/80"
                            style={{
                              height: `${h}%`,
                              backgroundColor: `rgba(201,100,66,${0.2 + (i / CHART_BARS.length) * 0.65})`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* ── Extended content (hover scroll) ── */}
                    {/* Activity feed */}
                    <div className="flex flex-col gap-1">
                      <div className="d-feed flex items-center gap-2 px-2 py-1 rounded bg-foreground/[0.02] border border-foreground/[0.04]">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-400/40 to-violet-500/30 shrink-0" />
                        <span className="text-sm text-foreground/35 flex-1 truncate">Nouveau client inscrit</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-emerald-400/50 animate-pulse" />
                          <span className="text-sm font-mono text-emerald-400/60">à l&apos;instant</span>
                        </div>
                      </div>
                      <div className="d-feed flex items-center gap-2 px-2 py-1 rounded bg-foreground/[0.015]">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400/40 to-orange-500/30 shrink-0" />
                        <span className="text-sm text-foreground/30 flex-1 truncate">Paiement reçu — Pro</span>
                        <span className="text-sm font-mono text-accent-primary/50 bg-accent-primary/10 px-1 py-0.5 rounded">€29</span>
                      </div>
                    </div>

                    {/* Revenue breakdown */}
                    <div className="rounded border border-foreground/[0.06] bg-foreground/[0.015] p-2">
                      <span className="text-sm text-foreground/25 font-mono mb-1.5 block">Revenue</span>
                      <div className="flex flex-col gap-1">
                        {[
                          { plan: "Pro", pct: 62, color: "bg-accent-primary/60" },
                          { plan: "Enterprise", pct: 28, color: "bg-violet-500/50" },
                          { plan: "Starter", pct: 10, color: "bg-foreground/20" },
                        ].map((r) => (
                          <div key={r.plan}>
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-sm text-foreground/30 font-mono">{r.plan}</span>
                              <span className="text-sm text-foreground/20 font-mono">{r.pct}%</span>
                            </div>
                            <div className="h-1 rounded-full bg-foreground/[0.06]">
                              <div className={`h-full rounded-full ${r.color} transition-all duration-700`} style={{ width: `${r.pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>{/* /mockup-inner */}
                  </div>{/* /mockup-scroll-area */}
                </div>
              </div>
            </div>

            <ServiceDetails
              desc="Votre propre application en ligne. Tableau de bord, espace client, outils sur-mesure — on construit votre produit de A à Z."
              tags={["Dashboard", "API", "Scalable", "Auth"]}
              price="Sur devis"
              priceLabel=""
              href="/saas"
            />
        </div>
      </div>
    </Section>
  );
}

/* Title + badge — rendered ABOVE the mockup */
function ServiceTitle({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="svc-info-item flex items-center gap-3 mb-4">
      <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">{title}</h3>
      {badge && (
        <span className="inline-flex items-center gap-1.5 text-sm font-mono text-emerald-600 dark:text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full shrink-0">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {badge}
        </span>
      )}
    </div>
  );
}

/* Tags marquee + desc + price — rendered BELOW the mockup */
function ServiceDetails({ desc, tags, price, priceLabel, href }: {
  desc: string; tags: string[]; price: string; priceLabel: string; href: string;
}) {
  return (
    <div className="svc-info pt-3 flex flex-col gap-2 flex-1">
      {/* Tags marquee with fade masks */}
      <div className="svc-info-item relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-2 animate-[scroll-x_15s_linear_infinite] w-max">
          {[...tags, ...tags].map((t, i) => (
            <span key={`${t}-${i}`} className="text-sm font-mono text-foreground/35 bg-foreground/[0.03] px-2.5 py-1 rounded-md border border-foreground/[0.06] whitespace-nowrap shrink-0">{t}</span>
          ))}
        </div>
      </div>
      <p className="svc-info-item text-foreground-muted text-sm leading-relaxed pt-1">{desc}</p>
      <div className="svc-info-item flex items-center justify-between pt-3 mt-auto">
        <div className="flex items-baseline gap-2">
          {priceLabel && <span className="text-sm uppercase tracking-widest font-mono text-foreground/25">{priceLabel}</span>}
          <span className="text-lg font-bold font-mono text-accent-primary" dangerouslySetInnerHTML={{ __html: price }} />
        </div>
        <a href={href} className="inline-flex items-center gap-2 text-sm font-medium text-background bg-foreground hover:bg-foreground/90 px-4 py-2 rounded-lg transition-all duration-500 group/cta">
          Découvrir
          <svg className="w-3.5 h-3.5 transition-transform duration-500 group-hover/cta:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  );
}
