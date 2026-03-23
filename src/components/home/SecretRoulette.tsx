"use client";

import { useState, useCallback, useRef } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";

/* ─────────────────────────────────────────────
   Configuration
   ───────────────────────────────────────────── */
import { PRIZES, SHOWCASE, pickPrize, type Prize } from "./easterEggData";

const SEGMENT_ANGLE = 360 / PRIZES.length;

function fireConfetti() {
  const defaults = { startVelocity: 35, spread: 55, ticks: 100, zIndex: 9999, colors: ["#c96442", "#d97757", "#e8b931", "#9c87f5", "#fff"] };
  confetti({ ...defaults, particleCount: 60, origin: { x: 0.1, y: 0.6 }, angle: 60 });
  confetti({ ...defaults, particleCount: 60, origin: { x: 0.9, y: 0.6 }, angle: 120 });
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 40, origin: { x: 0.2, y: 0.4 }, angle: 70 });
    confetti({ ...defaults, particleCount: 40, origin: { x: 0.8, y: 0.4 }, angle: 110 });
  }, 250);
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.5, y: 0.3 }, spread: 100 });
  }, 500);
}

/* ─────────────────────────────────────────────
   Wheel — Premium design with gradients, rings & ticks
   ───────────────────────────────────────────── */
function WheelSVG() {
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 16;
  const r = outerR - 18;
  const tickCount = 48;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      <defs>
        {/* Segment gradients — radial from center for depth */}
        {PRIZES.map((prize, i) => (
          <radialGradient key={`grad-${i}`} id={`seg-grad-${i}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={prize.color} stopOpacity={prize.isLoss ? 0.15 : 0.35} />
            <stop offset="100%" stopColor={prize.color} stopOpacity={prize.isLoss ? 0.5 : 0.95} />
          </radialGradient>
        ))}

        {/* Outer ring metallic gradient */}
        <linearGradient id="ring-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>

        {/* Hub gradient */}
        <radialGradient id="hub-grad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </radialGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Inner shadow for depth */}
        <filter id="inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="6" />
          <feOffset dx="0" dy="3" result="offsetblur" />
          <feFlood floodColor="rgba(0,0,0,0.5)" result="color" />
          <feComposite in2="offsetblur" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>

      {/* ── Outer decorative ring ── */}
      <circle cx={cx} cy={cy} r={outerR + 6} fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.08" />
      <circle cx={cx} cy={cy} r={outerR} fill="url(#ring-grad)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={outerR - 16} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

      {/* ── Tick marks around outer ring ── */}
      {Array.from({ length: tickCount }).map((_, i) => {
        const angle = (i * 360 / tickCount - 90) * Math.PI / 180;
        const isMajor = i % (tickCount / PRIZES.length) === 0;
        const innerTick = outerR - (isMajor ? 15 : 10);
        const outerTick = outerR - 1;
        return (
          <line
            key={`tick-${i}`}
            x1={cx + innerTick * Math.cos(angle)}
            y1={cy + innerTick * Math.sin(angle)}
            x2={cx + outerTick * Math.cos(angle)}
            y2={cy + outerTick * Math.sin(angle)}
            stroke={isMajor ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}
            strokeWidth={isMajor ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* ── Segments ── */}
      {PRIZES.map((prize, i) => {
        const startAngle = i * SEGMENT_ANGLE - 90;
        const endAngle = startAngle + SEGMENT_ANGLE;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);

        const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
        const iconX = cx + r * 0.62 * Math.cos(midAngle);
        const iconY = cy + r * 0.62 * Math.sin(midAngle);

        // Label position — closer to edge
        const labelX = cx + r * 0.38 * Math.cos(midAngle);
        const labelY = cy + r * 0.38 * Math.sin(midAngle);
        const labelRotation = (startAngle + endAngle) / 2 + 90;

        return (
          <g key={i}>
            {/* Segment fill */}
            <path
              d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
              fill={`url(#seg-grad-${i})`}
              filter="url(#inner-shadow)"
            />

            {/* Subtle inner highlight on top edge of segment */}
            <path
              d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
            />

            {/* Separator line — refined */}
            <line
              x1={cx} y1={cy} x2={x1} y2={y1}
              stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
            />

            {/* Icon — with glow */}
            <text
              x={iconX} y={iconY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="32"
              filter="url(#glow)"
            >
              {prize.icon}
            </text>

            {/* Label text — rotated along segment */}
            <text
              x={labelX} y={labelY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="9"
              fontWeight="600"
              fill="rgba(255,255,255,0.7)"
              letterSpacing="0.05em"
              transform={`rotate(${labelRotation}, ${labelX}, ${labelY})`}
              fontFamily="var(--font-mono, monospace)"
            >
              {prize.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* ── Inner ring border ── */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

      {/* ── Center hub — layered for depth ── */}
      {/* Outer hub ring */}
      <circle cx={cx} cy={cy} r="52" fill="rgba(0,0,0,0.4)" />
      <circle cx={cx} cy={cy} r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

      {/* Hub decorative ring */}
      <circle cx={cx} cy={cy} r="46" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.2" />

      {/* Inner hub */}
      <circle cx={cx} cy={cy} r="40" fill="url(#hub-grad)" />
      <circle cx={cx} cy={cy} r="40" fill="var(--bg-base)" opacity="0.85" />
      <circle cx={cx} cy={cy} r="40" fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.35" />

      {/* Hub accent dots */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg - 90) * Math.PI / 180;
        return (
          <circle
            key={`dot-${deg}`}
            cx={cx + 46 * Math.cos(rad)}
            cy={cy + 46 * Math.sin(rad)}
            r="2"
            fill="var(--accent)"
            opacity="0.4"
          />
        );
      })}

      {/* Center text */}
      <text
        x={cx} y={cy - 6}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="22" fontWeight="800"
        fill="var(--accent)"
        fontFamily="var(--font-heading)"
        filter="url(#glow)"
      >
        A
      </text>
      <text
        x={cx} y={cy + 12}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="6"
        fontWeight="500"
        fill="rgba(255,255,255,0.4)"
        letterSpacing="0.2em"
        fontFamily="var(--font-mono, monospace)"
      >
        SPIN
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main component — wheel + form only (no title)
   ───────────────────────────────────────────── */
type Step = "idle" | "spinning" | "result";

interface SecretRouletteProps {
  onClose: () => void;
}

export function SecretRoulette({ onClose }: SecretRouletteProps) {
  const [step, setStep] = useState<Step>("idle");
  const [email, setEmail] = useState("");
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const isValidEmail = email.includes("@") && email.includes(".");
  const wonPrize = prizeIndex !== null ? PRIZES[prizeIndex] : null;

  const handleSpin = useCallback(() => {
    if (!isValidEmail || step !== "idle") return;

    const winIndex = pickPrize();
    setPrizeIndex(winIndex);
    setStep("spinning");

    const targetCenter = winIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const fullSpins = 6 + Math.floor(Math.random() * 3);
    const finalAngle = fullSpins * 360 + (360 - targetCenter);

    if (wheelRef.current) {
      gsap.fromTo(
        wheelRef.current,
        { rotation: 0 },
        {
          rotation: finalAngle,
          duration: 6,
          ease: "power4.out",
          onComplete: () => {
            if (!PRIZES[winIndex].isLoss) {
              fireConfetti();
            }
            setStep("result");
          },
        }
      );
    }
  }, [isValidEmail, step]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* ── LEFT — Wheel ── */}
        <div className="relative lg:flex-1 flex items-center justify-center">
          {/* Ambient glow */}
          <div className="absolute inset-[-30%] pointer-events-none">
            <div className="w-full h-full rounded-full blur-[80px] opacity-10"
              style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
            />
          </div>

          {/* Pointer — premium diamond shape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <svg width="36" height="48" viewBox="0 0 36 48" fill="none" className="drop-shadow-xl">
              <defs>
                <linearGradient id="pointer-grad" x1="18" y1="0" x2="18" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e8b931" />
                  <stop offset="50%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="#c96442" />
                </linearGradient>
                <filter id="pointer-glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M18 44 L4 8 Q2 2 8 2 L28 2 Q34 2 32 8 Z"
                fill="url(#pointer-grad)"
                filter="url(#pointer-glow)"
              />
              <path
                d="M18 44 L4 8 Q2 2 8 2 L28 2 Q34 2 32 8 Z"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
              />
              {/* Center line highlight */}
              <path d="M18 40 L18 6" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>

          {/* Wheel */}
          <div
            ref={wheelRef}
            className="will-change-transform w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]"
            style={{ transformOrigin: "center center" }}
          >
            <WheelSVG />
          </div>

          {/* Lock overlay */}
          {!isValidEmail && step === "idle" && (
            <div className="absolute inset-0 rounded-full bg-background/50 backdrop-blur-[2px] flex items-center justify-center pointer-events-none z-20">
              <div className="bg-foreground/[0.08] backdrop-blur-xl border border-foreground/[0.12] rounded-2xl px-5 py-4 flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent-primary">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="text-[10px] font-mono text-foreground-muted tracking-wider">
                  Email pour d&eacute;bloquer
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT — Form & Results ── */}
        <div className="flex-1 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left min-w-0">

          {/* Form — idle state */}
          {step === "idle" && (
            <div className="space-y-3 w-full max-w-sm animate-fade-in">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-tight mb-1">
                Tourne la roue,{" "}
                <span className="text-accent-primary">gagne ton cadeau</span>.
              </h3>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.08] backdrop-blur-xl border border-foreground/[0.12] text-foreground placeholder:text-foreground-dim/50 focus:outline-none focus:border-accent-primary/40 focus:bg-foreground/[0.1] transition-all text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleSpin()}
                />
                {isValidEmail && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-fade-in">
                    <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSpin}
                disabled={!isValidEmail}
                className="w-full px-6 py-4 rounded-2xl bg-accent-gradient text-white font-bold text-sm border border-white/10 backdrop-blur-xl shadow-lg shadow-accent-primary/20 disabled:opacity-20 disabled:shadow-none disabled:cursor-not-allowed hover:enabled:shadow-[0_8px_30px_-4px_rgba(201,100,66,0.5)] active:enabled:scale-[0.98] transition-all duration-300"
              >
                Tourner la roue
              </button>
              <p className="text-[11px] text-foreground-dim/50 text-center lg:text-left">
                Pas de spam. Juste ton cadeau.
              </p>
            </div>
          )}

          {/* Spinning state */}
          {step === "spinning" && (
            <div className="animate-fade-in space-y-3">
              <p className="text-base text-foreground-muted">La roue tourne&hellip;</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Result state */}
          {step === "result" && wonPrize && (
            <div className="space-y-5 animate-fade-in">
              {wonPrize.isLoss ? (
                <div className="space-y-3">
                  <p className="text-base text-foreground-muted max-w-sm">
                    Pas de chance cette fois&hellip; Mais on t&apos;a quand m&ecirc;me envoy&eacute; un petit cadeau surprise par email.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-foreground/[0.06] backdrop-blur-xl border border-foreground/[0.1] rounded-2xl p-6 max-w-sm border-l-4" style={{ borderLeftColor: wonPrize.color }}>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{wonPrize.icon}</span>
                      <div>
                        <p className="text-sm font-mono tracking-wider uppercase mb-1" style={{ color: wonPrize.color }}>
                          Gagn&eacute;
                        </p>
                        <p className="font-heading font-bold text-lg text-foreground">{wonPrize.label}</p>
                        <p className="text-sm text-foreground-muted mt-1">{wonPrize.desc}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground-muted">
                    Envoy&eacute; &agrave; <strong className="text-foreground">{email}</strong>
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-foreground/[0.06] backdrop-blur-xl border border-foreground/[0.1] text-sm text-foreground-muted hover:text-foreground hover:bg-foreground/[0.1] transition-all"
              >
                Retour au site &darr;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Prize showcase ── */}
      {step === "idle" && (
        <div className="mt-14 lg:mt-20 animate-fade-in">
          <div className="flex items-center gap-6 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
            <p className="text-sm font-mono tracking-[0.2em] uppercase text-foreground-muted/60 flex-shrink-0">
              Lots &agrave; gagner
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SHOWCASE.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl bg-foreground/[0.05] backdrop-blur-xl border border-foreground/[0.08] p-5 transition-all duration-300 hover:bg-foreground/[0.08] hover:border-foreground/[0.15]"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.color}15` }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-foreground">{item.label}</h4>
                    <p className="text-sm text-foreground-dim mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
