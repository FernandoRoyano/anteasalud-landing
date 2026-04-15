import { NextRequest, NextResponse } from 'next/server';
import { saveLead } from '@/lib/sheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, zona, interes } = body;

    // Validación: nombre siempre obligatorio, y al menos teléfono o email
    if (!nombre || (!telefono && !email)) {
      return NextResponse.json(
        { error: 'Nombre y (teléfono o email) son obligatorios' },
        { status: 400 }
      );
    }

    // Guarda el lead en la pestaña correcta de Google Sheets según el tipo
    // de interés (los que vienen de la guía van a una pestaña aparte).
    await saveLead({ nombre, email, telefono, zona, interes });

    // Fecha formateada para la notificación por email
    const fecha = new Date().toLocaleString('es-ES', {
      timeZone: 'Europe/Madrid',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Notificación por email vía EmailJS
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_antea_contacto',
        template_id: 'Antea Salud',
        user_id: 'GkuifuSj9iMoXN9fw',
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error al procesar lead:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
