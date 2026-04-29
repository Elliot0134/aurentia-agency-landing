"use client";

import { useRef, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import Image from "next/image";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { saasServicesContent } from "@/data/saas-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CHART_BARS = [22, 38, 30, 52, 44, 65, 58, 80, 72, 94];

export function SaasServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const saasRef = useRef<HTMLDivElement>(null);
  const metierRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!containerRef.current || !cardsRef.current) return;

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

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
        }
      );

      const buildTrigger = {
        scrollTrigger: { trigger: cardsRef.current, start: "top 75%" },
      };

      // ━━━ Card 1 — SaaS App ━━━
      if (saasRef.current) {
        const s = saasRef.current;
        const tl = gsap.timeline(buildTrigger);
        tl.fromTo(s.querySelectorAll(".s-dot"),
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, stagger: 0.06, duration: 0.25, ease: "back.out(2)" },
        );
        const urlBar = s.querySelector(".s-url");
        if (urlBar) {
          tl.fromTo(urlBar,
            { opacity: 0, scaleX: 0, transformOrigin: "left center" },
            { opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.out" },
            "-=0.1"
          );
        }
        popIn(tl, s.querySelectorAll(".s-nav"), { stagger: 0.04, duration: 0.25, y: 6, scale: 0.95 });
        popIn(tl, s.querySelectorAll(".s-kpi"), { stagger: 0.08, duration: 0.3, y: 8, scale: 0.88 });
        const bars = s.querySelectorAll(".chart-bar");
        if (bars.length) {
          tl.fromTo(bars,
            { scaleY: 0, transformOrigin: "bottom center" },
            { scaleY: 1, stagger: 0.04, ease: "back.out(1.5)", duration: 0.4 },
          );
        }
        popIn(tl, s.querySelectorAll(".s-feed"), { stagger: 0.08, duration: 0.3, y: 6, scale: 0.93 });
      }

      // ━━━ Card 2 — Logiciel métier ━━━
      if (metierRef.current) {
        const m = metierRef.current;
        const tl = gsap.timeline(buildTrigger);
        tl.fromTo(m.querySelectorAll(".m-dot"),
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, stagger: 0.06, duration: 0.25, ease: "back.out(2)" },
        );
        popIn(tl, m.querySelectorAll(".m-header"), { stagger: 0.06, duration: 0.3, y: 6, scale: 0.95 });
        popIn(tl, m.querySelectorAll(".m-row"), { stagger: 0.06, duration: 0.3, y: 8, scale: 0.93 });
        popIn(tl, m.querySelectorAll(".m-action"), { stagger: 0.08, duration: 0.3, y: 6, scale: 0.9 });
      }

      // ━━━ Card 3 — Automatisation ━━━
      if (autoRef.current) {
        const a = autoRef.current;
        const tl = gsap.timeline(buildTrigger);
        tl.fromTo(a.querySelectorAll(".a-dot"),
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, stagger: 0.06, duration: 0.25, ease: "back.out(2)" },
        );
        popIn(tl, a.querySelectorAll(".a-node"), { stagger: 0.1, duration: 0.35, y: 8, scale: 0.85 });
        popIn(tl, a.querySelectorAll(".a-arrow"), { stagger: 0.08, duration: 0.3, y: 0, scale: 0.5 });
        popIn(tl, a.querySelectorAll(".a-log"), { stagger: 0.06, duration: 0.3, y: 6, scale: 0.93 });
      }
    },
    { scope: containerRef, dependencies: [animationsEnabled] }
  );

  // Auto-scroll on hover
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

  useEffect(() => {
    const tweens = hoverTweens.current;
    return () => { tweens.forEach((t) => t.kill()); };
  }, []);

  return (
    <Section
      ref={containerRef}
      id="services"
      theme="dark"
      className="py-20 section-divider-orange relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="mb-10 relative z-10 max-w-4xl">
        <BlurReveal>
          <span className="inline-block text-sm font-mono uppercase tracking-[0.2em] text-accent-primary/70 mb-4">Services</span>
        </BlurReveal>
        <TextReveal
          text={saasServicesContent.title}
          elementType="h2"
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
        />
        <BlurReveal className="mt-4" delay={0.2}>
          <p className="text-lg text-foreground/60 max-w-2xl">
            {saasServicesContent.subtitle}
          </p>
        </BlurReveal>
      </div>

      {/* Cards — 3 columns */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">

        {/* ━━━ CARD 1 — Applications SaaS ━━━ */}
        <SpotlightCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="service-card group border border-foreground/[0.08] rounded-2xl flex flex-col">
          <div className="flex flex-col h-full p-5 md:p-6">
            <div
              ref={saasRef}
              className="mockup-viewport h-[280px] bg-background-surface border border-foreground/[0.08] rounded-2xl overflow-hidden transition-all duration-700 group-hover:border-accent-primary/20 group-hover:shadow-[0_0_50px_rgba(201,100,66,0.08)] group-hover:scale-[1.02] select-none relative"
            >
              <div className="absolute top-8 right-6 w-24 h-24 bg-accent-primary/[0.06] rounded-full blur-2xl animate-[float-y_8s_ease-in-out_infinite]" />

              <div className="flex h-full relative z-10">
                {/* Sidebar */}
                <div className="shrink-0 w-14 border-r border-foreground/[0.06] bg-background-surface flex flex-col items-center pt-3 gap-2.5">
                  <div className="s-nav w-7 h-7 rounded-lg bg-accent-primary/15 border border-accent-primary/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-sm bg-accent-primary/40" />
                  </div>
                  {[
                    { label: "Dashboard", active: true },
                    { label: "Users", active: false },
                    { label: "Billing", active: false },
                    { label: "Settings", active: false },
                  ].map((item, i) => (
                    <div key={i} className={`s-nav w-7 h-7 rounded-lg ${item.active ? "bg-foreground/[0.06]" : "bg-transparent"} flex items-center justify-center`}>
                      <div className="w-3 h-3 rounded-sm bg-foreground/15" />
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Top bar */}
                  <div className="s-nav shrink-0 flex items-center justify-between px-3 py-2 border-b border-foreground/[0.06]">
                    <span className="text-[11px] font-bold text-foreground/70">Dashboard</span>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-5 h-5 rounded-full bg-foreground/10" />
                      <span className="text-[10px] text-foreground/40">Admin</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mockup-scroll-area flex-1 overflow-hidden">
                    <div className="mockup-inner flex flex-col p-3 gap-2.5">
                      {/* KPIs */}
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { label: "MRR", value: "12 400€", trend: "+12%" },
                          { label: "Users", value: "1 247", trend: "+8%" },
                          { label: "Churn", value: "2.1%", trend: "-0.3%" },
                        ].map((kpi) => (
                          <div key={kpi.label} className="s-kpi rounded-lg bg-foreground/[0.03] border border-foreground/[0.06] p-2 text-center">
                            <p className="text-[9px] text-foreground/40 uppercase tracking-wider">{kpi.label}</p>
                            <p className="text-sm font-bold text-foreground/80 mt-0.5">{kpi.value}</p>
                            <p className={`text-[8px] mt-0.5 ${kpi.trend.startsWith("+") ? "text-emerald-500/60" : "text-emerald-500/60"}`}>{kpi.trend}</p>
                          </div>
                        ))}
                      </div>

                      {/* Chart */}
                      <div className="rounded-lg bg-foreground/[0.02] border border-foreground/[0.06] p-2">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] text-foreground/40">Revenue mensuel</p>
                          <div className="flex gap-1">
                            <span className="text-[8px] bg-foreground/5 text-foreground/30 px-1.5 py-0.5 rounded">7j</span>
                            <span className="text-[8px] bg-accent-primary/10 text-accent-primary/70 px-1.5 py-0.5 rounded font-medium">30j</span>
                            <span className="text-[8px] bg-foreground/5 text-foreground/30 px-1.5 py-0.5 rounded">90j</span>
                          </div>
                        </div>
                        <div className="flex items-end gap-0.5 h-12">
                          {CHART_BARS.map((h, i) => (
                            <div key={i} className="chart-bar flex-1 rounded-t-sm bg-gradient-to-t from-accent-primary/40 to-accent-secondary/25" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>

                      {/* Recent users table */}
                      <div className="rounded-lg bg-foreground/[0.02] border border-foreground/[0.06] overflow-hidden">
                        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-foreground/[0.04]">
                          <span className="text-[9px] text-foreground/40 font-medium">Derniers utilisateurs</span>
                          <span className="text-[8px] text-accent-primary/60">Voir tout</span>
                        </div>
                        {[
                          { name: "Marie D.", plan: "Pro", date: "Auj." },
                          { name: "Thomas R.", plan: "Starter", date: "Hier" },
                          { name: "Julie M.", plan: "Pro", date: "Hier" },
                        ].map((user) => (
                          <div key={user.name} className="s-feed flex items-center px-2.5 py-1.5 border-b border-foreground/[0.03] last:border-0">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-accent-primary/30 to-violet-500/20 shrink-0 mr-2" />
                            <span className="flex-1 text-[10px] text-foreground/60">{user.name}</span>
                            <span className="text-[9px] text-accent-primary/60 font-medium mr-2">{user.plan}</span>
                            <span className="text-[9px] text-foreground/25">{user.date}</span>
                          </div>
                        ))}
                      </div>

                      {/* Activity feed */}
                      <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] text-foreground/30 uppercase tracking-wider font-medium">Activité récente</p>
                        {[
                          { label: "Nouvel utilisateur inscrit", time: "2 min" },
                          { label: "Paiement reçu — 49€/mois", time: "15 min" },
                          { label: "Ticket support résolu", time: "1h" },
                          { label: "Webhook Stripe déclenché", time: "2h" },
                        ].map((item) => (
                          <div key={item.label} className="s-feed flex items-center justify-between rounded-lg bg-foreground/[0.02] border border-foreground/[0.04] px-2.5 py-1.5">
                            <span className="text-[10px] text-foreground/50">{item.label}</span>
                            <span className="text-[9px] text-foreground/25">{item.time}</span>
                          </div>
                        ))}
                      </div>

                      {/* Quick actions */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="s-feed rounded-lg bg-accent-primary/[0.06] border border-accent-primary/15 p-2 text-center">
                          <span className="text-[10px] font-medium text-accent-primary/70">Inviter un user</span>
                        </div>
                        <div className="s-feed rounded-lg bg-foreground/[0.03] border border-foreground/[0.06] p-2 text-center">
                          <span className="text-[10px] text-foreground/40">Exporter CSV</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-3 pt-5">
              <h3 className="text-xl font-bold">Applications SaaS</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">
                Votre produit, de l&apos;idée au premier utilisateur. Auth, billing, dashboard, API — tout est inclus.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Auth", "Billing", "API", "Dashboard"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-sm rounded-full bg-foreground/5 border border-foreground/10 text-foreground/50">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* ━━━ CARD 2 — Logiciel métier ━━━ */}
        <SpotlightCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="service-card group border border-foreground/[0.08] rounded-2xl flex flex-col">
          <div className="flex flex-col h-full p-5 md:p-6">
            <div
              ref={metierRef}
              className="mockup-viewport h-[280px] bg-background-surface border border-foreground/[0.08] rounded-2xl overflow-hidden transition-all duration-700 group-hover:border-accent-primary/20 group-hover:shadow-[0_0_50px_rgba(201,100,66,0.08)] group-hover:scale-[1.02] select-none relative"
            >
              <div className="absolute top-10 right-4 w-20 h-20 bg-emerald-500/[0.05] rounded-full blur-2xl animate-[float-y_9s_ease-in-out_infinite_0.5s]" />

              <div className="flex flex-col h-full relative z-10">
                {/* Browser chrome */}
                <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 border-b border-foreground/[0.06] bg-background-surface">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="m-dot w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="m-dot w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="m-dot w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 h-5 rounded-lg bg-foreground/[0.04] flex items-center px-2.5">
                    <span className="text-[10px] text-foreground/20 font-mono truncate">app.gestion-pro.fr</span>
                  </div>
                </div>

                {/* Content */}
                <div className="mockup-scroll-area flex-1 overflow-hidden">
                  <div className="mockup-inner flex flex-col p-3 gap-2">
                    {/* Header */}
                    <div className="m-header flex items-center justify-between">
                      <span className="text-[11px] font-bold text-foreground/70">Suivi de production</span>
                      <div className="flex gap-1.5">
                        <span className="text-[9px] bg-emerald-500/15 text-emerald-500/80 px-2 py-0.5 rounded-full border border-emerald-500/20">En cours</span>
                        <span className="text-[9px] bg-foreground/5 text-foreground/40 px-2 py-0.5 rounded-full border border-foreground/10">Filtrer</span>
                      </div>
                    </div>

                    {/* Summary KPIs */}
                    <div className="m-header grid grid-cols-3 gap-1.5">
                      {[
                        { label: "En cours", value: "12", color: "emerald" },
                        { label: "En attente", value: "5", color: "amber" },
                        { label: "CA mensuel", value: "48k€", color: "accent" },
                      ].map((kpi) => (
                        <div key={kpi.label} className="rounded-md bg-foreground/[0.03] border border-foreground/[0.06] p-1.5 text-center">
                          <p className="text-[8px] text-foreground/35 uppercase">{kpi.label}</p>
                          <p className={`text-[11px] font-bold ${
                            kpi.color === "emerald" ? "text-emerald-500/70" :
                            kpi.color === "amber" ? "text-amber-500/70" :
                            "text-accent-primary/70"
                          }`}>{kpi.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Table rows */}
                    <div className="rounded-lg bg-foreground/[0.02] border border-foreground/[0.06] overflow-hidden">
                      <div className="flex px-2.5 py-1.5 border-b border-foreground/[0.06] bg-foreground/[0.02]">
                        <span className="flex-1 text-[8px] text-foreground/30 font-medium">Commande</span>
                        <span className="w-16 text-[8px] text-foreground/30 font-medium text-center">Status</span>
                        <span className="w-14 text-[8px] text-foreground/30 font-medium text-center">Délai</span>
                        <span className="w-12 text-[8px] text-foreground/30 font-medium text-right">Montant</span>
                      </div>
                      {[
                        { cmd: "CMD-2847", status: "Production", delay: "J+3", amount: "4 200€", color: "emerald" },
                        { cmd: "CMD-2846", status: "Validé", delay: "J+1", amount: "1 850€", color: "blue" },
                        { cmd: "CMD-2845", status: "Expédié", delay: "J+5", amount: "3 100€", color: "amber" },
                        { cmd: "CMD-2844", status: "Livré", delay: "—", amount: "2 600€", color: "foreground" },
                        { cmd: "CMD-2843", status: "Production", delay: "J+2", amount: "5 400€", color: "emerald" },
                      ].map((row) => (
                        <div key={row.cmd} className="m-row flex items-center px-2.5 py-2 border-b border-foreground/[0.03] last:border-0">
                          <span className="flex-1 text-[10px] text-foreground/60 font-mono">{row.cmd}</span>
                          <span className={`w-16 text-center text-[9px] font-medium ${
                            row.color === "emerald" ? "text-emerald-500/70" :
                            row.color === "blue" ? "text-blue-500/70" :
                            row.color === "amber" ? "text-amber-500/70" :
                            "text-foreground/40"
                          }`}>{row.status}</span>
                          <span className="w-14 text-center text-[10px] text-foreground/40">{row.delay}</span>
                          <span className="w-12 text-right text-[10px] text-foreground/50">{row.amount}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="m-action rounded-lg bg-foreground/[0.02] border border-foreground/[0.06] p-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] text-foreground/50">Objectif mensuel</span>
                        <span className="text-[9px] font-bold text-foreground/60">72%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-accent-primary/60 to-accent-secondary/40" style={{ width: "72%" }} />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <div className="m-action flex-1 rounded-lg bg-accent-primary/10 border border-accent-primary/20 p-2 text-center">
                        <span className="text-[10px] font-medium text-accent-primary/80">+ Nouvelle commande</span>
                      </div>
                      <div className="m-action flex-1 rounded-lg bg-foreground/[0.03] border border-foreground/[0.06] p-2 text-center">
                        <span className="text-[10px] text-foreground/40">Exporter</span>
                      </div>
                    </div>

                    {/* Recent notes */}
                    <div className="m-action rounded-lg bg-foreground/[0.02] border border-foreground/[0.06] p-2.5">
                      <p className="text-[9px] text-foreground/40 font-medium mb-1.5">Note — CMD-2847</p>
                      <p className="text-[9px] text-foreground/35 leading-relaxed">Client rappelé. Livraison confirmée pour vendredi. Prévoir packaging spécial.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 pt-5">
              <h3 className="text-xl font-bold">Logiciels métier</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">
                Votre activité mérite un outil taillé sur-mesure. Gestion de stocks, CRM, suivi de production.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Sur-mesure", "Process métier", "Intégrations"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-sm rounded-full bg-foreground/5 border border-foreground/10 text-foreground/50">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* ━━━ CARD 3 — Automatisation ━━━ */}
        <SpotlightCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="service-card group border border-foreground/[0.08] rounded-2xl flex flex-col">
          <div className="flex flex-col h-full p-5 md:p-6">
            <div
              ref={autoRef}
              className="mockup-viewport h-[280px] bg-background-surface border border-foreground/[0.08] rounded-2xl overflow-hidden transition-all duration-700 group-hover:border-accent-primary/20 group-hover:shadow-[0_0_50px_rgba(201,100,66,0.08)] group-hover:scale-[1.02] select-none relative"
            >
              <div className="absolute bottom-8 left-6 w-24 h-24 bg-violet-500/[0.06] rounded-full blur-2xl animate-[float-y_10s_ease-in-out_infinite_1s]" />

              <div className="flex flex-col h-full relative z-10">
                {/* Browser chrome */}
                <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 border-b border-foreground/[0.06] bg-background-surface">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="a-dot w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="a-dot w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="a-dot w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 h-5 rounded-lg bg-foreground/[0.04] flex items-center px-2.5">
                    <span className="text-[10px] text-foreground/20 font-mono truncate">n8n.votre-entreprise.com</span>
                  </div>
                </div>

                {/* Workflow canvas */}
                <div className="mockup-scroll-area flex-1 overflow-hidden">
                  <div className="mockup-inner flex flex-col p-3 gap-2.5">
                    {/* Workflow header */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-foreground/70">Workflow — Onboarding client</span>
                      <div className="flex gap-1.5 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] text-emerald-500/80 font-medium">Actif</span>
                      </div>
                    </div>

                    {/* Stats bar */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { label: "Exécutions", value: "1 247" },
                        { label: "Succès", value: "99.2%" },
                        { label: "Temps moy.", value: "1.3s" },
                      ].map((stat) => (
                        <div key={stat.label} className="a-node rounded-md bg-foreground/[0.03] border border-foreground/[0.06] p-1.5 text-center">
                          <p className="text-[8px] text-foreground/35 uppercase">{stat.label}</p>
                          <p className="text-[10px] font-bold text-foreground/65">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Workflow nodes visualization */}
                    <div className="flex flex-col items-center gap-1.5">
                      {/* Node 1 — Trigger */}
                      <div className="a-node w-full rounded-lg bg-violet-500/10 border border-violet-500/20 p-2 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-foreground/70">Webhook Stripe</p>
                          <p className="text-[9px] text-foreground/40 truncate">Nouveau paiement reçu</p>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0" />
                      </div>

                      <svg className="a-arrow w-4 h-4 text-foreground/20" viewBox="0 0 16 16" fill="none"><path d="M8 0v12M3 9l5 4 5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>

                      {/* Node 2 — Process */}
                      <div className="a-node w-full rounded-lg bg-accent-primary/10 border border-accent-primary/20 p-2 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-accent-primary/20 border border-accent-primary/30 flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-accent-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-foreground/70">Créer compte Supabase</p>
                          <p className="text-[9px] text-foreground/40 truncate">Auth + profil utilisateur</p>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0" />
                      </div>

                      {/* Branch — split into 2 */}
                      <div className="flex items-start gap-2 w-full">
                        <div className="flex-1 flex flex-col items-center gap-1.5">
                          <svg className="a-arrow w-4 h-4 text-foreground/20" viewBox="0 0 16 16" fill="none"><path d="M8 0v12M3 9l5 4 5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          <div className="a-node w-full rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                              <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[9px] font-bold text-foreground/70">Email</p>
                              <p className="text-[8px] text-foreground/35 truncate">Bienvenue</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-1.5">
                          <svg className="a-arrow w-4 h-4 text-foreground/20" viewBox="0 0 16 16" fill="none"><path d="M8 0v12M3 9l5 4 5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          <div className="a-node w-full rounded-lg bg-blue-500/10 border border-blue-500/20 p-2 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                              <svg className="w-3 h-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-[9px] font-bold text-foreground/70">Slack</p>
                              <p className="text-[8px] text-foreground/35 truncate">Notif team</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Execution logs */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] text-foreground/30 uppercase tracking-wider font-medium">Dernières exécutions</p>
                        <span className="text-[8px] text-accent-primary/60">Voir tout</span>
                      </div>
                      {[
                        { status: "success", text: "Onboarding client #247", time: "2 min", dur: "1.2s" },
                        { status: "success", text: "Onboarding client #246", time: "1h", dur: "1.4s" },
                        { status: "error", text: "Email bounce — retry", time: "3h", dur: "0.8s" },
                        { status: "success", text: "Onboarding client #245", time: "5h", dur: "1.1s" },
                        { status: "success", text: "Onboarding client #244", time: "1j", dur: "1.5s" },
                      ].map((log) => (
                        <div key={log.text} className="a-log flex items-center justify-between rounded-lg bg-foreground/[0.02] border border-foreground/[0.04] px-2.5 py-1.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${log.status === "success" ? "bg-emerald-500/70" : "bg-red-500/70"}`} />
                            <span className="text-[10px] text-foreground/50">{log.text}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[8px] text-foreground/20">{log.dur}</span>
                            <span className="text-[9px] text-foreground/25">{log.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 pt-5">
              <div className="flex items-center gap-3">
                <Image src="/images/icons/n8n-icon.webp" alt="N8N" width={32} height={32} className="w-8 h-8 object-contain" />
                <h3 className="text-xl font-bold">Automatisation</h3>
              </div>
              <p className="text-sm text-foreground/50 leading-relaxed">
                On connecte vos outils entre eux. Onboarding, facturation, notifications — tout tourne sans vous.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["N8N", "Workflows", "Webhooks", "No-code"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-sm rounded-full bg-foreground/5 border border-foreground/10 text-foreground/50">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </Section>
  );
}
