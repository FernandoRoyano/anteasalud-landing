'use client';

import Script from 'next/script';

// IMPORTANTE: Reemplaza este ID con tu ID de Google Analytics GA4
// Formato: G-XXXXXXXXXX
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export default function GoogleAnalytics() {
  // No renderizar si no hay ID configurado
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Función helper para trackear eventos de conversión
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', eventName, eventParams);
  }
}

// Eventos predefinidos para ANTEA
export const AnteaEvents = {
  // Contacto
  clickWhatsApp: () => trackEvent('click_whatsapp', { method: 'floating_button' }),
  clickPhone: () => trackEvent('click_phone', { method: 'header' }),
  submitContactForm: () => trackEvent('generate_lead', { method: 'contact_form' }),

  // Navegación
  clickCTA: (location: string) => trackEvent('click_cta', { location }),
  viewPricing: () => trackEvent('view_pricing'),

  // Engagement
  scrollToSection: (section: string) => trackEvent('scroll_to_section', { section }),
  expandFAQ: (question: string) => trackEvent('expand_faq', { question }),
};
