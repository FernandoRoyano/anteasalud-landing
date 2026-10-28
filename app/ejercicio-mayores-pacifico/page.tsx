import type { Metadata } from 'next';
import LocalServicePage, { type LocalServiceConfig } from '@/components/landing/LocalServicePage';
import { buildMetadata } from '@/lib/seo';
import PacificoHero from '@/components/landing/PacificoHero';

const config: LocalServiceConfig = {
  place: 'Pacífico',
  path: '/ejercicio-mayores-pacifico',
  areaServedType: 'Place',
  badge: 'Pacífico · Retiro, Madrid · Sin recargo',
  description: 'Ejercicio para personas mayores a domicilio en Pacífico, Madrid. Fuerza, equilibrio y autonomía con Fernando Royano. Primera valoración gratuita y sin recargo.',
  heroSubtitle: '¿Tu padre o tu madre vive en Pacífico y cada vez le cuesta más moverse? Voy a su casa para trabajar fuerza y equilibrio a su ritmo. Empezamos con una valoración gratuita, sin desplazamientos para la familia.',
  surcharge: 0,
  intro: {
    title: 'La meta está en su día a día',
    paragraphs: [
      'Quizá has notado que tu madre necesita apoyarse para levantarse, que tu padre ya no quiere bajar a hacer un recado o que cada paseo termina antes. No hace falta esperar a que deje de salir para preguntar qué apoyo puede necesitar.',
      'Soy Fernando Royano, graduado en Ciencias de la Actividad Física y del Deporte. Trabajo a domicilio con sesiones individuales de 30–45 minutos: valoramos cómo se mueve tu familiar, hablamos de lo que quiere seguir haciendo y adaptamos los ejercicios a su punto de partida.',
      'En Pacífico, dentro del distrito de Retiro, el servicio se realiza en el domicilio y no tiene recargo por desplazamiento. No necesitas llevar a tu familiar a un centro ni comprar material para empezar.',
    ],
  },
  neighborhoods: {
    title: 'Servicio a domicilio en Pacífico',
    note: 'Estas referencias ayudan a situar la zona. La valoración y las sesiones se hacen en casa; confirmamos dirección y disponibilidad al hablar contigo.',
    items: ['Entorno de Metro Pacífico', 'Calle de Valderribas', 'Plaza de Daoíz y Velarde'],
  },
  walking: {
    title: 'Trabajar en casa para desenvolverse mejor en el barrio',
    intro: 'Los objetivos parten de su vida diaria. Según su situación y sus preferencias, podemos orientar el trabajo hacia tareas como estas:',
    routes: [
      { name: 'Levantarse y moverse por casa', tip: 'Trabajar la fuerza necesaria para levantarse de una silla, cambiar de dirección y desplazarse entre las habitaciones con más confianza.' },
      { name: 'Llegar al portal y volver a salir', tip: 'Valorar las dificultades del recorrido real: puertas, escalones, ascensor o el tramo desde casa hasta la calle. Ajustamos el trabajo a lo que se encuentre cada persona.' },
      { name: 'Retomar un paseo o un pequeño recado', tip: 'Tener un objetivo conocido en Pacífico, como volver a una tienda o pasear por el entorno de Daoíz y Velarde. La distancia y el acompañamiento se deciden según su capacidad y las condiciones del recorrido.' },
    ],
  },
  cases: [
    'Personas que han ido perdiendo fuerza y necesitan más ayuda en las tareas cotidianas',
    'Familiares preocupados por tropiezos, caídas o miedo a caminar',
    'Mayores que pasan mucho tiempo sentados y quieren recuperar actividad',
    'Vuelta a la actividad después de un ingreso u operación, respetando las indicaciones del equipo sanitario',
    'Personas que prefieren atención individual en casa para empezar a moverse',
  ],
  faqs: [
    { question: '¿Cuánto cuesta el ejercicio a domicilio en Pacífico?', answer: 'La sesión suelta de 30–45 minutos cuesta 55 € y el plan de dos sesiones semanales cuesta 90 € por semana. Pacífico está en Madrid capital: no hay recargo por desplazamiento. La primera valoración es gratuita.' },
    { question: '¿Puedo pedir la valoración para mi padre o mi madre?', answer: 'Sí. Puedes dejar tu nombre y teléfono y explicar brevemente la situación. Hablamos contigo y con tu familiar para conocer sus preferencias y acordar la visita. La valoración no confirma una cita hasta que concretamos el horario.' },
    { question: '¿Cómo es la primera visita?', answer: 'Hablamos de las dificultades del día a día y de lo que le gustaría mantener o recuperar. Valoramos su capacidad de movimiento y, si el servicio encaja, proponemos un punto de partida. Sin compromiso ni pago por adelantado.' },
    { question: '¿Hace falta material o mucho espacio?', answer: 'Llevo el material necesario y adapto los ejercicios al espacio disponible. Habitualmente podemos trabajar con una silla estable sin ruedas y una zona despejada; lo confirmamos al preparar la visita.' },
    { question: '¿Sustituye a la fisioterapia o a la atención médica?', answer: 'No. Es un servicio de ejercicio físico adaptado, no sanitario. Si hay una lesión, síntomas nuevos o restricciones después de una operación, seguimos las indicaciones del equipo sanitario y coordinamos el ejercicio con la atención que tenga pautada.' },
    { question: '¿Hay permanencia o un horario fijo obligatorio?', answer: 'No hay permanencia. Las visitas se acuerdan según disponibilidad, de lunes a viernes por la mañana. Antes de empezar confirmamos contigo la frecuencia y los horarios.' },
  ],
  cta: {
    title: 'Cuéntame qué necesita tu familiar en Pacífico',
    subtitle: 'Primera valoración en su domicilio, gratuita y sin compromiso. Hablamos de vuestra situación y confirmamos juntos el siguiente paso.',
  },
  related: [
    { href: '/ejercicio-mayores-madrid-capital', label: 'Cobertura en Madrid capital' },
    { href: '/guias/caidas-personas-mayores', label: 'Caídas y equilibrio' },
    { href: '/guias/perdida-fuerza-personas-mayores', label: 'Pérdida de fuerza' },
  ],
};

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Ejercicio para mayores a domicilio en Pacífico, Madrid',
  description: config.description,
  path: config.path,
  image: '/hero-fernando.webp',
  imageAlt: 'Ejercicio acompañado en casa para trabajar fuerza y equilibrio.',
});

export default function PacificoPage() {
  return <LocalServicePage config={config} hero={<PacificoHero />} />;
}
