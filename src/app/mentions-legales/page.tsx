import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { LegalSection } from "@/components/legal/LegalSection";
import type { TocItem } from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Mentions Légales | Aurentia Agency",
  description:
    "Mentions légales du site aurentia.agency : éditeur, hébergeur, propriété intellectuelle et conditions d'utilisation.",
  openGraph: {
    title: "Mentions Légales — Aurentia Agency",
    description:
      "Informations légales relatives au site aurentia.agency conformément à la loi pour la confiance dans l'économie numérique (LCEN).",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const tocItems: TocItem[] = [
  { id: "editeur", label: "Éditeur du site" },
  { id: "directeur-publication", label: "Directeur de la publication" },
  { id: "hebergeur", label: "Hébergeur" },
  { id: "propriete-intellectuelle", label: "Propriété intellectuelle" },
  { id: "credits", label: "Crédits" },
  { id: "conditions-utilisation", label: "Conditions d'utilisation" },
  { id: "liens-hypertextes", label: "Liens hypertextes" },
  { id: "contact", label: "Contact" },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Mentions Légales",
                item: "https://aurentia.agency/mentions-legales",
              },
            ],
          }),
        }}
      />
      <main className="min-h-screen bg-background">
        <LegalPageLayout
          title="Mentions Légales"
          lastUpdated="Mars 2026"
          toc={tocItems}
        >
          {/* Article 1 */}
          <LegalSection id="editeur" title="Article 1 — Éditeur du site">
            <p>
              Le site https://aurentia.agency est édité par :
            </p>
            <p className="mt-4">
              <strong className="text-foreground">Aurentia Agency</strong>
              <br />
              Société par actions simplifiée (SAS)
              <br />
              Capital social : [À COMPLÉTER] &euro;
              <br />
              Siège social : [À COMPLÉTER — adresse complète]
              <br />
              RCS : [À COMPLÉTER — ville]
              <br />
              SIRET : [À COMPLÉTER]
              <br />
              Numéro de TVA intracommunautaire : [À COMPLÉTER]
            </p>
            <p className="mt-4">
              Email : contact@aurentia.agency
              <br />
              Téléphone : [À COMPLÉTER]
            </p>
          </LegalSection>

          {/* Article 2 */}
          <LegalSection
            id="directeur-publication"
            title="Article 2 — Directeur de la publication"
          >
            <p>
              Le directeur de la publication du site est{" "}
              <strong className="text-foreground">Elliot Estrade</strong>, en sa
              qualité de Président de la société Aurentia Agency.
            </p>
            <p className="mt-4">Contact : contact@aurentia.agency</p>
          </LegalSection>

          {/* Article 3 */}
          <LegalSection id="hebergeur" title="Article 3 — Hébergeur">
            <p>Le site est hébergé par :</p>
            <p className="mt-4">
              <strong className="text-foreground">Vercel Inc.</strong>
              <br />
              340 S Lemon Ave #4133
              <br />
              Walnut, CA 91789
              <br />
              États-Unis
            </p>
            <p className="mt-4">
              Site web :{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 text-foreground/90 hover:text-accent-primary transition-colors duration-500 ease-in-out"
              >
                https://vercel.com
              </a>
              <br />
              Email : privacy@vercel.com
            </p>
          </LegalSection>

          {/* Article 4 */}
          <LegalSection
            id="propriete-intellectuelle"
            title="Article 4 — Propriété intellectuelle"
          >
            <p>
              L&apos;ensemble du contenu du site aurentia.agency (textes, images,
              vidéos, graphismes, logo, icônes, sons, logiciels, mise en page,
              bases de données, code source) est la propriété exclusive
              d&apos;Aurentia Agency ou de ses partenaires, et est protégé par les
              lois françaises et internationales relatives à la propriété
              intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication,
              transmission, dénaturation, totale ou partielle du site ou de son
              contenu, par quelque procédé que ce soit et sur quelque support que
              ce soit, est interdite sans l&apos;autorisation écrite préalable
              d&apos;Aurentia Agency.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l&apos;un quelconque
              des éléments qu&apos;il contient sera considérée comme constitutive
              d&apos;une contrefaçon et poursuivie conformément aux dispositions
              des articles L335-2 et suivants du Code de la propriété
              intellectuelle.
            </p>
          </LegalSection>

          {/* Article 5 */}
          <LegalSection id="credits" title="Article 5 — Crédits">
            <p>
              <strong className="text-foreground">
                Conception et développement :
              </strong>{" "}
              Aurentia Agency
            </p>
            <p>
              <strong className="text-foreground">Design :</strong> Aurentia
              Agency
            </p>
            <p className="mt-2">
              <strong className="text-foreground">
                Photographies et visuels :
              </strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Photos d&apos;équipe : Aurentia Agency</li>
              <li>Icônes : Lucide (licence MIT)</li>
              <li>
                Mockups et illustrations : créations originales Aurentia Agency
              </li>
              <li>
                Images tierces éventuelles : [À COMPLÉTER si applicable — source
                et licence]
              </li>
            </ul>
            <p className="mt-2">
              <strong className="text-foreground">
                Technologies utilisées :
              </strong>{" "}
              Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP,
              Vercel
            </p>
          </LegalSection>

          {/* Article 6 */}
          <LegalSection
            id="conditions-utilisation"
            title="Article 6 — Conditions d'utilisation"
          >
            <p>
              L&apos;utilisation du site aurentia.agency implique l&apos;acceptation
              pleine et entière des présentes mentions légales.
            </p>
            <p>
              Le site est accessible gratuitement à tout utilisateur disposant
              d&apos;un accès à Internet. Aurentia Agency met tout en oeuvre pour
              assurer la disponibilité du site, mais ne saurait être tenue
              responsable des interruptions, qu&apos;elles soient dues à des
              opérations de maintenance, à des pannes techniques, ou à des cas de
              force majeure.
            </p>
            <p>
              Aurentia Agency se réserve le droit de modifier, compléter ou
              supprimer tout ou partie du contenu du site à tout moment et sans
              préavis.
            </p>
          </LegalSection>

          {/* Article 7 */}
          <LegalSection
            id="liens-hypertextes"
            title="Article 7 — Liens hypertextes"
          >
            <p>
              Le site aurentia.agency peut contenir des liens hypertextes vers
              d&apos;autres sites web. Aurentia Agency n&apos;exerce aucun contrôle
              sur le contenu de ces sites tiers et décline toute responsabilité
              quant à leur contenu ou aux éventuels collectes et traitements de
              données qu&apos;ils effectuent.
            </p>
            <p>
              La mise en place de liens hypertextes vers le site
              aurentia.agency est autorisée sans accord préalable, à condition que
              ces liens ne portent pas atteinte à l&apos;image d&apos;Aurentia
              Agency.
            </p>
          </LegalSection>

          {/* Article 8 */}
          <LegalSection id="contact" title="Article 8 — Contact">
            <p>
              Pour toute question relative aux présentes mentions légales, vous
              pouvez nous contacter :
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong className="text-foreground">Email :</strong>{" "}
                contact@aurentia.agency
              </li>
              <li>
                <strong className="text-foreground">Formulaire de contact :</strong>{" "}
                <a
                  href="https://aurentia.agency/#contact"
                  className="underline underline-offset-4 text-foreground/90 hover:text-accent-primary transition-colors duration-500 ease-in-out"
                >
                  https://aurentia.agency/#contact
                </a>
              </li>
              <li>
                <strong className="text-foreground">Rendez-vous :</strong>{" "}
                <a
                  href="https://cal.com/aurentia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 text-foreground/90 hover:text-accent-primary transition-colors duration-500 ease-in-out"
                >
                  https://cal.com/aurentia
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-foreground/50">
              Mentions légales conformes à la loi n° 2004-575 du 21 juin 2004
              pour la confiance dans l&apos;économie numérique (LCEN).
            </p>
          </LegalSection>
        </LegalPageLayout>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
