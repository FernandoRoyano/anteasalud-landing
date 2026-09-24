import { NextRequest, NextResponse } from 'next/server';
import { updateClient, deleteClient } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import { clientUpdateSchema, invalidBody } from '@/lib/admin-schemas';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const parsed = clientUpdateSchema.safeParse(await req.json());
    if (!parsed.success) return invalidBody(parsed.error);

    await updateClient(id, parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error actualizando cliente:', error);
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
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
    await deleteClient(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error desactivando cliente:', error);
    return NextResponse.json({ error: 'Error al desactivar' }, { status: 500 });
  }
}
