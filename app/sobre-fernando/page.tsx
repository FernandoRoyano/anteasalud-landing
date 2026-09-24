import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, HeartHandshake, Home, ShieldCheck } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { JsonLd } from '@/components/JsonLd';
import { PERSON_ID, SITE_URL, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Fernando Royano, entrenador especializado en mayores',
  description:
    'Graduado en CCAFYD con 14 años como entrenador personal a domicilio en Madrid, especializado en fuerza, equilibrio y autonomía de personas mayores.',
  path: '/sobre-fernando',
  image: '/hero-fernando.png',
  imageAlt: 'Fernando Royano durante una sesión de ejercicio con una persona mayor',
});

const principles = [
  [ShieldCheck, 'Seguridad antes que intensidad', 'Cada sesión empieza comprobando cómo se encuentra la persona ese día. Si hay dolor, mareo o un cambio reciente, se adapta o se deriva.'],
  [BookOpen, 'Basado en la evidencia', 'Los programas se apoyan en guías como las de la OMS, el programa Vivifrail y la investigación sobre fuerza y equilibrio en mayores.'],
  [Home, 'Entrenar lo que importa en casa', 'Levantarse de la silla, girar sin perder el equilibrio o subir un escalón: el objetivo es la vida diaria, no el gimnasio.'],
  [HeartHandshake, 'Coordinación con sanitarios', 'No sustituimos al médico ni al fisioterapeuta. Cuando hace falta, trabajamos siguiendo sus indicaciones.'],
] as const;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${SITE_URL}/sobre-fernando`,
  mainEntity: { '@id': PERSON_ID },
};

export default function SobreFernandoPage() {
  return (
    <div className="bg-[#fbfcf8] text-[#17372b]">
      <JsonLd data={personSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: SITE_URL },
          { name: 'Sobre Fernando Royano', url: `${SITE_URL}/sobre-fernando` },
        ]}
      />

      <section className="px-5 pb-20 pt-32 sm:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-base font-bold uppercase tracking-[.2em] text-[#3f6f58]">Quién te va a acompañar</p>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,5.5vw,4.6rem)] font-bold leading-[1] tracking-[-.04em]">
              Fernando Royano
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-[#3b5a4e]">
              Graduado en Ciencias de la Actividad Física y del Deporte (CCAFYD). Llevo 14 años como entrenador personal a
              domicilio en Madrid y la mayor parte de ese tiempo lo he dedicado a personas mayores: gente que quiere
              seguir caminando sola, levantarse del sofá sin ayuda o recuperar la confianza después de una caída.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-[#3b5a4e]">
              ANTEA Salud nace para ofrecer a las familias ejercicio bien pautado, en casa, con la misma persona sesión
              tras sesión y con información clara sobre la evolución.
            </p>
            <ul className="mt-8 space-y-3 text-lg">
              <li className="flex gap-3"><GraduationCap className="mt-1 h-6 w-6 shrink-0 text-[#2d6a4f]" aria-hidden="true" /> Grado universitario en CCAFYD</li>
              <li className="flex gap-3"><Home className="mt-1 h-6 w-6 shrink-0 text-[#2d6a4f]" aria-hidden="true" /> 14 años de entrenamiento personal a domicilio</li>
              <li className="flex gap-3"><HeartHandshake className="mt-1 h-6 w-6 shrink-0 text-[#2d6a4f]" aria-hidden="true" /> Especializado en fuerza, equilibrio y prevención de caídas en mayores</li>
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem_2rem_6rem_2rem] bg-[#dce9df]">
            <Image
              src="/hero-fernando.png"
              alt="Fernando Royano acompaña a una persona mayor durante una sesión de ejercicio adaptado"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#2d6a4f]/10 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-.03em]">Cómo trabajo</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {principles.map(([Icon, title, text]) => (
              <article key={title} className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e7f2ea] text-[#2d6a4f]">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">{title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-[#4a6358]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-.03em]">
            Lo que escribo para familias
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4a6358]">
            Guías revisadas con referencias científicas sobre caídas, fuerza, fragilidad y recuperación tras una
            operación.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/articulos" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2d6a4f] px-7 font-bold text-white transition hover:bg-[#22543f]">
              Leer los artículos <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/valoracion-gratuita" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-[#2d6a4f] px-7 font-bold text-[#2d6a4f] transition hover:bg-[#f3f8f4]">
              Solicitar valoración gratuita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
