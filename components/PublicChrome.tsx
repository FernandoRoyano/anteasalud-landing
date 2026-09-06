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
  const refreshedLandings = new Set([
    '/ejercicio-personas-mayores-madrid',
    '/prevencion-caidas-mayores-madrid',
    '/recuperar-autonomia-mayores-madrid',
    '/ejercicio-mayores-madrid-capital',
    '/ejercicio-mayores-mostoles',
    '/ejercicio-mayores-getafe',
    '/valoracion-gratuita',
    '/guia-prevencion-caidas',
  ]);
  const isRefreshedLanding = isAds || refreshedLandings.has(pathname ?? '');

  if (isAdmin) {
    return <>{children}</>;
  }

  if (isAds) {
    return (
      <>
        <div className="landing-refresh">{children}</div>
        <CookieBanner />
      </>
    );
  }

  return (
    <WizardProvider>
      <Header />
      {isRefreshedLanding ? <div className="landing-refresh">{children}</div> : children}
      <CookieBanner />
      <WhatsAppButton />
      <Footer />
    </WizardProvider>
  );
}
