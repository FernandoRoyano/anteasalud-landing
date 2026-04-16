import type { Metadata } from 'next';

const TITLE = 'Nuestro método · Cómo trabajo con personas mayores | ANTEA Salud';
const DESCRIPTION =
  'Vídeo de 7 minutos explicando cómo funciona ANTEA Salud: qué hago, qué no hago, precios claros y casos reales. Entrenador titulado, 14 años de experiencia con personas mayores en Madrid. Primera valoración gratuita.';
const URL = 'https://anteasalud.com/nuestro-metodo';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'ejercicio mayores método, entrenador personal mayores Madrid, cómo es una sesión ejercicio domicilio, precio ejercicio personas mayores, entrenamiento funcional mayores',
  alternates: { canonical: URL },
  openGraph: {
    type: 'video.other',
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
};

export default function NuestroMetodoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
