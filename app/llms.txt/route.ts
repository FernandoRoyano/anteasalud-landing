import { getPublishedArticles } from '@/lib/sheets';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600;

// Resumen legible por asistentes de IA (https://llmstxt.org): quién somos, qué ofrecemos y dónde está el contenido
export async function GET() {
  let articles = '';
  try {
    const list = await getPublishedArticles();
    articles = list.map((a) => `- [${a.title}](${SITE_URL}/articulos/${a.slug}): ${a.excerpt}`).join('\n');
  } catch (error) {
    console.error('[llms.txt] No se pudieron cargar los artículos:', error);
  }

  const body = `# ANTEA Salud

> Entrenamiento de fuerza, equilibrio y movilidad a domicilio para personas mayores en Madrid (capital y Comunidad de Madrid). Dirigido por Fernando Royano, graduado en Ciencias de la Actividad Física y del Deporte (CCAFYD), con 14 años como entrenador personal a domicilio y especializado en personas mayores.

## Datos clave

- Servicio: ejercicio adaptado a domicilio para personas mayores (prevención de caídas, recuperación de autonomía tras operación u hospitalización, fragilidad, mantenimiento).
- Zona: Madrid capital (sin recargo) y municipios de la Comunidad de Madrid como Getafe o Móstoles (+10 € por sesión de desplazamiento).
- Precios: primera valoración funcional gratuita; sesión suelta de 30 minutos, 55 €; plan de 2 sesiones semanales, 90 € por semana. Sin permanencia.
- Horario: lunes a viernes, de 8:30 a 14:00, según disponibilidad (se confirma al reservar).
- Contacto: anteasalud@gmail.com · WhatsApp +34 633 26 19 63 · ${SITE_URL}/valoracion-gratuita
- ANTEA Salud no es un servicio sanitario: no sustituye al médico ni al fisioterapeuta y trabaja siguiendo sus indicaciones.

## Servicios

- [Ejercicio para personas mayores a domicilio](${SITE_URL}/ejercicio-personas-mayores-madrid)
- [Prevención de caídas](${SITE_URL}/prevencion-caidas-mayores-madrid)
- [Recuperar la autonomía](${SITE_URL}/recuperar-autonomia-mayores-madrid)
- [Valoración funcional gratuita](${SITE_URL}/valoracion-gratuita)
- [Guía gratuita: 10 ejercicios para prevenir caídas](${SITE_URL}/guia-prevencion-caidas)
- [Sobre Fernando Royano](${SITE_URL}/sobre-fernando)

## Zonas

- [Madrid capital](${SITE_URL}/ejercicio-mayores-madrid-capital)
- [Getafe](${SITE_URL}/ejercicio-mayores-getafe)
- [Móstoles](${SITE_URL}/ejercicio-mayores-mostoles)

## Artículos para familias

${articles || `- [Todos los artículos](${SITE_URL}/articulos)`}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
