import { NextRequest, NextResponse } from 'next/server';
import { createSession, destroySession, verifyPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Contraseña requerida' }, { status: 400 });
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    await createSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
