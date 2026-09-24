import { NextRequest, NextResponse } from 'next/server';
import { createSession, destroySession, verifyPassword } from '@/lib/auth';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  if (!rateLimit(`login:${getClientIp(req)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Inténtalo en 15 minutos.' },
      { status: 429 }
    );
  }

  try {
    const { password } = await req.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Contraseña requerida' }, { status: 400 });
    }

    if (!(await verifyPassword(password))) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    if (!(await createSession())) {
      console.error('[admin/auth:POST] Falta SESSION_SECRET/ADMIN_PASSWORD');
      return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
