import type { Metadata } from 'next';
import LandingHero from '@/components/landing/LandingHero';
import LandingCTA from '@/components/landing/LandingCTA';
import { Check, Dumbbell, HeartPulse, ShieldCheck, TrendingUp, Users, Home, Clock } from 'lucide-react';
import { SITE_URL, buildMetadata, buildServiceSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { LandingArticles } from '@/components/landing/LandingSections';

const URL = `${SITE_URL}/ejercicio-personas-mayores-madrid`;
const DESCRIPTION =
  'Programa de fuerza, equilibrio y movilidad a domicilio para mayores en toda la Comunidad de Madrid. Graduado en CCAFYD. Valoración gratuita.';

// Revalida para incluir artículos nuevos en «Guías para familias»
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Ejercicio para personas mayores en la Comunidad de Madrid',
  description: DESCRIPTION,
  path: '/ejercicio-personas-mayores-madrid',
});

const jsonLd = buildServiceSchema({
  name: 'Ejercicio adaptado para personas mayores a domicilio',
  description: DESCRIPTION,
  path: '/ejercicio-personas-mayores-madrid',
  areaServed: ['Madrid', 'Comunidad de Madrid'],
});


export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: SITE_URL },
        { name: 'Ejercicio para personas mayores en Madrid', url: URL },
      ]} />

      <LandingHero
        badge="Graduado en CCAFYD · Especializado en personas mayores"
        h1="Ejercicio para personas mayores a domicilio"
        h1Highlight="en Madrid"
        subtitle="Recupera fuerza, equilibrio y autonomía con un entrenador titulado que va a tu casa. Sesiones personalizadas, adaptadas a cada edad y condición física. Primera valoración gratuita y sin compromiso."
        origen="Landing · Ejercicio personas mayores Madrid"
      />

      {/* Introducción */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-[#17372b]">
            El ejercicio es la herramienta más potente contra el envejecimiento
          </h2>
          <p className="text-lg text-[#4a6358] leading-relaxed">
            A partir de los 60 años, el cuerpo pierde de forma natural fuerza muscular, equilibrio y densidad ósea. Si no se trabaja, esta pérdida se acelera y aparecen los problemas que todos tememos: caídas, pérdida de autonomía, miedo a salir de casa, dependencia.
          </p>
          <p className="text-lg text-[#4a6358] leading-relaxed">
            La buena noticia es que el ejercicio adaptado <strong className="text-[#2d6a4f]">revierte muchos de esos efectos</strong> a cualquier edad. No hace falta ir a un gimnasio, ni tener equipamiento, ni recorrer medio Madrid. Con un profesional titulado que vaya a tu casa y diseñe un programa específico, se pueden conseguir mejoras medibles en pocas semanas.
          </p>
          <p className="text-lg text-[#4a6358] leading-relaxed">
            En ANTEA Salud llevamos <strong>14 años de experiencia como entrenadores a domicilio, especializados en personas mayores</strong> en Madrid. Sabemos cómo abordar las limitaciones reales de cada persona, cómo motivar sin forzar, y cómo adaptar cada ejercicio a lo que el cuerpo pide ese día.
          </p>
        </div>
      </section>

      {/* Beneficios */}
      <section className="w-full bg-[#eef5f0] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#17372b]">
              Beneficios reales del ejercicio a domicilio
            </h2>
            <p className="text-lg text-[#4a6358] max-w-2xl mx-auto">
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
          <h2 className="text-3xl md:text-4xl font-black text-[#17372b] mb-8">
            ¿Qué tipo de ejercicios hacemos con personas mayores?
          </h2>
          <div className="space-y-6 text-lg text-[#4a6358] leading-relaxed">
            <p>
              Cada sesión de 30 minutos combina varios bloques pensados para abordar las debilidades más importantes que aparecen con la edad:
            </p>
            <ul className="space-y-4 pl-4">
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[#2d6a4f] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#17372b]">Fuerza funcional.</strong> Sentadillas adaptadas, levantarse de la silla, elevaciones de talones. Ejercicios que replican los movimientos del día a día.
                </div>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[#2d6a4f] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#17372b]">Equilibrio.</strong> Apoyos sobre una pierna, caminar en línea, giros controlados. La base para prevenir caídas.
                </div>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[#2d6a4f] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#17372b]">Movilidad articular.</strong> Estiramientos guiados para cadera, hombros y columna. Recupera rango de movimiento perdido.
                </div>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[#2d6a4f] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#17372b]">Coordinación.</strong> Ejercicios que combinan movimiento y atención. Mejoran los reflejos y previenen tropiezos.
                </div>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-[#2d6a4f] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-[#17372b]">Trabajo cardiovascular suave.</strong> Adaptado a cada persona. Mejora el corazón sin pasarse.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Historia de caso real */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <span className="inline-block px-4 py-1.5 bg-[#dcebe2] rounded-full text-sm font-semibold text-[#2d6a4f]">
              Una historia real
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#17372b]">
              Concha, 82 años: recuperar la fuerza cuando parecía tarde
            </h2>
          </div>

          <div className="bg-[#fbfcf8] rounded-3xl p-8 md:p-12 border border-[#eef5f0] space-y-5 text-lg text-[#4a6358] leading-relaxed">
            <p>
              Cuando conocí a Concha, en su casa del barrio de Pacífico, llevaba meses arrastrando una parestesia en la pierna izquierda: hormigueo y pérdida de sensibilidad que convertían gestos tan simples como levantarse de la silla o cruzar el pasillo en un pequeño reto cada vez. Es una mujer menuda, de poca masa muscular, y cada movimiento le costaba. Pero lo que más la frenaba no era el cuerpo: era el miedo. El miedo a fallar, a caerse, a no poder.
            </p>
            <p>
              En la primera valoración lo vimos claro: faltaba <strong className="text-[#2d6a4f]">fuerza</strong>. Y sin fuerza no hay estabilidad, ni equilibrio, ni confianza. No había que «cuidarla» ni dejarla quieta —eso solo acelera la pérdida—. Había que entrenarla. Diseñé un programa centrado en ejercicios de fuerza adaptados a su condición: levantarse de la silla con apoyo, elevaciones de talones, trabajo de tren inferior muy progresivo, respetando siempre sus sensaciones y sin prisa.
            </p>
            <p>
              Las primeras semanas fueron de adaptación. Concha desconfiaba de su propia pierna. Pero sesión a sesión, el cuerpo respondía. Empezó a levantarse con menos esfuerzo. A moverse por casa con más seguridad. A no pensar en cada paso.
            </p>
            <p>
              El trabajo sigue —la fuerza no se gana en un día, se construye— pero la dirección es inequívoca: Concha gana movilidad y autonomía cada semana. Su caso es el mejor recordatorio de lo que repito en cada casa a la que entro: <strong className="text-[#17372b]">la fuerza se entrena a cualquier edad, y nunca es demasiado tarde para empezar.</strong>
            </p>
            <p className="text-base text-[#4a6358] pt-2 border-t border-[#eef5f0]">
              — Fernando Royano, Graduado en Ciencias de la Actividad Física y del Deporte (CCAFYD)
            </p>
          </div>
        </div>
      </section>

      {/* A quién va dirigido */}
      <section className="w-full bg-[#eef5f0] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#17372b] mb-6">
            ¿A quién va dirigido este servicio?
          </h2>
          <div className="bg-white rounded-3xl shadow-md border border-[#cfe0d6] p-8 md:p-10 space-y-5">
            <ItemRow text="Personas mayores de 60 años que quieren mantenerse activas y prevenir el deterioro" />
            <ItemRow text="Tras una operación de cadera, rodilla u otra cirugía, una vez dada el alta médica" />
            <ItemRow text="Después de una caída, para recuperar la confianza y evitar la siguiente" />
            <ItemRow text="Personas con artrosis, osteoporosis o dolores articulares crónicos" />
            <ItemRow text="Familias preocupadas por la pérdida de movilidad de un padre o madre" />
            <ItemRow text="Mayores que han dejado de salir de casa y han perdido fuerza" />
            <ItemRow text="Cualquier persona mayor que quiera ganar calidad de vida desde su salón" />
          </div>
          <p className="text-center text-sm text-[#4a6358] mt-6">
            Si tienes dudas sobre si tu caso encaja, la primera valoración es gratuita y te lo confirmamos sin compromiso.
          </p>
        </div>
      </section>

      <LandingArticles title="Guías sobre ejercicio en personas mayores" topics={/fuerza|domicilio|fragilidad|valoraci|levantarse/i} />

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
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[#cfe0d6] hover:shadow-lg hover:border-[#2d6a4f] transition">
      <div className="w-12 h-12 rounded-xl bg-[#dcebe2] flex items-center justify-center text-[#2d6a4f] mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#17372b] mb-2">{title}</h3>
      <p className="text-sm text-[#4a6358] leading-relaxed">{description}</p>
    </div>
  );
}

function ItemRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-[#dcebe2] flex items-center justify-center flex-shrink-0">
        <Users className="w-4 h-4 text-[#2d6a4f]" />
      </div>
      <p className="text-[#17372b] pt-1">{text}</p>
    </div>
  );
}
