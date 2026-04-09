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

  if (isAdmin) {
    return <>{children}</>;
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
