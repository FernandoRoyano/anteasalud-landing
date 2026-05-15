'use client';

import Script from 'next/script';

const GOOGLE_ADS_ID = 'AW-954833079';
const CONVERSION_LABEL = 'Bsr-CO6n2K0cELexpscD';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLeadConversion() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}`,
      value: 1.0,
      currency: 'EUR',
    });
  }
}

export default function GoogleAds() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
