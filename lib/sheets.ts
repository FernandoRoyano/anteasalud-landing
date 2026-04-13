import { google, sheets_v4 } from 'googleapis';
import type { Client, Lead, Session, SessionStatus, Zone } from './types';

export type { Client, Lead, Session, SessionStatus, Zone };

// =============================================================================
// CONFIG
// =============================================================================

const LEADS_SHEET = 'Hoja 1'; // Se detecta automáticamente si no coincide
const CLIENTES_SHEET = 'Clientes';
const SESIONES_SHEET = 'Sesiones';

const CLIENTES_HEADERS = [
  'id',
  'name',
  'phone',
  'address',
  'zone',
  'pricePerSession',
  'color',
  'notes',
  'active',
  'createdAt',
  'contactName',
];

const SESIONES_HEADERS = [
  'id',
  'clientId',
  'date',
  'status',
  'isPending',
  'missedReason',
  'linkedToSessionId',
  'notes',
  'createdAt',
  'updatedAt',
];

// =============================================================================
// CLIENT / AUTH
// =============================================================================

let cachedClient: sheets_v4.Sheets | null = null;
let cachedLeadsSheetName: string | null = null;
const existingSheets = new Set<string>();

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

/** Garantiza que una hoja existe con las cabeceras dadas. La crea si no existe. */
async function ensureSheet(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
  headers: string[]
): Promise<void> {
  if (existingSheets.has(sheetName)) return;

  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const found = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === sheetName
  );

  if (!found) {
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: sheetName } } }],
        },
      });
    } catch (err: unknown) {
      // Race condition: otra lambda concurrente ya creó la hoja.
      // Ignoramos el error "already exists" y continuamos.
      const message = err instanceof Error ? err.message : String(err);
      if (!message.toLowerCase().includes('already exists')) {
        throw err;
      }
    }
  }

  // Asegurar cabeceras
  const lastCol = String.fromCharCode(64 + headers.length);
  const headerRange = `${sheetName}!A1:${lastCol}1`;
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });

  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
  }

  existingSheets.add(sheetName);
}

// =============================================================================
// LEADS (sección de la web pública)
// =============================================================================

async function getLeadsSheetName(sheets: sheets_v4.Sheets, spreadsheetId: string): Promise<string> {
  if (cachedLeadsSheetName) return cachedLeadsSheetName;
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  cachedLeadsSheetName = spreadsheet.data.sheets?.[0]?.properties?.title ?? LEADS_SHEET;
  return cachedLeadsSheetName;
}

export async function getAllLeads(): Promise<Lead[]> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const sheetName = await getLeadsSheetName(sheets, spreadsheetId);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A2:H`,
  });

  const rows = response.data.values || [];

  return rows.map((row, index) => ({
    row: index + 2,
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

export async function updateLead(
  rowNumber: number,
  updates: { estado?: string; notas?: string }
): Promise<void> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const sheetName = await getLeadsSheetName(sheets, spreadsheetId);

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

// =============================================================================
// CLIENTES
// =============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function getAllClients(): Promise<Client[]> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  await ensureSheet(sheets, spreadsheetId, CLIENTES_SHEET, CLIENTES_HEADERS);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${CLIENTES_SHEET}!A2:K`,
  });

  const rows = response.data.values || [];

  return rows.map((row, index) => ({
    row: index + 2,
    id: String(row[0] ?? '').trim(),
    name: String(row[1] ?? '').trim(),
    phone: String(row[2] ?? '').trim(),
    address: String(row[3] ?? ''),
    zone: (String(row[4] ?? 'capital').trim() as Zone) || 'capital',
    pricePerSession: Number(row[5]) || 35,
    color: String(row[6] ?? '#1e4a6d').trim(),
    notes: String(row[7] ?? ''),
    active: String(row[8] ?? '').toUpperCase() === 'TRUE',
    createdAt: String(row[9] ?? ''),
    contactName: String(row[10] ?? '').trim(),
  }));
}

export async function getClientById(id: string): Promise<Client | null> {
  const clients = await getAllClients();
  return clients.find((c) => c.id === id) || null;
}

export async function createClient(data: Omit<Client, 'id' | 'row' | 'createdAt'> & { id?: string }): Promise<Client> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  await ensureSheet(sheets, spreadsheetId, CLIENTES_SHEET, CLIENTES_HEADERS);

  // Generar ID único desde el nombre
  let baseId = data.id || slugify(data.name);
  if (!baseId) baseId = 'cliente';

  const existing = await getAllClients();
  let id = baseId;
  let counter = 2;
  while (existing.some((c) => c.id === id)) {
    id = `${baseId}-${counter++}`;
  }

  const createdAt = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${CLIENTES_SHEET}!A:K`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [
        [
          id,
          data.name,
          data.phone || '',
          data.address || '',
          data.zone,
          data.pricePerSession,
          data.color,
          data.notes || '',
          data.active ? 'TRUE' : 'FALSE',
          createdAt,
          data.contactName || '',
        ],
      ],
    },
  });

  return { ...data, id, createdAt };
}

export async function updateClient(id: string, updates: Partial<Client>): Promise<void> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  const existing = await getAllClients();
  const client = existing.find((c) => c.id === id);
  if (!client || !client.row) throw new Error(`Cliente ${id} no encontrado`);

  const merged = { ...client, ...updates };

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${CLIENTES_SHEET}!A${client.row}:K${client.row}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [
        [
          merged.id,
          merged.name,
          merged.phone || '',
          merged.address || '',
          merged.zone,
          merged.pricePerSession,
          merged.color,
          merged.notes || '',
          merged.active ? 'TRUE' : 'FALSE',
          merged.createdAt,
          merged.contactName || '',
        ],
      ],
    },
  });
}

export async function deleteClient(id: string): Promise<void> {
  // Marcar como inactivo (soft delete) en vez de borrar, para preservar sesiones
  await updateClient(id, { active: false });
}

// =============================================================================
// SESIONES
// =============================================================================

export async function getAllSessions(): Promise<Session[]> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  await ensureSheet(sheets, spreadsheetId, SESIONES_SHEET, SESIONES_HEADERS);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SESIONES_SHEET}!A2:J`,
  });

  const rows = response.data.values || [];

  return rows.map((row, index) => ({
    row: index + 2,
    id: String(row[0] ?? '').trim(),
    clientId: String(row[1] ?? '').trim(),
    date: String(row[2] ?? '').trim(),
    status: (String(row[3] ?? 'scheduled').trim() as SessionStatus) || 'scheduled',
    isPending: String(row[4] ?? '').toUpperCase() === 'TRUE',
    missedReason: String(row[5] ?? ''),
    linkedToSessionId: String(row[6] ?? '').trim(),
    notes: String(row[7] ?? ''),
    createdAt: String(row[8] ?? ''),
    updatedAt: String(row[9] ?? ''),
  }));
}

export async function getSessionsByClient(clientId: string): Promise<Session[]> {
  const all = await getAllSessions();
  return all.filter((s) => s.clientId === clientId);
}

export async function createSession(
  data: Omit<Session, 'id' | 'row' | 'createdAt' | 'updatedAt'>
): Promise<Session> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  await ensureSheet(sheets, spreadsheetId, SESIONES_SHEET, SESIONES_HEADERS);

  const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();

  const result = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SESIONES_SHEET}!A:J`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [
        [
          id,
          data.clientId,
          data.date,
          data.status,
          data.isPending ? 'TRUE' : 'FALSE',
          data.missedReason || '',
          data.linkedToSessionId || '',
          data.notes || '',
          now,
          now,
        ],
      ],
    },
  });

  console.log(`[createSession] Created id=${id}, updatedRange=${result.data.updates?.updatedRange}`);

  return { ...data, id, createdAt: now, updatedAt: now };
}

export async function updateSession(id: string, updates: Partial<Session>): Promise<void> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  const existing = await getAllSessions();
  const session = existing.find((s) => s.id === id);
  if (!session || !session.row) {
    const availableIds = existing.map((s) => s.id).filter(Boolean);
    console.error(
      `[updateSession] Sesión "${id}" no encontrada. ` +
        `${availableIds.length} sesiones en el sheet: ${JSON.stringify(availableIds)}`
    );
    throw new Error(
      `Sesión ${id} no encontrada en el sheet (hay ${availableIds.length} sesiones guardadas)`
    );
  }

  const merged = { ...session, ...updates, updatedAt: new Date().toISOString() };

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SESIONES_SHEET}!A${session.row}:J${session.row}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [
        [
          merged.id,
          merged.clientId,
          merged.date,
          merged.status,
          merged.isPending ? 'TRUE' : 'FALSE',
          merged.missedReason || '',
          merged.linkedToSessionId || '',
          merged.notes || '',
          merged.createdAt,
          merged.updatedAt,
        ],
      ],
    },
  });
}

export async function deleteSession(id: string): Promise<void> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  const existing = await getAllSessions();
  const session = existing.find((s) => s.id === id);
  if (!session || !session.row) {
    const availableIds = existing.map((s) => s.id).filter(Boolean);
    throw new Error(
      `Sesión ${id} no encontrada en el sheet (hay ${availableIds.length} sesiones guardadas)`
    );
  }

  // Limpiar la fila (dejarla vacía). No borro la fila físicamente para no mover índices.
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SESIONES_SHEET}!A${session.row}:J${session.row}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [['', '', '', '', '', '', '', '', '', '']],
    },
  });
}
