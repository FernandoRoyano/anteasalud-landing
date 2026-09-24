import type { Metadata } from 'next';
import LocalServicePage, { type LocalServiceConfig } from '@/components/landing/LocalServicePage';
import { buildMetadata } from '@/lib/seo';

const config: LocalServiceConfig = {
  place: 'Getafe',
  path: '/ejercicio-mayores-getafe',
  badge: 'Getafe · Sur de Madrid',
  description:
    'Entrenador para personas mayores a domicilio en Getafe: fuerza, equilibrio y prevención de caídas en casa. Graduado en CCAFYD. Valoración gratuita.',
  heroSubtitle:
    'Voy a casa de tu familiar en Getafe para trabajar fuerza, equilibrio y confianza al caminar. Sesiones de 30 minutos adaptadas a cómo se encuentra cada día.',
  surcharge: 10,
  intro: {
    title: 'Ejercicio adaptado en tu casa de Getafe',
    paragraphs: [
      'Getafe está a unos 14 km del centro de Madrid y muchas familias del municipio nos piden algo concreto: que su padre o su madre vuelva a moverse con seguridad sin tener que desplazarse a un gimnasio o a un centro.',
      'Cada sesión dura 30 minutos y se adapta al estado de la persona ese día. Primero hacemos una valoración funcional gratuita en casa; después diseñamos un plan y lo ajustamos sesión a sesión según la evolución.',
      'El ejercicio a domicilio es compatible con las actividades de los centros municipales de mayores de Getafe. De hecho, muchas personas empiezan en casa para ganar fuerza y confianza y, cuando están preparadas, se animan a volver a las actividades de grupo.',
    ],
  },
  neighborhoods: {
    title: 'Barrios de Getafe a los que vamos',
    note: 'Nos desplazamos en coche a cualquier punto del municipio.',
    items: ['Centro', 'Sector III', 'Las Margaritas', 'San Isidro', 'El Bercial', 'Los Molinos', 'Perales del Río', 'Getafe Norte', 'Juan de la Cierva', 'La Alhóndiga', 'El Casar', 'Buenavista'],
  },
  walking: {
    title: 'Dónde practicar lo que trabajamos en las sesiones',
    intro:
      'El objetivo es que la fuerza y el equilibrio que ganamos en casa se noten fuera. Estas son las referencias que usamos con familias de Getafe para ir sumando paseos, de menos a más exigencia:',
    routes: [
      { name: 'Paseos llanos del propio barrio', tip: 'Primera fase: recorridos cortos, con bancos cerca y en horas de poca gente. Lo importante es la regularidad, no la distancia.' },
      { name: 'Parques urbanos con caminos amplios', tip: 'Cuando la marcha es estable: parques como el de Lorenzo Azofra o las zonas verdes de Getafe Norte permiten alargar el paseo en terreno cómodo.' },
      { name: 'Cerro de los Ángeles', tip: 'Tiene pendientes y firme irregular. Lo reservamos para cuando la persona ya se levanta de la silla sin manos y mantiene bien el equilibrio en los giros.' },
    ],
  },
  cases: [
    'Mayores que quieren mantenerse activos sin salir de casa',
    'Vuelta a la actividad tras una operación de cadera o rodilla, con el alta médica',
    'Prevención de caídas y recuperación de la confianza al caminar',
    'Ejercicio adaptado con artrosis u osteoporosis, siguiendo las indicaciones sanitarias',
    'Pérdida de fuerza tras una hospitalización o una temporada sin moverse',
  ],
  faqs: [
    { question: '¿Cuánto cuesta el ejercicio a domicilio en Getafe?', answer: 'La sesión suelta de 30 minutos cuesta 65 € y el plan de 2 sesiones semanales 110 € a la semana. Incluye 10 € por sesión de desplazamiento fuera de Madrid capital. La primera valoración es gratuita.' },
    { question: '¿Vais a Perales del Río o El Bercial?', answer: 'Sí. Cubrimos todos los barrios de Getafe, incluidos Perales del Río, El Bercial, Los Molinos y Getafe Norte.' },
    { question: '¿Hace falta tener material en casa?', answer: 'No. Llevamos el material necesario (bandas, pesos ligeros, conos). Solo necesitamos una silla estable sin ruedas y un pequeño espacio despejado.' },
    { question: '¿Es compatible con la fisioterapia o con el centro de mayores?', answer: 'Sí. No sustituimos al fisioterapeuta ni al médico: seguimos sus indicaciones y el ejercicio se puede combinar con las actividades de grupo del centro municipal.' },
  ],
  cta: {
    title: 'Primera valoración gratuita en Getafe',
    subtitle: 'Sin compromiso y sin pago por adelantado. Vemos juntos la situación y decidimos si tiene sentido empezar.',
  },
  related: [
    { href: '/ejercicio-mayores-mostoles', label: 'Móstoles' },
    { href: '/ejercicio-mayores-madrid-capital', label: 'Madrid capital' },
    { href: '/prevencion-caidas-mayores-madrid', label: 'Prevención de caídas' },
  ],
};

// Revalida para incluir artículos nuevos en «Guías para familias»
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Ejercicio para mayores a domicilio en Getafe',
  description: config.description,
  path: config.path,
});

export default function Page() {
  return <LocalServicePage config={config} />;
}
