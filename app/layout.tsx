import './globals.css';
import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque } from 'next/font/google';
import PublicChrome from '@/components/PublicChrome';
import { JsonLd } from '@/components/JsonLd';
import {
  DEFAULT_OG_IMAGE,
  ORGANIZATION_ID,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-var',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-var',
  display: 'swap',
});

const DEFAULT_TITLE = 'Ejercicio para mayores a domicilio en Madrid | ANTEA Salud';
const DEFAULT_DESCRIPTION =
  'Entrenamiento de fuerza y equilibrio a domicilio para personas mayores en Madrid. Graduado en CCAFYD. Valoración gratuita en casa.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Fernando Royano', url: `${SITE_URL}/sobre-fernando` }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Fernando Royano entrenando con un hombre mayor en su casa' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

// Grafo JSON-LD global: negocio de área de servicio + web + autor (E-E-A-T)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      description:
        'Entrenamiento funcional y ejercicio adaptado a domicilio para personas mayores en Madrid: fuerza, equilibrio, prevención de caídas y recuperación de autonomía.',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      telephone: '+34633261963',
      email: 'anteasalud@gmail.com',
      priceRange: '€€',
      founder: { '@id': PERSON_ID },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Madrid',
        addressRegion: 'Comunidad de Madrid',
        addressCountry: 'ES',
      },
      areaServed: [
        { '@type': 'City', name: 'Madrid' },
        { '@type': 'City', name: 'Getafe' },
        { '@type': 'City', name: 'Móstoles' },
        { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      knowsAbout: [
        'Ejercicio para personas mayores',
        'Entrenamiento de fuerza en personas mayores',
        'Prevención de caídas',
        'Fragilidad y sarcopenia',
        'Readaptación funcional',
        'Valoración funcional (SPPB)',
      ],
      sameAs: [
        'https://www.facebook.com/anteasalud',
        'https://www.instagram.com/anteasalud',
        'https://www.linkedin.com/company/anteasalud',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de ejercicio para personas mayores',
        itemListElement: [
          { name: 'Entrenamiento funcional a domicilio', url: `${SITE_URL}/ejercicio-personas-mayores-madrid` },
          { name: 'Prevención de caídas', url: `${SITE_URL}/prevencion-caidas-mayores-madrid` },
          { name: 'Recuperación de autonomía', url: `${SITE_URL}/recuperar-autonomia-mayores-madrid` },
          { name: 'Valoración funcional gratuita', url: `${SITE_URL}/valoracion-gratuita` },
        ].map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.name, url: service.url, provider: { '@id': ORGANIZATION_ID } },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'es-ES',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Fernando Royano',
      url: `${SITE_URL}/sobre-fernando`,
      jobTitle: 'Entrenador especializado en personas mayores',
      worksFor: { '@id': ORGANIZATION_ID },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Grado en Ciencias de la Actividad Física y del Deporte (CCAFYD)',
      },
      knowsAbout: ['Ejercicio para personas mayores', 'Prevención de caídas', 'Entrenamiento de fuerza', 'Readaptación funcional'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${bricolage.variable}`}>
      <head>
        <JsonLd data={jsonLd} />
      </head>
      <body className="font-sans antialiased">
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
