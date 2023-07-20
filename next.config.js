/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    domains: ['localhost', 'storage.googleapis.com'],
  },
};

module.exports = nextConfig;
