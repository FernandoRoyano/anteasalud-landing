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

const ADDITIONAL_IMAGE_ALTS: Record<string, string> = {
  'valoracion-funcional-personas-mayores-que-incluye': 'Mujer mayor realizando una prueba de marcha durante una valoración funcional en casa',
  'fragilidad-prefragilidad-persona-robusta-significado': 'Mujer mayor cuidando las plantas de su terraza de manera autónoma',
  'sppb-que-es-valoracion-personas-mayores': 'Hombre mayor realizando una prueba de equilibrio del SPPB con supervisión',
  'levantarse-silla-autonomia-personas-mayores': 'Mujer mayor practicando cómo levantarse de una silla con supervisión profesional',
  'perdida-fuerza-personas-mayores-senales': 'Hombre mayor colocando una bolsa de compra sobre la encimera de su cocina',
  'recuperar-capacidad-despues-hospitalizacion-mayores': 'Mujer mayor retomando la marcha en casa acompañada por un profesional del ejercicio',
};

const ARTICLE_EXPANSIONS: Record<string, string> = {
  'valoracion-funcional-personas-mayores-que-incluye': `
## Qué conviene preparar antes de la valoración

No hace falta convertir la visita en un examen. Ayuda tener a mano el informe de alta si existe, una lista actualizada de medicación y los apoyos que utiliza habitualmente. También conviene pensar en dos o tres situaciones concretas que hayan cambiado: levantarse del sofá, llegar al portal o ducharse sin ayuda.

La ropa debe permitir moverse con comodidad y el calzado ha de ser el que la persona usa de verdad. Evaluar con unas condiciones artificiales aporta menos información que observar cómo resuelve su rutina habitual.

## Qué ocurre después

La valoración termina con una explicación comprensible para la persona y su familia: qué capacidades conserva, dónde aparecen las principales limitaciones y qué objetivos tienen sentido. Si podemos ayudar, proponemos un punto de partida y una forma de medir la evolución. Si detectamos algo que necesita revisión sanitaria, lo decimos antes de iniciar el programa.

Una buena valoración no busca acumular pruebas. Busca responder una pregunta práctica: **qué necesita esta persona para moverse con más seguridad y autonomía en su vida real**.

También puedes leer [qué mide el SPPB](/articulos/sppb-que-es-valoracion-personas-mayores) y [qué señales indican pérdida de fuerza](/articulos/perdida-fuerza-personas-mayores-senales).
`,
  'fragilidad-prefragilidad-persona-robusta-significado': `
## Fragilidad no significa dependencia

Una persona puede ser frágil y seguir haciendo muchas cosas sola. El término describe una menor reserva para responder ante esfuerzos, enfermedades o periodos de inactividad. Por eso interesa detectarla pronto: en fases iniciales suele existir más margen para recuperar capacidad.

Tampoco es una etiqueta permanente. El perfil puede cambiar cuando mejoran la fuerza, la actividad diaria, la alimentación o el problema de salud que estaba limitando a la persona. La evolución debe medirse, no suponerse.

## Cómo puede ayudar la familia

- Observar cambios funcionales, no solo diagnósticos.
- Evitar hacer automáticamente todo por la persona.
- Facilitar movimiento frecuente dentro de sus posibilidades.
- Consultar ante pérdidas rápidas de peso, fuerza o autonomía.
- Elegir objetivos significativos: salir, cocinar o visitar a alguien.

La intervención depende de la causa y puede necesitar coordinación médica, nutricional, fisioterapéutica y de ejercicio. En ANTEA utilizamos la valoración funcional para decidir qué parte podemos trabajar y cuándo es necesario derivar.

Para continuar, consulta [cómo es una valoración funcional](/articulos/valoracion-funcional-personas-mayores-que-incluye) y [cómo recuperar capacidad tras una hospitalización](/articulos/recuperar-capacidad-despues-hospitalizacion-mayores).
`,
  'sppb-que-es-valoracion-personas-mayores': `
## Qué no puede decirnos el SPPB

El resultado no explica por sí solo por qué existe una limitación. Dolor, miedo, fatiga, visión, medicación o una enfermedad reciente pueden afectar al rendimiento. Tampoco sustituye una exploración médica ni permite predecir de forma individual si una persona va a caerse.

Su valor aparece cuando se interpreta junto con la historia personal y se repite en condiciones parecidas. Así podemos distinguir una impresión subjetiva de un cambio funcional medible.

## Preguntas frecuentes

### ¿Se puede practicar antes para sacar mejor puntuación?

No hace falta. Queremos observar la capacidad habitual, no aprobar un examen. Familiarizarse con las instrucciones es razonable; entrenar específicamente para ocultar una dificultad reduce la utilidad de la prueba.

### ¿Una puntuación baja significa que ya no puede mejorar?

No. Indica un punto de partida y la necesidad de adaptar el trabajo. La capacidad de responder al ejercicio se conserva a edades avanzadas, aunque la progresión y los tiempos sean individuales.

### ¿Cada cuánto se repite?

Depende del programa y de la situación clínica. Se repite cuando ha pasado tiempo suficiente para esperar un cambio útil o cuando aparece una modificación relevante del estado funcional.

Lee también [qué incluye la valoración completa](/articulos/valoracion-funcional-personas-mayores-que-incluye).
`,
  'levantarse-silla-autonomia-personas-mayores': `
## Una progresión práctica y segura

El primer objetivo no es eliminar los apoyos, sino conseguir un movimiento estable y repetible. Podemos empezar con una silla firme algo elevada y las manos apoyadas. Cuando la persona controla la subida y la bajada sin dolor ni mareo, reducimos gradualmente la ayuda o ajustamos la altura.

La fatiga cambia la técnica. Por eso dejamos de contar repeticiones cuando aparecen balanceos cada vez mayores, la persona se deja caer o necesita una ayuda que antes no utilizaba. La calidad del gesto orienta mejor que perseguir un número fijo.

## Preguntas frecuentes

### ¿Es mejor hacerlo rápido o despacio?

Depende del objetivo y del nivel de partida. Al comenzar suele interesar controlar el movimiento. Más adelante puede trabajarse la capacidad de levantarse con mayor rapidez, siempre con una progresión supervisada.

### ¿Qué silla sirve?

Una silla estable, sin ruedas y colocada donde no pueda deslizarse. Los sofás bajos y blandos aumentan mucho la dificultad y no suelen ser el mejor punto de partida.

### ¿Qué hago si aparece dolor?

No hay que forzar. Un dolor nuevo, intenso o creciente necesita revisión antes de continuar. La dificultad sin dolor puede abordarse ajustando altura, apoyo y volumen.

Relacionado: [señales de pérdida de fuerza](/articulos/perdida-fuerza-personas-mayores-senales).
`,
  'perdida-fuerza-personas-mayores-senales': `
## Caminar ayuda, pero no siempre entrena la fuerza necesaria

Caminar aporta actividad aeróbica y mantiene una parte importante de la movilidad. Sin embargo, un paseo cómodo puede no exigir suficiente fuerza a piernas, cadera, espalda y brazos. Las recomendaciones actuales para personas mayores combinan actividad aeróbica, fortalecimiento muscular y trabajo de equilibrio.

Por eso alguien puede caminar todos los días y seguir teniendo dificultades para levantarse, subir un escalón o cargar la compra. No significa que caminar no sirva; significa que el programa está incompleto.

## Qué cambios podemos medir

Además de repetir pruebas funcionales, buscamos mejoras que la familia reconozca:

- Necesitar menos impulso para levantarse.
- Controlar mejor la bajada al sentarse.
- Subir escalones con menos ayuda.
- Transportar objetos cotidianos con seguridad.
- Terminar una tarea con menor fatiga.

No todas las semanas producen el mismo avance. Comparar con el punto de partida cada cierto tiempo evita juzgar el proceso por un día especialmente bueno o malo.

Si quieres entender cómo establecemos esa referencia, lee [qué hacemos en una valoración funcional](/articulos/valoracion-funcional-personas-mayores-que-incluye).
`,
  'recuperar-capacidad-despues-hospitalizacion-mayores': `
## Cómo organizar las primeras semanas

Una rutina sencilla suele funcionar mejor que una sesión aislada demasiado exigente. Podemos repartir pequeños momentos de movimiento durante el día y reservar el trabajo más estructurado para cuando la persona tiene más energía.

El plan debe indicar qué puede hacer sola, qué necesita supervisión y qué no debe realizar todavía. Esa distinción reduce tanto el miedo como la ayuda excesiva de la familia.

## Un ejemplo de objetivo bien planteado

“Recuperar fuerza” es demasiado amplio. “Levantarse del sillón con un solo apoyo y caminar hasta el baño sin detenerse” permite seleccionar ejercicios, observar la evolución y saber cuándo progresar.

Después podemos ampliar el objetivo: llegar al ascensor, caminar hasta el portal o retomar una compra pequeña. La recuperación se construye conectando cada ejercicio con una tarea que importa.

## Preguntas frecuentes

### ¿Cuánto tarda en recuperar el nivel anterior?

No existe un plazo universal. Influyen la causa y duración del ingreso, el nivel previo, la alimentación, las restricciones médicas y la continuidad del trabajo.

### ¿Qué pasa si un día está más cansada?

Se ajusta la sesión. Reducir volumen o elegir tareas más sencillas puede mantener la continuidad sin convertir el cansancio en inactividad total.

Consulta también [qué aporta el ejercicio después de una fractura](/articulos/ejercicio-despues-fractura-mayores) y [cuándo interviene fisioterapia o ejercicio](/articulos/fisioterapeuta-o-entrenador-personal-mayores-diferencia).
`,
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
  const correctedBody = CONTENT_CORRECTIONS.reduce(
    (body, [original, replacement]) => body.replace(original, replacement),
    article.bodyMarkdown
  );
  const expansion = ARTICLE_EXPANSIONS[article.slug];
  const expansionHeading = expansion?.match(/^##\s+.+$/m)?.[0];
  const shouldAddExpansion = expansion && expansionHeading && !correctedBody.includes(expansionHeading);
  const referencesHeading = '\n## Referencias';
  const bodyMarkdown = shouldAddExpansion && correctedBody.includes(referencesHeading)
    ? correctedBody.replace(referencesHeading, `${expansion}${referencesHeading}`)
    : `${correctedBody}${shouldAddExpansion ? expansion : ''}`;

  return override ? { ...article, ...override, bodyMarkdown } : { ...article, bodyMarkdown };
}

export function getArticleImageAlt(article: Article): string {
  return EDITORIAL_OVERRIDES[article.slug]?.imageAlt ?? ADDITIONAL_IMAGE_ALTS[article.slug] ?? article.title;
}

export function getReadingMinutes(markdown: string): number {
  const words = markdown.replace(/[#*_>`\[\]()!-]/g, ' ').trim().split(/\s+/).filter(Boolean);
  return Math.max(1, Math.ceil(words.length / 210));
}
