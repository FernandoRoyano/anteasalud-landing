import { google, sheets_v4 } from 'googleapis';
import type { Lead } from './types';

export type { Lead };

let cachedClient: sheets_v4.Sheets | null = null;
let cachedSheetName: string | null = null;

function getSheetsClient(): sheets_v4.Sheets {
  if (cachedClient) return cachedClient;

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

  cachedClient = google.sheets({ version: 'v4', auth });
  return cachedClient;
}

async function getSheetName(sheets: sheets_v4.Sheets, spreadsheetId: string): Promise<string> {
  if (cachedSheetName) return cachedSheetName;
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  cachedSheetName = spreadsheet.data.sheets?.[0]?.properties?.title ?? 'Hoja 1';
  return cachedSheetName;
}

/** Lee todos los leads desde Google Sheets */
export async function getAllLeads(): Promise<Lead[]> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const sheetName = await getSheetName(sheets, spreadsheetId);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A2:H`,
  });

  const rows = response.data.values || [];

  return rows.map((row, index) => ({
    row: index + 2, // +2 porque A2 es la primera fila de datos
    fecha: row[0] || '',
    nombre: row[1] || '',
    email: row[2] || '',
    telefono: row[3] || '',
    zona: row[4] || '',
    interes: row[5] || '',
    estado: row[6] || 'Nuevo',
    notas: row[7] || '',
  }));
}

/** Actualiza el estado y/o las notas de un lead concreto */
export async function updateLead(
  rowNumber: number,
  updates: { estado?: string; notas?: string }
): Promise<void> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const sheetName = await getSheetName(sheets, spreadsheetId);

  // Leer la fila actual para no perder datos al hacer updates parciales
  const current = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!G${rowNumber}:H${rowNumber}`,
  });

  const currentRow = current.data.values?.[0] || ['', ''];
  const newEstado = updates.estado !== undefined ? updates.estado : (currentRow[0] || '');
  const newNotas = updates.notas !== undefined ? updates.notas : (currentRow[1] || '');

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!G${rowNumber}:H${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[newEstado, newNotas]],
    },
  });
}
