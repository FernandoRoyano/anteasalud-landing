import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { JsonLd } from '@/components/JsonLd';
import { familyGuides, getFamilyGuide, FAMILY_GUIDES_UPDATED } from '@/lib/family-guides';
import { getPublishedArticles } from '@/lib/sheets';
import { buildMetadata, SITE_URL, PERSON_ID } from '@/lib/seo';

export const revalidate = 3600;
export const dynamicParams = false;
export function generateStaticParams() { return familyGuides.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getFamilyGuide((await params).slug);
  if (!guide) notFound();
  return buildMetadata({ title: `${guide.title}: guía para familiares`, description: guide.description, path: `/guias/${guide.slug}`, image: guide.image, imageAlt: guide.imageAlt });
}

export default async function FamilyGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getFamilyGuide((await params).slug);
  if (!guide) notFound();
  const articles = await getPublishedArticles();
  const groups = guide.groups.map((group) => ({ ...group, articles: group.slugs.flatMap((slug) => {
    const article = articles.find((item) => item.slug === slug);
    return article ? [article] : [];
  }) })).filter((group) => group.articles.length > 0);
  const selected = groups.flatMap((group) => group.articles);
  const url = `${SITE_URL}/guias/${guide.slug}`;

  return (
    <div className="bg-[#fbfcf8] pb-20 pt-28 sm:pt-36">
      <BreadcrumbSchema items={[{ name: 'Inicio', url: SITE_URL }, { name: 'Guías para familias', url: `${SITE_URL}/guias` }, { name: guide.title, url }]} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: guide.title, description: guide.description, url, dateModified: FAMILY_GUIDES_UPDATED, author: { '@id': PERSON_ID }, mainEntity: { '@type': 'ItemList', itemListElement: selected.map((article, index) => ({ '@type': 'ListItem', position: index + 1, name: article.title, url: `${SITE_URL}/articulos/${article.slug}` })) } }} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Link href="/guias" className="font-semibold text-primary underline underline-offset-4">← Guías para familias</Link>
        <header className="mt-8 grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="font-semibold text-primary">{guide.question}</p>
            <h1 className="mt-4 font-display text-fluid-4xl font-bold leading-tight tracking-tight text-primary-dark">{guide.title}</h1>
            <p className="mt-6 text-fluid-lg leading-relaxed text-muted">{guide.intro}</p>
            <a href="#por-donde-empezar" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark">Por dónde empezar ↓</a>
          </div>
          <Image src={guide.image} alt={guide.imageAlt} width={1600} height={900} priority className="aspect-[4/3] w-full rounded-3xl object-cover" sizes="(max-width: 1023px) 100vw, 560px" />
        </header>
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <div>
            <section id="por-donde-empezar">
              <h2 className="font-display text-fluid-2xl font-bold text-primary-dark">Primero, observad qué ha cambiado</h2>
              <ul className="mt-6 space-y-4 text-fluid-lg text-ink">{guide.observe.map((item) => <li key={item} className="border-l-2 border-primary/40 pl-5">{item}</li>)}</ul>
              <p className="mt-7 text-fluid-lg leading-relaxed text-muted">{guide.guidance}</p>
              <aside className="mt-7 rounded-2xl border border-primary/20 bg-primary-50 p-6 text-muted"><strong className="text-ink">Cuándo pedir atención sanitaria. </strong>{guide.caution}</aside>
            </section>
            <section className="mt-14" aria-labelledby="reading-title">
              <h2 id="reading-title" className="font-display text-fluid-3xl font-bold text-primary-dark">Lecturas para vuestro siguiente paso</h2>
              {groups.map((group, index) => (
                <section key={group.title} className="mt-9 border-t border-primary/20 pt-7">
                  <p className="text-sm font-semibold text-primary">PASO 0{index + 1}</p>
                  <h3 className="mt-2 font-display text-fluid-xl font-bold text-ink">{group.title}</h3>
                  <p className="mt-3 text-muted">{group.text}</p>
                  <ul className="mt-4 divide-y divide-primary/15">{group.articles.map((article) => <li key={article.slug}><Link href={`/articulos/${article.slug}`} className="block py-5 text-fluid-lg font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{article.title} <span aria-hidden="true">→</span></Link></li>)}</ul>
                </section>
              ))}
            </section>
            <section className="mt-12 border-t border-primary/20 pt-7 text-muted">
              <h2 className="font-display text-xl font-bold text-ink">Autoría y fuentes</h2>
              <p className="mt-3">Por <Link href="/sobre-fernando" className="underline">Fernando Royano, graduado en CCAFYD</Link>. Revisado el 25 de octubre de 2026.</p>
              <p className="mt-3"><a href={guide.sourceHref} className="underline underline-offset-4">{guide.sourceLabel}</a>. Cada artículo enlazado incluye sus referencias para ampliar la información.</p>
              {guide.slug === 'perdida-fuerza-personas-mayores' && <p className="mt-3"><a href="https://www.nhs.uk/conditions/stroke/symptoms/" className="underline underline-offset-4">NHS: síntomas de ictus y atención urgente</a>.</p>}
            </section>
          </div>
          <aside className="self-start rounded-3xl bg-primary-dark p-7 text-white lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-bold">¿Necesitáis ayuda para empezar?</h2>
            <p className="mt-4 leading-relaxed text-white/85">Si estáis en Madrid, podemos valorar cómo se mueve tu familiar y qué objetivos de ejercicio tienen sentido para su situación.</p>
            <Link href="/valoracion-gratuita" className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-white px-5 py-3 text-center font-semibold text-primary-dark hover:bg-primary-light">Solicitar valoración gratuita</Link>
            <Link href={guide.serviceHref} className="mt-6 block underline underline-offset-4">{guide.serviceLabel}</Link>
            <Link href="/guias" className="mt-6 block text-sm text-white/85 underline">Consultar las otras situaciones</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
