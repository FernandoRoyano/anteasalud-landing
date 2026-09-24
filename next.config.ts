import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// Google tag (Ads + GA4) y Vercel Live (previews). 'unsafe-inline' es necesario sin nonces en App Router estático.
const GOOGLE = [
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://www.googleadservices.com',
  'https://googleads.g.doubleclick.net',
  'https://*.doubleclick.net',
  'https://www.google.com',
  'https://www.google.es',
].join(' ');

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} ${GOOGLE} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${GOOGLE} https://vercel.live wss://ws-us3.pusher.com`,
  `frame-src ${GOOGLE} https://vercel.live`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
          },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/api/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

export default nextConfig;
