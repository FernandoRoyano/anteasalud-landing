import { NextRequest, NextResponse } from 'next/server';
import { getAllSessions, createSession } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import type { SessionStatus } from '@/lib/types';

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const all = await getAllSessions();
    const clientId = req.nextUrl.searchParams.get('clientId');
    const sessions = clientId ? all.filter((s) => s.clientId === clientId) : all;
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error('Error leyendo sesiones:', error);
    return NextResponse.json({ error: 'Error al leer sesiones' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.clientId || !body.date) {
      return NextResponse.json(
        { error: 'clientId y date son obligatorios' },
        { status: 400 }
      );
    }

    const session = await createSession({
      clientId: body.clientId,
      date: body.date,
      status: (body.status as SessionStatus) || 'scheduled',
      isPending: Boolean(body.isPending),
      missedReason: body.missedReason || '',
      linkedToSessionId: body.linkedToSessionId || '',
      notes: body.notes || '',
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error creando sesión:', error);
    return NextResponse.json({ error: 'Error al crear sesión' }, { status: 500 });
  }
}
