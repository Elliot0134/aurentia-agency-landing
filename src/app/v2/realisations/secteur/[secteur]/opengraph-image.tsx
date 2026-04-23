import { ImageResponse } from "next/og";
import { getProjectsBySecteur } from "@/data/realisations";
import { secteurList, getSecteur } from "@/data/realisations/secteurs";
import type { Secteur } from "@/data/realisations/schemas";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Aurentia Agency — Cas clients par secteur";

export function generateStaticParams() {
  return secteurList.map((s) => ({ secteur: s.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ secteur: string }>;
}) {
  const { secteur } = await params;
  const meta = getSecteur(secteur);
  const count = meta ? getProjectsBySecteur(meta.slug as Secteur).length : 0;

  const title = meta?.heroTitle ?? "Cas clients";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b0b0a 0%, #14130f 60%, #1c1a14 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e7e5e1",
            opacity: 0.8,
          }}
        >
          Aurentia Agency — Cas clients
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -3,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#e7e5e1",
              opacity: 0.8,
            }}
          >
            {count} {count > 1 ? "projets livrés" : "projet livré"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#e7e5e1",
            opacity: 0.6,
          }}
        >
          <div style={{ display: "flex" }}>
            aurentia-agency.fr/realisations
          </div>
          <div style={{ display: "flex" }}>Avignon — Paris</div>
        </div>
      </div>
    ),
    size,
  );
}
