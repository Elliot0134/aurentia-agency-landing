import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";

const nextConfig: NextConfig = {
  // sharp (recadrage des captures dans run-flash) doit rester un package externe :
  // sinon il est bundlé dans la fonction du step WDK (/.well-known/workflow/v1/step)
  // sans ses binaires natifs libvips → ERR_DLOPEN_FAILED sur le runtime Vercel, et
  // AUCUN step ne démarre (loadJob bloque, le Flash n'est jamais généré). Externaliser
  // embarque les .node/.so avec la fonction. Voir .npmrc (binaires linux-x64 glibc).
  serverExternalPackages: ["sharp"],
  // Sur linux, sharp charge libvips par dlopen("libvips-cpp.so...") à l'exécution :
  // l'analyse statique (nft) ne voit pas ce require dynamique et n'inclut PAS le .so
  // dans la fonction de la route step WDK -> ERR_DLOPEN_FAILED. On force l'inclusion
  // des binaires linux pour cette route (le binding @img/sharp-linux-x64 est, lui,
  // tracé normalement, mais on l'ajoute par sécurité).
  outputFileTracingIncludes: {
    "/.well-known/workflow/v1/step": [
      "./node_modules/@img/sharp-libvips-linux-x64/**",
      "./node_modules/@img/sharp-linux-x64/**",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      { source: "/conciergeries", destination: "/sites-vitrines/conciergerie", permanent: true },
      { source: "/agence", destination: "/a-propos", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

// withWorkflow (WDK) : active la transformation des directives "use workflow" /
// "use step" (cf. node_modules/workflow/docs/getting-started/next.mdx).
export default withWorkflow(nextConfig);
