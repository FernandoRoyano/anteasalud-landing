import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getPublishedArticles } from '@/lib/sheets';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { JsonLd } from '@/components/JsonLd';
import { getArticleImageAlt, getReadingMinutes } from '@/lib/article-editorial';
import {
  extractFaqs,
  extractToc,
  getRelatedArticles,
  getServiceForArticle,
  headingId,
} from '@/lib/article-structure';
import {
  DEFAULT_OG_IMAGE,
  ORGANIZATION_ID,
  PERSON_ID,
  SITE_URL,
  WEBSITE_ID,
  buildMetadata,
  isLocalImagePath,
} from '@/lib/seo';
import { ArrowLeft, ArrowRight, Calendar, Clock3, RefreshCw, ShieldCheck } from 'lucide-react';

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articulos/${article.slug}`,
    image: isLocalImagePath(article.ogImage) ? article.ogImage : DEFAULT_OG_IMAGE,
    imageAlt: getArticleImageAlt(article),
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt || article.publishedAt,
  });
}

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-ES', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function nodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return nodeText((node.props as { children?: ReactNode }).children);
  }
  return '';
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 id={headingId(nodeText(children))} className="scroll-mt-28">
      {children}
    </h2>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto" role="region" aria-label="Tabla" tabIndex={0}>
      <table>{children}</table>
    </div>
  ),
  a: ({ href, children }) => {
    const external = href?.startsWith('http');
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href ?? '#'}>{children}</Link>
    );
  },
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const url = `${SITE_URL}/articulos/${article.slug}`;
  const readingMinutes = getReadingMinutes(article.bodyMarkdown);
  const coverImage = isLocalImagePath(article.ogImage) ? article.ogImage : null;
  const modifiedAt = article.updatedAt || article.publishedAt;
  const wasUpdated = !!article.updatedAt && article.updatedAt.slice(0, 10) !== article.publishedAt.slice(0, 10);
  const toc = extractToc(article.bodyMarkdown);
  const faqs = extractFaqs(article.bodyMarkdown);
  const service = getServiceForArticle(article);

  let related: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  try {
    related = getRelatedArticles(article, await getPublishedArticles());
  } catch (error) {
    console.error('[Articulos:detail] No se pudieron cargar relacionados:', error);
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    image: [`${SITE_URL}${coverImage ?? DEFAULT_OG_IMAGE}`],
    datePublished: article.publishedAt,
    dateModified: modifiedAt,
    inLanguage: 'es-ES',
    wordCount: article.bodyMarkdown.split(/\s+/).filter(Boolean).length,
    articleSection: article.tags[0],
    keywords: article.tags.join(', '),
    author: { '@type': 'Person', '@id': PERSON_ID, name: 'Fernando Royano', url: `${SITE_URL}/sobre-fernando` },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const faqSchema = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: SITE_URL },
          { name: 'Artículos', url: `${SITE_URL}/articulos` },
          { name: article.title, url },
        ]}
      />

      <article className="w-full bg-surface">
        <header
          className="relative isolate w-full overflow-hidden bg-primary-dark text-white"
          style={{ paddingTop: 'clamp(7rem, 12vw, 10rem)', paddingBottom: 'clamp(5rem, 9vw, 8rem)' }}
        >
          <div className="absolute inset-0 antea-grid opacity-25" aria-hidden="true" />
          <div className="relative w-full max-w-3xl mx-auto px-5 sm:px-8">
            <Link
              href="/articulos"
              className="inline-flex min-h-11 items-center gap-1.5 text-fluid-base text-white/85 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Volver a artículos
            </Link>

            {article.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-5" aria-label="Temas">
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-sm font-semibold uppercase tracking-wide text-accent-light bg-white/10 px-2.5 py-1 rounded-full ring-1 ring-white/10"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <h1
              className="font-display font-black tracking-tight leading-[1.02] mb-6 text-balance"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
            >
              {article.title}
            </h1>
            <p className="text-fluid-xl text-white/85 leading-relaxed mb-8 max-w-3xl text-pretty">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-fluid-base text-white/85">
              <Link href="/sobre-fernando" className="font-semibold text-white underline underline-offset-4">
                Fernando Royano · CCAFYD
              </Link>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </span>
              {wasUpdated && (
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4" aria-hidden="true" />
                  Actualizado el <time dateTime={modifiedAt}>{formatDate(modifiedAt)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="w-4 h-4" aria-hidden="true" />
                {readingMinutes} min de lectura
              </span>
            </div>
          </div>
        </header>

        {coverImage && (
          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8" style={{ marginTop: '-3rem' }}>
            <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-black/5">
              <Image
                src={coverImage}
                alt={getArticleImageAlt(article)}
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div
          className="w-full max-w-3xl mx-auto px-5 sm:px-8"
          style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}
        >
          <aside className="mb-10 flex gap-4 rounded-2xl border border-primary/15 bg-primary-50 p-5 text-fluid-base leading-relaxed text-ink">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              <strong>Una guía para orientarte.</strong> No sustituye una valoración médica ni una recomendación
              individual. Si hay dolor, una caída reciente o un cambio brusco, consulta con un profesional sanitario.
            </p>
          </aside>

          {toc.length >= 3 && (
            <nav aria-labelledby="toc-title" className="mb-12 rounded-2xl border border-border bg-white p-6">
              <h2 id="toc-title" className="font-display text-fluid-xl font-bold text-ink">
                En este artículo
              </h2>
              <ol className="mt-4 space-y-1 text-fluid-base">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="inline-flex min-h-10 items-center text-primary underline-offset-4 hover:underline">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="prose-antea">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {article.bodyMarkdown}
            </ReactMarkdown>
          </div>

          <section aria-labelledby="author-title" className="mt-16 flex flex-col gap-5 rounded-3xl border border-border bg-white p-7 sm:flex-row">
            <Image
              src="/hero-fernando.png"
              alt="Fernando Royano"
              width={96}
              height={96}
              className="size-24 shrink-0 rounded-full object-cover object-[52%_20%]"
            />
            <div>
              <h2 id="author-title" className="font-display text-fluid-xl font-bold text-ink">
                Escrito por Fernando Royano
              </h2>
              <p className="mt-2 text-fluid-base leading-relaxed text-muted">
                Graduado en Ciencias de la Actividad Física y del Deporte (CCAFYD), con 14 años como entrenador personal
                a domicilio en Madrid, especializado en personas mayores.
              </p>
              <Link href="/sobre-fernando" className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary">
                Conoce su forma de trabajar <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <div className="mt-10 p-8 rounded-3xl bg-primary text-white text-center">
            <h2 className="font-display font-bold text-fluid-2xl mb-3">¿Quieres que valoremos a tu familiar?</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto text-fluid-base">
              Primera valoración gratuita en su casa, en Madrid. Sin compromiso. Respuesta en menos de 24 horas.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/valoracion-gratuita"
                className="inline-flex min-h-14 items-center gap-2 px-8 bg-white text-primary font-semibold text-fluid-base rounded-2xl hover:bg-accent-light transition-colors"
              >
                Solicitar valoración gratuita <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link href={service.href} className="inline-flex min-h-14 items-center px-4 font-semibold text-white underline underline-offset-4">
                {service.label}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-primary-50 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 id="related-title" className="font-display text-fluid-3xl font-bold text-ink">
              Sigue leyendo
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/articulos/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] bg-surface-alt">
                      <Image
                        src={isLocalImagePath(item.ogImage) ? item.ogImage : DEFAULT_OG_IMAGE}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <span className="flex flex-1 flex-col p-5">
                      <span className="font-display text-fluid-lg font-bold leading-snug text-ink group-hover:text-primary">
                        {item.title}
                      </span>
                      <span className="mt-2 text-fluid-base text-muted line-clamp-3">{item.excerpt}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
