import type { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingCTA from '@/components/landing/LandingCTA';
import { Check, ShieldCheck, AlertTriangle, TrendingDown, Activity } from 'lucide-react';

const TITLE = 'Prevención de Caídas en Personas Mayores a Domicilio en Madrid | ANTEA Salud';
const DESCRIPTION =
  'Programa de prevención de caídas para personas mayores en Madrid. Ejercicio específico de equilibrio, fuerza y coordinación en tu casa. Entrenador titulado con 14 años de experiencia. Valoración gratuita.';
const URL = 'https://www.anteasalud.com/prevencion-caidas-mayores-madrid';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'prevención caídas mayores Madrid, ejercicios prevenir caídas, miedo a caer mayores, equilibrio personas mayores, reducir riesgo caídas en casa, ejercicios equilibrio mayores',
  alternates: { canonical: URL },
  openGraph: { type: 'article', url: URL, title: TITLE, description: DESCRIPTION, images: ['/og-image.jpg'] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Prevención de caídas en personas mayores',
  provider: {
    '@type': 'LocalBusiness',
    name: 'ANTEA Salud',
    telephone: '+34633261963',
    url: 'https://www.anteasalud.com',
  },
  areaServed: { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
  description: DESCRIPTION,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <LandingHero
        badge="Especialistas en equilibrio y prevención"
        h1="Prevención de caídas en personas mayores"
        h1Highlight="a domicilio en Madrid"
        subtitle="Una caída a los 70-80 años puede cambiar una vida entera. Con ejercicio específico de fuerza y equilibrio podemos reducir drásticamente el riesgo. Programa personalizado en tu casa, diseñado por un entrenador titulado."
      />

      {/* El problema real */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
            Las caídas son la primera causa de pérdida de autonomía
          </h2>
          <div className="grid md:grid-cols-3 gap-6 my-10">
            <StatCard number="1 de cada 3" label="mayores de 65 sufre una caída al año" />
            <StatCard number="30%" label="de las caídas provocan lesión grave" />
            <StatCard number="50%" label="de las personas con fractura de cadera pierde autonomía" />
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            Y lo más frustrante: la mayoría son <strong className="text-[rgb(0,94,184)]">prevenibles con ejercicio específico</strong>. El problema es que nadie trabaja esos aspectos concretos en una clase genérica de gimnasio. Hace falta un plan diseñado para tu situación real.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Tras 14 años entrenando exclusivamente a personas mayores, sabemos qué ejercicios mueven la aguja y cuáles son marketing. La prevención de caídas requiere trabajar simultáneamente <strong>fuerza en piernas</strong>, <strong>equilibrio dinámico</strong>, <strong>tiempo de reacción</strong> y <strong>confianza psicológica</strong> al caminar.
          </p>
        </div>
      </section>

      {/* Cómo lo trabajamos */}
      <section className="w-full bg-[rgb(232,237,238)] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
              Cómo abordamos la prevención de caídas
            </h2>
            <p className="text-lg text-[rgb(130,131,130)]">
              4 pilares que trabajamos en cada sesión
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PillarCard
              icon={<Activity />}
              title="1. Fuerza en piernas y glúteos"
              description="Sentadillas adaptadas, trabajo de tobillo y cadera. La fuerza en tren inferior es el factor que más correlaciona con no caerse."
            />
            <PillarCard
              icon={<ShieldCheck />}
              title="2. Equilibrio estático y dinámico"
              description="Ejercicios sobre una pierna, caminar en línea recta, giros controlados. Entrenamos el sistema propioceptivo."
            />
            <PillarCard
              icon={<TrendingDown />}
              title="3. Reacción ante tropiezos"
              description="Simulacros controlados de desestabilización. Cuando el cuerpo ha practicado, reacciona mejor en situaciones reales."
            />
            <PillarCard
              icon={<AlertTriangle />}
              title="4. Seguridad del entorno"
              description="Revisamos alfombras, iluminación, pasamanos, sillas. Reducir los riesgos físicos de la casa es parte del programa."
            />
          </div>
        </div>
      </section>

      {/* Señales de alerta */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] mb-6">
            Señales de que tu familiar necesita prevención de caídas
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Si reconoces 2 o más de estas situaciones, es momento de actuar antes de que ocurra algo serio:
          </p>
          <div className="bg-orange-50 border-2 border-orange-200 rounded-3xl p-8 space-y-3">
            <AlertItem text="Le cuesta levantarse del sofá sin ayuda" />
            <AlertItem text="Ha tenido una caída en el último año (aunque fuera sin consecuencias)" />
            <AlertItem text="Se apoya en muebles o paredes al caminar por casa" />
            <AlertItem text="Ha dejado de salir porque tiene miedo" />
            <AlertItem text="Arrastra los pies al caminar" />
            <AlertItem text="Tarda más de lo normal en subir escaleras" />
            <AlertItem text="Ha notado pérdida de fuerza en las piernas en los últimos meses" />
          </div>
        </div>
      </section>

      <LandingCTA
        title="Actuar ahora evita un drama después"
        subtitle="La diferencia entre envejecer con autonomía o no suele estar en actuar a tiempo. Valoración gratuita en tu casa, sin compromiso."
        related={[
          { href: '/ejercicio-personas-mayores-madrid', label: 'Ejercicio para mayores' },
          { href: '/recuperar-autonomia-mayores-madrid', label: 'Recuperar autonomía' },
          { href: '/ejercicio-mayores-madrid-capital', label: 'Madrid capital' },
        ]}
      />
    </>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-gradient-to-br from-[rgb(191,231,249)] to-[rgb(232,237,238)] rounded-2xl p-6 text-center border border-[rgb(0,94,184)]/20">
      <div className="text-4xl font-black text-[rgb(0,94,184)] mb-2">{number}</div>
      <p className="text-sm text-[rgb(31,41,51)]">{label}</p>
    </div>
  );
}

function PillarCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[rgb(200,207,210)]">
      <div className="w-12 h-12 rounded-xl bg-[rgb(0,94,184)] flex items-center justify-center text-white mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[rgb(31,41,51)] mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function AlertItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
      <p className="text-[rgb(31,41,51)]">{text}</p>
    </div>
  );
}
