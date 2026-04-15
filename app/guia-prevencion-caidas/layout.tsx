import type { Metadata } from 'next';

const TITLE = '10 ejercicios para prevenir caídas en personas mayores (Guía gratis) | ANTEA Salud';
const DESCRIPTION =
  'Descarga gratis nuestra guía práctica con 10 ejercicios para prevenir caídas en personas mayores. Explicados paso a paso por un Graduado en Ciencias del Deporte con 14 años de experiencia. Incluye test de riesgo y rutina semanal.';
const URL = 'https://anteasalud.com/guia-prevencion-caidas';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'ejercicios prevenir caídas mayores, guía prevención caídas, ejercicios equilibrio personas mayores, descargar guía ejercicios mayores, test riesgo caídas, rutina ejercicios mayores en casa',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
};

export default function GuiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
