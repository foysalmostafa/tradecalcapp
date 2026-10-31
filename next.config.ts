import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',       // generates the static `out/` folder on build
  images: {
    unoptimized: true,    // required for static export (no image server)
  },
};

export default nextConfig;
