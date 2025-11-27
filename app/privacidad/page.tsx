// app/privacidad/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | ANTEA Salud",
  description: "Política de privacidad y protección de datos de ANTEA Salud",
};

export default function PoliticaPrivacidad() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-[rgb(0,94,184)] mb-4">
            Política de Privacidad
          </h1>
          <p className="text-[rgb(130,131,130)]">
            Última actualización: 27 de noviembre de 2025
          </p>
        </header>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none text-[rgb(31,41,51)]">
          
          {/* 1. Responsable */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              1. Responsable del tratamiento
            </h2>
            <div className="bg-[rgb(232,237,238)] rounded-xl p-6 space-y-2">
              <p><strong>Identidad:</strong> ANTEA Salud</p>
              <p><strong>NIF/CIF:</strong> [Tu NIF o CIF]</p>
              <p><strong>Dirección:</strong> [Tu dirección fiscal]</p>
              <p><strong>Email:</strong> info@anteasalud.com</p>
              <p><strong>Teléfono:</strong> 633 261 963</p>
            </div>
          </section>

          {/* 2. Datos que recogemos */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              2. Datos personales que recogemos
            </h2>
            <p className="mb-4">
              A través del formulario de contacto de nuestra web, recogemos los siguientes datos:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nombre:</strong> para dirigirnos a ti de forma personalizada.</li>
              <li><strong>Teléfono:</strong> para contactarte y ofrecerte información sobre nuestros servicios.</li>
              <li><strong>Email (opcional):</strong> para enviarte información si lo prefieres por escrito.</li>
              <li><strong>Mensaje:</strong> para entender tus necesidades y ofrecerte una respuesta adecuada.</li>
            </ul>
          </section>

          {/* 3. Finalidad */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
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
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              4. Base legal del tratamiento
            </h2>
            <p className="mb-4">El tratamiento de tus datos se basa en:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Tu consentimiento:</strong> al rellenar y enviar el formulario de contacto, 
                consientes expresamente el tratamiento de tus datos para las finalidades indicadas.
              </li>
              <li>
                <strong>Interés legítimo:</strong> para gestionar consultas y ofrecer nuestros servicios.
              </li>
              <li>
                <strong>Ejecución de contrato:</strong> si decides contratar nuestros servicios de 
                fisioterapia o entrenamiento a domicilio.
              </li>
            </ul>
          </section>

          {/* 5. Conservación */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
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
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              6. Destinatarios de los datos
            </h2>
            <p className="mb-4">
              Tus datos personales <strong>no se cederán a terceros</strong>, salvo:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Obligación legal (requerimiento de autoridades competentes).</li>
              <li>
                Proveedores de servicios necesarios para la gestión (por ejemplo, 
                el servicio de email que utilizamos para responder consultas). 
                Estos proveedores actúan como encargados de tratamiento y cumplen con la normativa de protección de datos.
              </li>
            </ul>
            <div className="bg-[rgb(191,231,249)] rounded-xl p-4 mt-4">
              <p className="text-sm">
                <strong>Servicio de email:</strong> Utilizamos EmailJS para gestionar los formularios de contacto. 
                Puedes consultar su política de privacidad en{" "}
                <a 
                  href="https://www.emailjs.com/legal/privacy-policy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[rgb(0,94,184)] hover:underline"
                >
                  emailjs.com/legal/privacy-policy
                </a>
              </p>
            </div>
          </section>

          {/* 7. Derechos */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              7. Tus derechos
            </h2>
            <p className="mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de tus datos ("derecho al olvido").</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
              <li><strong>Limitación:</strong> solicitar que limitemos el uso de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado.</li>
              <li><strong>Retirar el consentimiento:</strong> en cualquier momento, sin efecto retroactivo.</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, contacta con nosotros en{" "}
              <a href="mailto:info@anteasalud.com" className="text-[rgb(0,94,184)] hover:underline">
                info@anteasalud.com
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
                className="text-[rgb(0,94,184)] hover:underline"
              >
                www.aepd.es
              </a>
            </p>
          </section>

          {/* 8. Seguridad */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
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
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              9. Cookies
            </h2>
            <p>
              Esta web utiliza únicamente cookies técnicas necesarias para su funcionamiento. 
              No utilizamos cookies de seguimiento ni publicidad. Para más información, consulta 
              nuestra{" "}
              <a href="/cookies" className="text-[rgb(0,94,184)] hover:underline">
                Política de Cookies
              </a>.
            </p>
          </section>

          {/* 10. Cambios */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              10. Cambios en esta política
            </h2>
            <p>
              Podemos actualizar esta política de privacidad para reflejar cambios en nuestras 
              prácticas o por motivos legales. Te recomendamos revisarla periódicamente. 
              La fecha de última actualización se indica al inicio de este documento.
            </p>
          </section>

          {/* Contacto final */}
          <section className="bg-[rgb(191,231,249)] rounded-2xl p-8 mt-12">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              ¿Tienes dudas?
            </h2>
            <p className="mb-4">
              Si tienes cualquier pregunta sobre esta política de privacidad o sobre cómo 
              tratamos tus datos, contacta con nosotros:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:info@anteasalud.com" className="text-[rgb(0,94,184)] hover:underline">
                  info@anteasalud.com
                </a>
              </p>
              <p>
                <strong>Teléfono:</strong>{" "}
                <a href="tel:+34633261963" className="text-[rgb(0,94,184)] hover:underline">
                  633 261 963
                </a>
              </p>
            </div>
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
