"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/animations/TextReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { CalModal } from "@/components/shared/CalModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════
   VISUAL COMPONENTS — immersive full-bleed designs
   ═══════════════════════════════════════════════════════ */

function VisualCall() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent-primary/[0.12] rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-8 w-32 h-32 bg-accent-primary/[0.06] rounded-full blur-[60px]" />
      <div className="relative flex flex-col items-center pt-6 px-5 space-y-3">
        {/* Video call card */}
        <div className="w-full max-w-[320px] bg-background/60 border border-foreground/[0.08] rounded-2xl overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-2.5 bg-foreground/[0.03] border-b border-foreground/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70 shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse" />
              <span className="text-sm font-medium text-foreground/50">Call stratégique</span>
            </div>
            <div className="flex items-center gap-1.5 bg-foreground/[0.04] rounded-lg px-2.5 py-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-foreground/25"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <span className="text-sm font-mono text-foreground/35">20:00</span>
            </div>
          </div>
          <div className="p-3 flex gap-2.5">
            <div className="flex-1 aspect-[4/3] rounded-xl bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.08] border border-foreground/[0.06] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20 border border-accent-primary/25 flex items-center justify-center shadow-[0_0_24px_rgba(201,100,66,0.2)]">
                <span className="text-sm font-bold text-accent-primary">A</span>
              </div>
              <span className="absolute bottom-2 left-2.5 text-sm font-medium text-foreground/40">Aurentia</span>
            </div>
            <div className="flex-1 aspect-[4/3] rounded-xl bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.08] border border-foreground/[0.06] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              <div className="w-12 h-12 rounded-full bg-foreground/8 border border-foreground/12 flex items-center justify-center">
                <span className="text-sm font-bold text-foreground/50">Vous</span>
              </div>
            </div>
          </div>
        </div>
        {/* Scope card */}
        <div className="w-full max-w-[300px] bg-gradient-to-r from-accent-primary/[0.06] to-transparent border border-accent-primary/10 rounded-xl px-3.5 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary/70"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /></svg>
            <span className="text-sm font-semibold text-accent-primary/70">Scope identifié</span>
          </div>
          <div className="space-y-1">
            {["MVP défini", "Budget estimé", "Planning validé"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent-primary/50"><polyline points="20 6 9 17 4 12" /></svg>
                <span className="text-sm text-foreground/40">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualSpecs() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-10 right-8 w-36 h-36 bg-accent-primary/[0.08] rounded-full blur-[60px]" />
      <div className="absolute bottom-24 left-4 w-28 h-28 bg-accent-primary/[0.06] rounded-full blur-[50px]" />
      <div className="relative flex flex-col items-center pt-5 px-4 space-y-2.5">
        {/* Architecture diagram */}
        <div className="w-full max-w-[300px] bg-background/40 border border-foreground/[0.06] rounded-2xl p-3.5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-primary/25 to-accent-secondary/15 border border-accent-primary/20 flex items-center justify-center shadow-[0_0_16px_rgba(201,100,66,0.15)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary/80"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground/70 block">Specs techniques</span>
              <span className="text-sm font-mono text-foreground/30">12 pages</span>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { name: "Architecture DB", progress: 100 },
              { name: "User Flows", progress: 100 },
              { name: "Wireframes", progress: 85 },
              { name: "API Design", progress: 60 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground/40">{item.name}</span>
                  <span className="text-sm font-mono text-accent-primary/60">{item.progress}%</span>
                </div>
                <div className="h-1 bg-foreground/[0.04] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent-primary/50 to-accent-secondary/30" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Validation badge */}
        <div className="w-full max-w-[300px] bg-gradient-to-r from-accent-primary/[0.06] to-transparent border border-accent-primary/10 rounded-xl px-3.5 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-accent-primary/15 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent-primary/70"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <div>
            <span className="text-sm font-medium text-foreground/60">Validé par le client</span>
            <span className="text-sm font-mono text-foreground/25 block">avant le moindre code</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualDesign() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-8 left-1/4 w-40 h-40 bg-violet-500/[0.08] rounded-full blur-[60px]" />
      <div className="absolute bottom-28 right-6 w-32 h-32 bg-violet-400/[0.06] rounded-full blur-[50px]" />
      <div className="relative flex flex-col items-center pt-5 px-4 space-y-2.5">
        {/* Design system preview */}
        <div className="w-full max-w-[300px] bg-background/40 border border-foreground/[0.06] rounded-2xl p-3.5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/25 to-violet-600/15 border border-violet-500/20 flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.15)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-400/80"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground/70 block">Design System</span>
              <span className="text-sm font-mono text-violet-400/50">Cohérent & réutilisable</span>
            </div>
          </div>
          {/* Color palette */}
          <div className="flex gap-2 mb-3">
            {["bg-violet-500/60", "bg-violet-400/50", "bg-violet-300/40", "bg-foreground/10", "bg-foreground/5"].map((c, i) => (
              <div key={i} className={`flex-1 h-8 rounded-lg ${c} border border-foreground/[0.04]`} />
            ))}
          </div>
          {/* Component preview */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 h-8 rounded-lg bg-violet-500/20 border border-violet-500/15 flex items-center justify-center">
                <span className="text-sm font-medium text-violet-400/70">Button</span>
              </div>
              <div className="flex-1 h-8 rounded-lg bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center">
                <span className="text-sm font-medium text-foreground/30">Input</span>
              </div>
            </div>
            <div className="h-16 rounded-lg bg-gradient-to-br from-violet-500/[0.06] to-transparent border border-violet-500/10 flex items-center justify-center">
              <span className="text-sm text-violet-400/40">Card component</span>
            </div>
          </div>
        </div>
        {/* Responsive badge */}
        <div className="w-full max-w-[300px] bg-gradient-to-r from-violet-500/[0.06] to-transparent border border-violet-500/10 rounded-xl px-3.5 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            {["w-4 h-6", "w-5 h-5", "w-7 h-4"].map((size, i) => (
              <div key={i} className={`${size} rounded-sm border border-violet-500/25 bg-violet-500/10`} />
            ))}
          </div>
          <span className="text-sm font-medium text-violet-400/60">Responsive natif</span>
        </div>
      </div>
    </div>
  );
}

function VisualDev() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-violet-500/[0.08] rounded-full blur-[60px]" />
      <div className="absolute bottom-32 right-4 w-24 h-24 bg-violet-400/[0.06] rounded-full blur-[40px]" />
      <div className="absolute top-12 left-6 text-sm font-mono text-foreground/[0.06] animate-pulse">&lt;div&gt;</div>
      <div className="absolute top-20 right-8 text-sm font-mono text-violet-400/[0.08] animate-pulse [animation-delay:1s]">const</div>
      <div className="absolute top-32 left-10 text-sm font-mono text-violet-400/[0.06] animate-pulse [animation-delay:2s]">async</div>
      <div className="relative flex flex-col items-center pt-3 px-3">
        <div className="w-full max-w-[320px] bg-foreground/[0.04] border border-foreground/[0.08] rounded-2xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-0 bg-foreground/[0.06] border-b border-foreground/[0.06]">
            <div className="flex items-center gap-2 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
              </div>
            </div>
            <div className="flex-1 flex">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-foreground/[0.04] border-b-2 border-violet-500/50 text-sm font-mono text-foreground/40">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-400/60"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                app.tsx
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 text-sm font-mono text-foreground/20">
                actions.ts
              </div>
            </div>
          </div>
          <div className="p-4 font-mono text-sm space-y-1 leading-relaxed">
            <div><span className="text-foreground/15 select-none mr-3">1</span><span className="text-violet-400/70">import</span> <span className="text-foreground/50">&#123; createClient &#125;</span></div>
            <div><span className="text-foreground/15 select-none mr-3">2</span><span className="text-violet-400/70">import</span> <span className="text-foreground/50">&#123; Dashboard &#125;</span></div>
            <div><span className="text-foreground/15 select-none mr-3">3</span></div>
            <div><span className="text-foreground/15 select-none mr-3">4</span><span className="text-violet-400/70">export default</span> <span className="text-violet-300/70">async function</span> <span className="text-violet-200/70">Page</span><span className="text-foreground/30">() &#123;</span></div>
            <div><span className="text-foreground/15 select-none mr-3">5</span>  <span className="text-violet-400/70">const</span> <span className="text-foreground/50">data = </span><span className="text-violet-400/70">await</span> <span className="text-foreground/50">fetch()</span></div>
            <div className="flex items-center"><span className="text-foreground/15 select-none mr-3">6</span>  <span className="text-violet-400/70">return</span> <span className="text-violet-300/70">&lt;Dashboard</span><span className="text-violet-400/60 animate-pulse">|</span></div>
          </div>
          <div className="mx-3 mb-3 bg-gradient-to-r from-violet-500/[0.06] to-transparent border border-violet-500/15 rounded-xl px-3.5 py-2.5">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded-md bg-violet-500/15 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-violet-400/80"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <span className="text-sm font-semibold text-violet-400/60">IA — Code review</span>
            </div>
            <div className="font-mono text-sm text-violet-400/40 space-y-0.5">
              <div>  ✓ Types validés</div>
              <div>  ✓ Tests passent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualDeploy() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-10 right-8 w-36 h-36 bg-cyan-500/[0.08] rounded-full blur-[60px]" />
      <div className="absolute bottom-28 left-4 w-28 h-28 bg-cyan-400/[0.06] rounded-full blur-[50px]" />
      <div className="relative flex flex-col items-center pt-5 px-4 space-y-2.5">
        {/* Deploy status */}
        <div className="w-full max-w-[300px] bg-background/40 border border-foreground/[0.06] rounded-2xl overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-foreground/[0.06]">
            <span className="text-sm font-semibold text-foreground/60">Production</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 animate-pulse shadow-[0_0_4px_rgba(6,182,212,0.4)]" />
              <span className="text-sm font-mono text-cyan-400/50">Live</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[1px] bg-foreground/[0.04]">
            {[
              { label: "Uptime", value: "99.9%", color: "text-cyan-400/70" },
              { label: "SSL", value: "A+", color: "text-cyan-300/70" },
              { label: "Perf", value: "98", color: "text-cyan-400/70" },
            ].map((m) => (
              <div key={m.label} className="bg-background/60 px-3 py-2.5 text-center">
                <span className={`text-lg font-bold font-mono ${m.color} block leading-tight`}>{m.value}</span>
                <span className="text-sm font-mono text-foreground/25">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Deploy pipeline */}
        <div className="w-full max-w-[300px] bg-gradient-to-br from-cyan-500/[0.05] to-transparent border border-cyan-500/10 rounded-xl px-3.5 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/25 to-cyan-600/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.12)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400/80"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></svg>
            </div>
            <span className="text-sm font-semibold text-foreground/70">Pipeline de déploiement</span>
          </div>
          <div className="space-y-1.5">
            {[
              { name: "Build & Tests", status: "done" },
              { name: "DNS & SSL", status: "done" },
              { name: "Monitoring actif", status: "done" },
            ].map((step) => (
              <div key={step.name} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-cyan-400/70"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <span className="text-sm text-foreground/50">{step.name}</span>
                <span className="text-sm font-mono text-cyan-400/40 ml-auto">Complété</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualAccompagnement() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-10 right-8 w-36 h-36 bg-cyan-500/[0.08] rounded-full blur-[60px]" />
      <div className="absolute bottom-28 left-4 w-28 h-28 bg-cyan-400/[0.06] rounded-full blur-[50px]" />
      <div className="relative flex flex-col items-center pt-5 px-4 space-y-2.5">
        {/* Dashboard client */}
        <div className="w-full max-w-[300px] bg-background/40 border border-foreground/[0.06] rounded-2xl overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-foreground/[0.06]">
            <span className="text-sm font-semibold text-foreground/60">Suivi client</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 animate-pulse shadow-[0_0_4px_rgba(6,182,212,0.4)]" />
              <span className="text-sm font-mono text-cyan-400/50">En ligne</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[1px] bg-foreground/[0.04]">
            {[
              { label: "Uptime", value: "99.9%", color: "text-cyan-400/70" },
              { label: "Réponse", value: "<2h", color: "text-cyan-300/70" },
              { label: "Tickets", value: "0", color: "text-cyan-400/70" },
            ].map((m) => (
              <div key={m.label} className="bg-background/60 px-3 py-2.5 text-center">
                <span className={`text-lg font-bold font-mono ${m.color} block leading-tight`}>{m.value}</span>
                <span className="text-sm font-mono text-foreground/25">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Maintenance & évolutions */}
        <div className="w-full max-w-[300px] bg-gradient-to-br from-cyan-500/[0.05] to-transparent border border-cyan-500/10 rounded-xl px-3.5 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/25 to-cyan-600/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.12)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400/80"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
            </div>
            <div className="flex-1">
              <span className="text-sm font-semibold text-foreground/70">Maintenance proactive</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { name: "Mises à jour sécurité", status: "Automatique" },
              { name: "Monitoring 24/7", status: "Actif" },
              { name: "Évolutions sur-mesure", status: "On-demand" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between bg-foreground/[0.02] border border-foreground/[0.04] rounded-lg px-2.5 py-1.5">
                <span className="text-sm text-foreground/40">{item.name}</span>
                <span className="text-sm font-mono text-cyan-400/40">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Support badge */}
        <div className="w-full max-w-[300px] bg-background/40 border border-foreground/[0.06] rounded-xl px-3.5 py-2.5 backdrop-blur-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/15 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.1)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400/80"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground/60">Support prioritaire</span>
            <span className="text-sm font-mono text-foreground/25 block">Réponse en moins de 2h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEPS DATA
   ═══════════════════════════════════════════════════════ */

const phases = [
  {
    label: "Cadrage",
    color: "accent-primary",
    iconColor: "text-accent-primary",
    bgColor: "bg-accent-primary/15",
    borderColor: "border-accent-primary/30",
    textColor: "text-accent-primary",
    lineColor: "from-accent-primary/25",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    ),
    steps: [
      {
        num: "01",
        title: "Call stratégique",
        duration: "20 min",
        desc: "20 minutes pour comprendre votre vision, votre marché, vos contraintes. On identifie le scope du MVP et on estime le budget.",
        Visual: VisualCall,
      },
      {
        num: "02",
        title: "Spécifications & Architecture",
        duration: "2 à 3 jours",
        desc: "On traduit votre vision en specs techniques. Architecture de la base de données, user flows, wireframes. Vous validez avant qu\u2019on code.",
        Visual: VisualSpecs,
      },
    ],
  },
  {
    label: "Production",
    color: "violet-500",
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/15",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-500",
    lineColor: "from-violet-500/25",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
    ),
    steps: [
      {
        num: "03",
        title: "Design & Charte graphique",
        duration: "2 à 3 jours",
        desc: "Identité visuelle intégrée. Design system cohérent, composants réutilisables, responsive natif. Votre produit a une identité dès le premier jour.",
        Visual: VisualDesign,
      },
      {
        num: "04",
        title: "Développement",
        duration: "1 à 2 semaines",
        desc: "L\u2019IA accélère. L\u2019expertise humaine valide. Chaque feature est testée, chaque ligne de code est review. On avance vite sans sacrifier la qualité.",
        Visual: VisualDev,
      },
    ],
  },
  {
    label: "Lancement & Suivi",
    color: "cyan-500",
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-500/15",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-600",
    lineColor: "from-cyan-500/25",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></svg>
    ),
    steps: [
      {
        num: "05",
        title: "Déploiement & Lancement",
        duration: "1 jour",
        desc: "Mise en production sur Vercel. Configuration DNS, SSL, monitoring. Votre application est live, sécurisée, et prête à accueillir vos premiers utilisateurs.",
        Visual: VisualDeploy,
      },
      {
        num: "06",
        title: "Accompagnement & Maintenance",
        duration: "Continu",
        desc: "Support prioritaire, mises à jour sécurité, monitoring 24/7 et évolutions sur-mesure. Votre application continue de grandir avec votre business.",
        Visual: VisualAccompagnement,
      },
    ],
  },
];

const steps = phases.flatMap((p) => p.steps);

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export function SaasProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;

    const measure = () => {
      if (headerRef.current && trackRef.current && window.innerWidth >= 768) {
        const containerLeft = headerRef.current.getBoundingClientRect().left;
        const containerPaddingLeft = parseFloat(getComputedStyle(headerRef.current).paddingLeft) || 0;
        const contentLeft = containerLeft + containerPaddingLeft;
        trackRef.current.style.setProperty("padding-left", `${contentLeft}px`, "important");
        trackRef.current.style.setProperty("padding-right", `${contentLeft}px`, "important");
      } else if (trackRef.current) {
        trackRef.current.style.removeProperty("padding-left");
        trackRef.current.style.removeProperty("padding-right");
      }
    };

    requestAnimationFrame(() => requestAnimationFrame(() => {
      measure();
      setIsReady(true);
    }));
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  useGSAP(() => {
    if (!isReady || !sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!isMobileRef.current) {
      const totalScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      if (totalScroll <= 0) return;

      const scrollDistance = totalScroll * 1.3;

      gsap.to(track, {
        x: -totalScroll,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1.2,
          pin: true,
          pinType: "transform",
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      const progressFill = section.querySelector(".progress-line-fill");
      if (progressFill) {
        gsap.fromTo(progressFill,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              scrub: 1.2,
            },
          }
        );
      }

      const dots = section.querySelectorAll(".progress-dot");
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          backgroundColor: "rgb(201,100,66)",
          borderColor: "rgb(201,100,66)",
          scale: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${(scrollDistance * i) / (steps.length - 1)} top`,
            end: () => `top+=${(scrollDistance * (i + 0.15)) / (steps.length - 1)} top`,
            scrub: 0.5,
          },
        });
      });

    } else {
      const cards = track.querySelectorAll<HTMLElement>(".process-card");
      cards.forEach((card) => {
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
      });
    }
  }, { scope: sectionRef, dependencies: [isReady] });

  return (
    <>
      <section
      ref={sectionRef}
      id="process"
      className="relative section-dark-alt section-divider-orange overflow-hidden md:overflow-visible"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col py-16 md:py-0 md:h-screen md:justify-center">
        {/* ── Header ── */}
        <div ref={headerRef} className="container mx-auto px-6 md:px-12 mb-5 md:mb-6">
          <TextReveal
            text="Du brief au suivi. En 6 étapes."
            elementType="h2"
            className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
          />
          <p className="text-foreground-muted text-lg max-w-2xl leading-relaxed">
            Chaque projet suit un process éprouvé. Pas de surprises, pas de zones grises.
          </p>
        </div>

        {/* ── Progress line (desktop) — same padding as header ── */}
        <div className="hidden md:block container mx-auto px-6 md:px-12 mb-5 overflow-visible">
          <div className="relative h-[2px] overflow-visible">
            <div className="absolute inset-0 bg-foreground/5 rounded-full" />
            <div className="progress-line-fill absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary rounded-full" />
            <div className="absolute inset-0 flex justify-between items-center">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="progress-dot w-3 h-3 rounded-full bg-background border-2 border-foreground/10 relative z-10 transition-all duration-500"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Phase labels row (desktop) — aligned with header ── */}
        <div className="hidden md:block container mx-auto px-6 md:px-12 mb-4">
          <div className="flex justify-between">
            {phases.map((phase) => (
              <div key={phase.label} className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-lg ${phase.bgColor} border ${phase.borderColor} flex items-center justify-center ${phase.iconColor} transition-colors duration-500`}>
                  {phase.icon}
                </div>
                <span className={`text-sm font-bold uppercase tracking-[0.15em] ${phase.textColor}`}>
                  {phase.label}
                </span>
                <div className={`w-16 h-[1px] bg-gradient-to-r ${phase.lineColor} to-transparent`} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Horizontal track (desktop) / Vertical stack (mobile) ── */}
        <div className="overflow-hidden md:overflow-visible flex items-center">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-6 px-6 md:px-0 md:gap-8 md:w-max w-full"
          >

            {phases.map((phase, phaseIdx) => (
              <div key={phase.label} className="flex flex-col md:flex-row gap-6 md:gap-6 shrink-0">
                {/* Phase separator */}
                {phaseIdx > 0 && (
                  <div className="hidden md:flex flex-col items-center justify-center gap-2 w-[1px] shrink-0 mx-2">
                    <div className="flex-1 w-[1px] bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
                  </div>
                )}

                {/* Phase group container */}
                <div className="relative flex flex-col gap-4 md:gap-0 shrink-0">
                  {/* Phase label — mobile only (desktop labels are above) */}
                  <div className="flex md:hidden items-center gap-2.5 mb-2">
                    <div className={`w-7 h-7 rounded-lg ${phase.bgColor} border ${phase.borderColor} flex items-center justify-center ${phase.iconColor} transition-colors duration-500`}>
                      {phase.icon}
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-[0.15em] ${phase.textColor}`}>
                      {phase.label}
                    </span>
                  </div>

                  {/* Cards row */}
                  <div className="flex flex-col md:flex-row gap-6">
                    {phase.steps.map((step) => (
                      <SpotlightCard
                        key={step.num}
                        data-theme="dark"
                        className="process-card w-full md:w-[340px] lg:w-[380px] group shrink-0 !bg-background"
                      >
                        <div className="relative h-[400px] md:h-[420px] overflow-hidden">
                          {/* Dot pattern background */}
                          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

                          {/* Visual fills the card */}
                          <div className="absolute inset-x-0 top-0 bottom-[80px]">
                            <step.Visual />
                          </div>

                          {/* Large faded step number */}
                          <span className="absolute top-3 right-4 text-[80px] font-black font-mono leading-none text-accent-primary/[0.03] select-none pointer-events-none">
                            {step.num}
                          </span>

                          {/* Gradient overlay — default state */}
                          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none transition-opacity duration-700" />
                          {/* Gradient overlay — hover */}
                          <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />

                          {/* Text content pinned to bottom */}
                          <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col">
                            <div className="flex items-center gap-3 mb-1.5">
                              <span className={`text-sm font-mono font-bold tracking-wider ${phase.iconColor}`}>
                                {step.num}
                              </span>
                              <div className={`w-6 h-[1px] bg-gradient-to-r ${phase.lineColor} to-transparent`} />
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-primary/[0.08] border border-accent-primary/15">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                                <span className="text-sm font-mono font-semibold text-accent-primary/80">
                                  {step.duration}
                                </span>
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-accent-secondary transition-colors duration-500">
                              {step.title}
                            </h3>
                            {/* Description — revealed on hover */}
                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                              <div className="overflow-hidden">
                                <p className="text-foreground-muted text-[15px] leading-relaxed max-w-sm mt-2 pt-2 border-t border-foreground/10">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SpotlightCard>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* CTA */}
        <div className="px-6 md:px-12 mt-8 md:mt-10 flex justify-center">
          <button
            onClick={() => setCalOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 text-sm font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-all duration-500 shadow-sm group/cta cursor-pointer"
          >
            Réserver un call stratégique
            <svg className="w-4 h-4 transition-transform duration-500 group-hover/cta:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      </section>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
