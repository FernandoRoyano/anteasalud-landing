import type { Metadata } from 'next';

export const SITE_URL = 'https://anteasalud.com';
export const SITE_NAME = 'ANTEA Salud';
export const DEFAULT_OG_IMAGE = '/og-default.jpg';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#fernando`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

interface BuildMetadataInput {
  /** Sin sufijo de marca: la plantilla del layout añade « | ANTEA Salud» */
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** true para títulos que ya incluyen la marca (home) */
  absoluteTitle?: boolean;
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Metadata completa por página: canonical propio, Open Graph y Twitter coherentes */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex,
  absoluteTitle,
}: BuildMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const url = absoluteUrl(path);
  const images = [{ url: image, alt: imageAlt ?? title }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: 'es_ES',
      images,
      ...(type === 'article' ? { publishedTime, modifiedTime, authors: [`${SITE_URL}/sobre-fernando`] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** next/image no tiene remotePatterns: solo aceptamos imágenes servidas desde /public */
export function isLocalImagePath(src: string | undefined): src is string {
  return !!src && /^\/[\w\-./]+\.(webp|png|jpe?g|avif)$/i.test(src) && !src.includes('..');
}

/** JSON.stringify no escapa «</script>»: lo hacemos para evitar XSS con contenido de Sheets */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
