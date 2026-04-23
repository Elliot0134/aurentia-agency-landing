#!/usr/bin/env node
// Generates src/data/realisations/generated.ts — a static, client-safe
// snapshot of all project frontmatter parsed from src/content/realisations/*.mdx.
//
// Runs at pre{dev,build}. Keeps HomeRealisationsPreview client-compatible
// without bundling node:fs/node:path into the client.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/content/realisations");
const OUT_FILE = path.join(ROOT, "src/data/realisations/generated.ts");

function loadFrontmatter() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const records = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    return {
      ...data,
      slug: data.slug ?? file.replace(/\.mdx$/, ""),
      tags: data.tags ?? [],
      technos: data.technos ?? [],
      images: data.images ?? [],
      metrics: data.metrics ?? [],
      featured: data.featured ?? false,
    };
  });
  records.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.year !== b.year) return b.year - a.year;
    return String(a.name).localeCompare(String(b.name));
  });
  return records;
}

const data = loadFrontmatter();
const banner = `// AUTO-GENERATED — do not edit by hand.
// Source: src/content/realisations/*.mdx
// Generator: scripts/generate-realisations-static.mjs
// Run: pnpm run generate:realisations (also runs on predev/prebuild)

import type { ProjectFrontmatter } from "./schemas";

export const realisationsStatic: ProjectFrontmatter[] = ${JSON.stringify(data, null, 2)};
`;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, banner, "utf8");
console.log(`[realisations] Wrote ${data.length} projects → ${path.relative(ROOT, OUT_FILE)}`);
