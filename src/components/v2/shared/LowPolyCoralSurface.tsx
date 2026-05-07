"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { mesh, type Tri } from "@/components/low-poly/_helpers";

// Version "smooth" (00b) — 4 nuances quasi-jumelles autour du brand coral.
// Delta ~3% en luminance. Texte blanc parfaitement lisible partout, plus
// besoin de smoothing zonal au centre.
const SHADES = ["#DC7B5C", "#D97757", "#D27253", "#CA6C4F"];

const MESH_OPTS = {
  seed: 23,
  jitter: 0.55,
  bias: "uniform" as const,
};

// Desktop : viewBox horizontal (ratio 2.33) — la card des CTA fait
// ~1400×600 au max. 10×5 cells → 100 triangles, facettes près de carrées.
const DESKTOP_TRIS: Tri[] = mesh(10, 5, 1400, 600, SHADES, MESH_OPTS);

// Mobile : viewBox vertical (ratio ~0.5) qui matche les cards mobile
// (~350×750). 4×7 cells → 56 triangles, mêmes proportions à l'écran.
const MOBILE_TRIS: Tri[] = mesh(4, 7, 400, 700, SHADES, MESH_OPTS);

type Props = {
  children: ReactNode;
  /** Classes for the outer wrapper (rounded surface). */
  className?: string;
  /** Classes for the inner content area (padding). */
  innerClassName?: string;
};

/**
 * Drop-in replacement for `<div className="rounded-[2.5rem] bg-accent-primary ...">`.
 * Renders a low-poly coral surface : faceted mesh with graph-coloring
 * (zéro voids entre triangles) sur une palette ultra-resserrée autour
 * du brand `#D97757`. Lisibilité texte garantie sur toute la surface.
 *
 * Deux meshes sont précomputés : mobile (vertical) et desktop (horizontal),
 * basculement au breakpoint `md` pour que les facettes gardent des
 * proportions naturelles quel que soit le device.
 */
export function LowPolyCoralSurface({
  children,
  className,
  innerClassName,
}: Props) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2.5rem]",
        className,
      )}
    >
      {/* Mobile mesh — visible jusqu'au breakpoint md */}
      <svg
        aria-hidden
        viewBox="0 0 400 700"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full md:hidden"
      >
        {MOBILE_TRIS.map((t, i) => (
          <polygon key={i} points={t.points} fill={t.fill} />
        ))}
      </svg>
      {/* Desktop mesh — md et au-dessus */}
      <svg
        aria-hidden
        viewBox="0 0 1400 600"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full md:block"
      >
        {DESKTOP_TRIS.map((t, i) => (
          <polygon key={i} points={t.points} fill={t.fill} />
        ))}
      </svg>
      <div className={cn("relative", innerClassName)}>{children}</div>
    </div>
  );
}
