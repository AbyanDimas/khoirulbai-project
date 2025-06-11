import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'honest-bird-099a257597.media.strapiapp.com',
      'honest-bird-099a257597.strapiapp.com'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
