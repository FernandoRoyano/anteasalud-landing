import { NextResponse } from 'next/server';
import { getAllLeads } from '@/lib/sheets';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const leads = await getAllLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error leyendo leads:', error);
    return NextResponse.json({ error: 'Error al leer los leads' }, { status: 500 });
  }
}
