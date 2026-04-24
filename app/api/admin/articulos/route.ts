import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles, createArticle } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const articles = await getAllArticles();
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('[articulos:GET]', error);
    return NextResponse.json({ error: 'Error al leer artículos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
    }
    const article = await createArticle({
      slug: body.slug || '',
      title: body.title,
      excerpt: body.excerpt || '',
      bodyMarkdown: body.bodyMarkdown || '',
      ogImage: body.ogImage || '',
      tags: Array.isArray(body.tags) ? body.tags : [],
      status: body.status === 'published' ? 'published' : 'draft',
      publishedAt: '',
    });
    return NextResponse.json({ article });
  } catch (error) {
    console.error('[articulos:POST]', error);
    return NextResponse.json({ error: 'Error al crear artículo' }, { status: 500 });
  }
}
