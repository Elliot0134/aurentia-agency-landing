"use client";

import { ArrowRight, CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import { mesh, palettes } from "./_helpers";

const CONTENT = {
  title: "Prenons 15 minutes ensemble",
  subtitle:
    "Un appel rapide pour comprendre votre besoin et vous dire si on peut vous aider. Sans engagement.",
  signals: [
    { Icon: CalendarCheck, label: "Créneau sous 72h" },
    { Icon: Clock, label: "15 min chrono" },
    { Icon: ShieldCheck, label: "Sans engagement" },
  ],
  cta: { label: "Réserver un créneau", href: "#rdv-embed" },
};

export function LowPolyBookingCTA() {
  const p = palettes.aurentia;

  // Tight palette of 4 DISTINCT shades around the brand coral.
  // Combined with bias "uniform" + graph-coloring in the helper, every
  // triangle is guaranteed a different shade than each of its neighbours.
  const bgShades = [p[3], p[4], p[5], p[6]];
  const meshTris = mesh(10, 5, 1400, 600, bgShades, {
    seed: 23,
    jitter: 0.55,
    bias: "uniform",
  });

  return (
    <section id="rdv" className="w-full px-4 py-6 md:px-6 md:py-8">
      <div className="relative isolate mx-auto w-full max-w-[1400px] overflow-hidden rounded-[2.5rem]">
        {/* Faceted coral surface — replaces the flat bg-accent-primary */}
        <svg
          aria-hidden
          viewBox="0 0 1400 600"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          {meshTris.map((t, i) => (
            <polygon key={i} points={t.points} fill={t.fill} />
          ))}
        </svg>

        {/* Content layer — identical to HomeBookingCTA */}
        <div className="relative px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
            <h2 className="font-heading text-4xl tracking-tight text-white md:text-5xl lg:text-6xl">
              {CONTENT.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">
              {CONTENT.subtitle}
            </p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {CONTENT.signals.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm text-white/85"
                >
                  <Icon className="size-4 text-white/70" aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <a
              href={CONTENT.cta.href}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-accent-primary transition-all duration-700 ease-in-out hover:translate-y-[-1px] hover:bg-white/95"
            >
              {CONTENT.cta.label}
              <ArrowRight className="size-4 transition-transform duration-700 ease-in-out group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
