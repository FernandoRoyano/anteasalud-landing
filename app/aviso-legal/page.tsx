// app/aviso-legal/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal | ANTEA Salud",
  description: "Aviso legal e información corporativa de ANTEA Salud",
};

export default function AvisoLegal() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-[rgb(0,94,184)] mb-4">
            Aviso Legal
          </h1>
          <p className="text-[rgb(130,131,130)]">
            Última actualización: 27 de noviembre de 2025
          </p>
        </header>

        {/* Contenido */}
        <div className="text-[rgb(31,41,51)] space-y-10">
          
          {/* 1. Titular */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              1. Datos identificativos
            </h2>
            <div className="bg-[rgb(232,237,238)] rounded-xl p-6 space-y-2">
              <p><strong>Titular:</strong> ANTEA Salud</p>
              <p><strong>NIF/CIF:</strong> [Tu NIF o CIF]</p>
              <p><strong>Domicilio:</strong> [Tu dirección fiscal]</p>
              <p><strong>Email:</strong> info@anteasalud.com</p>
              <p><strong>Teléfono:</strong> 633 261 963</p>
              <p><strong>Actividad:</strong> Servicios de fisioterapia y entrenamiento funcional a domicilio</p>
            </div>
          </section>

          {/* 2. Objeto */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              2. Objeto
            </h2>
            <p className="leading-relaxed">
              El presente aviso legal regula el uso del sitio web <strong>anteasalud.com</strong>, 
              del que es titular ANTEA Salud. La navegación por el sitio web atribuye la condición 
              de usuario e implica la aceptación plena y sin reservas de todas las disposiciones 
              incluidas en este aviso legal.
            </p>
          </section>

          {/* 3. Propiedad intelectual */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              3. Propiedad intelectual e industrial
            </h2>
            <p className="leading-relaxed mb-4">
              El sitio web, incluyendo a título enunciativo pero no limitativo su programación, 
              edición, compilación y demás elementos necesarios para su funcionamiento, los diseños, 
              logotipos, textos, fotografías y gráficos, son propiedad de ANTEA Salud o, en su caso, 
              dispone de licencia o autorización expresa por parte de los autores.
            </p>
            <p className="leading-relaxed">
              Todos los contenidos del sitio web se encuentran debidamente protegidos por la 
              normativa de propiedad intelectual e industrial. Independientemente de la finalidad 
              para la que fueran destinados, la reproducción total o parcial, uso, distribución 
              y comunicación pública requiere la autorización escrita previa de ANTEA Salud.
            </p>
          </section>

          {/* 4. Condiciones de uso */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              4. Condiciones de uso
            </h2>
            <p className="leading-relaxed mb-4">
              El usuario se compromete a hacer un uso adecuado de los contenidos y servicios 
              que ANTEA Salud ofrece a través de su sitio web y, con carácter enunciativo pero 
              no limitativo, a no emplearlos para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Difundir contenidos delictivos, violentos, pornográficos, racistas, xenófobos, 
                ofensivos, de apología del terrorismo o, en general, contrarios a la ley o al orden público.</li>
              <li>Introducir en la red virus informáticos o realizar actuaciones susceptibles de 
                alterar, estropear, interrumpir o generar errores o daños en los documentos 
                electrónicos, datos o sistemas físicos y lógicos de ANTEA Salud o de terceras personas.</li>
              <li>Intentar acceder a las cuentas de correo electrónico de otros usuarios o a 
                áreas restringidas de los sistemas informáticos de ANTEA Salud o de terceros.</li>
              <li>Vulnerar los derechos de propiedad intelectual o industrial, así como violar 
                la confidencialidad de la información de ANTEA Salud o de terceros.</li>
              <li>Suplantar la identidad de cualquier otro usuario.</li>
            </ul>
          </section>

          {/* 5. Exención de responsabilidades */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              5. Exención de responsabilidades
            </h2>
            <p className="leading-relaxed mb-4">
              ANTEA Salud se exime de cualquier tipo de responsabilidad derivada de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La información publicada en su sitio web siempre que no haya sido manipulada 
                o introducida por un tercero ajeno.</li>
              <li>Los posibles daños o perjuicios que se pudieran derivar de interferencias, 
                omisiones, interrupciones, virus informáticos, averías telefónicas o desconexiones 
                en el funcionamiento operativo del sistema electrónico.</li>
              <li>Los daños que pudieran causarse por terceras personas mediante intromisiones 
                ilegítimas fuera del control de ANTEA Salud.</li>
              <li>Las divergencias de la información, documentación y/o demás contenido del 
                sitio web que pudieran existir entre la versión electrónica y la versión impresa.</li>
              <li>La imposibilidad de prestar el servicio o permitir el acceso por causas no 
                imputables a ANTEA Salud, debidas al usuario, a terceros o a causas de fuerza mayor.</li>
            </ul>
          </section>

          {/* 6. Enlaces a terceros */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              6. Enlaces a terceros
            </h2>
            <p className="leading-relaxed">
              Este sitio web puede contener enlaces a sitios de terceros. ANTEA Salud no asume 
              ninguna responsabilidad por el contenido, informaciones o servicios que pudieran 
              aparecer en dichos sitios, que tendrán exclusivamente carácter informativo y que 
              en ningún caso implican relación alguna entre ANTEA Salud y las personas o entidades 
              titulares de tales contenidos o titulares de los sitios donde se encuentren.
            </p>
          </section>

          {/* 7. Derecho de exclusión */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              7. Derecho de exclusión
            </h2>
            <p className="leading-relaxed">
              ANTEA Salud se reserva el derecho a denegar o retirar el acceso al portal y/o 
              los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un 
              tercero, a aquellos usuarios que incumplan el presente aviso legal.
            </p>
          </section>

          {/* 8. Modificaciones */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              8. Modificaciones
            </h2>
            <p className="leading-relaxed">
              ANTEA Salud se reserva el derecho de efectuar sin previo aviso las modificaciones 
              que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto 
              los contenidos y servicios que se presten a través de la misma como la forma en 
              la que estos aparezcan presentados o localizados en su portal.
            </p>
          </section>

          {/* 9. Ley aplicable */}
          <section>
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              9. Ley aplicable y jurisdicción
            </h2>
            <p className="leading-relaxed">
              Para la resolución de todas las controversias o cuestiones relacionadas con el 
              presente sitio web o de las actividades en él desarrolladas, será de aplicación 
              la legislación española, a la que se someten expresamente las partes, siendo 
              competentes para la resolución de todos los conflictos derivados o relacionados 
              con su uso los Juzgados y Tribunales de Santander (España).
            </p>
          </section>

          {/* Contacto */}
          <section className="bg-[rgb(191,231,249)] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[rgb(0,94,184)] mb-4">
              ¿Tienes dudas?
            </h2>
            <p className="mb-4">
              Si tienes cualquier pregunta sobre este aviso legal, contacta con nosotros:
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
