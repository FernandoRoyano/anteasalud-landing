export const ASSESSMENT_VIDEO = 'https://www.youtube.com/watch?v=pHa3c49NbgI';
export const SHOE_HEIGHT = 180;
export const SHOE_WIDTH = 70;

// Posiciones en una vista cenital: el eje Y avanza desde la punta hacia el talón.
export const BALANCE_STANCES = [
  { id: 'parallel', label: 'Pies juntos', description: 'Un pie al lado del otro.', left: { x: 45, y: 110 }, right: { x: 115, y: 110 } },
  { id: 'semi', label: 'Semitándem', description: 'Talón de un pie a la altura del dedo gordo del otro, a su lado.', left: { x: 55, y: 20 }, right: { x: 90, y: 200 } },
  { id: 'tandem', label: 'Tándem', description: 'Talón de un pie en contacto con la punta del otro, en línea.', left: { x: 85, y: 20 }, right: { x: 85, y: 200 } },
] as const;

export const ASSESSMENT_VISUALS = [
  null,
  { file: 'marcha.webp', width: 1200, height: 600, label: 'Marcha habitual · 4 metros', alt: 'Ilustración de una persona mayor caminando a paso habitual mientras un profesional observa a un lado' },
  { file: 'silla.webp', width: 1200, height: 800, label: 'Cinco levantadas: inicio sentado y final de pie', alt: 'Dos momentos de la misma persona: sentada y de pie, manteniendo los brazos cruzados sobre el pecho' },
  { file: 'timed-up-and-go.webp', width: 1440, height: 720, label: 'Levantarse, caminar 3 metros, girar y volver a sentarse', alt: 'Secuencia de la misma persona levantándose de una silla, caminando hasta un cono, girando, regresando y sentándose' },
  { file: 'marcha.webp', width: 1200, height: 600, label: 'Marcha habitual · 6 metros', alt: 'Ilustración de una persona mayor caminando a paso habitual mientras un profesional observa a un lado' },
] as const;
