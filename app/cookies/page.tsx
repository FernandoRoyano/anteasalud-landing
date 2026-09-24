import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de cookies",
  description: "Qué cookies usa anteasalud.com, para qué sirven, cuánto duran y cómo cambiar tu consentimiento.",
  path: "/cookies",
});

const COOKIES = [
  { name: "cookie-consent", owner: "ANTEA Salud (localStorage)", purpose: "Recordar si aceptas o rechazas las cookies de medición", type: "Técnica", duration: "Hasta que la borres" },
  { name: "_ga, _ga_*", owner: "Google Analytics", purpose: "Distinguir visitas y medir el uso de la web de forma agregada", type: "Analítica (requiere consentimiento)", duration: "Hasta 2 años" },
  { name: "_gcl_au", owner: "Google Ads", purpose: "Saber si una solicitud de contacto proviene de un anuncio", type: "Publicitaria (requiere consentimiento)", duration: "3 meses" },
];

export default function PoliticaCookies() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-primary-dark mb-4">Política de cookies</h1>
          <p className="text-muted">Última actualización: 24 de septiembre de 2026</p>
        </header>

        <div className="max-w-none text-ink text-lg leading-relaxed space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos que se guardan en tu dispositivo cuando visitas una web. Sirven para
              recordar preferencias y, si lo aceptas, para medir cómo se usa la web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">¿Qué cookies utilizamos?</h2>
            <p className="mb-4">
              Las cookies de Google Analytics y Google Ads <strong>solo se activan si pulsas «Aceptar»</strong> en el
              aviso de cookies. Si las rechazas, Google solo recibe señales sin cookies y sin identificarte (modo de
              consentimiento de Google).
            </p>
            <div className="overflow-x-auto rounded-xl border border-primary-light">
              <table className="w-full text-base">
                <caption className="sr-only">Cookies utilizadas en anteasalud.com</caption>
                <thead className="bg-primary-50">
                  <tr>
                    <th scope="col" className="text-left p-3">Nombre</th>
                    <th scope="col" className="text-left p-3">Titular</th>
                    <th scope="col" className="text-left p-3">Finalidad</th>
                    <th scope="col" className="text-left p-3">Tipo</th>
                    <th scope="col" className="text-left p-3">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIES.map((c) => (
                    <tr key={c.name} className="border-t border-primary-light align-top">
                      <td className="p-3 font-mono">{c.name}</td>
                      <td className="p-3">{c.owner}</td>
                      <td className="p-3">{c.purpose}</td>
                      <td className="p-3">{c.type}</td>
                      <td className="p-3">{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Google puede tratar estos datos fuera del Espacio Económico Europeo al amparo del Marco de Privacidad de
              Datos UE-EE. UU. Más información en{" "}
              <a href="https://policies.google.com/technologies/cookies?hl=es" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">
                policies.google.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">¿Cómo cambiar o retirar tu consentimiento?</h2>
            <p className="mb-4">
              Puedes cambiar tu elección en cualquier momento. También puedes borrar o bloquear cookies desde tu
              navegador.
            </p>
            <CookieSettingsButton className="min-h-12 rounded-xl bg-primary px-6 font-bold text-white transition hover:bg-primary-dark" />
            <ul className="mt-6 space-y-2">
              {[
                ["Google Chrome", "https://support.google.com/chrome/answer/95647"],
                ["Mozilla Firefox", "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"],
                ["Safari", "https://support.apple.com/es-es/guide/safari/sfri11471/mac"],
                ["Microsoft Edge", "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">Cambios en esta política</h2>
            <p>
              Actualizaremos esta política si cambian las cookies que usamos. La fecha de la última actualización
              aparece al inicio.
            </p>
          </section>

          <section className="bg-primary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">¿Tienes dudas?</h2>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:anteasalud@gmail.com" className="text-primary underline">
                anteasalud@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 min-h-12 px-6 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </article>
    </div>
  );
}
