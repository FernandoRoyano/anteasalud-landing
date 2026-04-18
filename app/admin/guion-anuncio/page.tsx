"use client";

import { Printer, Camera, Lightbulb, AlertTriangle, Heart } from 'lucide-react';

export default function GuionAnuncioPage() {
  const handlePrint = () => window.print();

  return (
    <div className="max-w-3xl mx-auto space-y-6 print:max-w-none print:space-y-4">
      {/* Header con botón imprimir (oculto al imprimir) */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)]">
            Guion del anuncio
          </h1>
          <p className="text-[rgb(130,131,130)] mt-1">
            3 versiones (15s / 20s / 25s) · estilo Randulfe · con mapa emocional
          </p>
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
          <ConfigRow label="Formato" value="Vertical 9:16 (móvil)" />
          <ConfigRow label="Plano" value="Medio corto (hombros arriba)" />
          <ConfigRow label="Duración" value="15s / 20s / 25s" />
          <ConfigRow label="Subtítulos" value="OBLIGATORIOS, quemados en vídeo" />
          <ConfigRow label="Primer segundo" value="Cara en cámara hablando. Sin intro" />
          <ConfigRow label="Audio" value="Micro lavalier" />
          <ConfigRow label="Luz" value="Natural, ventana enfrente" />
          <ConfigRow label="Ropa" value="Polo o camisa neutra" />
        </div>
      </section>

      {/* Marco emocional general */}
      <section className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
        <h2 className="text-xl font-black text-[rgb(31,41,51)] mb-3 flex items-center gap-2">
          <Heart className="w-5 h-5 text-orange-600" /> Emoción base del anuncio
        </h2>
        <p className="text-[rgb(31,41,51)] mb-3">
          No eres ni un colega ni un vendedor. Eres un{' '}
          <strong>médico de confianza que entra en el salón y da una noticia seria, pero con salida</strong>.
        </p>
        <ul className="space-y-2 text-[rgb(31,41,51)]">
          <Tip>Voz más baja de lo que hablas normal. Un 20% menos de energía</Tip>
          <Tip>Ritmo más lento. Los silencios entre frases también son emoción</Tip>
          <Tip>Cero sonrisa en los primeros 10 segundos. Aparece tarde y pequeña</Tip>
          <Tip>Cejas levemente fruncidas al principio. Se relajan al final</Tip>
        </ul>
        <div className="mt-4 bg-white rounded-xl p-4 border border-orange-200">
          <p className="text-sm text-[rgb(31,41,51)]">
            <strong>Truco para arrancar bien:</strong> antes de pulsar REC, piensa 20 segundos en un cliente
            real que viste en mal estado la primera vez. O en la cara de la hija de Tino cuando empezasteis.
            Eso te baja automáticamente al tono correcto. La cámara te pilla con esa cara — no tienes que
            &ldquo;actuar&rdquo; nada.
          </p>
        </div>
      </section>

      {/* VERSIÓN A */}
      <div className="space-y-5">
        <h2 className="text-2xl font-black text-[rgb(31,41,51)] mt-8 pt-4 border-t-2 border-[rgb(200,207,210)]">
          🎬 Versión A — 20 segundos (la más Randulfe)
        </h2>

        <LineBlock
          line="Tu padre se cae."
          emotion="Gravedad honesta"
          how="Le estás diciendo lo que él no se atreve a decir en voz alta"
          body="Mirada fija. Quieto. Sin sonrisa. Pausa después"
        />
        <LineBlock
          line="O se ha caído ya."
          emotion="Reconocimiento silencioso"
          how={'"Lo sé. Llevas meses pensándolo."'}
          body="Voz aún más baja. Leve cabeceo afirmativo"
        />
        <LineBlock
          line="Y tú andas todo el día pensando si debería irse a vivir contigo. Si ya no puede estar sola. Si esto es el principio del final."
          emotion="Empatía específica"
          how="Le lees el pensamiento. Has oído eso mil veces"
          body="Mirada se suaviza un punto. Respira entre las tres preguntas"
        />
        <LineBlock
          line="Mira, te lo digo claro."
          emotion="Corte. Cambio de marcha"
          how={'"Voy a dejarme de rodeos contigo"'}
          body="Ligero movimiento hacia adelante. La mirada se endurece"
        />
        <LineBlock
          line="En la mayoría de los casos, esto se revierte. Con el ejercicio adecuado. En su propia casa."
          emotion="Convicción profesional"
          how="Afirmas una verdad que sabes de oficio. No vendes, constatas"
          body={'Marca "se revierte" con peso. Primera media-sonrisa MUY leve'}
        />
        <LineBlock
          line="Voy yo. Treinta minutos. Dos días por semana."
          emotion="Calma y concreción"
          how={'"Esto es lo que hago. Simple."'}
          body={'Neutro. Hombros sueltos. Casi encogerlos: "es lo que hay"'}
        />
        <LineBlock
          line="La primera valoración es gratis."
          emotion="Mano tendida"
          how={'"Puedes probar sin perder nada"'}
          body="Expresión se abre. Media sonrisa breve"
        />
        <LineBlock
          line="Dale abajo."
          emotion="Invitación firme"
          how={'Como un amigo que te dice "ve, hazlo"'}
          body="Corta, seca, con algo de empuje. Pequeño movimiento de cabeza hacia abajo"
        />

        <EmotionalArc versions="🔽 peso → empatía → giro → 🔼 convicción → apertura" />
        <OnScreenText
          items={[
            { sec: '0s', text: 'TU PADRE SE CAE' },
            { sec: '12s', text: '30 MIN · 2 DÍAS A LA SEMANA · EN SU CASA' },
            { sec: '18s', text: 'VALORACIÓN GRATIS' },
          ]}
        />
      </div>

      {/* VERSIÓN B */}
      <div className="space-y-5">
        <h2 className="text-2xl font-black text-[rgb(31,41,51)] mt-8 pt-4 border-t-2 border-[rgb(200,207,210)]">
          🎬 Versión B — 25 segundos (pain + culpa)
        </h2>

        <LineBlock
          line="Tu padre ha dejado de bajar a comprar el pan."
          emotion="Observación silenciosa"
          how="Como quien cuenta un detalle pequeño que lo dice todo"
          body="Mirada fija. Voz baja"
        />
        <LineBlock
          line="No te lo ha dicho, pero le da miedo caerse."
          emotion="Complicidad triste"
          how="Sabes algo que el hijo no sabe. Voz más baja aún"
          body="Cejas levemente fruncidas. Pausa después"
        />
        <LineBlock
          line="Y cada semana que pasa sin hacer nada, pierde un poco más de fuerza en las piernas. Un poco más de cabeza. Un poco más de vida."
          emotion="Preocupación creciente"
          how='Cada "un poco más" pesa más que el anterior. NO aceleres: RALENTIZA'
          body="Cada frase más lenta y más baja que la anterior, como dejando caer piedras"
        />
        <LineBlock
          line="Esto tiene solución."
          emotion="Giro. Luz."
          how="Pausa larga antes. Es LA frase que lo cambia todo. Dila firme"
          body="Mirada directa. Ligera elevación de cabeza"
        />
        <LineBlock
          line="Pero no con paseos. Ni con pastillas. Ni esperando a que pase."
          emotion="Firmeza profesional"
          how={'"Ya has probado eso. No funciona." Sin enfado, solo claridad'}
          body="Ritmo seco. Una negación por frase"
        />
        <LineBlock
          line="Se arregla con ejercicio. Hecho bien. En su casa. Con alguien que sepa lo que hace con una persona de 80 años."
          emotion="Autoridad tranquila"
          how="No presumes. Describes"
          body="Pecho abierto, sin inflarte. Voz estable"
        />
        <LineBlock
          line="Ese soy yo. Fernando."
          emotion="Presentación serena"
          how="Sin sonrisa forzada. Te nombras como quien asume una responsabilidad"
          body="Leve pausa antes del nombre. Mirada firme"
        />
        <LineBlock
          line="La primera valoración no te cuesta nada. Pulsa abajo."
          emotion="Apertura + empuje"
          how="Aquí sí puede aparecer media sonrisa real"
          body="Expresión se abre. Cabeza ligeramente hacia abajo en el CTA"
        />

        <EmotionalArc versions="🔽 duelo contenido → ⚡ giro en 'esto tiene solución' → 🔼 autoridad → apertura" />
        <OnScreenText
          items={[
            { sec: '0s', text: 'YA NO BAJA A COMPRAR EL PAN' },
            { sec: '14s', text: 'ESTO TIENE SOLUCIÓN' },
            { sec: '22s', text: 'VALORACIÓN GRATIS · MADRID' },
          ]}
        />
      </div>

      {/* VERSIÓN C */}
      <div className="space-y-5">
        <h2 className="text-2xl font-black text-[rgb(31,41,51)] mt-8 pt-4 border-t-2 border-[rgb(200,207,210)]">
          🎬 Versión C — 15 segundos (corta, para test A/B)
        </h2>

        <LineBlock
          line="Si tu padre o tu madre mayor se cae, o tiene miedo de caerse, esto te interesa."
          emotion="Directo, serio, filtrando"
          how="No vendes todavía. Identificas a quién le hablas"
          body="Mirada fija. Ritmo medio"
        />
        <LineBlock
          line="No hace falta fisioterapeuta. No hace falta residencia."
          emotion="Alivio + firmeza"
          how="Quitas dos miedos grandes en dos frases. Los hijos llevan meses con esos miedos dentro"
          body="Dos negaciones secas. Leve alivio en la cara al final"
        />
        <LineBlock
          line="Hace falta ejercicio. Bien hecho. En su casa."
          emotion="Claridad profesional"
          how="Afirmación simple. Ritmo seco"
          body="Neutro, seguro"
        />
        <LineBlock
          line="Yo voy. Valoración gratis."
          emotion="Mano tendida, simple"
          how={'"Esto es lo que hay. Sin rodeos."'}
          body="Media sonrisa posible en 'valoración gratis'"
        />
        <LineBlock
          line="Dale abajo."
          emotion="Empuje firme"
          how="Cierre de dos palabras"
          body="Leve gesto hacia abajo con mirada"
        />

        <EmotionalArc versions="Tono de una pieza: serio-firme-cercano con micro-apertura al final" />
        <OnScreenText
          items={[
            { sec: '0s', text: '¿SE CAE? ¿TIENE MIEDO DE CAERSE?' },
            { sec: '8s', text: 'NO HACE FALTA RESIDENCIA' },
            { sec: '13s', text: 'VALORACIÓN GRATIS' },
          ]}
        />
      </div>

      {/* ERRORES QUE MATAN */}
      <section className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 break-inside-avoid">
        <h2 className="text-xl font-black text-[rgb(31,41,51)] mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" /> Los 5 errores emocionales que matan el anuncio
        </h2>
        <ol className="space-y-3 text-[rgb(31,41,51)]">
          <ErrorItem
            title="Sonreír en los primeros 5 segundos"
            detail="Estás hablando de caídas y miedo. Si sonríes, el mensaje no encaja y el cerebro del espectador pasa de largo"
          />
          <ErrorItem
            title='Hablar rápido porque "es un anuncio y son pocos segundos"'
            detail="Al revés: más lento que en conversación normal. La pausa carga de peso lo que dices"
          />
          <ErrorItem
            title="Levantar la voz en el CTA"
            detail={'"Dale abajo" no se grita. Se dice firme y bajo. Como quien cierra una conversación'}
          />
          <ErrorItem
            title='Cara de vendedor en "valoración gratis"'
            detail='Eso lo quema todo. Dilo como quien dice "toma, prueba". No como quien dice "¡APROVECHA!"'
          />
          <ErrorItem
            title="Actuar tristeza"
            detail="Lo peor. No eres un actor. Tú SABES lo que pasa porque lo has visto 14 años. Esa gravedad ya la tienes dentro — no la fabriques, recuérdala"
          />
        </ol>
      </section>

      {/* TEST ANTES DE GRABAR */}
      <section className="bg-[rgb(191,231,249)] rounded-2xl p-6 print:hidden break-inside-avoid">
        <h2 className="text-xl font-black text-[rgb(31,41,51)] mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[rgb(0,94,184)]" /> Test rápido antes de grabar
        </h2>
        <p className="text-[rgb(31,41,51)]">
          Graba un take de prueba con el móvil. Escúchalo <strong>con los ojos cerrados</strong>. Si al oírlo
          te da la sensación de <em>&ldquo;este tío entiende lo que me pasa&rdquo;</em> → bien. Si suena a{' '}
          <em>&ldquo;este tío me está vendiendo algo&rdquo;</em> → baja la energía un 30% y vuelve a grabar.
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

function LineBlock({
  line,
  emotion,
  how,
  body,
}: {
  line: string;
  emotion: string;
  how: string;
  body: string;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-md border border-[rgb(200,207,210)] overflow-hidden break-inside-avoid">
      <div className="px-6 pt-5 pb-4 border-b border-[rgb(232,237,238)]">
        <p className="text-lg md:text-xl font-bold text-[rgb(31,41,51)] leading-snug italic">
          &ldquo;{line}&rdquo;
        </p>
      </div>
      <div className="px-6 py-4 grid gap-2 text-sm">
        <Row label="Emoción" value={emotion} color="rgb(0,94,184)" bold />
        <Row label="Cómo accederla" value={how} />
        <Row label="Cuerpo / cara" value={body} />
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  color = 'rgb(31,41,51)',
  bold = false,
}: {
  label: string;
  value: string;
  color?: string;
  bold?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <span className="text-[rgb(130,131,130)] w-32 flex-shrink-0">{label}</span>
      <span
        className={bold ? 'font-bold' : ''}
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}

function EmotionalArc({ versions }: { versions: string }) {
  return (
    <div className="bg-[rgb(232,237,238)] rounded-xl p-4 border-l-4 border-[rgb(0,94,184)]">
      <p className="text-sm">
        <strong className="text-[rgb(0,94,184)]">Arco emocional:</strong>{' '}
        <span className="text-[rgb(31,41,51)]">{versions}</span>
      </p>
    </div>
  );
}

function OnScreenText({ items }: { items: { sec: string; text: string }[] }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-[rgb(200,207,210)]">
      <p className="text-sm font-bold text-[rgb(31,41,51)] mb-2">Texto en pantalla (subtítulos extra):</p>
      <ul className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.sec} className="flex gap-3">
            <span className="font-mono text-[rgb(0,94,184)] font-bold w-10 flex-shrink-0">
              {item.sec}
            </span>
            <span className="text-[rgb(31,41,51)]">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ErrorItem({ title, detail }: { title: string; detail: string }) {
  return (
    <li className="flex gap-3">
      <span className="text-red-600 font-black text-lg flex-shrink-0 leading-none mt-0.5">✗</span>
      <div>
        <p className="font-bold text-[rgb(31,41,51)]">{title}</p>
        <p className="text-sm text-[rgb(31,41,51)] mt-0.5">{detail}</p>
      </div>
    </li>
  );
}
