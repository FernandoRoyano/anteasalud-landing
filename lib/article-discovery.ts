export const ARTICLE_CATEGORIES = [
  {
    id: 'caidas',
    label: 'Caminar y equilibrio',
    tags: ['prevención caídas', 'equilibrio'],
  },
  {
    id: 'fuerza',
    label: 'Fuerza para el día a día',
    tags: ['fuerza', 'autonomía', 'fragilidad', 'sarcopenia', 'movilidad'],
  },
  {
    id: 'valoracion',
    label: 'Valoración funcional',
    tags: ['valoración funcional', 'sppb', 'vivifrail'],
  },
  {
    id: 'recuperacion',
    label: 'Tras un ingreso u operación',
    tags: ['recuperación', 'readaptación', 'hospitalización', 'cadera', 'fractura', 'post-operatorio', 'fisioterapia'],
  },
  {
    id: 'ejercicio',
    label: 'Ejercicio adaptado',
    tags: ['ejercicio mayores', 'entrenamiento domicilio', 'entrenamiento personal', 'mayores madrid'],
  },
  {
    id: 'cognicion',
    label: 'Salud cognitiva',
    tags: ['deterioro cognitivo', 'alzheimer'],
  },
] as const;

export type CategoryId = 'todos' | (typeof ARTICLE_CATEGORIES)[number]['id'];

type SearchableArticle = { title: string; excerpt: string; tags: string[] };
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-ES').trim();

export function articleMatchesCategory(article: SearchableArticle, categoryId: CategoryId): boolean {
  if (categoryId === 'todos') return true;
  const category = ARTICLE_CATEGORIES.find(item => item.id === categoryId);
  const tags = new Set(article.tags.map(normalize));
  return category?.tags.some(tag => tags.has(normalize(tag))) ?? false;
}

export function articleMatchesSearch(article: SearchableArticle, query: string): boolean {
  const content = normalize([article.title, article.excerpt, ...article.tags].join(' '));
  return normalize(query).split(/\s+/).every(word => content.includes(word));
}

export const CATEGORY_START_GUIDES: Partial<Record<CategoryId, { href: string; title: string }>> = {
  caidas: { href: '/guias/caidas-personas-mayores', title: 'Caídas y equilibrio: por dónde empezar' },
  fuerza: { href: '/guias/perdida-fuerza-personas-mayores', title: 'Pérdida de fuerza: guía para familiares' },
  recuperacion: { href: '/guias/recuperacion-mayores', title: 'Volver a moverse tras un ingreso u operación' },
};
