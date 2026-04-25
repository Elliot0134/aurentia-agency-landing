"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/* ──────────────────────────────────────────────
   Shared helpers — mirrored from root HomeServices
   ────────────────────────────────────────────── */

const CHART_BARS = [22, 38, 30, 52, 44, 65, 58, 80, 72, 94];

const popIn = (
  tl: gsap.core.Timeline,
  els: NodeListOf<Element> | Element[] | null,
  opts?: { stagger?: number; duration?: number; y?: number; scale?: number; ease?: string },
) => {
  if (!els || (els instanceof NodeList && els.length === 0)) return;
  const {
    stagger = 0.06,
    duration = 0.35,
    y = 10,
    scale = 0.92,
    ease = "back.out(1.4)",
  } = opts || {};
  tl.fromTo(
    els,
    { opacity: 0, y, scale, transformOrigin: "center center" },
    { opacity: 1, y: 0, scale: 1, stagger, duration, ease },
  );
};

function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useGSAP(() => {
    if (!ref.current || hasAnimated.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      delay: 0.6,
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent =
            prefix + Math.round(obj.val).toLocaleString("fr-FR") + suffix;
        }
      },
      onComplete: () => {
        hasAnimated.current = true;
      },
    });
  });

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ── Inline SVG icons (no emojis) ── */
const PaletteIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);
const SearchIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const SmartphoneIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

/* ──────────────────────────────────────────────
   VITRINE MOCKUP
   ────────────────────────────────────────────── */
export function VitrineMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const v = ref.current;
      const tl = gsap.timeline({ delay: 0.2 });

      popIn(tl, v.querySelectorAll(".v-nav"), {
        stagger: 0.08,
        duration: 0.3,
        y: 6,
        scale: 0.92,
      });
      const hero = v.querySelector(".v-hero");
      if (hero) {
        tl.fromTo(
          hero,
          { opacity: 0, scale: 0.9, y: 8 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.3)" },
        );
      }
      popIn(tl, v.querySelectorAll(".v-text"), {
        stagger: 0.06,
        duration: 0.3,
        y: 6,
        scale: 0.97,
      });
      popIn(tl, v.querySelectorAll(".v-feat"), {
        stagger: 0.08,
        duration: 0.3,
        y: 8,
        scale: 0.88,
      });
      const trust = v.querySelector(".v-trust");
      if (trust) {
        tl.fromTo(
          trust,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 select-none">
      {/* Floating ambient orb */}
      <div className="pointer-events-none absolute right-6 top-8 h-24 w-24 rounded-full bg-[var(--orange-500)]/[0.06] blur-2xl animate-[float-y_8s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Scrollable content area */}
        <div className="mockup-scroll-area flex-1 overflow-hidden">
          <div className="mockup-inner flex flex-col">
            {/* Hero */}
            <div className="v-hero relative mx-3 mt-3 rounded-lg overflow-hidden bg-[var(--orange-500)]/[0.06] border border-[var(--orange-500)]/10 p-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--orange-500)]/[0.08] rounded-full blur-3xl" />
              <div className="relative z-10">
                <p className="v-text text-sm font-bold text-foreground/85 leading-snug">
                  Votre vitrine digitale,
                </p>
                <p className="v-text text-sm font-bold text-foreground/85 leading-snug">
                  votre{" "}
                  <span className="text-[var(--orange-600)]">image de marque.</span>
                </p>
                <p className="v-text text-sm text-foreground/35 mt-1.5">
                  Entreprise · Restaurant · Cabinet
                </p>
              </div>
            </div>

            {/* Features row */}
            <div className="grid grid-cols-3 gap-1.5 px-3 py-2">
              {[
                { icon: <PaletteIcon />, label: "Design" },
                { icon: <SearchIcon />, label: "SEO" },
                { icon: <SmartphoneIcon />, label: "Responsive" },
              ].map(({ icon, label }, i) => (
                <div
                  key={i}
                  className="v-feat rounded-md bg-[var(--orange-500)]/[0.04] border border-[var(--orange-500)]/15 p-2 text-center"
                >
                  <span className="flex justify-center text-[var(--orange-600)]/60 mb-0.5">
                    {icon}
                  </span>
                  <p className="text-sm text-foreground/45 font-medium">{label}</p>
                </div>
              ))}
            </div>

            {/* Extended content (hover scroll) */}
            <div className="px-3 pb-3 flex flex-col gap-2">
              {/* Trust bar */}
              <div className="v-trust flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[var(--orange-500)]/40 to-amber-600/30 border border-background-surface" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400/40 to-violet-600/30 border border-background-surface" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400/40 to-emerald-600/30 border border-background-surface" />
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-2 h-2 text-amber-400/80"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-foreground/25 font-mono">12 sites livrés</span>
              </div>

              {/* About */}
              <div className="rounded-lg bg-foreground/[0.02] border border-foreground/[0.06] p-2.5 flex gap-2.5">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br from-[var(--orange-500)]/15 to-amber-600/10 border border-[var(--orange-500)]/10" />
                <div className="flex-1">
                  <p className="text-sm text-foreground/55 font-bold mb-0.5">Notre histoire</p>
                  <p className="text-sm text-foreground/30 leading-relaxed">
                    Accompagnement digital sur-mesure depuis 2019.
                  </p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   LANDING MOCKUP
   ────────────────────────────────────────────── */
export function LandingMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const l = ref.current;
      const tl = gsap.timeline({ delay: 0.3 });

      popIn(tl, l.querySelectorAll(".l-nav"), {
        stagger: 0.06,
        duration: 0.3,
        y: 4,
        scale: 0.95,
      });
      const badge = l.querySelector(".l-badge");
      if (badge) {
        tl.fromTo(
          badge,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" },
        );
      }
      popIn(tl, l.querySelectorAll(".l-text"), {
        stagger: 0.06,
        duration: 0.3,
        y: 6,
        scale: 0.97,
      });
      popIn(tl, l.querySelectorAll(".l-cta"), {
        stagger: 0.08,
        duration: 0.3,
        y: 6,
        scale: 0.92,
      });
      const social = l.querySelector(".l-social");
      if (social) {
        tl.fromTo(
          social,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
      }
      popIn(tl, l.querySelectorAll(".l-metric"), {
        stagger: 0.08,
        duration: 0.3,
        y: 8,
        scale: 0.88,
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 select-none">
      {/* Floating orb */}
      <div className="pointer-events-none absolute left-6 top-16 h-20 w-20 rounded-full bg-[var(--orange-500)]/[0.05] blur-2xl animate-[float-y_9s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Scrollable content area */}
        <div className="mockup-scroll-area flex-1 overflow-hidden">
          <div className="mockup-inner flex flex-col">
            {/* Hero */}
            <div className="flex flex-col items-center text-center px-4 pt-4 pb-2">
              <div className="l-badge flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-500/80 font-mono">
                  +127 inscrits cette semaine
                </span>
              </div>
              <p className="l-text text-sm font-bold text-foreground/90 leading-tight">
                Transformez vos visiteurs
              </p>
              <p className="l-text text-sm font-bold leading-tight mb-1">
                <span className="text-[var(--orange-600)]">en clients.</span>
              </p>
              <p className="l-text text-sm text-foreground/30 leading-relaxed max-w-[200px]">
                Des pages qui convertissent. Pas juste jolies.
              </p>
              <div className="flex gap-1.5 mt-2">
                <div className="l-cta rounded-md bg-foreground px-2.5 py-1 text-sm font-semibold text-background">
                  Commencer
                </div>
                <span className="l-cta rounded-md border border-foreground/[0.15] px-2 py-1 text-sm text-foreground/45">
                  Démo
                </span>
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
                  <svg
                    key={i}
                    className="w-2 h-2 text-amber-400/80"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Conversion metrics */}
            <div className="grid grid-cols-3 gap-1.5 px-3 mb-2">
              {[
                { label: "Taux conv.", value: "12.4%", color: "text-emerald-500/80" },
                { label: "Coût/lead", value: "€2.30", color: "text-[var(--orange-600)]/80" },
                { label: "ROI", value: "×8.5", color: "text-violet-500/80" },
              ].map(({ label, value, color }, i) => (
                <div
                  key={i}
                  className="l-metric rounded-md bg-foreground/[0.02] border border-foreground/[0.06] p-1.5 text-center"
                >
                  <p className={`text-sm font-bold font-mono ${color}`}>{value}</p>
                  <p className="text-sm text-foreground/25 mt-0.5">{label}</p>
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
                  <div className="rounded-md bg-[var(--orange-500)]/[0.06] border border-[var(--orange-500)]/15 p-1.5 text-center">
                    <p className="text-sm font-bold font-mono text-[var(--orange-600)]/80">
                      12.4%
                    </p>
                    <p className="text-sm text-[var(--orange-600)]/40">Après</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-lg bg-gradient-to-br from-[var(--orange-500)]/[0.06] to-[var(--orange-500)]/[0.02] border border-[var(--orange-500)]/15 p-3 text-center">
                <p className="text-sm text-foreground/60 font-bold mb-1">Prêt à convertir ?</p>
                <div className="bg-foreground text-background text-sm font-semibold px-4 py-1.5 rounded-md inline-block">
                  Commencer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   DASHBOARD MOCKUP
   ────────────────────────────────────────────── */
export function DashMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const d = ref.current;
      const tl = gsap.timeline({ delay: 0.4 });

      popIn(tl, d.querySelectorAll(".d-sidebar"), {
        stagger: 0.05,
        duration: 0.25,
        y: 6,
        scale: 0.88,
      });
      const topbar = d.querySelector(".d-topbar");
      if (topbar) {
        tl.fromTo(
          topbar,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          "-=0.1",
        );
      }
      popIn(tl, d.querySelectorAll(".d-kpi"), {
        stagger: 0.08,
        duration: 0.3,
        y: 8,
        scale: 0.88,
      });
      const bars = d.querySelectorAll(".chart-bar");
      if (bars.length) {
        tl.fromTo(
          bars,
          { scaleY: 0, transformOrigin: "bottom center" },
          {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)",
          },
        );
      }
      popIn(tl, d.querySelectorAll(".d-feed"), {
        stagger: 0.08,
        duration: 0.3,
        y: 6,
        scale: 0.94,
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 select-none">
      {/* Floating orb */}
      <div className="pointer-events-none absolute right-4 top-20 h-20 w-20 rounded-full bg-[var(--orange-500)]/[0.04] blur-2xl animate-[float-y_7s_ease-in-out_infinite_1s]" />

      <div className="relative z-10 flex h-full">
        {/* Sidebar */}
        <div className="w-10 shrink-0 border-r border-foreground/[0.06] bg-white dark:bg-background-surface flex flex-col items-center py-2.5 gap-1.5">
          <div className="d-sidebar w-5 h-5 rounded bg-[var(--orange-500)]/20 border border-[var(--orange-500)]/30 flex items-center justify-center mb-1">
            <div className="w-2 h-2 rounded-sm bg-[var(--orange-600)]/60" />
          </div>
          <div className="d-sidebar w-5 h-5 rounded bg-[var(--orange-500)]/10 border border-[var(--orange-500)]/20" />
          <div className="d-sidebar w-5 h-5 rounded bg-foreground/[0.03] border border-foreground/[0.06]" />
          <div className="d-sidebar w-5 h-5 rounded bg-foreground/[0.03] border border-foreground/[0.06]" />
          <div className="d-sidebar mt-auto w-5 h-5 rounded-full bg-gradient-to-br from-violet-400/40 to-blue-500/30 border border-foreground/[0.1]" />
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Scrollable content area */}
          <div className="mockup-scroll-area flex-1 overflow-hidden">
            <div className="mockup-inner flex flex-col p-2.5 gap-1.5">
              {/* KPIs */}
              <div className="grid grid-cols-3 gap-1.5">
                <div className="d-kpi rounded border border-[var(--orange-500)]/20 bg-[var(--orange-500)]/[0.05] p-1.5 flex flex-col gap-0.5 relative overflow-hidden">
                  <span className="text-sm text-[var(--orange-600)]/60 font-mono">MRR</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-[var(--orange-600)] font-mono">
                      <CountUp value={12} prefix="€" suffix="K" />
                    </span>
                    <span className="text-sm text-emerald-500/70">↑24%</span>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--orange-500)]/0 via-[var(--orange-500)]/50 to-[var(--orange-500)]/0 animate-[shimmer_3s_ease-in-out_infinite]"
                    style={{ width: "200%" }}
                  />
                </div>
                <div className="d-kpi rounded border border-foreground/[0.06] bg-foreground/[0.02] p-1.5 flex flex-col gap-0.5">
                  <span className="text-sm text-foreground/30 font-mono">Users</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-foreground/60 font-mono">
                      <CountUp value={847} />
                    </span>
                    <span className="text-sm text-emerald-500/60">↑18%</span>
                  </div>
                </div>
                <div className="d-kpi rounded border border-foreground/[0.06] bg-foreground/[0.02] p-1.5 flex flex-col gap-0.5">
                  <span className="text-sm text-foreground/30 font-mono">NPS</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-foreground/60 font-mono">
                      <CountUp value={72} />
                    </span>
                    <span className="text-sm text-emerald-500/60">↑5</span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="rounded border border-foreground/[0.06] bg-foreground/[0.015] p-2 flex flex-col">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-foreground/25 font-mono">Croissance</span>
                  <span className="font-mono text-sm font-bold text-[var(--orange-600)]">
                    +342%
                  </span>
                </div>
                <div className="h-[50px] flex items-end gap-[3px]">
                  {CHART_BARS.map((h, i) => (
                    <div
                      key={i}
                      className="chart-bar flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        backgroundColor: `rgba(228,85,18,${0.2 + (i / CHART_BARS.length) * 0.65})`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Activity feed */}
              <div className="flex flex-col gap-1">
                <div className="d-feed flex items-center gap-2 px-2 py-1 rounded bg-foreground/[0.02] border border-foreground/[0.04]">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-400/40 to-violet-500/30 shrink-0" />
                  <span className="text-sm text-foreground/35 flex-1 truncate">
                    Nouveau client inscrit
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-emerald-400/50 animate-pulse" />
                    <span className="text-sm font-mono text-emerald-500/70">à l&apos;instant</span>
                  </div>
                </div>
                <div className="d-feed flex items-center gap-2 px-2 py-1 rounded bg-foreground/[0.015]">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400/40 to-orange-500/30 shrink-0" />
                  <span className="text-sm text-foreground/30 flex-1 truncate">
                    Paiement reçu — Pro
                  </span>
                  <span className="text-sm font-mono text-[var(--orange-600)]/70 bg-[var(--orange-500)]/10 px-1 py-0.5 rounded">
                    €29
                  </span>
                </div>
              </div>

              {/* Revenue breakdown */}
              <div className="rounded border border-foreground/[0.06] bg-foreground/[0.015] p-2">
                <span className="text-sm text-foreground/25 font-mono mb-1.5 block">Revenue</span>
                <div className="flex flex-col gap-1">
                  {[
                    { plan: "Pro", pct: 62, color: "bg-[var(--orange-500)]/60" },
                    { plan: "Enterprise", pct: 28, color: "bg-violet-500/50" },
                    { plan: "Starter", pct: 10, color: "bg-foreground/20" },
                  ].map((r) => (
                    <div key={r.plan}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-sm text-foreground/30 font-mono">{r.plan}</span>
                        <span className="text-sm text-foreground/20 font-mono">{r.pct}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-foreground/[0.06]">
                        <div
                          className={`h-full rounded-full ${r.color} transition-all duration-700`}
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   REFONTE MOCKUP — Before / After d'un produit SaaS
   ────────────────────────────────────────────── */
export function RefonteMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;
      const tl = gsap.timeline({ delay: 0.3 });

      const before = el.querySelector(".r-before");
      if (before) {
        tl.fromTo(
          before,
          { opacity: 0, x: -6 },
          { opacity: 0.6, x: 0, duration: 0.4, ease: "power2.out" },
        );
      }
      const arrow = el.querySelector(".r-arrow");
      if (arrow) {
        tl.fromTo(
          arrow,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" },
        );
      }
      const after = el.querySelector(".r-after");
      if (after) {
        tl.fromTo(
          after,
          { opacity: 0, x: 6 },
          { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" },
        );
      }
      popIn(tl, el.querySelectorAll(".r-metric"), {
        stagger: 0.07,
        duration: 0.3,
        y: 6,
        scale: 0.9,
      });
      popIn(tl, el.querySelectorAll(".r-change"), {
        stagger: 0.06,
        duration: 0.3,
        y: 4,
        scale: 0.96,
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 select-none">
      <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full bg-[var(--orange-500)]/[0.08] blur-2xl animate-[float-y_7s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Scrollable */}
        <div className="mockup-scroll-area flex-1 overflow-hidden">
          <div className="mockup-inner flex flex-col">
            {/* Before ↔ After split */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 px-3 pt-3 pb-2">
              <div className="r-before rounded-md border border-dashed border-foreground/20 bg-foreground/[0.02] p-2 flex flex-col gap-1">
                <span className="text-sm font-mono font-bold text-foreground/40 tracking-widest">
                  AVANT
                </span>
                <div className="mt-1 h-1.5 w-[80%] rounded-sm bg-foreground/25" />
                <div className="h-1.5 w-[60%] rounded-sm bg-foreground/20" />
                <div className="h-1.5 w-[70%] rounded-sm bg-foreground/20" />
                <div className="mt-auto flex gap-1">
                  <div className="h-3 w-8 rounded-sm bg-foreground/25" />
                  <div className="h-3 w-6 rounded-sm bg-foreground/15" />
                </div>
              </div>

              <div className="r-arrow flex items-center justify-center">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--orange-500)]/15 ring-1 ring-[var(--orange-500)]/30">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--orange-600)]"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="r-after rounded-md border border-[var(--orange-500)]/30 bg-[var(--orange-500)]/[0.04] p-2 flex flex-col gap-1 shadow-[0_0_20px_rgba(228,85,18,0.08)]">
                <span className="text-sm font-mono font-bold text-[var(--orange-600)] tracking-widest">
                  APRÈS
                </span>
                <div className="mt-1 h-1.5 w-[85%] rounded-sm bg-foreground/70" />
                <div className="h-1.5 w-[70%] rounded-sm bg-[var(--orange-500)]/60" />
                <div className="h-1.5 w-[80%] rounded-sm bg-foreground/55" />
                <div className="mt-auto flex gap-1">
                  <div className="h-3 w-10 rounded-md bg-foreground" />
                  <div className="h-3 w-6 rounded-md border border-foreground/20" />
                </div>
              </div>
            </div>

            {/* Metrics delta */}
            <div className="grid grid-cols-3 gap-1.5 px-3 pb-2">
              {[
                { label: "Perf", before: "2.4s", after: "0.4s", delta: "-83%" },
                { label: "Bugs", before: "47", after: "3", delta: "-94%" },
                { label: "UX", before: "62", after: "96", delta: "+55%" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="r-metric rounded-md border border-foreground/[0.06] bg-foreground/[0.02] p-1.5 flex flex-col gap-0.5"
                >
                  <span className="text-sm text-foreground/30 font-mono">{m.label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-foreground/30 font-mono line-through">
                      {m.before}
                    </span>
                    <span className="text-sm font-bold font-mono text-foreground">{m.after}</span>
                  </div>
                  <span className="text-sm text-emerald-500/75 font-mono">{m.delta}</span>
                </div>
              ))}
            </div>

            {/* Changelog */}
            <div className="px-3 pb-3 flex flex-col gap-1">
              <span className="text-sm font-mono text-foreground/35 uppercase tracking-widest">
                Ce qu&apos;on a fait
              </span>
              {[
                "Refactor routing & state",
                "Design system unifié",
                "Migration Next.js 15",
                "Optimisation DB + index",
              ].map((c, i) => (
                <div key={i} className="r-change flex items-center gap-1.5">
                  <div className="flex h-3 w-3 shrink-0 items-center justify-center rounded-sm bg-[var(--orange-500)]">
                    <svg
                      width="7"
                      height="7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground/55">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   AI INTEGRATION MOCKUP — Claude intégré dans un SaaS
   ────────────────────────────────────────────── */
export function AIIntegrationMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;
      const tl = gsap.timeline({ delay: 0.3 });

      popIn(tl, el.querySelectorAll(".ai-msg"), {
        stagger: 0.18,
        duration: 0.4,
        y: 8,
        scale: 0.96,
      });
      popIn(tl, el.querySelectorAll(".ai-tool"), {
        stagger: 0.12,
        duration: 0.35,
        y: 5,
        scale: 0.9,
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 select-none">
      <div className="pointer-events-none absolute left-1/2 top-4 h-20 w-20 -translate-x-1/2 rounded-full bg-[var(--orange-500)]/[0.06] blur-2xl animate-[float-y_8s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Chat */}
        <div className="mockup-scroll-area flex-1 overflow-hidden">
          <div className="mockup-inner flex flex-col gap-1.5 p-2.5">
            <div className="ai-msg ml-auto max-w-[85%]">
              <div className="rounded-xl rounded-tr-sm bg-foreground text-background px-2.5 py-1.5">
                <span className="text-sm">Combien de clients premium ?</span>
              </div>
            </div>

            <div className="ai-msg flex items-start gap-1.5">
              <div className="w-4 h-4 mt-0.5 shrink-0 rounded-full bg-gradient-to-br from-[var(--orange-400)] to-[var(--orange-600)]" />
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-sm italic text-foreground/55">Je vérifie votre base…</span>

                <div className="ai-tool rounded-md border border-[var(--orange-500)]/25 bg-[var(--orange-500)]/[0.05] px-2 py-1 font-mono">
                  <div className="flex items-center gap-1 mb-0.5">
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[var(--orange-600)]"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <span className="text-sm font-semibold text-[var(--orange-600)]/85">
                      search_customers
                    </span>
                  </div>
                  <div className="text-sm text-foreground/40 pl-3">
                    tier: <span className="text-emerald-500/80">&quot;premium&quot;</span>
                  </div>
                </div>

                <div className="ai-tool rounded-md bg-foreground/[0.03] border border-foreground/[0.05] px-2 py-0.5 flex items-center justify-between">
                  <span className="text-sm text-foreground/55 font-mono">→ 847 résultats</span>
                  <span className="text-sm text-emerald-500/70 font-mono">12ms</span>
                </div>
              </div>
            </div>

            <div className="ai-msg flex items-start gap-1.5">
              <div className="w-4 h-4 mt-0.5 shrink-0 rounded-full bg-gradient-to-br from-[var(--orange-400)] to-[var(--orange-600)]" />
              <div className="flex-1 rounded-xl rounded-tl-sm border border-foreground/[0.08] bg-background/60 px-2.5 py-1.5">
                <span className="text-sm text-foreground/80">
                  Vous avez{" "}
                  <span className="font-bold text-[var(--orange-600)]">847 clients premium</span>,
                  soit <span className="font-bold">23%</span> de votre base.
                </span>
              </div>
            </div>

            <div className="ai-tool rounded-md border border-foreground/[0.06] bg-foreground/[0.015] px-2 py-1 flex items-center gap-1.5 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--orange-500)] animate-pulse" />
              <span className="text-sm text-foreground/50">suggest_upsell</span>
              <span className="text-sm text-foreground/30 ml-auto">→ email_flow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   FORMATION MOCKUP — Plateforme de cours vidéo
   ────────────────────────────────────────────── */
export function FormationMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;
      const tl = gsap.timeline({ delay: 0.3 });

      const player = el.querySelector(".f-player");
      if (player) {
        tl.fromTo(
          player,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.3)" },
        );
      }
      const playBtn = el.querySelector(".f-play");
      if (playBtn) {
        tl.fromTo(
          playBtn,
          { scale: 0 },
          { scale: 1, duration: 0.4, ease: "back.out(2.5)" },
          "-=0.2",
        );
      }
      const progress = el.querySelector(".f-progress-fill");
      if (progress) {
        tl.fromTo(
          progress,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power2.out" },
          "-=0.2",
        );
      }
      popIn(tl, el.querySelectorAll(".f-chapter"), {
        stagger: 0.06,
        duration: 0.3,
        y: 5,
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 select-none">
      <div className="pointer-events-none absolute right-4 top-4 h-20 w-20 rounded-full bg-[var(--orange-500)]/[0.05] blur-2xl animate-[float-y_7s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mockup-scroll-area flex-1 overflow-hidden">
          <div className="mockup-inner flex flex-col">
            <div className="f-player relative mx-3 mt-3 aspect-video rounded-md overflow-hidden bg-gradient-to-br from-foreground/10 via-foreground/5 to-[var(--orange-500)]/15 border border-foreground/[0.08]">
              <div className="pointer-events-none absolute left-1/2 top-1/3 h-16 w-16 -translate-x-1/2 rounded-full bg-[var(--orange-500)]/20 blur-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="f-play w-9 h-9 rounded-full bg-foreground/90 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-background translate-x-[1px]"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-1.5 left-2 right-2 flex items-end justify-between">
                <span className="text-sm font-bold text-foreground/80">Ton premier skill</span>
                <span className="text-sm font-mono text-foreground/50">04:23 / 12:40</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground/10">
                <div
                  className="f-progress-fill h-full origin-left bg-[var(--orange-500)]"
                  style={{ width: "35%" }}
                />
              </div>
            </div>

            <div className="px-3 pt-2 pb-3 flex flex-col gap-1">
              <span className="text-sm font-mono text-foreground/35 uppercase tracking-widest">
                Chapitres
              </span>
              {[
                { n: "01", label: "Bases de Claude", status: "done" as const },
                { n: "02", label: "CLAUDE.md & contexte", status: "done" as const },
                { n: "03", label: "Ton premier skill", status: "current" as const },
                { n: "04", label: "Hooks & MCP", status: "locked" as const },
                { n: "05", label: "Sub-agents", status: "locked" as const },
              ].map((c, i) => (
                <div
                  key={i}
                  className={`f-chapter flex items-center gap-2 rounded-md px-2 py-1 ${
                    c.status === "current"
                      ? "bg-[var(--orange-500)]/[0.06] border border-[var(--orange-500)]/25"
                      : "border border-transparent"
                  }`}
                >
                  <span className="text-sm font-mono text-foreground/30">{c.n}</span>
                  <span
                    className={`text-sm flex-1 ${
                      c.status === "current"
                        ? "text-[var(--orange-600)] font-semibold"
                        : c.status === "done"
                          ? "text-foreground/45"
                          : "text-foreground/25"
                    }`}
                  >
                    {c.label}
                  </span>
                  {c.status === "done" && (
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg
                        width="7"
                        height="7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-emerald-500"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                  )}
                  {c.status === "current" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--orange-500)] animate-pulse" />
                  )}
                  {c.status === "locked" && (
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-foreground/25"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   AUDIT MOCKUP — Rapport d'audit IA
   ────────────────────────────────────────────── */
export function AuditMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;
      const tl = gsap.timeline({ delay: 0.3 });

      const score = el.querySelector(".a-score");
      if (score) {
        tl.fromTo(
          score,
          { opacity: 0, y: 10, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.3)" },
        );
      }

      const bars = el.querySelectorAll<HTMLElement>(".a-bar-fill");
      bars.forEach((bar, i) => {
        const target = parseFloat(bar.dataset.target || "0");
        tl.fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: target, duration: 0.8, ease: "power2.out" },
          i === 0 ? "-=0.2" : "<0.05",
        );
      });

      popIn(tl, el.querySelectorAll(".a-cat"), { stagger: 0.05, duration: 0.3, y: 4 });
      popIn(tl, el.querySelectorAll(".a-finding"), { stagger: 0.07, duration: 0.3, y: 5 });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 select-none">
      <div className="pointer-events-none absolute left-4 top-4 h-20 w-20 rounded-full bg-[var(--orange-500)]/[0.06] blur-2xl animate-[float-y_8s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mockup-scroll-area flex-1 overflow-hidden">
          <div className="mockup-inner flex flex-col gap-1.5 p-2.5">
            <div className="a-score relative overflow-hidden flex items-center gap-3 rounded-md border border-[var(--orange-500)]/25 bg-[var(--orange-500)]/[0.05] p-2">
              <div className="pointer-events-none absolute -right-4 -top-4 w-16 h-16 rounded-full bg-[var(--orange-500)]/10 blur-xl" />
              <div className="relative flex flex-col">
                <span className="text-sm font-mono text-[var(--orange-600)]/55 uppercase tracking-widest">
                  Score
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-mono text-[var(--orange-600)]">
                    <CountUp value={72} />
                  </span>
                  <span className="text-sm font-mono text-foreground/40">/100</span>
                </div>
              </div>
              <div className="relative flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/55">Maturité IA</span>
                  <span className="text-sm text-emerald-500/80 font-mono">↑ +24%</span>
                </div>
                <div className="h-1 rounded-full bg-foreground/[0.06] overflow-hidden">
                  <div
                    className="a-bar-fill h-full origin-left rounded-full bg-gradient-to-r from-[var(--orange-400)] to-[var(--orange-600)]"
                    data-target="0.72"
                    style={{ transform: "scaleX(0.72)" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-0.5">
              {[
                { label: "Workflows", score: 0.85, status: "good" as const },
                { label: "Automations", score: 0.68, status: "ok" as const },
                { label: "Coûts IA", score: 0.45, status: "warn" as const },
                { label: "Compliance", score: 0.58, status: "ok" as const },
              ].map((c, i) => (
                <div key={i} className="a-cat flex items-center gap-2">
                  <span className="text-sm text-foreground/55 w-20 shrink-0">{c.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                    <div
                      className={`a-bar-fill h-full origin-left rounded-full ${
                        c.status === "good"
                          ? "bg-emerald-500/75"
                          : c.status === "ok"
                            ? "bg-[var(--orange-500)]/75"
                            : "bg-red-500/65"
                      }`}
                      data-target={c.score.toString()}
                      style={{ transform: `scaleX(${c.score})` }}
                    />
                  </div>
                  <span className="text-sm font-mono font-bold text-foreground/55 w-7 text-right">
                    {Math.round(c.score * 100)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-0.5 pt-1">
              <span className="text-sm font-mono text-foreground/35 uppercase tracking-widest">
                Points clés
              </span>
              {[
                { label: "Workflow Notion sous-exploité", severity: "high" as const },
                { label: "Coûts GPT-4 non monitorés", severity: "critical" as const },
                { label: "RAG pipeline manquant", severity: "medium" as const },
              ].map((f, i) => (
                <div
                  key={i}
                  className="a-finding flex items-center gap-1.5 rounded-md border border-foreground/[0.06] bg-foreground/[0.015] px-2 py-1"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      f.severity === "critical"
                        ? "bg-red-500"
                        : f.severity === "high"
                          ? "bg-[var(--orange-500)]"
                          : "bg-yellow-500/80"
                    }`}
                  />
                  <span className="text-sm text-foreground/55 flex-1 truncate">{f.label}</span>
                  <span
                    className={`text-sm font-mono uppercase tracking-widest ${
                      f.severity === "critical"
                        ? "text-red-500/75"
                        : f.severity === "high"
                          ? "text-[var(--orange-600)]/75"
                          : "text-yellow-600/75"
                    }`}
                  >
                    {f.severity === "critical" ? "crit." : f.severity === "high" ? "haut" : "moy."}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   IMPLEMENTATION MOCKUP — Terminal de déploiement skill
   ────────────────────────────────────────────── */
export function ImplementationMockup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;
      const tl = gsap.timeline({ delay: 0.3 });

      popIn(tl, el.querySelectorAll(".i-line"), {
        stagger: 0.11,
        duration: 0.22,
        y: 3,
        scale: 1,
        ease: "power2.out",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="absolute inset-0 select-none">
      <div className="pointer-events-none absolute right-4 bottom-4 h-20 w-20 rounded-full bg-[var(--orange-500)]/[0.05] blur-2xl animate-[float-y_9s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col font-mono">
        <div className="mockup-scroll-area flex-1 overflow-hidden">
          <div className="mockup-inner flex flex-col gap-0.5 p-2.5 text-sm">
            <div className="i-line flex gap-1.5">
              <span className="shrink-0 text-[var(--orange-600)]">$</span>
              <span className="text-foreground/85">aurentia deploy my-skill</span>
            </div>

            <div className="i-line flex items-center gap-1.5 pl-3 pt-1">
              <div className="h-1 w-1 rounded-full bg-[var(--orange-500)]" />
              <span className="text-foreground/50">Compiling skill…</span>
            </div>
            <div className="i-line flex items-center gap-1.5 pl-3">
              <span className="text-emerald-500/90">✓</span>
              <span className="text-foreground/70">skill.md parsed</span>
              <span className="ml-auto text-foreground/30">12ms</span>
            </div>
            <div className="i-line flex items-center gap-1.5 pl-3">
              <span className="text-emerald-500/90">✓</span>
              <span className="text-foreground/70">references/ bundled</span>
              <span className="ml-auto text-foreground/30">41ms</span>
            </div>

            <div className="i-line flex items-center gap-1.5 pl-3 pt-1">
              <div className="h-1 w-1 rounded-full bg-[var(--orange-500)]" />
              <span className="text-foreground/50">Running tests…</span>
            </div>
            <div className="i-line flex items-center gap-1.5 pl-3">
              <span className="text-emerald-500/90">✓</span>
              <span className="text-foreground/70">24 tests passed</span>
              <span className="ml-auto text-foreground/30">1.8s</span>
            </div>

            <div className="i-line flex items-center gap-1.5 pl-3 pt-1">
              <div className="h-1 w-1 rounded-full bg-[var(--orange-500)] animate-pulse" />
              <span className="text-[var(--orange-600)]">Deploying…</span>
            </div>
            <div className="i-line flex items-center gap-1.5 pl-3">
              <span className="text-emerald-500/90">✓</span>
              <span className="text-foreground/70">~/.claude/skills/aurentia</span>
            </div>
            <div className="i-line flex items-center gap-1.5 pl-3">
              <span className="text-emerald-500/90">✓</span>
              <span className="text-foreground/70">CLAUDE.md updated</span>
            </div>

            <div className="i-line mt-1 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/[0.06] px-2 py-1">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-500 shrink-0"
              >
                <path d="M5 12l5 5L20 7" />
              </svg>
              <span className="text-foreground/85 font-semibold">Deployed successfully</span>
              <span className="ml-auto text-emerald-500/80">2m 14s</span>
            </div>

            <div className="i-line flex items-center gap-1.5 pt-1">
              <span className="shrink-0 text-[var(--orange-600)]">$</span>
              <span className="inline-block w-1.5 h-3 bg-foreground/60 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
