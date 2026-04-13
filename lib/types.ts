export interface Lead {
  /** Número de fila en Google Sheets (2 = primera fila de datos, ya que 1 son cabeceras) */
  row: number;
  fecha: string;
  nombre: string;
  email: string;
  telefono: string;
  zona: string;
  interes: string;
  estado: string;
  notas: string;
}

// =============================================================================
// CRM: Clientes y Sesiones
// =============================================================================

export type Zone =
  | 'capital'
  | 'sur'
  | 'oeste'
  | 'este'
  | 'norte';

export const ZONE_LABELS: Record<Zone, string> = {
  capital: 'Madrid capital',
  sur: 'Sur (Móstoles, Fuenlabrada, Getafe...)',
  oeste: 'Oeste (Pozuelo, Las Rozas, Majadahonda...)',
  este: 'Este (Torrejón, Coslada, Rivas...)',
  norte: 'Norte (Alcobendas, Tres Cantos)',
};

export const ZONE_SURCHARGE: Record<Zone, number> = {
  capital: 0,
  sur: 5,
  oeste: 5,
  este: 5,
  norte: 5,
};

export const CLIENT_COLORS = [
  '#1e4a6d',
  '#0891b2',
  '#059669',
  '#d97706',
  '#7c3aed',
  '#db2777',
  '#dc2626',
  '#2563eb',
  '#65a30d',
  '#ea580c',
];

export interface Client {
  /** Número de fila en Google Sheets */
  row?: number;
  id: string;
  name: string;
  phone: string;
  address: string;
  zone: Zone;
  /** Precio FINAL por sesión, incluyendo recargo de zona si aplica */
  pricePerSession: number;
  color: string;
  notes: string;
  active: boolean;
  createdAt: string;
  /** Nombre del contacto de facturación si es distinto al cliente
   *  (p.ej. una hija que gestiona los pagos de su padre) */
  contactName: string;
}

export type SessionStatus =
  | 'scheduled'
  | 'completed'
  | 'missed'
  | 'recovered'
  | 'discounted';

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  scheduled: 'Programada',
  completed: 'Realizada',
  missed: 'Faltó',
  recovered: 'Recuperada',
  discounted: 'Descontada',
};

export const SESSION_STATUS_COLORS: Record<SessionStatus, string> = {
  scheduled: '#1e4a6d',
  completed: '#22c55e',
  missed: '#ef4444',
  recovered: '#86efac',
  discounted: '#7c3aed',
};

export interface Session {
  /** Número de fila en Google Sheets */
  row?: number;
  id: string;
  clientId: string;
  /** ISO date "YYYY-MM-DD" */
  date: string;
  status: SessionStatus;
  isPending: boolean;
  missedReason: string;
  linkedToSessionId: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
