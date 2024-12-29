import { NextConfig } from "next";

const nextConfig : NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;