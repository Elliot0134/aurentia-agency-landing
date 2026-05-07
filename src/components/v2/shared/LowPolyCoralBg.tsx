"use client";

import { mesh, type Tri } from "@/components/low-poly/_helpers";

// Même palette smooth que les CTA cards (cohérence visuelle).
const SHADES = ["#DC7B5C", "#D97757", "#D27253", "#CA6C4F"];

// Mesh ultra-léger adapté aux boutons : 4×2 = 16 triangles.
const TRIS: Tri[] = mesh(4, 2, 200, 60, SHADES, {
  seed: 23,
  jitter: 0.5,
  bias: "uniform",
});

/**
 * Fond low-poly coral pour boutons CTA. À insérer comme premier enfant
 * d'un container `relative overflow-hidden`. Le contenu suivant doit être
 * positionné `relative` pour passer au-dessus du mesh.
 */
export function LowPolyCoralBg() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      {TRIS.map((t, i) => (
        <polygon key={i} points={t.points} fill={t.fill} />
      ))}
    </svg>
  );
}
