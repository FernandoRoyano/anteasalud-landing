import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Check, Footprints, Heart, MapPin } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

const dailyGoals = [
  { icon: Footprints, title: 'Volver a disfrutar de un paseo', text: 'Trabajar la fuerza y el equilibrio para moverse por su barrio con más confianza.' },
  { icon: Check, title: 'Seguir haciendo sus cosas', text: 'Centrarnos en lo cotidiano: levantarse, vestirse o moverse por casa.' },
  { icon: Heart, title: 'Sentirse acompañado', text: 'Un profesional a su lado, respetando sus preferencias y su ritmo.' },
];

export default function PacificoHero() {
  return (
    <>
      <section className="overflow-hidden bg-[#fbfcf8] px-5 pb-12 pt-28 sm:px-8 sm:pt-36 lg:pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="flex items-start gap-2 text-base font-semibold text-primary"><MapPin className="mt-1 size-5 shrink-0" aria-hidden="true" /> Ejercicio para mayores a domicilio en Pacífico</p>
            <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,5vw,4.75rem)] font-bold text-primary-dark">Ayúdale a seguir <span className="text-primary">disfrutando de su vida.</span></h1>
            <p className="mt-7 max-w-xl text-fluid-xl text-ink">Salir a dar un paseo. Levantarse con confianza. Seguir haciendo sus cosas.</p>
            <p className="mt-5 max-w-xl text-fluid-lg text-muted">Si ves que a tu padre o a tu madre cada vez le cuesta más, podemos acompañarle. Ejercicio de fuerza y equilibrio en su casa, adaptado a cómo se encuentra y a lo que quiere seguir haciendo.</p>
            <a href="#valoracion-pacifico" className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-center text-lg font-bold text-white shadow-lg transition-colors hover:bg-primary-dark">Quiero ayudar a mi familiar <ArrowRight className="size-5 shrink-0" aria-hidden="true" /></a>
            <p className="mt-4 text-base font-semibold text-primary-dark">Primera valoración gratuita · En su casa · Sin compromiso</p>
            <a href="#objetivos-pacifico" className="mt-5 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-primary underline underline-offset-4">Conoce cómo podemos ayudarle <ArrowDown className="size-4" aria-hidden="true" /></a>
          </div>
          <figure className="m-0">
            <div className="overflow-hidden rounded-[2rem] bg-primary-light">
              <Image src="/hero-fernando.webp" alt="Un hombre mayor realiza ejercicio con una banda elástica acompañado por un profesional en casa." width={1000} height={1250} priority sizes="(max-width: 1023px) 100vw, 46vw" className="aspect-[4/5] max-h-[640px] w-full object-cover" />
            </div>
            <figcaption className="mt-4 border-l-2 border-primary pl-4 text-base text-muted">Fuerza y equilibrio al servicio de su día a día.</figcaption>
          </figure>
        </div>
      </section>

      <section id="objetivos-pacifico" className="border-y border-primary/15 bg-primary-50 px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-base font-semibold text-primary">Lo que de verdad importa</p>
          <h2 className="mt-3 max-w-3xl font-display text-fluid-3xl font-bold text-primary-dark">Pequeños gestos que significan mucho para vuestra familia.</h2>
          <ul className="mt-9 grid gap-8 md:grid-cols-3 md:gap-10">{dailyGoals.map(({ icon: Icon, title, text }) => <li key={title} className="border-t border-primary/25 pt-5"><Icon className="size-7 text-primary" aria-hidden="true" /><h3 className="mt-4 font-display text-fluid-xl font-bold text-primary-dark">{title}</h3><p className="mt-3 text-fluid-lg text-muted">{text}</p></li>)}</ul>
          <p className="mt-8 max-w-3xl text-base text-muted">Los objetivos se acuerdan con tu familiar. El punto de partida y la evolución son diferentes en cada persona.</p>
        </div>
      </section>

      <section id="valoracion-pacifico" className="bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-base font-semibold text-primary">Damos el primer paso contigo</p>
            <h2 className="mt-4 font-display text-fluid-3xl font-bold text-primary-dark">Cuéntame qué te preocupa de tu familiar.</h2>
            <p className="mt-6 text-fluid-lg text-muted">Soy Fernando Royano, graduado en Ciencias de la Actividad Física y del Deporte, con 14 años de experiencia como entrenador a domicilio. En la primera visita hablamos de vuestra situación y valoro cómo se mueve tu familiar para proponeros un punto de partida.</p>
            <p className="mt-5 text-fluid-lg text-muted">La valoración es gratuita y en Pacífico no hay recargo por desplazamiento. Después decidís si queréis empezar: 55 € la sesión suelta o 90 € por semana por dos sesiones de 30–45 minutos.</p>
            <Link href="/valoracion-gratuita#como-trabajo" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Así es la visita: valoración, Vivifrail y vuestra decisión →</Link>
            <Link href="/sobre-fernando" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4">Conoce a Fernando <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
          <LeadForm origen="Ejercicio para mayores en Pacífico (/ejercicio-mayores-pacifico)" zone="Pacífico" title="Hablemos de cómo ayudarle" ctaText="Quiero una valoración gratuita" />
        </div>
      </section>
    </>
  );
}
