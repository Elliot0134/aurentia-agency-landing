"use client";

import { ArrowRight, CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import { mesh } from "./_helpers";

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

// Lerp linéaire entre deux couleurs hex
function lerpHex(a: string, b: string, t: number): string {
  const parse = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const mix = (x: number, y: number) =>
    Math.round(x + (y - x) * t)
      .toString(16)
      .padStart(2, "0");
  return `#${mix(ar, br)}${mix(ag, bg)}${mix(ab, bb)}`;
}

// Centroïde d'un triangle "x1,y1 x2,y2 x3,y3"
function centroid(points: string): [number, number] {
  const coords = points.split(" ").map((p) => p.split(",").map(Number));
  return [
    (coords[0][0] + coords[1][0] + coords[2][0]) / 3,
    (coords[0][1] + coords[1][1] + coords[2][1]) / 3,
  ];
}

const BRAND = "#D97757";

export function LowPolyBookingCTAMid() {
  // Même palette qu'avant (delta ~6%, facettes visibles).
  const bgShades = ["#E07F62", BRAND, "#CC6E50", "#BC6248"];
  const meshTris = mesh(10, 5, 1400, 600, bgShades, {
    seed: 23,
    jitter: 0.55,
    bias: "uniform",
  });

  // Smoothing zonal : on tire chaque triangle vers le brand selon sa distance
  // au bloc texte (zone "squircle" L4 qui colle bien à la bounding box).
  // Inner core poussé à ~95% pour supprimer toute intrusion de triangle foncé
  // sous le texte. Falloff doux sur les bords pour préserver la transition.
  const smoothedTris = meshTris.map((t) => {
    const [cx, cy] = centroid(t.points);
    const dx = Math.abs(cx - 700) / 620; // ~88% du width
    const dy = Math.abs(cy - 300) / 235; // ~78% du height
    // Norme L4 : zone "rectangle arrondi" qui matche la forme du bloc texte
    const dist = Math.pow(Math.pow(dx, 4) + Math.pow(dy, 4), 0.25);
    // Plateau central à 0.95, falloff doux
    const smoothing = Math.max(0, Math.min(0.95, 1.15 - dist * 1.15));
    return {
      ...t,
      fill: smoothing > 0 ? lerpHex(t.fill, BRAND, smoothing) : t.fill,
    };
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
          {smoothedTris.map((t, i) => (
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
