import { MetadataRoute } from 'next';

const baseUrl = 'https://anteasalud.com';

// URLs públicas del sitio (sin admin, sin API, sin legales de footer).
// Google ignora priority y changeFrequency desde 2023 — solo lastModified aporta señal.
const routes = [
  '',
  '/ejercicio-personas-mayores-madrid',
  '/prevencion-caidas-mayores-madrid',
  '/recuperar-autonomia-mayores-madrid',
  '/ejercicio-mayores-madrid-capital',
  '/ejercicio-mayores-mostoles',
  '/ejercicio-mayores-getafe',
  '/guia-prevencion-caidas',
  '/nuestro-metodo',
  '/privacidad',
  '/aviso-legal',
  '/cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}
