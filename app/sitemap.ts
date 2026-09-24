import type { MetadataRoute } from 'next';
import { getPublishedArticles } from '@/lib/sheets';
import { SITE_URL } from '@/lib/seo';

// Se regenera cada hora para incluir artículos publicados desde el admin sin redeploy
export const revalidate = 3600;

// Fecha de la última revisión real del contenido de cada página (actualizar al editarla)
const CONTENT_UPDATED = '2026-09-24';

const staticRoutes: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }> = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/ejercicio-personas-mayores-madrid', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/prevencion-caidas-mayores-madrid', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/recuperar-autonomia-mayores-madrid', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ejercicio-mayores-madrid-capital', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ejercicio-mayores-mostoles', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ejercicio-mayores-getafe', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/valoracion-gratuita', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/guia-prevencion-caidas', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/articulos', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/sobre-fernando', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/privacidad', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/aviso-legal', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency,
    priority,
  }));

  // Si Sheets falla, no rompemos el sitemap
  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const articles = await getPublishedArticles();
    articleEntries = articles.map((a) => ({
      url: `${SITE_URL}/articulos/${a.slug}`,
      lastModified: a.updatedAt || a.publishedAt || CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
      ...(a.ogImage ? { images: [`${SITE_URL}${a.ogImage}`] } : {}),
    }));
  } catch (error) {
    console.error('[sitemap] Error leyendo artículos:', error);
  }

  return [...staticEntries, ...articleEntries];
}
