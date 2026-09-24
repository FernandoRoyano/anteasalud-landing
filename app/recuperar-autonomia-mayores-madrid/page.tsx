import type { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingCTA from '@/components/landing/LandingCTA';
import { Check } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { SITE_URL, buildMetadata, buildServiceSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { LandingArticles } from '@/components/landing/LandingSections';

const URL = `${SITE_URL}/recuperar-autonomia-mayores-madrid`;
const DESCRIPTION =
  'Ejercicio a domicilio en Madrid para recuperar fuerza y autonomía tras una operación, una fractura o una hospitalización. Valoración gratuita.';

// Revalida para incluir artículos nuevos en «Guías para familias»
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Recuperar la autonomía tras una operación o ingreso',
  description: DESCRIPTION,
  path: '/recuperar-autonomia-mayores-madrid',
});

const jsonLd = buildServiceSchema({
  name: 'Recuperación de autonomía funcional a domicilio',
  description: DESCRIPTION,
  path: '/recuperar-autonomia-mayores-madrid',
  areaServed: ['Madrid', 'Comunidad de Madrid'],
});

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: SITE_URL },
        { name: 'Recuperar autonomía', url: URL },
      ]} />

      <LandingHero
        badge="Readaptación funcional a domicilio"
        h1="Recupera tu autonomía desde casa"
        h1Highlight="con ejercicio adaptado"
        subtitle="Tras una operación, una caída o una pérdida progresiva de fuerza, recuperar la autonomía es posible con un programa de ejercicio específico. Te acompaño en tu casa, con un plan diseñado para tu situación real."
        origen="Landing · Recuperar autonomía Madrid"
      />

      {/* Qué es autonomía y por qué importa */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-[#17372b]">
            ¿Qué significa realmente &quot;recuperar la autonomía&quot;?
          </h2>
          <p className="text-lg text-[#4a6358] leading-relaxed">
            No hablamos de correr maratones ni de levantar pesas. Hablamos de las cosas del día a día que dan dignidad y calidad de vida: <strong className="text-[#2d6a4f]">levantarse del sillón sin ayuda, ducharse sin miedo, vestirse, salir al supermercado, cocinar, jugar con los nietos</strong>.
          </p>
          <p className="text-lg text-[#4a6358] leading-relaxed">
            Cuando se pierden estas capacidades, la vida cambia de golpe: hay que depender de otros, aparece la tristeza, el aislamiento, la frustración. Y muchas veces, <strong>el deterioro se acelera</strong> porque la falta de movimiento empeora aún más la condición física.
          </p>
          <p className="text-lg text-[#4a6358] leading-relaxed">
            La buena noticia es que <strong>la mayoría de estas funciones se pueden recuperar</strong> con trabajo específico. He visto a personas de 85 años volver a salir a la calle solas tras 3 meses de trabajo. No es magia: es un plan bien hecho, constante, adaptado y con un profesional que sabe lo que hace.
          </p>
        </div>
      </section>

      {/* Casos típicos */}
      <section className="w-full bg-[#eef5f0] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#17372b] text-center mb-12">
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

      <LandingArticles title="Guías sobre recuperación" topics={/recuperaci|cadera|fractura|hospital|fisioterap/i} />

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
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[#cfe0d6] hover:shadow-lg transition">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-6 h-6 rounded-full bg-[#2d6a4f] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-bold text-[#17372b]">{title}</h3>
      </div>
      <p className="text-[#4a6358] leading-relaxed pl-9">{description}</p>
    </div>
  );
}
