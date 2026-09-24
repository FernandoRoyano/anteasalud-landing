import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles, createArticle } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import { articleCreateSchema, invalidBody } from '@/lib/admin-schemas';

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
    const parsed = articleCreateSchema.safeParse(await req.json());
    if (!parsed.success) return invalidBody(parsed.error);

    const article = await createArticle({ ...parsed.data, publishedAt: '' });
    return NextResponse.json({ article });
  } catch (error) {
    console.error('[articulos:POST]', error);
    return NextResponse.json({ error: 'Error al crear artículo' }, { status: 500 });
  }
}
