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
  ['02', 'Valoramos cómo se mueve', 'Fernando realiza una primera valoración funcional gratuita en el domicilio.'],
  ['03', 'Diseñamos el plan', 'Cada sesión se adapta a sus capacidades y evoluciona según sus progresos.'],
  ['04', 'Compartimos la evolución', 'La familia sabe qué estamos trabajando y cómo avanza, con un seguimiento cercano.'],
] as const;

const faqs = [
  ['¿Es adecuado si lleva mucho tiempo sin hacer ejercicio?', 'Sí. Empezamos desde su nivel actual, incluso si tiene poca movilidad o necesita apoyo. La primera valoración nos permite ajustar cada ejercicio con seguridad.'],
  ['¿Cuánto dura cada sesión?', 'Las sesiones habituales duran 30 minutos. Es un tiempo suficiente para trabajar con calidad sin generar una fatiga innecesaria. También podemos valorar sesiones de 60 minutos.'],
  ['¿Trabajáis después de una operación?', 'Sí, cuando el equipo médico ha indicado que puede comenzar ejercicio. Nos coordinamos con sus recomendaciones y trabajamos la vuelta progresiva a la actividad.'],
  ['¿En qué zonas os desplazáis?', 'Trabajamos en Madrid capital y en distintos municipios de la Comunidad de Madrid. Fuera de Madrid capital se aplica un suplemento de 10 € por desplazamiento.'],
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
            <h1 className="font-display text-[clamp(3.1rem,7vw,6.6rem)] font-bold leading-[.93] tracking-[-.055em] text-[#153e31]">
              <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2d6a4f]/20 bg-white/75 px-4 py-2 font-sans text-base font-semibold leading-normal tracking-normal text-[#2d6a4f] backdrop-blur"><span className="h-2 w-2 rounded-full bg-[#2d6a4f]" aria-hidden="true" />Ejercicio para personas mayores a domicilio en Madrid</span>
              <span className="block">Que vuelva a hacer</span>
              <span className="relative mt-2 block w-fit text-[#2d6a4f]">su vida.<svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 360 20" fill="none" aria-hidden="true"><path d="M3 14C87 3 242 3 357 10" stroke="#74c69d" strokeWidth="8" strokeLinecap="round" opacity=".6" /></svg></span>
            </h1>
            <p className="mt-10 max-w-2xl text-[clamp(1.15rem,2vw,1.45rem)] leading-relaxed text-[#45665a]">Ayudamos a tu familiar a recuperar fuerza, movilidad y confianza con un plan de ejercicio que se adapta a él, en su propia casa.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem_2rem_8rem_2rem] bg-[#dce9df] shadow-[0_30px_80px_-35px_rgba(21,62,49,.45)]">
              <Image src="/hero-fernando.webp" alt="Fernando Royano acompaña a una persona mayor durante una sesión de ejercicio adaptado" fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#143b2e]/45 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/90 p-5 backdrop-blur-md sm:left-8 sm:right-auto sm:max-w-xs"><p className="text-sm font-semibold uppercase tracking-[.16em] text-[#2d6a4f]">El objetivo</p><p className="mt-2 font-display text-2xl font-bold leading-tight">Más autonomía en los movimientos cotidianos.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="border-y border-[#2d6a4f]/10 bg-white px-5 py-24 sm:px-8 lg:py-32">
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

      <section id="como-funciona" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl"><div className="max-w-3xl"><Eyebrow>Así trabajamos</Eyebrow><Title>Un plan que empieza por escuchar.</Title></div>
          <div className="mt-14 grid border-t border-[#2d6a4f]/20 md:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, text], index) => <article key={number} className="relative border-b border-[#2d6a4f]/20 py-8 md:px-7 md:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"><span className="font-display text-5xl font-bold text-[#3f8a64]" aria-hidden="true">{number}</span><h3 className="mt-8 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-base leading-relaxed text-[#4a6358]">{text}</p>{index < steps.length - 1 && <ArrowRight className="absolute -right-3 top-11 z-10 hidden h-6 w-6 rounded-full bg-[#fbfcf8] p-1 text-[#3f8a64] lg:block" aria-hidden="true" />}</article>)}</div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#17372b] px-5 py-24 text-white sm:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="relative order-2 aspect-[5/4] overflow-hidden rounded-[5rem_1.5rem_1.5rem_1.5rem] lg:order-1"><Image src="/solution.webp" alt="Valoración del equilibrio de una persona mayor en su domicilio" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
        <div className="order-1 lg:order-2"><Eyebrow light>Profesional y cercano</Eyebrow><h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-bold leading-[.98] tracking-[-.04em]">Una persona de confianza entra en su casa.</h2><p className="mt-7 text-lg leading-relaxed text-white/85">Fernando Royano es graduado en Ciencias de la Actividad Física y del Deporte y lleva 14 años como entrenador personal a domicilio, especializado en personas mayores. <Link href="/sobre-fernando" className="font-semibold text-white underline underline-offset-4">Conoce su trayectoria</Link>.</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2"><Credential icon={GraduationCap} title="Formación universitaria">Ejercicio adaptado con criterio profesional.</Credential><Credential icon={HeartHandshake} title="Trato continuado">La misma persona, sesión tras sesión.</Credential></div>
        </div>
      </div></section>

      <section id="precios" className="bg-white px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div><Eyebrow>Precios claros</Eyebrow><Title>Sin permanencia. Sin letra pequeña.</Title><p className="mt-6 text-lg leading-relaxed text-[#4a6358]">La primera valoración funcional es gratuita. Después eliges el ritmo que mejor encaja con vuestra situación.</p></div>
        <div className="overflow-hidden rounded-3xl border border-[#2d6a4f]/15"><div className="grid gap-6 border-b border-[#2d6a4f]/15 bg-[#f3f8f4] p-7 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9"><div><p className="font-display text-2xl font-bold">Plan recomendado</p><p className="mt-2 text-[#4a6358]">2 sesiones semanales de 30 minutos</p></div><p className="font-display text-4xl font-bold text-[#2d6a4f]">90 €<span className="text-base font-normal text-[#4a6358]"> / semana</span></p></div>
          <div className="grid gap-6 p-7 sm:grid-cols-2 sm:p-9"><div><p className="font-bold">También disponible</p><p className="mt-2 text-[#4a6358]">Sesión suelta de 30 minutos</p><p className="mt-3 font-display text-3xl font-bold text-[#2d6a4f]">55 €</p></div><ul className="space-y-3 text-base text-[#3b5a4e]">{['Plan personalizado','Seguimiento de la evolución','Madrid capital sin suplemento','Resto de la Comunidad: +10 €'].map(item => <li key={item} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[#2d6a4f]" aria-hidden="true" />{item}</li>)}</ul></div>
        </div>
      </div></section>

      <section id="faqs" className="border-y border-[#2d6a4f]/10 px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <div><Eyebrow>Antes de empezar</Eyebrow><Title>Dudas normales. Respuestas claras.</Title></div>
        <div className="divide-y divide-[#2d6a4f]/15 border-y border-[#2d6a4f]/15">{faqs.map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">{question}<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2d6a4f]/30 text-xl font-normal transition group-open:rotate-45" aria-hidden="true">+</span></summary><p className="max-w-2xl pt-4 leading-relaxed text-[#4a6358]">{answer}</p></details>)}</div>
      </div></section>

      <section id="contacto" className="relative overflow-hidden bg-[#e3f0e6] px-5 py-24 sm:px-8 lg:py-32"><div className="antea-grid absolute inset-0 opacity-30" aria-hidden="true" /><div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_.85fr] lg:gap-20">
        <div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2d6a4f] text-white"><ClipboardCheck className="h-7 w-7" /></div><h2 className="mt-8 font-display text-[clamp(2.8rem,6vw,5.3rem)] font-bold leading-[.96] tracking-[-.045em]">Cuéntanos qué movimiento quiere recuperar.</h2><p className="mt-7 max-w-xl text-lg leading-relaxed text-[#3b5a4e]">Te llamaremos en menos de 24 horas para conocer la situación y organizar una primera valoración gratuita, sin compromiso.</p><div className="mt-8 flex flex-wrap gap-5 text-base font-semibold text-[#2d6a4f]">{['Gratuita','En el domicilio','Sin compromiso'].map(item => <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4" aria-hidden="true" />{item}</span>)}</div><p className="mt-8 text-lg text-[#3b5a4e]">¿Prefieres saber antes en qué consiste? <Link href="/valoracion-gratuita" className="font-semibold text-[#2d6a4f] underline underline-offset-4">Así es la valoración gratuita</Link> · <Link href="/articulos" className="font-semibold text-[#2d6a4f] underline underline-offset-4">Guías para familias</Link></p></div>
        <LeadForm origen="Home rediseño" title="Solicitar mi valoración" ctaText="Quiero que me llaméis" />
      </div></section>
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`text-sm font-bold uppercase tracking-[.22em] ${light ? 'text-[#9ed8b8]' : 'text-[#3f6f58]'}`}>{children}</p>; }
function Title({ children }: { children: React.ReactNode }) { return <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-bold leading-[1] tracking-[-.04em]">{children}</h2>; }
function Credential({ icon: Icon, title, children }: { icon: typeof GraduationCap; title: string; children: React.ReactNode }) { return <div className="border-l border-[#74c69d] pl-5"><Icon className="h-6 w-6 text-[#9ed8b8]" aria-hidden="true" /><p className="mt-3 font-semibold">{title}</p><p className="mt-1 text-base text-white/80">{children}</p></div>; }
