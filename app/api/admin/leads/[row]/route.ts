import { NextRequest, NextResponse } from 'next/server';
import { updateLead } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import type { LeadSource } from '@/lib/types';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ row: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { row } = await params;
    const rowNumber = parseInt(row, 10);

    if (isNaN(rowNumber) || rowNumber < 2) {
      return NextResponse.json({ error: 'Fila inválida' }, { status: 400 });
    }

    // Source: de qué pestaña viene el lead (formulario o guia). Default: formulario.
    const sourceParam = req.nextUrl.searchParams.get('source');
    const source: LeadSource = sourceParam === 'guia' ? 'guia' : 'formulario';

    const body = await req.json();
    const updates: { estado?: string; notas?: string } = {};

    if (typeof body.estado === 'string') updates.estado = body.estado;
    if (typeof body.notas === 'string') updates.notas = body.notas;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 });
    }

    await updateLead(rowNumber, source, updates);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error actualizando lead:', error);
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}
