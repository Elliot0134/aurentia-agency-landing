import { ImageResponse } from "next/og";
import { getAllProjectFrontmatter } from "@/data/realisations";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Aurentia Agency — Nos réalisations";

export default function OpengraphImage() {
  const count = getAllProjectFrontmatter().length;

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
          Aurentia Agency
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 140,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: -4,
            }}
          >
            Nos réalisations
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#e7e5e1",
              opacity: 0.85,
            }}
          >
            {count} projets livrés — sites, SaaS, identités
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
          <div style={{ display: "flex" }}>aurentia-agency.fr</div>
          <div style={{ display: "flex" }}>Avignon — Paris</div>
        </div>
      </div>
    ),
    size,
  );
}
