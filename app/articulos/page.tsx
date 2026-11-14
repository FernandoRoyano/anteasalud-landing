import Link from 'next/link';
import type { Metadata } from 'next';
import { FamilyGuideLinks } from '@/components/FamilyGuideLinks';
import { getPublishedArticles } from '@/lib/sheets';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticlesFilter } from '@/components/ArticlesFilter';
import { getArticleImageAlt, getReadingMinutes } from '@/lib/article-editorial';
import { DEFAULT_OG_IMAGE, SITE_URL, buildMetadata, isLocalImagePath } from '@/lib/seo';

const URL_PAGE = `${SITE_URL}/articulos`;

export const metadata: Metadata = buildMetadata({
  title: 'Artículos sobre ejercicio y autonomía en personas mayores',
  description:
    'Artículos con evidencia sobre ejercicio, caídas, fuerza, fragilidad y recuperación en personas mayores, escritos por un graduado en CCAFYD.',
  path: '/articulos',
});

// Revalida cada hora — cuando se publica un artículo nuevo aparece en <1h
export const revalidate = 3600;

export default async function ArticulosIndexPage() {
  let loadFailed = false;
  let articles: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  try {
    articles = await getPublishedArticles();
  } catch (error) {
    loadFailed = true;
    console.error('[Articulos:index] No se pudieron cargar los artículos:', error);
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Inicio', url: 'https://anteasalud.com' },
          { name: 'Artículos', url: URL_PAGE },
        ]}
      />

      <section className="bg-primary-50 px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight tracking-tight text-primary-dark">Guías y artículos para ayudar a tu familiar.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">Encuentra una explicación para lo que habéis notado y orientación para vuestro siguiente paso. Puedes empezar por una situación o buscar un tema concreto.</p>
        </div>
      </section>
      <section className="bg-surface px-5 pt-10 sm:px-8"><div className="mx-auto max-w-6xl"><h2 className="mb-5 font-display text-2xl font-bold text-primary-dark">Empieza por vuestra situación</h2><FamilyGuideLinks headingLevel="h3" /></div></section>

      {/* Listado */}
      <section className="w-full bg-surface" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-fluid-lg text-muted">
                {loadFailed ? 'Ahora no podemos cargar el listado de artículos. Puedes seguir consultando las guías por situación.' : 'Pronto publicaremos los primeros artículos.'}
              </p>
              {loadFailed && <Link href="/guias" className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Consultar guías para familias</Link>}
            </div>
          ) : (
            <ArticlesFilter
              articles={articles.map((article) => ({
                id: article.id,
                slug: article.slug,
                title: article.title,
                excerpt: article.excerpt,
                ogImage: isLocalImagePath(article.ogImage) ? article.ogImage : DEFAULT_OG_IMAGE,
                imageAlt: getArticleImageAlt(article),
                tags: article.tags,
                publishedAt: article.publishedAt,
                readingMinutes: getReadingMinutes(article.bodyMarkdown),
              }))}
            />
          )}
        </div>
      </section>
    </>
  );
}
