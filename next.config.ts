import type { NextConfig } from "next";

// Site estático: `next build` gera a pasta `out/`, que a Cloudflare publica.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
