import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { secteurs } from "@/data/realisations/secteurs";

const BASE_URL = "https://www.aurentia.agency";

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Aurentia Agency",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
  },
  description:
    "Agence web & IA basée à Avignon. Sites sur-mesure, SaaS, automatisations et solutions IA pour entreprises. Livraison rapide, équipe senior.",
  email: "contact@aurentia.agency",
  sameAs: ["https://www.linkedin.com/company/aurentia-agency"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Avignon",
    addressRegion: "Vaucluse",
    addressCountry: "FR",
  },
};

/**
 * Person schema pour les membres de l'équipe (signal E-E-A-T fort).
 * Chaque Person est rattachée à l'Organization via worksFor / @id.
 */
export function personSchema(
  members: { name: string; role: string; image?: string; linkedin?: string }[],
) {
  return members.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    ...(m.image ? { image: `${BASE_URL}${m.image}` } : {}),
    ...(m.linkedin ? { url: m.linkedin, sameAs: [m.linkedin] } : {}),
    worksFor: { "@id": `${BASE_URL}/#organization` },
  }));
}

export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BASE_URL}${it.url}`,
    })),
  };
}

export function creativeWorkForProject(p: ProjectFrontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    datePublished: `${p.year}-01-01`,
    creator: ORGANIZATION,
    url: `${BASE_URL}/realisations/${p.slug}`,
    image: `${BASE_URL}${p.coverImage}`,
    keywords: [...p.tags, ...p.technos, p.type, secteurs[p.secteur].label].join(", "),
    ...(p.testimonial && {
      review: {
        "@type": "Review",
        reviewBody: p.testimonial.quote,
        author: { "@type": "Person", name: p.testimonial.author },
      },
    }),
  };
}

export function collectionPage(
  name: string,
  description: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    hasPart: items.map((it) => ({
      "@type": "CreativeWork",
      name: it.name,
      url: `${BASE_URL}${it.url}`,
    })),
  };
}

const BASE_URL_CONST = "https://www.aurentia.agency";

export function serviceSchema({
  name,
  description,
  url,
  areaServed = ["Avignon", "Vaucluse", "PACA", "France"],
}: {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: ORGANIZATION,
    url: `${BASE_URL_CONST}${url}`,
    areaServed: areaServed.map((a) => ({ "@type": "Place", name: a })),
  };
}

export function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL_CONST}/#localbusiness`,
    name: "Aurentia Agency",
    url: BASE_URL_CONST,
    image: `${BASE_URL_CONST}/images/opengraph/opengraph.png`,
    email: "contact@aurentia.agency",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Avignon",
      addressRegion: "Vaucluse",
      addressCountry: "FR",
    },
    areaServed: ["France", "PACA", "Vaucluse", "Avignon"].map((a) => ({ "@type": "Place", name: a })),
    priceRange: "€€€",
    openingHours: "Mo-Su 00:00-24:00",
    sameAs: ORGANIZATION.sameAs,
    parentOrganization: { "@id": `${BASE_URL_CONST}/#organization` },
  };
}

export function faqPage(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}
