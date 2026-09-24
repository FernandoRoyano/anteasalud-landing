"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CONSENT_CHANGE_EVENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsent,
  saveConsent,
  type ConsentValue,
} from "@/lib/consent";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// En servidor no mostramos el banner (evita parpadeo y desajustes de hidratación)
const getServerSnapshot = (): ConsentValue | "server" => "server";

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, readConsent, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  if (consent === "server" || (consent !== null && !reopened)) return null;

  const choose = (value: ConsentValue) => {
    saveConsent(value);
    setReopened(false);
  };

  return (
    <section
      role="region"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#2d6a4f]/20 bg-white p-4 shadow-2xl sm:p-6">
        <h2 className="mb-1 text-lg font-bold text-[#17372b] sm:text-xl">¿Aceptas las cookies de medición?</h2>
        <p className="text-base leading-snug text-[#374151]">
          Solo si aceptas usamos Google Analytics y Google Ads para medir visitas y anuncios. No vendemos tus datos.{" "}
          <Link href="/cookies" className="font-semibold text-[#2d6a4f] underline underline-offset-2">
            Más información
          </Link>
        </p>
        <div className="mt-3 flex justify-end">
          <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="min-h-12 rounded-xl border-2 border-[#2d6a4f] px-6 font-semibold text-[#17372b] transition hover:bg-[#eef5f0]"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="min-h-12 rounded-xl bg-[#2d6a4f] px-6 font-semibold text-white transition hover:bg-[#22543f]"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
