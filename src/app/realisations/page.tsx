import type { Metadata } from "next";
import {
  getAllProjectFrontmatter,
  getSecteursWithProjects,
} from "@/data/realisations";
import { secteurList } from "@/data/realisations/secteurs";
import { projectTypes } from "@/data/realisations/types";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import {
  ORGANIZATION,
  breadcrumb,
  collectionPage,
} from "@/lib/seo/schema";
import { ReaBreadcrumbs } from "@/components/v2/realisations/ReaBreadcrumbs";
import { ReaHero } from "@/components/v2/realisations/ReaHero";
import { ReaProjectGrid } from "@/components/v2/realisations/ReaProjectGrid";
import { ReaSectorBlock } from "@/components/v2/realisations/ReaSectorBlock";
import { ReaTypeBlock } from "@/components/v2/realisations/ReaTypeBlock";

export const metadata: Metadata = {
  title: "Réalisations — Portfolio Aurentia Agency",
  description:
    "Portfolio des projets livrés par Aurentia Agency : sites vitrines, SaaS, landing pages et identités. Chaque ligne de code écrite par nous, à Avignon.",
  alternates: {
    canonical: "/realisations",
  },
  openGraph: {
    title: "Réalisations — Portfolio Aurentia Agency",
    description:
      "Portfolio des projets livrés par Aurentia Agency — sites, SaaS, landing pages et identités.",
    url: "/realisations",
    type: "website",
  },
};

export default function RealisationsIndexPage() {
  const projects = getAllProjectFrontmatter();
  const counts = getSecteursWithProjects();

  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const featuredForGrid = featured.length > 0 ? featured : projects.slice(0, 4);

  const collectionItems = projects.map((p) => ({
    name: p.name,
    url: `/realisations/${p.slug}`,
  }));

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd
        data={breadcrumb([
          { name: "Accueil", url: "/" },
          { name: "Réalisations", url: "/realisations" },
        ])}
      />
      <JsonLd
        data={collectionPage(
          "Réalisations Aurentia Agency",
          "Portfolio des projets livrés par Aurentia Agency : sites vitrines, SaaS, landing pages et identités.",
          collectionItems,
        )}
      />

      <ReaBreadcrumbs />
      <ReaHero count={projects.length} />

      <ReaProjectGrid
        projects={featuredForGrid}
        variant="featured"
        eyebrow="Sélection"
        title="Nos projets mis en avant"
        subtitle="Les livraisons dont on parle le plus — celles qui racontent le mieux ce qu'on fait."
      />

      {secteurList
        .filter((s) => (counts.get(s.slug) ?? 0) > 0)
        .map((s) => (
          <ReaSectorBlock
            key={s.slug}
            secteur={s}
            projects={projects.filter((p) => p.secteur === s.slug)}
          />
        ))}

      {projectTypes.map((t) => (
        <ReaTypeBlock
          key={t.slug}
          type={t}
          projects={projects.filter((p) => p.type === t.label)}
        />
      ))}

      <ReaProjectGrid
        projects={projects}
        variant="all"
        filterable
        id="grid-all"
        eyebrow="Tous les projets"
        title="Explorez le portfolio"
        subtitle="Filtrez par type, secteur ou année."
      />
    </>
  );
}
