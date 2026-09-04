import type { Article } from '@/lib/types';

type EditorialOverride = Pick<Article, 'title' | 'excerpt' | 'ogImage'> & {
  imageAlt: string;
};

const EDITORIAL_OVERRIDES: Record<string, EditorialOverride> = {
  'senales-riesgo-caidas-personas-mayores': {
    title: '5 señales de que tu familiar podría tener más riesgo de caída',
    excerpt: 'Qué observar en casa y cuándo conviene pedir una valoración profesional, explicado con claridad y sin alarmismo.',
    ogImage: '/articulos/riesgo-caidas.webp',
    imageAlt: 'Mujer mayor levantándose de una silla mientras su hija observa cerca',
  },
  'que-pasa-despues-de-una-caida': {
    title: 'Después de una caída: cómo recuperar seguridad y confianza al moverse',
    excerpt: 'El miedo puede limitar más que la propia lesión. Entender el ciclo ayuda a recuperar movimiento, fuerza y autonomía paso a paso.',
    ogImage: '/articulos/miedo-despues-caida.webp',
    imageAlt: 'Hombre mayor caminando en casa acompañado por su hijo',
  },
  'recuperacion-operacion-cadera-ejercicio-mayores': {
    title: 'Recuperación tras una operación de cadera: qué aporta el ejercicio',
    excerpt: 'Las fases de la recuperación, el papel de cada profesional y las señales que indican cuándo avanzar o consultar.',
    ogImage: '/articulos/recuperacion-cadera.webp',
    imageAlt: 'Mujer mayor practicando levantarse de una silla con supervisión profesional',
  },
  'ejercicio-domicilio-mayores-mejor-que-gimnasio': {
    title: 'Ejercicio en casa o en un centro: qué opción encaja mejor en una persona mayor',
    excerpt: 'El mejor lugar no es el más sofisticado, sino aquel que facilita seguridad, personalización y constancia.',
    ogImage: '/articulos/ejercicio-en-casa.webp',
    imageAlt: 'Hombre mayor entrenando con una banda elástica en el salón de su casa',
  },
  'tests-funcionales-mayores-en-casa': {
    title: '3 pruebas sencillas para observar la capacidad funcional en casa',
    excerpt: 'Tres referencias prácticas para observar fuerza, equilibrio y movilidad sin convertir una prueba casera en un diagnóstico.',
    ogImage: '/articulos/tests-funcionales.webp',
    imageAlt: 'Mujer mayor realizando una prueba de levantarse de una silla en casa',
  },
  'ejercicio-despues-fractura-mayores': {
    title: 'Volver a moverse después de una fractura: tiempos, señales y seguridad',
    excerpt: 'Qué se puede trabajar en cada fase y por qué la autorización médica marca el punto de partida.',
    ogImage: '/articulos/ejercicio-tras-fractura.webp',
    imageAlt: 'Hombre mayor realizando una extensión de rodilla sentado con supervisión',
  },
  'fisioterapeuta-o-entrenador-personal-mayores-diferencia': {
    title: 'Fisioterapeuta o profesional del ejercicio: qué necesita tu familiar',
    excerpt: 'No compiten entre sí. Te explicamos qué aporta cada profesional y cuándo tiene sentido que trabajen de forma coordinada.',
    ogImage: '/articulos/fisio-o-entrenador.webp',
    imageAlt: 'Mujer mayor acompañada por una fisioterapeuta y un profesional del ejercicio',
  },
  'ejercicio-deterioro-cognitivo-mayores-evidencia': {
    title: 'Ejercicio y deterioro cognitivo: qué sabemos y qué no',
    excerpt: 'La actividad física puede apoyar la función y la calidad de vida, pero no es una cura. Esto es lo que permite afirmar la evidencia.',
    ogImage: '/articulos/ejercicio-y-cerebro.webp',
    imageAlt: 'Mujer mayor practicando un ejercicio de coordinación con supervisión',
  },
  'ejercicios-para-prevenir-caidas-en-personas-mayores-7-recomendados-por-la-evidencia': {
    title: '7 ejercicios para trabajar fuerza y equilibrio en personas mayores',
    excerpt: 'Una guía práctica para entender qué capacidades ayudan a reducir el riesgo de caída y cómo entrenarlas con seguridad.',
    ogImage: '/articulos/ejercicios-prevenir-caidas.webp',
    imageAlt: 'Hombre mayor practicando equilibrio junto a una silla con supervisión',
  },
};

const CONTENT_CORRECTIONS: Array<[string, string]> = [
  [
    'Los factores de riesgo más estudiados son la debilidad muscular del tren inferior, el deterioro del equilibrio, la velocidad de marcha reducida, el miedo a caerse y el uso de ciertos medicamentos [2]. Todos son observables. Y todos responden al ejercicio bien pautado.',
    'Entre los factores de riesgo más estudiados están la debilidad muscular del tren inferior, las alteraciones del equilibrio, una marcha más lenta, el miedo a caerse y determinados medicamentos [2]. Varios pueden observarse en el día a día y algunos mejoran con un ejercicio bien pautado; otros necesitan una revisión sanitaria.',
  ],
  [
    'Esta señal indica debilidad de cuádriceps y glúteos. El test clínico que usamos los profesionales, el "five times sit-to-stand test", mide exactamente esto: el tiempo que tarda una persona en levantarse y sentarse cinco veces seguidas. Si tarda más de 12 segundos, el riesgo de caída en los siguientes 12 meses es significativamente más alto [3].',
    'Necesitar las manos puede relacionarse con menor fuerza en las piernas, dolor, movilidad articular o falta de confianza. Los profesionales utilizan pruebas de levantarse y sentarse para valorar esta capacidad, interpretando el resultado junto con la edad, la técnica y el resto de la evaluación [3].',
  ],
  [
    'La pérdida de altura y el aumento de la cifosis dorsal (la curvatura hacia delante de la columna) son señales de debilidad de la musculatura extensora del tronco y, en muchos casos, de osteoporosis no diagnosticada o no tratada [4].',
    'Una pérdida de altura apreciable o un aumento de la curvatura dorsal pueden tener causas distintas. Merecen comentarse con un profesional sanitario, especialmente si aparecen dolor, antecedentes de fractura u otros factores de riesgo de osteoporosis [4].',
  ],
  [
    'el hecho de haber caído indica que el sistema de equilibrio y la fuerza muscular no son suficientes para garantizar seguridad en las actividades del día a día.',
    'una caída reciente justifica revisar de forma conjunta la marcha, el equilibrio, la fuerza, la medicación, la visión y el entorno doméstico.',
  ],
  ['## Si reconoces dos o más señales, es momento de actuar', '## Si reconoces varias señales, merece la pena valorarlo'],
  [
    'No tres, no cuatro. Dos señales son suficientes para considerar que el riesgo es real y que esperar no es una buena estrategia.',
    'Una señal aislada no permite calcular el riesgo. Si observas varios cambios, una caída reciente o una pérdida clara de autonomía, conviene solicitar una valoración profesional.',
  ],
  [
    'En ese caso, la valoración funcional es urgente, no opcional.',
    'En ese caso, conviene solicitar una valoración funcional cuando la situación médica lo permita.',
  ],
  [
    'reduce el riesgo de caída en torno a un 24% de media, y hasta un 35% en programas de alta adherencia [2].',
    'puede reducir la tasa de caídas. Una revisión Cochrane encontró una reducción aproximada del 23% en personas mayores que viven en la comunidad, con resultados que dependen del tipo de programa y de su continuidad [2].',
  ],
  [
    'Lo que no funciona es el ejercicio genérico, caminar sin más o esperar a que el médico lo recomiende en la próxima visita.',
    'Caminar puede ser útil, pero por sí solo no siempre trabaja la fuerza y el equilibrio que necesita cada persona. La clave es adaptar el programa a su situación y mantenerlo en el tiempo.',
  ],
  ['| Más de 16 s | Alto | Valoración profesional urgente |', '| Más de 16 s | Resultado a revisar | Solicitar valoración profesional |'],
  ['| Menos de 10 s | Alto | Programa supervisado urgente |', '| Menos de 10 s | Resultado a revisar | Solicitar valoración profesional |'],
  ['| Más de 14 s | Alto | Valoración profesional urgente |', '| Más de 14 s | Resultado a revisar | Solicitar valoración profesional |'],
  [
    '**Uno o más en zona de riesgo alto:** La intervención profesional es urgente, no opcional. El riesgo de caída en los próximos 12 meses es alto y medible, y hay margen real de mejora con ejercicio bien pautado.',
    '**Uno o más resultados fuera de la referencia:** No diagnostican por sí solos un riesgo alto. Sí son un motivo razonable para solicitar una valoración profesional completa y decidir qué trabajo tiene sentido.',
  ],
  [
    'sitúan al ejercicio físico como una de las intervenciones no farmacológicas más sólidas disponibles para ralentizar la progresión del deterioro cognitivo y mejorar la calidad de vida de estas personas.',
    'señalan al ejercicio físico como una intervención no farmacológica útil para apoyar la capacidad funcional y la calidad de vida de estas personas. Su efecto sobre la progresión cognitiva depende del diagnóstico, el programa y cada persona.',
  ],
];

export function getArticleEditorial(article: Article): Article {
  const override = EDITORIAL_OVERRIDES[article.slug];
  const bodyMarkdown = CONTENT_CORRECTIONS.reduce(
    (body, [original, replacement]) => body.replace(original, replacement),
    article.bodyMarkdown
  );

  return override ? { ...article, ...override, bodyMarkdown } : { ...article, bodyMarkdown };
}

export function getArticleImageAlt(article: Article): string {
  return EDITORIAL_OVERRIDES[article.slug]?.imageAlt ?? article.title;
}

export function getReadingMinutes(markdown: string): number {
  const words = markdown.replace(/[#*_>`\[\]()!-]/g, ' ').trim().split(/\s+/).filter(Boolean);
  return Math.max(1, Math.ceil(words.length / 210));
}
