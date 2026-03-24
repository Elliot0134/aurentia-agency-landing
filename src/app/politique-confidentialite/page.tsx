import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { LegalSection } from "@/components/legal/LegalSection";
import type { TocItem } from "@/components/legal/LegalToc";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — RGPD | Aurentia Agency",
  description:
    "Découvrez comment Aurentia Agency collecte, utilise et protège vos données personnelles. Politique conforme au RGPD.",
  openGraph: {
    title: "Politique de Confidentialité — Aurentia Agency",
    description:
      "Informations sur la collecte et le traitement de vos données personnelles par Aurentia Agency, conformément au RGPD.",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const tocItems: TocItem[] = [
  { id: "responsable-traitement", label: "Responsable du traitement" },
  { id: "donnees-collectees", label: "Données collectées" },
  { id: "finalites", label: "Finalités du traitement" },
  { id: "base-legale", label: "Base légale du traitement" },
  { id: "destinataires", label: "Destinataires des données" },
  { id: "duree-conservation", label: "Durée de conservation" },
  { id: "droits-personnes", label: "Droits des personnes" },
  { id: "cookies", label: "Cookies et traceurs" },
  { id: "transferts-hors-ue", label: "Transferts de données hors UE" },
  { id: "securite", label: "Sécurité des données" },
  { id: "modification-politique", label: "Modification de la politique" },
  { id: "contact", label: "Contact" },
];

export default function PolitiqueConfidentialitePage() {
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
                name: "Politique de Confidentialité",
                item: "https://aurentia.agency/politique-confidentialite",
              },
            ],
          }),
        }}
      />
      <main className="min-h-screen bg-background">
        <LegalPageLayout
          title="Politique de Confidentialité"
          lastUpdated="Mars 2026"
          toc={tocItems}
        >
          {/* Article 1 */}
          <LegalSection
            id="responsable-traitement"
            title="Article 1 — Responsable du traitement"
          >
            <p>
              Le responsable du traitement des données à caractère personnel
              collectées sur le site https://aurentia.agency est :
            </p>
            <p className="mt-4">
              <strong className="text-foreground">Aurentia Agency</strong>
              <br />
              Société par actions simplifiée (SAS)
              <br />
              Siège social : [À COMPLÉTER — adresse complète]
              <br />
              SIRET : [À COMPLÉTER]
              <br />
              Email : contact@aurentia.agency
            </p>
            <p className="mt-4">
              <strong className="text-foreground">
                Délégué à la protection des données (DPO) :
              </strong>{" "}
              [À COMPLÉTER — nom et coordonnées du DPO, ou indiquer &laquo; Le
              responsable du traitement fait office de DPO &raquo;]
            </p>
          </LegalSection>

          {/* Article 2 */}
          <LegalSection
            id="donnees-collectees"
            title="Article 2 — Données collectées"
          >
            <p>
              Aurentia Agency collecte et traite les données personnelles
              suivantes dans le cadre de l&apos;utilisation du site et de ses
              services :
            </p>

            <h3 className="text-lg font-heading font-bold text-foreground mt-6 mb-3">
              2.1. Données collectées via les formulaires
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong className="text-foreground">
                  Formulaire de contact :
                </strong>{" "}
                nom, prénom, adresse email, numéro de téléphone (optionnel), nom
                de l&apos;entreprise (optionnel), message
              </li>
              <li>
                <strong className="text-foreground">
                  Prise de rendez-vous (Cal.com) :
                </strong>{" "}
                nom, prénom, adresse email, créneau choisi
              </li>
            </ul>

            <h3 className="text-lg font-heading font-bold text-foreground mt-6 mb-3">
              2.2. Données collectées automatiquement
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong className="text-foreground">
                  Données de navigation :
                </strong>{" "}
                adresse IP (anonymisée), type de navigateur, système
                d&apos;exploitation, pages visitées, durée de la visite, source de
                trafic
              </li>
              <li>
                <strong className="text-foreground">
                  Cookies et traceurs :
                </strong>{" "}
                voir article 8
              </li>
            </ul>

            <h3 className="text-lg font-heading font-bold text-foreground mt-6 mb-3">
              2.3. Données collectées dans le cadre d&apos;une prestation
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong className="text-foreground">
                  Données contractuelles :
                </strong>{" "}
                nom, prénom, adresse email, adresse postale, numéro de téléphone,
                nom de l&apos;entreprise, numéro SIRET, données de facturation
              </li>
              <li>
                <strong className="text-foreground">
                  Données de projet :
                </strong>{" "}
                éléments fournis par le Client pour la réalisation de la
                prestation (textes, images, accès)
              </li>
            </ul>
          </LegalSection>

          {/* Article 3 */}
          <LegalSection
            id="finalites"
            title="Article 3 — Finalités du traitement"
          >
            <p>
              Les données personnelles collectées sont traitées pour les finalités
              suivantes :
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-base">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="pb-3 pr-6 font-heading font-bold text-foreground">
                      Finalité
                    </th>
                    <th className="pb-3 font-heading font-bold text-foreground">
                      Données concernées
                    </th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">
                      Répondre aux demandes de contact
                    </td>
                    <td className="py-3">Nom, email, téléphone, message</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">Gestion des rendez-vous</td>
                    <td className="py-3">Nom, email, créneau</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">
                      Exécution des prestations de services
                    </td>
                    <td className="py-3">
                      Données contractuelles et de projet
                    </td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">
                      Facturation et suivi comptable
                    </td>
                    <td className="py-3">Données de facturation</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">
                      Amélioration du site et analyse d&apos;audience
                    </td>
                    <td className="py-3">
                      Données de navigation (anonymisées)
                    </td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">
                      Envoi de communications commerciales (avec consentement)
                    </td>
                    <td className="py-3">Adresse email</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">
                      Respect des obligations légales
                    </td>
                    <td className="py-3">
                      Données contractuelles et de facturation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </LegalSection>

          {/* Article 4 */}
          <LegalSection
            id="base-legale"
            title="Article 4 — Base légale du traitement"
          >
            <p>
              Conformément au Règlement (UE) 2016/679 (RGPD), le traitement des
              données personnelles repose sur les bases légales suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong className="text-foreground">
                  Exécution d&apos;un contrat
                </strong>{" "}
                (article 6.1.b du RGPD) : pour le traitement des données
                nécessaires à la réalisation des prestations commandées par le
                Client
              </li>
              <li>
                <strong className="text-foreground">Consentement</strong>{" "}
                (article 6.1.a du RGPD) : pour l&apos;utilisation de cookies non
                essentiels et l&apos;envoi de communications commerciales
              </li>
              <li>
                <strong className="text-foreground">Intérêt légitime</strong>{" "}
                (article 6.1.f du RGPD) : pour l&apos;amélioration du site,
                l&apos;analyse d&apos;audience et la prévention de la fraude
              </li>
              <li>
                <strong className="text-foreground">Obligation légale</strong>{" "}
                (article 6.1.c du RGPD) : pour la conservation des données de
                facturation conformément aux obligations comptables et fiscales
              </li>
            </ul>
          </LegalSection>

          {/* Article 5 */}
          <LegalSection
            id="destinataires"
            title="Article 5 — Destinataires des données"
          >
            <p>
              Les données personnelles collectées sont destinées à :
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong className="text-foreground">
                  L&apos;équipe Aurentia Agency :
                </strong>{" "}
                pour la gestion des demandes, l&apos;exécution des prestations et
                le support client
              </li>
              <li>
                <strong className="text-foreground">
                  Sous-traitants techniques :
                </strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>
                    <strong className="text-foreground">Vercel Inc.</strong>{" "}
                    (hébergement du site) — États-Unis
                  </li>
                  <li>
                    <strong className="text-foreground">Cal.com</strong>{" "}
                    (gestion des rendez-vous) — États-Unis
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Vercel Analytics
                    </strong>{" "}
                    (analyse d&apos;audience) — États-Unis
                  </li>
                  <li>
                    <strong className="text-foreground">PostHog</strong>{" "}
                    (analyse d&apos;audience et comportement utilisateur, si
                    activé) — Union Européenne / États-Unis
                  </li>
                  <li>
                    <strong className="text-foreground">Supabase</strong> (base
                    de données, si applicable) — États-Unis
                  </li>
                  <li>
                    <strong className="text-foreground">Stripe</strong>{" "}
                    (traitement des paiements, si applicable) — États-Unis
                  </li>
                </ul>
              </li>
            </ul>
            <p className="mt-4">
              Aurentia Agency veille à ce que chaque sous-traitant présente des
              garanties suffisantes en matière de protection des données
              personnelles.
            </p>
            <p>
              Aucune donnée personnelle n&apos;est vendue, louée ou cédée à des
              tiers à des fins commerciales.
            </p>
          </LegalSection>

          {/* Article 6 */}
          <LegalSection
            id="duree-conservation"
            title="Article 6 — Durée de conservation"
          >
            <p>
              Les données personnelles sont conservées pour une durée
              proportionnée à la finalité du traitement :
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-base">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="pb-3 pr-6 font-heading font-bold text-foreground">
                      Catégorie de données
                    </th>
                    <th className="pb-3 font-heading font-bold text-foreground">
                      Durée de conservation
                    </th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">
                      Données de contact (formulaires)
                    </td>
                    <td className="py-3">
                      3 ans à compter du dernier contact
                    </td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">Données de rendez-vous</td>
                    <td className="py-3">
                      1 an à compter du rendez-vous
                    </td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">
                      Données contractuelles (clients)
                    </td>
                    <td className="py-3">
                      Durée de la relation contractuelle + 5 ans (prescription
                      civile)
                    </td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">Données de facturation</td>
                    <td className="py-3">
                      10 ans (obligations comptables et fiscales)
                    </td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-6">
                      Données de navigation (analytics)
                    </td>
                    <td className="py-3">
                      13 mois (recommandation CNIL)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Cookies</td>
                    <td className="py-3">Voir article 8</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              À l&apos;expiration de ces durées, les données sont supprimées ou
              anonymisées de manière irréversible.
            </p>
          </LegalSection>

          {/* Article 7 */}
          <LegalSection
            id="droits-personnes"
            title="Article 7 — Droits des personnes"
          >
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous
              disposez des droits suivants sur vos données personnelles :
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong className="text-foreground">Droit d&apos;accès</strong>{" "}
                (article 15 du RGPD) : obtenir la confirmation du traitement de
                vos données et en obtenir une copie
              </li>
              <li>
                <strong className="text-foreground">
                  Droit de rectification
                </strong>{" "}
                (article 16 du RGPD) : corriger des données inexactes ou
                incomplètes
              </li>
              <li>
                <strong className="text-foreground">
                  Droit à l&apos;effacement
                </strong>{" "}
                (article 17 du RGPD) : demander la suppression de vos données,
                sous réserve des obligations légales de conservation
              </li>
              <li>
                <strong className="text-foreground">
                  Droit à la limitation du traitement
                </strong>{" "}
                (article 18 du RGPD) : demander la suspension du traitement de
                vos données
              </li>
              <li>
                <strong className="text-foreground">
                  Droit à la portabilité
                </strong>{" "}
                (article 20 du RGPD) : recevoir vos données dans un format
                structuré, couramment utilisé et lisible par machine
              </li>
              <li>
                <strong className="text-foreground">
                  Droit d&apos;opposition
                </strong>{" "}
                (article 21 du RGPD) : vous opposer au traitement de vos données
                pour des motifs légitimes, ou à des fins de prospection
                commerciale
              </li>
              <li>
                <strong className="text-foreground">
                  Droit de retirer votre consentement
                </strong>{" "}
                à tout moment pour les traitements fondés sur le consentement,
                sans remettre en cause la licéité du traitement effectué avant le
                retrait
              </li>
            </ul>

            <h3 className="text-lg font-heading font-bold text-foreground mt-8 mb-3">
              Comment exercer vos droits
            </h3>
            <p>
              Vous pouvez exercer vos droits en adressant votre demande :
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong className="text-foreground">Par email :</strong>{" "}
                contact@aurentia.agency
              </li>
              <li>
                <strong className="text-foreground">Par courrier :</strong>{" "}
                Aurentia Agency — [À COMPLÉTER — adresse postale]
              </li>
            </ul>
            <p className="mt-4">
              Nous nous engageons à répondre à votre demande dans un délai
              maximum d&apos;un mois à compter de sa réception. Ce délai peut être
              prolongé de deux mois en cas de demande complexe, auquel cas vous en
              serez informé.
            </p>
            <p>
              Une pièce d&apos;identité pourra vous être demandée afin de vérifier
              votre identité.
            </p>

            <h3 className="text-lg font-heading font-bold text-foreground mt-8 mb-3">
              Réclamation auprès de la CNIL
            </h3>
            <p>
              Si vous estimez que le traitement de vos données personnelles
              constitue une violation du RGPD, vous avez le droit d&apos;introduire
              une réclamation auprès de la Commission Nationale de
              l&apos;Informatique et des Libertés (CNIL) :
            </p>
            <p className="mt-4">
              <strong className="text-foreground">CNIL</strong>
              <br />
              3, Place de Fontenoy — TSA 80715
              <br />
              75334 Paris Cedex 07
              <br />
              Site web :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 text-foreground/90 hover:text-accent-primary transition-colors duration-500 ease-in-out"
              >
                https://www.cnil.fr
              </a>
              <br />
              Téléphone : 01 53 73 22 22
            </p>
          </LegalSection>

          {/* Article 8 */}
          <LegalSection id="cookies" title="Article 8 — Cookies et traceurs">
            <h3 className="text-lg font-heading font-bold text-foreground mb-3">
              8.1. Qu&apos;est-ce qu&apos;un cookie ?
            </h3>
            <p>
              Un cookie est un petit fichier texte stocké sur votre terminal
              (ordinateur, tablette, smartphone) lors de votre visite sur un site
              web. Il permet de mémoriser des informations relatives à votre
              navigation.
            </p>

            <h3 className="text-lg font-heading font-bold text-foreground mt-6 mb-3">
              8.2. Cookies utilisés sur le site
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-base">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="pb-3 pr-4 font-heading font-bold text-foreground">
                      Cookie / Traceur
                    </th>
                    <th className="pb-3 pr-4 font-heading font-bold text-foreground">
                      Éditeur
                    </th>
                    <th className="pb-3 pr-4 font-heading font-bold text-foreground">
                      Finalité
                    </th>
                    <th className="pb-3 pr-4 font-heading font-bold text-foreground">
                      Type
                    </th>
                    <th className="pb-3 font-heading font-bold text-foreground">
                      Durée
                    </th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-4">Vercel Analytics</td>
                    <td className="py-3 pr-4">Vercel Inc.</td>
                    <td className="py-3 pr-4">
                      Analyse d&apos;audience (pages vues, source de trafic,
                      pays). Données anonymisées, sans cookie persistant.
                    </td>
                    <td className="py-3 pr-4">
                      Analytique (privacy-friendly)
                    </td>
                    <td className="py-3">Session</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-4">Vercel Speed Insights</td>
                    <td className="py-3 pr-4">Vercel Inc.</td>
                    <td className="py-3 pr-4">
                      Mesure de la performance du site (temps de chargement, Web
                      Vitals).
                    </td>
                    <td className="py-3 pr-4">Performance</td>
                    <td className="py-3">Session</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-4">PostHog (si activé)</td>
                    <td className="py-3 pr-4">PostHog Inc.</td>
                    <td className="py-3 pr-4">
                      Analyse comportementale (parcours utilisateur, clics,
                      événements).
                    </td>
                    <td className="py-3 pr-4">Analytique</td>
                    <td className="py-3">1 an</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Cookies techniques</td>
                    <td className="py-3 pr-4">Aurentia Agency</td>
                    <td className="py-3 pr-4">
                      Fonctionnement du site (préférence de thème clair/sombre).
                    </td>
                    <td className="py-3 pr-4">Strictement nécessaire</td>
                    <td className="py-3">1 an</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-heading font-bold text-foreground mt-6 mb-3">
              8.3. Consentement
            </h3>
            <p>
              Conformément à la recommandation de la CNIL sur les cookies
              (délibération n° 2020-091 du 17 septembre 2020) :
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong className="text-foreground">
                  Cookies strictement nécessaires :
                </strong>{" "}
                déposés sans consentement, car indispensables au fonctionnement du
                site
              </li>
              <li>
                <strong className="text-foreground">
                  Cookies analytiques (Vercel Analytics) :
                </strong>{" "}
                Vercel Analytics est conçu pour respecter la vie privée (pas de
                cookie persistant, données anonymisées). Conformément aux lignes
                directrices de la CNIL, ces traceurs exemptés de consentement sont
                limités à la mesure d&apos;audience strictement nécessaire
              </li>
              <li>
                <strong className="text-foreground">
                  Cookies analytiques (PostHog, si activé) :
                </strong>{" "}
                soumis au consentement préalable de l&apos;utilisateur
              </li>
            </ul>

            <h3 className="text-lg font-heading font-bold text-foreground mt-6 mb-3">
              8.4. Gestion des cookies
            </h3>
            <p>
              Vous pouvez à tout moment gérer vos préférences en matière de
              cookies :
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong className="text-foreground">
                  Via le bandeau cookies
                </strong>{" "}
                affiché lors de votre première visite sur le site
              </li>
              <li>
                <strong className="text-foreground">
                  Via les paramètres de votre navigateur :
                </strong>{" "}
                chaque navigateur propose des options pour accepter, refuser ou
                supprimer les cookies. Consultez la documentation de votre
                navigateur pour plus d&apos;informations.
              </li>
            </ul>
            <p className="mt-4">
              Le refus des cookies analytiques n&apos;a aucune incidence sur votre
              navigation sur le site.
            </p>
          </LegalSection>

          {/* Article 9 */}
          <LegalSection
            id="transferts-hors-ue"
            title="Article 9 — Transferts de données hors Union Européenne"
          >
            <p>
              Certains de nos sous-traitants sont situés aux États-Unis (Vercel,
              Cal.com, Stripe). Ces transferts de données hors de l&apos;Union
              Européenne sont encadrés par :
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                Le{" "}
                <strong className="text-foreground">
                  Data Privacy Framework (DPF) UE-États-Unis
                </strong>
                , adopté par la Commission européenne le 10 juillet 2023
                (décision d&apos;adéquation), pour les entreprises certifiées
              </li>
              <li>
                Des{" "}
                <strong className="text-foreground">
                  clauses contractuelles types (CCT)
                </strong>{" "}
                adoptées par la Commission européenne, conformément à
                l&apos;article 46.2.c du RGPD
              </li>
              <li>
                Des{" "}
                <strong className="text-foreground">
                  mesures techniques complémentaires
                </strong>{" "}
                (chiffrement des données en transit et au repos, pseudonymisation
                lorsque c&apos;est possible)
              </li>
            </ul>
            <p className="mt-4">
              Aurentia Agency vérifie régulièrement que ses sous-traitants
              maintiennent un niveau de protection adéquat des données
              personnelles.
            </p>
          </LegalSection>

          {/* Article 10 */}
          <LegalSection
            id="securite"
            title="Article 10 — Sécurité des données"
          >
            <p>
              Aurentia Agency met en oeuvre les mesures techniques et
              organisationnelles appropriées pour protéger les données personnelles
              contre la destruction accidentelle ou illicite, la perte,
              l&apos;altération, la diffusion ou l&apos;accès non autorisé,
              notamment :
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-4">
              <li>Chiffrement des communications (HTTPS / TLS)</li>
              <li>Contrôle d&apos;accès strict aux données</li>
              <li>Sauvegardes régulières</li>
              <li>Mises à jour de sécurité</li>
              <li>
                Sensibilisation de l&apos;équipe aux bonnes pratiques de
                protection des données
              </li>
            </ul>
          </LegalSection>

          {/* Article 11 */}
          <LegalSection
            id="modification-politique"
            title="Article 11 — Modification de la politique"
          >
            <p>
              Aurentia Agency se réserve le droit de modifier la présente
              politique de confidentialité à tout moment. Toute modification
              substantielle sera signalée sur le site. La date de dernière mise à
              jour est indiquée en haut de cette page.
            </p>
            <p>
              Nous vous invitons à consulter régulièrement cette page pour
              prendre connaissance des éventuelles modifications.
            </p>
          </LegalSection>

          {/* Article 12 */}
          <LegalSection id="contact" title="Article 12 — Contact">
            <p>
              Pour toute question relative à la présente politique de
              confidentialité ou à l&apos;exercice de vos droits, vous pouvez
              contacter :
            </p>
            <p className="mt-4">
              <strong className="text-foreground">Aurentia Agency</strong>
              <br />
              Email : contact@aurentia.agency
              <br />
              Adresse : [À COMPLÉTER — adresse postale]
            </p>
            <p className="mt-4">
              DPO : [À COMPLÉTER — nom et coordonnées]
            </p>
            <p className="mt-6 text-sm text-foreground/50">
              Politique de confidentialité conforme au Règlement (UE) 2016/679
              (RGPD) et à la loi n° 78-17 du 6 janvier 1978 relative à
              l&apos;informatique, aux fichiers et aux libertés.
            </p>
          </LegalSection>
        </LegalPageLayout>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
