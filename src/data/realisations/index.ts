import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ProjectFrontmatter, type ProjectRecord, type Secteur, type ProjectType } from "./schemas";
import { pickRelated } from "./related";

const CONTENT_DIR = path.join(process.cwd(), "src/content/realisations");

let cache: ProjectRecord[] | null = null;

export function loadAllProjects(): ProjectRecord[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const records: ProjectRecord[] = files.map((file) => {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const result = ProjectFrontmatter.safeParse({
      ...parsed.data,
      slug: parsed.data.slug ?? file.replace(/\.mdx$/, ""),
    });
    if (!result.success) {
      throw new Error(
        `[realisations] Invalid frontmatter in ${file}: ${result.error.message}`,
      );
    }
    return { frontmatter: result.data, mdxSource: parsed.content, filePath };
  });
  records.sort((a, b) => {
    const fa = a.frontmatter, fb = b.frontmatter;
    if (fa.featured !== fb.featured) return fa.featured ? -1 : 1;
    if (fa.year !== fb.year) return fb.year - fa.year;
    return fa.name.localeCompare(fb.name);
  });
  cache = records;
  return cache;
}

export function getAllProjectFrontmatter() {
  return loadAllProjects().map((r) => r.frontmatter);
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return loadAllProjects().find((r) => r.frontmatter.slug === slug);
}

export function getProjectsBySecteur(secteur: Secteur) {
  return loadAllProjects().filter((r) => r.frontmatter.secteur === secteur);
}

export function getProjectsByType(type: ProjectType) {
  return loadAllProjects().filter((r) => r.frontmatter.type === type);
}

export function getRelatedProjects(slug: string, limit = 3) {
  const all = getAllProjectFrontmatter();
  const target = all.find((p) => p.slug === slug);
  if (!target) return [];
  return pickRelated(target, all, { limit });
}

export function getSecteursWithProjects() {
  const counts = new Map<Secteur, number>();
  for (const r of loadAllProjects()) {
    const s = r.frontmatter.secteur;
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  return counts;
}
