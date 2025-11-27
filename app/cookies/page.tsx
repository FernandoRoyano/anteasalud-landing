// app/cookies/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | ANTEA Salud",
  description: "Política de cookies de ANTEA Salud",
};

export default function PoliticaCookies() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-[rgb(0,94,184)] mb-4">
            Política de Cookies
          </h1>
          <p className="text-[rgb(130,131,130)]">
            Última actualización: 27 de noviembre de 2025
          </p>
        </header>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none text-[rgb(31,41,51)] space-y-10">
          
          {/* 1. Qué son */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              ¿Qué son las cookies?
            </h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
              cuando visitas una página web. Se utilizan para recordar tus preferencias, 
              mejorar tu experiencia de navegación y, en algunos casos, para fines analíticos o publicitarios.
            </p>
          </section>

          {/* 2. Qué cookies usamos */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              ¿Qué cookies utilizamos?
            </h2>
            <p className="mb-4">
              En <strong>anteasalud.com</strong> utilizamos únicamente:
            </p>
            <div className="bg-[rgb(232,237,238)] rounded-xl p-6">
              <h3 className="font-bold text-[rgb(31,41,51)] mb-2">Cookies técnicas (necesarias)</h3>
              <p className="text-[rgb(130,131,130)] mb-4">
                Son imprescindibles para el funcionamiento básico de la web. No requieren consentimiento.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgb(200,207,210)]">
                      <th className="text-left py-2 pr-4">Nombre</th>
                      <th className="text-left py-2 pr-4">Finalidad</th>
                      <th className="text-left py-2">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">__vercel_live_token</td>
                      <td className="py-2 pr-4">Funcionamiento del hosting</td>
                      <td className="py-2">Sesión</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 3. Cookies de terceros */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              Cookies de terceros
            </h2>
            <div className="bg-[rgb(191,231,249)] rounded-xl p-6">
              <p className="font-semibold text-[rgb(0,94,184)]">
                ✓ No utilizamos cookies de seguimiento ni publicidad
              </p>
              <p className="mt-2 text-[rgb(31,41,51)]">
                Esta web no utiliza Google Analytics, Facebook Pixel, ni ninguna otra 
                herramienta de seguimiento que recopile datos de navegación.
              </p>
            </div>
          </section>

          {/* 4. Cómo gestionar cookies */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              ¿Cómo gestionar las cookies?
            </h2>
            <p className="mb-4">
              Puedes configurar tu navegador para bloquear o eliminar cookies. 
              Ten en cuenta que si bloqueas las cookies técnicas, algunas funciones 
              de la web podrían no funcionar correctamente.
            </p>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://support.google.com/chrome/answer/95647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[rgb(0,94,184)] hover:underline"
                >
                  → Google Chrome
                </a>
              </li>
              <li>
                <a 
                  href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[rgb(0,94,184)] hover:underline"
                >
                  → Mozilla Firefox
                </a>
              </li>
              <li>
                <a 
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[rgb(0,94,184)] hover:underline"
                >
                  → Safari
                </a>
              </li>
              <li>
                <a 
                  href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[rgb(0,94,184)] hover:underline"
                >
                  → Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          {/* 5. Cambios */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              Cambios en esta política
            </h2>
            <p>
              Podemos actualizar esta política de cookies si añadimos nuevas funcionalidades 
              a la web. Te recomendamos revisarla periódicamente. La fecha de última 
              actualización se indica al inicio de este documento.
            </p>
          </section>

          {/* 6. Contacto */}
          <section className="bg-[rgb(232,237,238)] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              ¿Tienes dudas?
            </h2>
            <p className="mb-4">
              Si tienes cualquier pregunta sobre las cookies, contacta con nosotros:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@anteasalud.com" className="text-[rgb(0,94,184)] hover:underline">
                info@anteasalud.com
              </a>
            </p>
          </section>

        </div>

        {/* Botón volver */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(0,94,184)] text-white font-bold rounded-xl hover:bg-[rgb(32,113,188)] transition-colors"
          >
            ← Volver al inicio
          </a>
        </div>
      </article>
    </main>
  );
}
