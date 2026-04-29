"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/animations/TextReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════
   VISUAL COMPONENTS — V2: immersive full-bleed designs
   ═══════════════════════════════════════════════════════ */

function VisualBriefing() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Multi-layer glow */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent-primary/[0.12] rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-8 w-32 h-32 bg-violet-500/[0.08] rounded-full blur-[60px]" />
      <div className="absolute top-16 left-4 w-20 h-20 bg-green-500/[0.06] rounded-full blur-[40px]" />

      {/* Floating orbit ring */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full border border-accent-primary/[0.06] animate-[spin_30s_linear_infinite]">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-primary/30 shadow-[0_0_8px_rgba(201,100,66,0.4)]" />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-400/30" />
      </div>

      <div className="relative flex flex-col items-center pt-6 px-5 space-y-3">
        {/* Scanning animation header */}
        <div className="flex items-center gap-3 w-full max-w-[300px]">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent-primary/25 to-accent-secondary/15 border border-accent-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(201,100,66,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-primary"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold text-foreground/80 block leading-tight">Analyse de marché</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse shadow-[0_0_4px_rgba(74,222,128,0.5)]" />
              <span className="text-sm font-mono text-green-400/60">Scan en cours...</span>
            </div>
          </div>
        </div>

        {/* Competitor cards — stacked with depth */}
        <div className="w-full max-w-[300px] space-y-2">
          {[
            { name: "Concurrent A", scores: { seo: 72, design: 58, perf: 81 }, color: "accent-primary" },
            { name: "Concurrent B", scores: { seo: 65, design: 84, perf: 69 }, color: "violet-500" },
            { name: "Concurrent C", scores: { seo: 91, design: 47, perf: 76 }, color: "green-500" },
          ].map((comp, idx) => (
            <div
              key={comp.name}
              className="bg-background/40 border border-foreground/[0.06] rounded-xl px-3.5 py-2.5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              style={{ transform: `translateX(${idx * 6}px)` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${comp.color}/50`} />
                  <span className="text-sm font-medium text-foreground/60">{comp.name}</span>
                </div>
                <span className="text-sm font-mono text-foreground/25">#{idx + 1}</span>
              </div>
              <div className="flex gap-2">
                {Object.entries(comp.scores).map(([key, val]) => (
                  <div key={key} className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-mono text-foreground/30 uppercase">{key}</span>
                      <span className="text-sm font-mono font-bold text-foreground/50">{val}</span>
                    </div>
                    <div className="h-1 bg-foreground/[0.04] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-${comp.color}/50 to-${comp.color}/20`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendations floating */}
        <div className="w-full max-w-[300px] bg-gradient-to-r from-accent-primary/[0.06] to-transparent border border-accent-primary/10 rounded-xl px-3.5 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary/70"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /></svg>
            <span className="text-sm font-semibold text-accent-primary/70">Recommandations IA</span>
          </div>
          <div className="space-y-1">
            {["Optimiser les meta descriptions", "Ajouter des structured data", "Améliorer le LCP < 2.5s"].map((rec, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent-primary/40" />
                <span className="text-sm text-foreground/40">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualVisio() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Ambient light */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent-primary/[0.08] rounded-full blur-[60px]" />
      <div className="absolute bottom-24 left-4 w-32 h-32 bg-blue-500/[0.06] rounded-full blur-[50px]" />

      <div className="relative flex flex-col items-center pt-4 px-4">
        {/* Video call window — larger, more detailed */}
        <div className="w-full max-w-[320px] bg-background/60 border border-foreground/[0.08] rounded-2xl overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.4)] backdrop-blur-md">
          {/* Top bar with controls */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-foreground/[0.03] border-b border-foreground/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70 shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse" />
              <span className="text-sm font-medium text-foreground/50">Visio stratégique</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-foreground/[0.04] rounded-lg px-2.5 py-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-foreground/25"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span className="text-sm font-mono text-foreground/35">32:14</span>
              </div>
              <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-lg px-2 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/70 animate-pulse" />
                <span className="text-sm font-mono text-red-400/60">REC</span>
              </div>
            </div>
          </div>

          {/* Participants — larger with more detail */}
          <div className="p-3 flex gap-2.5">
            <div className="flex-1 aspect-[4/3] rounded-xl bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.08] border border-foreground/[0.06] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Subtle grid pattern inside */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/20 border border-accent-primary/25 flex items-center justify-center shadow-[0_0_24px_rgba(201,100,66,0.2)]">
                <span className="text-sm font-bold text-accent-primary">A</span>
              </div>
              <span className="absolute bottom-2 left-2.5 text-sm font-medium text-foreground/40">Aurentia</span>
              {/* Speaking indicator */}
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500/15 rounded-full px-1.5 py-0.5">
                <div className="w-1 h-1 rounded-full bg-green-400/70 animate-pulse" />
              </div>
            </div>
            <div className="flex-1 aspect-[4/3] rounded-xl bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.08] border border-foreground/[0.06] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="w-12 h-12 rounded-full bg-foreground/8 border border-foreground/12 flex items-center justify-center">
                <span className="text-sm font-bold text-foreground/50">Vous</span>
              </div>
              {/* Audio waveform — more bars */}
              <div className="absolute bottom-2 right-2.5 flex items-end gap-[2px] h-4">
                {[35, 65, 45, 85, 55, 75, 40, 90, 60, 50].map((h, i) => (
                  <div key={i} className="w-[2px] bg-green-400/40 rounded-full animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
            </div>
          </div>

          {/* AI transcript panel — richer */}
          <div className="mx-3 mb-3 bg-gradient-to-br from-accent-primary/[0.06] to-violet-500/[0.03] border border-accent-primary/10 rounded-xl px-3.5 py-2.5 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-accent-primary/15 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(201,100,66,0.15)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent-primary/80"><circle cx="12" cy="12" r="4" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              </div>
              <span className="text-sm font-semibold text-accent-primary/70">IA — Retranscription live</span>
              <div className="ml-auto flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/50 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/40 animate-pulse [animation-delay:200ms]" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/30 animate-pulse [animation-delay:400ms]" />
              </div>
            </div>
            {/* Extracted features */}
            <div className="flex flex-wrap gap-1.5">
              {["Landing page", "SEO", "Blog IA", "Dashboard"].map((feat) => (
                <span key={feat} className="text-sm font-mono text-foreground/50 bg-foreground/[0.04] border border-foreground/[0.06] rounded-md px-2 py-0.5">
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualCode() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-500/[0.08] rounded-full blur-[60px]" />
      <div className="absolute bottom-32 right-4 w-24 h-24 bg-accent-primary/[0.06] rounded-full blur-[40px]" />

      {/* Floating code particles */}
      <div className="absolute top-12 left-6 text-sm font-mono text-foreground/[0.06] animate-pulse">&lt;div&gt;</div>
      <div className="absolute top-20 right-8 text-sm font-mono text-green-400/[0.08] animate-pulse [animation-delay:1s]">const</div>
      <div className="absolute top-32 left-10 text-sm font-mono text-violet-400/[0.06] animate-pulse [animation-delay:2s]">async</div>

      <div className="relative flex flex-col items-center pt-3 px-3">
        {/* IDE / Terminal window */}
        <div className="w-full max-w-[320px] bg-[#0d1117] border border-foreground/[0.08] rounded-2xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.5)]">
          {/* Tab bar */}
          <div className="flex items-center gap-0 bg-[#161b22] border-b border-foreground/[0.06]">
            <div className="flex items-center gap-2 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
              </div>
            </div>
            <div className="flex-1 flex">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d1117] border-b-2 border-accent-primary/50 text-sm font-mono text-foreground/40">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400/60"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                page.tsx
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 text-sm font-mono text-foreground/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/15"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                actions.ts
              </div>
            </div>
          </div>

          {/* Code content */}
          <div className="p-4 font-mono text-sm space-y-1 leading-relaxed">
            <div><span className="text-foreground/15 select-none mr-3">1</span><span className="text-violet-400/70">import</span> <span className="text-foreground/50">&#123; Hero, Services &#125;</span></div>
            <div><span className="text-foreground/15 select-none mr-3">2</span><span className="text-violet-400/70">import</span> <span className="text-foreground/50">&#123; generateMetadata &#125;</span></div>
            <div><span className="text-foreground/15 select-none mr-3">3</span></div>
            <div><span className="text-foreground/15 select-none mr-3">4</span><span className="text-violet-400/70">export default</span> <span className="text-blue-400/70">function</span> <span className="text-yellow-400/70">Page</span><span className="text-foreground/30">() &#123;</span></div>
            <div><span className="text-foreground/15 select-none mr-3">5</span>  <span className="text-violet-400/70">return</span> <span className="text-foreground/30">(</span></div>
            <div className="flex items-center"><span className="text-foreground/15 select-none mr-3">6</span>    <span className="text-green-400/70">&lt;main&gt;</span><span className="text-accent-primary/60 animate-pulse">|</span></div>
          </div>

          {/* AI suggestion overlay */}
          <div className="mx-3 mb-3 bg-gradient-to-r from-green-500/[0.06] to-transparent border border-green-500/15 rounded-xl px-3.5 py-2.5">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded-md bg-green-500/15 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400/80"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <span className="text-sm font-semibold text-green-400/60">IA — Suggestion</span>
            </div>
            <div className="font-mono text-sm text-green-400/40 space-y-0.5">
              <div>  &lt;Hero title=&quot;Votre site&quot; /&gt;</div>
              <div>  &lt;Services data=&#123;...&#125; /&gt;</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-0.5">
                <span className="text-sm font-mono text-green-400/60">Tab ↹ Accepter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Build status floating */}
        <div className="absolute bottom-4 right-4 bg-background/60 border border-green-500/15 rounded-xl px-3 py-2 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.2)] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400/80 shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
          <span className="text-sm font-mono text-green-400/60">Build OK</span>
          <span className="text-sm font-mono text-foreground/20">4.5s</span>
        </div>
      </div>
    </div>
  );
}

function VisualIterations() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent-primary/[0.06] rounded-full blur-[70px]" />

      <div className="relative flex flex-col items-center pt-6 px-5">
        {/* Timeline with rich version cards */}
        <div className="w-full max-w-[300px] space-y-3">
          {/* V1 */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.08] flex items-center justify-center">
                <span className="font-mono font-bold text-foreground/30 text-sm">V1</span>
              </div>
              <div className="w-[1px] h-8 bg-gradient-to-b from-foreground/10 to-transparent mt-1" />
            </div>
            <div className="flex-1 bg-background/40 border border-foreground/[0.06] rounded-xl px-3.5 py-2.5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground/50">Wireframes</span>
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400/60"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-sm font-mono text-green-400/50">Validé</span>
                </div>
              </div>
              <div className="flex gap-1">
                {[1,2,3].map(i => (
                  <div key={i} className="flex-1 h-6 rounded bg-foreground/[0.03] border border-foreground/[0.04]" />
                ))}
              </div>
            </div>
          </div>

          {/* V2 */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-foreground/[0.06] border border-foreground/[0.10] flex items-center justify-center">
                <span className="font-mono font-bold text-foreground/40 text-sm">V2</span>
              </div>
              <div className="w-[1px] h-8 bg-gradient-to-b from-accent-primary/20 to-transparent mt-1" />
            </div>
            <div className="flex-1 bg-background/40 border border-foreground/[0.06] rounded-xl px-3.5 py-2.5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground/50">Design complet</span>
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400/60"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-sm font-mono text-green-400/50">Validé</span>
                </div>
              </div>
              <div className="flex gap-1">
                {[1,2,3].map(i => (
                  <div key={i} className="flex-1 h-6 rounded bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.02] border border-foreground/[0.05]" />
                ))}
              </div>
            </div>
          </div>

          {/* Final — highlighted */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 border border-accent-primary/25 flex items-center justify-center shadow-[0_0_16px_rgba(201,100,66,0.15)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent-primary"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-accent-primary/[0.06] to-transparent border border-accent-primary/15 rounded-xl px-3.5 py-2.5 backdrop-blur-sm shadow-[0_4px_20px_rgba(201,100,66,0.08)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-accent-primary/80">Rendu final</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400/70 shadow-[0_0_4px_rgba(74,222,128,0.5)]" />
                  <span className="text-sm font-mono text-green-400/60">Live</span>
                </div>
              </div>
              <div className="flex gap-1">
                {[1,2,3].map(i => (
                  <div key={i} className="flex-1 h-6 rounded bg-gradient-to-br from-accent-primary/10 to-accent-primary/[0.03] border border-accent-primary/10" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp notification — richer */}
        <div className="mt-3 w-full max-w-[300px] bg-[#075e54]/15 border border-[#25d366]/15 rounded-xl px-3.5 py-2.5 flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-sm">
          <div className="w-9 h-9 rounded-xl bg-[#25d366]/15 border border-[#25d366]/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#25d366]/80"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" /></svg>
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-[#25d366]/70 block">Nouvelle version dispo !</span>
            <span className="text-sm font-mono text-foreground/25">il y a 2 min · Aurentia</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualFormation() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-8 left-1/4 w-36 h-36 bg-violet-500/[0.08] rounded-full blur-[60px]" />
      <div className="absolute bottom-24 right-8 w-28 h-28 bg-accent-primary/[0.06] rounded-full blur-[50px]" />

      <div className="relative flex flex-col items-center pt-5 px-4 space-y-2.5">
        {/* Skills livrés */}
        <div className="w-full max-w-[300px] bg-background/40 border border-foreground/[0.06] rounded-2xl p-3.5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-primary/25 to-accent-secondary/15 border border-accent-primary/20 flex items-center justify-center shadow-[0_0_16px_rgba(201,100,66,0.15)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary/80"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground/70 block">Skills IA personnalisés</span>
              <span className="text-sm font-mono text-foreground/30">3 skills livrés</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { name: "/generate-content", desc: "Génère articles SEO", color: "accent-primary" },
              { name: "/analyze-leads", desc: "Analyse vos prospects", color: "violet-500" },
              { name: "/social-posts", desc: "Posts réseaux sociaux", color: "green-500" },
            ].map((skill) => (
              <div key={skill.name} className="flex items-center gap-2.5 bg-foreground/[0.02] border border-foreground/[0.04] rounded-lg px-3 py-2">
                <div className={`w-1.5 h-1.5 rounded-full bg-${skill.color}/50`} />
                <span className="text-sm font-mono font-medium text-foreground/50">{skill.name}</span>
                <span className="text-sm text-foreground/25 ml-auto hidden sm:block">{skill.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formation module */}
        <div className="w-full max-w-[300px] bg-gradient-to-br from-violet-500/[0.05] to-transparent border border-violet-500/10 rounded-2xl p-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/25 to-violet-600/15 border border-violet-500/20 flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.15)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-400/80"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
            </div>
            <div className="flex-1">
              <span className="text-sm font-semibold text-foreground/70 block">Formation IA offerte</span>
              <span className="text-sm font-mono text-violet-400/50">Maîtrisez l&apos;IA</span>
            </div>
            <span className="text-sm font-mono font-bold text-violet-400/60 bg-violet-500/10 border border-violet-500/15 rounded-lg px-2 py-0.5">Gratuit</span>
          </div>
          {/* Modules */}
          <div className="space-y-2">
            {[
              { name: "Prompts efficaces", done: true },
              { name: "Automatiser son workflow", done: true },
              { name: "IA pour le business", done: false },
            ].map((mod, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${mod.done ? "bg-green-500/15 border border-green-500/25" : "bg-foreground/[0.04] border border-foreground/[0.08]"}`}>
                  {mod.done ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-400/70"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    <span className="text-sm font-mono text-foreground/25">{i + 1}</span>
                  )}
                </div>
                <span className={`text-sm ${mod.done ? "text-foreground/50" : "text-foreground/30"}`}>{mod.name}</span>
                {mod.done && <span className="text-sm font-mono text-green-400/40 ml-auto">Complété</span>}
              </div>
            ))}
          </div>
          {/* Progress */}
          <div className="mt-2.5 h-1.5 bg-foreground/[0.04] rounded-full overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-500/50 via-accent-primary/40 to-accent-primary/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualAccompagnement() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-10 right-8 w-36 h-36 bg-cyan-500/[0.08] rounded-full blur-[60px]" />
      <div className="absolute bottom-28 left-4 w-28 h-28 bg-accent-primary/[0.06] rounded-full blur-[50px]" />

      <div className="relative flex flex-col items-center pt-5 px-4 space-y-2.5">
        {/* Dashboard panel */}
        <div className="w-full max-w-[300px] bg-background/40 border border-foreground/[0.06] rounded-2xl overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-foreground/[0.06]">
            <span className="text-sm font-semibold text-foreground/60">Dashboard client</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse shadow-[0_0_4px_rgba(74,222,128,0.4)]" />
              <span className="text-sm font-mono text-green-400/50">En ligne</span>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-3 gap-[1px] bg-foreground/[0.04]">
            {[
              { label: "Uptime", value: "99.9%", color: "text-green-400/70" },
              { label: "Visiteurs", value: "2.4k", color: "text-accent-primary/70" },
              { label: "Réponse", value: "<2h", color: "text-cyan-400/70" },
            ].map((m) => (
              <div key={m.label} className="bg-background/60 px-3 py-2.5 text-center">
                <span className={`text-lg font-bold font-mono ${m.color} block leading-tight`}>{m.value}</span>
                <span className="text-sm font-mono text-foreground/25">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Blog IA card */}
        <div className="w-full max-w-[300px] bg-gradient-to-br from-cyan-500/[0.05] to-transparent border border-cyan-500/10 rounded-xl px-3.5 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/25 to-cyan-600/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.12)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400/80"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            </div>
            <div className="flex-1">
              <span className="text-sm font-semibold text-foreground/70">Blog IA automatisé</span>
            </div>
            <div className="flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/15 rounded-lg px-2 py-0.5">
              <div className="w-1 h-1 rounded-full bg-cyan-400/60 animate-pulse" />
              <span className="text-sm font-mono text-cyan-400/60">Actif</span>
            </div>
          </div>
          {/* Recent articles */}
          <div className="space-y-1.5">
            {[
              { title: "5 tendances IA en 2025", views: "342" },
              { title: "Comment optimiser son SEO", views: "128" },
            ].map((article) => (
              <div key={article.title} className="flex items-center justify-between bg-foreground/[0.02] border border-foreground/[0.04] rounded-lg px-2.5 py-1.5">
                <span className="text-sm text-foreground/40 truncate">{article.title}</span>
                <span className="text-sm font-mono text-foreground/20 shrink-0 ml-2">{article.views} vues</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support card */}
        <div className="w-full max-w-[300px] bg-background/40 border border-foreground/[0.06] rounded-xl px-3.5 py-2.5 backdrop-blur-sm flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 border border-accent-primary/15 flex items-center justify-center shadow-[0_0_12px_rgba(201,100,66,0.1)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary/80"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground/60">Évolutions sur-mesure</span>
            <span className="text-sm font-mono text-foreground/25 block">Support prioritaire inclus</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/15"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   STEPS DATA
   ═══════════════════════════════════════════════════════ */

const steps = [
  {
    num: "01",
    title: "Briefing IA",
    desc: "Avant même le premier appel, notre IA analyse votre marché : benchmarks concurrentiels, recommandations stratégiques, opportunités identifiées.",
    Visual: VisualBriefing,
  },
  {
    num: "02",
    title: "Visio stratégique",
    desc: "On échange en visio pour affiner votre vision. Tout est retranscrit par l\u2019IA et transformé en features actionnables — zéro perte d\u2019information.",
    Visual: VisualVisio,
  },
  {
    num: "03",
    title: "Code sur-mesure",
    desc: "Les features partent directement chez notre développeur, qui code avec l\u2019intelligence artificielle et une expertise web pointue — pour un résultat rapide, fiable et sur-mesure.",
    Visual: VisualCode,
  },
  {
    num: "04",
    title: "Livraison itérative",
    desc: "V1, V2, rendu final — vous suivez chaque étape. Votre interlocuteur et vous êtes notifiés en temps réel via WhatsApp. Zéro surprise.",
    Visual: VisualIterations,
  },
  {
    num: "05",
    title: "Formation IA",
    desc: "Skills Claude personnalisés pour votre activité + formation offerte pour maîtriser l\u2019IA au quotidien. Vous repartez autonome.",
    Visual: VisualFormation,
  },
  {
    num: "06",
    title: "Accompagnement",
    desc: "Back-office IA, blog automatisé, évolutions sur-mesure, support réactif — votre site continue de travailler et grandir avec vous.",
    Visual: VisualAccompagnement,
  },
];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT — V2: Full-bleed visual cards
   ═══════════════════════════════════════════════════════ */

export function HomeProcessV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const isMobileRef = useRef(false);
  const animationsEnabled = useAnimationsEnabled();

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    const raf = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!isReady || !sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!isMobileRef.current) {
      const totalScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      if (totalScroll <= 0) return;

      const scrollDistance = totalScroll;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
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

      const progressFill = section.querySelector(".v2-progress-line-fill");
      if (progressFill) {
        gsap.fromTo(progressFill,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              scrub: 1.2,
            },
          }
        );
      }

      const dots = section.querySelectorAll(".v2-progress-dot");
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          backgroundColor: "rgb(201,100,66)",
          borderColor: "rgb(201,100,66)",
          scale: 1.4,
          boxShadow: "0 0 12px rgba(201,100,66,0.6)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${(scrollDistance * i) / (steps.length - 1)} top`,
            end: () => `top+=${(scrollDistance * (i + 0.3)) / (steps.length - 1)} top`,
            scrub: 1,
          },
        });
      });

    } else {
      const cards = track.querySelectorAll<HTMLElement>(".process-card-v2");
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
  }, { scope: sectionRef, dependencies: [isReady, animationsEnabled] });

  return (
    <section
      ref={sectionRef}
      id="process-v2"
      className="relative section-dark-alt section-divider-orange overflow-hidden md:overflow-visible"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col py-16 md:py-0 md:h-screen md:justify-center">
        {/* ── Header ── */}
        <div className="container mx-auto px-6 md:px-12 mb-5 md:mb-6">
          <TextReveal
            text="Notre méthode."
            elementType="h2"
            className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
          />
          <p className="text-foreground-muted text-lg max-w-2xl leading-relaxed">
            De l&apos;IA qui prépare le terrain au code qui livre — chaque étape est augmentée.
          </p>
        </div>

        {/* ── Progress line (desktop) ── */}
        <div className="hidden md:block container mx-auto px-6 md:px-12 mb-5 overflow-visible">
          <div className="relative h-[2px] overflow-visible">
            <div className="absolute inset-0 bg-foreground/5 rounded-full" />
            <div className="v2-progress-line-fill absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary rounded-full shadow-[0_0_12px_rgba(201,100,66,0.6)]" />
            <div className="absolute inset-0 flex justify-between items-center">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="v2-progress-dot w-3 h-3 rounded-full bg-background border-2 border-foreground/10 relative z-10 transition-all duration-500"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Horizontal track (desktop) / Vertical stack (mobile) ── */}
        <div className="overflow-hidden md:overflow-visible flex items-center">
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row gap-6 px-6 md:pl-12 md:pr-12 md:gap-8 md:w-max w-full"
          >
            {steps.map((step) => (
              <SpotlightCard
                key={step.num}
                className="process-card-v2 w-full md:w-[380px] lg:w-[420px] group shrink-0"
              >
                {/* Full-bleed visual as entire card background */}
                <div className="relative h-[480px] md:h-[520px] overflow-hidden">
                  {/* Dot pattern background */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

                  {/* Visual fills the card */}
                  <div className="absolute inset-x-0 top-0 bottom-[140px]">
                    <step.Visual />
                  </div>

                  {/* Large faded step number */}
                  <span className="absolute top-3 right-4 text-[80px] font-black font-mono leading-none text-accent-primary/[0.03] select-none pointer-events-none">
                    {step.num}
                  </span>

                  {/* Dark gradient overlay at bottom for text */}
                  <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/95 via-black/80 to-transparent pointer-events-none" />

                  {/* Text content pinned to bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono font-bold text-accent-primary/80 tracking-wider">
                        {step.num}
                      </span>
                      <div className="w-6 h-[1px] bg-gradient-to-r from-accent-primary/40 to-transparent" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-secondary transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-[15px] leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 md:px-12 mt-8 md:mt-10 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 text-sm font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-all duration-500 shadow-sm group/cta"
          >
            Prêt à démarrer ?
            <svg className="w-4 h-4 transition-transform duration-500 group-hover/cta:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
