import { NextRequest, NextResponse } from 'next/server';
import { getAllClients, createClient } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';

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
    const body = await req.json();
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }

    const client = await createClient({
      name: body.name,
      phone: body.phone || '',
      address: body.address || '',
      zone: body.zone || 'capital',
      pricePerSession: Number(body.pricePerSession) || 35,
      color: body.color || '#1e4a6d',
      notes: body.notes || '',
      active: body.active !== false,
    });

    return NextResponse.json({ client });
  } catch (error) {
    console.error('Error creando cliente:', error);
    return NextResponse.json({ error: 'Error al crear cliente' }, { status: 500 });
  }
}
