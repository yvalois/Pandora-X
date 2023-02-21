/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache');
require('dotenv').config();

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});

module.exports = withPWA({
  reactStrictMode: false,
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
      {
        protocol: 'ipfs',
        hostname: '**',
      },
    ],
    domains: ['ipfs.io/ipfs'],
  },
  env: {
    NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
  },
  sass: true,
  modules: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
});
