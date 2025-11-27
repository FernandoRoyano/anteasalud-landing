// components/CookieBanner.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Comprobar si ya aceptó/rechazó cookies
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay oscuro */}
      <div className="fixed inset-0 bg-black/40 z-[998]" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-[rgb(200,207,210)] p-6 md:p-8">
          
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <span className="text-3xl">🍪</span>
            <div>
              <h2 className="text-xl font-bold text-[rgb(31,41,51)] mb-2">
                Utilizamos cookies
              </h2>
              <p className="text-[rgb(130,131,130)] text-sm md:text-base leading-relaxed">
                Esta web utiliza únicamente <strong className="text-[rgb(31,41,51)]">cookies técnicas necesarias</strong> para 
                su correcto funcionamiento. No utilizamos cookies de seguimiento, publicidad ni analítica.
              </p>
            </div>
          </div>

          {/* Info adicional */}
          <div className="bg-[rgb(232,237,238)] rounded-xl p-4 mb-6">
            <p className="text-sm text-[rgb(31,41,51)]">
              <strong>¿Qué significa esto?</strong> No rastreamos tu navegación ni compartimos 
              datos con terceros. Las cookies técnicas son imprescindibles para que la web funcione 
              correctamente y no requieren consentimiento según la normativa, pero queremos ser transparentes contigo.
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <Link
              href="/cookies"
              className="text-sm text-[rgb(0,94,184)] hover:underline order-3 sm:order-1"
            >
              Ver política de cookies
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
              <button
                onClick={rejectCookies}
                className="px-6 py-3 text-[rgb(31,41,51)] font-semibold rounded-xl border-2 border-[rgb(200,207,210)] hover:border-[rgb(0,94,184)] hover:bg-[rgb(232,237,238)] transition-all"
              >
                Solo necesarias
              </button>
              <button
                onClick={acceptCookies}
                className="px-6 py-3 bg-[rgb(0,94,184)] text-white font-semibold rounded-xl hover:bg-[rgb(32,113,188)] transition-all"
              >
                Aceptar y continuar
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
