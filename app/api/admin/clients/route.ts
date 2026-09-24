import { NextRequest, NextResponse } from 'next/server';
import { getAllClients, createClient } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';
import { clientCreateSchema, invalidBody } from '@/lib/admin-schemas';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const clients = await getAllClients();
    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error leyendo clientes:', error);
    return NextResponse.json({ error: 'Error al leer los clientes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const parsed = clientCreateSchema.safeParse(await req.json());
    if (!parsed.success) return invalidBody(parsed.error);

    const client = await createClient(parsed.data);

    return NextResponse.json({ client });
  } catch (error) {
    console.error('Error creando cliente:', error);
    return NextResponse.json({ error: 'Error al crear cliente' }, { status: 500 });
  }
}
