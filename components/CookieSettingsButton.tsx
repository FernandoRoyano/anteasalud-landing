"use client";

import { openCookieSettings } from "@/lib/consent";

export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Configurar cookies
    </button>
  );
}
