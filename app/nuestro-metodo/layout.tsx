import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Página no disponible | ANTEA Salud',
  robots: { index: false, follow: false },
};

export default function NuestroMetodoLayout() {
  notFound();
}
