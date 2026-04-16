import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anteasalud.com';
  const now = new Date();

  return [
    // Home
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Landing pages de servicios
    {
      url: `${baseUrl}/ejercicio-personas-mayores-madrid`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prevencion-caidas-mayores-madrid`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recuperar-autonomia-mayores-madrid`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Landing pages por zona
    {
      url: `${baseUrl}/ejercicio-mayores-madrid-capital`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ejercicio-mayores-mostoles`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ejercicio-mayores-getafe`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Lead magnet (guía gratuita)
    {
      url: `${baseUrl}/guia-prevencion-caidas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Vídeo VSL / Nuestro método
    {
      url: `${baseUrl}/nuestro-metodo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Páginas legales
    {
      url: `${baseUrl}/privacidad`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
