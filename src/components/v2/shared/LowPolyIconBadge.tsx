"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Hexagone divisé en 3 grandes facettes (vs 6 avant). Lumière haut-gauche :
// la facette gauche est la plus claire, la facette du bas la plus sombre.
const R = 48;
const CX = 50;
const CY = 50;
const VERTICES = Array.from({ length: 6 }, (_, i) => {
  const angle = (-90 + i * 60) * (Math.PI / 180);
  return [CX + R * Math.cos(angle), CY + R * Math.sin(angle)] as [number, number];
});

// Chaque facette = 2 sommets consécutifs + 1 sommet suivant + centre (quad)
const FACETS = [
  { idxs: [4, 5, 0], fill: "#E58468" }, // upper-left wedge — lightest
  { idxs: [0, 1, 2], fill: "#CC6E50" }, // right wedge — mid
  { idxs: [2, 3, 4], fill: "#8E4B36" }, // bottom wedge — darkest
];

type Props = {
  children: ReactNode;
  className?: string;
  size?: number;
};

/**
 * Badge hexagonal facetté pour contenir une icône.
 * 6 triangles en étoile autour d'un centre commun, ombrage cohérent
 * avec une lumière venant du haut-gauche. Animation au hover du parent
 * `.group` (rotation douce).
 */
export function LowPolyIconBadge({ children, className, size = 48 }: Props) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full transition-transform duration-700 ease-in-out group-hover:rotate-[20deg]"
      >
        {FACETS.map((f, i) => {
          const pts = f.idxs
            .map((idx) => `${VERTICES[idx][0]},${VERTICES[idx][1]}`)
            .join(" ");
          return (
            <polygon
              key={i}
              points={`${pts} ${CX},${CY}`}
              fill={f.fill}
            />
          );
        })}
      </svg>
      <div className="relative flex items-center justify-center text-white">
        {children}
      </div>
    </div>
  );
}
