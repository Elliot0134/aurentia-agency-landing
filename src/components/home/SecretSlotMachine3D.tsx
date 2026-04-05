"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { PRIZES, SHOWCASE } from "./easterEggData";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";

/* ─────────────────────────────────────────────
   Prize → landing page URL mapping
   ───────────────────────────────────────────── */
const PRIZE_URL_MAP: Record<string, string | null> = {
  "Skills Claude Code": "/formation/20-skills-claude",
  "Skills Claude": "/formation/20-skills-claude",
  "Formation Claude": "/formation/guide-demarrage-claude",
  "50€ Crédits": null, // contact by email
  "Perdu": null,
};

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */
const VISIBLE_ROWS = 3;
const REPEATS = 12;
const REEL_ITEMS = Array.from({ length: REPEATS }, () => PRIZES).flat();

/* ─────────────────────────────────────────────
   SlotReel — single vertical reel
   ───────────────────────────────────────────── */
function SlotReel({
  targetIndex,
  isSpinning,
  delay,
  onStop,
}: {
  targetIndex: number | null;
  isSpinning: boolean;
  delay: number;
  onStop?: () => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cellH, setCellH] = useState(58);
  const animationsEnabled = useAnimationsEnabled();

  // Measure actual cell height from container
  useEffect(() => {
    if (!wrapperRef.current) return;
    const h = wrapperRef.current.offsetHeight / VISIBLE_ROWS;
    setCellH(h);
    const onResize = () => setCellH(wrapperRef.current!.offsetHeight / VISIBLE_ROWS);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!animationsEnabled) return;
    if (!isSpinning || targetIndex === null || !stripRef.current) return;

    const landingCycle = 8;
    const landingIndex = landingCycle * PRIZES.length + targetIndex;
    const targetY = -((landingIndex - 1) * cellH);

    gsap.set(stripRef.current, { y: 0 });

    if (containerRef.current) {
      gsap.to(containerRef.current, { filter: "blur(1.5px)", duration: 0.2 });
    }

    gsap.to(stripRef.current, {
      y: targetY,
      duration: 3.5 + delay * 0.8,
      ease: "power4.out",
      delay: delay * 0.25,
      onUpdate() {
        if (!containerRef.current) return;
        const p = this.progress();
        if (p > 0.7) {
          containerRef.current.style.filter = `blur(${1.5 * (1 - (p - 0.7) / 0.3)}px)`;
        }
      },
      onComplete: () => {
        if (containerRef.current) containerRef.current.style.filter = "none";
        if (stripRef.current) {
          gsap.fromTo(
            stripRef.current,
            { y: targetY - 4 },
            { y: targetY, duration: 0.35, ease: "elastic.out(1.2, 0.4)", onComplete: () => onStop?.() }
          );
        }
      },
    });
  }, [animationsEnabled, isSpinning, targetIndex, delay, onStop, cellH]);

  return (
    <div ref={wrapperRef} className="relative flex-1 overflow-hidden h-full">
      {/* Curved reel illusion — top/bottom gradient */}
      <div className="absolute inset-x-0 top-0 h-8 z-10 pointer-events-none bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-8 z-10 pointer-events-none bg-gradient-to-t from-background to-transparent" />

      <div ref={containerRef}>
        <div ref={stripRef} className="will-change-transform">
          {REEL_ITEMS.map((prize, i) => (
            <div key={i} className="flex flex-col items-center justify-center select-none" style={{ height: cellH }}>
              <span className="text-2xl sm:text-3xl leading-none drop-shadow-sm">{prize.icon}</span>
              <span className="text-[6px] sm:text-[7px] font-mono font-bold tracking-wider uppercase mt-0.5 leading-none" style={{ color: prize.color, opacity: 0.6 }}>
                {prize.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Machine SVG Frame — the illustrated body
   ───────────────────────────────────────────── */
function MachineSVG() {
  return (
    <svg viewBox="0 0 360 440" fill="none" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet">
      {/* ═══ BASE / PEDESTAL ═══ */}
      <rect x="30" y="380" width="300" height="40" rx="8" fill="var(--text-primary, #3d3929)" />
      <rect x="50" y="370" width="260" height="14" rx="4" fill="var(--accent, #c96442)" />

      {/* ═══ MAIN BODY ═══ */}
      <rect x="45" y="100" width="270" height="275" rx="20" fill="var(--accent, #c96442)" />

      {/* ═══ REEL WINDOW FRAME ═══ */}
      <rect x="60" y="145" width="240" height="200" rx="14" fill="var(--text-primary, #3d3929)" />
      <rect x="67" y="152" width="226" height="186" rx="10" fill="var(--bg-base, #faf9f6)" />

      {/* Reel dividers */}
      <line x1="142" y1="152" x2="142" y2="338" stroke="var(--text-primary, #3d3929)" strokeWidth="1" opacity="0.1" />
      <line x1="218" y1="152" x2="218" y2="338" stroke="var(--text-primary, #3d3929)" strokeWidth="1" opacity="0.1" />

      {/* ═══ WIN LINE ARROWS ═══ */}
      <polygon points="56,245 66,238 66,252" fill="var(--accent, #c96442)" />
      <polygon points="304,245 294,238 294,252" fill="var(--accent, #c96442)" />

      {/* ═══ TOP CROWN ═══ */}
      <path d="M100 105 Q180 60 260 105" fill="var(--accent, #c96442)" />
      <circle cx="180" cy="78" r="22" fill="var(--accent, #c96442)" stroke="var(--bg-base, #faf9f6)" strokeWidth="2" />
      <text x="180" y="84" textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="800" fill="var(--bg-base, #faf9f6)" fontFamily="var(--font-heading)">A</text>

      {/* Decorative dots on crown */}
      <circle cx="130" cy="96" r="4" fill="var(--accent2, #b05730)" />
      <circle cx="230" cy="96" r="4" fill="var(--accent2, #b05730)" />

      {/* ═══ TITLE ═══ */}
      <text x="180" y="130" textAnchor="middle" dominantBaseline="middle" fontSize="15" fontWeight="800" fill="var(--bg-base, #faf9f6)" letterSpacing="0.15em" fontFamily="var(--font-heading)">
        LUCKY SPIN
      </text>

      {/* ═══ BOTTOM TRAY ═══ */}
      <rect x="100" y="355" width="160" height="18" rx="9" fill="var(--text-primary, #3d3929)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */
type Step = "idle" | "spinning" | "result";

export function SecretSlotMachine3D({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("idle");
  const [email, setEmail] = useState("");
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [, setStops] = useState(0);
  const machineRef = useRef<HTMLDivElement>(null);
  const winLineRef = useRef<HTMLDivElement>(null);

  const isValidEmail = email.includes("@") && email.includes(".");
  const wonPrize = prizeIndex !== null ? PRIZES[prizeIndex] : null;
  const prizeUrl = wonPrize ? PRIZE_URL_MAP[wonPrize.label] ?? null : null;

  const fireConfetti = useCallback(() => {
    const defaults = { startVelocity: 35, spread: 55, ticks: 100, zIndex: 9999, colors: ["#c96442", "#d97757", "#e8b931", "#9c87f5", "#fff"] };
    confetti({ ...defaults, particleCount: 60, origin: { x: 0.1, y: 0.6 }, angle: 60 });
    confetti({ ...defaults, particleCount: 60, origin: { x: 0.9, y: 0.6 }, angle: 120 });
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.2, y: 0.4 }, angle: 70 });
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.8, y: 0.4 }, angle: 110 });
    }, 250);
  }, []);

  const handleSpin = useCallback(async () => {
    if (!isValidEmail || step !== "idle") return;
    setApiError(null);

    try {
      const res = await fetch("/api/lucky-spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error ?? "Erreur serveur");
        return;
      }

      setPrizeIndex(data.prizeIndex as number);
      setStops(0);
      setStep("spinning");
    } catch {
      setApiError("Erreur réseau, réessaye.");
    }
  }, [isValidEmail, step, email]);

  const handleReelStop = useCallback(() => {
    setStops((prev) => {
      const newStops = prev + 1;

      // Shake on stop
      if (machineRef.current) {
        gsap.fromTo(machineRef.current, { x: -3 }, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" });
      }

      if (newStops === 3) {
        // Flash win line
        if (winLineRef.current) {
          gsap.fromTo(winLineRef.current, { opacity: 0.3 }, {
            opacity: 1,
            boxShadow: "0 0 20px 4px rgba(201, 100, 66, 0.5)",
            duration: 0.15, yoyo: true, repeat: 4,
          });
        }
        if (prizeIndex !== null && !PRIZES[prizeIndex].isLoss) {
          setTimeout(() => fireConfetti(), 300);
        }
        setTimeout(() => setStep("result"), 1000);
      }
      return newStops;
    });
  }, [prizeIndex, fireConfetti]);


  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* ── LEFT — Slot Machine ── */}
        <div className="relative lg:flex-1 flex items-center justify-center w-full">
          {/* Machine container — aspect ratio matches SVG viewBox 360x440 */}
          <div ref={machineRef} className="relative w-[280px] sm:w-[320px] lg:w-[360px]" style={{ aspectRatio: "360 / 440" }}>
            {/* SVG frame (absolute, fills container) */}
            <MachineSVG />

            {/* HTML reels — positioned to align with SVG reel window */}
            <div
              className="absolute overflow-hidden rounded-lg"
              style={{
                left: "20%",
                top: "35.7%",
                width: "60%",
                height: "40%",
              }}
            >
              {/* Win line highlight */}
              <div
                ref={winLineRef}
                className="absolute inset-x-1 z-20 pointer-events-none rounded-lg"
                style={{
                  top: "33.3%",
                  height: "33.3%",
                  border: "2px solid rgba(201, 100, 66, 0.4)",
                  background: "rgba(201, 100, 66, 0.04)",
                  opacity: 0.3,
                }}
              />

              {/* 3 reels */}
              <div className="flex h-full divide-x divide-foreground/[0.06]">
                <SlotReel
                  targetIndex={prizeIndex !== null ? (PRIZES[prizeIndex].isLoss ? (prizeIndex + 1) % PRIZES.length : prizeIndex) : null}
                  isSpinning={step === "spinning"} delay={0} onStop={handleReelStop}
                />
                <SlotReel
                  targetIndex={prizeIndex !== null ? (PRIZES[prizeIndex].isLoss ? (prizeIndex + 2) % PRIZES.length : prizeIndex) : null}
                  isSpinning={step === "spinning"} delay={1} onStop={handleReelStop}
                />
                <SlotReel
                  targetIndex={prizeIndex}
                  isSpinning={step === "spinning"} delay={2} onStop={handleReelStop}
                />
              </div>
            </div>

          </div>
        </div>

        {/* ── RIGHT — Form & Results (always visible) ── */}
        <div className="relative flex-1 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left min-w-0 z-10">
          {/* Header — always visible */}
          <div className="space-y-3 w-full max-w-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-accent-primary font-bold">Slot Machine</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-heading font-bold text-foreground leading-tight mb-1">
              Tourne les rouleaux,{" "}<span className="text-accent-primary">tente ta chance</span>.
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Aligne les symboles et remporte ton lot. 3 rouleaux, 1 chance.
            </p>
          </div>

          {/* Form — always visible */}
          <div className="w-full max-w-sm space-y-3">
            <div className="relative">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ton@email.com"
                disabled={step !== "idle"}
                className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.08] backdrop-blur-xl border border-foreground/[0.12] text-foreground placeholder:text-foreground-dim/50 focus:outline-none focus:border-accent-primary/40 focus:bg-foreground/[0.1] transition-all text-sm shadow-inner disabled:opacity-50"
                onKeyDown={(e) => e.key === "Enter" && handleSpin()}
              />
              {isValidEmail && step === "idle" && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-fade-in">
                  <div className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5L6.5 12L13 4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {apiError && (
              <p className="text-sm text-red-500 animate-fade-in">{apiError}</p>
            )}

            <button onClick={handleSpin} disabled={!isValidEmail || step !== "idle"}
              className="w-full px-6 py-4 rounded-2xl bg-accent-gradient text-white font-bold text-sm border border-white/10 backdrop-blur-xl shadow-lg shadow-accent-primary/20 disabled:opacity-20 disabled:shadow-none disabled:cursor-not-allowed hover:enabled:shadow-[0_8px_30px_-4px_rgba(201,100,66,0.6)] hover:enabled:scale-[1.02] active:enabled:scale-[0.98] transition-all duration-300"
            >
              {step === "idle" ? "Lancer les rouleaux" : step === "spinning" ? "En cours..." : "Terminé !"}
            </button>
          </div>

          {/* Result — appears below form when done */}
          {step === "result" && wonPrize && (
            <div className="space-y-4 w-full max-w-sm animate-fade-in">
              {wonPrize.isLoss ? (
                <p className="text-base text-foreground-muted">
                  Pas de chance cette fois... Merci d&apos;avoir tent&eacute; !
                </p>
              ) : (
                <div className="bg-foreground/[0.06] backdrop-blur-xl border border-foreground/[0.1] rounded-2xl p-6 border-l-4 relative overflow-hidden" style={{ borderLeftColor: wonPrize.color }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: wonPrize.color, opacity: 0.15 }} />
                  <div className="flex items-center gap-4 relative z-10">
                    <span className="text-4xl drop-shadow-md">{wonPrize.icon}</span>
                    <div>
                      <p className="text-sm font-mono tracking-wider uppercase mb-1" style={{ color: wonPrize.color }}>Jackpot !</p>
                      <p className="font-heading font-bold text-xl text-foreground">{wonPrize.label}</p>
                      <p className="text-sm text-foreground-muted mt-1">{wonPrize.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Link to lead magnet page */}
              {!wonPrize.isLoss && prizeUrl && (
                <a
                  href={prizeUrl}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-accent-gradient text-white font-bold text-sm border border-white/10 shadow-lg shadow-accent-primary/20 hover:shadow-[0_8px_30px_-4px_rgba(201,100,66,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  Acc&eacute;der &agrave; ton lot
                </a>
              )}

              {!wonPrize.isLoss && !prizeUrl && (
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-foreground/[0.06] border border-foreground/[0.1]">
                  <span className="text-2xl">📧</span>
                  <p className="text-sm text-foreground-muted">
                    On te contacte &agrave; <strong className="text-foreground">{email}</strong> pour tes cr&eacute;dits !
                  </p>
                </div>
              )}

              <button onClick={onClose}
                className="px-6 py-3 rounded-xl bg-foreground/[0.06] backdrop-blur-xl border border-foreground/[0.1] text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-foreground/[0.1] transition-all"
              >
                Retour au site &darr;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Prize showcase — always visible ── */}
      <div className="mt-14 lg:mt-20 w-full">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
          <p className="text-sm font-mono tracking-[0.2em] uppercase text-foreground-muted/60 flex-shrink-0">
            Lots &agrave; gagner
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {SHOWCASE.map((item) => (
            <div key={item.label} className="group rounded-2xl bg-foreground/[0.05] backdrop-blur-xl border border-foreground/[0.08] p-5 transition-all duration-300 hover:bg-foreground/[0.08] hover:border-foreground/[0.15] hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-inner" style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}11)` }}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-foreground">{item.label}</h4>
                  <p className="text-sm text-foreground-dim mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
