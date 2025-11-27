// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Previene que tu web se cargue en iframes (clickjacking)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Previene sniffing de MIME type
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Controla info enviada en referrer
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Protección XSS en navegadores antiguos
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Bloquea permisos innecesarios
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains', // Fuerza HTTPS durante 1 año
          },
        ],
      },
    ];
  },
};

export default nextConfig;
