import { MetadataRoute } from 'next';
import { getPublishedArticles } from '@/lib/sheets';

const baseUrl = 'https://anteasalud.com';

// Rutas estáticas del sitio (sin admin, sin API).
const staticRoutes = [
  '',
  '/ejercicio-personas-mayores-madrid',
  '/prevencion-caidas-mayores-madrid',
  '/recuperar-autonomia-mayores-madrid',
  '/ejercicio-mayores-madrid-capital',
  '/ejercicio-mayores-mostoles',
  '/ejercicio-mayores-getafe',
  '/guia-prevencion-caidas',
  '/nuestro-metodo',
  '/articulos',
  '/privacidad',
  '/aviso-legal',
  '/cookies',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));

  // Artículos publicados — si Sheets falla, no rompemos el sitemap
  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const articles = await getPublishedArticles();
    articleEntries = articles.map((a) => ({
      url: `${baseUrl}/articulos/${a.slug}`,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : now,
    }));
  } catch (error) {
    console.error('[sitemap] Error leyendo artículos:', error);
  }

  return [...staticEntries, ...articleEntries];
}
