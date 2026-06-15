import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Audit de site web — Aurentia Agency";

const INK = "#17140e";
const CORAL = "#c96442";
const MUTED = "#5c5a50";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(900px 500px at 85% -10%, rgba(201,100,66,0.16), transparent 60%), linear-gradient(135deg, #faf9f6 0%, #f3f0e8 100%)",
          color: INK,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top — brand + badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontWeight: 700,
              color: CORAL,
            }}
          >
            Audit de site web · Aurentia Agency
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 22,
              fontWeight: 600,
              color: CORAL,
              border: `1px solid rgba(201,100,66,0.4)`,
              borderRadius: 999,
              padding: "8px 20px",
            }}
          >
            7 domaines analysés
          </div>
        </div>

        {/* Center — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 86,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            <span style={{ display: "flex" }}>Votre site est-il visible</span>
            <span style={{ display: "flex" }}>
              sur Google&nbsp;<span style={{ color: CORAL }}>et sur ChatGPT&nbsp;?</span>
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 34, color: MUTED, maxWidth: 980 }}>
            SEO, performance, UX, accessibilité &amp; visibilité IA — on chiffre ce que ça vous coûte.
          </div>
        </div>

        {/* Bottom — offer + url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                display: "flex",
                background: CORAL,
                color: "#faf9f6",
                fontWeight: 700,
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              Pré-audit gratuit
            </span>
            <span style={{ display: "flex" }}>puis audit complet à 99 € HT</span>
          </div>
          <div style={{ display: "flex", fontWeight: 600 }}>aurentia.agency/audit</div>
        </div>
      </div>
    ),
    size,
  );
}
