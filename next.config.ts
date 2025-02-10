import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  typescript: {
    // Disable TypeScript errors during the build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
