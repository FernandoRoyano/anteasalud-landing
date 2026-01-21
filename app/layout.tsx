import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata = {
  title: 'ANTEA Salud - Ejercicio y Fisioterapia a Domicilio para Mayores',
  description: 'Ejercicio funcional y fisioterapia profesional en tu casa. Recupera movilidad, autonomía y confianza. +200 familias confían en nosotros. Valoración gratuita.',
  keywords: 'fisioterapia domicilio, ejercicio mayores, rehabilitación en casa, fisioterapeuta, fisioterapia a domicilio Madrid, ejercicio terapéutico mayores, rehabilitación domiciliaria',
  authors: [{ name: 'ANTEA Salud' }],
  metadataBase: new URL('https://www.anteasalud.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.anteasalud.com',
    siteName: 'ANTEA Salud',
    title: 'ANTEA Salud - Ejercicio y Fisioterapia a Domicilio para Mayores',
    description: 'Ejercicio funcional y fisioterapia profesional en tu casa. Recupera movilidad, autonomía y confianza. +200 familias confían en nosotros.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ANTEA Salud - Fisioterapia a Domicilio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ANTEA Salud - Ejercicio y Fisioterapia a Domicilio',
    description: 'Ejercicio funcional y fisioterapia profesional en tu casa. +200 familias confían en nosotros.',
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
};

// JSON-LD Schema para SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.anteasalud.com',
  name: 'ANTEA Salud',
  description: 'Servicio de ejercicio funcional y fisioterapia a domicilio para personas mayores. Profesionales titulados y colegiados.',
  url: 'https://www.anteasalud.com',
  telephone: '+34633261963',
  email: 'info@anteasalud.com',
  priceRange: '€€',
  image: 'https://www.anteasalud.com/og-image.jpg',
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
    name: 'Servicios de Fisioterapia a Domicilio',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ejercicio Funcional',
          description: 'Entrenamiento adaptado para mejorar movilidad y autonomía',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fisioterapia Geriátrica',
          description: 'Rehabilitación especializada para personas mayores',
        },
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
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
        <Header />
        {children}
        <CookieBanner/>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
