import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import type { SecteurMeta } from "@/data/realisations/secteurs";
import { ReaBreadcrumbs } from "./ReaBreadcrumbs";
import { SectorHero } from "./SectorHero";
import { SectorEditorial } from "./SectorEditorial";
import { SectorProjects } from "./SectorProjects";
import { SectorProcess } from "./SectorProcess";
import { SectorFAQ } from "./SectorFAQ";
import { SectorCTA } from "./SectorCTA";

type Props = {
  secteur: SecteurMeta;
  projects: ProjectFrontmatter[];
};

export function SectorPageLayout({ secteur, projects }: Props) {
  return (
    <>
      <ReaBreadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Réalisations", href: "/realisations" },
          { label: secteur.label },
        ]}
      />
      <SectorHero secteur={secteur} projectCount={projects.length} />
      <SectorEditorial secteur={secteur} editorial={secteur.editorial} />
      <SectorProjects secteur={secteur} projects={projects} />
      <SectorProcess secteur={secteur} process={secteur.process} />
      <SectorFAQ faq={secteur.faq} />
      <SectorCTA secteur={secteur} />
    </>
  );
}
