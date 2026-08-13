import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://46.225.103.236:8001/api/:path*',
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
