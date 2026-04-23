import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/conciergeries",
        destination: "/sites-vitrines/conciergerie",
        permanent: true,
      },
      {
        source: "/realisations",
        destination: "/v2/realisations",
        permanent: true,
      },
      {
        source: "/realisations/:slug",
        destination: "/v2/realisations/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
