import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Clock, HeartPulse, Home, ShieldCheck } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import LandingCTA from '@/components/landing/LandingCTA';
import { SITE_URL, buildMetadata, buildServiceSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { LandingArticles } from '@/components/landing/LandingSections';

const URL = `${SITE_URL}/valoracion-gratuita`;
const DESCRIPTION =
  'Primera valoración gratuita en casa: equilibrio, marcha y fuerza de tu familiar, con un plan claro y sin compromiso. Respuesta en menos de 24 h.';

// Revalida para incluir artículos nuevos en «Guías para familias»
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Valoración funcional gratuita a domicilio en Madrid',
  description: DESCRIPTION,
  path: '/valoracion-gratuita',
});

const jsonLd = buildServiceSchema({
  name: 'Valoración funcional gratuita a domicilio',
  description: DESCRIPTION,
  path: '/valoracion-gratuita',
  areaServed: ['Madrid', 'Comunidad de Madrid'],
});


const incluye = [
  {
    icon: HeartPulse,
    title: 'Valoración de cómo se mueve',
    text: 'Fuerza, equilibrio, movilidad y resistencia. Identificamos puntos fuertes y áreas a trabajar.',
  },
  {
    icon: ShieldCheck,
    title: 'Análisis del riesgo de caídas',
    text: 'Observamos el equilibrio y la marcha, y preguntamos por caídas previas y dificultades cotidianas.',
  },
  {
    icon: Home,
    title: 'Revisión del entorno',
    text: 'Revisamos el espacio, los apoyos y los obstáculos para adaptar el ejercicio y reducir riesgos.',
  },
  {
    icon: Clock,
    title: 'Plan personalizado sin compromiso',
    text: 'Explicamos los objetivos, la frecuencia y el precio antes de que decidáis si queréis continuar.',
  },
];

const faqs = [
  {
    q: '¿Es realmente gratis y sin compromiso?',
    a: 'Sí. La primera valoración a domicilio en Madrid es gratuita y sin ningún compromiso de contratación. Si después decides no continuar, no pasa nada.',
  },
  {
    q: '¿Cuánto dura la valoración?',
    a: 'Habitualmente dura entre 45 y 60 minutos. En algunos casos puede durar unos 30 minutos, según el perfil y la tolerancia de la persona. Adaptamos la visita y las pruebas; no hay que completar una duración fija si tu familiar no la tolera.',
  },
  {
    q: '¿En qué zonas hacéis la valoración a domicilio?',
    a: 'Madrid capital y municipios de la Comunidad de Madrid, según disponibilidad. La primera valoración es gratuita. Para las sesiones de ejercicio posteriores, fuera de Madrid capital se añaden 10 € por sesión de desplazamiento; lo aclaramos antes de contratar.',
  },
  {
    q: '¿Quién hace la valoración?',
    a: 'Fernando Royano, Graduado en Ciencias de la Actividad Física y del Deporte (CCAFYD) con 14 años como entrenador personal a domicilio, especializado en personas mayores.',
  },
  {
    q: '¿La valoración incluye un diagnóstico médico?',
    a: 'No. Es una valoración funcional para orientar el ejercicio: cómo se levanta, camina o mantiene el equilibrio y qué dificultades encuentra. No diagnostica enfermedades ni sustituye al médico o al fisioterapeuta.',
  },
  {
    q: '¿Cuándo decidimos si contratar?',
    a: 'Después de conocer los resultados y la propuesta de trabajo, con los objetivos, la frecuencia y el precio explicados. Podéis pensarlo y hablarlo en familia. La visita gratuita no os obliga a contratar ni confirma automáticamente sesiones de pago.',
  },
  {
    q: '¿Cómo recibimos los resultados?',
    a: 'Realizo la valoración y envío el resultado digitalmente al familiar de referencia, de acuerdo con la persona valorada. Compartimos el punto de partida y la propuesta para que podáis tomar una decisión informada.',
  },
];

const visitSteps = [
  ['Conocemos a tu familiar', 'Antes de la visita acordamos el domicilio y el horario. En casa hablamos con la persona y, si lo desea, con su familia: qué le cuesta, qué quiere mantener o recuperar y qué indicaciones sanitarias hay que respetar.'],
  ['Valoramos su punto de partida', 'Observamos tareas como levantarse de una silla, caminar o mantener el equilibrio. Elegimos las pruebas que puede realizar y revisamos el entorno; no se fuerza una prueba que no resulte adecuada.'],
  ['Os explicamos los resultados', 'Comentamos qué capacidades conserva, dónde encuentra más dificultad y qué conviene priorizar. Envío la valoración digitalmente al familiar de referencia, de acuerdo con la persona valorada. Relacionamos lo observado con su vida diaria.'],
  ['Proponemos cómo trabajar', 'Planteamos objetivos concretos, ejercicios adaptados y una frecuencia de sesiones, explicando el precio y las condiciones. Si antes necesita valoración sanitaria o un apoyo distinto, lo hablamos con vosotros.'],
  ['Decidís si queréis empezar', 'Con esa información, tu familiar y vosotros decidís. Podéis tomaros tiempo para pensarlo. Solo se acuerdan sesiones de pago cuando aceptáis la propuesta y concretamos la organización.'],
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function ValoracionGratuitaPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqSchema} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: SITE_URL },
        { name: 'Valoración gratuita', url: URL },
      ]} />

      {/* HERO + FORMULARIO */}
      <section className="relative w-full bg-gradient-to-br from-[#dcebe2] via-white to-[#eef5f0] px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#dcebe2] rounded-full">
              <Check className="w-4 h-4 text-[#2d6a4f]" />
              <span className="text-sm font-semibold text-[#2d6a4f]">
                100% gratis · Sin compromiso · A domicilio
              </span>
            </div>

            <h1 className="font-display text-fluid-5xl font-black tracking-tight text-[#17372b] leading-[1.1]">
              Valoración gratuita
              <span className="block text-[#2d6a4f] mt-2">para mayores en Madrid</span>
            </h1>

            <p className="text-lg md:text-xl text-[#4a6358] leading-relaxed">
              Voy a casa de tu familiar, valoro cómo se mueve y os explico qué trabajo de ejercicio puede tener sentido. Después, con la propuesta y el precio claros, decidís si queréis empezar.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                'Visita gratis a domicilio en Madrid',
                'Valoración de fuerza, equilibrio y marcha',
                'Resultados explicados y propuesta de trabajo',
                '14 años como entrenador, especializado en mayores',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#2d6a4f] mt-0.5 flex-shrink-0" />
                  <span className="text-[#3b5a4e]">{item}</span>
                </li>
              ))}
            </ul>
            <a href="#como-trabajo" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Así es la visita, paso a paso ↓</a>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-display text-fluid-3xl font-black text-[#17372b]">
              ¿Qué incluye la valoración gratuita?
            </h2>
            <p className="text-lg text-[#4a6358] max-w-3xl mx-auto">
              Una visita a domicilio para conocer a la persona, valorar su capacidad de movimiento y explicar las opciones de ejercicio antes de tomar una decisión.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {incluye.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-[#fbfcf8] rounded-2xl p-6 border border-[#eef5f0]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#dcebe2] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#2d6a4f]" />
                </div>
                <h3 className="text-lg font-bold text-[#17372b] mb-2">{title}</h3>
                <p className="text-[#4a6358] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-trabajo" className="bg-primary-50 px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold text-primary">De la primera visita a vuestra decisión</p>
          <h2 className="mt-4 font-display text-fluid-3xl font-bold text-primary-dark">Así trabajo con tu familiar</h2>
          <ol className="mt-10 divide-y divide-primary/20 border-y border-primary/20">{visitSteps.map(([title, text], index) => <li key={title} className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6"><span className="font-display text-3xl font-bold text-primary" aria-hidden="true">0{index + 1}</span><div><h3 className="font-display text-fluid-xl font-bold text-primary-dark">{title}</h3><p className="mt-3 max-w-[65ch] text-fluid-lg text-muted">{text}</p></div></li>)}</ol>
        </div>
      </section>

      <section id="vivifrail" className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-fluid-3xl font-bold text-primary-dark">En qué me baso para valorar y elegir el ejercicio</h2>
          <p className="mt-6 max-w-[65ch] text-fluid-lg text-muted">Combino pruebas de función física con lo que me cuenta la persona: caídas previas, molestias, limitaciones, preferencias y tareas que quiere seguir haciendo. También tengo en cuenta las indicaciones de su equipo sanitario y las condiciones de su domicilio.</p>
          <h3 className="mt-9 font-display text-fluid-2xl font-bold text-primary-dark">¿Qué es Vivifrail?</h3>
          <p className="mt-4 max-w-[65ch] text-fluid-lg text-muted">Vivifrail es un programa de ejercicio multicomponente orientado a la prevención de la fragilidad y las caídas en personas mayores. Relaciona el nivel de capacidad funcional y el riesgo de caídas con una propuesta de ejercicio adaptada.</p>
          <p className="mt-4 max-w-[65ch] text-fluid-lg text-muted">Lo utilizo como marco de referencia, junto con mi criterio profesional y vuestra situación. Ayuda a orientar el trabajo de fuerza, equilibrio, marcha, resistencia y flexibilidad; el programa se ajusta a la persona y a su evolución.</p>
          <h3 className="mt-9 font-display text-fluid-2xl font-bold text-primary-dark">¿Qué pruebas puede incluir la valoración?</h3>
          <p className="mt-4 max-w-[65ch] text-fluid-lg text-muted">Cuando procede, utilizo la SPPB: una batería breve que observa el equilibrio de pie, la marcha en un recorrido corto y la capacidad de levantarse de una silla. La velocidad de marcha puede aportar otra referencia si la batería completa no es viable. Selecciono las pruebas según la capacidad y las condiciones de cada persona.</p>
          <p className="mt-4 max-w-[65ch] text-fluid-lg text-muted">Los resultados sirven para elegir el punto de partida y comparar la evolución en futuras valoraciones. Se interpretan junto con el resto de la información; una puntuación aislada no explica por sí sola toda la situación.</p>
          <p className="mt-6 text-base text-muted">Puedes consultar los <a href="https://vivifrail.com/es/documentacion/" className="font-semibold text-primary underline underline-offset-4">materiales oficiales de Vivifrail</a> y nuestra <Link href="/articulos/sppb-que-es-valoracion-personas-mayores" className="font-semibold text-primary underline underline-offset-4">explicación de la SPPB para familias</Link>.</p>
          <aside className="mt-8 rounded-2xl border border-primary/20 bg-primary-50 p-6 text-muted"><strong className="text-ink">El alcance de la valoración.</strong> Valoro la capacidad funcional para orientar el ejercicio. Las enfermedades, los síntomas nuevos y las decisiones clínicas corresponden al equipo sanitario. Las pruebas no se utilizan para diagnosticar enfermedades ni para modificar tratamientos.</aside>
        </div>
      </section>

      <section id="decision" className="bg-primary-dark px-5 py-14 text-white sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-fluid-3xl font-bold">Primero entendéis la propuesta. Después decidís.</h2>
          <p className="mt-5 max-w-[65ch] text-fluid-lg text-white/90">La visita es gratuita aunque decidáis no continuar. Antes de contratar hablamos de objetivos, frecuencia, precio y disponibilidad. No tenéis que decidir durante la visita.</p>
          <p className="mt-4 max-w-[65ch] text-fluid-lg text-white/90">Si empezamos, adapto las sesiones a cómo se encuentra tu familiar, revisamos la evolución y os explico los ajustes. La información se comparte con la familia de acuerdo con la persona.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[#fbfcf8] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-fluid-3xl font-black text-[#17372b] text-center mb-12">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white rounded-2xl p-6 border border-[#eef5f0] hover:border-[#2d6a4f] transition"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-bold text-[#17372b] pr-4">{q}</span>
                  <span className="text-[#2d6a4f] text-2xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[#4a6358] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LandingArticles title="Qué valoramos y por qué" topics={/valoraci|sppb|tests|fragilidad/i} />

      <LandingCTA
        title="¿Listo para empezar?"
        subtitle="Solicita una visita gratuita para conocer el punto de partida de tu familiar. Después de explicaros los resultados y la propuesta, decidís si queréis continuar."
        related={[
          { href: '/ejercicio-personas-mayores-madrid', label: 'Ejercicio para personas mayores en Madrid' },
          { href: '/prevencion-caidas-mayores-madrid', label: 'Prevención de caídas' },
          { href: '/recuperar-autonomia-mayores-madrid', label: 'Recuperar autonomía' },
        ]}
      />
    </>
  );
}
