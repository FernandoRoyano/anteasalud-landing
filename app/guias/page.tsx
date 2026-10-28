import Link from 'next/link';
import { FamilyGuideLinks } from '@/components/FamilyGuideLinks';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Guías para ayudar a una persona mayor: fuerza, caídas y recuperación',
  description: 'Encuentra por dónde empezar si tu padre, madre o familiar pierde fuerza, tiene caídas o necesita recuperar actividad después de un ingreso.',
  path: '/guias',
});

export default function GuidesPage() {
  return (
    <div className="bg-[#fbfcf8] pb-24 pt-36 sm:pt-44">
      <BreadcrumbSchema items={[{ name: 'Inicio', url: SITE_URL }, { name: 'Guías para familias', url: `${SITE_URL}/guias` }]} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-semibold uppercase tracking-[0.18em] text-primary">Guías para familias</p>
        <h1 className="mt-6 max-w-4xl font-display text-fluid-5xl font-bold leading-tight tracking-tight text-primary-dark">¿Qué te preocupa de tu familiar?</h1>
        <p className="mb-12 mt-7 max-w-2xl text-fluid-xl leading-relaxed text-muted">Cuando notas que tu padre o tu madre se mueve menos, no siempre es fácil saber por dónde empezar. Elige la situación que más se parece a la vuestra.</p>
        <FamilyGuideLinks />
        <section className="mt-16 max-w-3xl border-t border-primary/20 pt-10">
          <h2 className="font-display text-fluid-2xl font-bold text-ink">No hace falta tener todas las respuestas</h2>
          <p className="mt-4 text-fluid-lg leading-relaxed text-muted">Estas guías reúnen señales que podéis observar, lecturas para entenderlas y opciones de apoyo. Una misma persona puede vivir varias situaciones: empieza por el cambio que más afecta a su día a día.</p>
          <p className="mt-6 text-fluid-lg"><Link href="/articulos" className="font-semibold text-primary underline underline-offset-4">Explorar todos los artículos</Link> · <Link href="/valoracion-gratuita" className="font-semibold text-primary underline underline-offset-4">Solicitar una valoración en Madrid</Link></p>
          <p className="mt-8 text-muted">Contenido elaborado por <Link href="/sobre-fernando" className="underline">Fernando Royano, graduado en CCAFYD</Link>. Orientación sobre ejercicio y autonomía; las decisiones clínicas corresponden al equipo sanitario.</p>
        </section>
      </div>
    </div>
  );
}
