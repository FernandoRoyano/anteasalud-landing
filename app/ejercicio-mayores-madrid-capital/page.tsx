import type { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingCTA from '@/components/landing/LandingCTA';
import { Check, MapPin } from 'lucide-react';

const TITLE = 'Ejercicio para Mayores a Domicilio en Madrid Capital | ANTEA Salud';
const DESCRIPTION =
  'Entrenador titulado especializado en personas mayores a domicilio en Madrid capital. Sin recargo por desplazamiento. Centro, Salamanca, Retiro, Chamberí, Latina, Carabanchel, Vallecas y resto de barrios. 14 años de experiencia.';
const URL = 'https://anteasalud.com/ejercicio-mayores-madrid-capital';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'ejercicio mayores Madrid capital, entrenador personal mayores Madrid, ejercicio a domicilio Madrid centro, ejercicio mayores Salamanca, ejercicio mayores Retiro, ejercicio mayores Chamberí',
  alternates: { canonical: URL },
  openGraph: { type: 'article', url: URL, title: TITLE, description: DESCRIPTION, images: ['/og-image.jpg'] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Ejercicio para personas mayores a domicilio',
  provider: { '@type': 'LocalBusiness', name: 'ANTEA Salud', telephone: '+34633261963', url: 'https://anteasalud.com' },
  areaServed: { '@type': 'City', name: 'Madrid' },
  description: DESCRIPTION,
};

const BARRIOS = [
  'Centro', 'Salamanca', 'Retiro', 'Chamberí', 'Arganzuela', 'Moncloa-Aravaca',
  'Tetuán', 'Chamartín', 'Latina', 'Carabanchel', 'Usera', 'Puente de Vallecas',
  'Moratalaz', 'Ciudad Lineal', 'Hortaleza', 'Villaverde', 'Villa de Vallecas',
  'Vicálvaro', 'San Blas-Canillejas', 'Barajas', 'Fuencarral-El Pardo',
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <LandingHero
        badge="Madrid capital · Sin recargo por desplazamiento"
        h1="Ejercicio para personas mayores a domicilio"
        h1Highlight="en Madrid capital"
        subtitle="Entrenador titulado con 14 años de experiencia especializado en personas mayores. Voy a tu casa en cualquier distrito de Madrid. Primera valoración gratuita y sin compromiso."
      />

      {/* Intro específica de Madrid */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
            Ejercicio adaptado para mayores sin salir de Madrid
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Madrid es una ciudad complicada para una persona mayor: tráfico, escaleras, aceras irregulares, distancias largas. Llevar a un padre o una madre dos veces por semana a un centro de entrenamiento puede ser una odisea logística que acaba en que no se hace.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Por eso voy yo a su casa. Una sesión de 30 minutos en el salón, con el material mínimo necesario, adaptada a lo que cada persona puede hacer ese día. Sin traslados, sin esperas, sin estrés. <strong className="text-[rgb(0,94,184)]">Madrid capital sin recargo por desplazamiento.</strong>
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Atiendo a personas mayores en <strong>todos los distritos de Madrid</strong>, desde el Centro hasta las afueras. La mayoría de mis clientes actuales están en barrios de toda la ciudad, así que tengo experiencia trabajando con perfiles muy diversos.
          </p>
        </div>
      </section>

      {/* Listado de barrios */}
      <section className="w-full bg-[rgb(232,237,238)] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] text-center mb-4">
            Distritos de Madrid que cubrimos
          </h2>
          <p className="text-center text-[rgb(130,131,130)] mb-10">
            Los 21 distritos municipales, sin recargo por desplazamiento
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {BARRIOS.map((barrio) => (
              <div
                key={barrio}
                className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[rgb(200,207,210)]"
              >
                <MapPin className="w-4 h-4 text-[rgb(0,94,184)] flex-shrink-0" />
                <span className="text-sm font-semibold text-[rgb(31,41,51)]">{barrio}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios específicos de capital */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] text-center mb-8">
            Precios para Madrid capital
          </h2>
          <div className="bg-gradient-to-br from-[rgb(191,231,249)] to-[rgb(232,237,238)] rounded-3xl p-10 border-2 border-[rgb(0,94,184)]/20">
            <div className="space-y-4 mb-6">
              <PriceRow label="Sesión suelta (30 min)" price="45€" />
              <PriceRow label="Plan 2 días/semana" price="70€/semana" highlight />
              <PriceRow label="Primera valoración" price="GRATIS" free />
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
              <p className="text-sm text-green-800 flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Sin recargo por desplazamiento</strong> en Madrid capital. El precio que ves es el que pagas.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingCTA
        title="Empieza hoy en tu casa de Madrid"
        subtitle="Valoración gratuita en tu domicilio. Sin compromiso y sin pago por adelantado."
        related={[
          { href: '/ejercicio-personas-mayores-madrid', label: 'Ejercicio para mayores' },
          { href: '/ejercicio-mayores-mostoles', label: 'Móstoles' },
          { href: '/ejercicio-mayores-getafe', label: 'Getafe' },
        ]}
      />
    </>
  );
}

function PriceRow({
  label,
  price,
  highlight,
  free,
}: {
  label: string;
  price: string;
  highlight?: boolean;
  free?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl ${
        highlight ? 'bg-[rgb(0,94,184)] text-white' : 'bg-white text-[rgb(31,41,51)]'
      }`}
    >
      <span className="font-semibold">{label}</span>
      <span className={`text-xl font-black ${free ? 'text-green-600' : ''}`}>{price}</span>
    </div>
  );
}
