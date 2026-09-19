export type { Config } from 'next';

declare const globalThis: unknown & {
  __nextJSConfig?: typeof import('next').NextConfig;
};

const nextConfig = {
  output: {
    assetPrefix: process.env.BASE_URL || '/',
  },
  images: {
    domains: ['www.owncloud.org'],
  },
  experimental: {
    serverActions: true,
    externalDir: false,
  },
};

// Write to globalThis to be picked up by `withNextConfig` HOC
if (typeof window === 'undefined') {
  globalThis.__nextJSConfig = nextConfig;
}

export default withNextConfig(nextConfig);
