"use client";

import { Printer, Camera, Clock, Lightbulb, Video, Upload } from 'lucide-react';

export default function GuionVideoPage() {
  const handlePrint = () => window.print();

  return (
    <div className="max-w-3xl mx-auto space-y-6 print:max-w-none print:space-y-4">
      {/* Header con botón imprimir (oculto al imprimir) */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
            Guion del vídeo
          </h1>
          <p className="text-[rgb(130,131,130)] mt-1">&ldquo;Nuestro método&rdquo; · ~7-8 min</p>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-[rgb(0,94,184)] text-white hover:bg-[rgb(32,113,188)] transition"
        >
          <Printer className="w-4 h-4" /> Imprimir / PDF
        </button>
      </div>

      {/* Configuración técnica */}
      <section className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-6">
        <h2 className="text-xl font-black text-[rgb(31,41,51)] mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-[rgb(0,94,184)]" /> Configuración técnica
        </h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <ConfigRow label="Duración objetivo" value="7-8 minutos" />
          <ConfigRow label="Plano" value="Busto (pecho hacia arriba)" />
          <ConfigRow label="Mirada" value="Al objetivo, no a la pantalla" />
          <ConfigRow label="Ritmo" value="Pausado, con respiraciones" />
          <ConfigRow label="Ropa" value="Polo o camisa neutra" />
          <ConfigRow label="Fondo" value="Salón, planta/cuadro, sin desorden" />
          <ConfigRow label="Luz" value="Natural, ventana ENFRENTE tuyo" />
          <ConfigRow label="Audio" value="Micro lavalier (OBLIGATORIO)" />
          <ConfigRow label="Formato" value="Horizontal 16:9" />
        </div>
      </section>

      {/* Tips */}
      <section className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
        <h2 className="text-xl font-black text-[rgb(31,41,51)] mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-orange-600" /> Tips de grabación
        </h2>
        <ul className="space-y-2 text-[rgb(31,41,51)]">
          <Tip>No leas el guion en cámara. Interiorízalo, cuéntalo con tus palabras</Tip>
          <Tip>Graba por bloques. Si te equivocas en el bloque 4, solo repites el 4</Tip>
          <Tip>2-3 tomas por bloque. Luego eliges la mejor</Tip>
          <Tip>Pausas: los silencios entre frases importantes transmiten más que hablar rápido</Tip>
          <Tip>Gesticula natural. Las manos pueden entrar en plano</Tip>
          <Tip>Sonríe en lo positivo (Tino, valoración gratuita). Serio en lo importante (&ldquo;no soy fisio&rdquo;)</Tip>
          <Tip>Tu público son familiares de 45-70 años, no juvenil</Tip>
        </ul>
      </section>

      {/* BLOQUES DEL GUION */}
      <div className="space-y-5">
        <h2 className="text-2xl font-black text-[rgb(31,41,51)] mt-8 pt-4 border-t-2 border-[rgb(200,207,210)]">
          🎬 Guion — 10 bloques
        </h2>

        <Block
          num={1}
          time="0:00 - 0:30"
          title="Hook"
          note="Los primeros 15s son críticos. Si no enganchas, la gente cierra."
        >
          <p>
            Hola. Me llamo Fernando Royano y llevo <strong>14 años</strong> ayudando a personas mayores a no perder
            la autonomía.
          </p>
          <p>
            Si estás aquí, probablemente tu padre, tu madre o alguien que te importa está perdiendo fuerza, se cae
            o tiene miedo de caerse. O quizá ya le ha pasado.
          </p>
          <p>
            En los próximos 7 minutos te voy a explicar qué puedo hacer yo por él o ella, cómo trabajo, qué cuesta,
            y en qué casos NO soy la mejor opción. Para que decidas con información real y sin presión.
          </p>

          <AltHooks />
        </Block>

        <Block
          num={2}
          time="0:30 - 1:30"
          title="Presentación honesta"
          note="La honestidad radical construye confianza instantánea."
        >
          <p>
            Empiezo por lo más importante: yo <strong>no soy fisioterapeuta</strong>. Soy Graduado en Ciencias de
            la Actividad Física y del Deporte. Esto significa que mi especialidad es el <strong>ejercicio</strong>,
            no los tratamientos médicos.
          </p>
          <p>
            ¿Por qué te lo digo tan claro? Porque muchas webs por internet no distinguen esas cosas, la gente
            contrata pensando una cosa y se encuentra con otra, y se sienten engañadas. Yo prefiero que sepas a
            qué vienes.
          </p>
          <p>
            Llevo 14 años dedicándome <strong>exclusivamente</strong> a personas mayores de 60 años. No entreno
            niños, ni atletas, ni gente en el gimnasio. Solo mayores, en sus casas.
          </p>
          <p>
            Entreno a gente de 60, 70, 80, incluso 90 años. Tengo un cliente de 96, Tino, del que te voy a contar
            su historia enseguida porque te va a dar una idea muy concreta de lo que hago.
          </p>
          <Direction>
            Mira a cámara directo al decir &ldquo;no soy fisioterapeuta&rdquo;. Pausa importante. Tu expresión
            debe decir &ldquo;esto es importante, escúchame&rdquo;.
          </Direction>
        </Block>

        <Block num={3} time="1:30 - 2:30" title="Empatía con el dolor familiar">
          <p>Pero antes, deja que te hable un momento de <strong>ti</strong>.</p>
          <p>
            Si estás viendo este vídeo, probablemente hay un familiar tuyo que te preocupa. Se levanta cada vez
            peor del sofá. Arrastra un poco los pies. Ha dejado de salir solo a la calle porque le da miedo.
            Quizá ya se ha caído una vez, la fractura se ha recuperado, pero el susto se quedó dentro.
          </p>
          <p>
            Y tú le ves perdiendo autonomía y piensas cosas como: &ldquo;¿Hasta cuándo podrá estar solo en casa?
            ¿Debería ir a vivir con él? ¿Esto es inevitable o se puede hacer algo?&rdquo;
          </p>
          <p>
            La respuesta honesta es que <strong>en la mayoría de los casos sí se puede hacer algo</strong>. No
            siempre. No milagros. Pero con ejercicio adaptado y constante, se puede parar el deterioro e incluso
            revertirlo.
          </p>
          <Direction>Tono más bajo, más cercano. Hablas a alguien preocupado.</Direction>
        </Block>

        <Block num={4} time="2:30 - 3:30" title="El mecanismo del problema">
          <p>Déjame explicarte por qué pasa esto.</p>
          <p>
            A partir de los 60 años, si no hay ejercicio específico, el cuerpo pierde cada año entre un 1 y un 2%
            de masa muscular. La fuerza, el equilibrio y los reflejos caen con ella.
          </p>
          <p>
            Cuando alguien pierde fuerza en las piernas, deja de moverse. Al dejar de moverse, pierde más fuerza.
            Al perder más fuerza, se mueve aún menos. Es una <strong>espiral que se alimenta sola</strong>.
          </p>
          <p>
            Lo que rompe esa espiral es el <strong>ejercicio adaptado</strong>. No cualquier ejercicio. No
            caminar un poco por casa. Hablo de trabajar fuerza en las piernas de manera progresiva, equilibrio
            dinámico, coordinación. Hay un protocolo concreto y funciona.
          </p>
        </Block>

        <Block
          num={5}
          time="3:30 - 4:30"
          title="La historia de Tino"
          note="La prueba social más potente: un caso real."
        >
          <p>Te cuento el caso de <strong>Tino</strong>.</p>
          <p>
            Tino tiene 96 años. Cuando empecé con él, había perdido casi toda la capacidad de caminar y de subir
            escaleras. Cada semana iba un poco peor que la anterior. La familia estaba desesperada.
          </p>
          <p>
            Antes de llamarme, habían probado con un <strong>fisioterapeuta que les cobraba una pasta</strong> cada
            semana. Mejoraba algo, sí, pero no mucho. Y la factura no paraba de subir.
          </p>
          <p>
            Conmigo hicimos un trabajo distinto. No tratamiento, no masajes. <strong>Ejercicio</strong>. Le hago
            moverse <strong>de verdad</strong>, adaptado a su edad y a sus posibilidades. Sesiones de 30 minutos,
            dos días por semana.
          </p>
          <p>
            Hoy Tino camina por su casa sin ayuda, sube escaleras, y ha recuperado la confianza. Su familia me
            dice que es <strong>la mejor inversión</strong> que han hecho por él.
          </p>
          <Direction>
            Cuando digas &ldquo;le hago moverse de verdad&rdquo; marca las palabras. Esa es la frase que la gente
            va a recordar.
          </Direction>
        </Block>

        <Block num={6} time="4:30 - 5:30" title="Cómo es una sesión">
          <p>Una sesión conmigo es así de concreta:</p>
          <p>
            <strong>30 minutos. En tu casa. Dos días por semana</strong> es lo habitual. Llego con todo lo que
            haga falta. Normalmente solo necesito una silla firme y un poco de espacio en el salón.
          </p>
          <p>
            Empezamos con <strong>movilidad articular</strong> suave. Luego trabajamos{' '}
            <strong>fuerza en piernas</strong> con ejercicios adaptados a lo que cada persona puede hacer. Después{' '}
            <strong>equilibrio</strong>. Terminamos con algo de trabajo <strong>cardiovascular</strong> a su ritmo.
          </p>
          <p>
            Cada sesión la adapto a cómo está la persona <strong>ese día</strong>. Si le duele algo, lo
            rodeamos. Si está cansada, bajamos intensidad. No forzamos nunca. Si hay dolor real, paramos.
          </p>
          <p>
            El objetivo no es machacar. El objetivo es <strong>mover con constancia y progresar poco a poco</strong>.
            En 4-6 semanas ya se nota la diferencia. En 3 meses la gente hace cosas que creía perdidas.
          </p>
        </Block>

        <Block
          num={7}
          time="5:30 - 6:15"
          title="Precios claros"
          note="Dar el precio filtra a los clientes serios."
        >
          <p>Los precios son estos, <strong>sin letra pequeña</strong>:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Una sesión suelta, <strong>45 euros</strong>.</li>
            <li>
              El plan de <strong>dos sesiones por semana, 35 euros cada sesión. 70 euros a la semana</strong>. Que
              es lo que suele funcionar mejor, porque la constancia es lo que da resultados.
            </li>
            <li>
              Si vives <strong>fuera de Madrid capital</strong> — en Móstoles, Getafe, Leganés o zonas similares
              — se suma <strong>5 euros por sesión</strong> por el desplazamiento. Es lo único extra. No hay
              cuotas de alta, no hay permanencia, no hay sorpresas.
            </li>
          </ul>
          <p>
            La <strong>primera valoración es gratuita</strong>. Voy a tu casa, evaluamos la situación, vemos si
            puedo ayudar, y tú decides. Sin compromiso, sin presión. Si no encajamos, no pagas nada.
          </p>
          <Direction>Di los precios pausado, claro. Sin vergüenza. Tu precio es justo.</Direction>
        </Block>

        <Block
          num={8}
          time="6:15 - 7:00"
          title="Qué NO hago (manejo de objeciones)"
          note="Decir qué NO haces ELIMINA objeciones."
        >
          <p>
            Ahora déjame decirte claramente en qué casos <strong>no soy la mejor opción</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Si tu familiar tiene una <strong>lesión aguda</strong> o un dolor sin diagnosticar, necesita primero
              un médico o un fisioterapeuta. Yo entro después, cuando el cuerpo está listo para volver a la actividad.
            </li>
            <li>
              Si buscas <strong>tratamientos manuales</strong> como masajes, electroestimulación o ultrasonidos,
              yo no hago eso. Soy entrenador, no fisio.
            </li>
            <li>
              Si esperas <strong>resultados milagrosos en una semana</strong>, no te los voy a vender. Esto
              requiere constancia y tiempo. Pero funciona de verdad si se hace bien.
            </li>
          </ul>
          <p>
            En cambio, si lo que quieres es que alguien vaya a casa con regularidad, <strong>entrene en serio</strong>{' '}
            a tu familiar, le ayude a recuperar fuerza y confianza, y lo haga con sentido común y sin riesgos —
            ahí sí soy tu profesional.
          </p>
        </Block>

        <Block num={9} time="7:00 - 7:30" title="CTA (llamada a la acción)">
          <p>
            Si has llegado hasta aquí y crees que puedo ayudar a tu familiar, pulsa el botón que tienes{' '}
            <strong>justo debajo de este vídeo</strong>.
          </p>
          <p>
            Te van a salir <strong>4 preguntas cortas</strong>: para quién es el servicio, qué edad tiene, cuál
            es la situación, y en qué zona de Madrid vivís. En 30 segundos lo tienes.
          </p>
          <p>
            Con esa información yo ya sé qué decirte cuando hablemos, y{' '}
            <strong>te ahorras explicar lo mismo veinte veces</strong>. Luego hablamos por WhatsApp, te confirmo
            la fecha de la primera valoración gratuita, y veo a tu familiar en su casa.
          </p>
          <p>
            Si prefieres llamar directamente, tienes también el teléfono debajo. <strong>633 261 963</strong>.
          </p>
          <Direction>Sonríe y apunta hacia abajo (donde está el botón). Gestos abiertos de invitación.</Direction>
        </Block>

        <Block num={10} time="7:30 - 8:00" title="Cierre">
          <p>
            Gracias por haber llegado hasta aquí. Ver un vídeo de 7 u 8 minutos no es poco, así que sé que{' '}
            <strong>te importa de verdad</strong>.
          </p>
          <p>
            Tanto si contactas conmigo como si no, espero que este vídeo te haya servido para entender qué se
            puede hacer y qué no. Y sobre todo, que te haya dado una idea clara de{' '}
            <strong>por qué actuar pronto es importante</strong>.
          </p>
          <p>A tu familiar le queda buena vida por delante. Vamos a por ella.</p>
          <p>Un saludo. Soy Fernando Royano, de ANTEA Salud.</p>
        </Block>
      </div>

      {/* Edición y publicación */}
      <section className="bg-[rgb(191,231,249)] rounded-2xl p-6 print:hidden">
        <h2 className="text-xl font-black text-[rgb(31,41,51)] mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-[rgb(0,94,184)]" /> Edición recomendada (CapCut)
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-[rgb(31,41,51)] text-sm">
          <li>Intro musical suave 2-3s antes del hook (YouTube Audio Library tiene música libre)</li>
          <li>Subtítulos automáticos (80% ven vídeos sin sonido)</li>
          <li>Texto en pantalla en momentos clave: &ldquo;14 años&rdquo;, &ldquo;CCAFYD&rdquo;, &ldquo;Tino, 96 años&rdquo;, &ldquo;45€/70€ sem&rdquo;</li>
          <li>Corte seco al final, no fades largos</li>
          <li>Revisa audio antes de exportar (ajustar en CapCut)</li>
          <li>Exporta 1080p, no 4K (pesa innecesario)</li>
        </ol>
      </section>

      {/* Publicar */}
      <section className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-6 print:hidden">
        <h2 className="text-xl font-black text-[rgb(31,41,51)] mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-red-600" /> Dónde subirlo
        </h2>
        <div className="space-y-3 text-[rgb(31,41,51)]">
          <p>
            <strong>Recomendado: YouTube en modo &ldquo;No listado&rdquo;</strong>. Solo lo ve quien tenga el link.
            No aparece en búsquedas ni a tus suscriptores. Gratis y se ve en cualquier dispositivo.
          </p>
          <ol className="list-decimal pl-6 space-y-1 text-sm">
            <li>Sube el vídeo a YouTube desde studio.youtube.com</li>
            <li>En &ldquo;Visibilidad&rdquo; elige <strong>No listado</strong> (NO &ldquo;Público&rdquo; ni &ldquo;Privado&rdquo;)</li>
            <li>
              Cuando termine de procesarse, copia el <strong>ID</strong> del vídeo. Si la URL es{' '}
              <code className="bg-[rgb(232,237,238)] px-1.5 py-0.5 rounded text-xs">
                youtube.com/watch?v=abc123xyz
              </code>
              , el ID es <code className="bg-[rgb(232,237,238)] px-1.5 py-0.5 rounded text-xs">abc123xyz</code>
            </li>
            <li>Pásame ese ID en la conversación → lo conecto a la landing en 2 minutos</li>
          </ol>
        </div>
      </section>

      {/* Tiempo total */}
      <section className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] p-6 print:hidden">
        <h2 className="text-xl font-black text-[rgb(31,41,51)] mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[rgb(0,94,184)]" /> Tiempo estimado
        </h2>
        <ul className="space-y-2 text-[rgb(31,41,51)]">
          <li className="flex justify-between"><span>Leer e interiorizar el guion</span><strong>30-45 min</strong></li>
          <li className="flex justify-between"><span>Preparar el set (luz, micro, ropa)</span><strong>20 min</strong></li>
          <li className="flex justify-between"><span>Grabar con repeticiones</span><strong>1-1.5 h</strong></li>
          <li className="flex justify-between"><span>Editar en CapCut</span><strong>1-2 h</strong></li>
          <li className="flex justify-between"><span>Subir a YouTube</span><strong>30 min</strong></li>
          <li className="flex justify-between border-t border-[rgb(200,207,210)] pt-2 mt-2 font-bold text-[rgb(0,94,184)]">
            <span>TOTAL</span><strong>~4 horas en 1-2 días</strong>
          </li>
        </ul>
        <p className="text-xs text-[rgb(130,131,130)] mt-4 italic">
          Un vídeo VSL bien hecho se graba UNA vez y vende durante 2-3 años. Merece las 4 horas.
        </p>
      </section>
    </div>
  );
}

// =============================================================================
// SUBCOMPONENTES
// =============================================================================

function ConfigRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 p-3 bg-[rgb(232,237,238)] rounded-lg">
      <span className="text-[rgb(130,131,130)]">{label}</span>
      <span className="font-semibold text-[rgb(31,41,51)] text-right">{value}</span>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-orange-600 font-bold flex-shrink-0 mt-0.5">•</span>
      <span>{children}</span>
    </li>
  );
}

function Block({
  num,
  time,
  title,
  note,
  children,
}: {
  num: number;
  time: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] overflow-hidden break-inside-avoid">
      <div className="bg-[rgb(0,94,184)] text-white px-6 py-4">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <h3 className="font-black text-lg md:text-xl">
            Bloque {num}. {title}
          </h3>
          <span className="text-sm font-mono bg-white/20 px-3 py-1 rounded-full">{time}</span>
        </div>
        {note && <p className="text-sm text-blue-100 italic mt-1">{note}</p>}
      </div>
      <div className="p-6 space-y-3 text-[rgb(31,41,51)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Direction({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-900">
      <strong>🎯 Dirección:</strong> {children}
    </div>
  );
}

function AltHooks() {
  return (
    <div className="mt-4 bg-[rgb(232,237,238)] rounded-xl p-4 text-sm">
      <p className="font-bold text-[rgb(31,41,51)] mb-2">Alternativas de hook (elige el más natural):</p>
      <div className="space-y-2">
        <div>
          <p className="font-semibold text-[rgb(0,94,184)]">A. Directo (el que propongo arriba)</p>
        </div>
        <div>
          <p className="font-semibold text-[rgb(0,94,184)]">B. Problema primero:</p>
          <p className="italic">
            &ldquo;Cuando un padre o una madre mayor empieza a perder fuerza en las piernas, la familia entera entra
            en una espiral de preocupación. Te cuento por qué, y qué se puede hacer.&rdquo;
          </p>
        </div>
        <div>
          <p className="font-semibold text-[rgb(0,94,184)]">C. Caso real primero:</p>
          <p className="italic">
            &ldquo;A Tino le diagnosticaron hace un año que iba a perder la capacidad de caminar. Hoy tiene 96
            años y sube escaleras sin ayuda. Voy a contarte cómo lo conseguimos.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
