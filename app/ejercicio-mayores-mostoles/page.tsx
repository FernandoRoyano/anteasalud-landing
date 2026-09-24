import type { Metadata } from 'next';
import LocalServicePage, { type LocalServiceConfig } from '@/components/landing/LocalServicePage';
import { buildMetadata } from '@/lib/seo';

const config: LocalServiceConfig = {
  place: 'Móstoles',
  path: '/ejercicio-mayores-mostoles',
  badge: 'Móstoles · Suroeste de Madrid',
  description:
    'Ejercicio para personas mayores a domicilio en Móstoles: recuperar fuerza, equilibrio y autonomía en casa con un graduado en CCAFYD. Valoración gratuita.',
  heroSubtitle:
    'Voy a casa de tu padre, madre o familiar en Móstoles con un plan de ejercicio adaptado para recuperar fuerza, equilibrio y autonomía en el día a día.',
  surcharge: 10,
  intro: {
    title: 'Por qué entrenar en casa en Móstoles',
    paragraphs: [
      'Muchas familias de Móstoles nos cuentan lo mismo: su familiar necesita moverse más, pero salir de casa dos veces por semana para ir a un centro se hace cuesta arriba. Por eso vamos nosotros.',
      'Móstoles está a unos 18 km del centro de Madrid. Llevamos el material, lo preparamos en unos minutos y la sesión de 30 minutos se adapta a la edad, la condición física y cómo se encuentra la persona ese día.',
      'Trabajamos casos muy distintos: después de una operación, para prevenir caídas, para recuperar fuerza tras meses con poca actividad o simplemente para mantenerse en forma y seguir haciendo las cosas por sí mismo.',
    ],
  },
  neighborhoods: {
    title: 'Zonas de Móstoles a las que vamos',
    note: 'Cubrimos todo el municipio.',
    items: ['Centro', 'Parque Coimbra', 'Pradillo', 'El Soto', 'Parque Guadarrama', 'Iviasa', 'Los Rosales', 'Estoril', 'Villafontana', 'Las Lomas', 'Parque Estoril', 'Móstoles Sur'],
  },
  walking: {
    title: 'De la sesión en casa al paseo por Móstoles',
    intro:
      'Lo que entrenamos en el salón tiene que notarse al salir a la calle. Con las familias de Móstoles solemos plantear esta progresión:',
    routes: [
      { name: 'Vuelta a la manzana y calles peatonales', tip: 'Recorridos cortos y conocidos, con posibilidad de parar. Sirven para crear el hábito y observar cómo camina sin cansancio.' },
      { name: 'Parque El Soto', tip: 'Caminos amplios y zonas de sombra para ir alargando el paseo cuando la marcha ya es estable.' },
      { name: 'Parque Finca Liana', tip: 'Más extenso y con algunos cambios de firme. Buen objetivo cuando ya hay confianza en los giros y al sortear obstáculos.' },
    ],
  },
  cases: [
    'Personas mayores que quieren mantenerse activas en casa',
    'Familias que prefieren que el profesional vaya al domicilio en lugar de desplazar a su familiar',
    'Recuperación tras una operación de cadera, rodilla u hombro, con el alta médica',
    'Personas que han sufrido una caída y necesitan recuperar la confianza',
    'Artrosis o dolor persistente, con ejercicio específico y supervisado',
  ],
  faqs: [
    { question: '¿Cuánto cuesta el entrenador a domicilio en Móstoles?', answer: 'La sesión suelta de 30 minutos cuesta 65 € y el plan de 2 sesiones semanales 110 € a la semana, con los 10 € de desplazamiento por sesión ya incluidos. La primera valoración es gratuita.' },
    { question: '¿Qué pasa en la primera visita?', answer: 'Hablamos sobre su salud, sus rutinas y lo que quiere recuperar, y hacemos pruebas sencillas de equilibrio, marcha y levantarse de la silla. Con eso te explicamos qué plan tendría sentido, sin compromiso.' },
    { question: '¿Trabajáis con personas que casi no salen de casa?', answer: 'Sí. Es uno de los casos más habituales. Empezamos con ejercicios sentados o con apoyo y progresamos al ritmo de cada persona.' },
    { question: '¿Qué horarios tenéis?', answer: 'De lunes a viernes, de 9:00 a 19:00. Buscamos una franja fija para que la rutina sea fácil de mantener.' },
  ],
  cta: {
    title: 'Primera valoración gratuita en Móstoles',
    subtitle: 'Sin compromiso. Conocemos la situación y te decimos con honestidad qué podemos hacer.',
  },
  related: [
    { href: '/ejercicio-mayores-getafe', label: 'Getafe' },
    { href: '/ejercicio-mayores-madrid-capital', label: 'Madrid capital' },
    { href: '/recuperar-autonomia-mayores-madrid', label: 'Recuperar autonomía' },
  ],
};

// Revalida para incluir artículos nuevos en «Guías para familias»
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Entrenador para mayores a domicilio en Móstoles',
  description: config.description,
  path: config.path,
});

export default function Page() {
  return <LocalServicePage config={config} />;
}
