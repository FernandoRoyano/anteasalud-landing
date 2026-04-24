import { NextRequest, NextResponse } from 'next/server';
import { getArticleById, updateArticle, deleteArticle } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ article });
  } catch (error) {
    console.error('[articulos/[id]:GET]', error);
    return NextResponse.json({ error: 'Error al leer artículo' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();

    const updates: Record<string, unknown> = {};
    if (typeof body.slug === 'string') updates.slug = body.slug;
    if (typeof body.title === 'string') updates.title = body.title;
    if (typeof body.excerpt === 'string') updates.excerpt = body.excerpt;
    if (typeof body.bodyMarkdown === 'string') updates.bodyMarkdown = body.bodyMarkdown;
    if (typeof body.ogImage === 'string') updates.ogImage = body.ogImage;
    if (Array.isArray(body.tags)) updates.tags = body.tags;
    if (body.status === 'draft' || body.status === 'published') updates.status = body.status;

    const article = await updateArticle(id, updates);
    return NextResponse.json({ article });
  } catch (error) {
    console.error('[articulos/[id]:PATCH]', error);
    return NextResponse.json({ error: 'Error al actualizar artículo' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const { id } = await params;
    await deleteArticle(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[articulos/[id]:DELETE]', error);
    return NextResponse.json({ error: 'Error al eliminar artículo' }, { status: 500 });
  }
}
