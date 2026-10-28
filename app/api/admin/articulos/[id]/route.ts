import { NextRequest, NextResponse } from 'next/server';
import { getArticleById, updateArticle, deleteArticle } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import { articleUpdateSchema, invalidBody } from '@/lib/admin-schemas';
import { revalidatePath } from 'next/cache';

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
    const parsed = articleUpdateSchema.safeParse(await req.json());
    if (!parsed.success) return invalidBody(parsed.error);

    const article = await updateArticle(id, parsed.data);
    revalidatePath('/articulos', 'layout');
    revalidatePath('/guias', 'layout');
    revalidatePath('/sitemap.xml');
    revalidatePath('/llms.txt');
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
    revalidatePath('/articulos', 'layout');
    revalidatePath('/guias', 'layout');
    revalidatePath('/sitemap.xml');
    revalidatePath('/llms.txt');
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[articulos/[id]:DELETE]', error);
    return NextResponse.json({ error: 'Error al eliminar artículo' }, { status: 500 });
  }
}
