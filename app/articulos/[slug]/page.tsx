import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getPublishedArticles } from '@/lib/sheets';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Calendar, ArrowLeft } from 'lucide-react';

// ISR 1h — los artículos publicados se refrescan al hueco siguiente.
export const revalidate = 3600;

// Pre-renderizado de rutas conocidas en build (las demás se generan al vuelo).
export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
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
      images: [article.ogImage || '/og-image.jpg'],
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.ogImage ? [article.ogImage] : ['https://anteasalud.com/og-image.jpg'],
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
        url: 'https://anteasalud.com/og-image.jpg',
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
        <header className="relative w-full bg-surface-alt" style={{ paddingTop: 'clamp(6rem, 12vw, 9rem)', paddingBottom: 'clamp(3rem, 6vw, 4rem)' }}>
          <div className="max-w-3xl mx-auto px-4">
            <Link
              href="/articulos"
              className="inline-flex items-center gap-1.5 text-fluid-sm text-muted hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a artículos
            </Link>

            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.7rem] font-semibold uppercase tracking-wider text-accent-dark bg-accent/10 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1
              className="font-display font-black tracking-tight text-ink leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
            >
              {article.title}
            </h1>
            <p className="text-fluid-xl text-muted leading-relaxed mb-8">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-fluid-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </span>
              <span>·</span>
              <span>Fernando Royano · CCAFYD · 14 años</span>
            </div>
          </div>
        </header>

        {/* Hero image */}
        {article.ogImage && (
          <div className="max-w-4xl mx-auto px-4" style={{ marginTop: '-2rem' }}>
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.ogImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="max-w-3xl mx-auto px-4" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}>
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
