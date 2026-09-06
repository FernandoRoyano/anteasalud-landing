import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getPublishedArticles } from '@/lib/sheets';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { getArticleImageAlt, getReadingMinutes } from '@/lib/article-editorial';
import { Calendar, ArrowLeft, Clock3, ShieldCheck } from 'lucide-react';

// ISR 1h — los artículos publicados se refrescan al hueco siguiente.
export const revalidate = 3600;

// Pre-renderizado de rutas conocidas en build (las demás se generan al vuelo).
export async function generateStaticParams() {
  try {
    const articles = await getPublishedArticles();
    return articles.map((article) => ({ slug: article.slug }));
  } catch (error) {
    console.error('[Articulos:generateStaticParams] No se pudieron precargar los artículos:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.status !== 'published') return {};

  const url = `https://anteasalud.com/articulos/${article.slug}`;
  return {
    title: `${article.title} | ANTEA Salud`,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.excerpt,
      images: [article.ogImage || '/hero-realistic.png'],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || article.status !== 'published') {
    notFound();
  }

  const url = `https://anteasalud.com/articulos/${article.slug}`;
  const readingMinutes = getReadingMinutes(article.bodyMarkdown);
  const articleImage = new URL(article.ogImage || '/hero-realistic.png', 'https://anteasalud.com').toString();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [articleImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Fernando Royano',
      jobTitle: 'Graduado en Ciencias de la Actividad Física y el Deporte (CCAFYD)',
      url: 'https://anteasalud.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ANTEA Salud',
      url: 'https://anteasalud.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://anteasalud.com/hero-realistic.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: article.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: 'https://anteasalud.com' },
          { name: 'Artículos', url: 'https://anteasalud.com/articulos' },
          { name: article.title, url },
        ]}
      />

      <article className="w-full bg-surface">
        {/* Header */}
        <header className="relative isolate w-full overflow-hidden bg-primary-dark text-white" style={{ paddingTop: 'clamp(7rem, 12vw, 10rem)', paddingBottom: 'clamp(5rem, 9vw, 8rem)' }}>
          <div className="absolute inset-0 antea-grid opacity-25" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
            <Link
              href="/articulos"
              className="inline-flex items-center gap-1.5 text-fluid-sm text-white/65 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a artículos
            </Link>

            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.7rem] font-semibold uppercase tracking-wider text-accent-light bg-white/10 px-2.5 py-1 rounded-full ring-1 ring-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1
              className="font-display font-black tracking-tight leading-[1.02] mb-6 text-balance"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
            >
              {article.title}
            </h1>
            <p className="text-fluid-xl text-white/72 leading-relaxed mb-8 max-w-3xl text-pretty">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-fluid-sm text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5"><Clock3 className="w-4 h-4" />{readingMinutes} min de lectura</span>
              <span className="basis-full sm:basis-auto">Fernando Royano · CCAFYD</span>
            </div>
          </div>
        </header>

        {/* Hero image */}
        {article.ogImage && (
          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8" style={{ marginTop: '-3rem' }}>
            <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-black/5">
              <Image
                src={article.ogImage}
                alt={getArticleImageAlt(article)}
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}>
          <aside className="mb-10 flex gap-4 rounded-2xl border border-primary/15 bg-primary-50 p-5 text-fluid-sm leading-relaxed text-muted">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p><strong className="text-ink">Una guía para orientarte.</strong> No sustituye una valoración médica ni una recomendación individual. Si hay dolor, una caída reciente o un cambio brusco, consulta con un profesional sanitario.</p>
          </aside>
          <div className="prose-antea">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.bodyMarkdown}</ReactMarkdown>
          </div>

          {/* CTA final */}
          <div className="mt-16 p-8 rounded-3xl bg-primary text-white text-center">
            <h3 className="font-display font-bold text-fluid-2xl mb-3">
              ¿Quieres que evaluemos a tu familiar?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Primera valoración gratuita en su casa. Sin compromiso. Respuesta en menos de 24 horas.
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold text-fluid-base rounded-2xl hover:bg-accent-light transition-colors"
            >
              Solicita valoración gratuita
              <span>→</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
