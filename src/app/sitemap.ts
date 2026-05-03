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

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/realisations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    // Sites web
    { url: `${baseUrl}/sites-web`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/sites-web/site-vitrine`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sites-web/sur-mesure`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sites-web/ecommerce`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sites-web/landing-page`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // SaaS
    { url: `${baseUrl}/saas`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/saas/agences`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Solutions IA
    { url: `${baseUrl}/solutions-ia`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/solutions-ia/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/solutions-ia/formation-ia`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions-ia/implementation-ia`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions-ia/configuration-claude`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Ressources
    { url: `${baseUrl}/ressources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/ressources/implementer-claude`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ressources/vibe-coding`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // Other
    { url: `${baseUrl}/landing-pages`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/apport-affaires`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const entries: MetadataRoute.Sitemap = [...staticRoutes];

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
