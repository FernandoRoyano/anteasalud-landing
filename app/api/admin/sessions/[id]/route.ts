import { NextRequest, NextResponse } from 'next/server';
import { updateSession, deleteSession } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import { invalidBody, sessionUpdateSchema } from '@/lib/admin-schemas';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const parsed = sessionUpdateSchema.safeParse(await req.json());
    if (!parsed.success) return invalidBody(parsed.error);

    await updateSession(id, parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[admin/sessions/[id]:PATCH]', error);
    return NextResponse.json({ error: 'Error al actualizar la sesión' }, { status: 500 });
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
    await deleteSession(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[admin/sessions/[id]:DELETE]', error);
    return NextResponse.json({ error: 'Error al borrar la sesión' }, { status: 500 });
  }
}
