import './globals.css';
import { Inter, Bricolage_Grotesque } from 'next/font/google';
import PublicChrome from '@/components/PublicChrome';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter-var',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage-var',
  display: 'swap',
});

export const metadata = {
  title: 'Ejercicio para Mayores a Domicilio en Madrid | ANTEA Salud',
  description: 'Entrenamiento funcional y ejercicio terapéutico a domicilio para personas mayores en Madrid. Recupera autonomía, fuerza y confianza en casa. Graduado en Ciencias del Deporte con 14 años de experiencia. Valoración gratuita.',
  keywords: 'ejercicio para mayores Madrid, entrenamiento personal mayores a domicilio, ejercicio terapéutico personas mayores, prevención caídas mayores Madrid, readaptación funcional domicilio, entrenador personas mayores Madrid, ejercicio post operación cadera, recuperar autonomía mayores, entrenamiento funcional mayores Madrid, ejercicio adaptado tercera edad Madrid',
  authors: [{ name: 'ANTEA Salud' }],
  metadataBase: new URL('https://anteasalud.com'),
  alternates: {
    canonical: 'https://anteasalud.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://anteasalud.com',
    siteName: 'ANTEA Salud',
    title: 'Ejercicio para Mayores a Domicilio en Madrid | ANTEA Salud',
    description: 'Entrenamiento funcional para personas mayores en tu casa. Recupera autonomía y confianza. +200 familias en Madrid confían en nosotros.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ANTEA Salud - Ejercicio para Mayores a Domicilio en Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ejercicio para Mayores a Domicilio en Madrid | ANTEA Salud',
    description: 'Entrenamiento funcional para personas mayores en tu casa. +200 familias en Madrid confían en nosotros.',
    images: ['/og-image.jpg'],
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

// JSON-LD Schema para SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HealthAndBeautyBusiness', 'SportsActivityLocation'],
  '@id': 'https://anteasalud.com',
  name: 'ANTEA Salud',
  description: 'Entrenamiento funcional y ejercicio terapéutico a domicilio para personas mayores en Madrid. Graduado en Ciencias de la Actividad Física y el Deporte con 14 años de experiencia especializado en la recuperación de autonomía, prevención de caídas y readaptación funcional.',
  url: 'https://anteasalud.com',
  telephone: '+34633261963',
  email: 'info@anteasalud.com',
  priceRange: '€€',
  image: 'https://anteasalud.com/og-image.jpg',
  founder: {
    '@type': 'Person',
    name: 'Fernando Royano',
    jobTitle: 'Graduado en Ciencias de la Actividad Física y el Deporte (CCAFYD)',
    description: 'Entrenador titulado con 14 años de experiencia especializado en ejercicio funcional para personas mayores, readaptación y prevención de caídas.',
  },
  knowsAbout: [
    'Ejercicio para personas mayores',
    'Entrenamiento funcional',
    'Prevención de caídas',
    'Readaptación funcional',
    'Ejercicio terapéutico',
    'Recuperación de autonomía',
    'Ejercicio adaptado post-operación',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madrid',
    addressRegion: 'Comunidad de Madrid',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.4168,
    longitude: -3.7038,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '19:00',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '200',
    bestRating: '5',
  },
  sameAs: [
    'https://www.facebook.com/anteasalud',
    'https://www.instagram.com/anteasalud',
  ],
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Comunidad de Madrid',
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 40.4168,
      longitude: -3.7038,
    },
    geoRadius: '50000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Ejercicio y Readaptación para Mayores',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Entrenamiento Funcional a Domicilio',
          description: 'Ejercicio adaptado para mejorar fuerza, equilibrio y movilidad en personas mayores. Sesiones supervisadas en tu casa por entrenador titulado.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Prevención de Caídas',
          description: 'Evaluación del riesgo de caídas y ejercicios específicos para mejorar equilibrio y confianza en personas mayores.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Readaptación Funcional Post-Operación',
          description: 'Ejercicio adaptado en la fase de vuelta a la actividad tras cirugía de cadera, rodilla u otras intervenciones. Coordinación con tu fisioterapeuta médico.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Recuperación de Autonomía',
          description: 'Programa de ejercicio personalizado para recuperar la capacidad funcional y la independencia en personas mayores.',
        },
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${bricolage.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
