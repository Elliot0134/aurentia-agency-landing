import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";

import {
  getAllProjectFrontmatter,
  getProjectBySlug,
  getRelatedProjects,
} from "@/data/realisations";
import { secteurs } from "@/data/realisations/secteurs";
import { mdxComponents } from "@/components/v2/realisations/mdx/mdx-components";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import {
  ORGANIZATION,
  breadcrumb,
  creativeWorkForProject,
} from "@/lib/seo/schema";

import { CaseStudyLayout } from "@/components/v2/realisations/CaseStudyLayout";
import { CaseStudyHero } from "@/components/v2/realisations/CaseStudyHero";
import { CaseStudyMetrics } from "@/components/v2/realisations/CaseStudyMetrics";
import { CaseStudyTestimonial } from "@/components/v2/realisations/CaseStudyTestimonial";
import { CaseStudyRelated } from "@/components/v2/realisations/CaseStudyRelated";
import { CaseStudyCTA } from "@/components/v2/realisations/CaseStudyCTA";

const BASE_URL = "https://aurentia.agency";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectFrontmatter().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = getProjectBySlug(slug);
  if (!record) return {};
  const p = record.frontmatter;
  const secteurLabel = secteurs[p.secteur]?.label ?? p.secteur;

  const title = p.seo?.title ?? `${p.name} — ${p.type} ${secteurLabel} | Aurentia Agency`;
  const description =
    p.seo?.description ??
    `Étude de cas ${p.name} : ${p.type} dans le secteur ${secteurLabel.toLowerCase()} livré par Aurentia en ${p.duration}.`;
  const url = `${BASE_URL}/v2/realisations/${p.slug}`;
  const image = p.coverImage.startsWith("http")
    ? p.coverImage
    : `${BASE_URL}${p.coverImage}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: image, alt: p.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * The MDX source files use `## Heading {#custom-id}` as an authoring affordance
 * to document which anchor id each section should expose. Since we don't ship a
 * dedicated `remark-heading-id` plugin, we strip those markers before rendering
 * and rely on `rehype-slug` to generate ids from the plain heading text.
 * Headings whose slugified text doesn't match the intended id are rewritten so
 * `rehype-slug` emits the expected id (e.g. "Stack technique" → "Stack" → `stack`).
 */
function prepareMdxSource(raw: string): string {
  return raw
    .replace(/^(##\s+)Stack technique\s*\{#[a-z0-9-]+\}\s*$/gm, "$1Stack")
    .replace(/^(##\s+)Défi\s*\{#[a-z0-9-]+\}\s*$/gm, "$1Defi")
    .replace(/^(##.*)\s*\{#[a-z0-9-]+\}\s*$/gm, "$1");
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = getProjectBySlug(slug);
  if (!record) notFound();
  const project = record.frontmatter;
  const related = getRelatedProjects(project.slug, 3);
  const secteurLabel = secteurs[project.secteur]?.label ?? project.secteur;

  const mdxSource = prepareMdxSource(record.mdxSource);

  const crumbs = breadcrumb([
    { name: "Accueil", url: "/" },
    { name: "Réalisations", url: "/v2/realisations" },
    { name: project.name, url: `/v2/realisations/${project.slug}` },
  ]);

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={crumbs} />
      <JsonLd data={creativeWorkForProject(project)} />

      <main className="flex min-h-screen flex-col">
        <CaseStudyLayout project={project}>
          <CaseStudyHero project={project} />

          <article className="flex flex-col gap-6 text-base text-foreground/80">
            <p className="text-sm uppercase tracking-wide text-foreground/50">
              {project.type} — {secteurLabel} — {project.city} — {project.year}
            </p>
            <div className="max-w-3xl">
              <MDXRemote
                source={mdxSource}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>
          </article>

          <CaseStudyMetrics metrics={project.metrics} />
          <CaseStudyTestimonial testimonial={project.testimonial} />
          <CaseStudyRelated projects={related} />
          <CaseStudyCTA project={project} />
        </CaseStudyLayout>
      </main>
    </>
  );
}
