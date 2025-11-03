import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add valid Next.js config options here if needed
  output: 'export',
  images: { unoptimized: true },
  basePath: '/blog-website',
  assetPrefix: '/blog-website/',

};

export default nextConfig;
