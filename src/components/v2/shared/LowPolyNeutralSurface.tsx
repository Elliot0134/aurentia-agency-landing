"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { mesh, type Tri } from "@/components/low-poly/_helpers";

// Palettes ultra-resserrées centrées sur la couleur de fond standard des
// /v2 cards (--bg-surface). Delta ~3-4% : facettes lisibles mais surface
// qui reste dans la même couleur que les cards classiques.
const LIGHT_SHADES = ["#F8F8F8", "#F4F4F5", "#EEEEEF", "#E9E9EA"];
const DARK_SHADES = ["#29292B", "#252527", "#212123", "#1D1D1F"];

// Densité volontairement faible : 3×2 cells → 12 triangles par carte.
const COLS = 3;
const ROWS = 2;

const LIGHT_TRIS: Tri[] = mesh(COLS, ROWS, 1400, 600, LIGHT_SHADES, {
  seed: 23,
  jitter: 0.55,
  bias: "uniform",
});

const DARK_TRIS: Tri[] = mesh(COLS, ROWS, 1400, 600, DARK_SHADES, {
  seed: 23,
  jitter: 0.55,
  bias: "uniform",
});

type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/**
 * Carte avec un fond low-poly neutre (gris clair en light, gris sombre en
 * dark). Mesh très peu dense (12 triangles), graph-coloring garantit qu'aucun
 * triangle adjacent ne partage sa nuance. Couleur d'ensemble identique à un
 * `<Card>` classique — juste un peu de relief facetté en plus.
 */
export function LowPolyNeutralSurface({
  children,
  className,
  innerClassName,
}: Props) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-transparent dark:border-foreground/10",
        className,
      )}
    >
      {/* Light theme mesh */}
      <svg
        aria-hidden
        viewBox="0 0 1400 600"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full dark:hidden"
      >
        {LIGHT_TRIS.map((t, i) => (
          <polygon key={i} points={t.points} fill={t.fill} />
        ))}
      </svg>
      {/* Dark theme mesh */}
      <svg
        aria-hidden
        viewBox="0 0 1400 600"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full dark:block"
      >
        {DARK_TRIS.map((t, i) => (
          <polygon key={i} points={t.points} fill={t.fill} />
        ))}
      </svg>
      <div className={cn("relative", innerClassName)}>{children}</div>
    </div>
  );
}
