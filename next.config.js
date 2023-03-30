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
    domains: [
      'ipfs.io',
      'gateway.pinata.cloud',
      'lime-geographical-angelfish-53.mypinata.cloud',
      'pandorax_getaway.mypinata.cloud',
    ],
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
