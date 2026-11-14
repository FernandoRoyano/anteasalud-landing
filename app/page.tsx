import FamilySituations from '@/components/FamilySituations';
import MonthlyPriceEstimate from '@/components/MonthlyPriceEstimate';
import { FamilyGuideLinks } from '@/components/FamilyGuideLinks';
import { PLAN_WEEKLY_PRICE, SINGLE_SESSION_PRICE } from '@/lib/public-pricing';
import SessionConditions from '@/components/SessionConditions';
import AssessmentReportExample from '@/components/AssessmentReportExample';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Check, GraduationCap, MapPin, Clock3 } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import PriceLine from '@/components/PriceLine';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'ANTEA Salud | Entrenador para personas mayores a domicilio en Madrid',
  description:
    'Fuerza, equilibrio y autonomía para tu familiar, en su casa. Entrenador graduado en CCAFYD especializado en mayores. Primera valoración gratuita.',
  path: '/',
  absoluteTitle: true,
  imageAlt: 'Fernando Royano entrenando con un hombre mayor en su casa',
});

const services = [
  ['/ejercicio-personas-mayores-madrid', 'Ejercicio para mayores a domicilio', 'Fuerza, movilidad y resistencia adaptadas a su nivel.'],
  ['/prevencion-caidas-mayores-madrid', 'Prevención de caídas', 'Equilibrio y seguridad al caminar, girar y levantarse.'],
  ['/recuperar-autonomia-mayores-madrid', 'Recuperar autonomía', 'Tras una operación, una hospitalización o una racha de inactividad.'],
] as const;

const steps = [
  ['01', 'Conocemos la situación', 'Hablamos contigo sobre su movilidad, antecedentes y objetivos. Sin formularios interminables.'],
  ['02', 'Valoramos cómo se mueve', 'Visita gratuita en casa: fuerza, equilibrio y marcha, con pruebas funcionales cuando proceda.'],
  ['03', 'Explicamos la propuesta', 'Resultados, objetivos, frecuencia y precio, adaptados a su situación y con Vivifrail como referencia.'],
  ['04', 'Decidís si empezar', 'Con toda la información, tu familiar y vosotros decidís. Sin obligación de contratar ni de decidir durante la visita.'],
] as const;

const faqs = [
  ['¿Cómo se organizan los festivos y las altas a mitad de mes?', 'Los festivos se reprograman para otro día o, a petición del cliente, no se incluyen en el calendario ni en el importe del mes. Si empezáis a mitad de mes, se pagan solo las sesiones previstas desde la incorporación.'],
  ['¿Qué ocurre si cancelo una sesión ya pagada?', 'Si una sesión ya pagada se cancela con el aviso acordado o por una emergencia ajena a la persona, como una enfermedad o un ingreso hospitalario, queda como saldo pendiente y se descuenta del pago del mes siguiente. Como alternativa, podemos acordar recuperarla otro día de la semana si hay disponibilidad del profesional y del cliente.'],
  ['¿Cuándo se pagan las sesiones?', 'El pago se realiza a principio de mes, por las sesiones previstas para ese mes. El importe mensual depende del calendario de sesiones acordado. La primera valoración es gratuita.'],
  ['¿Cómo puedo cambiar o cancelar una sesión?', 'Avísanos el día anterior, con un mínimo de 12 horas de antelación y, si es posible, 24. Si surge una emergencia ajena a la persona, como una enfermedad o un ingreso hospitalario, avísanos cuanto antes. Las cancelaciones fuera de plazo sin causa de emergencia y su posible cobro se valoran caso por caso.'],
  ['¿Es adecuado si lleva mucho tiempo sin hacer ejercicio?', 'Sí. Empezamos desde su nivel actual, incluso si tiene poca movilidad o necesita apoyo. La primera valoración nos permite ajustar cada ejercicio con seguridad.'],
  ['¿Cuánto dura cada sesión?', 'Las sesiones duran entre 30 y 45 minutos, según lo que tolere cada persona. Para muchas personas, 30 minutos son suficientes. Ajustamos la intensidad, las pausas y la duración para evitar un cansancio excesivo que afecte al resto del día.'],
  ['¿Trabajáis después de una operación?', 'Sí, cuando el equipo médico ha indicado que puede comenzar ejercicio. Nos coordinamos con sus recomendaciones y trabajamos la vuelta progresiva a la actividad.'],
  ['¿En qué zonas os desplazáis?', 'Actualmente atendemos solo en Madrid capital, en horario de mañana hasta las 13:00, según disponibilidad.'],
  ['¿Hay permanencia?', 'No. Puedes pausar o reorganizar las sesiones cuando lo necesites. Te recomendaremos una frecuencia, pero la decisión siempre es de la familia.'],
] as const;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

export default function HomePage() {
  return (
    <div className="bg-[#fbfcf8] text-primary-dark">
      <JsonLd data={faqSchema} />
      <section className="px-5 pb-10 pt-28 sm:px-8 sm:pb-16 lg:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          <div className="min-w-0">
            <h1 className="max-w-3xl font-display text-[clamp(2.3rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-.03em] text-primary-dark">Ejercicio para mayores.<span className="block text-primary">En su casa, en Madrid.</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">Fuerza, equilibrio y movilidad para que tu familiar pueda seguir haciendo su vida. Con Fernando Royano, graduado en Ciencias del Deporte y especializado en personas mayores.</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-dark" aria-label="Cobertura y horario">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />Madrid capital</li>
              <li className="flex items-center gap-2"><Clock3 className="h-4 w-4" aria-hidden="true" />Mañanas hasta las 13:00</li>
            </ul>
            <p className="mt-2 text-sm text-muted">Fernando realiza personalmente las visitas, según disponibilidad.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#contacto" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-primary-dark">Solicitar valoración gratuita <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></a>
              <a href="#por-donde-empezar" className="inline-flex min-h-12 items-center justify-center gap-2 px-3 py-3 font-semibold text-primary underline underline-offset-4">No sé por dónde empezar <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" /></a>
            </div>
            <PriceLine compact className="mt-6 border-t border-primary/20 pt-5" />
          </div>
          <figure className="min-w-0"><div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-primary-light lg:aspect-[4/5]"><Image src="/hero-fernando.webp" alt="Fernando Royano acompaña a una persona mayor durante ejercicio adaptado" fill priority sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover" /></div><figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted"><span>Una misma persona, sesión tras sesión.</span><Link href="/sobre-fernando" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Conoce a Fernando</Link></figcaption></figure>
        </div>
      </section>

      <nav aria-label="Accesos rápidos" className="border-t border-primary/15 px-5 sm:px-8"><ul className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-0 py-2 text-sm font-semibold text-primary">{[['#servicios', 'Qué trabajamos'], ['#como-funciona', 'Cómo es una sesión'], ['#precios', 'Calcular el precio'], ['#faqs', 'Dudas frecuentes']].map(([href, label]) => <li key={href}><a href={href} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">{label}</a></li>)}</ul></nav>

      <FamilySituations />

      <section id="servicios" className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl"><h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-tight">Trabajamos lo que necesita en su día a día.</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">Levantarse de una silla, caminar por casa o volver a salir. Elegimos los objetivos con la persona y adaptamos el trabajo a su capacidad.</p>
          <nav aria-label="Servicios" className="mt-8 grid gap-6 border-t border-primary/20 md:grid-cols-3">{services.map(([href, title, text]) => <Link key={href} href={href} className="group border-b border-primary/20 py-6"><h3 className="flex items-start justify-between gap-4 font-display text-xl font-bold">{title}<ArrowUpRightIcon /></h3><p className="mt-3 leading-relaxed text-muted">{text}</p><span className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Conocer el servicio</span></Link>)}</nav>
        </div>
      </section>

      <section id="como-funciona" className="border-y border-primary/15 bg-primary-50 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
          <div><h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-tight">Así es una sesión en casa.</h2><p className="mt-4 text-lg leading-relaxed text-muted">Entre 30 y 45 minutos, según lo que tolere ese día. Para muchas personas, 30 minutos son suficientes: ajustamos el esfuerzo y las pausas.</p><figure className="mt-6"><Image src="/solution.webp" alt="Trabajo de equilibrio adaptado en el domicilio" width={1000} height={800} sizes="(max-width: 1023px) 100vw, 45vw" className="aspect-[5/4] w-full rounded-2xl object-cover" /><figcaption className="mt-3 text-sm text-muted">El espacio y los apoyos se adaptan a la persona.</figcaption></figure></div>
          <div><ol className="divide-y divide-primary/20 border-y border-primary/20">{[
            ['Primero, saber cómo se encuentra', 'Comentamos cómo ha estado y comprobamos qué puede hacer hoy. Ajustamos la sesión si lo necesita.'],
            ['Después, trabajar sus objetivos', 'Fuerza, equilibrio, movilidad o marcha, con apoyos y dificultad adaptados. Practicamos movimientos que le sirven en su vida diaria.'],
            ['Terminar y compartir lo importante', 'Comentamos cómo ha ido. Con su acuerdo, informamos a la familia de los aspectos relevantes y las pautas que procedan.'],
          ].map(([title, text], index) => <li key={title} className="flex gap-4 py-6"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-white">{index + 1}</span><div><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-2 leading-relaxed text-muted">{text}</p></div></li>)}</ol><p className="mt-6 leading-relaxed text-muted">La valoración inicial establece el punto de partida. Durante el programa repetimos la valoración cada mes para observar la evolución y ajustar el trabajo.</p><Link href="/valoracion-gratuita#como-trabajo" className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Qué incluye la primera valoración</Link></div>
        </div>
      </section>

      <section id="precios" className="bg-white px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
        <div><h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-tight">Precios claros, antes de decidir.</h2><p className="mt-4 max-w-md text-lg leading-relaxed text-muted">Primera valoración gratuita. Sin permanencia. Las sesiones duran 30–45 minutos y el calendario se acuerda con vosotros.</p><p className="mt-4 max-w-md leading-relaxed text-muted">Atendemos en Madrid capital, por las mañanas hasta las 13:00. Confirmamos disponibilidad antes de organizar la visita.</p><Link href="#contacto" className="mt-5 inline-flex min-h-12 items-center gap-2 font-semibold text-primary underline underline-offset-4">Consultar disponibilidad <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        <div className="min-w-0 overflow-hidden rounded-2xl border border-primary/20">
          <dl className="divide-y divide-primary/15 p-5 sm:p-7"><div className="flex flex-wrap items-baseline justify-between gap-3 pb-5"><dt><span className="block font-display text-xl font-bold">Plan de 2 días por semana</span><span className="mt-1 block text-sm text-muted">45 € por sesión</span></dt><dd className="font-display text-3xl font-bold text-primary">{PLAN_WEEKLY_PRICE} €<span className="text-base font-normal text-muted"> / semana</span></dd></div><div className="flex flex-wrap items-baseline justify-between gap-3 pt-5"><dt className="font-semibold">Sesión suelta</dt><dd className="font-display text-2xl font-bold text-primary">{SINGLE_SESSION_PRICE} €</dd></div></dl>
          <MonthlyPriceEstimate />
          <details className="border-t border-primary/15 p-5 sm:p-7"><summary className="min-h-11 cursor-pointer font-semibold text-primary underline underline-offset-4">Pago, cambios de sesión y cancelaciones</summary><SessionConditions /></details>
        </div>
      </div></section>

      <section className="px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto max-w-6xl"><h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-tight">La primera visita, sin compromiso.</h2><ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, text]) => <li key={number} className="border-t border-primary/25 pt-5"><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-muted">{text}</p></li>)}</ol><Link href="/valoracion-gratuita" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Ver todos los detalles de la valoración</Link></div></section>

      <AssessmentReportExample />

      <section className="px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto max-w-6xl"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-tight">Guías para vuestro siguiente paso.</h2><p className="mt-3 max-w-2xl text-lg text-muted">Lecturas agrupadas por lo que os preocupa, para orientaros antes de elegir una rutina o pedir ayuda.</p></div><Link href="/articulos" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Buscar entre todos los artículos</Link></div><FamilyGuideLinks headingLevel="h3" /></div></section>

      <section id="faqs" className="border-y border-primary/15 bg-white px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[.7fr_1.3fr] lg:gap-14"><h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-tight">Resolvemos las dudas antes de empezar.</h2><div className="divide-y divide-primary/15 border-y border-primary/15">{[...faqs.slice(4), ...faqs.slice(0, 4)].map(([question, answer]) => <details key={question} className="py-4"><summary className="min-h-11 cursor-pointer py-2 text-lg font-semibold">{question}</summary><p className="max-w-2xl pb-3 pt-2 leading-relaxed text-muted">{answer}</p></details>)}</div></div></section>

      <section id="contacto" className="bg-[#e3f0e6] px-5 py-12 sm:px-8 sm:py-16"><div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1fr_.9fr] lg:gap-14"><div><h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-tight">Cuéntanos qué necesita tu familiar.</h2><p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">Te llamaremos en menos de 24 horas para conocer la situación, comprobar disponibilidad en Madrid capital y organizar la valoración gratuita.</p><ul className="mt-6 space-y-3 text-base font-semibold">{['En su domicilio, sin desplazamientos', 'Fernando realiza la visita personalmente', 'Sin obligación de contratar'].map(item => <li key={item} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}</ul><p className="mt-6 max-w-xl leading-relaxed text-muted">Solo necesitas dejarnos tu nombre y teléfono. Si quieres, añade el barrio y qué os preocupa. No hace falta la dirección completa.</p><Link href="/sobre-fernando" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4"><GraduationCap className="h-5 w-5" aria-hidden="true" />Conoce la trayectoria de Fernando</Link></div><LeadForm origen="Página principal (/)" title="Solicitar una llamada" ctaText="Quiero que me llaméis" /></div></section>
    </div>
  );
}

function ArrowUpRightIcon() { return <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />; }
