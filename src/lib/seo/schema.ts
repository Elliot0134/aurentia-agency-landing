import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { secteurs } from "@/data/realisations/secteurs";

const BASE_URL = "https://aurentia.agency";

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aurentia Agency",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: ["https://www.linkedin.com/company/aurentia-agency"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Avignon",
    addressCountry: "FR",
  },
};

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

const BASE_URL_CONST = "https://aurentia.agency";

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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Avignon",
      addressRegion: "Vaucluse",
      addressCountry: "FR",
    },
    areaServed: ["France", "PACA", "Vaucluse", "Avignon"].map((a) => ({ "@type": "Place", name: a })),
    priceRange: "€€€",
    sameAs: ORGANIZATION.sameAs,
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
