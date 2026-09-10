import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  allowedDevOrigins: ['*.dev.coze.site'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;