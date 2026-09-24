"use client";

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import WhatsAppButton from './WhatsAppButton';
import CookieBanner from './CookieBanner';
import GoogleTag from './GoogleTag';
import { WizardProvider } from './WizardWhatsApp';

function SkipLink() {
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[#17372b] focus:px-5 focus:py-3 focus:text-lg focus:font-bold focus:text-white"
    >
      Saltar al contenido
    </a>
  );
}

/**
 * Renderiza el header, footer, banner de cookies y botón de WhatsApp
 * sólo en las páginas públicas. En /admin/* no se muestra nada de esto.
 * El footer llega como prop para seguir siendo Server Component.
 */
export default function PublicChrome({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  // Landings de captación de Google Ads: sin header, footer ni WhatsApp para
  // canalizar todo el tráfico al formulario.
  if (pathname?.startsWith('/ads')) {
    return (
      <>
        <GoogleTag />
        <SkipLink />
        <main id="contenido" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <CookieBanner />
      </>
    );
  }

  return (
    <WizardProvider>
      <GoogleTag />
      <SkipLink />
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <CookieBanner />
      <WhatsAppButton />
      {footer}
    </WizardProvider>
  );
}
