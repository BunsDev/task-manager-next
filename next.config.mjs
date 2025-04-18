/** @type {import('next').NextConfig} */
export default {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  typescript: {
    // !! WARN !!
    // Temporarily disable TypeScript checks during build
    // Remove this once you've fixed the type issues
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Handle node: protocol imports
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:fs/promises': 'browserify-fs',
        'node:child_process': false,
        'node:fs': 'browserify-fs',
        'node:os': 'os-browserify/browser',
        'node:module': false,
        'node:path': 'path-browserify',
        'node:url': 'url',
        'node:util': 'util',
        'node:crypto': 'crypto-browserify',
        'node:stream': 'stream-browserify',
        'node:zlib': 'browserify-zlib',
      };
    }
    
    return config;
  },
  serverExternalPackages: [
    '@prisma/client',
    '.prisma/client'
  ]
};
