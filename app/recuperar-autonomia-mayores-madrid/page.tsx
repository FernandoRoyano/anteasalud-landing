import type { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingCTA from '@/components/landing/LandingCTA';
import { Check } from 'lucide-react';

const TITLE = 'Recuperar la Autonomía de Personas Mayores a Domicilio en Madrid | ANTEA Salud';
const DESCRIPTION =
  'Ayudamos a personas mayores a recuperar su autonomía con un programa de ejercicio funcional a domicilio en Madrid. Entrenador titulado con 14 años de experiencia. Primera valoración gratuita.';
const URL = 'https://www.anteasalud.com/recuperar-autonomia-mayores-madrid';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'recuperar autonomía mayores, autonomía personas mayores Madrid, ejercicio después de operación cadera, recuperación funcional mayores, readaptación a domicilio, ejercicio post hospitalización',
  alternates: { canonical: URL },
  openGraph: { type: 'article', url: URL, title: TITLE, description: DESCRIPTION, images: ['/og-image.jpg'] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Recuperación de autonomía funcional en personas mayores',
  provider: { '@type': 'LocalBusiness', name: 'ANTEA Salud', telephone: '+34633261963', url: 'https://www.anteasalud.com' },
  areaServed: { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
  description: DESCRIPTION,
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <LandingHero
        badge="Readaptación funcional · 14 años de experiencia"
        h1="Recupera tu autonomía desde casa"
        h1Highlight="con ejercicio adaptado"
        subtitle="Tras una operación, una caída o una pérdida progresiva de fuerza, recuperar la autonomía es posible con un programa de ejercicio específico. Te acompaño en tu casa, con un plan diseñado para tu situación real."
      />

      {/* Qué es autonomía y por qué importa */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
            ¿Qué significa realmente &quot;recuperar la autonomía&quot;?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            No hablamos de correr maratones ni de levantar pesas. Hablamos de las cosas del día a día que dan dignidad y calidad de vida: <strong className="text-[rgb(0,94,184)]">levantarse del sillón sin ayuda, ducharse sin miedo, vestirse, salir al supermercado, cocinar, jugar con los nietos</strong>.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Cuando se pierden estas capacidades, la vida cambia de golpe: hay que depender de otros, aparece la tristeza, el aislamiento, la frustración. Y muchas veces, <strong>el deterioro se acelera</strong> porque la falta de movimiento empeora aún más la condición física.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            La buena noticia es que <strong>la mayoría de estas funciones se pueden recuperar</strong> con trabajo específico. He visto a personas de 85 años volver a salir a la calle solas tras 3 meses de trabajo. No es magia: es un plan bien hecho, constante, adaptado y con un profesional que sabe lo que hace.
          </p>
        </div>
      </section>

      {/* Casos típicos */}
      <section className="w-full bg-[rgb(232,237,238)] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] text-center mb-12">
            Casos habituales con los que trabajamos
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <CaseCard
              title="Después de una operación de cadera o rodilla"
              description="Cuando el fisio del hospital da el alta, queda un vacío. El ejercicio tras la fase de rehabilitación es lo que marca la diferencia entre recuperarse al 100% o quedarse a medias. Coordinado con tu fisio o médico si hace falta."
            />
            <CaseCard
              title="Tras una caída"
              description="Una caída no solo deja secuelas físicas: deja miedo. Trabajamos primero la confianza, luego la fuerza, luego la capacidad de volver a hacer vida normal. En 6-8 semanas la mayoría recupera la seguridad perdida."
            />
            <CaseCard
              title="Pérdida progresiva de fuerza"
              description="Si han pasado los años y la persona ha ido dejando de moverse, hay un deterioro que se puede revertir. Empezamos despacio, con ejercicios muy básicos, y vamos construyendo fuerza mes a mes."
            />
            <CaseCard
              title="Salida de hospitalización larga"
              description="Tras una estancia larga en hospital o encamado, el cuerpo pierde mucha masa muscular en pocas semanas. El retorno a la actividad necesita un plan específico para no pasarse ni quedarse corto."
            />
            <CaseCard
              title="Artrosis avanzada"
              description="El ejercicio adaptado reduce el dolor crónico y mejora la movilidad de las articulaciones. Trabajamos rangos seguros, cargas progresivas y patrones que alivian la vida diaria."
            />
            <CaseCard
              title="Vuelta a la actividad tras diagnóstico"
              description="Tras un diagnóstico (diabetes, cardiopatía, Parkinson inicial...), el ejercicio supervisado forma parte del tratamiento. Lo diseñamos con cabeza y en coordinación con tu médico."
            />
          </div>
        </div>
      </section>

      <LandingCTA
        title="Recupera lo que parecía perdido"
        subtitle="Cada caso es único. La primera valoración es gratuita y nos sirve para decirte con sinceridad qué resultados podemos conseguir y en cuánto tiempo."
        related={[
          { href: '/ejercicio-personas-mayores-madrid', label: 'Ejercicio para mayores' },
          { href: '/prevencion-caidas-mayores-madrid', label: 'Prevención de caídas' },
          { href: '/ejercicio-mayores-madrid-capital', label: 'Madrid capital' },
        ]}
      />
    </>
  );
}

function CaseCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[rgb(200,207,210)] hover:shadow-lg transition">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-6 h-6 rounded-full bg-[rgb(0,94,184)] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-bold text-[rgb(31,41,51)]">{title}</h3>
      </div>
      <p className="text-slate-600 leading-relaxed pl-9">{description}</p>
    </div>
  );
}
