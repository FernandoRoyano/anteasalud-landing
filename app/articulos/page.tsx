import type { Metadata } from 'next';
import { getPublishedArticles } from '@/lib/sheets';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ArticlesFilter } from '@/components/ArticlesFilter';
import { getArticleImageAlt, getReadingMinutes } from '@/lib/article-editorial';
import { DEFAULT_OG_IMAGE, SITE_URL, buildMetadata, isLocalImagePath } from '@/lib/seo';

const URL_PAGE = `${SITE_URL}/articulos`;

export const metadata: Metadata = buildMetadata({
  title: 'Guías de ejercicio para personas mayores',
  description:
    'Artículos con evidencia sobre ejercicio, caídas, fuerza, fragilidad y recuperación en personas mayores, escritos por un graduado en CCAFYD.',
  path: '/articulos',
});

// Revalida cada hora — cuando se publica un artículo nuevo aparece en <1h
export const revalidate = 3600;

export default async function ArticulosIndexPage() {
  let articles: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  try {
    articles = await getPublishedArticles();
  } catch (error) {
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

      <section className="relative isolate w-full overflow-hidden bg-primary-dark text-white" style={{ paddingTop: 'clamp(7rem, 12vw, 10rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
        <div className="absolute inset-0 antea-grid opacity-30" aria-hidden="true" />
        <div className="absolute -right-24 -top-20 size-96 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-fluid-sm font-semibold uppercase tracking-[0.25em] text-accent-light mb-6">Cuaderno ANTEA · Guías para familias</p>
          <h1
            className="max-w-4xl font-display font-black tracking-tight leading-[0.98] mb-7 text-balance"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Entender el movimiento<br />
            <span className="text-accent-light">cambia cómo cuidamos.</span>
          </h1>
          <p className="text-fluid-xl text-white/85 leading-relaxed max-w-2xl text-pretty">
            Ideas prácticas para familias que quieren ayudar con criterio: qué observar, qué puede aportar el ejercicio y cuándo pedir ayuda.
          </p>
        </div>
      </section>

      {/* Listado */}
      <section className="w-full bg-surface" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-fluid-lg text-muted">
                Pronto publicaremos los primeros artículos.
              </p>
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
