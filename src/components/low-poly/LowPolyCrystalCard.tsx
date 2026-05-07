"use client";

import { palettes, type PaletteName } from "./_helpers";

type Props = {
  title: string;
  description: string;
  index?: string;
  palette?: PaletteName;
};

// Hexagonal gem geometry (viewBox 280 320)
// Outer hex vertices, oriented pointed-top/bottom
const O = {
  top: [140, 8] as const,
  upRight: [260, 80] as const,
  downRight: [260, 240] as const,
  bottom: [140, 312] as const,
  downLeft: [20, 240] as const,
  upLeft: [20, 80] as const,
};

// Inner table — offset slightly upper-left to suggest light from upper-left
const I = {
  top: [134, 96] as const,
  upRight: [194, 128] as const,
  downRight: [194, 192] as const,
  bottom: [134, 224] as const,
  downLeft: [74, 192] as const,
  upLeft: [74, 128] as const,
};

const C = [134, 160] as const; // table center

export function LowPolyCrystalCard({
  title,
  description,
  index,
  palette = "ember",
}: Props) {
  const p = palettes[palette];

  // Shade indices: 0 = lightest, 7 = darkest
  // Light from upper-left → upLeft facets brightest, downRight darkest

  return (
    <article className="group relative flex h-full flex-col items-center text-center">
      {/* Gem */}
      <div className="relative w-full max-w-[320px] [perspective:1000px]">
        <svg
          viewBox="0 0 280 320"
          className="h-auto w-full transition-transform duration-1000 ease-in-out group-hover:[transform:rotateX(6deg)_rotateY(-4deg)]"
          style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.25))" }}
        >
          {/* Outer crown facets — 12 triangles around the table */}
          {/* Top facet (split: outer | inner) */}
          <polygon
            points={`${O.top[0]},${O.top[1]} ${O.upRight[0]},${O.upRight[1]} ${I.upRight[0]},${I.upRight[1]}`}
            fill={p[3]}
          />
          <polygon
            points={`${O.top[0]},${O.top[1]} ${I.upRight[0]},${I.upRight[1]} ${I.top[0]},${I.top[1]}`}
            fill={p[2]}
          />

          {/* Upper-right facet */}
          <polygon
            points={`${O.upRight[0]},${O.upRight[1]} ${O.downRight[0]},${O.downRight[1]} ${I.downRight[0]},${I.downRight[1]}`}
            fill={p[5]}
          />
          <polygon
            points={`${O.upRight[0]},${O.upRight[1]} ${I.downRight[0]},${I.downRight[1]} ${I.upRight[0]},${I.upRight[1]}`}
            fill={p[4]}
          />

          {/* Lower-right facet */}
          <polygon
            points={`${O.downRight[0]},${O.downRight[1]} ${O.bottom[0]},${O.bottom[1]} ${I.bottom[0]},${I.bottom[1]}`}
            fill={p[7]}
          />
          <polygon
            points={`${O.downRight[0]},${O.downRight[1]} ${I.bottom[0]},${I.bottom[1]} ${I.downRight[0]},${I.downRight[1]}`}
            fill={p[6]}
          />

          {/* Lower-left facet */}
          <polygon
            points={`${O.bottom[0]},${O.bottom[1]} ${O.downLeft[0]},${O.downLeft[1]} ${I.downLeft[0]},${I.downLeft[1]}`}
            fill={p[6]}
          />
          <polygon
            points={`${O.bottom[0]},${O.bottom[1]} ${I.downLeft[0]},${I.downLeft[1]} ${I.bottom[0]},${I.bottom[1]}`}
            fill={p[5]}
          />

          {/* Left facet */}
          <polygon
            points={`${O.downLeft[0]},${O.downLeft[1]} ${O.upLeft[0]},${O.upLeft[1]} ${I.upLeft[0]},${I.upLeft[1]}`}
            fill={p[4]}
          />
          <polygon
            points={`${O.downLeft[0]},${O.downLeft[1]} ${I.upLeft[0]},${I.upLeft[1]} ${I.downLeft[0]},${I.downLeft[1]}`}
            fill={p[3]}
          />

          {/* Upper-left facet (most lit) */}
          <polygon
            points={`${O.upLeft[0]},${O.upLeft[1]} ${O.top[0]},${O.top[1]} ${I.top[0]},${I.top[1]}`}
            fill={p[1]}
          />
          <polygon
            points={`${O.upLeft[0]},${O.upLeft[1]} ${I.top[0]},${I.top[1]} ${I.upLeft[0]},${I.upLeft[1]}`}
            fill={p[2]}
          />

          {/* Inner table — 6 triangles meeting at center */}
          <polygon
            points={`${I.top[0]},${I.top[1]} ${I.upRight[0]},${I.upRight[1]} ${C[0]},${C[1]}`}
            fill={p[1]}
          />
          <polygon
            points={`${I.upRight[0]},${I.upRight[1]} ${I.downRight[0]},${I.downRight[1]} ${C[0]},${C[1]}`}
            fill={p[3]}
          />
          <polygon
            points={`${I.downRight[0]},${I.downRight[1]} ${I.bottom[0]},${I.bottom[1]} ${C[0]},${C[1]}`}
            fill={p[5]}
          />
          <polygon
            points={`${I.bottom[0]},${I.bottom[1]} ${I.downLeft[0]},${I.downLeft[1]} ${C[0]},${C[1]}`}
            fill={p[4]}
          />
          <polygon
            points={`${I.downLeft[0]},${I.downLeft[1]} ${I.upLeft[0]},${I.upLeft[1]} ${C[0]},${C[1]}`}
            fill={p[2]}
          />
          <polygon
            points={`${I.upLeft[0]},${I.upLeft[1]} ${I.top[0]},${I.top[1]} ${C[0]},${C[1]}`}
            fill={p[0]}
          />

          {/* Specular highlight that travels on hover */}
          <polygon
            points={`${I.upLeft[0]},${I.upLeft[1]} ${I.top[0]},${I.top[1]} ${C[0]},${C[1]}`}
            fill="white"
            opacity="0.18"
            className="transition-opacity duration-1000 ease-in-out group-hover:opacity-40"
          />

          {/* Outer hex outline (subtle rim light) */}
          <polygon
            points={`${O.top[0]},${O.top[1]} ${O.upRight[0]},${O.upRight[1]} ${O.downRight[0]},${O.downRight[1]} ${O.bottom[0]},${O.bottom[1]} ${O.downLeft[0]},${O.downLeft[1]} ${O.upLeft[0]},${O.upLeft[1]}`}
            fill="none"
            stroke={p[0]}
            strokeWidth="0.6"
            opacity="0.35"
          />

          {index && (
            <text
              x={C[0]}
              y={C[1] + 6}
              textAnchor="middle"
              fontSize="20"
              fontWeight="600"
              fill={p[7]}
              opacity="0.55"
              style={{ letterSpacing: "0.18em", fontFamily: "var(--font-heading)" }}
            >
              {index}
            </text>
          )}
        </svg>
      </div>

      {/* Text below the gem */}
      <div className="mt-6 max-w-[28ch] space-y-2 px-2">
        <h3 className="font-heading text-xl text-foreground md:text-2xl">{title}</h3>
        <p className="text-sm text-foreground/65">{description}</p>
      </div>
    </article>
  );
}
