import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Guía gratis: 10 ejercicios para prevenir caídas en mayores',
  description:
    '10 ejercicios de fuerza y equilibrio para prevenir caídas en personas mayores, paso a paso, con test de riesgo y rutina semanal. Guía gratuita.',
  path: '/guia-prevencion-caidas',
});

export default function GuiaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
