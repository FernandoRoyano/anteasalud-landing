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
