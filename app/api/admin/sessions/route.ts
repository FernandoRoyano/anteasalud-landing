import { NextRequest, NextResponse } from 'next/server';
import { getAllSessions, createSession } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import { invalidBody, sessionCreateSchema } from '@/lib/admin-schemas';

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
    console.error('[admin/sessions:GET]', error);
    return NextResponse.json({ error: 'Error al leer sesiones' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const parsed = sessionCreateSchema.safeParse(await req.json());
    if (!parsed.success) return invalidBody(parsed.error);

    const session = await createSession(parsed.data);

    return NextResponse.json({ session });
  } catch (error) {
    console.error('[admin/sessions:POST]', error);
    return NextResponse.json({ error: 'Error al crear sesión' }, { status: 500 });
  }
}
