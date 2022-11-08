/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache');
require('dotenv').config();

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});

module.exports = withPWA({
  reactStrictMode: true,
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    BACKEND_API: process.env.BACKEND_API,
  },
  sass: true,
  modules: true,
});
