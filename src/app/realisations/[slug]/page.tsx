import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { ProjectBreadcrumb } from "@/components/realisations/project/ProjectBreadcrumb";
import { ProjectHero } from "@/components/realisations/project/ProjectHero";
import { ProjectContext } from "@/components/realisations/project/ProjectContext";
import { ProjectSolution } from "@/components/realisations/project/ProjectSolution";
import { ProjectGallery } from "@/components/realisations/project/ProjectGallery";
import { ProjectResults } from "@/components/realisations/project/ProjectResults";
import { ProjectTestimonial } from "@/components/realisations/project/ProjectTestimonial";
import { ProjectTechnologies } from "@/components/realisations/project/ProjectTechnologies";
import { ProjectNavigation } from "@/components/realisations/project/ProjectNavigation";
import { ProjectCTA } from "@/components/realisations/project/ProjectCTA";
import { projects, getProjectBySlug } from "@/data/projects";

// ---------------------------------------------------------------------------
// SSG — generate all project slugs at build time
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per project
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Aurentia Agency`,
    description: project.context,
    openGraph: {
      title: `${project.name} — Aurentia Agency`,
      description: project.context,
      url: `https://aurentia.agency/realisations/${project.slug}`,
      type: "article",
      images: [project.coverImage],
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Circular prev / next navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // JSON-LD structured data
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description: project.context,
      url: `https://aurentia.agency/realisations/${project.slug}`,
      image: project.coverImage,
      creator: {
        "@type": "Organization",
        name: "Aurentia Agency",
        url: "https://aurentia.agency",
      },
      datePublished: `${project.year}`,
      keywords: project.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://aurentia.agency",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Realisations",
          item: "https://aurentia.agency/realisations",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.name,
          item: `https://aurentia.agency/realisations/${project.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <ScrollToTop />
      <main className="flex min-h-screen flex-col w-full">
        <ProjectBreadcrumb projectName={project.name} />
        <ProjectHero project={project} />
        <ProjectContext context={project.context} problem={project.problem} />
        <ProjectSolution solution={project.solution} features={project.features} />
        <ProjectGallery images={project.images} projectName={project.name} />
        <ProjectResults results={project.results} />
        <ProjectTestimonial testimonial={project.testimonial} />
        <ProjectTechnologies technologies={project.technologies} />
        <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
        <ProjectCTA projectType={project.type} />
      </main>
      <Footer />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
