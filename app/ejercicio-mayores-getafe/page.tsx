import type { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingCTA from '@/components/landing/LandingCTA';
import { Check } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

const TITLE = 'Ejercicio para Mayores a Domicilio en Getafe | ANTEA Salud';
const DESCRIPTION =
  'Entrenador titulado para personas mayores a domicilio en Getafe. Ejercicio funcional, prevención de caídas y readaptación en casa. Graduado en Ciencias del Deporte con 14 años de experiencia. Primera valoración gratuita.';
const URL = 'https://anteasalud.com/ejercicio-mayores-getafe';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'ejercicio mayores Getafe, entrenador personal Getafe, ejercicio a domicilio Getafe, readaptación Getafe, ejercicio para mayores sur Madrid, prevención caídas Getafe',
  alternates: { canonical: URL },
  openGraph: { type: 'article', url: URL, title: TITLE, description: DESCRIPTION, images: ['/og-image.jpg'] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Ejercicio para personas mayores a domicilio',
  provider: { '@type': 'LocalBusiness', name: 'ANTEA Salud', telephone: '+34633261963', url: 'https://anteasalud.com' },
  areaServed: { '@type': 'City', name: 'Getafe', containedIn: { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' } },
  description: DESCRIPTION,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: 'https://anteasalud.com' },
        { name: 'Getafe', url: URL },
      ]} />

      <LandingHero
        badge="Getafe · Sur de Madrid"
        h1="Ejercicio para personas mayores a domicilio"
        h1Highlight="en Getafe"
        subtitle="Entrenador titulado con 14 años de experiencia especializado en personas mayores. Voy a tu casa en Getafe a entrenar a tu familiar. Ejercicio adaptado, prevención de caídas y recuperación de autonomía."
      />

      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
            Ejercicio adaptado en tu casa de Getafe
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Getafe está a solo 14 km del centro de Madrid y es una de las zonas donde más familias me han pedido servicio en los últimos años. Voy en coche propio a cualquier barrio de Getafe: <strong>Sector 3, Las Margaritas, San Isidro, El Bercial, Los Molinos, Perales del Río, Getafe Norte y centro</strong>.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Cada sesión dura 30 minutos y la adapto al estado concreto de cada persona ese día. Nada de clases genéricas: primero hacemos valoración, luego diseño un plan específico, y vamos ajustando sesión a sesión según la evolución.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Mi titulación es <strong className="text-[rgb(0,94,184)]">Graduado en Ciencias de la Actividad Física y el Deporte</strong> y llevo 14 años trabajando exclusivamente con personas mayores. Si tienes dudas sobre si mi servicio encaja con el caso de tu familiar, la primera valoración es gratuita y te lo confirmo sin compromiso.
          </p>
        </div>
      </section>

      <section className="w-full bg-[rgb(232,237,238)] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] text-center mb-8">
            Precios para Getafe
          </h2>
          <div className="bg-white rounded-3xl shadow-lg border border-[rgb(200,207,210)] p-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border-b border-[rgb(232,237,238)]">
                <span className="text-slate-600">Sesión suelta (30 min)</span>
                <span className="font-black text-[rgb(0,94,184)]">55€ + 10€</span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-[rgb(232,237,238)]">
                <span className="text-slate-600">Plan 2 días/semana</span>
                <span className="font-black text-[rgb(0,94,184)]">90€ + 20€/sem</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <span className="text-green-800 font-semibold">Primera valoración</span>
                <span className="font-black text-green-600">GRATIS</span>
              </div>
            </div>
            <p className="text-xs text-[rgb(130,131,130)] mt-4 text-center">
              Getafe está fuera de Madrid capital, por lo que se aplica un recargo fijo de +10€ por sesión para cubrir el desplazamiento.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] mb-6">
            Casos en los que ayudamos en Getafe
          </h2>
          <div className="space-y-3">
            <WhoItem text="Mayores de 60 que quieren mantenerse activos sin salir de casa" />
            <WhoItem text="Recuperación tras operación de cadera, rodilla u otras intervenciones" />
            <WhoItem text="Prevención de caídas y recuperación de confianza al caminar" />
            <WhoItem text="Ejercicio adaptado para artrosis, osteoporosis y dolores crónicos" />
            <WhoItem text="Personas que han perdido fuerza tras hospitalización larga" />
          </div>
        </div>
      </section>

      <LandingCTA
        title="Primera sesión gratuita en Getafe"
        subtitle="Sin compromiso, sin pago por adelantado. Simplemente valoramos juntos la situación y decidimos si tiene sentido empezar."
        related={[
          { href: '/ejercicio-mayores-mostoles', label: 'Móstoles' },
          { href: '/ejercicio-mayores-madrid-capital', label: 'Madrid capital' },
          { href: '/ejercicio-personas-mayores-madrid', label: 'Ejercicio para mayores' },
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
