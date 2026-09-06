const ANTEA_WHATSAPP_NUMBER = '34633261963';

interface LeadWhatsAppData {
  nombre: string;
  email?: string;
  telefono?: string;
  zona?: string;
  interes?: string;
}

export function buildLeadWhatsAppUrl(data: LeadWhatsAppData): string {
  const details = [
    `Hola, soy ${data.nombre}. Acabo de completar el formulario de ANTEA Salud.`,
    '',
    'Estos son los datos que he enviado:',
    ...(data.telefono ? [`• Teléfono: ${data.telefono}`] : []),
    ...(data.email ? [`• Email: ${data.email}`] : []),
    ...(data.zona ? [`• Zona: ${data.zona}`] : []),
    ...(data.interes ? [`• Consulta: ${data.interes}`] : []),
    '',
    'Me gustaría recibir información sobre la valoración gratuita.',
  ];

  return `https://wa.me/${ANTEA_WHATSAPP_NUMBER}?text=${encodeURIComponent(details.join('\n'))}`;
}

export function openWhatsAppPlaceholder(): Window | null {
  return window.open('about:blank', '_blank');
}

export function sendLeadToWhatsApp(target: Window | null, data: LeadWhatsAppData): void {
  const url = buildLeadWhatsAppUrl(data);
  if (target && !target.closed) {
    target.opener = null;
    target.location.href = url;
    return;
  }
  window.location.assign(url);
}
