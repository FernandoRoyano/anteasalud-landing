import type { Article } from '@/lib/types';

export interface TocItem {
  id: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Texto plano de una línea markdown (sin **, `, enlaces ni imágenes) */
export function stripMarkdown(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim();
}

export function headingId(text: string): string {
  return stripMarkdown(text)
    .toLocaleLowerCase('es-ES')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function extractToc(markdown: string): TocItem[] {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map(([, raw]) => ({
    id: headingId(raw),
    text: stripMarkdown(raw),
  }));
}

/** Preguntas de la sección «## Preguntas frecuentes» (formato ### pregunta + párrafos) */
export function extractFaqs(markdown: string): FaqItem[] {
  const section = markdown.split(/^##\s+Preguntas frecuentes\s*$/im)[1];
  if (!section) return [];
  const body = section.split(/^##\s+/m)[0];

  return body
    .split(/^###\s+/m)
    .slice(1)
    .map((block) => {
      const [firstLine, ...rest] = block.split('\n');
      return {
        question: stripMarkdown(firstLine),
        answer: stripMarkdown(rest.join(' ').replace(/\s+/g, ' ')),
      };
    })
    .filter((faq) => faq.question && faq.answer);
}

export function getRelatedArticles(article: Article, all: Article[], limit = 3): Article[] {
  const tags = new Set(article.tags.map((t) => t.toLocaleLowerCase('es-ES')));
  return all
    .filter((a) => a.id !== article.id)
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => tags.has(t.toLocaleLowerCase('es-ES'))).length,
    }))
    .sort((a, b) => b.score - a.score || (b.article.publishedAt || '').localeCompare(a.article.publishedAt || ''))
    .slice(0, limit)
    .map(({ article: a }) => a);
}

const SERVICE_BY_TOPIC: Array<{ match: RegExp; href: string; label: string }> = [
  { match: /ca[ií]da|equilibrio/i, href: '/prevencion-caidas-mayores-madrid', label: 'Prevención de caídas a domicilio' },
  {
    match: /recuperaci|readaptaci|cadera|fractura|hospital|operaci|fisioterap/i,
    href: '/recuperar-autonomia-mayores-madrid',
    label: 'Recuperar autonomía tras una operación u hospitalización',
  },
];

/** Página de servicio más relacionada con el artículo (enlazado interno por intención) */
export function getServiceForArticle(article: Article): { href: string; label: string } {
  const haystack = `${article.tags.join(' ')} ${article.title}`;
  return (
    SERVICE_BY_TOPIC.find((s) => s.match.test(haystack)) ?? {
      href: '/ejercicio-personas-mayores-madrid',
      label: 'Ejercicio para personas mayores a domicilio',
    }
  );
}
