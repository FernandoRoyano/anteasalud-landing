"use client";

import Script from "next/script";
import { CONSENT_KEY } from "@/lib/consent";

const GOOGLE_ADS_ID = "AW-954833079";
const CONVERSION_LABEL = "Bsr-CO6n2K0cELexpscD";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function trackLeadConversion() {
  window.gtag?.("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}`,
    value: 1.0,
    currency: "EUR",
  });
  if (GA_ID) window.gtag?.("event", "generate_lead");
}

/**
 * Google tag único (Ads + GA4) con Consent Mode v2: todo "denied" por defecto
 * y solo pasa a "granted" si el usuario ya aceptó (o acepta en el banner).
 */
export default function GoogleTag() {
  const configs = [GOOGLE_ADS_ID, GA_ID].filter(Boolean).map((id) => `gtag('config','${id}');`);

  return (
    <>
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
          gtag('set','ads_data_redaction',true);
          try {
            if (localStorage.getItem('${CONSENT_KEY}') === 'accepted') {
              gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
            }
          } catch (e) {}
          gtag('js', new Date());
          ${configs.join("\n")}
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
