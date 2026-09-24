import type { Metadata } from 'next';
import LocalServicePage, { type LocalServiceConfig } from '@/components/landing/LocalServicePage';
import { buildMetadata } from '@/lib/seo';

const config: LocalServiceConfig = {
  place: 'Madrid capital',
  path: '/ejercicio-mayores-madrid-capital',
  badge: 'Madrid capital · Sin recargo por desplazamiento',
  description:
    'Entrenador para personas mayores a domicilio en los 21 distritos de Madrid capital, sin recargo por desplazamiento. Graduado en CCAFYD. Valoración gratuita.',
  heroSubtitle:
    'Vamos a casa de tu familiar en cualquier distrito de Madrid. Ejercicio de fuerza y equilibrio adaptado, sin recargo por desplazamiento y con la primera valoración gratuita.',
  surcharge: 0,
  intro: {
    title: 'Ejercicio adaptado sin salir de Madrid',
    paragraphs: [
      'Madrid no es fácil para una persona mayor: escaleras de metro, aceras irregulares, tráfico y distancias largas. Llevar a un padre o una madre dos veces por semana a un centro puede convertirse en una odisea que acaba en no hacerlo.',
      'Por eso vamos nosotros a su casa. Sesiones de 30 minutos en el salón, con el material mínimo necesario y adaptadas a lo que cada persona puede hacer ese día. En Madrid capital no hay recargo por desplazamiento.',
      'Muchas personas mayores ya participan en actividades de los centros municipales de mayores de su distrito. El trabajo individual en casa es un buen complemento: permite empezar desde un nivel más bajo, ganar confianza y volver al grupo con más seguridad.',
    ],
  },
  neighborhoods: {
    title: 'Distritos de Madrid que cubrimos',
    note: 'Los 21 distritos municipales, sin recargo por desplazamiento.',
    items: [
      'Centro', 'Arganzuela', 'Retiro', 'Salamanca', 'Chamartín', 'Tetuán', 'Chamberí',
      'Fuencarral-El Pardo', 'Moncloa-Aravaca', 'Latina', 'Carabanchel', 'Usera',
      'Puente de Vallecas', 'Moratalaz', 'Ciudad Lineal', 'Hortaleza', 'Villaverde',
      'Villa de Vallecas', 'Vicálvaro', 'San Blas-Canillejas', 'Barajas',
    ],
  },
  walking: {
    title: 'Del salón a los parques de Madrid',
    intro:
      'La meta de las sesiones es que la persona vuelva a disfrutar de salir. Estas son referencias que usamos con familias de Madrid para ir ganando distancia y confianza:',
    routes: [
      { name: 'Paseos llanos del barrio', tip: 'Primero, trayectos cortos y conocidos con sitios para sentarse: el objetivo es la constancia, no los kilómetros.' },
      { name: 'Madrid Río o el paseo de coches del Retiro', tip: 'Superficies amplias, llanas y con bancos cada pocos metros. Ideales cuando la marcha ya es estable.' },
      { name: 'Parque del Oeste o Casa de Campo', tip: 'Tienen cuestas y tramos de tierra. Los dejamos para cuando hay buena fuerza en las piernas y equilibrio en los giros.' },
    ],
  },
  cases: [
    'Mayores que quieren mantenerse activos sin depender de traslados',
    'Vuelta a la actividad tras una operación, con el alta médica',
    'Prevención de caídas y miedo a caerse al salir a la calle',
    'Pérdida de fuerza tras una hospitalización o una temporada de inactividad',
    'Personas que quieren volver a las actividades de su centro de mayores con más seguridad',
  ],
  faqs: [
    { question: '¿Cuánto cuesta el ejercicio a domicilio en Madrid capital?', answer: 'La sesión suelta de 30 minutos cuesta 55 € y el plan de 2 sesiones semanales 90 € a la semana. En Madrid capital no hay recargo por desplazamiento y la primera valoración es gratuita.' },
    { question: '¿Vais a todos los distritos?', answer: 'Sí, a los 21 distritos de Madrid capital, desde Centro hasta Barajas, Villaverde o Fuencarral-El Pardo.' },
    { question: '¿Cuánto espacio hace falta en casa?', answer: 'Muy poco: una silla estable sin ruedas y un par de metros despejados. Adaptamos los ejercicios a pisos pequeños.' },
    { question: '¿Hay permanencia?', answer: 'No. Puedes pausar o reorganizar las sesiones cuando lo necesites. Te recomendaremos una frecuencia, pero la decisión es siempre de la familia.' },
  ],
  cta: {
    title: 'Empieza en tu casa de Madrid',
    subtitle: 'Valoración gratuita en el domicilio. Sin compromiso y sin pago por adelantado.',
  },
  related: [
    { href: '/ejercicio-personas-mayores-madrid', label: 'Ejercicio para mayores' },
    { href: '/ejercicio-mayores-mostoles', label: 'Móstoles' },
    { href: '/ejercicio-mayores-getafe', label: 'Getafe' },
  ],
};

// Revalida para incluir artículos nuevos en «Guías para familias»
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Ejercicio para mayores a domicilio en Madrid capital',
  description: config.description,
  path: config.path,
});

export default function Page() {
  return <LocalServicePage config={config} />;
}
