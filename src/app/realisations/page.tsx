import type { Metadata } from "next";
import { getAllProjectFrontmatter } from "@/data/realisations";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import {
  ORGANIZATION,
  breadcrumb,
  collectionPage,
} from "@/lib/seo/schema";
import { ReaBreadcrumbs } from "@/components/v2/realisations/ReaBreadcrumbs";
import { ReaProjectGrid } from "@/components/v2/realisations/ReaProjectGrid";

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

      <ReaProjectGrid
        projects={projects}
        variant="all"
        title="Quelques-unes de nos réalisations"
      />
    </>
  );
}
