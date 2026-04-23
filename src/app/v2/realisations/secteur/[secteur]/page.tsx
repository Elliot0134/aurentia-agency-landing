import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectsBySecteur } from "@/data/realisations";
import { Secteur } from "@/data/realisations/schemas";
import {
  getSecteur,
  secteurList,
  type SecteurMeta,
} from "@/data/realisations/secteurs";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import {
  ORGANIZATION,
  breadcrumb,
  collectionPage,
  faqPage,
} from "@/lib/seo/schema";
import { SectorPageLayout } from "@/components/v2/realisations/SectorPageLayout";

const MIN_UNIQUE_WORDS = 400;

function countUniqueWords(text: string): number {
  return new Set(text.toLowerCase().split(/\s+/).filter(Boolean)).size;
}

function isIndexable(secteur: SecteurMeta, projectCount: number): boolean {
  if (!secteur.editorial) return false;
  if (countUniqueWords(secteur.editorial) < MIN_UNIQUE_WORDS) return false;
  if (projectCount < 1) return false;
  return true;
}

export function generateStaticParams() {
  return secteurList.map((s) => ({ secteur: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ secteur: string }>;
}): Promise<Metadata> {
  const { secteur: slug } = await params;
  const parsed = Secteur.safeParse(slug);
  if (!parsed.success) return {};
  const secteur = getSecteur(slug);
  if (!secteur) return {};

  const projects = getProjectsBySecteur(parsed.data);
  const indexable = isIndexable(secteur, projects.length);

  const canonical = `/v2/realisations/secteur/${secteur.slug}`;
  const title = `${secteur.heroTitle} — Aurentia Agency`;
  const description = secteur.shortDescription;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    ...(indexable
      ? {}
      : { robots: { index: false, follow: true } }),
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ secteur: string }>;
}) {
  const { secteur: slug } = await params;
  const parsed = Secteur.safeParse(slug);
  if (!parsed.success) notFound();
  const secteur = getSecteur(slug);
  if (!secteur) notFound();

  const records = getProjectsBySecteur(parsed.data);
  const projects = records.map((r) => r.frontmatter);

  const collectionItems = projects.map((p) => ({
    name: p.name,
    url: `/v2/realisations/${p.slug}`,
  }));

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd
        data={breadcrumb([
          { name: "Accueil", url: "/v2" },
          { name: "Réalisations", url: "/v2/realisations" },
          {
            name: secteur.label,
            url: `/v2/realisations/secteur/${secteur.slug}`,
          },
        ])}
      />
      <JsonLd
        data={collectionPage(
          `Réalisations ${secteur.label} — Aurentia Agency`,
          secteur.shortDescription,
          collectionItems,
        )}
      />
      {secteur.faq && secteur.faq.length > 0 && (
        <JsonLd data={faqPage(secteur.faq)} />
      )}

      <SectorPageLayout secteur={secteur} projects={projects} />
    </>
  );
}
