import type { ProjectType } from "./schemas";

export interface TypeMeta {
  slug: string;
  label: ProjectType;
  plural: string;
  shortDescription: string;
}

export const projectTypes: TypeMeta[] = [
  { slug: "site-vitrine", label: "Site vitrine", plural: "sites vitrines",
    shortDescription: "Sites vitrines design et performants." },
  { slug: "saas", label: "SaaS", plural: "applications SaaS",
    shortDescription: "Applications SaaS sur-mesure." },
  { slug: "landing-page", label: "Landing page", plural: "landing pages",
    shortDescription: "Landing pages orientées conversion." },
  { slug: "identite-visuelle", label: "Identite visuelle", plural: "identités visuelles",
    shortDescription: "Identités de marque et chartes graphiques." },
];

export function getTypeBySlug(slug: string): TypeMeta | undefined {
  return projectTypes.find((t) => t.slug === slug);
}

export function getTypeByLabel(label: ProjectType): TypeMeta | undefined {
  return projectTypes.find((t) => t.label === label);
}
