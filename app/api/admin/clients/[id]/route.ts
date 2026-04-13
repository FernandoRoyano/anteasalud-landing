import { NextRequest, NextResponse } from 'next/server';
import { updateClient, deleteClient } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';

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
    if (typeof body.name === 'string') updates.name = body.name;
    if (typeof body.phone === 'string') updates.phone = body.phone;
    if (typeof body.address === 'string') updates.address = body.address;
    if (typeof body.zone === 'string') updates.zone = body.zone;
    if (body.pricePerSession !== undefined) updates.pricePerSession = Number(body.pricePerSession);
    if (typeof body.color === 'string') updates.color = body.color;
    if (typeof body.notes === 'string') updates.notes = body.notes;
    if (typeof body.active === 'boolean') updates.active = body.active;
    if (typeof body.contactName === 'string') updates.contactName = body.contactName;

    await updateClient(id, updates);
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
