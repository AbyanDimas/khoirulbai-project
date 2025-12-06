import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "202.65.116.9",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

