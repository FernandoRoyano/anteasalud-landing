import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidad",
  description: "Cómo trata ANTEA Salud tus datos personales y de salud: responsable, finalidades, base legal, proveedores y tus derechos.",
  path: "/privacidad",
});

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-primary-dark mb-4">
            Política de Privacidad
          </h1>
          <p className="text-muted">
            Última actualización: 24 de septiembre de 2026
          </p>
        </header>

        {/* Contenido */}
        <div className="max-w-none text-lg leading-relaxed text-ink">
          
          {/* 1. Responsable */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              1. Responsable del tratamiento
            </h2>
            <div className="bg-primary-50 rounded-xl p-6 space-y-2">
              <p><strong>Identidad:</strong> ANTEA Salud</p>
              <p><strong>NIF:</strong> 72171129G</p>
              <p><strong>Dirección:</strong> Calle Juan de Urbieta 30, 28007 Madrid</p>
              <p><strong>Email:</strong> anteasalud@gmail.com</p>
            </div>
          </section>

          {/* 2. Datos que recogemos */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              2. Datos personales que recogemos
            </h2>
            <p className="mb-4">
              A través de los formularios de la web (contacto, valoración gratuita, guía y contacto rápido por WhatsApp) recogemos:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nombre:</strong> para dirigirnos a ti de forma personalizada.</li>
              <li><strong>Teléfono:</strong> para contactarte y ofrecerte información sobre nuestros servicios.</li>
              <li><strong>Email (opcional):</strong> para enviarte información si lo prefieres por escrito.</li>
              <li><strong>Zona:</strong> para confirmar que podemos desplazarnos y calcular el precio.</li>
              <li><strong>Mensaje o situación:</strong> para entender tus necesidades y ofrecerte una respuesta adecuada.</li>
              <li>
                <strong>Datos de salud (categoría especial, art. 9 RGPD):</strong> edad, situación física o motivo de
                consulta (por ejemplo, recuperación tras una operación o riesgo de caídas) que decidas indicarnos sobre ti
                o sobre tu familiar.
              </li>
              <li><strong>Fecha del consentimiento:</strong> para poder acreditar que lo has dado.</li>
            </ul>
            <p className="mt-4">
              Si nos facilitas datos de un familiar, declaras contar con su autorización o actuar en su interés como
              persona de apoyo.
            </p>
          </section>

          {/* 3. Finalidad */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              3. Finalidad del tratamiento
            </h2>
            <p className="mb-4">Utilizamos tus datos personales para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a tu solicitud de información.</li>
              <li>Contactarte para ofrecerte una valoración gratuita de nuestros servicios.</li>
              <li>Gestionar la relación comercial si decides contratar nuestros servicios.</li>
              <li>Enviarte comunicaciones relacionadas con nuestros servicios (solo si das tu consentimiento).</li>
            </ul>
          </section>

          {/* 4. Base legal */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              4. Base legal del tratamiento
            </h2>
            <p className="mb-4">El tratamiento de tus datos se basa en:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Tu consentimiento explícito</strong> (art. 6.1.a y 9.2.a RGPD): marcando la casilla del
                formulario consientes el tratamiento de tus datos, incluidos los de salud, para las finalidades indicadas.
                Puedes retirarlo en cualquier momento.
              </li>
              <li>
                <strong>Interés legítimo:</strong> para gestionar consultas y ofrecer nuestros servicios.
              </li>
              <li>
                <strong>Ejecución de contrato:</strong> si decides contratar nuestros servicios de
                entrenamiento funcional o ejercicio terapéutico a domicilio.
              </li>
            </ul>
          </section>

          {/* 5. Conservación */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              5. Conservación de los datos
            </h2>
            <p>
              Conservaremos tus datos personales mientras exista una relación comercial contigo 
              o durante el tiempo necesario para cumplir con las obligaciones legales. 
              Si solo realizas una consulta, tus datos se conservarán durante un máximo de 
              <strong> 12 meses</strong> desde el último contacto, salvo que solicites su eliminación antes.
            </p>
          </section>

          {/* 6. Destinatarios */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              6. Destinatarios de los datos
            </h2>
            <p className="mb-4">
              Tus datos personales <strong>no se ceden a terceros</strong>, salvo obligación legal. Para prestar el
              servicio usamos estos proveedores, que actúan como encargados del tratamiento:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google (Google Sheets / Workspace):</strong> almacenamiento de las solicitudes de contacto.</li>
              <li><strong>EmailJS:</strong> aviso interno por email de cada nueva solicitud.</li>
              <li><strong>Vercel:</strong> alojamiento de la web.</li>
              <li>
                <strong>WhatsApp (Meta):</strong> solo si eliges continuar la conversación por WhatsApp; se rige por las
                condiciones de WhatsApp.
              </li>
              <li>
                <strong>Google Analytics y Google Ads:</strong> solo si aceptas las cookies de medición. Consulta la{" "}
                <Link href="/cookies" className="text-primary underline">política de cookies</Link>.
              </li>
            </ul>
            <p className="mt-4">
              Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo con las garantías del Marco de
              Privacidad de Datos UE-EE. UU. o cláusulas contractuales tipo de la Comisión Europea.
            </p>
          </section>

          {/* 7. Derechos */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              7. Tus derechos
            </h2>
            <p className="mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de tus datos (&ldquo;derecho al olvido&rdquo;).</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
              <li><strong>Limitación:</strong> solicitar que limitemos el uso de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado.</li>
              <li><strong>Retirar el consentimiento:</strong> en cualquier momento, sin efecto retroactivo.</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, contacta con nosotros en{" "}
              <a href="mailto:anteasalud@gmail.com" className="text-primary underline">
                anteasalud@gmail.com
              </a>{" "}
              indicando tu nombre y el derecho que deseas ejercer.
            </p>
            <p className="mt-4">
              Si consideras que no hemos tratado tus datos correctamente, puedes presentar una reclamación 
              ante la <strong>Agencia Española de Protección de Datos</strong> (AEPD):{" "}
              <a 
                href="https://www.aepd.es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                www.aepd.es
              </a>
            </p>
          </section>

          {/* 8. Seguridad */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              8. Medidas de seguridad
            </h2>
            <p>
              Aplicamos medidas técnicas y organizativas para proteger tus datos personales contra 
              acceso no autorizado, pérdida o destrucción. Nuestra web utiliza cifrado SSL/TLS 
              para proteger la transmisión de datos.
            </p>
          </section>

          {/* 9. Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              9. Cookies
            </h2>
            <p>
              Usamos cookies técnicas y, solo con tu consentimiento, cookies de Google Analytics y Google Ads.
              Más información en nuestra{" "}
              <Link href="/cookies" className="text-primary underline">
                política de cookies
              </Link>.
            </p>
          </section>

          {/* 10. Cambios */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              10. Cambios en esta política
            </h2>
            <p>
              Podemos actualizar esta política de privacidad para reflejar cambios en nuestras 
              prácticas o por motivos legales. Te recomendamos revisarla periódicamente. 
              La fecha de última actualización se indica al inicio de este documento.
            </p>
          </section>

          {/* Contacto final */}
          <section className="bg-primary-50 rounded-2xl p-8 mt-12">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              ¿Tienes dudas?
            </h2>
            <p className="mb-4">
              Si tienes cualquier pregunta sobre esta política de privacidad o sobre cómo 
              tratamos tus datos, contacta con nosotros:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:anteasalud@gmail.com" className="text-primary underline">
                  anteasalud@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>

        {/* Botón volver */}
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
