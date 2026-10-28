import { NextRequest, NextResponse } from 'next/server';
import { deleteLead, updateLead } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import type { LeadSource } from '@/lib/types';
import { z } from 'zod';

const updatesSchema = z.object({
  estado: z.enum(['Nuevo', 'Contactado', 'En seguimiento', 'Valoración agendada', 'Valoración realizada', 'Convertido', 'Descartado']).optional(),
  notas: z.string().max(5000).optional(),
  proximaAccion: z.string().trim().max(200).optional(),
  fechaSeguimiento: z.union([z.literal(''), z.iso.date()]).optional(),
  motivoDescarte: z.string().trim().max(300).optional(),
}).strict().refine(value => Object.keys(value).length > 0);

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ row: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const { row } = await params;
  const source = req.nextUrl.searchParams.get('source');
  if (!/^(?:[0-9a-f]{8}-[0-9a-f-]{27}|legacy-[0-9a-f]{64})$/.test(row) || !['formulario', 'guia'].includes(source || '')) {
    return NextResponse.json({ error: 'Identificador o procedencia inválidos; recarga el panel' }, { status: 400 });
  }
  try {
    await deleteLead(row, source as LeadSource);
    return NextResponse.json({ ok: true });
  } catch {
    console.error('[Leads:DELETE] No se pudo borrar el contacto');
    return NextResponse.json({ error: 'No se pudo borrar el contacto. Recarga el panel e inténtalo de nuevo.' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ row: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { row } = await params;
    if (!/^(?:[0-9a-f]{8}-[0-9a-f-]{27}|legacy-[0-9a-f]{64})$/.test(row)) {
      return NextResponse.json({ error: 'Identificador inválido; recarga el panel' }, { status: 400 });
    }

    // Source: de qué pestaña viene el lead (formulario o guia). Default: formulario.
    const sourceParam = req.nextUrl.searchParams.get('source');
    const source: LeadSource = sourceParam === 'guia' ? 'guia' : 'formulario';

    const parsed = updatesSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Revisa los datos de seguimiento' }, { status: 400 });
    }

    await updateLead(row, source, parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error actualizando lead:', error);
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}
