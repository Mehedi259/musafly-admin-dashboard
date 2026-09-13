import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '46.225.103.236',
      },
      {
        protocol: 'https',
        hostname: 'admin.musafly.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://46.225.103.236:8001/api/:path*/',
      },
    ]
  },
};

export default nextConfig;
