import { ImageResponse } from "next/og";
import { getAllProjectFrontmatter, getProjectBySlug } from "@/data/realisations";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Aurentia Agency — Cas client";

export function generateStaticParams() {
  return getAllProjectFrontmatter().map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const name = project?.frontmatter.name ?? "Projet";
  const type = project?.frontmatter.type ?? "";
  const year = project?.frontmatter.year ?? "";
  const firstMetric = project?.frontmatter.metrics?.[0];

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
          Aurentia Agency — Cas client
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
              fontSize: 110,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: -3,
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#e7e5e1",
              opacity: 0.75,
            }}
          >
            {[type, year].filter(Boolean).join(" · ")}
          </div>
          {firstMetric ? (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 20,
                marginTop: 12,
                padding: "18px 28px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 16,
                fontSize: 40,
                color: "#ffffff",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 56 }}>
                {firstMetric.value}
              </span>
              <span style={{ color: "#e7e5e1", opacity: 0.85 }}>
                — {firstMetric.label}
              </span>
            </div>
          ) : null}
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
          <div style={{ display: "flex" }}>aurentia-agency.fr/realisations</div>
          <div style={{ display: "flex" }}>Avignon — Paris</div>
        </div>
      </div>
    ),
    size,
  );
}
