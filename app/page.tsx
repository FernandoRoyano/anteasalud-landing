import SessionConditions from '@/components/SessionConditions';
import AssessmentReportExample from '@/components/AssessmentReportExample';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Check, ClipboardCheck, Footprints, GraduationCap, HeartHandshake, Home, ShieldCheck } from 'lucide-react';
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

const outcomes = [
  [Footprints, 'Caminar con más seguridad', 'Trabajamos fuerza, equilibrio y coordinación para que cada paso vuelva a sentirse estable.'],
  [Home, 'Moverse mejor en casa', 'Levantarse del sofá, subir un escalón o llegar al baño: entrenamos lo que importa en su día a día.'],
  [ShieldCheck, 'Recuperar la confianza', 'La progresión es gradual y supervisada, sin forzar y adaptándonos a cómo se encuentra cada día.'],
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
    <div className="bg-[#fbfcf8] text-[#17372b]">
      <JsonLd data={faqSchema} />
      <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
        <div className="antea-grid absolute inset-0 opacity-45" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_.96fr]">
          <div className="max-w-3xl">
            <h1 className="font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold text-[#153e31]">
              <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2d6a4f]/20 bg-white/75 px-4 py-2 font-sans text-base font-semibold leading-normal tracking-normal text-[#2d6a4f] backdrop-blur"><span className="h-2 w-2 rounded-full bg-[#2d6a4f]" aria-hidden="true" />Ejercicio para personas mayores a domicilio en Madrid</span>
              <span className="block">Más autonomía</span>
              <span className="relative mt-2 block w-fit text-[#2d6a4f]">en su día a día.<svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 360 20" fill="none" aria-hidden="true"><path d="M3 14C87 3 242 3 357 10" stroke="#74c69d" strokeWidth="8" strokeLinecap="round" opacity=".6" /></svg></span>
            </h1>
            <p className="mt-10 max-w-2xl text-[clamp(1.15rem,2vw,1.45rem)] leading-relaxed text-[#45665a]">Trabajamos la fuerza, la movilidad y la confianza de tu familiar con un plan adaptado a su capacidad y a lo que quiere seguir haciendo, en su propia casa.</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#45665a]">Actualmente, Fernando Royano realiza personalmente las valoraciones y las sesiones de ANTEA Salud en Madrid capital, en horario de mañana hasta las 13:00 y según disponibilidad. <Link href="/sobre-fernando" className="font-semibold text-[#2d6a4f] underline underline-offset-4">Conoce a quien irá a su casa</Link>.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#contacto" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2d6a4f] px-7 py-4 font-bold text-white shadow-[0_16px_40px_-18px_rgba(45,106,79,.8)] transition hover:-translate-y-0.5 hover:bg-[#22543f]">Solicitar valoración gratuita <ArrowRight className="h-5 w-5" /></a>
              <a href="#como-funciona" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#2d6a4f]/25 bg-white/60 px-7 py-4 font-semibold text-[#2d6a4f] transition hover:bg-white">Ver cómo funciona <ArrowDown className="h-4 w-4" /></a>
            </div>
            <PriceLine zoneNote className="mt-6 rounded-2xl border border-[#2d6a4f]/15 bg-white/80 px-4 py-3" />
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#2d6a4f]/15 pt-6 text-base text-[#3b5a4e]">
              <span className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-[#2d6a4f]" /> Graduado en Ciencias del Deporte</span>
              <span className="flex items-center gap-2"><Check className="h-5 w-5 text-[#2d6a4f]" /> 14 años como entrenador, especializado en mayores</span>
            </div>
          </div>
          <div className="relative lg:pl-8">
            <div className="relative aspect-[5/4] overflow-hidden lg:aspect-[4/5] rounded-[2rem_2rem_8rem_2rem] bg-[#dce9df] shadow-[0_30px_80px_-35px_rgba(21,62,49,.45)]">
              <Image src="/hero-fernando.webp" alt="Fernando Royano acompaña a una persona mayor durante una sesión de ejercicio adaptado" fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#143b2e]/45 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/90 p-5 backdrop-blur-md sm:left-8 sm:right-auto sm:max-w-xs"><p className="text-sm font-semibold uppercase tracking-[.16em] text-[#2d6a4f]">El objetivo</p><p className="mt-2 font-display text-2xl font-bold leading-tight">Más autonomía en los movimientos cotidianos.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="border-y border-[#2d6a4f]/10 bg-white px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
        <nav aria-labelledby="family-situations-title" className="mx-auto mb-14 max-w-7xl border-b border-[#2d6a4f]/15 pb-10">
          <h2 id="family-situations-title" className="font-display text-2xl font-bold">¿Te preocupa alguna de estas situaciones?</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ['/articulos/ejercicio-domicilio-mayor-apenas-camina', 'Mi familiar camina cada vez menos'],
              ['/articulos/que-pasa-despues-de-una-caida', 'Tiene miedo después de una caída'],
              ['/articulos/levantarse-silla-autonomia-personas-mayores', 'Le cuesta levantarse de la silla'],
            ].map(([href, label]) => <li key={href}><Link href={href} className="flex min-h-14 items-center justify-between gap-3 rounded-xl bg-[#f3f8f4] px-4 py-3 font-semibold text-primary underline-offset-4 hover:underline">{label}<ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" /></Link></li>)}
          </ul>
        </nav>
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div><Eyebrow>Cambios que se notan</Eyebrow><Title>Entrenamos para la vida real.</Title><p className="mt-6 max-w-md text-lg leading-relaxed text-[#4a6358]">No buscamos hacer ejercicios por hacer. Cada sesión se conecta con algo que quiere volver a conseguir.</p></div>
          <div className="divide-y divide-[#2d6a4f]/15 border-y border-[#2d6a4f]/15">
            {outcomes.map(([Icon, title, text]) => <article key={title} className="group grid gap-4 py-8 sm:grid-cols-[4rem_1fr] sm:gap-6"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e7f2ea] text-[#2d6a4f] transition group-hover:-rotate-3"><Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" /></div><div><h3 className="font-display text-2xl font-bold tracking-tight">{title}</h3><p className="mt-2 max-w-xl leading-relaxed text-[#4a6358]">{text}</p></div></article>)}
          </div>
        </div>
        <nav aria-label="Servicios" className="mx-auto mt-16 grid max-w-7xl gap-4 md:grid-cols-3">
          {services.map(([href, title, text]) => (
            <Link key={href} href={href} className="group rounded-2xl border border-[#2d6a4f]/15 bg-[#fbfcf8] p-6 transition hover:border-[#2d6a4f]/40 hover:bg-[#f3f8f4]">
              <span className="flex items-center justify-between gap-3 font-display text-xl font-bold text-[#17372b]">{title}<ArrowRight className="h-5 w-5 shrink-0 text-[#2d6a4f] transition group-hover:translate-x-1" aria-hidden="true" /></span>
              <span className="mt-2 block leading-relaxed text-[#4a6358]">{text}</span>
            </Link>
          ))}
        </nav>
      </section>

      <section id="como-funciona" className="px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl"><div className="max-w-3xl"><Eyebrow>Así trabajamos</Eyebrow><Title>Un plan que empieza por escuchar.</Title></div>
          <div className="mt-14 grid border-t border-[#2d6a4f]/20 md:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, text], index) => <article key={number} className="relative border-b border-[#2d6a4f]/20 py-8 md:px-7 md:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"><span className="font-display text-5xl font-bold text-[#3f8a64]" aria-hidden="true">{number}</span><h3 className="mt-8 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-base leading-relaxed text-[#4a6358]">{text}</p>{index < steps.length - 1 && <ArrowRight className="absolute -right-3 top-11 z-10 hidden h-6 w-6 rounded-full bg-[#fbfcf8] p-1 text-[#3f8a64] lg:block" aria-hidden="true" />}</article>)}</div>
          <p className="mt-8 max-w-3xl text-lg text-muted">Antes de contratar, conoce qué incluye la visita y en qué se basa la propuesta. <Link href="/valoracion-gratuita#como-trabajo" className="font-semibold text-primary underline underline-offset-4">Así es la valoración y cómo utilizo Vivifrail →</Link></p>
          <div className="mt-10 border-t border-[#2d6a4f]/20 pt-8">
            <h3 className="font-display text-2xl font-bold">Cómo seguimos la evolución</h3>
            <dl className="mt-6 grid gap-6 md:grid-cols-3">
              <div><dt className="font-semibold">Una referencia inicial y una revisión mensual</dt><dd className="mt-2 leading-relaxed text-[#4a6358]">La primera valoración establece el punto de partida. Durante el programa de ejercicio pautado, repetimos la valoración cada mes para comparar la evolución y ajustar el trabajo.</dd></div>
              <div><dt className="font-semibold">Un comentario al terminar cada sesión</dt><dd className="mt-2 leading-relaxed text-[#4a6358]">Comentamos cómo ha ido y los aspectos relevantes del día. Compartimos la información con la familia de acuerdo con la persona que realiza el ejercicio.</dd></div>
              <div><dt className="font-semibold">Dudas y pautas entre visitas</dt><dd className="mt-2 leading-relaxed text-[#4a6358]">Podéis escribirnos si surgen dudas; la respuesta no es inmediata. Cuando procede, proponemos pautas adaptadas para los días sin sesión, según la capacidad y los apoyos de cada persona.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <AssessmentReportExample />

      <section className="overflow-hidden bg-[#17372b] px-5 py-24 text-white sm:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="relative order-2 aspect-[5/4] overflow-hidden rounded-[5rem_1.5rem_1.5rem_1.5rem] lg:order-1"><Image src="/solution.webp" alt="Valoración del equilibrio de una persona mayor en su domicilio" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
        <div className="order-1 lg:order-2"><Eyebrow light>Profesional y cercano</Eyebrow><h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-bold leading-[.98] tracking-[-.04em]">Conoce a quien acompaña a tu familiar.</h2><p className="mt-7 text-lg leading-relaxed text-white/85">Fernando Royano es graduado en Ciencias de la Actividad Física y del Deporte y lleva 14 años como entrenador personal a domicilio, especializado en personas mayores. <Link href="/sobre-fernando" className="font-semibold text-white underline underline-offset-4">Conoce su trayectoria</Link>.</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2"><Credential icon={GraduationCap} title="Formación universitaria">Ejercicio adaptado con criterio profesional.</Credential><Credential icon={HeartHandshake} title="Trato continuado">La misma persona, sesión tras sesión.</Credential></div>
        </div>
      </div></section>

      <section id="precios" className="bg-white px-5 py-16 sm:px-8 sm:py-24 lg:py-32"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div><Eyebrow>Precios claros</Eyebrow><Title>Sin permanencia. Sin letra pequeña.</Title><p className="mt-6 text-lg leading-relaxed text-[#4a6358]">La primera valoración funcional es gratuita. Después eliges el ritmo que mejor encaja con vuestra situación.</p></div>
        <div className="overflow-hidden rounded-3xl border border-[#2d6a4f]/15"><div className="grid gap-6 border-b border-[#2d6a4f]/15 bg-[#f3f8f4] p-7 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9"><div><p className="font-display text-2xl font-bold">Plan recomendado</p><p className="mt-2 text-[#4a6358]">2 sesiones semanales de 30–45 minutos</p></div><p className="font-display text-4xl font-bold text-[#2d6a4f]">90 €<span className="text-base font-normal text-[#4a6358]"> / semana</span></p></div>
          <div className="grid gap-6 p-7 sm:grid-cols-2 sm:p-9"><div><p className="font-bold">También disponible</p><p className="mt-2 text-[#4a6358]">Sesión suelta de 30–45 minutos</p><p className="mt-3 font-display text-3xl font-bold text-[#2d6a4f]">55 €</p></div><ul className="space-y-3 text-base text-[#3b5a4e]">{['Plan personalizado','Seguimiento de la evolución','Madrid capital','Mañanas hasta las 13:00'].map(item => <li key={item} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[#2d6a4f]" aria-hidden="true" />{item}</li>)}</ul></div>
          <div className="px-7 pb-6 sm:px-9"><SessionConditions /></div>
          <div className="border-t border-[#2d6a4f]/15 px-7 py-6 sm:px-9"><a href="#contacto" className="inline-flex min-h-12 items-center gap-2 font-bold text-[#2d6a4f] underline underline-offset-4">Consultar disponibilidad y solicitar valoración <ArrowRight className="h-5 w-5" aria-hidden="true" /></a><p className="mt-2 text-sm leading-relaxed text-[#4a6358]">Primero conocemos vuestra situación y comprobamos si el servicio encaja. La visita no obliga a contratar.</p></div>
        </div>
      </div></section>

      <section id="faqs" className="border-y border-[#2d6a4f]/10 px-5 py-16 sm:px-8 sm:py-24 lg:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <div><Eyebrow>Antes de empezar</Eyebrow><Title>Dudas normales. Respuestas claras.</Title></div>
        <div className="divide-y divide-[#2d6a4f]/15 border-y border-[#2d6a4f]/15">{faqs.map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">{question}<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2d6a4f]/30 text-xl font-normal transition group-open:rotate-45" aria-hidden="true">+</span></summary><p className="max-w-2xl pt-4 leading-relaxed text-[#4a6358]">{answer}</p></details>)}</div>
      </div></section>

      <section id="contacto" className="relative overflow-hidden bg-[#e3f0e6] px-5 py-16 sm:px-8 sm:py-24 lg:py-32"><div className="antea-grid absolute inset-0 opacity-30" aria-hidden="true" /><div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_.85fr] lg:gap-20">
        <div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2d6a4f] text-white"><ClipboardCheck className="h-7 w-7" /></div><h2 className="mt-8 font-display text-[clamp(2.8rem,6vw,5.3rem)] font-bold leading-[.96] tracking-[-.045em]">Cuéntanos qué movimiento quiere recuperar.</h2><p className="mt-7 max-w-xl text-lg leading-relaxed text-[#3b5a4e]">Te llamaremos en menos de 24 horas para conocer la situación y organizar una primera valoración gratuita, sin compromiso.</p><div className="mt-8 flex flex-wrap gap-5 text-base font-semibold text-[#2d6a4f]">{['Gratuita','En el domicilio','Sin compromiso'].map(item => <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4" aria-hidden="true" />{item}</span>)}</div><p className="mt-8 text-lg text-[#3b5a4e]">¿Prefieres saber antes en qué consiste? <Link href="/valoracion-gratuita" className="font-semibold text-[#2d6a4f] underline underline-offset-4">Así es la valoración gratuita</Link> · <Link href="/articulos" className="font-semibold text-[#2d6a4f] underline underline-offset-4">Guías para familias</Link></p></div>
        <LeadForm origen="Página principal (/)" title="Solicitar mi valoración" ctaText="Quiero que me llaméis" />
      </div></section>
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`text-sm font-bold uppercase tracking-[.22em] ${light ? 'text-[#9ed8b8]' : 'text-[#3f6f58]'}`}>{children}</p>; }
function Title({ children }: { children: React.ReactNode }) { return <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-bold leading-[1] tracking-[-.04em]">{children}</h2>; }
function Credential({ icon: Icon, title, children }: { icon: typeof GraduationCap; title: string; children: React.ReactNode }) { return <div className="border-l border-[#74c69d] pl-5"><Icon className="h-6 w-6 text-[#9ed8b8]" aria-hidden="true" /><p className="mt-3 font-semibold">{title}</p><p className="mt-1 text-base text-white/80">{children}</p></div>; }
