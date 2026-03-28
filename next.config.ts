import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/conciergeries",
        destination: "/sites-vitrines/conciergerie",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
