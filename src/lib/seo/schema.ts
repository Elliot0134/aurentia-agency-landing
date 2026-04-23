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
    url: `${BASE_URL}/v2/realisations/${p.slug}`,
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
