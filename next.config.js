/** @type {import('next').NextConfig} */
const withCSS = require('@zeit/next-css');

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
});

module.exports = withCSS({ cssModules: true });
module.exports = nextConfig;
