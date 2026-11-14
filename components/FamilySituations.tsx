import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { familyGuides } from '@/lib/family-guides';

const situations = [
  { title: 'Camina cada vez menos', text: 'Entender cómo adaptar el ejercicio cuando salir o moverse por casa cuesta más.', href: '/articulos/ejercicio-domicilio-mayor-apenas-camina' },
  { title: 'Tiene miedo a caerse', text: 'Orientación sobre caídas, equilibrio y el siguiente paso para vuestra familia.', href: `/guias/${familyGuides[0].slug}` },
  { title: 'Le cuesta levantarse o hacer sus tareas', text: 'Por dónde empezar cuando notas pérdida de fuerza en el día a día.', href: `/guias/${familyGuides[1].slug}` },
  { title: 'Se mueve menos tras un ingreso', text: 'Cómo plantear la vuelta a la actividad respetando las indicaciones del alta.', href: `/guias/${familyGuides[2].slug}` },
] as const;

export default function FamilySituations() {
  return <section id="por-donde-empezar" aria-labelledby="situations-title" className="border-y border-primary/15 bg-white px-5 py-12 sm:px-8 sm:py-16">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
      <div><h2 id="situations-title" className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-tight text-primary-dark">¿Qué te preocupa de tu familiar?</h2><p className="mt-4 max-w-md text-lg leading-relaxed text-muted">No hace falta conocer el nombre de un ejercicio. Empieza por el cambio que habéis notado.</p><Link href="/guias" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Ver las guías para familias</Link></div>
      <ul className="divide-y divide-primary/15 border-y border-primary/15">{situations.map(item => <li key={item.href}><Link href={item.href} className="group flex gap-5 py-5 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><div className="min-w-0 flex-1"><h3 className="font-display text-xl font-bold text-primary-dark group-hover:text-primary">{item.title}</h3><p className="mt-2 leading-relaxed text-muted">{item.text}</p></div><ArrowUpRight className="mt-1 h-6 w-6 shrink-0 text-primary transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1" aria-hidden="true" /></Link></li>)}</ul>
    </div>
  </section>;
}
