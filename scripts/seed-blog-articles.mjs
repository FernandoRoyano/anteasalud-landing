// Carga los artículos del blog en la pestaña "Articulos" del Google Sheet.
// Uso:  NODE_TLS_REJECT_UNAUTHORIZED=0 node scripts/seed-blog-articles.mjs
// (la flag TLS solo hace falta en redes que interceptan el certificado de Google)
//
// Idempotente: salta los artículos cuyo slug ya existe en el sheet.

import pkg from '@next/env';
const { loadEnvConfig } = pkg;
loadEnvConfig(process.cwd());

import { google } from 'googleapis';

const ARTICULOS_SHEET = 'Articulos';
const ARTICULOS_HEADERS = [
  'id', 'slug', 'title', 'excerpt', 'bodyMarkdown', 'ogImage',
  'tags', 'status', 'publishedAt', 'createdAt', 'updatedAt',
];

const articles = [
  {
    slug: 'senales-riesgo-caidas-personas-mayores',
    title: '5 señales de que tu familiar mayor tiene riesgo real de caída (y cómo actuar)',
    excerpt:
      'Aprende a identificar las 5 señales de alerta que indican que tu familiar mayor tiene riesgo real de caída. Guía con evidencia científica y pasos concretos para actuar.',
    tags: ['prevención caídas', 'equilibrio', 'fuerza', 'seguridad mayores'],
    body: `Una caída no avisa. Pero el riesgo de caer sí deja señales claras semanas o meses antes de que ocurra — si sabes dónde mirar.

El problema es que la mayoría de familias no las reconocen hasta después. El familiar ya ha caído, ya ha pasado por urgencias, ya tiene miedo de moverse. Y entonces la recuperación es más larga, más cara y emocionalmente más dura para todos.

Este artículo te da las 5 señales que los profesionales del ejercicio y la medicina evaluamos cuando queremos saber si una persona mayor está en riesgo. No necesitas ser médico para identificarlas. Solo necesitas saber qué observar la próxima vez que estés con tu familiar.

## Por qué las caídas no son "mala suerte"

La creencia más peligrosa sobre las caídas en mayores es que son accidentes imprevisibles. La evidencia dice lo contrario: las caídas tienen causas identificables y medibles, y la mayoría son prevenibles cuando se actúa antes de que ocurran [1].

Los factores de riesgo más estudiados son la debilidad muscular del tren inferior, el deterioro del equilibrio, la velocidad de marcha reducida, el miedo a caerse y el uso de ciertos medicamentos [2]. Todos son observables. Y todos responden al ejercicio bien pautado.

Lo que describes a continuación no es una lista de síntomas médicos. Es una guía de observación para alguien que ve a su familiar con regularidad y quiere saber si es momento de actuar.

## Las 5 señales de alerta

### 1. Se levanta de la silla apoyando las manos

Observa cómo se levanta del sofá, de la mesa o del inodoro. ¿Lo hace de un impulso, o necesita apoyar las manos en los brazos del asiento para conseguirlo?

Esta señal indica debilidad de cuádriceps y glúteos. El test clínico que usamos los profesionales, el "five times sit-to-stand test", mide exactamente esto: el tiempo que tarda una persona en levantarse y sentarse cinco veces seguidas. Si tarda más de 12 segundos, el riesgo de caída en los siguientes 12 meses es significativamente más alto [3].

No hace falta cronómetro. Si necesita apoyo de manos o le cuesta visiblemente, es señal suficiente.

### 2. Evita caminar por superficies irregulares o le da miedo salir solo

El miedo a caerse, conocido en la literatura como "síndrome post-caída" o simplemente "fear of falling", es uno de los predictores más potentes de una caída futura — incluso en personas que todavía no han caído [2].

Cuando una persona mayor empieza a evitar el jardín porque "el suelo está irregular", deja de salir sola, camina muy pegada a las paredes o se aferra al brazo de quien la acompaña en cuanto hay un pequeño escalón, su sistema nervioso ya está registrando que no confía en su propio equilibrio.

Esa desconfianza tiene base real. Y actuar sobre ella con ejercicio específico de equilibrio es posible y efectivo.

### 3. Ha perdido altura o camina con la espalda más encorvada de lo que recordabas

La pérdida de altura y el aumento de la cifosis dorsal (la curvatura hacia delante de la columna) son señales de debilidad de la musculatura extensora del tronco y, en muchos casos, de osteoporosis no diagnosticada o no tratada [4].

Una columna cifótica desplaza el centro de gravedad hacia delante. Eso obliga al sistema de equilibrio a trabajar constantemente para compensar, se fatiga antes y falla con más frecuencia en situaciones de inestabilidad: un bordillo, un suelo mojado, girarse de repente.

No es necesario medir. Si en los últimos dos o tres años notas que la postura ha cambiado claramente, es una señal que merece atención.

### 4. Camina despacio y con pasos cortos

La velocidad de marcha es uno de los indicadores de salud más potentes en personas mayores. Hay estudios que la llaman "el sexto signo vital" porque predice hospitalización, deterioro cognitivo y mortalidad con una precisión sorprendente [5].

En términos de caídas, lo relevante es esto: una persona que camina con pasos muy cortos y lentos tiene menos capacidad de recuperarse de un tropiezo. El paso largo necesita fuerza y confianza en el equilibrio; el paso corto es la respuesta adaptativa cuando ambas faltan.

La señal concreta es cuando alguien que antes caminaba a buen ritmo ahora arrastra los pies o da pasos de menos de medio pie de longitud.

### 5. Ha tenido una caída en los últimos 12 meses, aunque "no fue nada"

El predictor más potente de una caída futura es haber tenido una caída reciente [1]. Incluso si no hubo lesión, incluso si fue un tropiezo menor que se resolvió bien, el hecho de haber caído indica que el sistema de equilibrio y la fuerza muscular no son suficientes para garantizar seguridad en las actividades del día a día.

Muchas familias normalizan estos episodios: "se tropezó con la alfombra", "fue un descuido", "no pasó nada". El problema es que el siguiente tropiezo puede no resolverse igual.

Una caída sin lesión es la señal más clara de que hay que actuar antes de que haya una caída con lesión.

## Si reconoces dos o más señales, es momento de actuar

No tres, no cuatro. Dos señales son suficientes para considerar que el riesgo es real y que esperar no es una buena estrategia.

¿Qué significa actuar? En primer lugar, una valoración funcional profesional: alguien que evalúe la fuerza del tren inferior, el equilibrio estático y dinámico, la marcha y el historial de caídas. Con esa información, un programa de ejercicio multicomponente (fuerza + equilibrio) diseñado específicamente para esa persona reduce el riesgo de caída en torno a un 24% de media, y hasta un 35% en programas de alta adherencia [2].

Lo que no funciona es el ejercicio genérico, caminar sin más o esperar a que el médico lo recomiende en la próxima visita.

## Qué hacer si tu familiar ya ha caído

Si ya ha ocurrido una caída, el riesgo de una segunda es todavía más alto. Además de la lesión física, aparece con frecuencia el síndrome post-caída: miedo, restricción de actividad, pérdida acelerada de músculo por sedentarismo, más riesgo de volver a caer. Es un círculo que se rompe con ejercicio supervisado, no con reposo.

En ese caso, la valoración funcional es urgente, no opcional. Y el programa de ejercicio debe empezar tan pronto como la situación médica lo permita, no cuando "ya esté bien del todo".

Si quieres saber más sobre este proceso, te explico en detalle [qué pasa después de una caída y cómo romper el ciclo del miedo](/articulos/que-pasa-despues-de-una-caida).

## Cómo evaluamos el riesgo en ANTEA Salud

En nuestra valoración gratuita inicial hacemos exactamente este tipo de observación estructurada, junto con tests funcionales validados: el sit-to-stand, el test de apoyo unipodal, la velocidad de marcha en 4 metros y una revisión del entorno doméstico para identificar riesgos físicos en casa.

Con esa información diseñamos un programa personalizado. No ejercicios genéricos de "mayores": un programa calibrado para lo que esa persona necesita, en su casa, con su nivel de partida.

Si has reconocido alguna de estas señales en tu familiar, la primera valoración no tiene coste ni compromiso.

## Referencias

1. World Health Organization. Step safely: strategies for preventing and managing falls across the life-course. Geneva: WHO; 2021.
2. Sherrington C, Fairhall NJ, Wallbank GK, et al. Exercise for preventing falls in older people living in the community. Cochrane Database of Systematic Reviews. 2019;(1):CD012424.
3. Bohannon RW. Five-repetition sit-to-stand test: a review of its clinimetric properties. Percept Mot Skills. 2006;103(1):215-222.
4. Ministerio de Sanidad. Documento de consenso sobre prevención de fragilidad y caídas en la persona mayor. Madrid; 2014.
5. Studenski S, Perera S, Patel K, et al. Gait speed and survival in older adults. JAMA. 2011;305(1):50-58.`,
  },
  {
    slug: 'que-pasa-despues-de-una-caida',
    title: 'Qué pasa después de una caída: el miedo que nadie habla y cómo superarlo con ejercicio',
    excerpt:
      'Después de una caída, el miedo puede ser más incapacitante que la lesión. Descubre qué es el síndrome post-caída y cómo el ejercicio supervisado rompe el ciclo.',
    tags: ['prevención caídas', 'recuperación', 'síndrome post-caída', 'autonomía'],
    body: `La caída ya ocurrió. Las pruebas médicas salieron bien, no hay fractura, el médico dice que puede moverse. Y sin embargo tu familiar ya no es el mismo. Se mueve menos. Sale menos. Pide ayuda para cosas que antes hacía solo. Tiene miedo.

Eso tiene nombre. Y entenderlo es el primer paso para revertirlo.

## El síndrome post-caída: cuando el miedo es la lesión

El síndrome post-caída es la consecuencia psicológica más común y más ignorada de una caída en personas mayores. Se define como el miedo persistente a volver a caer, y aparece en entre el 40% y el 70% de las personas mayores que han sufrido una caída, independientemente de si hubo lesión grave o no [1].

No es exageración ni falta de voluntad. Es una respuesta adaptativa del sistema nervioso: el cerebro ha registrado que el equilibrio falló una vez, y activa mecanismos de protección que se traducen en restricción de movimiento, marcha más cautelosa y evitación de actividades percibidas como arriesgadas.

El problema es que esa respuesta protectora, si no se trabaja, produce exactamente el efecto contrario al buscado.

## El círculo vicioso que nadie explica en urgencias

Esto es lo que suele ocurrir y que raramente se explica en el alta hospitalaria:

**Caída → miedo a volver a caer → reducción de actividad → pérdida acelerada de fuerza y equilibrio → mayor riesgo de caída → nueva caída.**

Cada semana de inactividad después de los 65 años produce una pérdida de masa muscular y capacidad de equilibrio mensurable. A los dos meses de reposo o actividad muy reducida, el punto de partida funcional es significativamente peor que antes de la caída — incluso si la lesión inicial era leve [2].

Dicho de otro modo: el reposo indefinido no protege. Agrava el problema que intenta evitar.

## Por qué el miedo no desaparece solo

Hay una idea extendida de que con el tiempo, cuando "se recupere", el miedo se irá solo. En algunos casos leves ocurre. Pero en la mayoría, sin intervención activa, el miedo se consolida en un patrón de comportamiento que se vuelve cada vez más difícil de revertir.

La literatura sobre el tema es clara: las intervenciones más efectivas para el síndrome post-caída combinan exposición gradual al movimiento (hacer, no solo pensar en hacer) con mejora objetiva de la capacidad física — es decir, ejercicio progresivo y supervisado [3].

La exposición gradual funciona porque le da al sistema nervioso evidencia real de que el equilibrio está mejorando. Cuando una persona mayor que tenía miedo de levantarse sin apoyo consigue hacerlo repetidamente, en un entorno controlado, con un profesional al lado, el miedo disminuye porque la capacidad real ha aumentado. No es motivación ni actitud. Es fisiología.

## Qué le pasa al cuerpo durante las semanas de inactividad

Después de una caída, aunque no haya fractura, es habitual que la persona reduzca drásticamente su actividad durante días o semanas. Las consecuencias físicas son rápidas y concretas:

**Pérdida muscular.** La sarcopenia se acelera con la inactividad. En personas mayores de 70 años, dos semanas de reposo en cama pueden producir la misma pérdida de masa muscular que un año de envejecimiento normal [4]. Esa pérdida no se recupera sola cuando se retoma la actividad: requiere estímulo específico de fuerza.

**Deterioro del equilibrio.** El sistema propioceptivo — los sensores musculares y articulares que informan al cerebro sobre la posición del cuerpo en el espacio — se degrada con la inactividad. El equilibrio no es solo fuerza: es un circuito neurológico que necesita práctica constante para mantenerse.

**Rigidez articular.** Las articulaciones de tobillo, rodilla y cadera pierden rango de movimiento con rapidez cuando se dejan de usar. Esa rigidez altera la mecánica de la marcha y aumenta el riesgo de tropiezo.

**Pérdida de confianza.** Cuanto más tiempo pasa sin moverse, más extraño y arriesgado le parece el movimiento. La primera vez que intenta levantarse sola, salir al pasillo o bajar un escalón, hay más miedo — no menos — que en los días inmediatos a la caída.

## Cuándo empezar el ejercicio después de una caída

La respuesta general, salvo contraindicación médica específica, es: antes de lo que la mayoría de familias cree.

No se trata de volver al nivel previo de golpe. Se trata de mantener el movimiento activo desde el primer momento que sea seguro hacerlo, aunque sea a nivel mínimo. Los programas de rehabilitación funcional más efectivos empiezan en los primeros 7-14 días post-caída con ejercicios de muy baja intensidad — movilidad articular, transferencias supervisadas, trabajo de equilibrio sentado — y van progresando de forma sistemática [3].

Hay situaciones donde es imprescindible esperar el alta del médico o del fisioterapeuta: fracturas, cirugías, daño neurológico. En esos casos, el entrenador especializado en mayores entra después de la fase aguda, en coordinación con el equipo médico, para trabajar la vuelta a la funcionalidad real.

Pero en las caídas sin lesión grave, la espera prolongada no tiene justificación clínica. La tiene el miedo de la familia — comprensible — y la falta de un profesional de confianza que supervise el proceso.

## Qué tipo de ejercicio funciona en este contexto

No cualquier ejercicio. La evidencia señala tres componentes esenciales para romper el círculo post-caída [3, 5]:

**Fuerza de tren inferior.** Cuádriceps, glúteos y gemelos son los músculos que sostienen el cuerpo y permiten recuperarse de un tropiezo. Sin fuerza, el equilibrio no mejora de forma duradera. Sentadillas con apoyo, subida de escalones, elevaciones de talones.

**Equilibrio progresivo.** Exposición gradual a situaciones donde el equilibrio se desafía en un entorno controlado. Apoyo unipodal, marcha en tándem, giros de cabeza mientras se camina. Cada semana un poco más difícil que la anterior.

**Confianza funcional.** Practicar los gestos que la persona evita por miedo: levantarse sin apoyo, dar la vuelta en un espacio reducido, agacharse a recoger algo del suelo. Con supervisión, con seguridad, con progresión — hasta que el sistema nervioso los registre como seguros.

La frecuencia mínima efectiva es de dos sesiones por semana. Los resultados en fuerza y equilibrio son medibles a partir de las 4-6 semanas. La confianza subjetiva, que es lo que la familia nota en el día a día, suele aparecer en ese mismo plazo.

## Lo que las familias pueden hacer (y lo que no)

Es natural que después de una caída la familia quiera proteger al mayor ayudándole en todo. El impulso es bueno. Pero ayudar en exceso tiene un coste real: refuerza la sensación de que no puede solo, reduce las oportunidades de movimiento autónomo y acelera la dependencia.

Lo que ayuda: acompañar los primeros pasos del programa de ejercicio, animar sin presionar, retirar barreras físicas del entorno (alfombras, cables, muebles mal colocados), y buscar un profesional que supervise la progresión.

Lo que no ayuda: prohibirle que se mueva solo, hacer por él todo lo que puede hacer con un poco de esfuerzo, retrasar la vuelta a la actividad indefinidamente "hasta que esté seguro del todo".

El objetivo no es la seguridad absoluta. Es recuperar la mayor autonomía posible con el menor riesgo asumible. Esa es exactamente la distinción que marca la diferencia entre una persona mayor que vuelve a su vida y una que entra en espiral de dependencia.

## Cuándo pedir ayuda profesional

En casi todos los casos después de una caída, pero especialmente en estos:

- Si han pasado más de dos semanas desde la caída y la persona sigue moviéndose significativamente menos que antes.
- Si aparece miedo a actividades que antes hacía sin problema.
- Si ha habido dos o más caídas en los últimos 12 meses.
- Si la familia nota que la persona está más sedentaria, más quieta o más cerrada en casa.
- Si la persona dice frases como "ya para qué", "a mi edad es normal" o "mejor no arriesgar".

En ANTEA Salud trabajamos específicamente este proceso: la valoración funcional post-caída, el diseño del programa de recuperación y la supervisión de cada sesión en el domicilio. El objetivo es siempre el mismo — recuperar la funcionalidad y la confianza antes de que el círculo post-caída se consolide.

La primera valoración es gratuita y sin compromiso. Si tu familiar ha tenido una caída reciente, no esperes a la siguiente para actuar.

## Referencias

1. Scheffer AC, Schuurmans MJ, van Dijk N, et al. Fear of falling: measurement strategy, prevalence, risk factors and consequences among older persons. Age Ageing. 2008;37(1):19-24.
2. Kortebein P, Ferrando A, Lombeida J, et al. Effect of 10 days of bed rest on skeletal muscle in healthy older adults. JAMA. 2007;297(16):1772-1774.
3. Sherrington C, Fairhall NJ, Wallbank GK, et al. Exercise for preventing falls in older people living in the community. Cochrane Database of Systematic Reviews. 2019;(1):CD012424.
4. Cruz-Jentoft AJ, Bahat G, Bauer J, et al. Sarcopenia: revised European consensus on definition and diagnosis. Age Ageing. 2019;48(1):16-31.
5. Campbell AJ, Robertson MC, Gardner MM, et al. Randomised controlled trial of a general practice programme of home based exercise to prevent falls in elderly women. BMJ. 1997;315(7115):1065-1069.`,
  },
  {
    slug: 'recuperacion-operacion-cadera-ejercicio-mayores',
    title: 'Recuperación tras operación de cadera: qué puede hacer el ejercicio (y qué no)',
    excerpt:
      'Guía completa sobre el papel del ejercicio en la recuperación tras una operación de cadera en personas mayores. Fases, ejercicios recomendados y cuándo pedir ayuda profesional.',
    tags: ['post-operatorio', 'cadera', 'readaptación', 'ejercicio mayores'],
    body: `La operación de cadera — ya sea una prótesis total, una hemiartroplastia o la fijación de una fractura — es una de las intervenciones más frecuentes en personas mayores. En España se realizan más de 40.000 cirugías de cadera al año en mayores de 65 años [1].

El resultado de la cirugía depende en buena parte del proceso de recuperación. Y el ejercicio supervisado, bien pautado y empezado en el momento adecuado, es uno de los factores que más influyen en esa recuperación — tanto en velocidad como en calidad final.

Este artículo explica qué puede hacer el ejercicio en cada fase, qué no puede hacer y cuándo es el momento de pedir ayuda a un profesional especializado.

## Qué esperar en las primeras semanas

Las primeras 6-8 semanas post-cirugía son la fase aguda. El alta hospitalaria suele llegar en 3-5 días, pero la recuperación real empieza en casa, y es ahí donde la mayoría de las familias se sienten solas y sin información clara.

En esta fase, el trabajo es del fisioterapeuta y del equipo médico. El objetivo es la cicatrización de los tejidos, la gestión del dolor y la recuperación básica de movilidad — levantarse de la cama, caminar con andador, subir y bajar del inodoro sin riesgo de luxación.

Lo que sí puede hacerse en esta fase desde casa, con orientación: ejercicios respiratorios, movilización activa de tobillo y pie (para prevenir trombosis), y contracciones isométricas suaves de glúteo y cuádriceps si el médico lo autoriza.

Lo que no se debe hacer sin prescripción: ejercicio de carga sobre la cadera operada, flexión de cadera más allá de los grados que indique el cirujano, rotaciones del tronco, ni ejercicios de equilibrio en bipedestación sin supervisión.

## La fase que más se descuida: de la semana 8 a la semana 24

Después de las primeras 6-8 semanas, la persona ya camina con bastón o sin apoyo, el dolor ha disminuido, y tanto la familia como el propio paciente consideran que "ya está bien". Las visitas al fisioterapeuta se espacian o terminan.

Este es el error más común y más costoso del proceso de recuperación.

En este período, la cadera mecánicamente está consolidada, pero la musculatura que la rodea — glúteo medio, glúteo mayor, psoas, cuádriceps — sigue debilitada de forma significativa respecto al nivel pre-operatorio. Esa debilidad muscular produce cojera persistente, asimetrías de marcha que sobrecargan la rodilla y la espalda, y un riesgo de caída muy superior al normal [2].

Aquí es donde entra el trabajo del entrenador especializado en readaptación funcional: una vez que la fase aguda ha terminado y el fisioterapeuta ha dado el alta, el objetivo ya no es recuperar la movilidad articular básica — ese trabajo está hecho — sino recuperar la fuerza, el equilibrio y la capacidad funcional para la vida real.

## Qué puede hacer el ejercicio en esta fase

El trabajo en la fase de readaptación funcional tiene objetivos concretos y medibles:

**Recuperar la fuerza del glúteo medio.** Es el músculo más afectado por la cirugía y el que más tarda en recuperarse. Su debilidad es la causa principal de la cojera que muchas personas mantienen meses después de la operación. Los ejercicios de abducción de cadera, las elevaciones laterales de pierna y el trabajo en apoyo unipodal progresivo son los más efectivos [3].

**Recuperar la simetría de marcha.** La persona ha pasado semanas compensando el peso hacia el lado sano. Esas compensaciones crean patrones de movimiento que hay que reeducar activamente. Sin trabajo específico, pueden cronificarse y provocar dolor en rodilla, cadera contralateral y zona lumbar meses después.

**Recuperar la confianza funcional.** El miedo a forzar la prótesis, a caerse, a "romper lo que han hecho" es muy frecuente. El trabajo progresivo — con supervisión, con evidencia de mejora, con objetivos claros — es lo que reduce ese miedo de forma real. No las palabras de tranquilidad.

**Prevenir la siguiente caída.** La persona que ha tenido una fractura de cadera tiene un riesgo significativamente más alto de sufrir una segunda. Un programa de ejercicio multicomponente en esta fase reduce ese riesgo de forma sustancial [4].

## Qué no puede hacer el ejercicio

Es importante ser honesto sobre los límites.

El ejercicio no puede acelerar la consolidación ósea ni la cicatrización de tejidos — ese proceso tiene su tiempo y depende de factores biológicos. No puede sustituir la fisioterapia en la fase aguda ni la supervisión médica durante todo el proceso. No puede compensar una prótesis mal implantada o una complicación quirúrgica.

Y no puede hacerse de cualquier manera. El ejercicio sin supervisión en este contexto tiene riesgos reales: sobrecarga articular, compensaciones que agravan asimetrías, luxación por posiciones contraindicadas. La dosis y la progresión importan tanto como el ejercicio en sí.

## Coordinación entre profesionales: cómo debe funcionar

La recuperación óptima post-cadera implica al menos tres tipos de profesionales trabajando en fases complementarias:

El cirujano ortopédico supervisa la consolidación, autoriza los avances de carga y resuelve cualquier complicación. El fisioterapeuta trabaja la movilidad articular, el control del dolor y la recuperación funcional básica en la fase aguda. El entrenador especializado en readaptación funcional toma el relevo para recuperar la fuerza, la marcha y la capacidad para la vida real una vez que la fase aguda ha terminado.

En ANTEA Salud trabajamos en coordinación con el médico y el fisioterapeuta cuando es necesario. No somos una alternativa al sistema médico: somos el paso siguiente que la mayoría de personas mayores necesitan y que el sistema público raramente puede ofrecer.

## Señales de que la recuperación no está yendo bien

Más allá del dolor agudo — que debe consultarse siempre con el médico — hay señales funcionales que indican que la recuperación post-operatoria necesita refuerzo:

- Cojera visible más de 8 semanas después de la cirugía.
- Dificultad para subir escaleras o levantarse de una silla sin apoyo de manos a los 3 meses.
- Miedo persistente a caminar sin apoyo o en exteriores.
- Dolor en rodilla, cadera contralateral o zona lumbar que no existía antes de la cirugía.
- Reducción significativa de la actividad respecto al nivel pre-operatorio a los 6 meses.

Si reconoces alguna de estas señales en tu familiar, es el momento de pedir una valoración funcional. El tiempo que pasa entre el alta hospitalaria y el inicio de un programa de readaptación bien estructurado tiene un impacto directo en el resultado final.

La primera valoración en ANTEA Salud es gratuita. Evaluamos el nivel funcional actual, revisamos el historial de la cirugía y diseñamos un programa de readaptación a domicilio adaptado al ritmo y las limitaciones de cada persona.

## Referencias

1. Instituto Nacional de Estadística. Estadística de establecimientos sanitarios con régimen de internamiento. Madrid: INE; 2022.
2. Magaziner J, Hawkes W, Hebel JR, et al. Recovery from hip fracture in eight areas of function. J Gerontol A Biol Sci Med Sci. 2000;55(9):M498-507.
3. Suetta C, Magnusson SP, Rosted A, et al. Resistance training in the early post-operative phase reduces hospitalization and leads to muscle hypertrophy in elderly hip surgery patients. Scand J Med Sci Sports. 2004;14(6):320-324.
4. Sherrington C, Fairhall NJ, Wallbank GK, et al. Exercise for preventing falls in older people living in the community. Cochrane Database of Systematic Reviews. 2019;(1):CD012424.
5. Minns Lowe CJ, Barker KL, Dewey M, Sackley CM. Effectiveness of physiotherapy exercise after knee arthroplasty for osteoarthritis: systematic review and meta-analysis of randomised controlled trials. BMJ. 2007;335(7624):812.`,
  },
  {
    slug: 'ejercicio-domicilio-mayores-mejor-que-gimnasio',
    title: 'Por qué el ejercicio en casa es más efectivo para mayores que ir a un gimnasio o centro',
    excerpt:
      'El ejercicio a domicilio para personas mayores no es una alternativa de segunda. Con evidencia científica, explicamos por qué es más efectivo, más seguro y más sostenible que ir a un gimnasio o centro.',
    tags: ['entrenamiento domicilio', 'mayores Madrid', 'ejercicio adaptado'],
    body: `Cuando las familias buscan soluciones de ejercicio para sus padres o abuelos, la primera imagen que viene a la cabeza suele ser un gimnasio o un centro de día con clases grupales. El ejercicio a domicilio parece una opción de comodidad o de último recurso, para cuando la persona ya no puede desplazarse.

La evidencia dice algo diferente.

Para la mayoría de las personas mayores, especialmente aquellas con riesgo de caída, en proceso de recuperación o con movilidad reducida, el ejercicio supervisado en el domicilio no es una alternativa de segunda. En varios aspectos concretos y medibles, es la opción más efectiva.

## El problema del desplazamiento que nadie calcula

Ir a un gimnasio o a un centro de mayores implica una cadena de acciones que para una persona mayor con movilidad reducida tiene un coste energético y logístico real: vestirse, desplazarse, orientarse en un entorno nuevo, aguantar el tiempo de espera, volver. Para una persona que camina con bastón, tiene miedo a caerse o acaba de salir de una operación, ese proceso puede ser agotador — y desalentador.

La consecuencia práctica es la baja adherencia. En los estudios sobre programas de ejercicio grupal para mayores, las tasas de abandono en los primeros tres meses superan con frecuencia el 40% [1]. El principal motivo declarado es la dificultad logística del desplazamiento, no la falta de motivación.

Un programa a domicilio elimina esa barrera completamente. La adherencia en programas domiciliarios bien estructurados es significativamente más alta, y la adherencia es el factor que más predice el resultado final de cualquier programa de ejercicio [2].

## El entorno doméstico es el entorno real

Este es el argumento más importante y el menos intuitivo.

El objetivo del ejercicio en personas mayores no es el rendimiento deportivo. Es la funcionalidad en la vida cotidiana: levantarse del sofá, subir las escaleras de casa, ir al baño de noche sin caerse, agacharse a recoger algo del suelo. Esos gestos ocurren en casa, en condiciones concretas — un pasillo estrecho, un escalón de 17 cm, un suelo de parquet que resbala ligeramente.

Cuando un entrenador trabaja en el domicilio, puede evaluar y trabajar exactamente esos gestos, en ese entorno. Puede ver que el escalón que separa el cuarto de baño del pasillo tiene una altura irregular. Puede notar que la silla donde la persona desayuna tiene reposabrazos demasiado bajos. Puede programar el ejercicio para las condiciones reales de esa casa, no para un suelo de goma de gimnasio.

Eso no se puede replicar en ningún centro. No porque los profesionales de los centros sean peores, sino porque trabajan en un entorno distinto del que importa.

## Supervisión individual frente a supervisión grupal

En una clase de gimnasia para mayores, el ratio habitual es de un profesional para 10-20 personas. Eso implica que la supervisión de la técnica, la progresión individual y la detección de compensaciones o señales de riesgo es limitada.

En el trabajo domiciliario individual, el profesional tiene la atención puesta en una sola persona durante toda la sesión. Puede detectar que la cadera derecha compensa el trabajo del cuádriceps izquierdo. Puede ajustar la resistencia o el nivel de dificultad en tiempo real según cómo responde el cuerpo ese día. Puede notar que la persona está más fatigada de lo habitual y modificar la sesión en consecuencia.

Para una persona mayor con factores de riesgo, esa supervisión individualizada no es un lujo. Es la diferencia entre un programa que progresa bien y uno que estanca o lesiona.

## La evidencia sobre programas domiciliarios en prevención de caídas

El programa Otago Exercise Programme — uno de los más estudiados del mundo en prevención de caídas — es un programa domiciliario individualizado. Sus resultados incluyen una reducción del 35% en caídas y del 35% en caídas con lesión en personas mayores de 80 años que lo siguieron durante un año [3].

La revisión Cochrane más reciente sobre ejercicio para prevención de caídas en mayores concluye que los programas que combinan ejercicio domiciliario con supervisión profesional muestran resultados equiparables o superiores a los programas grupales en centro, con una adherencia más sostenida a largo plazo [4].

Los programas grupales tienen ventajas reales — componente social, motivación colectiva, menor coste — y son una buena opción para personas mayores activas sin factores de riesgo específicos. Pero para personas con riesgo de caída, en recuperación o con movilidad reducida, la evidencia señala el domicilio como el entorno más efectivo.

## El coste real comparado

Cuando las familias comparan opciones, el coste económico del servicio domiciliario parece más alto a primera vista. Pero el cálculo real incluye más variables.

El transporte al centro y de vuelta tiene un coste económico y de tiempo, frecuentemente asumido por un familiar que tiene que desplazarse también. Las clases grupales de bajo coste a menudo implican ratios altos y supervisión limitada — lo que reduce la efectividad y, en casos con factores de riesgo, puede ser contraproducente. Y el coste de una caída con lesión — urgencias, hospitalización, baja funcional prolongada, dependencia — supera con mucho cualquier inversión preventiva razonable.

No es que el ejercicio domiciliario sea barato. Es que cuando se hace bien, su retorno es muy alto.

## Para quién es más recomendable el domicilio

El ejercicio a domicilio con entrenador especializado es especialmente indicado en estos perfiles:

- Personas mayores con historial de caídas o miedo a caerse.
- Personas en recuperación post-operatoria (cadera, rodilla, columna).
- Personas con movilidad reducida que tienen dificultad para desplazarse.
- Personas con patologías que requieren adaptación constante del ejercicio (osteoporosis, enfermedad cardiovascular controlada, artrosis avanzada).
- Personas mayores que viven solas y cuyas familias no pueden supervisar el ejercicio diariamente.

Para una persona mayor activa, sin factores de riesgo específicos y con acceso fácil a un centro con profesionales cualificados, las clases grupales pueden ser suficientes y beneficiosas. No es que el domicilio sea la única opción válida — es que para los perfiles con mayor necesidad, es la más efectiva.

En ANTEA Salud trabajamos exclusivamente a domicilio en la Comunidad de Madrid. Si quieres saber si tu familiar encaja en este perfil, la primera valoración es gratuita y sin compromiso.

## Referencias

1. Picorelli AM, Pereira LS, Pereira DS, et al. Adherence to exercise programs for older people is influenced by program characteristics and personal factors: a systematic review. J Physiother. 2014;60(3):151-156.
2. Franco MR, Tong A, Howard K, et al. Older people's perspectives on participation in physical activity: a systematic review and thematic synthesis of qualitative literature. Br J Sports Med. 2015;49(19):1268-1276.
3. Campbell AJ, Robertson MC, Gardner MM, et al. Randomised controlled trial of a general practice programme of home based exercise to prevent falls in elderly women. BMJ. 1997;315(7115):1065-1069.
4. Sherrington C, Fairhall NJ, Wallbank GK, et al. Exercise for preventing falls in older people living in the community. Cochrane Database of Systematic Reviews. 2019;(1):CD012424.`,
  },
  {
    slug: 'tests-funcionales-mayores-en-casa',
    title: 'Cómo saber si tu familiar mayor necesita un programa de ejercicio: 3 tests funcionales en casa',
    excerpt:
      'Tres tests funcionales validados científicamente que puedes hacer en casa para evaluar el nivel de riesgo de tu familiar mayor. Sin equipamiento, en menos de 10 minutos.',
    tags: ['valoración funcional', 'ejercicio mayores', 'prevención caídas', 'autonomía'],
    body: `Una de las preguntas que más me hacen las familias es esta: "¿Cómo sé si mi padre realmente necesita un entrenador, o es que está bien para su edad?"

Es una pregunta legítima. Y tiene respuesta objetiva.

Los profesionales del ejercicio y la medicina geriátrica usamos tests funcionales validados para medir exactamente eso — no una impresión subjetiva, sino indicadores medibles de fuerza, equilibrio y movilidad que predicen el riesgo de caída y la capacidad funcional real.

Tres de esos tests puedes hacerlos tú en casa, sin equipamiento especial, en menos de 10 minutos. Este artículo te explica cómo.

## Por qué los tests funcionales importan

La valoración funcional no es un requisito burocrático. Es la única manera de saber dónde está realmente una persona y, por tanto, qué tipo de intervención necesita — si es que necesita alguna.

Sin valoración inicial, un programa de ejercicio es un disparo al aire: puede ser demasiado fácil y no producir adaptación, demasiado difícil y producir lesión, o simplemente mal dirigido hacia los aspectos que menos necesitan trabajo.

Con valoración, el programa se calibra exactamente para lo que esa persona necesita. Y la progresión se puede medir: dentro de 6 semanas, los mismos tests dan los mismos números — y se puede ver si han mejorado, cuánto, y en qué.

## Cómo hacer los tests en casa

Para los tres tests necesitas: un cronómetro (el del móvil es suficiente), una silla firme con respaldo y sin ruedas, y un espacio libre de unos 4 metros. Estar presente tú durante las pruebas es imprescindible, tanto por seguridad como para anotar los resultados.

### Test 1: Five Times Sit-to-Stand (5STS)

**Qué mide:** Fuerza funcional del tren inferior — cuádriceps y glúteos principalmente.

**Cómo hacerlo:**

Coloca la silla firme contra la pared. La persona se sienta en el borde de la silla, con los pies apoyados en el suelo a la anchura de la cadera y los brazos cruzados sobre el pecho. Cuando digas "ya", tiene que levantarse y sentarse cinco veces seguidas tan rápido como pueda, sin usar las manos si es posible. Cronometras desde el "ya" hasta que se sienta la quinta vez.

**Cómo interpretar el tiempo:**

| Resultado | Riesgo | Recomendación |
|---|---|---|
| Menos de 12 s | Bajo | Fuerza conservada |
| 12–16 s | Moderado | Programa de fuerza recomendado |
| Más de 16 s | Alto | Valoración profesional urgente |
| No puede sin manos | Señal de alerta | Valoración inmediata |

**Referencia de edad:** En mayores de 75 años, el valor de corte para riesgo alto es 15 segundos. En mayores de 80, 17 segundos.

### Test 2: Apoyo unipodal (Single-Leg Stance)

**Qué mide:** Equilibrio estático — la capacidad de mantener el cuerpo en pie sobre una sola pierna. Es uno de los predictores más potentes de caída en la literatura científica [1].

**Cómo hacerlo:**

La persona se pone de pie junto a una encimera o respaldo de silla firme, con las manos a los costados (no apoyadas, solo cerca). Levanta una pierna del suelo — no hace falta alzarla mucho, con que el pie no toque el suelo basta. Cronometras cuántos segundos mantiene el equilibrio sin apoyar el pie ni agarrarse. Repite con la otra pierna. Anota los dos tiempos.

**Cómo interpretar el tiempo:**

| Resultado | Riesgo | Recomendación |
|---|---|---|
| Más de 30 s | Bajo | Equilibrio conservado |
| 10–30 s | Moderado | Trabajo de equilibrio recomendado |
| Menos de 10 s | Alto | Programa supervisado urgente |
| Menos de 5 s | Señal de alerta | Valoración profesional inmediata |

Si hay una diferencia mayor de 10 segundos entre una pierna y otra, también es un dato relevante — puede indicar asimetría relacionada con una caída anterior o una cirugía.

### Test 3: Timed Up and Go (TUG)

**Qué mide:** Movilidad funcional integrada — la combinación de levantarse, caminar, girar y sentarse. Es el test más usado en geriatría para evaluar riesgo de caída global [2].

**Cómo hacerlo:**

La persona está sentada en la silla. Marca un punto en el suelo a 3 metros de distancia (una cinta adhesiva o un objeto sirven). Cuando digas "ya", tiene que levantarse de la silla, caminar hasta el punto marcado, girar, volver y sentarse. Cronometras desde el "ya" hasta que vuelve a estar sentada. Puede usar bastón o andador si lo usa habitualmente.

**Cómo interpretar el tiempo:**

| Resultado | Riesgo | Recomendación |
|---|---|---|
| Menos de 10 s | Bajo | Movilidad conservada |
| 10–14 s | Moderado | Valorar inicio de programa |
| Más de 14 s | Alto | Valoración profesional urgente |
| Más de 20 s | Dependencia significativa | Intervención inmediata |

## Cómo combinar los tres resultados

Ningún test aislado da una imagen completa. Los tres juntos sí:

**Los tres en zona de riesgo bajo:** La persona tiene una capacidad funcional conservada. Un programa de mantenimiento preventivo es recomendable, pero no urgente.

**Uno o dos en zona de riesgo moderado:** Hay una señal clara de que la capacidad funcional está disminuyendo. Es el momento ideal para empezar un programa de ejercicio — antes de que la situación empeore.

**Uno o más en zona de riesgo alto:** La intervención profesional es urgente, no opcional. El riesgo de caída en los próximos 12 meses es alto y medible, y hay margen real de mejora con ejercicio bien pautado.

## Qué hacemos con estos resultados en ANTEA Salud

En nuestra valoración gratuita inicial hacemos estos mismos tests — y otros adicionales — para establecer el punto de partida de cada persona. Con esos datos diseñamos el programa: qué trabajar primero, con qué intensidad, a qué ritmo progresar.

Y los repetimos cada 6-8 semanas para medir la evolución. No para cumplir un protocolo, sino porque los números son lo único que demuestra de forma objetiva si el programa está funcionando.

Si has hecho los tests y tienes dudas sobre los resultados, puedes compartírnoslos en la valoración gratuita. O si prefieres que seamos nosotros quienes los hagamos directamente con tu familiar, la primera visita no tiene coste.

## Referencias

1. Springer BA, Marin R, Cyhan T, et al. Normative values for the unipedal stance test with eyes open and closed. J Geriatr Phys Ther. 2007;30(1):8-15.
2. Podsiadlo D, Richardson S. The timed "Up & Go": a test of basic functional mobility for frail elderly persons. J Am Geriatr Soc. 1991;39(2):142-148.
3. Bohannon RW. Five-repetition sit-to-stand test: a review of its clinimetric properties. Percept Mot Skills. 2006;103(1):215-222.`,
  },
  {
    slug: 'ejercicio-despues-fractura-mayores',
    title: '¿Cuándo es seguro empezar a hacer ejercicio tras una fractura?',
    excerpt:
      'Guía basada en evidencia sobre cuándo y cómo retomar el ejercicio después de una fractura en personas mayores. Tiempos, señales de alerta y qué tipo de actividad es segura en cada fase.',
    tags: ['fractura', 'post-operatorio', 'ejercicio mayores', 'recuperación'],
    body: `Una fractura en una persona mayor no es solo una lesión ósea. Es un evento que interrumpe la actividad física, acelera la pérdida muscular, activa el miedo a moverse y, si no se maneja bien, puede iniciar una espiral de dependencia que la lesión inicial no justifica.

La pregunta que más repiten las familias en estos casos es siempre la misma: ¿cuándo podemos empezar a hacer ejercicio? ¿Es seguro? ¿No se puede volver a romper?

La respuesta no es única — depende del tipo de fractura, del tratamiento y del estado funcional previo. Pero hay principios claros que aplican en la mayoría de los casos.

## Por qué el reposo prolongado es el mayor riesgo

Cuando ocurre una fractura, el instinto protector de la familia y a veces del propio sistema sanitario es recomendar reposo. "Que no se mueva", "que descanse", "que espere a estar bien del todo".

El problema es que en personas mayores, el reposo tiene un coste biológico muy alto y muy rápido. Dos semanas de inactividad en cama pueden producir la misma pérdida de masa muscular que un año de envejecimiento normal [1]. El deterioro del equilibrio y la propiocepción también es rápido.

Cuando la persona finalmente intenta retomar la actividad — semanas o meses después — lo hace con una base funcional significativamente peor que la que tenía antes de la fractura. El resultado es un riesgo de nueva caída más alto, no más bajo.

El objetivo no es inmovilizar hasta la consolidación total. Es mantener el mayor nivel de actividad posible dentro de los límites que la lesión impone, y progresar de forma controlada hacia la recuperación funcional.

## Tipos de fractura más frecuentes en mayores y sus tiempos orientativos

**Fractura de cadera (cuello femoral o trocantérica).** Es la más grave en términos funcionales. El tratamiento suele ser quirúrgico y el alta hospitalaria ocurre en pocos días. La fisioterapia empieza en el hospital. La readaptación funcional con entrenador — fuerza, marcha, equilibrio — puede empezar típicamente a partir de la semana 6-8, siempre con autorización médica y en coordinación con el fisioterapeuta.

**Fractura de muñeca (radio distal).** Frecuente por caídas con apoyo de manos. La inmovilización dura entre 4 y 6 semanas. El ejercicio de tren inferior — sentarse y levantarse, marcha, equilibrio — puede mantenerse casi desde el primer día si no hay otras complicaciones. La fisioterapia de muñeca empieza al retirar la escayola.

**Fractura vertebral por compresión.** Muy frecuente en personas con osteoporosis. Puede ocurrir de forma casi asintomática o con dolor agudo. El tratamiento habitual es conservador (corsé o reposo relativo). El ejercicio de bajo impacto y los ejercicios de musculatura extensora de tronco están indicados precozmente en muchos casos, siempre con prescripción médica.

**Fractura de tobillo.** Dependiendo de la complejidad, puede tratarse con inmovilización o con cirugía. El trabajo de miembros superiores y el ejercicio en sedestación son posibles durante la inmovilización. La carga progresiva empieza cuando el médico autoriza.

Estos son tiempos orientativos. Cada caso tiene sus particularidades y la autorización médica es siempre el punto de partida, no opcional.

## Qué puede hacerse en cada fase

**Durante la inmovilización (si la hay):**

Trabajo de las partes del cuerpo no afectadas. Si la fractura es en muñeca, se puede trabajar tren inferior. Si es en tobillo, se puede trabajar tren superior y equilibrio sentado. Los ejercicios respiratorios y las contracciones isométricas del segmento inmovilizado — si el médico lo autoriza — ayudan a preservar músculo y circulación.

**En las primeras semanas post-inmovilización:**

La articulación que estuvo inmovilizada necesita trabajo de movilidad progresiva. La musculatura circundante está atrofiada y necesita estimulación de fuerza de baja intensidad. Los ejercicios de equilibrio en carga progresiva empiezan con apoyo total y van reduciendo la base de sustentación.

**A partir de la semana 8-12 (según tipo de fractura):**

Es cuando el trabajo funcional real puede comenzar. Fuerza de tren inferior con carga progresiva, equilibrio estático y dinámico, reeducación de la marcha, trabajo de los gestos de la vida cotidiana en el entorno doméstico real.

## Señales de que algo no va bien

Durante el proceso de recuperación, hay señales que requieren consulta médica inmediata — no esperar a la siguiente cita programada:

- Dolor agudo o creciente en la zona de fractura durante o después del ejercicio.
- Inflamación, enrojecimiento o calor local en la zona operada.
- Sensación de inestabilidad o "clic" articular que no existía antes.
- Fiebre inexplicada en las primeras semanas post-cirugía.
- Dificultad de apoyo que empeora en lugar de mejorar.

El ejercicio bien pautado no produce estos síntomas. Si aparecen, hay que parar y consultar.

## El papel del entrenador especializado en esta fase

El fisioterapeuta trabaja la fase aguda y la recuperación articular básica. El entrenador especializado en readaptación funcional entra después: cuando la articulación ya puede trabajarse en carga, cuando la fase de dolor agudo ha pasado, y el objetivo ya es recuperar la funcionalidad para la vida real — no solo el rango articular.

Esa distinción importa porque los objetivos son distintos. El fisioterapeuta recupera la estructura. El entrenador recupera la capacidad de usar esa estructura en la vida cotidiana: subir escaleras, levantarse del suelo si hace falta, salir a la calle con confianza.

En ANTEA Salud trabajamos en coordinación con el médico y el fisioterapeuta cuando el proceso lo requiere. Si tu familiar está en proceso de recuperación tras una fractura y no sabes en qué punto es adecuado empezar, la valoración gratuita está disponible para resolverlo.

## Referencias

1. Kortebein P, Ferrando A, Lombeida J, et al. Effect of 10 days of bed rest on skeletal muscle in healthy older adults. JAMA. 2007;297(16):1772-1774.
2. Handoll HH, Sherrington C, Mak JC. Interventions for improving mobility after hip fracture surgery in adults. Cochrane Database Syst Rev. 2011;(3):CD001704.
3. Lau EM, Cooper C. The epidemiology of osteoporosis. Clin Orthop Relat Res. 1996;(323):65-74.`,
  },
  {
    slug: 'fisioterapeuta-o-entrenador-personal-mayores-diferencia',
    title: 'Fisioterapeuta o entrenador personal: ¿qué necesita tu familiar en la recuperación?',
    excerpt:
      '¿Fisioterapeuta o entrenador personal para tu familiar mayor? Explicamos las diferencias reales, cuándo necesita uno, el otro, o los dos.',
    tags: ['fisioterapia', 'entrenamiento personal', 'mayores', 'recuperación', 'readaptación'],
    body: `Es una de las preguntas más frecuentes cuando una familia busca apoyo para un familiar mayor: ¿necesita un fisioterapeuta o un entrenador personal? ¿Son lo mismo? ¿Uno sustituye al otro?

La confusión es comprensible. Ambos trabajan con el cuerpo, ambos se presentan como soluciones para la movilidad y la recuperación, y a veces los dos hacen cosas que parecen similares. Pero tienen formaciones distintas, objetivos distintos y momentos de intervención distintos. Entender la diferencia es lo que permite elegir bien.

## Qué hace un fisioterapeuta

El fisioterapeuta es un profesional sanitario con titulación universitaria específica en fisioterapia. Su campo de actuación es el diagnóstico y tratamiento de disfunciones del movimiento — dolor, lesión, patología articular o muscular, alteraciones neurológicas. Trabaja con técnicas manuales, electroterapia, vendaje, movilización articular pasiva y activa, y ejercicio terapéutico.

Su intervención es especialmente indicada en la fase aguda: dolor reciente, lesión activa, post-operatorio inmediato, inflamación, rehabilitación de una estructura dañada. El fisioterapeuta trata un problema que existe en ese momento.

Dentro del sistema sanitario español, la fisioterapia de recuperación post-cirugía suele cubrirse — al menos en parte — por el sistema público o por seguros médicos. Las sesiones son cortas (30-45 minutos habitualmente) y se espacian a medida que la persona mejora.

## Qué hace un entrenador especializado en mayores

El entrenador personal con especialización en ejercicio adaptado y readaptación funcional — con Grado en Ciencias de la Actividad Física y el Deporte y formación específica — trabaja en el plano de la capacidad funcional, no de la patología. Su objetivo no es tratar una lesión activa: es desarrollar fuerza, mejorar el equilibrio, recuperar la capacidad de movimiento para la vida cotidiana y prevenir futuras lesiones.

Su intervención es más indicada una vez que la fase aguda ha terminado: cuando la estructura ya está reparada o estabilizada y el objetivo es recuperar la funcionalidad real. También es muy efectivo en prevención — antes de que ocurra la caída o la lesión.

El entrenador trabaja en sesiones más largas, más frecuentes y más orientadas al movimiento funcional que a la terapia manual.

## Cuándo necesitas uno, el otro, o los dos

**Solo fisioterapeuta:** Cuando hay una lesión activa, dolor agudo, inflamación, o un proceso post-quirúrgico inmediato. El cuerpo necesita tratamiento, no entrenamiento.

**Solo entrenador:** Cuando la persona mayor no tiene lesión activa ni dolor significativo, pero sí debilidad muscular, pérdida de equilibrio, miedo a caerse o un nivel funcional por debajo de lo deseable. También en prevención pura — antes de que aparezca el problema.

**Los dos, en fases:** Es el escenario más frecuente después de una cirugía o una caída con lesión. El fisioterapeuta actúa primero, en la fase aguda. El entrenador actúa después, en la fase de readaptación funcional. Cuando trabajan en coordinación — compartiéndose información sobre el estado del paciente y los objetivos de cada fase — el resultado es mejor que con cualquiera de los dos por separado.

**Los dos simultáneamente:** En algunos casos — osteoporosis avanzada con dolor crónico, artrosis severa con necesidad de trabajo funcional — puede tener sentido que ambos trabajen en paralelo, con objetivos complementarios y en comunicación.

## El error más frecuente que veo en las familias

La mayoría de las familias consultan al fisioterapeuta en la fase aguda — correcto — y luego, cuando el fisio da el alta, asumen que la recuperación ha terminado.

No ha terminado. El fisioterapeuta ha devuelto la estructura a un estado funcional básico. Pero la fuerza muscular, el equilibrio y la confianza para el movimiento autónomo siguen siendo insuficientes en la mayoría de los casos. Sin una fase de readaptación funcional bien estructurada, la persona vuelve al mismo nivel de debilidad que tenía antes — o a uno peor — en pocas semanas.

Es el momento en que entra el entrenador. Y es el momento que más se descuida.

## Una aclaración sobre regulación y titulaciones

En España, la denominación "fisioterapeuta" está regulada y protegida: solo puede usarla quien tiene el Grado en Fisioterapia o la antigua diplomatura equivalente. La denominación "entrenador personal" no está igualmente regulada en todos sus aspectos, lo que significa que hay una variación enorme de calificaciones bajo ese mismo nombre.

Cuando busques un entrenador para trabajar con personas mayores en un contexto de recuperación o riesgo clínico, verifica que tenga el Grado en Ciencias de la Actividad Física y el Deporte (CCAFYD) y formación específica en ejercicio adaptado, readaptación funcional o similares. No toda la formación de entrenador personal incluye los conocimientos necesarios para trabajar con este perfil de forma segura.

En ANTEA Salud, Fernando Royano es Graduado en CCAFYD con 14 años de experiencia trabajando exclusivamente con personas mayores. La primera valoración es gratuita si quieres evaluar si el perfil de tu familiar encaja con este tipo de intervención.`,
  },
  {
    slug: 'ejercicio-deterioro-cognitivo-mayores-evidencia',
    title: 'Ejercicio y deterioro cognitivo: qué dice la evidencia sobre el movimiento y el cerebro mayor',
    excerpt:
      'La evidencia científica sobre el ejercicio físico y el deterioro cognitivo en personas mayores es sólida y sorprendente. Qué funciona, qué no, y qué esperar de un programa bien pautado.',
    tags: ['deterioro cognitivo', 'Alzheimer', 'ejercicio mayores', 'cerebro', 'evidencia científica'],
    body: `Cuando una familia tiene un familiar mayor con deterioro cognitivo leve o diagnóstico de Alzheimer, el ejercicio físico raramente es lo primero en lo que piensan. La atención va a la medicación, a la estimulación cognitiva, a la organización del cuidado diario.

Sin embargo, la evidencia científica acumulada en los últimos 15 años sitúa al ejercicio físico como una de las intervenciones no farmacológicas más sólidas disponibles para ralentizar la progresión del deterioro cognitivo y mejorar la calidad de vida de estas personas.

No es una promesa de cura. Es algo más concreto y más verificable.

## Qué dice la evidencia

La relación entre ejercicio físico y función cognitiva está entre las más estudiadas de la neurociencia del envejecimiento. El consenso actual apunta a varios mecanismos biológicos por los que el ejercicio beneficia al cerebro que envejece.

El ejercicio aeróbico regular promueve la neurogénesis en el hipocampo — la región cerebral más afectada en las fases iniciales del Alzheimer — y aumenta los niveles de BDNF (factor neurotrófico derivado del cerebro), una proteína clave en la plasticidad y supervivencia neuronal [1]. En términos simples: el ejercicio estimula la creación de nuevas conexiones neuronales y protege las existentes.

Una revisión sistemática de 2020 publicada en el British Journal of Sports Medicine, que analizó 39 ensayos controlados con más de 5.000 participantes, concluyó que el ejercicio físico mejora de forma significativa la función cognitiva global en adultos mayores, con efectos especialmente marcados en memoria, atención y velocidad de procesamiento [2].

En personas ya diagnosticadas con deterioro cognitivo leve, los programas de ejercicio de 6 meses o más se asocian con una ralentización medible de la progresión y una mejora de la función ejecutiva [3].

## Qué tipo de ejercicio tiene más evidencia

No todo el ejercicio tiene el mismo efecto sobre la función cognitiva.

El ejercicio aeróbico de intensidad moderada — caminar a paso vivo, bicicleta estática, ejercicios de movilidad con componente cardiovascular — tiene la base de evidencia más sólida para los efectos cognitivos directos [1, 2].

El entrenamiento de fuerza tiene efectos cognitivos también documentados, especialmente sobre la función ejecutiva y la velocidad de procesamiento, posiblemente mediados por la mejora del flujo sanguíneo cerebral y la regulación de factores de crecimiento [4].

Los programas multicomponente — que combinan fuerza, equilibrio, coordinación y componente aeróbico — muestran efectos más amplios que los programas de un solo tipo, tanto sobre la función cognitiva como sobre la capacidad funcional física [3].

El tai chi y el yoga adaptado también aparecen en la literatura con efectos positivos sobre cognición y equilibrio, aunque la base de evidencia es más pequeña que para el ejercicio aeróbico y de fuerza.

## Qué no puede hacer el ejercicio

La honestidad importa aquí.

El ejercicio no detiene la progresión del Alzheimer ni de otras demencias. No revierte el daño neurológico ya producido. No sustituye a la medicación prescrita ni a la estimulación cognitiva específica.

Lo que hace es crear condiciones biológicas más favorables para el funcionamiento del cerebro que envejece — más flujo sanguíneo, más factores neurotróficos, mejor sueño, menos inflamación sistémica — y mantener la capacidad física que permite que la persona siga participando en su vida cotidiana con el mayor grado de autonomía posible.

En un contexto de deterioro cognitivo, ese mantenimiento funcional tiene un impacto enorme en la calidad de vida de la persona y en la carga del cuidado para la familia.

## Consideraciones prácticas para personas con deterioro cognitivo

Trabajar con una persona con deterioro cognitivo requiere adaptaciones específicas que van más allá del conocimiento del ejercicio.

Las instrucciones deben ser simples, claras y repetidas con paciencia. Las sesiones deben tener una estructura predecible — mismo orden, mismo entorno, mismo profesional — porque la rutina es más fácil de retener y reduce la ansiedad. El trabajo debe ser en entornos conocidos: el domicilio es especialmente adecuado por esta razón.

La supervisión individual es imprescindible, no solo por razones de seguridad física, sino porque la persona puede no ser capaz de comunicar molestia, dolor o fatiga de forma clara.

El familiar o cuidador puede necesitar estar presente, especialmente al principio, tanto para facilitar la comunicación como para aprender los ejercicios que se pueden reforzar entre sesiones.

## Lo que las familias suelen descubrir

En mi experiencia trabajando con personas mayores con deterioro cognitivo en Madrid, lo que las familias observan con más frecuencia después de un programa de ejercicio bien establecido no es un resultado en ningún test cognitivo — eso es difícil de notar en el día a día. Es otra cosa:

La persona duerme mejor. Está menos irritable. Participa más en las conversaciones los días que ha hecho ejercicio. Se mueve con más confianza. Tiene menos episodios de agitación vespertina. Y mantiene más tiempo la capacidad de hacer cosas básicas por sí misma.

Son beneficios que no aparecen en los titulares de los estudios, pero que para las familias que cuidan a estas personas son los que más importan.

Si tu familiar tiene deterioro cognitivo y quieres explorar si un programa de ejercicio adaptado es viable en su situación concreta, la primera valoración en ANTEA Salud es gratuita. Evaluamos tanto la capacidad física como las consideraciones específicas del deterioro para saber qué tipo de programa tiene sentido.

## Referencias

1. Erickson KI, Voss MW, Prakash RS, et al. Exercise training increases size of hippocampus and improves memory. Proc Natl Acad Sci USA. 2011;108(7):3017-3022.
2. Northey JM, Cherbuin N, Pumpa KL, et al. Exercise interventions for cognitive function in adults older than 50: a systematic review with meta-analysis. Br J Sports Med. 2018;52(3):154-160.
3. Groot C, Hooghiemstra AM, Raijmakers PG, et al. The effect of physical activity on cognitive function in patients with dementia: a meta-analysis of randomized control trials. Ageing Res Rev. 2016;25:13-23.
4. Liu-Ambrose T, Nagamatsu LS, Voss MW, et al. Resistance training and functional plasticity of the aging brain: a twelve-month randomized controlled trial. Neurobiol Aging. 2012;33(8):1690-1698.`,
  },
];

// --- Lógica de carga ---------------------------------------------------------

function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

async function main() {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error('Falta GOOGLE_SHEET_ID');

  // Slugs existentes (para no duplicar)
  const current = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${ARTICULOS_SHEET}!A2:K`,
  });
  const existingSlugs = new Set(
    (current.data.values || []).filter((r) => r[0]).map((r) => String(r[1]).trim())
  );

  const rows = [];
  let day = 29; // 2026-05-29 hacia atrás → orden cronológico estable (el primero, más reciente)
  for (const a of articles) {
    if (existingSlugs.has(a.slug)) {
      console.log(`SKIP (ya existe): ${a.slug}`);
      day -= 1;
      continue;
    }
    const id = `art_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const publishedAt = new Date(Date.UTC(2026, 4, day, 9, 0, 0)).toISOString();
    const now = new Date().toISOString();
    rows.push([
      id,
      a.slug,
      a.title,
      a.excerpt,
      a.body,
      '', // ogImage
      a.tags.join(', '),
      'published',
      publishedAt,
      now,
      now,
    ]);
    console.log(`ADD: ${a.slug}`);
    day -= 1;
  }

  if (rows.length === 0) {
    console.log('Nada que añadir.');
    return;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${ARTICULOS_SHEET}!A:K`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: rows },
  });

  console.log(`\nListo: ${rows.length} artículos publicados.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
