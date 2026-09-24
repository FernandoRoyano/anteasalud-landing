// Artículos pilar de ANTEA Salud (fuerza, sarcopenia, osteoporosis, artrosis, OMS, levantarse del suelo).
// Se insertan como BORRADOR para que Fernando los revise en /admin/articulos antes de publicar.
// Idempotente: nunca sobrescribe un slug existente.
// Portadas provisionales: reutilizan imágenes existentes; sustituir por imágenes propias antes de publicar.

import pkg from '@next/env';
const { loadEnvConfig } = pkg;
loadEnvConfig(process.cwd());

import { google } from 'googleapis';

const SHEET = 'Articulos';

const REF = {
  ewgsop2: 'Cruz-Jentoft AJ, et al. Sarcopenia: revised European consensus on definition and diagnosis. Age Ageing. 2019;48(1):16-31. [doi:10.1093/ageing/afy169](https://doi.org/10.1093/ageing/afy169)',
  nsca: 'Fragala MS, et al. Resistance Training for Older Adults: Position Statement From the National Strength and Conditioning Association. J Strength Cond Res. 2019;33(8):2019-2052. [doi:10.1519/JSC.0000000000003230](https://doi.org/10.1519/JSC.0000000000003230)',
  who: 'Bull FC, et al. World Health Organization 2020 guidelines on physical activity and sedentary behaviour. Br J Sports Med. 2020;54(24):1451-1462. [doi:10.1136/bjsports-2020-102955](https://doi.org/10.1136/bjsports-2020-102955)',
  cochraneFalls: 'Sherrington C, et al. Exercise for preventing falls in older people living in the community. Cochrane Database Syst Rev. 2019;1:CD012424. [doi:10.1002/14651858.CD012424.pub2](https://doi.org/10.1002/14651858.CD012424.pub2)',
  essa: 'Beck BR, et al. Exercise and Sports Science Australia (ESSA) position statement on exercise prescription for the prevention and management of osteoporosis. J Sci Med Sport. 2017;20(5):438-445. [doi:10.1016/j.jsams.2016.10.001](https://doi.org/10.1016/j.jsams.2016.10.001)',
  liftmor: 'Watson SL, et al. High-Intensity Resistance and Impact Training Improves Bone Mineral Density and Physical Function in Postmenopausal Women With Osteopenia and Osteoporosis: The LIFTMOR Randomized Controlled Trial. J Bone Miner Res. 2018;33(2):211-220. [doi:10.1002/jbmr.3284](https://doi.org/10.1002/jbmr.3284)',
  kneeOA: 'Fransen M, et al. Exercise for osteoarthritis of the knee. Cochrane Database Syst Rev. 2015;1:CD004376. [doi:10.1002/14651858.CD004376.pub3](https://doi.org/10.1002/14651858.CD004376.pub3)',
  hipOA: 'Fransen M, et al. Exercise for osteoarthritis of the hip. Cochrane Database Syst Rev. 2014;(4):CD007912. [doi:10.1002/14651858.CD007912.pub2](https://doi.org/10.1002/14651858.CD007912.pub2)',
  oarsi: 'Bannuru RR, et al. OARSI guidelines for the non-surgical management of knee, hip, and polyarticular osteoarthritis. Osteoarthritis Cartilage. 2019;27(11):1578-1589. [doi:10.1016/j.joca.2019.06.011](https://doi.org/10.1016/j.joca.2019.06.011)',
  fleming: 'Fleming J, Brayne C. Inability to get up after falling, subsequent time on floor, and summoning help: prospective cohort study in people over 90. BMJ. 2008;337:a2227. [doi:10.1136/bmj.a2227](https://doi.org/10.1136/bmj.a2227)',
  tinetti: 'Tinetti ME, Liu WL, Claus EB. Predictors and prognosis of inability to get up after falls among elderly persons. JAMA. 1993;269(1):65-70. [PubMed 8416408](https://pubmed.ncbi.nlm.nih.gov/8416408/)',
  icfsr: 'Izquierdo M, et al. International Exercise Recommendations in Older Adults (ICFSR): Expert Consensus Guidelines. J Nutr Health Aging. 2021;25(7):824-853. [doi:10.1007/s12603-021-1665-8](https://doi.org/10.1007/s12603-021-1665-8)',
  vivifrail: 'Casas-Herrero Á, et al. Effects of Vivifrail multicomponent intervention on functional capacity: a multicentre, randomized controlled trial. J Cachexia Sarcopenia Muscle. 2022;13(2):884-893. [doi:10.1002/jcsm.12925](https://doi.org/10.1002/jcsm.12925)',
  protage: 'Bauer J, et al. Evidence-based recommendations for optimal dietary protein intake in older people: a position paper from the PROT-AGE Study Group. J Am Med Dir Assoc. 2013;14(8):542-559. [doi:10.1016/j.jamda.2013.05.021](https://doi.org/10.1016/j.jamda.2013.05.021)',
  umbrella: 'Beckwée D, et al. Exercise Interventions for the Prevention and Treatment of Sarcopenia. A Systematic Umbrella Review. J Nutr Health Aging. 2019;23(6):494-502. [doi:10.1007/s12603-019-1196-8](https://doi.org/10.1007/s12603-019-1196-8)',
};

const refs = (...keys) => keys.map((key, i) => `${i + 1}. ${REF[key]}`).join('\n');

const articles = [
  {
    slug: 'sarcopenia-mayores-que-es-como-frenarla',
    title: 'Sarcopenia: qué es y cómo frenarla con ejercicio',
    excerpt:
      'La pérdida de masa y fuerza muscular con la edad no es inevitable ni irreversible. Te explicamos cómo se reconoce y qué tipo de ejercicio tiene más respaldo para frenarla.',
    image: '/articulos/perdida-fuerza.webp',
    tags: ['sarcopenia', 'fuerza', 'fragilidad', 'autonomía'],
    body: `> **Respuesta corta:** la sarcopenia es la pérdida de fuerza y masa muscular que aumenta el riesgo de caídas y dependencia. El consenso europeo la define empezando por la **fuerza baja**, y el entrenamiento de fuerza progresivo, dos o tres días por semana, es la intervención con más evidencia para frenarla y mejorar la función, también a partir de los 80 años [1][2][3].

Muchas familias lo describen igual: «se ha quedado sin fuerza», «le cuesta levantarse del sofá», «ya no abre los botes». No es solo cuestión de edad. A menudo hay detrás un proceso con nombre propio: la sarcopenia.

## Qué es exactamente la sarcopenia

La sarcopenia es un trastorno del músculo esquelético que progresa con el tiempo y se asocia a caídas, fracturas, pérdida de autonomía y peor calidad de vida.

El consenso europeo revisado en 2019 (EWGSOP2) cambió el enfoque: ya no se empieza midiendo cuánto músculo hay, sino **cuánta fuerza tiene la persona**, porque la fuerza predice mejor lo que va a pasar en su día a día [1].

El proceso de valoración sigue tres pasos:

| Paso | Qué se mira | Ejemplo de prueba |
|---|---|---|
| 1. Sospecha | Fuerza baja | Fuerza de prensión con dinamómetro o levantarse 5 veces de una silla |
| 2. Confirmación | Cantidad o calidad del músculo | Pruebas de composición corporal (en el ámbito sanitario) |
| 3. Gravedad | Rendimiento físico | Velocidad de marcha, [SPPB](/articulos/sppb-que-es-valoracion-personas-mayores) |

El diagnóstico corresponde al equipo sanitario. Lo que sí puede hacer una familia es fijarse en las señales y pedir una valoración.

## Señales que merece la pena observar

- Necesita las manos o varios intentos para levantarse de una silla.
- Camina más despacio o se cansa antes que hace unos meses.
- Evita escaleras o bordillos que antes no le preocupaban.
- Le cuesta abrir botes, cargar la compra o sujetar objetos.
- Ha perdido peso sin buscarlo, sobre todo después de una enfermedad o un ingreso.

Si reconoces varias, te puede interesar también [cómo detectar la pérdida de fuerza en personas mayores](/articulos/perdida-fuerza-personas-mayores-senales).

## Por qué el ejercicio de fuerza es la pieza central

Las revisiones de la evidencia coinciden: el entrenamiento de fuerza, solo o dentro de un programa multicomponente, es la intervención que más consistentemente mejora la fuerza y la función física en personas con sarcopenia [3]. La Asociación Nacional de Fuerza y Acondicionamiento de EE. UU. recomienda entrenar fuerza **dos o tres días por semana**, con progresión individualizada, incluso en personas frágiles o muy mayores [2].

La clave está en tres palabras:

- **Progresivo:** el estímulo debe aumentar poco a poco. Repetir siempre el mismo ejercicio suave mantiene, pero no recupera.
- **Suficiente:** las últimas repeticiones de cada serie deben costar. No hace falta llegar al agotamiento.
- **Constante:** los cambios en fuerza suelen notarse en pocas semanas; los cambios en el músculo tardan más.

## Cómo sería un plan realista

| Fase | Duración orientativa | Ejemplos | Objetivo |
|---|---|---|---|
| Inicio | Semanas 1-4 | Levantarse de una silla alta, elevaciones de talones con apoyo, remo con banda elástica | Aprender la técnica y crear el hábito |
| Construcción | Semanas 5-12 | Silla más baja, más repeticiones, bandas de mayor resistencia, subir un escalón | Aumentar la carga de forma gradual |
| Consolidación | A partir del mes 3 | Levantarse sin manos con lastre ligero, escalón con carga, paseos más largos | Mantener y trasladar la fuerza a la vida diaria |

Además de la fuerza, un buen programa añade **equilibrio** y **marcha**, porque la sarcopenia suele ir de la mano de un mayor riesgo de caída. Es la lógica de programas multicomponente como Vivifrail, que ha mostrado mejoras de la capacidad funcional en personas mayores [4].

## La alimentación también cuenta

El músculo necesita materia prima. Los expertos del grupo PROT-AGE recomiendan en personas mayores sanas una ingesta de proteína superior a la de los adultos jóvenes, repartida a lo largo del día [5]. Cualquier cambio en la dieta, sobre todo si hay enfermedad renal u otras patologías, debe consultarse con el médico o un dietista-nutricionista.

## Cuándo parar y consultar

- Dolor en el pecho, falta de aire desproporcionada o palpitaciones.
- Mareo o sensación de desmayo.
- Dolor articular que aumenta durante el ejercicio o no cede al día siguiente.
- Pérdida de peso rápida o no explicada.

## Errores frecuentes

**Pensar que es «cosa de la edad».** La pérdida de fuerza se acelera con la inactividad, las enfermedades y los ingresos hospitalarios, pero responde al entrenamiento a cualquier edad. Asumir que no hay nada que hacer es el error que más autonomía cuesta.

**Entrenar siempre igual.** Una tabla de ejercicios suaves que no cambia en meses mantiene, pero no recupera. El músculo necesita un estímulo que aumente poco a poco: más repeticiones, más resistencia o menos ayuda.

**Esperar a que «esté mejor» para empezar.** Después de una gripe, una caída o un ingreso, es cuando más rápido se pierde músculo. Con la autorización médica, empezar pronto y con poca carga es mejor que esperar semanas en el sillón. Lo explicamos en [recuperar la capacidad después de una hospitalización](/articulos/recuperar-capacidad-despues-hospitalizacion-mayores).

**Centrarse solo en las piernas.** Las piernas son prioritarias, pero la fuerza de brazos y tronco también se usa para levantarse, cargar la compra o sujetarse ante un tropiezo.

**Descuidar el descanso y la comida.** Sin suficiente proteína, sueño y días de recuperación, el entrenamiento rinde menos.

## Cómo puede ayudar la familia

- **Medir el punto de partida.** Cronometrar cuánto tarda en levantarse cinco veces de una silla, con supervisión, da una referencia para comparar dentro de dos meses. Tienes más pruebas en [3 pruebas sencillas para observar la capacidad funcional en casa](/articulos/tests-funcionales-mayores-en-casa).
- **Fijar días y hora.** La constancia depende más de la rutina que de la motivación. Dos o tres citas fijas a la semana funcionan mejor que «cuando se pueda».
- **Celebrar lo funcional.** Más que los números, motiva notar que vuelve a subir al autobús o a levantarse del sofá sin ayuda.
- **Revisar la alimentación con el médico** si hay pérdida de peso o poco apetito.
- **No hacerlo todo por él o por ella.** Ayudar en exceso con las tareas cotidianas, aunque sea con cariño, le quita oportunidades de moverse.

## Preguntas frecuentes

### ¿A los 85 años todavía se puede ganar fuerza?

Sí. La capacidad de responder al entrenamiento de fuerza se conserva en edades muy avanzadas. La progresión es más lenta y hay que adaptarla, pero la mejora es real y se nota en tareas como levantarse o caminar.

### ¿Caminar es suficiente para frenar la sarcopenia?

Caminar es muy recomendable, pero por sí solo no suele aportar el estímulo que el músculo necesita para ganar fuerza. Lo ideal es combinarlo con ejercicios de fuerza específicos.

### ¿Hacen falta pesas o máquinas?

No. Una silla estable, bandas elásticas y el propio peso corporal permiten un trabajo muy eficaz en casa. Lo importante es la progresión, no el material.

### ¿Cuánto tiempo tarda en notarse?

Muchas personas notan más facilidad para levantarse o caminar en 4-8 semanas si entrenan dos o tres veces por semana.

## Cómo te podemos ayudar

En ANTEA Salud empezamos con una [valoración funcional gratuita en casa](/valoracion-gratuita) para medir la fuerza de partida y diseñar un plan progresivo. Si quieres saber más, consulta nuestro servicio de [ejercicio para personas mayores a domicilio](/ejercicio-personas-mayores-madrid).

## Referencias

${refs('ewgsop2', 'nsca', 'umbrella', 'vivifrail', 'protage')}`,
  },
  {
    slug: 'ejercicios-en-silla-personas-mayores',
    title: 'Ejercicios en silla para personas mayores, con progresión',
    excerpt:
      'Una rutina segura para quien tiene poca movilidad o miedo a caerse: ejercicios sentados y con apoyo, cómo progresar y qué señales indican que hay que parar.',
    image: '/articulos/levantarse-silla.webp',
    tags: ['fuerza', 'movilidad', 'ejercicio mayores', 'autonomía'],
    body: `> **Respuesta corta:** los ejercicios en silla son un punto de partida seguro para personas mayores con poca movilidad, dolor o miedo a caerse. Permiten trabajar fuerza, movilidad y resistencia, y el objetivo es ir progresando hacia ejercicios de pie con apoyo, porque es ahí donde se entrena el equilibrio que protege de las caídas [1][2].

Cuando una persona lleva tiempo moviéndose poco, pedirle que haga ejercicio de pie puede dar miedo, a ella y a la familia. La silla resuelve ese primer obstáculo: da seguridad, permite concentrarse en el movimiento y sirve de apoyo para dar el siguiente paso.

## Antes de empezar

- **Silla estable**, sin ruedas ni reposabrazos que estorben, apoyada contra la pared si hace falta.
- **Pies apoyados** en el suelo y la espalda separada del respaldo.
- **Ropa cómoda** y calzado cerrado, nunca zapatillas de casa sueltas.
- **Agua cerca** y buena luz.
- Si ha habido una operación, un ingreso o una caída reciente, **consulta antes con su médico**.

## La rutina básica (15-20 minutos)

Hazla dos o tres días por semana, en días no consecutivos al principio. Respira con normalidad durante todos los ejercicios.

| Ejercicio | Cómo se hace | Series y repeticiones al empezar |
|---|---|---|
| Marcha sentada | Levantar rodillas alternas como si caminara, braceando | 2 × 30 segundos |
| Extensión de rodilla | Estirar una pierna hasta dejarla recta, mantener 2 segundos y bajar despacio | 2 × 8 por pierna |
| Elevación de talones y puntas | Subir talones, bajar; luego subir puntas, bajar | 2 × 10 |
| Remo con banda | Banda alrededor de los pies, tirar de los codos hacia atrás juntando escápulas | 2 × 8 |
| Press de pecho con banda | Banda por la espalda, empujar las manos hacia delante | 2 × 8 |
| Giros de tronco | Brazos cruzados, girar suavemente a cada lado | 2 × 6 por lado |
| Sentarse y levantarse | Con las manos en los reposabrazos o las rodillas, levantarse y sentarse con control | 2 × 5 |

El último ejercicio es el más importante. [Levantarse de una silla](/articulos/levantarse-silla-autonomia-personas-mayores) es uno de los mejores indicadores de autonomía y uno de los ejercicios más útiles que existen.

## Cómo progresar

Cuando una serie resulte cómoda durante dos sesiones seguidas, cambia **solo una** de estas variables:

1. **Más repeticiones:** de 8 a 10, luego a 12.
2. **Más resistencia:** una banda más dura o un lastre ligero en el tobillo.
3. **Menos ayuda:** levantarse con una mano en lugar de dos, y más adelante sin manos.
4. **Más lento:** bajar en 3-4 segundos hace el ejercicio más exigente sin añadir peso.

### Del sentado al de pie

La silla es el comienzo, no el destino. En cuanto sea seguro, añade ejercicios de pie **con la silla delante como apoyo**:

- Elevaciones de talones de pie.
- Apoyo sobre una pierna unos segundos, con las manos en el respaldo.
- Pasos laterales cortos.
- Caminar en tándem (un pie delante del otro) junto a la pared.

Los programas que reducen las caídas son los que trabajan el **equilibrio de pie** de forma progresiva. La revisión Cochrane de 2019 encontró que este tipo de ejercicio reduce en un 23% la tasa de caídas en personas mayores que viven en su casa [3].

## Señales para parar

- Dolor en el pecho, palpitaciones o falta de aire que no se recupera al descansar.
- Mareo, visión borrosa o sensación de inestabilidad sentado.
- Dolor articular agudo o que empeora con cada repetición.

Si aparece cualquiera de ellas, detén la sesión y consulta con su médico.

## Errores frecuentes

**Quedarse para siempre en la silla.** Los ejercicios sentados son una puerta de entrada. Si al cabo de unas semanas no se añade trabajo de pie con apoyo, el equilibrio, que es lo que más protege de las caídas, apenas mejora.

**Hacerlo deprisa.** El movimiento lento y controlado es más seguro y trabaja más el músculo. Contar «uno, dos» al subir y «uno, dos, tres» al bajar ayuda a mantener el ritmo.

**Aguantar la respiración.** Es frecuente en los ejercicios que cuestan. Soltar el aire en el esfuerzo evita subidas bruscas de tensión y mareos.

**Usar una silla inadecuada.** Sillas con ruedas, taburetes, sofás bajos y blandos o sillas que resbalan convierten un ejercicio seguro en un riesgo.

**Compararse con otros o con el pasado.** Cada persona parte de un punto distinto. Lo que importa es que hoy haga un poco más que hace un mes.

## Cómo puede ayudar la familia

- **Preparar el espacio:** silla estable junto a una pared, suelo despejado y sin alfombras sueltas, buena luz.
- **Hacer la rutina juntos.** Muchas personas mayores se animan más si alguien hace los ejercicios a su lado, aunque sea por videollamada.
- **Llevar un registro sencillo:** una hoja en la nevera con los días y las repeticiones. Ver el progreso anima a seguir.
- **Estar pendiente de las señales de alerta** y del estado del día: si ha dormido mal o está más cansado, mejor una sesión más suave que ninguna.
- **Pedir una valoración** si no hay progreso en 4-6 semanas o aparece dolor. A veces basta con ajustar un ejercicio.

### Una semana tipo

| Día | Actividad |
|---|---|
| Lunes | Rutina en silla completa |
| Martes | Paseo corto o marcha sentada 5-10 minutos |
| Miércoles | Rutina en silla + 2 ejercicios de pie con apoyo |
| Jueves | Paseo corto |
| Viernes | Rutina en silla completa |
| Fin de semana | Actividad libre: paseo, jardín, tareas de casa |

## Preguntas frecuentes

### ¿Sirven los ejercicios sentados si mi padre casi no camina?

Sí. Son precisamente para eso: empezar desde donde está la persona. Con constancia, la fuerza de piernas mejora y muchas personas pueden pasar a trabajar de pie con apoyo.

### ¿Cuántos días a la semana hay que hacerlos?

Dos o tres días de fuerza a la semana es lo que recomiendan las guías [1][2]. En los días intermedios, un paseo corto o la marcha sentada ayudan a no perder el hábito.

### ¿Qué banda elástica compro?

Empieza con una de resistencia suave o media. Es mejor poder hacer las repeticiones con buena técnica que forzar con una banda demasiado dura.

### ¿Y si le duele la rodilla?

Reduce el recorrido, hazlo más despacio y evita el dolor. Si persiste, consulta. En este artículo sobre [ejercicio con artrosis](/articulos/ejercicio-artrosis-rodilla-cadera-mayores) te explicamos cómo adaptarlo.

## Cómo te podemos ayudar

Si quieres que alguien adapte la rutina a tu familiar y la haga progresar con seguridad, podemos ir a su casa. La [primera valoración es gratuita](/valoracion-gratuita) y sin compromiso.

## Referencias

${refs('who', 'icfsr', 'cochraneFalls', 'nsca')}`,
  },
  {
    slug: 'osteoporosis-ejercicio-seguro-mayores',
    title: 'Osteoporosis y ejercicio: qué es seguro y qué evitar',
    excerpt:
      'Con osteoporosis no hay que dejar de moverse, sino moverse bien. Qué ejercicios ayudan al hueso y al equilibrio, cuáles evitar y cómo empezar con seguridad.',
    image: '/articulos/ejercicio-en-casa.webp',
    tags: ['osteoporosis', 'fuerza', 'prevención caídas', 'equilibrio'],
    body: `> **Respuesta corta:** con osteoporosis, el ejercicio adecuado es parte del tratamiento. Las guías recomiendan **fuerza progresiva, ejercicios de impacto adaptados y equilibrio**, y evitar sobre todo la flexión de columna con carga y los giros bruscos. Estar quieto aumenta el riesgo de caídas y fracturas [1][2].

Tras un diagnóstico de osteoporosis es frecuente el miedo: «¿y si se rompe algo haciendo ejercicio?». Es una preocupación lógica, pero la evidencia apunta en la dirección contraria. El reposo debilita el músculo y el equilibrio, y eso aumenta la probabilidad de caer, que es la causa de la mayoría de las fracturas.

## Qué dice la evidencia

La declaración de posición de Exercise and Sports Science Australia (ESSA) es una de las guías más citadas sobre ejercicio y osteoporosis. Resume que el hueso responde a **cargas de cierta intensidad y a impactos**, que el ejercicio de fuerza y equilibrio reduce el riesgo de caídas, y que el programa debe adaptarse al riesgo de fractura de cada persona [1].

El ensayo LIFTMOR estudió a 101 mujeres posmenopáusicas con masa ósea baja. El grupo que hizo entrenamiento de fuerza e impacto supervisado, dos veces por semana durante ocho meses, mejoró la densidad mineral ósea de columna lumbar y cuello femoral y todas las medidas de función física, con un solo efecto adverso leve [2]. Eran mujeres de 65 años de media y el entrenamiento estaba **supervisado**: no es un programa para copiar en casa sin guía, pero sí muestra que el hueso responde cuando el estímulo es suficiente.

## Qué ejercicios ayudan

| Tipo | Ejemplos | Por qué |
|---|---|---|
| Fuerza progresiva | Levantarse de la silla, escalón, remo con banda, peso muerto con técnica supervisada | El músculo tira del hueso y lo estimula; además protege las articulaciones |
| Impacto adaptado | Taloneos, marcha enérgica, pequeños saltos solo si el profesional lo indica | El hueso responde a los impactos breves |
| Equilibrio | Apoyo sobre una pierna con apoyo, tándem, giros controlados | Menos caídas significa menos fracturas [3] |
| Postura y extensores de espalda | Extensiones de espalda suaves, retracción de escápulas | Ayudan a mantener la postura y a proteger la columna |

## Qué conviene evitar o adaptar

- **Flexión de columna con carga:** abdominales clásicos, tocarse las puntas de los pies con las piernas estiradas, levantar peso del suelo con la espalda redondeada.
- **Giros bruscos del tronco**, sobre todo combinados con flexión.
- **Actividades con alto riesgo de caída** si el equilibrio no está entrenado.
- **Impactos fuertes** si ya ha habido fracturas vertebrales, salvo indicación expresa del equipo sanitario.

## Un comienzo seguro en casa

1. **Semana 1-2:** levantarse de una silla alta con apoyo, elevaciones de talones de pie con apoyo, remo con banda. Dos series de 8-10.
2. **Semana 3-6:** bajar la altura de la silla, añadir apoyo sobre una pierna con las manos en el respaldo y marcha enérgica.
3. **A partir de la semana 6:** progresar la carga con supervisión profesional y valorar si se introducen impactos.

## Señales para consultar

- Dolor de espalda repentino e intenso, especialmente tras un esfuerzo o una caída leve: puede ser una fractura vertebral.
- Pérdida de altura apreciable o aumento de la curvatura dorsal.
- Cualquier caída reciente.

## Errores frecuentes

**Dejar de moverse por miedo.** Es el más común y el más perjudicial. Menos actividad significa menos músculo, peor equilibrio y más riesgo de caída.

**Confiar solo en caminar o nadar.** Son actividades saludables, pero la natación apenas carga el hueso y caminar a ritmo suave aporta un estímulo limitado. Hacen falta fuerza y, cuando sea apropiado, impacto.

**Copiar programas intensos sin supervisión.** Estudios como LIFTMOR muestran buenos resultados con cargas altas, pero con técnica cuidada, progresión y profesionales al lado. Sin eso, el riesgo aumenta.

**Hacer abdominales clásicos.** Los encogimientos y los ejercicios de tocarse los pies someten a la columna a flexión con carga, justo lo que conviene evitar.

**Olvidar la casa.** Buena parte de las fracturas ocurren por caídas en el propio domicilio. Revisar alfombras, cables, luz nocturna y barras de apoyo en el baño es parte de la prevención.

## Cómo puede ayudar la familia

- **Conocer el riesgo de fractura.** Pregunta al médico si hay fracturas vertebrales previas o un riesgo alto: cambia qué ejercicios son adecuados.
- **Revisar el domicilio** con una lista sencilla: pasillos despejados, luz en el camino al baño por la noche, alfombras fijas o retiradas.
- **Acompañar los primeros días** de ejercicio de pie, hasta que la técnica sea segura.
- **Vigilar la postura en las tareas diarias:** agacharse doblando las rodillas y con la espalda recta para recoger objetos del suelo.
- **Favorecer la luz del sol y una dieta con calcio y proteína**, siguiendo las indicaciones médicas sobre suplementos.

### Cómo recoger algo del suelo protegiendo la espalda

1. Acércate al objeto y separa los pies a la anchura de las caderas.
2. Dobla rodillas y caderas, manteniendo la espalda recta. Apóyate en un mueble si hace falta.
3. Coge el objeto pegado al cuerpo.
4. Sube empujando con las piernas, sin girar el tronco.

## Preguntas frecuentes

### ¿Puedo hacer pesas si tengo osteoporosis?

En muchos casos sí, con técnica correcta, progresión y supervisión. El tipo de ejercicio y la carga dependen del riesgo de fractura, que debe valorar el equipo sanitario.

### ¿Caminar fortalece los huesos?

Caminar es beneficioso para la salud general, pero el estímulo sobre el hueso es modesto. Para el hueso funciona mejor combinarlo con fuerza y, cuando sea apropiado, con impactos.

### ¿El pilates o el yoga son seguros?

Pueden serlo si se adaptan: hay que evitar las posturas de flexión de columna forzada y los giros extremos. Díselo siempre al instructor.

### ¿Sustituye el ejercicio a la medicación?

No. El ejercicio complementa el tratamiento que haya pautado el médico; no lo sustituye.

## Cómo te podemos ayudar

Trabajamos fuerza y equilibrio en casa, siguiendo las indicaciones de su médico. Consulta nuestro programa de [prevención de caídas](/prevencion-caidas-mayores-madrid) o solicita una [valoración gratuita](/valoracion-gratuita).

## Referencias

${refs('essa', 'liftmor', 'cochraneFalls', 'nsca')}`,
  },
  {
    slug: 'ejercicio-artrosis-rodilla-cadera-mayores',
    title: 'Ejercicio con artrosis de rodilla o cadera',
    excerpt:
      'El ejercicio es el tratamiento de primera línea en la artrosis. Qué ejercicios recomiendan las guías, cómo manejar el dolor durante el entrenamiento y cuándo consultar.',
    image: '/articulos/recuperacion-cadera.webp',
    tags: ['fuerza', 'movilidad', 'ejercicio mayores', 'readaptación'],
    body: `> **Respuesta corta:** las guías internacionales sitúan el ejercicio como **tratamiento de primera línea** en la artrosis de rodilla y de cadera. Las revisiones Cochrane muestran, con evidencia de calidad alta en rodilla, que el ejercicio reduce el dolor y mejora la función. Un dolor leve durante el ejercicio es aceptable si se calma en 24 horas [1][2][3].

«Le duele la rodilla, mejor que no se mueva». Es uno de los consejos más repetidos y uno de los que más daño hacen. En la artrosis, el reposo prolongado debilita los músculos que protegen la articulación, y eso suele traducirse en más dolor y menos autonomía.

## Qué dicen las guías

La guía de la Osteoarthritis Research Society International (OARSI) recomienda el ejercicio estructurado para todas las personas con artrosis de rodilla, cadera o múltiples articulaciones, como núcleo del tratamiento no quirúrgico [1].

Las revisiones Cochrane sobre ejercicio en artrosis de rodilla (54 estudios) y de cadera concluyen que el ejercicio terapéutico reduce el dolor y mejora la función física, con efectos que se mantienen varios meses después de terminar el programa [2][3].

## Qué tipo de ejercicio

| Objetivo | Ejemplos | Notas |
|---|---|---|
| Fuerza de cuádriceps y glúteos | Extensión de rodilla sentado, levantarse de la silla, puente de glúteos, pasos laterales con banda | La base del programa: protege la articulación |
| Movilidad | Flexo-extensión suave de rodilla, balanceos de cadera con apoyo | Sin forzar el rango doloroso |
| Resistencia aeróbica | Caminar, bicicleta estática, ejercicio en el agua | Mejor varios tramos cortos que uno largo |
| Equilibrio | Apoyo sobre una pierna con apoyo, tándem | La artrosis se asocia a más riesgo de caída |

## Cómo manejar el dolor: el semáforo

Una regla práctica muy usada en rehabilitación:

- **Verde (0-2 sobre 10):** dolor mínimo. Adelante.
- **Ámbar (3-5 sobre 10):** aceptable si **al día siguiente** no ha aumentado. Mantén la carga.
- **Rojo (más de 5 o dolor que empeora al día siguiente):** reduce repeticiones, recorrido o resistencia en la próxima sesión.

La idea es que el dolor guíe la dosis, no que decida si se hace ejercicio o no.

## Un plan de inicio de 6 semanas

1. **Semanas 1-2:** extensión de rodilla sentado (2 × 10), levantarse de una silla alta (2 × 6), puente de glúteos (2 × 8), 10 minutos de paseo.
2. **Semanas 3-4:** silla más baja, añadir pasos laterales con banda y apoyo sobre una pierna con apoyo. Paseo de 15 minutos o bicicleta estática.
3. **Semanas 5-6:** tres series, bajar más despacio, subir y bajar un escalón con apoyo en la barandilla.

## Señales para consultar

- Rodilla o cadera **caliente, roja o muy hinchada**.
- Bloqueos o sensación de que la articulación «se va».
- Dolor nocturno que no cede con el reposo.
- Empeoramiento rápido de la capacidad para caminar.

## Errores frecuentes

**Esperar a que no duela para empezar.** En la artrosis, el dolor puede fluctuar durante años. Si se espera a que desaparezca, nunca se empieza. El semáforo del dolor permite moverse con seguridad.

**Hacer solo estiramientos.** La movilidad es importante, pero sin fuerza el efecto sobre el dolor es menor. La base es fortalecer cuádriceps y glúteos.

**Abandonar tras una mala semana.** Los brotes de dolor son parte de la artrosis. Cuando aparecen, se reduce la carga unos días, pero no se abandona el programa.

**Ignorar el peso corporal.** En personas con sobrepeso, perder algo de peso reduce la carga sobre rodillas y caderas. Ejercicio y alimentación funcionan mejor juntos.

**Usar calzado inadecuado.** Zapatillas estables y con buena amortiguación ayudan a caminar con menos molestias.

## Cómo puede ayudar la familia

- **Ayudar a registrar el dolor** antes y 24 horas después del ejercicio, con la escala del 0 al 10. Es la mejor guía para ajustar la dosis.
- **Planificar paseos cortos y frecuentes**, con bancos en el recorrido, en lugar de un único paseo largo que acabe en dolor.
- **Facilitar alternativas en días malos:** bicicleta estática o ejercicios sentados en lugar de caminar.
- **Adaptar la casa:** una silla más alta, elevadores de inodoro o barandillas pueden reducir el dolor en las tareas diarias mientras se gana fuerza.
- **Animar sin presionar.** Reconocer el esfuerzo y los pequeños avances mantiene la motivación.

### Rodilla o cadera: pequeñas diferencias

| | Rodilla | Cadera |
|---|---|---|
| Músculos prioritarios | Cuádriceps y glúteos | Glúteo medio y mayor, cuádriceps |
| Ejercicio clave | Levantarse de la silla, extensión de rodilla | Pasos laterales con banda, puente de glúteos |
| Cuidado con | Sentadillas profundas con dolor | Rotaciones forzadas y posturas extremas |

## Preguntas frecuentes

### ¿El ejercicio desgasta más la articulación?

El ejercicio bien dosificado no acelera la artrosis. Al contrario: fortalecer la musculatura reparte mejor las cargas y reduce el dolor.

### ¿Es mejor el ejercicio en piscina?

Es una buena opción, sobre todo con dolor alto o sobrepeso, porque el agua descarga las articulaciones. Pero conviene complementarlo con fuerza fuera del agua.

### ¿Y si ya está en lista de espera para una prótesis?

Entrenar antes de la operación puede ayudar a llegar con más fuerza y facilitar la recuperación. Consulta con el traumatólogo. Aquí te contamos [qué aporta el ejercicio tras una operación de cadera](/articulos/recuperacion-operacion-cadera-ejercicio-mayores).

### ¿Fisioterapeuta o entrenador?

Depende del momento. Te lo explicamos en [fisioterapeuta o profesional del ejercicio: qué necesita tu familiar](/articulos/fisioterapeuta-o-entrenador-personal-mayores-diferencia).

## Cómo te podemos ayudar

Adaptamos el ejercicio al dolor de cada día y lo hacemos progresar en casa. Consulta nuestro servicio para [recuperar autonomía](/recuperar-autonomia-mayores-madrid) o pide una [valoración gratuita](/valoracion-gratuita).

## Referencias

${refs('oarsi', 'kneeOA', 'hipOA', 'nsca')}`,
  },
  {
    slug: 'cuanto-ejercicio-necesita-persona-mayor-oms',
    title: 'Cuánto ejercicio necesita una persona mayor según la OMS',
    excerpt:
      'Las recomendaciones de la OMS explicadas para familias: minutos a la semana, días de fuerza y de equilibrio, y cómo adaptarlas si tu familiar parte de muy poca actividad.',
    image: '/articulos/tests-funcionales.webp',
    tags: ['ejercicio mayores', 'fuerza', 'equilibrio', 'autonomía'],
    body: `> **Respuesta corta:** la OMS recomienda a las personas de 65 años o más **150-300 minutos semanales de actividad aeróbica moderada**, **fuerza al menos 2 días por semana** y **actividad multicomponente con equilibrio al menos 3 días por semana**, además de reducir el tiempo sentado. Si no se llega a esas cifras, cualquier cantidad de actividad es mejor que ninguna [1].

Las cifras de la OMS pueden asustar cuando tu familiar apenas sale de casa. No son un examen: son una dirección. Lo importante es saber qué significan y cómo acercarse a ellas poco a poco.

## Las recomendaciones, traducidas

| Componente | Recomendación OMS (65+) | Qué significa en casa |
|---|---|---|
| Aeróbico | 150-300 min/semana moderado, o 75-150 min vigoroso | Unos 20-40 minutos al día de caminar a paso vivo, en tramos |
| Fuerza | 2 o más días/semana, grupos musculares principales | Levantarse de la silla, escalón, bandas elásticas |
| Equilibrio y multicomponente | 3 o más días/semana | Apoyo sobre una pierna, tándem, giros, combinados con fuerza |
| Sedentarismo | Reducir el tiempo sentado | Levantarse cada 30-60 minutos |

Las guías de la OMS de 2020 insisten en que **hacer algo es mejor que nada** y en empezar con pequeñas cantidades para aumentar de forma gradual [1]. El consenso internacional de expertos ICFSR va en la misma línea y subraya la importancia del entrenamiento de fuerza y equilibrio para prevenir la fragilidad y las caídas [2].

## Por qué importa el equilibrio

El componente de equilibrio no es un detalle. La revisión Cochrane de 2019, con más de 100 ensayos, encontró que los programas de ejercicio centrados en equilibrio y ejercicios funcionales reducen la tasa de caídas en personas mayores que viven en la comunidad [3].

## Cómo empezar si parte de casi nada

Una progresión razonable para las primeras semanas:

| Semana | Aeróbico | Fuerza | Equilibrio |
|---|---|---|---|
| 1-2 | 5-10 min de paseo al día | 1 ejercicio (levantarse de la silla) 2 días | 1 ejercicio con apoyo 3 días |
| 3-4 | 10-15 min al día | 3 ejercicios, 2 días | 2 ejercicios con apoyo, 3 días |
| 5-8 | 15-25 min al día, en 1-2 tramos | 4-5 ejercicios, 2-3 días | 3 ejercicios, reduciendo el apoyo |

Si hay poca movilidad, puedes empezar con nuestra [rutina de ejercicios en silla](/articulos/ejercicios-en-silla-personas-mayores).

## Cómo saber si la intensidad es «moderada»

- Respira más rápido, pero **puede hablar** con frases completas.
- En una escala de esfuerzo de 0 a 10, está en torno a 5-6.
- En personas con poca condición, un paseo tranquilo ya puede ser moderado.

## Cuándo consultar antes de empezar

- Enfermedad cardíaca, respiratoria o diabetes mal controlada.
- Dolor en el pecho, mareos o falta de aire con esfuerzos pequeños.
- Una caída, una operación o un ingreso recientes.

## Errores frecuentes

**Pensar «si no llega a 150 minutos, no sirve».** Las propias guías de la OMS dicen lo contrario: cualquier actividad suma, y los mayores beneficios se observan al pasar de muy poca actividad a algo de actividad.

**Hacer solo actividad aeróbica.** Caminar es excelente, pero sin fuerza y equilibrio se descuidan dos componentes clave para la autonomía y la prevención de caídas.

**Querer recuperar el tiempo perdido en una semana.** Pasar de nada a una hora diaria suele acabar en dolor, cansancio y abandono. La progresión gradual es parte de la recomendación.

**Estar activo por la mañana y sentado el resto del día.** Además de hacer ejercicio, conviene interrumpir los periodos largos sentado. Levantarse y caminar unos minutos cada hora ya ayuda.

**Olvidar adaptar el plan a las enfermedades.** La OMS incluye recomendaciones para personas con enfermedades crónicas: la cifra es la misma, pero el tipo de ejercicio y la progresión se ajustan con el equipo sanitario.

## Cómo puede ayudar la familia

- **Convertir la actividad en rutina:** paseos a la misma hora, ejercicios después del desayuno, una actividad del centro de mayores en días fijos.
- **Acompañar cuando sea posible.** Un paseo compartido suma minutos para los dos.
- **Usar un contador sencillo:** un calendario donde marcar los días de fuerza, equilibrio y paseo da una visión rápida de la semana.
- **Buscar actividades que le gusten:** baile, jardinería, taichí o caminar con amigos cuentan y se mantienen mejor en el tiempo.
- **Revisar el plan cada pocos meses.** Lo que hoy cuesta, en ocho semanas puede quedarse corto. Una [valoración funcional](/articulos/valoracion-funcional-personas-mayores-que-incluye) ayuda a decidir el siguiente paso.

### Ejemplo de semana que cumple las recomendaciones

| Día | Aeróbico | Fuerza | Equilibrio |
|---|---|---|---|
| Lunes | Paseo 25 min | Sí | Sí |
| Martes | Paseo 20 min | | |
| Miércoles | Paseo 25 min | | Sí |
| Jueves | Bicicleta estática 20 min | Sí | |
| Viernes | Paseo 25 min | | Sí |
| Sábado | Paseo 30 min con la familia | | |
| Domingo | Descanso activo | | |

Total aproximado: 165 minutos de actividad aeróbica, 2 días de fuerza y 3 de equilibrio.

## Preguntas frecuentes

### ¿Cuentan las tareas de casa?

Sí, parte de la actividad aeróbica puede venir de tareas como caminar a la compra o subir escaleras. Pero la fuerza y el equilibrio necesitan ejercicios específicos.

### ¿Se pueden hacer los minutos en varios ratos?

Sí. Las guías de 2020 ya no exigen tramos mínimos de 10 minutos: cualquier actividad suma.

### ¿Y si tiene más de 90 años?

Las recomendaciones también le aplican, adaptadas a su capacidad. Lo importante es ajustar la dosis, no renunciar al ejercicio.

### ¿Es mejor ejercicio en grupo o individual?

Ambos funcionan. El individual permite adaptar mejor el nivel cuando hay dolor, miedo a caer o una recuperación reciente. Lo comparamos en [ejercicio en casa o en un centro](/articulos/ejercicio-domicilio-mayores-mejor-que-gimnasio).

## Cómo te podemos ayudar

Diseñamos un plan que acerca a tu familiar a estas recomendaciones de forma realista, en su casa. Empezamos con una [valoración gratuita](/valoracion-gratuita).

## Referencias

${refs('who', 'icfsr', 'cochraneFalls')}`,
  },
  {
    slug: 'como-levantarse-del-suelo-despues-de-una-caida',
    title: 'Cómo levantarse del suelo después de una caída, paso a paso',
    excerpt:
      'Muchas personas mayores no pueden levantarse solas tras caer, y pasar mucho tiempo en el suelo tiene consecuencias graves. La técnica, cómo practicarla y qué hacer si no es posible.',
    image: '/articulos/miedo-despues-caida.webp',
    tags: ['prevención caídas', 'equilibrio', 'fuerza', 'autonomía'],
    body: `> **Respuesta corta:** tras una caída, primero hay que **comprobar si hay dolor intenso o lesión**; si lo hay, no levantarse y pedir ayuda. Si no, girarse de lado, ponerse a gatas, gatear hasta una silla estable, apoyar una rodilla y levantarse con las manos en el asiento. Muchas personas mayores no pueden levantarse solas, y pasar una hora o más en el suelo se asocia a lesiones graves e ingreso hospitalario [1][2].

Hablar de caídas incomoda, pero hay un dato que conviene conocer: en un estudio con personas de más de 90 años, el **80% de las que se cayeron no pudo levantarse sin ayuda** al menos una vez, y el 30% permaneció en el suelo una hora o más. Pasar mucho tiempo en el suelo se asoció a lesiones graves, ingresos y traslado a residencia [1]. En personas de 72 años o más, casi la mitad de quienes se cayeron sin lesión grave no pudo levantarse sola en al menos una ocasión [2].

Saber levantarse, y tener un plan si no se puede, es tan importante como prevenir la caída.

## Paso 0: parar y comprobar

1. **No te levantes deprisa.** Respira y comprueba cómo estás.
2. **Revisa si hay dolor intenso**, sobre todo en cadera, muñeca, cabeza o espalda, o si no puedes mover una pierna.
3. **Si hay dolor fuerte, mareo o golpe en la cabeza: no te levantes.** Pide ayuda y mantente abrigado.

## La técnica, paso a paso

| Paso | Qué hacer | Consejo |
|---|---|---|
| 1 | Girarse hacia un lado | Doblar la rodilla y el brazo del lado hacia el que se gira |
| 2 | Ponerse a gatas | Apoyar manos y rodillas; si duelen, poner algo blando debajo |
| 3 | Gatear hasta una silla o mueble estable | Nunca a algo con ruedas o que pueda volcar |
| 4 | Apoyar las manos en el asiento | Llevar una pierna adelante con el pie plano en el suelo |
| 5 | Empujar con piernas y brazos | Levantarse despacio y girar para sentarse |
| 6 | Descansar sentado | Antes de caminar, comprobar que no hay mareo ni dolor |

## Practicarlo antes de necesitarlo

Aprender la técnica en un momento tranquilo, con alguien al lado, da seguridad y reduce el miedo. Una forma de practicar es hacerlo **al revés**: empezar de pie junto a la silla, bajar a una rodilla, luego a gatas, y volver a subir. Cada semana se añade un paso, hasta llegar a tumbarse en el suelo.

Solo debe practicarse si el equipo sanitario no lo desaconseja y con supervisión al principio. La fuerza de piernas y brazos marca la diferencia; los ejercicios de [levantarse de una silla](/articulos/levantarse-silla-autonomia-personas-mayores) son una preparación excelente.

## Si no puedes levantarte

- **Pide ayuda:** teléfono móvil a mano, botón de teleasistencia o llamar a voces.
- **Mantén el calor:** coge una manta, un cojín o una prenda cercana.
- **Cambia de postura** cada cierto tiempo si es posible, para evitar presión en la piel.
- **Arrástrate** de forma segura hacia un teléfono o una zona donde puedan oírte.

En el estudio de personas de más de 90 años, la mayoría tenía teleasistencia disponible pero no la usaba al caer, a menudo porque no la llevaba puesta [1]. Llevar el pulsador **siempre**, también en casa y en el baño, es fundamental.

## Después de una caída

Aunque no haya lesión, una caída es un aviso. Conviene revisar fuerza, equilibrio, medicación, vista y el entorno doméstico. Te lo explicamos en [después de una caída: cómo recuperar seguridad y confianza](/articulos/que-pasa-despues-de-una-caida) y en [las señales de riesgo de caída](/articulos/senales-riesgo-caidas-personas-mayores).

## Errores frecuentes

**Levantarse de golpe.** Tras una caída es fácil marearse al incorporarse rápido, y una lesión que no se nota en el primer momento puede empeorar.

**Tirar de los brazos de la persona caída.** Es la reacción natural de los familiares, pero puede lesionar hombros o provocar otra caída de quien ayuda. Es mejor guiar la técnica y estabilizar la silla.

**Agarrarse a muebles inestables.** Sillas con ruedas, mesitas ligeras o puertas que se abren pueden ceder justo cuando se apoya el peso.

**Ocultar la caída.** Muchas personas mayores no la cuentan por miedo a perder independencia. Hablarlo sin dramatizar ayuda a actuar a tiempo.

**Pensar que el pulsador es solo para emergencias graves.** Si no puede levantarse, eso ya es una emergencia: el tiempo en el suelo tiene consecuencias.

## Cómo puede ayudar la familia

- **Revisar dónde podría caer** y si tiene a mano un mueble estable en cada estancia: dormitorio, baño, salón y cocina.
- **Colocar un teléfono accesible desde el suelo** o asegurarse de que lleva el móvil o el pulsador de teleasistencia siempre encima, también en el baño.
- **Practicar juntos**, al principio en una zona con alfombra o colchoneta, y siempre con supervisión.
- **Acordar un sistema de contacto diario**, por ejemplo una llamada a la misma hora, para personas que viven solas.
- **Registrar cualquier caída o tropiezo** y comentarlo con su médico: la frecuencia es una información valiosa.

### Si encuentras a tu familiar en el suelo

1. Mantén la calma y pregúntale cómo está y dónde le duele.
2. Si hay dolor intenso, golpe en la cabeza, confusión o no puede mover una pierna: **llama al 112** y no lo muevas.
3. Si no hay lesión aparente, acerca una silla estable y guíale con la técnica, sin tirar de él.
4. Una vez sentado, déjale descansar y observa si aparece mareo o dolor.
5. Informa a su médico, aunque todo parezca bien.

## Preguntas frecuentes

### ¿Debo ayudar a levantar a mi familiar si se ha caído?

Primero comprueba si hay dolor o lesión. Si no la hay, guíale con la técnica y ayúdale a estabilizar la silla, sin tirar de sus brazos. Si hay dolor intenso, llama al 112 y no lo muevas.

### ¿Y si no tiene fuerza para ponerse a gatas?

Es habitual al principio. Por eso conviene entrenar la fuerza de piernas y brazos y, mientras tanto, tener un plan para pedir ayuda: teléfono y teleasistencia.

### ¿Hay que practicarlo aunque nunca se haya caído?

Es recomendable, sobre todo si vive solo o si tiene factores de riesgo de caída. Practicarlo reduce el miedo y el tiempo de reacción.

### ¿El ejercicio reduce las caídas?

Sí. Los programas de fuerza y equilibrio reducen en torno a un 23% la tasa de caídas en personas mayores que viven en su casa [3].

## Cómo te podemos ayudar

En nuestro programa de [prevención de caídas a domicilio](/prevencion-caidas-mayores-madrid) entrenamos fuerza, equilibrio y, cuando es seguro, la técnica para levantarse del suelo. También puedes descargar nuestra [guía gratuita con 10 ejercicios](/guia-prevencion-caidas).

## Referencias

${refs('fleming', 'tinetti', 'cochraneFalls')}`,
  },
];

function getSheetsClient() {
  const credentials = process.env.GOOGLE_CREDENTIALS
    ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
    : {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      };
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

async function main() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error('[Artículos:seedPillar] Falta GOOGLE_SHEET_ID');

  const sheets = getSheetsClient();
  const current = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET}!A2:K` });
  const existingSlugs = new Set((current.data.values || []).map((row) => String(row[1] || '').trim()));
  const now = new Date().toISOString();

  const rows = articles
    .filter((article) => !existingSlugs.has(article.slug))
    .map((article) => [
      `art_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      article.slug,
      article.title,
      article.excerpt,
      article.body,
      article.image,
      article.tags.join(', '),
      'draft',
      '',
      now,
      now,
    ]);

  if (rows.length === 0) {
    console.log('[Artículos:seedPillar] Todos los artículos ya existen. Nada que insertar.');
    return;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET}!A:K`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: rows },
  });

  console.log(`[Artículos:seedPillar] Insertados ${rows.length} borradores: ${rows.map((r) => r[1]).join(', ')}`);
}

main().catch((error) => {
  console.error('[Artículos:seedPillar]', error);
  process.exit(1);
});
