/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://202.65.116.9:1337/api/:path*",
      },
    ];
  },

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

module.exports = nextConfig;

