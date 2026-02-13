import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, zona, interes } = body;

    // Validación de campos obligatorios
    if (!nombre || !telefono) {
      return NextResponse.json(
        { error: 'Nombre y teléfono son obligatorios' },
        { status: 400 }
      );
    }

    // Fecha en zona horaria de España
    const fecha = new Date().toLocaleString('es-ES', {
      timeZone: 'Europe/Madrid',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Autenticación con Google Sheets
    // Soporta tanto GOOGLE_CREDENTIALS (JSON completo) como variables separadas
    let credentials;
    if (process.env.GOOGLE_CREDENTIALS) {
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    } else {
      credentials = {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      };
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Detectar nombre de la primera hoja
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetName = spreadsheet.data.sheets?.[0]?.properties?.title ?? 'Hoja 1';

    // Escribir fila en Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:H`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[fecha, nombre, email || '', telefono, zona || '', interes || '', 'Nuevo', '']],
      },
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
          phone: telefono,
          zona: zona || 'No especificada',
          interes: interes || 'No especificado',
          fecha,
        },
      }),
    });

    // Webhook de Make (activar cuando esté configurado)
    // const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
    // if (MAKE_WEBHOOK_URL) {
    //   await fetch(MAKE_WEBHOOK_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ fecha, nombre, email, telefono, zona, interes }),
    //   });
    // }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error al guardar en Google Sheets:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
