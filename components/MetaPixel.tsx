"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/consent";

const PIXEL_ID = "1547877173715569";

interface PixelQueue {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: PixelQueue;
  loaded: boolean;
  version: string;
}

declare global {
  interface Window {
    fbq?: PixelQueue;
    _fbq?: PixelQueue;
  }
}

let initialized = false;

function initializePixel(): void {
  if (initialized) return;
  if (!window.fbq) {
    const pixel = function (...args: unknown[]) {
      if (pixel.callMethod) pixel.callMethod(...args);
      else pixel.queue.push(args);
    } as PixelQueue;
    pixel.queue = [];
    pixel.push = pixel;
    pixel.loaded = true;
    pixel.version = "2.0";
    window.fbq = pixel;
    window._fbq = pixel;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  // Sin detección automática de formularios ni coincidencias con datos personales.
  window.fbq("set", "autoConfig", false, PIXEL_ID);
  window.fbq("init", PIXEL_ID);
  initialized = true;
}

export function trackMetaLead(): void {
  if (readConsent() !== "accepted" || window.location.pathname.startsWith("/admin")) return;
  initializePixel();
  window.fbq?.("trackSingle", PIXEL_ID, "Lead");
}

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    let pageTracked = false;
    const syncConsent = () => {
      if (readConsent() !== "accepted") {
        window.fbq?.("consent", "revoke");
        return;
      }
      if (pathname?.startsWith("/admin")) return;
      initializePixel();
      window.fbq?.("consent", "grant");
      if (!pageTracked) {
        window.fbq?.("trackSingle", PIXEL_ID, "PageView");
        pageTracked = true;
      }
    };
    syncConsent();
    window.addEventListener(CONSENT_CHANGE_EVENT, syncConsent);
    window.addEventListener("storage", syncConsent);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, syncConsent);
      window.removeEventListener("storage", syncConsent);
      // También detiene el seguimiento al entrar en el área privada.
      window.fbq?.("consent", "revoke");
    };
  }, [pathname]);

  return null;
}
