import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  typescript: {
    // ignoreBuildErrors: true, // jangan aktifkan di production
  },

  // ✅ PROXY HTTPS → HTTP (SOLUSI MIXED CONTENT)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://202.65.116.9:1337/api/:path*",
      },
    ];
  },

  // ✅ IZINKAN GAMBAR DARI STRAPI IP KAMU
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "202.65.116.9",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;
