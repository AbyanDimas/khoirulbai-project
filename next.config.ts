import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
