import { notFound } from "next/navigation";

export const metadata = {
  robots: { index: false, follow: false },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export default function CaseStudyPage() {
  notFound();
}
