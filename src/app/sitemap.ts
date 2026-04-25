import type { MetadataRoute } from "next";
import {
  getAllProjectFrontmatter,
  getProjectsBySecteur,
} from "@/data/realisations";
import { secteurList } from "@/data/realisations/secteurs";

function countUniqueWords(text: string) {
  return new Set(text.toLowerCase().split(/\s+/).filter(Boolean)).size;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aurentia.agency";
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/realisations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Case studies
  for (const project of getAllProjectFrontmatter()) {
    entries.push({
      url: `${baseUrl}/realisations/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: project.featured ? 0.9 : 0.7,
    });
  }

  // Sector pages — only if indexable (editorial >= 400 unique words AND >= 1 project)
  for (const secteur of secteurList) {
    const projects = getProjectsBySecteur(secteur.slug);
    const indexable =
      !!secteur.editorial &&
      countUniqueWords(secteur.editorial) >= 400 &&
      projects.length >= 1;
    if (!indexable) continue;
    entries.push({
      url: `${baseUrl}/realisations/secteur/${secteur.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
