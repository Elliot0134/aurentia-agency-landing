// Low-poly geometry helpers — generates triangulated SVG primitives.

export type Pt = readonly [number, number];

export type Tri = {
  points: string;
  fill: string;
};

const pseudoRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Build a triangulated ridge below a polyline of waypoints.
 * Each segment becomes 2 triangles (quad split along the diagonal).
 * Light is assumed upper-left: ascending slopes get the lit fill,
 * descending slopes get the shadow fill.
 */
export function ridge(
  points: Pt[],
  floor: number,
  lit: string,
  shadow: string,
): Tri[] {
  const tris: Tri[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const goingUp = y2 < y1;
    if (goingUp) {
      tris.push({
        points: `${x1},${y1} ${x2},${y2} ${x1},${floor}`,
        fill: lit,
      });
      tris.push({
        points: `${x2},${y2} ${x2},${floor} ${x1},${floor}`,
        fill: shadow,
      });
    } else {
      tris.push({
        points: `${x1},${y1} ${x2},${y2} ${x2},${floor}`,
        fill: shadow,
      });
      tris.push({
        points: `${x1},${y1} ${x2},${floor} ${x1},${floor}`,
        fill: lit,
      });
    }
  }
  return tris;
}

/**
 * Trianglify-style mesh: jittered grid of points, each cell split into
 * 2 triangles, each triangle's fill picked from a palette using a
 * top-left → bottom-right gradient with deterministic noise.
 */
export function mesh(
  cols: number,
  rows: number,
  w: number,
  h: number,
  shades: string[],
  opts: {
    seed?: number;
    jitter?: number;
    bias?: "tl-br" | "tr-bl" | "vertical" | "uniform";
  } = {},
): Tri[] {
  const { seed = 11, jitter = 0.55, bias = "tl-br" } = opts;
  const cellW = w / cols;
  const cellH = h / rows;
  const grid: Pt[][] = [];
  for (let r = 0; r <= rows; r++) {
    grid[r] = [];
    for (let c = 0; c <= cols; c++) {
      const isEdge = r === 0 || c === 0 || r === rows || c === cols;
      const jx = isEdge ? 0 : (pseudoRandom(seed + r * 31.7 + c * 7.3) - 0.5) * cellW * jitter;
      const jy = isEdge ? 0 : (pseudoRandom(seed + r * 13.1 + c * 19.7) - 0.5) * cellH * jitter;
      grid[r][c] = [c * cellW + jx, r * cellH + jy];
    }
  }

  // Per-cell triangle data: indices + flip orientation
  type CellMeta = { aIdx: number; bIdx: number; flip: 0 | 1 };
  const cells: CellMeta[][] = [];
  const triPoints: string[] = [];
  const triCentroids: Pt[] = [];

  for (let r = 0; r < rows; r++) {
    cells[r] = [];
    for (let c = 0; c < cols; c++) {
      const tl = grid[r][c];
      const tr = grid[r][c + 1];
      const bl = grid[r + 1][c];
      const br = grid[r + 1][c + 1];
      const flip = ((r + c) % 2) as 0 | 1;

      const aIdx = triPoints.length;
      const bIdx = aIdx + 1;

      if (flip === 0) {
        // Diagonal TL-BR
        // A = TL,TR,BR (upper-right) ; B = TL,BR,BL (lower-left)
        triPoints.push(`${tl[0]},${tl[1]} ${tr[0]},${tr[1]} ${br[0]},${br[1]}`);
        triCentroids.push([
          (tl[0] + tr[0] + br[0]) / 3,
          (tl[1] + tr[1] + br[1]) / 3,
        ]);
        triPoints.push(`${tl[0]},${tl[1]} ${br[0]},${br[1]} ${bl[0]},${bl[1]}`);
        triCentroids.push([
          (tl[0] + br[0] + bl[0]) / 3,
          (tl[1] + br[1] + bl[1]) / 3,
        ]);
      } else {
        // Diagonal TR-BL
        // A = TL,TR,BL (upper-left) ; B = TR,BR,BL (lower-right)
        triPoints.push(`${tl[0]},${tl[1]} ${tr[0]},${tr[1]} ${bl[0]},${bl[1]}`);
        triCentroids.push([
          (tl[0] + tr[0] + bl[0]) / 3,
          (tl[1] + tr[1] + bl[1]) / 3,
        ]);
        triPoints.push(`${tr[0]},${tr[1]} ${br[0]},${br[1]} ${bl[0]},${bl[1]}`);
        triCentroids.push([
          (tr[0] + br[0] + bl[0]) / 3,
          (tr[1] + br[1] + bl[1]) / 3,
        ]);
      }

      cells[r][c] = { aIdx, bIdx, flip };
    }
  }

  // Build adjacency map (which triangles share an edge with which)
  const adjacency: Set<number>[] = triPoints.map(() => new Set<number>());

  // Owner of each cell edge — depends on flip
  // flip=0 (diag TL-BR): top→A, right→A, bottom→B, left→B
  // flip=1 (diag TR-BL): top→A, right→B, bottom→B, left→A
  const ownerTop = (cell: CellMeta) => cell.aIdx;
  const ownerBottom = (cell: CellMeta) => cell.bIdx;
  const ownerLeft = (cell: CellMeta) => (cell.flip === 0 ? cell.bIdx : cell.aIdx);
  const ownerRight = (cell: CellMeta) => (cell.flip === 0 ? cell.aIdx : cell.bIdx);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = cells[r][c];
      // A-B share the diagonal
      adjacency[cell.aIdx].add(cell.bIdx);
      adjacency[cell.bIdx].add(cell.aIdx);
      // Cell above shares its bottom with this cell's top
      if (r > 0) {
        const above = cells[r - 1][c];
        adjacency[ownerTop(cell)].add(ownerBottom(above));
        adjacency[ownerBottom(above)].add(ownerTop(cell));
      }
      // Cell to the left shares its right with this cell's left
      if (c > 0) {
        const left = cells[r][c - 1];
        adjacency[ownerLeft(cell)].add(ownerRight(left));
        adjacency[ownerRight(left)].add(ownerLeft(cell));
      }
    }
  }

  // Build a per-triangle preference offset (for distribution variety)
  const preferenceOffset = (i: number): number => {
    const [cx, cy] = triCentroids[i];
    if (bias === "uniform") {
      return Math.floor(pseudoRandom(cx * 0.41 + cy * 0.67 + seed * 1.9) * shades.length);
    }
    let t: number;
    if (bias === "vertical") t = cy / h;
    else if (bias === "tr-bl") t = (1 - cx / w + cy / h) / 2;
    else t = (cx / w + cy / h) / 2;
    const noise = (pseudoRandom(cx * 0.13 + cy * 0.21 + seed) - 0.5) * 0.4;
    return Math.max(0, Math.min(shades.length - 1, Math.floor((t + noise) * shades.length)));
  };

  // Greedy graph coloring — for each triangle, try shades from its preferred
  // offset. Skip any shade already used by a colored neighbor. Guarantees
  // adjacent triangles never share a fill (no "voids" between facets).
  const colorIdx: number[] = new Array(triPoints.length).fill(-1);
  for (let i = 0; i < triPoints.length; i++) {
    const used = new Set<number>();
    for (const n of adjacency[i]) {
      if (colorIdx[n] !== -1) used.add(colorIdx[n]);
    }
    const start = preferenceOffset(i);
    for (let k = 0; k < shades.length; k++) {
      const candidate = (start + k) % shades.length;
      if (!used.has(candidate)) {
        colorIdx[i] = candidate;
        break;
      }
    }
    if (colorIdx[i] === -1) colorIdx[i] = start; // safety net
  }

  return triPoints.map((points, i) => ({
    points,
    fill: shades[colorIdx[i]],
  }));
}

// Curated palettes. Each goes from lightest to darkest.
export const palettes = {
  sunset: [
    "#fff3d6",
    "#ffd2a3",
    "#ffa56a",
    "#f47b48",
    "#d6533c",
    "#9c2c4f",
    "#5d2161",
    "#2a103e",
  ],
  aurora: [
    "#e8fff3",
    "#a4f0c8",
    "#5edaa6",
    "#3fb593",
    "#2c8889",
    "#1f5b85",
    "#1a3669",
    "#0f1a4d",
  ],
  ember: [
    "#fff1d6",
    "#ffd49a",
    "#ffa05a",
    "#ed7037",
    "#c14223",
    "#852316",
    "#4a1110",
    "#220809",
  ],
  amethyst: [
    "#f4e6ff",
    "#d2b3ff",
    "#a87bff",
    "#7e4ee0",
    "#5a2eb0",
    "#3b1c80",
    "#241057",
    "#100630",
  ],
  provence: [
    "#fff4e6",
    "#ffd9a8",
    "#ffaf7a",
    "#e07a4a",
    "#a84a35",
    "#6e2438",
    "#3d1530",
    "#1a0a25",
  ],
  // Brand palette — built around #d97757 (coral du bouton "Prendre RDV").
  // Resserrée volontairement pour que le rendu moyen du mesh reste sur le brand.
  aurentia: [
    "#FDEEE5", // pale cream peach
    "#F3D1C7", // soft peach
    "#EBA98E", // peach
    "#E19882", // light coral
    "#DC866D", // mid-light coral
    "#D97757", // ← BRAND (Prendre RDV)
    "#B46348", // deeper coral
    "#6E3C2C", // dark terracotta
  ],
} as const;

export type PaletteName = keyof typeof palettes;
