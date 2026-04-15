import type { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingCTA from '@/components/landing/LandingCTA';
import { Check, Dumbbell, HeartPulse, ShieldCheck, TrendingUp, Users, Home, Clock } from 'lucide-react';

const TITLE = 'Ejercicio para Personas Mayores a Domicilio en Madrid | ANTEA Salud';
const DESCRIPTION =
  'Ejercicio adaptado para personas mayores a domicilio en Madrid. Entrenador titulado en Ciencias del Deporte con 14 años de experiencia. Recupera fuerza, equilibrio y autonomía en casa. Valoración gratuita sin compromiso.';
const URL = 'https://www.anteasalud.com/ejercicio-personas-mayores-madrid';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'ejercicio personas mayores Madrid, ejercicio para mayores a domicilio, entrenamiento personal mayores Madrid, ejercicio adaptado tercera edad, entrenador personas mayores, actividad física mayores Madrid',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Ejercicio a domicilio para personas mayores',
  provider: {
    '@type': 'LocalBusiness',
    name: 'ANTEA Salud',
    telephone: '+34633261963',
    url: 'https://www.anteasalud.com',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Comunidad de Madrid',
  },
  description: DESCRIPTION,
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: '35',
    highPrice: '45',
    offerCount: '2',
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.anteasalud.com' },
    { '@type': 'ListItem', position: 2, name: 'Ejercicio para personas mayores en Madrid', item: URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <LandingHero
        badge="Graduado en Ciencias del Deporte · 14 años con personas mayores"
        h1="Ejercicio para personas mayores a domicilio"
        h1Highlight="en Madrid"
        subtitle="Recupera fuerza, equilibrio y autonomía con un entrenador titulado que va a tu casa. Sesiones personalizadas, adaptadas a cada edad y condición física. Primera valoración gratuita y sin compromiso."
      />

      {/* Introducción */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
            El ejercicio es la herramienta más potente contra el envejecimiento
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A partir de los 60 años, el cuerpo pierde de forma natural fuerza muscular, equilibrio y densidad ósea. Si no se trabaja, esta pérdida se acelera y aparecen los problemas que todos tememos: caídas, pérdida de autonomía, miedo a salir de casa, dependencia.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            La buena noticia es que el ejercicio adaptado <strong className="text-[rgb(0,94,184)]">revierte muchos de esos efectos</strong> a cualquier edad. No hace falta ir a un gimnasio, ni tener equipamiento, ni recorrer medio Madrid. Con un profesional titulado que vaya a tu casa y diseñe un programa específico, se pueden conseguir mejoras medibles en pocas semanas.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            En ANTEA Salud llevamos <strong>14 años trabajando exclusivamente con personas mayores</strong> en Madrid. Sabemos cómo abordar las limitaciones reales de cada persona, cómo motivar sin forzar, y cómo adaptar cada ejercicio a lo que el cuerpo pide ese día.
          </p>
        </div>
      </section>

      {/* Beneficios */}
      <section className="w-full bg-[rgb(232,237,238)] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
              Beneficios reales del ejercicio a domicilio
            </h2>
            <p className="text-lg text-[rgb(130,131,130)] max-w-2xl mx-auto">
              Lo que verás en tu familiar (o en ti mismo) tras las primeras semanas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Dumbbell />}
              title="Más fuerza en las piernas"
              description="Levantarse del sofá, subir escaleras, caminar sin cansancio. La fuerza en piernas es el primer pilar que trabajamos."
            />
            <BenefitCard
              icon={<ShieldCheck />}
              title="Menos riesgo de caídas"
              description="Trabajamos equilibrio dinámico, reflejos y confianza al caminar. El 70% de nuestros clientes reducen su miedo a caer en 6 semanas."
            />
            <BenefitCard
              icon={<HeartPulse />}
              title="Mejor salud cardiovascular"
              description="Ejercicio aeróbico suave adaptado a cada persona. Mejora la circulación, la tensión arterial y el sueño."
            />
            <BenefitCard
              icon={<TrendingUp />}
              title="Recuperación de autonomía"
              description="Vestirse, ducharse, cocinar. Las actividades básicas de la vida diaria mejoran con ejercicio específico."
            />
            <BenefitCard
              icon={<Home />}
              title="Sin desplazamientos"
              description="Voy yo a tu casa. Sin traslados, sin esperas, sin estrés. Aprovechamos el entorno habitual de la persona."
            />
            <BenefitCard
              icon={<Clock />}
              title="Resultados en 4-6 semanas"
              description="No son promesas mágicas. Con 2 sesiones por semana, la mayoría nota mejoras claras en menos de un mes y medio."
            />
          </div>
        </div>
      </section>

      {/* Qué trabajamos exactamente */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] mb-8">
            ¿Qué tipo de ejercicios hacemos con personas mayores?
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Cada sesión de 30 minutos combina varios bloques pensados para abordar las debilidades más importantes que aparecen con la edad:
            </p>
            <ul className="space-y-4 pl-4">
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[rgb(31,41,51)]">Fuerza funcional.</strong> Sentadillas adaptadas, levantarse de la silla, elevaciones de talones. Ejercicios que replican los movimientos del día a día.
                </div>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[rgb(31,41,51)]">Equilibrio.</strong> Apoyos sobre una pierna, caminar en línea, giros controlados. La base para prevenir caídas.
                </div>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[rgb(31,41,51)]">Movilidad articular.</strong> Estiramientos guiados para cadera, hombros y columna. Recupera rango de movimiento perdido.
                </div>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[rgb(31,41,51)]">Coordinación.</strong> Ejercicios que combinan movimiento y atención. Mejoran los reflejos y previenen tropiezos.
                </div>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[rgb(31,41,51)]">Trabajo cardiovascular suave.</strong> Adaptado a cada persona. Mejora el corazón sin pasarse.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* A quién va dirigido */}
      <section className="w-full bg-[rgb(232,237,238)] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] mb-6">
            ¿A quién va dirigido este servicio?
          </h2>
          <div className="bg-white rounded-3xl shadow-md border border-[rgb(200,207,210)] p-8 md:p-10 space-y-5">
            <ItemRow text="Personas mayores de 60 años que quieren mantenerse activas y prevenir el deterioro" />
            <ItemRow text="Tras una operación de cadera, rodilla u otra cirugía, una vez dada el alta médica" />
            <ItemRow text="Después de una caída, para recuperar la confianza y evitar la siguiente" />
            <ItemRow text="Personas con artrosis, osteoporosis o dolores articulares crónicos" />
            <ItemRow text="Familias preocupadas por la pérdida de movilidad de un padre o madre" />
            <ItemRow text="Mayores que han dejado de salir de casa y han perdido fuerza" />
            <ItemRow text="Cualquier persona mayor que quiera ganar calidad de vida desde su salón" />
          </div>
          <p className="text-center text-sm text-[rgb(130,131,130)] mt-6">
            Si tienes dudas sobre si tu caso encaja, la primera valoración es gratuita y te lo confirmamos sin compromiso.
          </p>
        </div>
      </section>

      <LandingCTA
        title="Recupera la fuerza y la autonomía desde casa"
        subtitle="Primera valoración gratuita. Sin compromiso. Respuesta en menos de 24 horas."
        related={[
          { href: '/prevencion-caidas-mayores-madrid', label: 'Prevención de caídas' },
          { href: '/recuperar-autonomia-mayores-madrid', label: 'Recuperar autonomía' },
          { href: '/ejercicio-mayores-madrid-capital', label: 'Madrid capital' },
        ]}
      />
    </>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[rgb(200,207,210)] hover:shadow-lg hover:border-[rgb(0,94,184)] transition">
      <div className="w-12 h-12 rounded-xl bg-[rgb(191,231,249)] flex items-center justify-center text-[rgb(0,94,184)] mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[rgb(31,41,51)] mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function ItemRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-[rgb(191,231,249)] flex items-center justify-center flex-shrink-0">
        <Users className="w-4 h-4 text-[rgb(0,94,184)]" />
      </div>
      <p className="text-[rgb(31,41,51)] pt-1">{text}</p>
    </div>
  );
}
