import { z } from "zod";

export const ProjectType = z.enum([
  "Site vitrine",
  "SaaS",
  "Landing page",
  "Identite visuelle",
]);
export type ProjectType = z.infer<typeof ProjectType>;

export const ProjectStatus = z.enum(["Livre", "En cours"]);
export type ProjectStatus = z.infer<typeof ProjectStatus>;

export const Secteur = z.enum([
  "restauration",
  "conciergerie",
  "immobilier",
  "coaching",
  "tech-ia",
  "sante-bien-etre",
  "services-pro",
]);
export type Secteur = z.infer<typeof Secteur>;

export const ProjectMetric = z.object({
  value: z.string(),
  label: z.string(),
  context: z.string().optional(),
});
export type ProjectMetric = z.infer<typeof ProjectMetric>;

export const ProjectTestimonial = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  avatar: z.string().optional(),
});
export type ProjectTestimonial = z.infer<typeof ProjectTestimonial>;

export const ProjectFrontmatter = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  type: ProjectType,
  secteur: Secteur,
  city: z.string(),
  year: z.number().int().min(2020).max(2030),
  duration: z.string(),
  status: ProjectStatus,
  featured: z.boolean().default(false),
  clientName: z.string().optional(),
  clientRole: z.string().optional(),
  clientLogo: z.string().optional(),
  tags: z.array(z.string()).default([]),
  technos: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional(),
  coverImage: z.string(),
  images: z.array(z.string()).default([]),
  metrics: z.array(ProjectMetric).default([]),
  testimonial: ProjectTestimonial.optional(),
  seo: z
    .object({ title: z.string().optional(), description: z.string().optional() })
    .optional(),
});
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatter>;

export interface ProjectRecord {
  frontmatter: ProjectFrontmatter;
  mdxSource: string;
  filePath: string;
}
