"use client";

import { palettes, type PaletteName } from "./_helpers";

type Shape = "diamond" | "octahedron" | "cube" | "prism" | "peak" | "shard";

type Props = {
  shape: Shape;
  palette?: PaletteName;
  size?: number;
  className?: string;
};

export function LowPolyObject({
  shape,
  palette = "ember",
  size = 96,
  className = "",
}: Props) {
  const p = palettes[palette];
  return (
    <div
      className={`group relative inline-block transition-transform duration-1000 ease-in-out hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {shape === "diamond" && <Diamond p={p} />}
        {shape === "octahedron" && <Octahedron p={p} />}
        {shape === "cube" && <Cube p={p} />}
        {shape === "prism" && <Prism p={p} />}
        {shape === "peak" && <Peak p={p} />}
        {shape === "shard" && <Shard p={p} />}
      </svg>
    </div>
  );
}

type Pal = readonly string[];

function Diamond({ p }: { p: Pal }) {
  // Brilliant-cut diamond viewed from front: triangular crown + pavilion
  return (
    <g className="origin-center transition-transform duration-1000 ease-in-out group-hover:rotate-12">
      {/* Crown */}
      <polygon points="50,12 22,38 50,38" fill={p[1]} />
      <polygon points="50,12 50,38 78,38" fill={p[3]} />
      {/* Girdle bands */}
      <polygon points="22,38 50,38 36,42" fill={p[2]} />
      <polygon points="50,38 78,38 64,42" fill={p[4]} />
      {/* Pavilion (bottom triangles) */}
      <polygon points="22,38 36,42 50,90" fill={p[4]} />
      <polygon points="36,42 50,55 50,90" fill={p[5]} />
      <polygon points="50,55 64,42 50,90" fill={p[6]} />
      <polygon points="64,42 78,38 50,90" fill={p[7]} />
      {/* Specular */}
      <polygon points="50,12 38,30 50,30" fill={p[0]} opacity="0.7" />
    </g>
  );
}

function Octahedron({ p }: { p: Pal }) {
  return (
    <g className="origin-center transition-transform duration-[1400ms] ease-in-out group-hover:rotate-45">
      {/* Top */}
      <polygon points="50,8 12,50 50,50" fill={p[2]} />
      <polygon points="50,8 50,50 88,50" fill={p[4]} />
      {/* Bottom */}
      <polygon points="50,92 12,50 50,50" fill={p[6]} />
      <polygon points="50,92 50,50 88,50" fill={p[7]} />
      {/* Highlight ridge */}
      <polygon points="50,8 36,36 50,30" fill={p[0]} opacity="0.6" />
    </g>
  );
}

function Cube({ p }: { p: Pal }) {
  return (
    <g className="origin-center transition-transform duration-1000 ease-in-out group-hover:rotate-3">
      {/* Top */}
      <polygon points="50,12 82,28 50,44 18,28" fill={p[1]} />
      {/* Left face */}
      <polygon points="18,28 50,44 50,84 18,68" fill={p[5]} />
      {/* Right face */}
      <polygon points="82,28 50,44 50,84 82,68" fill={p[3]} />
      {/* Top highlight */}
      <polygon points="50,12 66,20 50,28 34,20" fill={p[0]} opacity="0.7" />
      {/* Right highlight */}
      <polygon points="82,28 50,44 66,40 82,40" fill={p[2]} opacity="0.65" />
    </g>
  );
}

function Prism({ p }: { p: Pal }) {
  return (
    <g>
      {/* Front triangle */}
      <polygon points="20,80 50,20 80,80" fill={p[3]} />
      {/* Inner shading (perspective lines) */}
      <polygon points="20,80 50,20 50,72" fill={p[2]} />
      <polygon points="50,20 80,80 50,72" fill={p[5]} />
      {/* Side face peeking */}
      <polygon points="80,80 90,72 64,18 50,20" fill={p[6]} opacity="0.85" />
      <polygon points="50,20 64,18 50,12" fill={p[1]} />
      {/* Top tip highlight */}
      <polygon points="50,20 56,28 44,28" fill={p[0]} opacity="0.6" />
    </g>
  );
}

function Peak({ p }: { p: Pal }) {
  // Low-poly mountain peak — stacked with snow cap
  return (
    <g>
      {/* Lit face */}
      <polygon points="6,86 50,18 50,86" fill={p[3]} />
      {/* Shadow face */}
      <polygon points="50,18 94,86 50,86" fill={p[6]} />
      {/* Snow cap lit */}
      <polygon points="50,18 36,40 50,40" fill={p[0]} />
      {/* Snow cap shadow */}
      <polygon points="50,18 50,40 64,40" fill={p[1]} />
      {/* Foreground secondary peak */}
      <polygon points="0,86 30,52 50,86" fill={p[5]} />
      <polygon points="30,52 18,68 30,68" fill={p[2]} opacity="0.7" />
    </g>
  );
}

function Shard({ p }: { p: Pal }) {
  // Asymmetric crystal shard
  return (
    <g className="origin-center transition-transform duration-1000 ease-in-out group-hover:-rotate-6">
      <polygon points="48,8 70,32 60,68 38,86 22,52 30,30" fill={p[3]} />
      {/* Lit face */}
      <polygon points="48,8 30,30 38,40 60,30" fill={p[1]} />
      <polygon points="60,30 70,32 60,68 50,40" fill={p[2]} />
      {/* Shadow face */}
      <polygon points="22,52 30,30 38,40 38,86" fill={p[5]} />
      <polygon points="38,40 50,40 60,68 38,86" fill={p[4]} />
      <polygon points="50,40 60,68 38,86" fill={p[6]} />
      {/* Specular */}
      <polygon points="48,8 40,22 50,28" fill={p[0]} opacity="0.85" />
    </g>
  );
}
