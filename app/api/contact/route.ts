import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveLead } from '@/lib/sheets';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

const optionalText = (max: number) => z.string().trim().max(max).optional().default('');

const leadSchema = z
  .object({
    nombre: z.string().trim().min(2).max(100),
    email: z.union([z.literal(''), z.string().trim().pipe(z.email().max(254))]).optional().default(''),
    telefono: z
      .union([z.literal(''), z.string().trim().regex(/^[+\d\s().-]{9,20}$/)])
      .optional()
      .default(''),
    zona: optionalText(120),
    interes: optionalText(1000),
    consent: z.literal(true),
    website: z.string().optional(),
    fillMs: z.number().optional(),
  })
  .refine((d) => d.email || d.telefono, { message: 'Teléfono o email obligatorio' });

const MIN_FILL_MS = 2000;

export async function POST(req: NextRequest) {
  if (!rateLimit(`contact:${getClientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Inténtalo en unos minutos.' },
      { status: 429 }
    );
  }

  try {
    const parsed = leadSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Revisa los datos: nombre, teléfono o email válido y aceptar la política de privacidad.' },
        { status: 400 }
      );
    }

    const { nombre, email, telefono, zona, interes, website, fillMs } = parsed.data;

    // Bots: honeypot relleno o envío instantáneo → respondemos OK sin guardar nada
    if (website || (fillMs !== undefined && fillMs < MIN_FILL_MS)) {
      return NextResponse.json({ ok: true });
    }

    const fecha = new Date().toLocaleString('es-ES', {
      timeZone: 'Europe/Madrid',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Guarda el lead en la pestaña correcta de Google Sheets según el tipo
    // de interés (los que vienen de la guía van a una pestaña aparte).
    await saveLead({ nombre, email, telefono, zona, interes, consentAt: `Sí · ${fecha}` });

    // Notificación por email vía EmailJS.
    // EmailJS bloquea por defecto las llamadas que no vienen del navegador, así
    // que al hacerlo desde el servidor hay que enviar la Private Key como
    // accessToken (variable de entorno EMAILJS_PRIVATE_KEY en Vercel).
    const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID || 'service_antea_contacto',
        template_id: process.env.EMAILJS_TEMPLATE_ID || 'Antea Salud',
        user_id: process.env.EMAILJS_PUBLIC_KEY || 'GkuifuSj9iMoXN9fw',
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          user_name: nombre,
          user_email: email || 'No proporcionado',
          phone: telefono || 'No proporcionado',
          zona: zona || 'No especificada',
          interes: interes || 'No especificado',
          fecha,
        },
      }),
    });

    // No bloqueamos al usuario si el email falla (el lead ya está en Sheets),
    // pero dejamos rastro en logs para no volver a tener fallos silenciosos.
    if (!emailRes.ok) {
      const detail = await emailRes.text().catch(() => '');
      console.error(`[contact:email] EmailJS respondió ${emailRes.status}: ${detail}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact:POST] Error al procesar lead:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
