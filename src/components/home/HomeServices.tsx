"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Shared style tokens ──
const BLOCK =
  "border border-foreground/[0.08] bg-foreground/[0.03] rounded";
const BLOCK_LG =
  "border border-foreground/[0.08] bg-foreground/[0.03] rounded-lg";
const BLOCK_XL =
  "border border-foreground/[0.08] bg-foreground/[0.03] rounded-xl";

// ── Code lines for Landing Pages card ──
const CODE_LINES = [
  { tokens: [{ text: "export default ", color: "keyword" }, { text: "function ", color: "keyword" }, { text: "Landing", color: "fn" }, { text: "() {", color: "punct" }] },
  { tokens: [{ text: "  const ", color: "keyword" }, { text: "rate", color: "var" }, { text: " = ", color: "punct" }, { text: "useConversion", color: "fn" }, { text: "();", color: "punct" }] },
  { tokens: [] },
  { tokens: [{ text: "  return ", color: "keyword" }, { text: "(", color: "punct" }] },
  { tokens: [{ text: "    <", color: "punct" }, { text: "Hero", color: "comp" }, { text: ' cta', color: "attr" }, { text: '="', color: "punct" }, { text: "Démarrer", color: "string" }, { text: '"', color: "punct" }, { text: " />", color: "punct" }] },
  { tokens: [{ text: "    <", color: "punct" }, { text: "Pricing", color: "comp" }, { text: " />", color: "punct" }] },
  { tokens: [{ text: "    <", color: "punct" }, { text: "Social", color: "comp" }, { text: " proof", color: "attr" }, { text: "={", color: "punct" }, { text: "★★★★★", color: "string" }, { text: "}", color: "punct" }, { text: " />", color: "punct" }] },
  { tokens: [{ text: "  );", color: "punct" }] },
  { tokens: [{ text: "}", color: "punct" }] },
];

const TOKEN_COLORS: Record<string, string> = {
  keyword: "rgba(156,135,245,0.8)",
  fn: "rgba(250,249,246,0.8)",
  var: "rgba(250,249,246,0.7)",
  punct: "rgba(250,249,246,0.35)",
  comp: "rgba(201,100,66,0.9)",
  attr: "rgba(250,249,246,0.55)",
  string: "rgba(134,194,147,0.8)",
};

// ── Chart data for SaaS card ──
const CHART_BARS = [
  22, 38, 30, 52, 44, 65, 58, 80, 72, 94,
];

export function HomeServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // ── Cards stagger entrance ──
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // ── Card 1: Wireframe build + color fill ──
      if (mockupRef.current) {
        const blocks = mockupRef.current.querySelectorAll(".build-block");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: mockupRef.current, start: "top 80%" },
        });
        tl.fromTo(
          blocks,
          { opacity: 0, scale: 0.85, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: "back.out(1.4)",
          }
        );
        tl.to(
          blocks,
          {
            borderColor: "rgba(201,100,66,0.25)",
            backgroundColor: "rgba(201,100,66,0.06)",
            stagger: 0.04,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "+=0.15"
        );
      }

      // ── Card 2: Code typing ──
      if (codeRef.current) {
        const chars = codeRef.current.querySelectorAll(".code-char");
        const cursor = codeRef.current.querySelector(".typing-cursor");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: codeRef.current, start: "top 80%" },
        });
        tl.fromTo(
          chars,
          { display: "none" },
          { display: "inline", stagger: 0.02, ease: "none" }
        );
        if (cursor) tl.to(cursor, { opacity: 1, duration: 0.1 }, 0);
      }

      // ── Card 3: Dashboard bars + label ──
      if (dashRef.current) {
        const bars = dashRef.current.querySelectorAll(".chart-bar");
        const label = dashRef.current.querySelector(".mrr-label");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: dashRef.current, start: "top 80%" },
        });
        tl.fromTo(
          bars,
          { scaleY: 0, transformOrigin: "bottom center" },
          { scaleY: 1, stagger: 0.06, ease: "back.out(1.7)", duration: 0.8 }
        );
        if (label) {
          tl.fromTo(
            label,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );
        }
      }
    },
    { scope: containerRef }
  );

  /* ── Shared sub-components ── */
  const IllustrationFrame = ({
    children,
    innerRef,
    className = "",
  }: {
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
    className?: string;
  }) => (
    <div
      ref={innerRef}
      className={`h-[300px] bg-background/40 border border-foreground/[0.06] rounded-2xl overflow-hidden transition-all duration-700 group-hover:border-accent-primary/15 group-hover:shadow-[0_0_40px_rgba(201,100,66,0.05)] pointer-events-none select-none ${className}`}
    >
      {children}
    </div>
  );

  const InfoBlock = ({
    title,
    description,
    tags,
    price,
    priceLabel,
  }: {
    title: string;
    description: string;
    tags: readonly string[];
    price: string;
    priceLabel: string;
  }) => (
    <div className="pt-6 flex flex-col gap-3">
      <h3 className="text-2xl font-bold text-foreground leading-tight">
        {title}
      </h3>
      <p className="text-foreground-muted text-sm leading-relaxed line-clamp-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-sm font-mono text-foreground/35 bg-foreground/[0.03] px-2.5 py-1 rounded-md border border-foreground/[0.06] transition-colors duration-500 group-hover:border-accent-primary/15 group-hover:text-foreground/50"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-baseline gap-2 pt-2">
        {priceLabel && (
          <span className="text-sm uppercase tracking-widest font-mono text-foreground/25">
            {priceLabel}
          </span>
        )}
        <span className="text-xl font-bold font-mono text-accent-secondary">
          {price}
        </span>
      </div>
    </div>
  );

  return (
    <Section
      ref={containerRef}
      id="services"
      theme="dark"
      className="py-32 section-divider-orange relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* ── Header ── */}
      <div className="mb-20 relative z-10 max-w-3xl">
        <BlurReveal>
          <span className="inline-block text-sm font-mono uppercase tracking-[0.2em] text-accent-primary/70 mb-6">
            Services
          </span>
        </BlurReveal>
        <TextReveal
          text="Tout ce dont votre business a besoin."
          elementType="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        />
        <BlurReveal delay={0.3}>
          <p className="text-foreground-muted text-lg md:text-xl leading-relaxed">
            Des fondations solides aux expériences sur-mesure. On gère toute la
            chaîne tech pour vous.
          </p>
        </BlurReveal>
      </div>

      {/* ── Cards Grid ── */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10"
      >
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Card 1 — Sites Vitrines
            Browser mockup with nav, hero, CTA, grid
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SpotlightCard className="service-card group gradient-border-orange flex flex-col">
          <div className="flex flex-col h-full p-7 md:p-8">
            <span className="text-sm font-mono text-accent-primary/40 mb-6">
              01
            </span>

            <IllustrationFrame innerRef={mockupRef}>
              <div className="flex flex-col h-full p-4">
                {/* Browser chrome */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex gap-1.5 shrink-0">
                    <div className={`build-block w-2.5 h-2.5 rounded-full ${BLOCK}`} />
                    <div className={`build-block w-2.5 h-2.5 rounded-full ${BLOCK}`} />
                    <div className={`build-block w-2.5 h-2.5 rounded-full ${BLOCK}`} />
                  </div>
                  <div className={`build-block flex-1 h-5 ${BLOCK_LG}`} />
                </div>

                {/* Navigation bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`build-block w-16 h-4 ${BLOCK}`} />
                  <div className="flex gap-3">
                    <div className={`build-block w-10 h-2.5 ${BLOCK}`} />
                    <div className={`build-block w-10 h-2.5 ${BLOCK}`} />
                    <div className={`build-block w-10 h-2.5 ${BLOCK} hidden sm:block`} />
                  </div>
                </div>

                {/* Hero heading */}
                <div className={`build-block w-4/5 h-7 ${BLOCK_LG} mb-2`} />
                <div className={`build-block w-3/5 h-3 ${BLOCK} mb-1.5`} />
                <div className={`build-block w-2/5 h-3 ${BLOCK} mb-4`} />

                {/* CTA button */}
                <div className={`build-block w-24 h-7 ${BLOCK_LG} mb-5`} />

                {/* 3-column feature cards */}
                <div className="grid grid-cols-3 gap-2.5 flex-1">
                  <div className={`build-block ${BLOCK_XL} min-h-[44px]`} />
                  <div className={`build-block ${BLOCK_XL} min-h-[44px]`} />
                  <div className={`build-block ${BLOCK_XL} min-h-[44px]`} />
                </div>
              </div>
            </IllustrationFrame>

            <InfoBlock
              title="Sites Vitrines"
              description="Votre vitrine digitale, entièrement sur-mesure. SEO intégré, animations immersives, responsive parfait. Zéro template."
              tags={["SEO", "Animations", "Sur-mesure", "Responsive"]}
              price="900€"
              priceLabel="À partir de"
            />
          </div>
        </SpotlightCard>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Card 2 — Landing Pages
            Code editor with syntax-highlighted code
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SpotlightCard className="service-card group flex flex-col">
          <div className="flex flex-col h-full p-7 md:p-8">
            <span className="text-sm font-mono text-accent-primary/40 mb-6">
              02
            </span>

            <IllustrationFrame innerRef={codeRef}>
              {/* Editor tab bar */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-foreground/[0.06]">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/[0.08]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/[0.08]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/[0.08]" />
                </div>
                <span className="text-sm text-foreground/20 font-mono ml-1">
                  page.tsx
                </span>
              </div>

              {/* Code body */}
              <div className="p-4 font-mono text-sm leading-[1.85]">
                {CODE_LINES.map((line, lineIdx) => (
                  <div key={lineIdx} className="flex">
                    {/* Line number — fixed width for alignment */}
                    <span className="w-6 text-foreground/12 text-sm select-none shrink-0 text-right mr-5 tabular-nums">
                      {lineIdx + 1}
                    </span>
                    {/* Tokens */}
                    <span>
                      {line.tokens.map((token, tIdx) =>
                        token.text.split("").map((char, cIdx) => (
                          <span
                            key={`${lineIdx}-${tIdx}-${cIdx}`}
                            className="code-char"
                            style={{
                              display: "none",
                              whiteSpace: char === " " ? "pre" : "normal",
                              color: TOKEN_COLORS[token.color],
                            }}
                          >
                            {char}
                          </span>
                        ))
                      )}
                      {lineIdx === CODE_LINES.length - 1 && (
                        <span className="typing-cursor inline-block w-[2px] h-[1.1em] bg-accent-primary animate-pulse ml-[1px] opacity-0 align-middle" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </IllustrationFrame>

            <InfoBlock
              title="Landing Pages"
              description="Des pages de conversion haute performance. Design spectaculaire, animations premium, optimisées pour convertir."
              tags={["Conversion", "A/B Testing", "Analytics", "Performance"]}
              price="1&nbsp;500€"
              priceLabel="À partir de"
            />
          </div>
        </SpotlightCard>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Card 3 — Applications SaaS
            Full dashboard: sidebar + top bar + KPI cards + chart
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SpotlightCard className="service-card group flex flex-col">
          <div className="flex flex-col h-full p-7 md:p-8">
            <span className="text-sm font-mono text-accent-primary/40 mb-6">
              03
            </span>

            <IllustrationFrame innerRef={dashRef}>
              <div className="flex h-full">
                {/* ── Sidebar ── */}
                <div className="w-14 shrink-0 border-r border-foreground/[0.06] flex flex-col items-center py-4 gap-3">
                  {/* Logo */}
                  <div className="w-7 h-7 rounded-lg border border-foreground/[0.08] bg-accent-primary/10 mb-2" />
                  {/* Nav items */}
                  <div className="w-7 h-7 rounded-lg border border-accent-primary/25 bg-accent-primary/10" />
                  <div className="w-7 h-7 rounded-lg border border-foreground/[0.06] bg-foreground/[0.02]" />
                  <div className="w-7 h-7 rounded-lg border border-foreground/[0.06] bg-foreground/[0.02]" />
                  <div className="w-7 h-7 rounded-lg border border-foreground/[0.06] bg-foreground/[0.02]" />
                  {/* Bottom avatar */}
                  <div className="mt-auto w-7 h-7 rounded-full border border-foreground/[0.08] bg-foreground/[0.03]" />
                </div>

                {/* ── Main content ── */}
                <div className="flex-1 flex flex-col p-4 min-w-0">
                  {/* Top bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-3.5 rounded bg-foreground/[0.06]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-6 rounded-md border border-foreground/[0.06] bg-foreground/[0.02]" />
                      <div className="w-6 h-6 rounded-full border border-foreground/[0.08] bg-foreground/[0.03]" />
                    </div>
                  </div>

                  {/* KPI row — 3 metric cards */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {/* KPI 1 — highlighted */}
                    <div className="rounded-lg border border-accent-primary/15 bg-accent-primary/[0.04] p-2.5 flex flex-col gap-1.5">
                      <div className="w-10 h-1.5 rounded-full bg-foreground/[0.08]" />
                      <div className="w-14 h-3.5 rounded bg-accent-primary/25" />
                    </div>
                    {/* KPI 2 */}
                    <div className="rounded-lg border border-foreground/[0.06] bg-foreground/[0.02] p-2.5 flex flex-col gap-1.5">
                      <div className="w-10 h-1.5 rounded-full bg-foreground/[0.06]" />
                      <div className="w-12 h-3.5 rounded bg-foreground/[0.05]" />
                    </div>
                    {/* KPI 3 */}
                    <div className="rounded-lg border border-foreground/[0.06] bg-foreground/[0.02] p-2.5 flex flex-col gap-1.5">
                      <div className="w-10 h-1.5 rounded-full bg-foreground/[0.06]" />
                      <div className="w-11 h-3.5 rounded bg-foreground/[0.05]" />
                    </div>
                  </div>

                  {/* Chart area */}
                  <div className="flex-1 rounded-lg border border-foreground/[0.06] bg-foreground/[0.015] p-3 flex flex-col">
                    {/* Chart header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-16 h-2 rounded-full bg-foreground/[0.06]" />
                      <div className="mrr-label font-mono text-sm font-bold text-accent-primary opacity-0">
                        +342% MRR
                      </div>
                    </div>
                    {/* Bars */}
                    <div className="flex-1 flex items-end gap-[5px]">
                      {CHART_BARS.map((h, i) => (
                        <div
                          key={i}
                          className="chart-bar flex-1 rounded-t-sm transition-colors duration-700 group-hover:!bg-accent-primary/75"
                          style={{
                            height: `${h}%`,
                            backgroundColor: `rgba(201,100,66,${0.2 + (i / CHART_BARS.length) * 0.6})`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </IllustrationFrame>

            <InfoBlock
              title="Applications SaaS"
              description="Du MVP au produit scalable. Dashboards, portails clients, outils métier. Architecture pensée pour durer."
              tags={["Dashboard", "API", "Scalable", "Auth"]}
              price="Sur devis"
              priceLabel=""
            />
          </div>
        </SpotlightCard>
      </div>
    </Section>
  );
}
