export const FAMILY_GUIDES_UPDATED = '2026-10-25';

export const familyGuides = [
  {
    slug: 'caidas-personas-mayores',
    title: 'Caídas y equilibrio',
    question: '¿Se cae o tiene miedo a caminar?',
    description: 'Cómo acompañar a un familiar con caídas, inseguridad al caminar o miedo a volver a moverse: señales, equilibrio y próximos pasos.',
    image: '/articulos/riesgo-caidas.webp',
    imageAlt: 'Una mujer mayor se levanta de una silla acompañada por una familiar.',
    intro: 'Una caída puede cambiar también la confianza. Si tu padre o tu madre empieza a evitar los paseos, conviene entender qué ha cambiado antes de insistir en que camine más.',
    observe: ['¿Ha habido caídas o tropiezos recientes?', '¿Se apoya en los muebles o evita salir por miedo?', '¿Le cuesta levantarse, girar o mantener el equilibrio?'],
    guidance: 'Anota cuándo ocurre y qué estaba haciendo. Las caídas pueden tener varias causas: el ejercicio de fuerza y equilibrio es una parte de la prevención, junto con la revisión del entorno y la valoración sanitaria cuando corresponda.',
    caution: 'Si acaba de caer y no puede levantarse o hay sospecha de lesión en la cabeza, cuello, espalda o cadera, llama al 112. No intentes levantarle a la fuerza.',
    groups: [
      { title: 'Reconocer las señales', text: 'Empieza por los cambios que podéis observar en casa.', slugs: ['senales-riesgo-caidas-personas-mayores'] },
      { title: 'Acompañar después de una caída', text: 'La confianza y la seguridad también necesitan atención.', slugs: ['que-pasa-despues-de-una-caida', 'como-levantarse-del-suelo-despues-de-una-caida'] },
      { title: 'Entender qué trabajar', text: 'Conoce el papel del ejercicio adaptado antes de elegir una rutina.', slugs: ['ejercicios-para-prevenir-caidas-en-personas-mayores-7-recomendados-por-la-evidencia', 'osteoporosis-ejercicio-seguro-mayores'] },
    ],
    serviceHref: '/prevencion-caidas-mayores-madrid',
    serviceLabel: 'Ejercicio para prevenir caídas en Madrid',
    sourceHref: 'https://www.nhs.uk/conditions/falls/',
    sourceLabel: 'NHS: caídas, causas y prevención',
  },
  {
    slug: 'perdida-fuerza-personas-mayores',
    title: 'Pérdida de fuerza',
    question: '¿Cada vez necesita más ayuda?',
    description: 'Guía para familiares que observan pérdida de fuerza en una persona mayor: levantarse de la silla, subir escaleras y conservar autonomía.',
    image: '/articulos/perdida-fuerza.webp',
    imageAlt: 'Un hombre mayor comparte una tarea cotidiana en la cocina con una familiar.',
    intro: 'A veces se nota en cosas pequeñas: levantarse cuesta más, las bolsas pesan demasiado o las escaleras empiezan a evitarse. Esos cambios merecen atención, aunque no haya habido una caída.',
    observe: ['¿Necesita los brazos o ayuda para levantarse de la silla?', '¿Ha dejado tareas que antes hacía sin dificultad?', '¿El cambio es progresivo o ha aparecido de repente?'],
    guidance: 'Hablad de tareas concretas que le gustaría mantener o recuperar. Una valoración permite elegir el punto de partida y ajustar la dificultad; una rutina genérica puede quedarse corta o resultar demasiado exigente.',
    caution: 'Una pérdida brusca de fuerza, especialmente en un lado del cuerpo o con dificultad para hablar, requiere atención urgente: llama al 112. La debilidad nueva o inexplicada también debe consultarse con el equipo sanitario.',
    groups: [
      { title: 'Poner nombre a los cambios', text: 'Distingue señales cotidianas de términos que requieren valoración profesional.', slugs: ['perdida-fuerza-personas-mayores-senales', 'fragilidad-prefragilidad-persona-robusta-significado', 'sarcopenia-mayores-que-es-como-frenarla'] },
      { title: 'Conectar fuerza y vida diaria', text: 'Entiende por qué levantarse de una silla es una tarea importante.', slugs: ['levantarse-silla-autonomia-personas-mayores', 'ejercicios-en-silla-personas-mayores'] },
    ],
    serviceHref: '/ejercicio-personas-mayores-madrid',
    serviceLabel: 'Ejercicio de fuerza adaptado a domicilio en Madrid',
    sourceHref: 'https://pubmed.ncbi.nlm.nih.gov/30312372/',
    sourceLabel: 'EWGSOP2: consenso europeo sobre sarcopenia (2019)',
  },
  {
    slug: 'recuperacion-mayores',
    title: 'Recuperación tras un ingreso u operación',
    question: '¿Desde que volvió a casa se mueve menos?',
    description: 'Orientación para familias tras un ingreso u operación: recuperar actividad, respetar las indicaciones del alta y elegir el apoyo adecuado.',
    image: '/articulos/despues-hospitalizacion.webp',
    imageAlt: 'Una mujer mayor camina por casa acompañada por un profesional.',
    intro: 'Volver a casa no siempre significa volver al nivel de actividad anterior. Puede costar más caminar, vestirse o levantarse. El primer paso es conocer las indicaciones del alta y qué apoyo necesita ahora.',
    observe: ['¿Qué tareas hacía antes del ingreso y cuáles cuestan ahora?', '¿Hay restricciones de apoyo, movimiento o carga en el informe de alta?', '¿Tiene seguimiento sanitario o rehabilitación indicada?'],
    guidance: 'Conserva el informe de alta y comparte las indicaciones con los profesionales que le acompañen. El ejercicio debe adaptarse a la intervención, la evolución y las restricciones; no existe un calendario válido para todas las personas.',
    caution: 'Ante un empeoramiento nuevo o síntomas que el informe de alta señale como alarma, contacta con el equipo sanitario. El ejercicio adaptado no sustituye la rehabilitación ni el seguimiento médico indicados.',
    groups: [
      { title: 'Entender la vuelta a casa', text: 'Empieza por la pérdida de capacidad tras un ingreso y el tipo de ayuda que puede necesitar.', slugs: ['recuperar-capacidad-despues-hospitalizacion-mayores', 'fisioterapeuta-o-entrenador-personal-mayores-diferencia'] },
      { title: 'Consultar la situación concreta', text: 'Después de una operación o fractura, las indicaciones individuales marcan el ritmo.', slugs: ['recuperacion-operacion-cadera-ejercicio-mayores', 'ejercicio-despues-fractura-mayores'] },
    ],
    serviceHref: '/recuperar-autonomia-mayores-madrid',
    serviceLabel: 'Apoyo con ejercicio para recuperar autonomía en Madrid',
    sourceHref: 'https://www.nhs.uk/tests-and-treatments/hip-replacement/recovering-from-a-hip-replacement/',
    sourceLabel: 'NHS: recuperación tras una prótesis de cadera',
  },
] as const;

export function getFamilyGuide(slug: string) {
  return familyGuides.find((guide) => guide.slug === slug);
}

export function getPrimaryGuide(articleSlug: string) {
  return familyGuides.find((guide) => guide.groups.some((group) =>
    (group.slugs as readonly string[]).includes(articleSlug)));
}
