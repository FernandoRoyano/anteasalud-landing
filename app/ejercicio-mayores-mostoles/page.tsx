import type { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingCTA from '@/components/landing/LandingCTA';
import { Check } from 'lucide-react';

const TITLE = 'Ejercicio para Mayores a Domicilio en Móstoles | ANTEA Salud';
const DESCRIPTION =
  'Entrenador titulado para personas mayores a domicilio en Móstoles. Ejercicio funcional, prevención de caídas y recuperación de autonomía en tu casa. Graduado en Ciencias del Deporte con 14 años de experiencia. Valoración gratuita.';
const URL = 'https://anteasalud.com/ejercicio-mayores-mostoles';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'ejercicio mayores Móstoles, entrenador personal Móstoles, ejercicio a domicilio Móstoles, fisio mayores Móstoles, readaptación Móstoles, ejercicio para mayores sur Madrid',
  alternates: { canonical: URL },
  openGraph: { type: 'article', url: URL, title: TITLE, description: DESCRIPTION, images: ['/og-image.jpg'] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Ejercicio para personas mayores a domicilio',
  provider: { '@type': 'LocalBusiness', name: 'ANTEA Salud', telephone: '+34633261963', url: 'https://anteasalud.com' },
  areaServed: { '@type': 'City', name: 'Móstoles', containedIn: { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' } },
  description: DESCRIPTION,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <LandingHero
        badge="Móstoles · 14 años con personas mayores"
        h1="Ejercicio para personas mayores a domicilio"
        h1Highlight="en Móstoles"
        subtitle="Voy a tu casa en Móstoles a entrenar a tu padre, madre o familiar. Ejercicio adaptado para recuperar fuerza, equilibrio y autonomía. Entrenador titulado especializado en personas mayores."
      />

      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
            Ejercicio adaptado en tu casa de Móstoles
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Si vives en Móstoles y tienes un familiar mayor que necesita moverse más pero no quiere o no puede desplazarse a un gimnasio, soy la solución. Voy a tu domicilio, monto el material en 5 minutos, y le doy una sesión de 30 minutos adaptada a su edad y condición física.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Móstoles está a unos 18 km del centro de Madrid, a 25-35 minutos en coche. Me desplazo en coche propio, llego siempre puntual, y trabajo barrios como <strong>Móstoles centro, Parque Coimbra, Pradillo, El Soto, Parque Guadarrama, Iviasa y el resto de la ciudad</strong>.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Mi formación es <strong className="text-[rgb(0,94,184)]">Graduado en Ciencias de la Actividad Física y el Deporte</strong>, con 14 años trabajando exclusivamente con personas mayores. Sé adaptar el ejercicio a cada caso: tras una operación, para prevenir caídas, para recuperar fuerza tras meses encamado, o simplemente para mantenerse activo y evitar el deterioro.
          </p>
        </div>
      </section>

      <section className="w-full bg-[rgb(232,237,238)] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] text-center mb-8">
            Precios para Móstoles
          </h2>
          <div className="bg-white rounded-3xl shadow-lg border border-[rgb(200,207,210)] p-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border-b border-[rgb(232,237,238)]">
                <span className="text-slate-600">Sesión suelta (30 min)</span>
                <span className="font-black text-[rgb(0,94,184)]">45€ + 5€</span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-[rgb(232,237,238)]">
                <span className="text-slate-600">Plan 2 días/semana</span>
                <span className="font-black text-[rgb(0,94,184)]">70€ + 10€/sem</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <span className="text-green-800 font-semibold">Primera valoración</span>
                <span className="font-black text-green-600">GRATIS</span>
              </div>
            </div>
            <p className="text-xs text-[rgb(130,131,130)] mt-4 text-center">
              Móstoles está fuera de Madrid capital, por lo que se aplica un recargo de +5€ por sesión para cubrir el desplazamiento.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] mb-6">
            ¿Para quién es este servicio en Móstoles?
          </h2>
          <div className="space-y-3">
            <WhoItem text="Personas mayores de 60 años que quieren mantenerse activas en casa" />
            <WhoItem text="Familias que prefieren que el profesional vaya a su domicilio en vez de tener que desplazar a su familiar" />
            <WhoItem text="Mayores tras operaciones (cadera, rodilla, hombro) que necesitan continuar trabajando después del alta" />
            <WhoItem text="Personas que han sufrido una caída y necesitan recuperar la confianza" />
            <WhoItem text="Mayores con artrosis o dolores crónicos que necesitan ejercicio específico y supervisado" />
          </div>
        </div>
      </section>

      <LandingCTA
        title="Primera sesión gratuita en tu casa de Móstoles"
        subtitle="Valoración sin compromiso. Conocemos la situación y te digo con honestidad qué puedo hacer."
        related={[
          { href: '/ejercicio-mayores-getafe', label: 'Getafe' },
          { href: '/ejercicio-mayores-madrid-capital', label: 'Madrid capital' },
          { href: '/prevencion-caidas-mayores-madrid', label: 'Prevención de caídas' },
        ]}
      />
    </>
  );
}

function WhoItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[rgb(232,237,238)] rounded-xl">
      <Check className="w-5 h-5 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
      <p className="text-[rgb(31,41,51)]">{text}</p>
    </div>
  );
}
