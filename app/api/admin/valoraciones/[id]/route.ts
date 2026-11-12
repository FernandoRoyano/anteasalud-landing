import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isAuthenticated } from '@/lib/auth';
import { deleteAssessmentReport } from '@/lib/sheets';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) return NextResponse.json({ error: 'Identificador no válido' }, { status: 400 });
  try {
    if (!(await deleteAssessmentReport(id))) return NextResponse.json({ error: 'La valoración ya no existe' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    console.error('[Reports:DELETE] No se pudo borrar la valoración');
    return NextResponse.json({ error: 'No se pudo borrar. Recarga el historial antes de intentarlo de nuevo.' }, { status: 500 });
  }
}
