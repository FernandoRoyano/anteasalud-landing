import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export const metadata = {
  title: 'ANTEASalud - Ejercicio y Fisioterapia a Domicilio para Mayores',
  description: 'Ejercicio funcional y fisioterapia profesional en tu casa. Recupera movilidad, autonomía y confianza. +200 familias confían en nosotros. Valoración gratuita.',
  keywords: 'fisioterapia domicilio, ejercicio mayores, rehabilitación en casa, fisioterapeuta',
  authors: [{ name: 'ANTEASalud' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://anteasalud.com',
    siteName: 'ANTEA Salud',
    title: 'Antea Salud - Ejercicio y Fisioterapia a Domicilio',
    description: 'Ejercicio funcional y fisioterapia profesional en tu casa.',
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
      </head>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
