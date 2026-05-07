"use client";

import { ridge, palettes, type PaletteName, type Pt } from "./_helpers";

type Props = {
  meta?: string;
  title: string;
  description: string;
  palette?: PaletteName;
  size?: "default" | "feature";
};

const FAR_RIDGE: Pt[] = [
  [0, 188],
  [50, 162],
  [120, 178],
  [190, 145],
  [260, 172],
  [340, 138],
  [410, 168],
  [470, 152],
  [500, 162],
];

const MID_RIDGE: Pt[] = [
  [0, 226],
  [60, 198],
  [140, 218],
  [215, 178],
  [290, 212],
  [370, 184],
  [445, 220],
  [500, 206],
];

const NEAR_RIDGE: Pt[] = [
  [0, 268],
  [55, 240],
  [125, 264],
  [205, 230],
  [295, 258],
  [380, 232],
  [455, 262],
  [500, 250],
];

export function LowPolyMountainCard({
  meta,
  title,
  description,
  palette = "sunset",
  size = "default",
}: Props) {
  const p = palettes[palette];
  const skyId = `lp-sky-${palette}`;

  return (
    <article className="group relative isolate overflow-hidden rounded-[1.75rem] bg-foreground/[0.04] ring-1 ring-foreground/10 transition-all duration-700 ease-in-out hover:-translate-y-0.5 hover:ring-foreground/25">
      <div className={size === "feature" ? "relative aspect-[16/9]" : "relative aspect-[5/3]"}>
        <svg
          viewBox="0 0 500 300"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={p[7]} />
              <stop offset="0.42" stopColor={p[5]} />
              <stop offset="0.78" stopColor={p[3]} />
              <stop offset="1" stopColor={p[2]} />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="500" height="300" fill={`url(#${skyId})`} />

          {/* Stars (small triangles) */}
          <polygon points="58,38 61,34 64,38 61,42" fill={p[0]} opacity="0.7" />
          <polygon points="148,52 151,49 154,52 151,55" fill={p[0]} opacity="0.45" />
          <polygon points="252,28 255,25 258,28 255,31" fill={p[0]} opacity="0.6" />
          <polygon points="412,46 415,43 418,46 415,49" fill={p[0]} opacity="0.5" />
          <polygon points="92,72 94,70 96,72 94,74" fill={p[0]} opacity="0.4" />

          {/* Sun — low-poly hexagonal disc that shifts on hover */}
          <g
            transform="translate(360, 102)"
            className="transition-transform duration-1000 ease-in-out group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
            style={{ transformOrigin: "360px 102px" }}
          >
            <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill={p[1]} />
            <polygon points="0,-30 26,-15 0,0" fill={p[0]} />
            <polygon points="-26,-15 0,-30 0,0" fill={p[0]} opacity="0.85" />
            <polygon points="-26,-15 0,0 -26,15" fill={p[1]} />
            <polygon points="26,-15 26,15 0,0" fill={p[2]} />
            <polygon points="0,30 26,15 0,0" fill={p[2]} />
            <polygon points="-26,15 0,30 0,0" fill={p[1]} />
          </g>

          {/* Far ridge (palest, most distant) */}
          <g>
            {ridge(FAR_RIDGE, 300, p[3], p[4]).map((t, i) => (
              <polygon key={`far-${i}`} points={t.points} fill={t.fill} />
            ))}
          </g>

          {/* Mid ridge */}
          <g
            className="transition-transform duration-1000 ease-in-out group-hover:translate-y-[1.5px]"
          >
            {ridge(MID_RIDGE, 300, p[5], p[6]).map((t, i) => (
              <polygon key={`mid-${i}`} points={t.points} fill={t.fill} />
            ))}
          </g>

          {/* Near ridge (darkest, foreground) */}
          <g
            className="transition-transform duration-1000 ease-in-out group-hover:translate-y-[3px]"
          >
            {ridge(NEAR_RIDGE, 300, p[6], p[7]).map((t, i) => (
              <polygon key={`near-${i}`} points={t.points} fill={t.fill} />
            ))}
            {/* Highlight rim on the foreground peaks */}
            <polyline
              points="0,268 55,240 125,264 205,230 295,258 380,232 455,262 500,250"
              fill="none"
              stroke={p[2]}
              strokeWidth="0.6"
              opacity="0.5"
            />
          </g>
        </svg>
      </div>

      <div className="relative px-7 py-7 md:px-8 md:py-8">
        {meta && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent-primary">
            {meta}
          </p>
        )}
        <h3 className="mb-2 font-heading text-2xl text-foreground md:text-[1.75rem] md:leading-[1.15]">
          {title}
        </h3>
        <p className="text-sm text-foreground/70 md:text-base">{description}</p>
      </div>
    </article>
  );
}
