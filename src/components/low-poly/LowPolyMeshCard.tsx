"use client";

import { mesh, palettes, type PaletteName } from "./_helpers";

type Props = {
  meta?: string;
  title: string;
  description: string;
  palette?: PaletteName;
  bias?: "tl-br" | "tr-bl" | "vertical";
  seed?: number;
};

export function LowPolyMeshCard({
  meta,
  title,
  description,
  palette = "amethyst",
  bias = "vertical",
  seed = 17,
}: Props) {
  const p = palettes[palette];
  // Reverse so darkest sits at the bottom (where text reads)
  const shades = [p[1], p[2], p[3], p[4], p[5], p[6], p[7]];
  const tris = mesh(7, 5, 500, 320, shades, { seed, jitter: 0.6, bias });
  const overlayId = `lp-overlay-${palette}-${seed}`;

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] ring-1 ring-foreground/15 transition-all duration-700 ease-in-out hover:-translate-y-0.5 hover:ring-foreground/30">
      <div className="relative aspect-[5/4]">
        <svg
          viewBox="0 0 500 320"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id={overlayId} x1="0" y1="0.55" x2="0" y2="1">
              <stop offset="0" stopColor={p[7]} stopOpacity="0" />
              <stop offset="1" stopColor={p[7]} stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Triangulated mesh */}
          {tris.map((t, i) => (
            <polygon
              key={i}
              points={t.points}
              fill={t.fill}
              stroke={t.fill}
              strokeWidth="0.4"
            />
          ))}

          {/* Bottom gradient for text readability */}
          <rect width="500" height="320" fill={`url(#${overlayId})`} />

          {/* Subtle specular highlight that travels on hover */}
          <polygon
            points="0,0 200,0 0,140"
            fill="white"
            opacity="0.08"
            className="transition-opacity duration-1000 ease-in-out group-hover:opacity-15"
          />
        </svg>

        {/* Text */}
        <div className="absolute inset-x-0 bottom-0 px-7 pb-7 pt-16 md:px-9 md:pb-9">
          {meta && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/85 drop-shadow-sm">
              {meta}
            </p>
          )}
          <h3 className="mb-2 font-heading text-2xl text-white drop-shadow md:text-[1.7rem] md:leading-[1.1]">
            {title}
          </h3>
          <p className="max-w-md text-sm text-white/80 md:text-base">{description}</p>
        </div>
      </div>
    </article>
  );
}
