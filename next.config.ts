import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enables static export
  basePath: '/valentine', // Replace with your repo name
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  typescript: {
    // Disable TypeScript errors during the build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
