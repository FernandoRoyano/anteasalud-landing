import { NextRequest, NextResponse } from 'next/server';
import { updateSession, deleteSession } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import type { SessionStatus } from '@/lib/types';

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
    if (typeof body.date === 'string') updates.date = body.date;
    if (typeof body.status === 'string') updates.status = body.status as SessionStatus;
    if (typeof body.isPending === 'boolean') updates.isPending = body.isPending;
    if (typeof body.missedReason === 'string') updates.missedReason = body.missedReason;
    if (typeof body.notes === 'string') updates.notes = body.notes;

    await updateSession(id, updates);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error actualizando sesión:', error);
    const message = error instanceof Error ? error.message : 'Error al actualizar';
    return NextResponse.json({ error: message }, { status: 500 });
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
    console.error('Error borrando sesión:', error);
    const message = error instanceof Error ? error.message : 'Error al borrar';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
