"use client";

export type ConsentValue = "accepted" | "rejected";

export const CONSENT_KEY = "cookie-consent";
export const CONSENT_CHANGE_EVENT = "antea:consent-change";
export const OPEN_COOKIE_SETTINGS_EVENT = "antea:open-cookie-settings";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function readConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Navegación privada / almacenamiento bloqueado: el consentimiento vale solo para esta visita
  }

  const granted = value === "accepted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: granted,
    analytics_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
  });
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
