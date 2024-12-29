import { NextConfig } from "next";

const nextConfig : NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: 'asset/resource',
    });
    return config;
  },
  images: {
    domains: ['static.wikia.nocookie.net'],
    // Or if you prefer using remotePatterns (Next.js 13+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;