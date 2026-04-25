import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Aurentia Agency";

export function generateStaticParams() {
  return [];
}

export default function OpengraphImage() {
  notFound();
}
