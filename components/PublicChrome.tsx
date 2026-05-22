"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CookieBanner from './CookieBanner';
import { WizardProvider } from './WizardWhatsApp';

/**
 * Renderiza el header, footer, banner de cookies y botón de WhatsApp
 * sólo en las páginas públicas. En /admin/* no se muestra nada de esto.
 */
export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  // Landings de captación de Google Ads: sin header, footer ni WhatsApp para
  // canalizar TODO el tráfico al formulario. Solo conservamos el banner de
  // cookies (necesario por el tracking de Ads).
  const isAds = pathname?.startsWith('/ads');

  if (isAdmin) {
    return <>{children}</>;
  }

  if (isAds) {
    return (
      <>
        {children}
        <CookieBanner />
      </>
    );
  }

  return (
    <WizardProvider>
      <Header />
      {children}
      <CookieBanner />
      <WhatsAppButton />
      <Footer />
    </WizardProvider>
  );
}
