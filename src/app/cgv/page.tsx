import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { LegalPageLayout, type TocItem } from "@/components/legal/LegalPageLayout";
import { LegalSection } from "@/components/legal/LegalSection";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Aurentia Agency",
  description:
    "Consultez les conditions générales de vente d'Aurentia Agency : prestations web, paiement, livraison, propriété intellectuelle et garanties.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "CGV — Aurentia Agency",
    description:
      "Conditions générales de vente applicables aux prestations de création web et services numériques d'Aurentia Agency.",
    type: "website",
  },
};

const tocItems: TocItem[] = [
  { id: "objet", label: "1. Objet et champ d'application" },
  { id: "definitions", label: "2. Définitions" },
  { id: "commandes", label: "3. Commandes et devis" },
  { id: "prix", label: "4. Prix et modalités de paiement" },
  { id: "delais", label: "5. Délais de livraison" },
  { id: "revisions", label: "6. Révisions et modifications" },
  { id: "propriete-intellectuelle", label: "7. Propriété intellectuelle" },
  { id: "hebergement", label: "8. Hébergement et maintenance" },
  { id: "resiliation", label: "9. Résiliation" },
  { id: "retractation", label: "10. Droit de rétractation" },
  { id: "responsabilite", label: "11. Responsabilité et garanties" },
  { id: "donnees-personnelles", label: "12. Données personnelles" },
  { id: "force-majeure", label: "13. Force majeure" },
  { id: "droit-applicable", label: "14. Droit applicable et litiges" },
  { id: "dispositions-generales", label: "15. Dispositions générales" },
];

const breadcrumbJsonLd = {
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
      name: "Conditions Générales de Vente",
      item: "https://aurentia.agency/cgv",
    },
  ],
};

export default function CGVPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <LegalPageLayout
          title="Conditions Générales de Vente"
          lastUpdated="Mars 2026"
          toc={tocItems}
        >
          {/* Article 1 */}
          <LegalSection id="objet" title="Article 1 — Objet et champ d'application">
            <p>
              Les présentes Conditions Générales de Vente (ci-après &laquo;&nbsp;CGV&nbsp;&raquo;)
              s&apos;appliquent à l&apos;ensemble des prestations de services numériques proposées
              par la société Aurentia Agency (ci-après &laquo;&nbsp;le Prestataire&nbsp;&raquo;) à
              ses clients professionnels ou particuliers (ci-après &laquo;&nbsp;le
              Client&nbsp;&raquo;).
            </p>
            <p>Les prestations concernées incluent notamment&nbsp;:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La conception et le développement de sites web vitrines sur-mesure</li>
              <li>La conception et le développement d&apos;applications SaaS</li>
              <li>La conception et le développement de landing pages</li>
              <li>La création d&apos;identité visuelle</li>
              <li>Les prestations de formation</li>
              <li>L&apos;hébergement et la maintenance de sites web</li>
            </ul>
            <p>
              Toute commande implique l&apos;acceptation sans réserve des présentes CGV. Le
              Prestataire se réserve le droit de modifier les présentes CGV à tout moment. Les CGV
              applicables sont celles en vigueur à la date de la commande.
            </p>
          </LegalSection>

          {/* Article 2 */}
          <LegalSection id="definitions" title="Article 2 — Définitions">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Prestataire</strong>&nbsp;: Aurentia Agency, SAS au capital de [À
                COMPLÉTER]&nbsp;€, immatriculée au RCS de [À COMPLÉTER] sous le numéro SIRET [À
                COMPLÉTER], dont le siège social est situé au [À COMPLÉTER].
              </li>
              <li>
                <strong>Client</strong>&nbsp;: Toute personne physique ou morale qui passe commande
                d&apos;une prestation auprès du Prestataire.
              </li>
              <li>
                <strong>Devis</strong>&nbsp;: Document contractuel détaillant la nature, le
                périmètre, le prix et les délais de la prestation.
              </li>
              <li>
                <strong>Livrables</strong>&nbsp;: L&apos;ensemble des éléments produits par le
                Prestataire dans le cadre de la prestation (site web, maquettes, code source,
                contenus, etc.).
              </li>
              <li>
                <strong>V1</strong>&nbsp;: Première version fonctionnelle du site web, mise en ligne
                dans un environnement de prévisualisation.
              </li>
              <li>
                <strong>Version finale</strong>&nbsp;: Version définitive du site web après
                intégration des retours du Client, mise en ligne sur le domaine de production.
              </li>
            </ul>
          </LegalSection>

          {/* Article 3 */}
          <LegalSection id="commandes" title="Article 3 — Commandes et devis">
            <h3 className="text-lg font-semibold text-foreground mt-2">
              3.1. Processus de commande
            </h3>
            <p>
              Toute prestation fait l&apos;objet d&apos;un devis préalable, établi gratuitement par
              le Prestataire à la suite d&apos;un échange avec le Client (appel téléphonique,
              visioconférence ou échange écrit).
            </p>
            <p>Le devis précise&nbsp;:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La nature et le périmètre détaillé de la prestation</li>
              <li>Le prix total hors taxes et toutes taxes comprises</li>
              <li>Les modalités et l&apos;échéancier de paiement</li>
              <li>Les délais de livraison prévisionnels</li>
              <li>Le nombre de tours de révisions inclus</li>
              <li>Les éventuelles options (hébergement, maintenance, formation)</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6">3.2. Acceptation</h3>
            <p>
              La commande est considérée comme ferme et définitive après&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Signature du devis par le Client (signature électronique ou manuscrite acceptée)
              </li>
              <li>
                Paiement du premier acompte conformément à l&apos;échéancier prévu
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              3.3. Éléments fournis par le Client
            </h3>
            <p>
              Le Client s&apos;engage à fournir dans les délais convenus l&apos;ensemble des
              éléments nécessaires à la réalisation de la prestation&nbsp;: textes, images, logos,
              accès aux outils existants, brief détaillé. Tout retard dans la transmission de ces
              éléments pourra entraîner un décalage des délais de livraison, sans que la
              responsabilité du Prestataire ne puisse être engagée.
            </p>
          </LegalSection>

          {/* Article 4 */}
          <LegalSection id="prix" title="Article 4 — Prix et modalités de paiement">
            <h3 className="text-lg font-semibold text-foreground mt-2">4.1. Prix</h3>
            <p>
              Les prix sont indiqués en euros et hors taxes, sauf mention contraire. La TVA
              applicable est celle en vigueur au jour de la facturation.
            </p>
            <p>
              À titre indicatif, les fourchettes de prix des prestations sont les
              suivantes&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sites vitrines sur-mesure&nbsp;: à partir de 1&nbsp;200&nbsp;€ HT</li>
              <li>Landing pages haute conversion&nbsp;: à partir de 1&nbsp;500&nbsp;€ HT</li>
              <li>Applications SaaS&nbsp;: à partir de 5&nbsp;000&nbsp;€ HT (sur devis)</li>
            </ul>
            <p>
              Les tarifs des abonnements d&apos;hébergement et maintenance sont détaillés à
              l&apos;article&nbsp;8.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              4.2. Modalités de paiement
            </h3>
            <p>
              Le paiement s&apos;effectue par virement bancaire ou par tout autre moyen accepté par
              le Prestataire.
            </p>
            <p>
              <strong>Option de paiement en 3 fois sans frais&nbsp;:</strong>
              <br />
              Le Client peut opter pour un règlement en 3 échéances égales&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                1<sup>ère</sup> échéance&nbsp;: à la signature du devis (avant le début de la
                prestation)
              </li>
              <li>
                2<sup>ème</sup> échéance&nbsp;: à la livraison de la V1
              </li>
              <li>
                3<sup>ème</sup> échéance&nbsp;: à la livraison de la version finale
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              4.3. Retard de paiement
            </h3>
            <p>
              Tout retard de paiement entraîne de plein droit, et sans qu&apos;une mise en demeure
              soit nécessaire&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                L&apos;application de pénalités de retard au taux de trois fois le taux
                d&apos;intérêt légal en vigueur
              </li>
              <li>
                Une indemnité forfaitaire de recouvrement de 40&nbsp;euros, conformément aux
                articles L441-10 et D441-5 du Code de commerce
              </li>
            </ul>
            <p>
              Le Prestataire se réserve le droit de suspendre l&apos;exécution de la prestation en
              cas de non-paiement d&apos;une échéance dans un délai de 15 jours après mise en
              demeure restée infructueuse.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              4.4. Premier mois d&apos;abonnement offert
            </h3>
            <p>
              Pour toute souscription à un abonnement d&apos;hébergement et maintenance
              concomitante à une prestation de création de site, le premier mois d&apos;abonnement
              est offert.
            </p>
          </LegalSection>

          {/* Article 5 */}
          <LegalSection id="delais" title="Article 5 — Délais de livraison">
            <h3 className="text-lg font-semibold text-foreground mt-2">
              5.1. Délais indicatifs
            </h3>
            <p>
              Les délais de livraison sont communiqués à titre indicatif et courent à compter de la
              réception de l&apos;intégralité des éléments nécessaires fournis par le Client et du
              paiement du premier acompte.
            </p>
            <p>Les délais standards sont les suivants&nbsp;:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>V1 (première version fonctionnelle)</strong>&nbsp;: 48 heures ouvrées à
                compter de la réception de tous les éléments
              </li>
              <li>
                <strong>Version finale</strong>&nbsp;: 7 jours ouvrés à compter de la validation de
                la V1 par le Client, incluant les tours de révisions
              </li>
            </ul>
            <p>
              Ces délais s&apos;entendent pour les prestations de création de sites vitrines. Les
              délais pour les applications SaaS et les projets complexes sont définis au cas par cas
              dans le devis.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              5.2. Validation et réception
            </h3>
            <p>
              La V1 est présentée au Client via un lien de prévisualisation. Le Client dispose de 7
              jours calendaires pour formuler ses retours. Passé ce délai sans réponse, la V1 est
              réputée acceptée.
            </p>
            <p>
              La livraison finale est considérée comme effective lors de la mise en ligne du site sur
              le domaine de production du Client. Un procès-verbal de réception pourra être établi à
              la demande de l&apos;une ou l&apos;autre des parties.
            </p>
          </LegalSection>

          {/* Article 6 */}
          <LegalSection id="revisions" title="Article 6 — Révisions et modifications">
            <h3 className="text-lg font-semibold text-foreground mt-2">
              6.1. Révisions incluses
            </h3>
            <p>
              Chaque prestation inclut <strong>3 tours de révisions</strong> à compter de la
              livraison de la V1. Chaque tour de révision correspond à un ensemble de modifications
              demandées par le Client et transmises en une seule fois.
            </p>
            <p>Les révisions incluses couvrent&nbsp;:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Les ajustements de contenu textuel</li>
              <li>
                Les modifications mineures de design (couleurs, espacements, typographie)
              </li>
              <li>Les corrections de bugs ou dysfonctionnements</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              6.2. Modifications hors périmètre
            </h3>
            <p>
              Les demandes suivantes ne sont pas couvertes par les tours de révisions inclus et
              feront l&apos;objet d&apos;un devis complémentaire&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ajout de pages ou de fonctionnalités non prévues au devis initial</li>
              <li>Refonte significative du design ou de l&apos;architecture</li>
              <li>Modification du périmètre fonctionnel initial</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              6.3. Révisions supplémentaires
            </h3>
            <p>
              Au-delà des 3 tours de révisions inclus, toute modification supplémentaire sera
              facturée sur la base d&apos;un taux horaire de [À COMPLÉTER]&nbsp;€ HT/heure, après
              acceptation d&apos;un devis complémentaire par le Client.
            </p>
          </LegalSection>

          {/* Article 7 */}
          <LegalSection
            id="propriete-intellectuelle"
            title="Article 7 — Propriété intellectuelle"
          >
            <h3 className="text-lg font-semibold text-foreground mt-2">
              7.1. Cession des droits
            </h3>
            <p>
              À compter du paiement intégral de la prestation, le Prestataire cède au Client
              l&apos;ensemble des droits de propriété intellectuelle sur les Livrables, et
              notamment&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Le code source du site web ou de l&apos;application</li>
              <li>Les éléments graphiques créés spécifiquement pour le projet</li>
              <li>Les contenus rédactionnels produits par le Prestataire</li>
            </ul>
            <p>
              Cette cession est consentie à titre exclusif, pour le monde entier et pour toute la
              durée de protection des droits de propriété intellectuelle.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">7.2. Exceptions</h3>
            <p>Sont exclus de la cession&nbsp;:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Les outils, frameworks, bibliothèques et composants open source utilisés pour le
                développement (Next.js, React, Tailwind CSS, etc.), qui restent soumis à leurs
                licences respectives
              </li>
              <li>
                Le savoir-faire, les méthodologies et les processus internes du Prestataire
              </li>
              <li>
                Les éléments achetés auprès de tiers (polices, images de stock, icônes) qui restent
                soumis à leurs licences propres
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              7.3. Droit de référence
            </h3>
            <p>
              Le Prestataire se réserve le droit de mentionner le projet réalisé dans son portfolio
              et ses supports de communication, sauf opposition écrite du Client.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              7.4. Garantie du Client
            </h3>
            <p>
              Le Client garantit qu&apos;il dispose des droits nécessaires sur les éléments
              qu&apos;il fournit (textes, images, logos, marques) et qu&apos;il tiendra le
              Prestataire indemne de toute réclamation de tiers à ce titre.
            </p>
          </LegalSection>

          {/* Article 8 */}
          <LegalSection id="hebergement" title="Article 8 — Hébergement et maintenance">
            <h3 className="text-lg font-semibold text-foreground mt-2">8.1. Abonnements</h3>
            <p>
              Le Prestataire propose des abonnements mensuels d&apos;hébergement et de maintenance,
              souscrits en complément d&apos;une prestation de création de site&nbsp;:
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="py-3 pr-4 font-semibold text-foreground">Formule</th>
                    <th className="py-3 pr-4 font-semibold text-foreground">Prix mensuel TTC</th>
                    <th className="py-3 font-semibold text-foreground">Inclut</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80">
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-4 font-medium">Essentiel</td>
                    <td className="py-3 pr-4">19&nbsp;€/mois</td>
                    <td className="py-3">
                      Hébergement, certificat SSL, sauvegardes hebdomadaires, mises à jour de
                      sécurité
                    </td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="py-3 pr-4 font-medium">Croissance</td>
                    <td className="py-3 pr-4">35&nbsp;€/mois</td>
                    <td className="py-3">
                      Hébergement, certificat SSL, sauvegardes quotidiennes, mises à jour de
                      sécurité, support prioritaire, modifications mineures (1h/mois)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">Premium</td>
                    <td className="py-3 pr-4">75&nbsp;€/mois</td>
                    <td className="py-3">
                      Hébergement, certificat SSL, sauvegardes quotidiennes, mises à jour de
                      sécurité, support prioritaire, modifications (3h/mois), monitoring
                      performance, rapport mensuel
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              8.2. Durée et renouvellement
            </h3>
            <p>
              Les abonnements sont souscrits pour une durée initiale d&apos;un mois et sont
              renouvelés tacitement chaque mois. Le Client peut résilier son abonnement à tout
              moment, avec un préavis de 30 jours avant la date de renouvellement.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              8.3. Premier mois offert
            </h3>
            <p>
              Le premier mois d&apos;abonnement est offert pour toute souscription concomitante à
              une prestation de création de site.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              8.4. Conséquences de la résiliation
            </h3>
            <p>
              En cas de résiliation de l&apos;abonnement d&apos;hébergement, le Prestataire
              s&apos;engage à&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Fournir au Client une copie complète du code source et des données du site
              </li>
              <li>
                Maintenir le site en ligne pendant 30 jours suivant la résiliation effective, afin
                de permettre la migration
              </li>
              <li>
                Accompagner le Client dans le transfert technique si celui-ci en fait la demande
                (prestation facturée séparément)
              </li>
            </ul>
          </LegalSection>

          {/* Article 9 */}
          <LegalSection id="resiliation" title="Article 9 — Résiliation">
            <h3 className="text-lg font-semibold text-foreground mt-2">
              9.1. Résiliation par le Client
            </h3>
            <p>
              Le Client peut résilier la prestation en cours à tout moment par lettre recommandée
              avec accusé de réception ou par email à contact@aurentia.agency.
            </p>
            <p>
              En cas de résiliation avant la livraison de la V1, les acomptes versés restent acquis
              au Prestataire au titre du travail déjà réalisé.
            </p>
            <p>
              En cas de résiliation après la livraison de la V1, l&apos;intégralité du prix de la
              prestation est due.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              9.2. Résiliation par le Prestataire
            </h3>
            <p>
              Le Prestataire peut résilier la prestation en cas de&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Non-paiement d&apos;une échéance après mise en demeure restée infructueuse pendant
                15 jours
              </li>
              <li>
                Non-fourniture des éléments nécessaires par le Client après relance restée sans
                effet pendant 30 jours
              </li>
              <li>
                Comportement du Client contraire aux bonnes m&oelig;urs ou aux dispositions légales
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6">9.3. Conséquences</h3>
            <p>
              En cas de résiliation, quelle qu&apos;en soit la cause, le Prestataire remettra au
              Client l&apos;ensemble des Livrables produits à la date de résiliation, sous réserve
              du paiement intégral des sommes dues pour le travail réalisé.
            </p>
          </LegalSection>

          {/* Article 10 */}
          <LegalSection id="retractation" title="Article 10 — Droit de rétractation">
            <p>
              Conformément à l&apos;article L221-28 du Code de la consommation, le droit de
              rétractation ne peut être exercé pour les prestations de services pleinement exécutées
              avant la fin du délai de rétractation et dont l&apos;exécution a commencé après accord
              préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
            </p>
            <p>
              Le Client reconnaît expressément, lors de l&apos;acceptation du devis, que&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                L&apos;exécution de la prestation commence dès la réception des éléments nécessaires
                et du premier acompte
              </li>
              <li>
                Il renonce à son droit de rétractation dès le début de l&apos;exécution de la
                prestation
              </li>
            </ul>
            <p>
              Pour les prestations qui n&apos;ont pas encore commencé, le Client consommateur
              dispose d&apos;un délai de rétractation de 14 jours à compter de l&apos;acceptation du
              devis, conformément aux articles L221-18 et suivants du Code de la consommation.
            </p>
          </LegalSection>

          {/* Article 11 */}
          <LegalSection id="responsabilite" title="Article 11 — Responsabilité et garanties">
            <h3 className="text-lg font-semibold text-foreground mt-2">
              11.1. Obligation de moyens
            </h3>
            <p>
              Le Prestataire s&apos;engage à exécuter les prestations avec diligence et selon les
              règles de l&apos;art, dans le cadre d&apos;une obligation de moyens.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              11.2. Limites de responsabilité
            </h3>
            <p>
              La responsabilité du Prestataire ne saurait être engagée en cas de&nbsp;:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Non-respect par le Client de ses obligations (fourniture des éléments, validations
                dans les délais)
              </li>
              <li>
                Dysfonctionnement résultant d&apos;une intervention d&apos;un tiers sur les
                Livrables sans l&apos;accord du Prestataire
              </li>
              <li>
                Dommages indirects tels que perte de chiffre d&apos;affaires, perte de clientèle,
                perte de données
              </li>
              <li>Force majeure telle que définie à l&apos;article 13</li>
            </ul>
            <p>
              En tout état de cause, la responsabilité totale du Prestataire au titre d&apos;une
              prestation est limitée au montant effectivement perçu pour ladite prestation.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">
              11.3. Garantie de conformité
            </h3>
            <p>
              Le Prestataire garantit la conformité des Livrables au périmètre défini dans le devis.
              En cas de non-conformité constatée dans un délai de 30 jours suivant la livraison
              finale, le Prestataire s&apos;engage à corriger les éléments non conformes dans les
              meilleurs délais et sans frais supplémentaires.
            </p>
          </LegalSection>

          {/* Article 12 */}
          <LegalSection id="donnees-personnelles" title="Article 12 — Données personnelles">
            <p>
              Dans le cadre de l&apos;exécution des prestations, le Prestataire peut être amené à
              collecter et traiter des données personnelles du Client. Le traitement de ces données
              est effectué conformément au Règlement Général sur la Protection des Données (RGPD) et
              à la loi Informatique et Libertés.
            </p>
            <p>
              Pour plus d&apos;informations sur le traitement des données personnelles, le Client est
              invité à consulter la{" "}
              <a
                href="/politique-confidentialite"
                className="underline underline-offset-4 text-foreground/90 hover:text-accent-primary transition-colors duration-500 ease-in-out"
              >
                Politique de confidentialité
              </a>{" "}
              du Prestataire.
            </p>
          </LegalSection>

          {/* Article 13 */}
          <LegalSection id="force-majeure" title="Article 13 — Force majeure">
            <p>
              Aucune des parties ne pourra être tenue responsable de l&apos;inexécution ou du retard
              dans l&apos;exécution de ses obligations résultant d&apos;un cas de force majeure au
              sens de l&apos;article 1218 du Code civil.
            </p>
            <p>
              Sont notamment considérés comme cas de force majeure&nbsp;: les catastrophes
              naturelles, les pandémies, les guerres, les grèves générales, les pannes de réseau
              Internet ou d&apos;électricité, les défaillances d&apos;hébergeurs tiers.
            </p>
            <p>
              En cas de force majeure, l&apos;exécution des obligations est suspendue. Si le cas de
              force majeure perdure au-delà de 60 jours, chaque partie pourra résilier le contrat
              sans indemnité.
            </p>
          </LegalSection>

          {/* Article 14 */}
          <LegalSection id="droit-applicable" title="Article 14 — Droit applicable et litiges">
            <p>Les présentes CGV sont régies par le droit français.</p>
            <p>
              En cas de litige relatif à l&apos;interprétation ou à l&apos;exécution des présentes
              CGV, les parties s&apos;engagent à rechercher une solution amiable dans un délai de 30
              jours.
            </p>
            <p>À défaut de résolution amiable&nbsp;:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Client professionnel</strong>&nbsp;: le litige sera soumis aux tribunaux
                compétents du ressort du siège social du Prestataire.
              </li>
              <li>
                <strong>Client consommateur</strong>&nbsp;: conformément aux articles L611-1 et
                suivants du Code de la consommation, le Client peut recourir gratuitement au service
                de médiation de la consommation. Le médiateur compétent est [À COMPLÉTER]. Le Client
                peut également saisir la plateforme européenne de règlement en ligne des
                litiges&nbsp;:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 text-foreground/90 hover:text-accent-primary transition-colors duration-500 ease-in-out"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                .
              </li>
            </ul>
          </LegalSection>

          {/* Article 15 */}
          <LegalSection
            id="dispositions-generales"
            title="Article 15 — Dispositions générales"
          >
            <p>
              Si l&apos;une quelconque des stipulations des présentes CGV est déclarée nulle ou
              inapplicable, les autres stipulations restent en vigueur.
            </p>
            <p>
              Le fait pour le Prestataire de ne pas se prévaloir d&apos;une disposition des
              présentes CGV ne vaut pas renonciation à s&apos;en prévaloir ultérieurement.
            </p>
            <p>
              Les présentes CGV constituent l&apos;intégralité de l&apos;accord entre les parties,
              sous réserve des stipulations particulières figurant dans le devis.
            </p>
          </LegalSection>
        </LegalPageLayout>
      </main>
      <Footer />
    </>
  );
}
