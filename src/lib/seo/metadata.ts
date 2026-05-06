import type { Metadata } from "next";

const SITE_URL = "https://aurentia.agency";
const DEFAULT_OG_IMAGE = "/images/opengraph/opengraph.png";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
};

export function pageMeta({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const alt = ogImageAlt ?? `Aurentia Agency — ${title.split(" — ")[0].split(" | ")[0]}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
