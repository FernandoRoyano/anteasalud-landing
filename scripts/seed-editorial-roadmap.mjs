// Publica el primer bloque del plan editorial de ANTEA Salud.
// Idempotente: no vuelve a insertar un slug que ya exista.

import pkg from '@next/env';
const { loadEnvConfig } = pkg;
loadEnvConfig(process.cwd());

import { google } from 'googleapis';

const SHEET = 'Articulos';

const articles = [
  {
    slug: 'valoracion-funcional-personas-mayores-que-incluye',
    title: 'Qué hacemos en una valoración funcional de una persona mayor',
    excerpt: 'No buscamos poner una nota ni demostrar lo que alguien ya no puede hacer. Medimos su punto de partida para decidir qué necesita y comprobar después si está avanzando.',
    image: '/articulos/valoracion-funcional.webp',
    tags: ['valoración funcional', 'VIVIFRAIL', 'autonomía', 'personas mayores'],
    publishedAt: '2026-09-04T09:00:00.000Z',
    body: `Si estás buscando ayuda para tu madre, tu padre o tu pareja, probablemente no necesites otra lista de ejercicios. Necesitas saber **qué puede hacer hoy, dónde encuentra dificultad y qué merece la pena trabajar primero**.

Para eso sirve una valoración funcional.

No es un examen que se aprueba o se suspende. Tampoco es una consulta médica ni un diagnóstico. Es una fotografía del punto de partida: cómo se levanta, cómo camina, cuánto equilibrio conserva y cómo se traducen esas capacidades en su vida diaria.

## Primero hablamos de su vida, no de los tests

Antes de medir nada necesitamos contexto. Dos personas pueden obtener un resultado parecido y necesitar programas completamente distintos.

Preguntamos qué actividades quiere recuperar o conservar: bajar a comprar, ducharse sin ayuda, levantarse del sofá, salir al parque o volver a visitar a sus amigos. También revisamos antecedentes de caídas, dolor, operaciones recientes, medicación relevante, ayudas técnicas y recomendaciones sanitarias.

La pregunta importante no es solo «¿cuánto tarda?», sino **«¿para qué necesita mejorar esto?»**.

## Qué observamos durante la valoración

### Equilibrio

Comprobamos cómo mantiene distintas posiciones de pie y qué apoyos necesita. No buscamos llevar a nadie al límite. Queremos saber desde qué situación puede trabajar con seguridad.

### Velocidad de marcha

Caminar unos metros aporta información sobre la movilidad global. Observamos el ritmo, la longitud del paso, los giros, la estabilidad y si aparece fatiga o inseguridad.

### Levantarse y sentarse

Este gesto reúne fuerza de piernas, coordinación, movilidad y confianza. Es una capacidad que se repite constantemente: sofá, baño, cama, coche o mesa.

### Capacidad funcional de las piernas

Cuando la situación lo permite utilizamos la **Short Physical Performance Battery (SPPB)**, una batería objetiva que integra equilibrio, marcha y levantarse de una silla. El National Institute on Aging la describe como una herramienta para evaluar el funcionamiento de los miembros inferiores en personas mayores [1].

### Riesgo de caídas

Una puntuación física no cuenta toda la historia. Por eso preguntamos por caídas recientes, dificultad para caminar, miedo a caer y otros elementos que pueden modificar el riesgo.

## Cómo tenemos presente VIVIFRAIL

VIVIFRAIL nos aporta un marco útil: valorar la capacidad funcional, comprobar por separado el riesgo de caídas y orientar el ejercicio según el punto de partida [2].

Su propuesta utiliza el SPPB para distinguir perfiles funcionales y contempla programas multicomponente adaptados. Eso ayuda a ordenar la información, pero no sustituye el criterio profesional ni obliga a copiar un programa cerrado.

En ANTEA lo usamos como **base de razonamiento**, no como una etiqueta. Después incorporamos el entorno de la persona, sus objetivos, su experiencia previa, sus preferencias y cualquier indicación médica.

## Qué ocurre después

Con los resultados elegimos prioridades. Una persona puede necesitar más fuerza para levantarse, otra confianza al girar y otra resistencia para completar un paseo sin agotarse.

El programa puede combinar:

- Fuerza y potencia adaptadas.
- Equilibrio estático y dinámico.
- Marcha y cambios de dirección.
- Movilidad y flexibilidad cuando son necesarias.
- Trabajo de resistencia ajustado a la situación.

También dejamos una referencia inicial para repetir algunas pruebas más adelante. Así no dependemos únicamente de impresiones como «parece que está mejor». Podemos comprobar qué ha cambiado y decidir si toca progresar, mantener o modificar el trabajo.

## Lo que una valoración no puede decir por sí sola

Un resultado bajo no explica automáticamente la causa. Puede influir el dolor, el cansancio, una enfermedad reciente, la medicación, el miedo o no haber entendido bien una instrucción.

Por eso evitamos diagnosticar a partir de un número aislado. Si aparece dolor nuevo, mareo, pérdida brusca de capacidad o una situación que excede nuestro ámbito, la prioridad es derivar al profesional sanitario correspondiente.

Una buena valoración no termina con una puntuación. Termina cuando la familia entiende qué hemos observado, qué vamos a trabajar y por qué.

## Referencias

1. National Institute on Aging. Short Physical Performance Battery (SPPB). Actualizado en 2025.
2. VIVIFRAIL. Guía de prescripción y materiales para profesionales.
3. World Health Organization. Integrated Care for Older People (ICOPE): guidance for person-centred assessment and pathways in primary care.`,
  },
  {
    slug: 'fragilidad-prefragilidad-persona-robusta-significado',
    title: 'Fragilidad, prefragilidad y persona robusta: qué significan realmente',
    excerpt: 'La fragilidad no es una edad ni una sentencia. Es una forma de describir cuánta reserva funcional conserva una persona y cuánto le cuesta responder a los cambios.',
    image: '/articulos/fragilidad-prefragilidad.webp',
    tags: ['fragilidad', 'VIVIFRAIL', 'autonomía', 'fuerza'],
    publishedAt: '2026-09-03T09:00:00.000Z',
    body: `Hay personas de 82 años que salen, compran y suben escaleras. Otras, con la misma edad, necesitan ayuda después de una gripe o una semana de reposo.

La diferencia no está solo en los años. Está en la **reserva funcional**: el margen que tiene el cuerpo para responder cuando aparece una dificultad.

De eso hablamos cuando utilizamos palabras como robustez, prefragilidad o fragilidad.

## Fragilidad no significa debilidad de carácter

La fragilidad es un concepto clínico y funcional. No describe la voluntad de una persona ni su valor. Indica que su organismo tiene menos margen para afrontar situaciones como una infección, una hospitalización, una caída o varios días de inactividad.

La Organización Mundial de la Salud recuerda que no existe una persona mayor «típica»: dos personas de la misma edad pueden tener capacidades muy diferentes [1]. Por eso la edad del DNI no basta para decidir cuánto ejercicio puede hacer alguien.

## Tres situaciones fáciles de entender

### Persona robusta

Conserva buena capacidad para caminar, levantarse, mantener el equilibrio y realizar sus actividades. Eso no significa que no necesite entrenar. El objetivo suele ser conservar esa reserva y seguir enfrentándose a tareas exigentes con seguridad.

### Prefragilidad

Empiezan a aparecer señales pequeñas: camina algo más despacio, evita ciertas salidas, necesita las manos para levantarse o se fatiga antes. Todavía mantiene bastante autonomía, pero el margen se ha reducido.

Es un momento especialmente valioso para intervenir porque aún existen muchas capacidades sobre las que construir.

### Fragilidad

La pérdida de reserva es mayor y una dificultad relativamente pequeña puede tener consecuencias importantes. Puede necesitar más apoyo en tareas diarias, recuperarse peor tras una enfermedad o perder capacidad con rapidez durante un periodo de reposo.

Fragilidad no significa que el ejercicio esté prohibido. Significa que debe estar **mejor medido, más adaptado y más supervisado**.

## Cómo se valora

No deberíamos etiquetar a alguien por cómo parece moverse. Utilizamos información objetiva y contexto.

VIVIFRAIL propone valorar la función mediante el SPPB —equilibrio, velocidad de marcha y levantarse de una silla— y separar después el análisis del riesgo de caídas [2]. Según el resultado funcional, orienta perfiles de discapacidad, fragilidad, prefragilidad o robustez.

Esta clasificación ayuda a elegir un punto de partida. No explica por sí sola por qué existe una dificultad ni sustituye una valoración sanitaria.

## Lo importante: la situación puede cambiar

La función no es una etiqueta fija. Puede empeorar después de una hospitalización o mejorar cuando la persona vuelve a entrenar con continuidad.

Un ensayo multicéntrico del programa VIVIFRAIL en personas mayores con prefragilidad o fragilidad y deterioro cognitivo leve observó mejoras en la capacidad funcional medida con SPPB tras tres meses de ejercicio multicomponente individualizado [3]. El resultado no significa que todas las personas respondan igual, pero sí refuerza una idea importante: **tener fragilidad no equivale a no poder mejorar**.

## Qué suele incluir el trabajo

Dependiendo del perfil, podemos combinar fuerza, equilibrio, marcha, movilidad y resistencia. Cambian el apoyo, la dificultad, el volumen, la velocidad y el grado de supervisión.

Una sentadilla puede ser levantarse de una silla alta con ayuda de las manos. Para otra persona puede ser levantarse sin apoyo y controlar la bajada. El patrón se parece; la dosis y el contexto cambian por completo.

## Qué puede observar una familia

Conviene prestar atención si una persona:

- Tarda cada vez más en levantarse o necesita nuevos apoyos.
- Ha reducido sus salidas por miedo o cansancio.
- Camina más despacio que hace unos meses.
- Ha sufrido una caída reciente.
- Ha perdido mucha capacidad después de una enfermedad o ingreso.
- Necesita ayuda para actividades que antes resolvía sola.

Ninguna señal aislada confirma fragilidad. Juntas pueden indicar que merece la pena realizar una valoración completa.

El objetivo no es colocar a la persona en una categoría. Es saber cuánto margen conserva y utilizarlo para proteger aquello que más importa: su autonomía.

## Referencias

1. World Health Organization. Healthy ageing and functional ability.
2. VIVIFRAIL. Guía de prescripción del programa multicomponente.
3. Casas-Herrero A, et al. Effects of Vivifrail multicomponent intervention on functional capacity: a multicentre randomized controlled trial. Journal of Cachexia, Sarcopenia and Muscle. 2022.`,
  },
  {
    slug: 'sppb-que-es-valoracion-personas-mayores',
    title: 'SPPB: tres pruebas breves que cuentan mucho sobre la movilidad',
    excerpt: 'Equilibrio, velocidad al caminar y levantarse de una silla. Te explicamos qué observa el SPPB y por qué nunca interpretamos su puntuación de manera aislada.',
    image: '/articulos/sppb-explicado.webp',
    tags: ['SPPB', 'valoración funcional', 'VIVIFRAIL', 'movilidad'],
    publishedAt: '2026-09-02T09:00:00.000Z',
    body: `El SPPB dura pocos minutos, apenas necesita material y, bien administrado, ofrece una visión muy útil de la función de las piernas.

Sus siglas vienen de **Short Physical Performance Battery**. No hace falta memorizar el nombre. Lo importante es entender qué mira: equilibrio, marcha y capacidad para levantarse de una silla.

El National Institute on Aging lo presenta como una herramienta objetiva para evaluar el funcionamiento de los miembros inferiores en personas mayores [1].

## Primera parte: mantener el equilibrio

La persona intenta mantener varias posiciones de pie, desde una base más estable hasta otra más exigente. El profesional controla el tiempo y, sobre todo, la seguridad.

No es una competición para aguantar temblando. Si una posición no es segura, se detiene. El resultado nos orienta sobre el control postural y el apoyo que puede necesitar al empezar a entrenar.

## Segunda parte: caminar unos metros

Se mide el tiempo necesario para recorrer una distancia corta al ritmo habitual. No pedimos correr ni caminar todo lo rápido posible.

La velocidad de marcha resume muchas cosas: fuerza, equilibrio, coordinación, confianza y capacidad cardiorrespiratoria. Pero un día de dolor, cansancio o miedo también puede modificarla. Por eso miramos el gesto además del cronómetro.

## Tercera parte: levantarse cinco veces

La persona se levanta y se sienta varias veces desde una silla, siguiendo un protocolo concreto. Este gesto exige fuerza en las piernas, coordinación y control al descender.

Piensa cuántas veces aparece en la vida diaria: levantarse del sofá, del baño, de la cama o del asiento del coche. Medirlo conecta directamente con la autonomía.

## Cómo se obtiene la puntuación

Cada bloque aporta puntos y el total va de 0 a 12. Una puntuación mayor refleja mejor rendimiento en esas tres tareas.

En la guía VIVIFRAIL, el resultado ayuda a orientar el perfil funcional: 0-3, 4-6, 7-9 y 10-12 corresponden a puntos de partida progresivamente más capaces [2]. Si no puede realizarse el SPPB, la guía contempla la velocidad de marcha de seis metros como alternativa orientativa.

Esto no convierte la puntuación en diagnóstico. Dos personas con ocho puntos pueden tener dolores, objetivos y riesgos distintos.

## El riesgo de caídas se revisa aparte

Este matiz es importante. El SPPB describe capacidad funcional, pero **no resume por sí solo todo el riesgo de caída**.

VIVIFRAIL añade preguntas y pruebas específicas relacionadas con caídas recientes, dificultad para caminar, el Timed Up and Go, la velocidad de marcha o el deterioro cognitivo conocido [2]. De ahí surgen los perfiles con el símbolo «+».

Una persona puede conservar una capacidad razonable y, aun así, presentar factores que justifiquen mayor supervisión.

## Para qué nos sirve en ANTEA

Lo utilizamos para tres decisiones:

1. Elegir un punto de partida proporcionado.
2. Identificar qué componente limita más el conjunto.
3. Repetir la medición y comprobar si el programa está produciendo cambios.

Si mejora al levantarse pero sigue insegura al girar, no damos el trabajo por terminado. Si el resultado baja de forma inesperada, buscamos contexto antes de aumentar la carga.

## Por qué no recomendamos hacerlo sin guía

En internet es fácil encontrar tablas y tiempos. Lo difícil es aplicar el protocolo, garantizar la seguridad e interpretar el resultado.

Una silla demasiado baja, permitir un apoyo distinto o medir otra distancia cambia la prueba. Y un número sin historia personal puede generar tranquilidad falsa o preocupación innecesaria.

La utilidad del SPPB no está en conseguir una puntuación bonita. Está en convertir una observación ordenada en un programa más seguro y más útil.

## Referencias

1. National Institute on Aging. Short Physical Performance Battery (SPPB).
2. VIVIFRAIL. Pasaporte de ejercicio físico para profesionales: test y perfiles funcionales.
3. Guralnik JM, et al. A short physical performance battery assessing lower extremity function. Journal of Gerontology. 1994.`,
  },
  {
    slug: 'levantarse-silla-autonomia-personas-mayores',
    title: 'Levantarse de una silla: un gesto sencillo que sostiene mucha autonomía',
    excerpt: 'No es solo fuerza de piernas. En este movimiento se juntan coordinación, movilidad, equilibrio y confianza para resolver muchas tareas cotidianas.',
    image: '/articulos/levantarse-silla.webp',
    tags: ['fuerza', 'autonomía', 'sentarse y levantarse', 'personas mayores'],
    publishedAt: '2026-09-01T09:00:00.000Z',
    body: `Levantarse del sofá parece un gesto pequeño hasta que empieza a costar.

Entonces aparecen estrategias nuevas: impulsarse con las manos, balancear el tronco varias veces, buscar un mueble cercano o pedir que alguien tire de los brazos.

No siempre significa lo mismo, pero sí merece atención porque levantarse de una silla es una de esas capacidades que sostienen muchas otras.

## Qué necesita el cuerpo para levantarse

Las piernas producen fuerza, el tronco se inclina hacia delante, los pies encuentran una posición útil y el cuerpo desplaza su peso hasta quedar de pie.

Es parecido a mover una figura de Playmobil desde la cadera: si el tronco no avanza lo suficiente, el peso se queda atrás y levantarse resulta mucho más difícil. La analogía ayuda a entender el gesto, aunque la ejecución debe adaptarse a cada persona.

También influyen la movilidad de tobillos y caderas, el equilibrio, el dolor, la altura de la silla y la confianza.

## Por qué importa tanto en la vida diaria

La misma capacidad aparece al:

- Levantarse del inodoro.
- Salir de la cama.
- Entrar o salir del coche.
- Incorporarse después de comer.
- Recuperarse desde una posición baja.

Cuando este gesto se deteriora, la persona puede empezar a evitar actividades sin decirlo. Sale menos porque teme no poder levantarse de una silla desconocida o necesita esperar a que haya alguien cerca.

## Qué observamos

Nos fijamos en si necesita las manos, cuántos intentos realiza, cómo coloca los pies, si controla la bajada y si aparece dolor, mareo o falta de aire.

Pruebas como el bloque de levantarse de la silla del SPPB permiten medir el rendimiento de forma estandarizada [1]. VIVIFRAIL incorpora esa información dentro de una valoración funcional más amplia [2].

El tiempo importa, pero la técnica y el contexto también.

## Apoyar las manos no es «hacer trampa»

Si alguien necesita las manos para levantarse con seguridad, debe usarlas. Quitar el apoyo antes de tiempo no demuestra más fuerza; solo puede convertir una tarea útil en una situación insegura.

El apoyo es una variable que podemos entrenar. Quizá al principio utiliza ambos brazos, después reduce parte de la ayuda y más adelante prueba desde una silla algo más baja.

## Cómo se entrena

El propio gesto de sentarse y levantarse puede ser un ejercicio excelente cuando está bien ajustado.

Podemos modificar:

- La altura y firmeza de la silla.
- El uso de uno o dos brazos.
- El número de repeticiones.
- La velocidad de subida y el control de la bajada.
- La pausa entre intentos.
- La carga externa, solo cuando existe base suficiente.

También se complementa con trabajo de rodilla, cadera, tobillo, equilibrio y marcha.

## Errores frecuentes de la familia

El primero es tirar de los brazos para levantar a la persona. Puede resolver el momento, pero no le enseña a organizar el movimiento y puede crear dependencia.

El segundo es insistir con una silla demasiado baja. Cambiar temporalmente la altura puede permitir practicar con éxito y progresar después.

El tercero es perseguir muchas repeticiones. Cinco movimientos bien controlados pueden aportar más que quince realizados con fatiga y miedo.

## Cuándo conviene consultar

Si la dificultad ha aparecido de forma brusca, existe dolor intenso, mareo, pérdida de sensibilidad o debilidad en un lado del cuerpo, no es momento de probar ejercicios por cuenta propia. Hay que solicitar valoración sanitaria.

Cuando el cambio ha sido progresivo, una valoración funcional permite identificar qué está limitando el gesto y diseñar una progresión realista.

No entrenamos levantarse de una silla para mejorar un test. Lo entrenamos para que la persona pueda seguir decidiendo cuándo se levanta y adónde quiere ir.

## Referencias

1. National Institute on Aging. Short Physical Performance Battery (SPPB).
2. VIVIFRAIL. Programa multicomponente para la prevención de la fragilidad y el riesgo de caídas.
3. World Health Organization. Guidelines on physical activity and sedentary behaviour. 2020.`,
  },
  {
    slug: 'perdida-fuerza-personas-mayores-senales',
    title: 'Pérdida de fuerza en personas mayores: señales que suelen pasar desapercibidas',
    excerpt: 'La fuerza no desaparece de golpe. Suele avisar en tareas pequeñas: bolsas que pesan más, escalones que cuestan o apoyos nuevos para levantarse.',
    image: '/articulos/perdida-fuerza.webp',
    tags: ['fuerza', 'autonomía', 'sarcopenia', 'prevención'],
    publishedAt: '2026-08-31T09:00:00.000Z',
    body: `La pérdida de fuerza rara vez empieza con una gran incapacidad. Suele aparecer en detalles.

La bolsa de la compra cambia de mano más veces. El último escalón obliga a tirar de la barandilla. Una garrafa que antes se levantaba sin pensar ahora se arrastra por la encimera.

Como la persona sigue resolviendo la tarea, el cambio puede pasar desapercibido durante meses.

## Fuerza no significa levantar grandes pesos

En una persona mayor, fuerza es poder producir la tensión necesaria para vivir con autonomía.

Hace falta fuerza para levantarse, frenar el cuerpo al sentarse, abrir una puerta pesada, cargar una bolsa o recuperar el equilibrio después de un tropiezo.

También importa la potencia: ser capaz de aplicar esa fuerza con cierta rapidez. Si tropiezas, no dispones de veinte segundos para reaccionar.

## Señales cotidianas

Observa si la persona:

- Utiliza las manos para levantarse donde antes no las necesitaba.
- Evita escaleras o sube siempre con la misma pierna.
- Camina con pasos más cortos.
- Deja objetos pesados en superficies intermedias.
- Necesita ayuda para abrir envases o transportar compras.
- Se deja caer al sentarse porque no controla la bajada.
- Ha reducido actividades que antes formaban parte de su rutina.

Estas señales no demuestran por sí solas que exista una enfermedad muscular. El dolor, la artrosis, un problema neurológico, el miedo o una recuperación reciente pueden producir cambios parecidos.

## Qué relación tiene con la sarcopenia

La sarcopenia es un trastorno relacionado con la pérdida de fuerza y masa muscular. El término es útil en contextos clínicos, pero no deberíamos utilizarlo como diagnóstico informal cada vez que alguien se siente más débil.

Para una familia, la prioridad es detectar el cambio funcional y consultar cuando sea necesario. Para diagnosticar sarcopenia hacen falta criterios y profesionales sanitarios cualificados.

## Cómo medimos la fuerza útil

No nos interesa únicamente cuántos kilos puede mover una persona en una máquina.

Observamos tareas como levantarse de una silla y valoramos el rendimiento de los miembros inferiores mediante herramientas como el SPPB [1]. Según el caso, pueden añadirse dinamometría de mano u otras pruebas.

VIVIFRAIL utiliza la capacidad funcional para orientar el punto de partida del programa [2]. Nosotros añadimos las necesidades reales de la persona: quizá el objetivo no sea mejorar una puntuación, sino volver a subir los escalones de casa.

## ¿Se puede ganar fuerza a una edad avanzada?

La edad modifica la recuperación y obliga a ajustar el entrenamiento, pero no elimina la capacidad de adaptación.

La Organización Mundial de la Salud recomienda que las personas mayores incluyan actividades de fortalecimiento muscular y, cuando existe menor movilidad, trabajo multicomponente con énfasis en equilibrio y fuerza [3].

El estímulo debe ser suficiente para provocar adaptación y lo bastante ajustado para poder repetirse con seguridad. Moverse mucho no siempre equivale a entrenar fuerza.

## Cómo empezamos

Elegimos movimientos que la persona reconoce: levantarse, empujar, tirar, elevar los talones, subir un escalón o transportar una carga manejable.

Después ajustamos apoyo, recorrido, resistencia, repeticiones y descansos. La progresión puede consistir en usar menos ayuda, controlar mejor la bajada, mover algo más de carga o completar la misma tarea con menos fatiga.

## Cuándo no conviene esperar

Una pérdida brusca de fuerza, especialmente en un lado del cuerpo, requiere atención sanitaria urgente. También deben consultarse dolor intenso, caídas repetidas, pérdida de peso no intencionada o deterioro rápido.

Si el cambio es progresivo, medir pronto permite actuar antes de que las soluciones cotidianas —usar más apoyos, salir menos, evitar escaleras— terminen reduciendo todavía más la capacidad.

La fuerza no se entrena para presumir de kilos. Se entrena para conservar opciones.

## Referencias

1. National Institute on Aging. Short Physical Performance Battery (SPPB).
2. VIVIFRAIL. Guía de prescripción para profesionales.
3. World Health Organization. Guidelines on physical activity and sedentary behaviour. 2020.`,
  },
  {
    slug: 'recuperar-capacidad-despues-hospitalizacion-mayores',
    title: 'Después de una hospitalización: cómo recuperar capacidad sin querer correr demasiado',
    excerpt: 'Volver a casa no siempre significa haber recuperado el nivel anterior. El movimiento progresivo ayuda a reconstruir fuerza, equilibrio y confianza.',
    image: '/articulos/despues-hospitalizacion.webp',
    tags: ['hospitalización', 'recuperación', 'fuerza', 'autonomía'],
    publishedAt: '2026-08-30T09:00:00.000Z',
    body: `El alta hospitalaria responde a una pregunta concreta: ¿puede continuar la recuperación fuera del hospital?

No significa necesariamente que la persona haya recuperado la fuerza, el equilibrio o la confianza que tenía antes del ingreso.

Muchas familias descubren esta diferencia al llegar a casa. El pasillo parece más largo, levantarse del sofá cuesta y una ducha deja más cansancio del esperado.

## Por qué se pierde capacidad tan rápido

Durante un ingreso se camina menos, se pasa más tiempo sentado o tumbado y cambian el sueño, el apetito y la rutina. A eso se suma el motivo de la hospitalización.

En personas mayores, incluso periodos relativamente breves de reposo pueden reducir fuerza y capacidad funcional. El efecto varía mucho según la situación previa: quien ya tenía poca reserva dispone de menos margen.

## Las primeras preguntas al volver a casa

Antes de pensar en ejercicios, necesitamos saber:

- Qué indicaciones aparecen en el informe de alta.
- Si existen restricciones de carga o movimiento.
- Si hay dolor, mareo, falta de aire o síntomas nuevos.
- Qué medicación ha cambiado.
- Cómo caminaba y qué actividades realizaba antes del ingreso.
- Qué tareas son ahora las más difíciles.

Cuando existen dudas clínicas, el médico o el fisioterapeuta debe aclararlas antes de progresar.

## No confundir reposo con recuperación

Hay situaciones que requieren protección y tiempos médicos concretos. Pero prolongar la inactividad sin una razón también puede aumentar la pérdida de capacidad.

La solución no es pasar de la cama a un entrenamiento intenso. Es encontrar el **mínimo movimiento seguro que puede repetirse y progresar**.

Al principio puede consistir en levantarse varias veces a lo largo del día, caminar distancias cortas con apoyo o realizar movimientos sentados. El punto exacto depende de la causa del ingreso y de las indicaciones sanitarias.

## Qué valoramos

Cuando la persona está autorizada para trabajar, revisamos su capacidad actual en lugar de asumir que mantiene el nivel anterior.

Observamos equilibrio, marcha, levantarse y sentarse, tolerancia al esfuerzo y seguridad en el domicilio. El SPPB puede ser útil para establecer una referencia de los miembros inferiores [1].

La lógica de VIVIFRAIL —perfil funcional, riesgo de caídas y ejercicio multicomponente adaptado— ayuda a ordenar el punto de partida [2]. No sustituye las restricciones específicas del alta ni la coordinación sanitaria.

## Qué capacidades reconstruimos

### Fuerza

Para levantarse, caminar, subir escalones y controlar los movimientos.

### Equilibrio

Primero con apoyos suficientes. Después incorporamos cambios de posición, giros y tareas más parecidas a la vida diaria.

### Marcha

No solo acumulamos metros. Trabajamos ritmo, pasos, giros, obstáculos y confianza en el entorno real.

### Resistencia

Distribuimos esfuerzos breves y descansos. La tolerancia se construye sin convertir cada sesión en una prueba de agotamiento.

## Cómo saber si se está avanzando

Miramos datos y vida diaria.

Puede mejorar el tiempo al levantarse, la distancia caminada o el equilibrio. Pero también importa que vuelva a preparar algo sencillo, llegue al portal o necesite menos ayuda para asearse.

Repetir algunas medidas permite comprobar la evolución. La Organización Mundial de la Salud señala que las evaluaciones repetidas ayudan a detectar cambios y ajustar el plan de atención [3].

## Señales para detenerse y consultar

Dolor intenso o creciente, falta de aire desproporcionada, dolor en el pecho, desmayo, confusión nueva, fiebre o pérdida brusca de fuerza requieren valoración sanitaria.

También conviene consultar si la capacidad continúa empeorando pese al paso de los días o si la familia no puede garantizar desplazamientos seguros.

## Recuperar no es volver exactamente al pasado

A veces el objetivo es recuperar el nivel previo. Otras veces consiste en construir una nueva forma segura de resolver las tareas.

Lo importante es no dejar que «ya está en casa» se convierta en el final del proceso. Puede ser el momento de medir de nuevo, decidir prioridades y empezar a reconstruir autonomía con paciencia y criterio.

## Referencias

1. National Institute on Aging. Short Physical Performance Battery (SPPB).
2. VIVIFRAIL. Programa multicomponente para la prevención de la fragilidad y el riesgo de caídas.
3. World Health Organization. Integrated Care for Older People (ICOPE): assessment and person-centred pathways.`,
  },
];

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
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error('[Artículos:seedEditorial] Falta GOOGLE_SHEET_ID');

  const sheets = getSheetsClient();
  const current = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET}!A2:K`,
  });
  const currentRows = current.data.values || [];
  const existingBySlug = new Map(
    currentRows
      .map((row, index) => [String(row[1] || '').trim(), { row, sheetRow: index + 2 }])
      .filter(([slug]) => slug)
  );
  const now = new Date().toISOString();

  function serialize(article, existingRow) {
    return [
      existingRow?.[0] || `art_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      article.slug,
      article.title,
      article.excerpt,
      article.body,
      article.image,
      article.tags.join(', '),
      'published',
      existingRow?.[8] || article.publishedAt,
      existingRow?.[9] || now,
      now,
    ];
  }

  const updates = articles
    .filter((article) => existingBySlug.has(article.slug))
    .map((article) => {
      const existing = existingBySlug.get(article.slug);
      return {
        range: `${SHEET}!A${existing.sheetRow}:K${existing.sheetRow}`,
        values: [serialize(article, existing.row)],
      };
    });

  const rows = articles
    .filter((article) => !existingBySlug.has(article.slug))
    .map((article) => serialize(article));

  if (updates.length > 0) {
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: { valueInputOption: 'RAW', data: updates },
    });
  }

  if (rows.length > 0) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET}!A:K`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: rows },
    });
  }

  console.log(`Sincronizados ${updates.length} y publicados ${rows.length} artículos.`);
}

main().catch((error) => {
  console.error('[Artículos:seedEditorial]', error);
  process.exit(1);
});
