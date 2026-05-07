import type { Metadata } from "next";
import { LowPolyPlayground } from "@/components/low-poly/LowPolyPlayground";

export const metadata: Metadata = {
  title: "Low-Poly Playground — Aurentia Agency",
  description: "Exploration visuelle facettée pour cartes et containers.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LowPolyPlayground />;
}
