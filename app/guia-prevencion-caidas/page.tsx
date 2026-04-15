"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  Download,
  Check,
  AlertTriangle,
  Clock,
  Dumbbell,
  Loader2,
  Printer,
  Lock,
  ArrowRight,
} from 'lucide-react';

export default function GuiaPrevencionCaidasPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name.trim(),
          email: email.trim(),
          telefono: '',
          zona: '',
          interes: 'Descarga guía prevención caídas',
        }),
      });

      if (res.ok) {
        setUnlocked(true);
        // Scroll suave al contenido desbloqueado
        setTimeout(() => {
          document.getElementById('contenido-guia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Error al procesar la solicitud');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-[rgb(191,231,249)] via-white to-[rgb(232,237,238)] pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgb(0,94,184)] text-white rounded-full text-sm font-bold">
            <Download className="w-4 h-4" />
            Descarga gratuita
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            10 ejercicios para prevenir caídas en personas mayores
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            Guía práctica para familias. Los ejercicios que usamos en ANTEA Salud con nuestros clientes. Explicados paso a paso, con fotos y progresiones.
          </p>

          <p className="text-sm text-[rgb(130,131,130)]">
            Por Fernando Royano · Graduado en Ciencias del Deporte · 14 años especializado en mayores
          </p>
        </div>
      </section>

      {/* Beneficios */}
      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center text-[rgb(31,41,51)] mb-10">
            Qué vas a aprender en esta guía
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <BenefitItem text="Test rápido para saber si tu familiar está en riesgo de caídas" />
            <BenefitItem text="10 ejercicios explicados paso a paso, con progresiones" />
            <BenefitItem text="Cómo organizar una rutina semanal realista" />
            <BenefitItem text="Señales de alerta: cuándo hay que parar el ejercicio" />
            <BenefitItem text="Qué hacer antes de empezar (para no hacerle daño)" />
            <BenefitItem text="Cuándo es el momento de buscar ayuda profesional" />
          </div>
        </div>
      </section>

      {/* Form (si no está desbloqueado) */}
      {!unlocked && (
        <section className="w-full bg-[rgb(232,237,238)] py-16 px-4 print:hidden">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-[rgb(200,207,210)] p-8 md:p-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[rgb(0,94,184)] flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[rgb(31,41,51)] mb-2">
                  Accede gratis a la guía
                </h2>
                <p className="text-[rgb(130,131,130)]">
                  Déjanos tu nombre y email. Acceso inmediato, sin suscripciones ni spam.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1.5">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ej: María García"
                    className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] focus:ring-2 focus:ring-[rgb(191,231,249)] outline-none text-[rgb(31,41,51)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1.5">
                    Tu email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] focus:ring-2 focus:ring-[rgb(191,231,249)] outline-none text-[rgb(31,41,51)]"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !name.trim() || !email.trim()}
                  className="w-full py-4 bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition inline-flex items-center justify-center gap-2 disabled:opacity-60 text-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Procesando...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" /> Acceder a la guía gratis
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-[rgb(130,131,130)]">
                  Al enviar aceptas que te contactemos ocasionalmente con contenido relacionado. Sin spam. Darse de baja en cualquier momento.
                </p>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Contenido (visible cuando se desbloquea o al imprimir) */}
      <section
        id="contenido-guia"
        className={`w-full bg-white py-16 px-4 ${unlocked ? '' : 'hidden print:block'}`}
      >
        <div className="max-w-3xl mx-auto">
          {/* Barra de acciones */}
          {unlocked && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-10 flex items-center justify-between flex-wrap gap-3 print:hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-green-800">¡Listo! Ya tienes acceso.</p>
                  <p className="text-sm text-green-700">Puedes leerlo aquí o imprimirlo en PDF.</p>
                </div>
              </div>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[rgb(0,94,184)] text-white font-bold rounded-xl hover:bg-[rgb(32,113,188)] transition"
              >
                <Printer className="w-4 h-4" /> Imprimir / Guardar PDF
              </button>
            </div>
          )}

          {/* Portada */}
          <div className="text-center mb-14 pb-10 border-b border-[rgb(232,237,238)]">
            <p className="text-sm font-bold text-[rgb(0,94,184)] uppercase tracking-wide mb-3">
              Guía práctica · ANTEA Salud
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[rgb(31,41,51)] mb-4">
              10 ejercicios para prevenir caídas en personas mayores
            </h2>
            <p className="text-[rgb(130,131,130)]">
              Por Fernando Royano · Graduado en Ciencias del Deporte · 14 años de experiencia
            </p>
          </div>

          {/* Introducción */}
          <Section title="Por qué importa la prevención">
            <p>
              Una caída a los 70-80 años no es &ldquo;mala suerte&rdquo;: es el síntoma de una pérdida progresiva de fuerza, equilibrio y coordinación que <strong>se puede entrenar y revertir</strong>.
            </p>
            <p>
              Los números son duros: <strong>1 de cada 3 personas mayores de 65 años sufre al menos una caída al año</strong>. Muchas no tienen consecuencias, pero un porcentaje alto terminan en lesiones serias. Y el dato más doloroso: <strong>el 50% de las personas con fractura de cadera no recuperan su autonomía previa</strong>.
            </p>
            <p>
              La buena noticia: con ejercicio específico y constante, el riesgo de caídas se reduce entre un 30 y un 50%. Y mejor todavía: también mejora la confianza, la movilidad y la calidad de vida general.
            </p>
            <p>
              Esta guía está pensada para <strong>ti</strong> (hija, hijo, pareja, cuidador) para que puedas ayudar a tu familiar a trabajar los 10 ejercicios más efectivos que usamos en nuestras sesiones a domicilio.
            </p>
          </Section>

          {/* Aviso importante */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 my-10">
            <div className="flex gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <h3 className="text-lg font-bold text-orange-900">Antes de empezar (importante)</h3>
            </div>
            <ul className="space-y-2 text-slate-700 pl-9">
              <li>• Si tu familiar ha tenido una <strong>caída reciente</strong>, una <strong>operación</strong> o tiene patologías graves, consulta antes con su médico.</li>
              <li>• Siempre con <strong>apoyo cercano</strong>: silla firme, mesa, pared.</li>
              <li>• Si aparece <strong>dolor</strong> en cualquier ejercicio, parar inmediatamente.</li>
              <li>• Empezar <strong>despacio</strong>: 3-4 repeticiones y progresar semana a semana.</li>
              <li>• Mejor <strong>30 minutos bien hechos</strong> que 1 hora con prisa.</li>
            </ul>
          </div>

          {/* Test de riesgo */}
          <Section title="Test rápido: ¿tu familiar está en riesgo?">
            <p>Marca las que apliquen a tu familiar:</p>
            <ul className="space-y-3 my-5 pl-0 list-none">
              {TEST_PREGUNTAS.map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 border-2 border-[rgb(200,207,210)] rounded flex-shrink-0 mt-1"></div>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <div className="bg-[rgb(191,231,249)] rounded-xl p-5 mt-6">
              <p className="text-sm">
                <strong className="text-[rgb(0,94,184)]">Si marcas 2 o más:</strong> tu familiar está en zona de riesgo. Empieza con estos ejercicios ya.
              </p>
              <p className="text-sm mt-2">
                <strong className="text-red-700">Si marcas 4 o más:</strong> el riesgo es alto. Considera una valoración profesional.
              </p>
            </div>
          </Section>

          {/* Los 10 ejercicios */}
          <div className="mt-14 mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-[rgb(31,41,51)] mb-2">
              Los 10 ejercicios
            </h3>
            <p className="text-[rgb(130,131,130)]">
              Ordenados de más fáciles a más avanzados. Empieza por los primeros.
            </p>
          </div>

          {EJERCICIOS.map((ejercicio, i) => (
            <EjercicioBlock key={i} index={i + 1} {...ejercicio} />
          ))}

          {/* Cómo organizar la rutina */}
          <Section title="Cómo organizar la rutina semanal">
            <div className="bg-[rgb(232,237,238)] rounded-2xl p-6 my-5 space-y-3">
              <p className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
                <span><strong>Frecuencia:</strong> 3 días por semana. Por ejemplo lunes, miércoles y viernes. Nunca dos días seguidos al principio.</span>
              </p>
              <p className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
                <span><strong>Duración:</strong> 15-20 minutos por sesión. Más tiempo no es mejor: puede causar fatiga y lesiones.</span>
              </p>
              <p className="flex items-start gap-3">
                <Dumbbell className="w-5 h-5 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
                <span><strong>Progresión:</strong> las primeras 2 semanas, 2 series de cada ejercicio. A partir de la 3ª semana, 3 series. Aumenta repeticiones cada 2-3 semanas.</span>
              </p>
              <p className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[rgb(0,94,184)] flex-shrink-0 mt-1" />
                <span><strong>Constancia &gt; intensidad:</strong> 15 minutos 3 veces por semana, 6 meses seguidos, dan más resultado que 1 hora al día durante 1 semana.</span>
              </p>
            </div>
          </Section>

          {/* Señales de alerta */}
          <Section title="Señales de alerta: cuándo parar">
            <p>Detén el ejercicio inmediatamente si aparece:</p>
            <ul className="space-y-2 my-5 pl-5 list-disc">
              <li>Dolor agudo en cualquier articulación</li>
              <li>Mareo, sensación de vértigo, náuseas</li>
              <li>Palpitaciones fuertes o irregulares</li>
              <li>Dificultad importante para respirar</li>
              <li>Pérdida de equilibrio sin poder agarrarse</li>
              <li>Debilidad en brazos o piernas que no desaparece</li>
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 mt-6">
              <p className="text-sm text-red-800">
                <strong>Importante:</strong> si estas señales son intensas o repetitivas, consulta con su médico antes de seguir. El ejercicio tiene que ser seguro, si no, no compensa.
              </p>
            </div>
          </Section>

          {/* Cuándo buscar ayuda */}
          <Section title="Cuándo es el momento de buscar ayuda profesional">
            <p>Esta guía te da las bases, pero hay situaciones en las que un profesional acelera mucho los resultados y garantiza la seguridad:</p>
            <ul className="space-y-2 my-5 pl-5 list-disc">
              <li>Ha tenido <strong>más de una caída en el último año</strong></li>
              <li>Tiene patologías como <strong>Parkinson, ictus o artrosis avanzada</strong></li>
              <li>No puede completar más de 3-4 ejercicios de esta guía sin ayuda</li>
              <li>Tiene <strong>miedo intenso</strong> que le impide hacer los ejercicios solo/a</li>
              <li>Ha perdido mucha fuerza tras una hospitalización o inmovilización larga</li>
              <li>Sufre dolores crónicos que empeoran con el movimiento</li>
            </ul>
          </Section>

          {/* CTA final */}
          <div className="bg-gradient-to-br from-[rgb(0,94,184)] to-[rgb(0,60,115)] rounded-3xl p-10 text-white text-center mt-14 print:hidden">
            <h3 className="text-2xl md:text-3xl font-black mb-4">¿Quieres que te ayudemos en persona?</h3>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              En ANTEA Salud vamos a tu casa en Madrid, hacemos una <strong>valoración gratuita</strong> de tu familiar y, si encaja, empezamos con un plan específico supervisado. Primera sesión sin compromiso.
            </p>
            <Link
              href="/prevencion-caidas-mayores-madrid"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[rgb(0,94,184)] font-black rounded-xl hover:scale-105 transition"
            >
              Más información <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Firma */}
          <div className="mt-10 pt-8 border-t border-[rgb(232,237,238)] text-center text-sm text-[rgb(130,131,130)]">
            <p>
              <strong className="text-[rgb(31,41,51)]">ANTEA Salud</strong> · Fernando Royano · Graduado en Ciencias de la Actividad Física y el Deporte
            </p>
            <p className="mt-1">Madrid · 633 261 963 · anteasalud.com</p>
          </div>
        </div>
      </section>
    </>
  );
}

// =============================================================================
// SUBCOMPONENTES
// =============================================================================

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[rgb(232,237,238)] rounded-xl">
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Check className="w-4 h-4 text-white" />
      </div>
      <p className="text-[rgb(31,41,51)]">{text}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-black text-[rgb(31,41,51)] mb-4">{title}</h3>
      <div className="text-lg text-slate-700 leading-relaxed space-y-4">{children}</div>
    </div>
  );
}

function EjercicioBlock({
  index,
  title,
  pasos,
  reps,
  porque,
}: {
  index: number;
  title: string;
  pasos: string[];
  reps: string;
  porque: string;
}) {
  return (
    <div className="my-8 p-6 md:p-8 bg-[rgb(232,237,238)] rounded-2xl border border-[rgb(200,207,210)]">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-[rgb(0,94,184)] text-white flex items-center justify-center flex-shrink-0 font-black text-xl">
          {index}
        </div>
        <h4 className="text-xl md:text-2xl font-black text-[rgb(31,41,51)] pt-2">{title}</h4>
      </div>

      <ol className="list-decimal pl-6 space-y-2 mb-4 text-slate-700">
        {pasos.map((paso, i) => (
          <li key={i}>{paso}</li>
        ))}
      </ol>

      <div className="grid md:grid-cols-2 gap-3 mt-5">
        <div className="bg-white rounded-xl p-4">
          <p className="text-xs font-bold text-[rgb(0,94,184)] uppercase tracking-wide mb-1">Repeticiones</p>
          <p className="text-sm text-slate-700">{reps}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-xs font-bold text-[rgb(0,94,184)] uppercase tracking-wide mb-1">Por qué funciona</p>
          <p className="text-sm text-slate-700">{porque}</p>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// CONTENIDO
// =============================================================================

const TEST_PREGUNTAS = [
  'Ha tenido una caída en los últimos 12 meses',
  'Necesita apoyarse en muebles para caminar por casa',
  'Tiene miedo a caerse',
  'Ha dejado de salir solo/a a la calle',
  'Le cuesta levantarse del sofá sin ayuda',
  'Ha perdido fuerza en las piernas en los últimos meses',
  'Arrastra los pies al caminar',
];

const EJERCICIOS = [
  {
    title: 'Levantarse de la silla',
    pasos: [
      'Sentado en una silla firme, con la espalda recta y los pies planos en el suelo.',
      'Cruza los brazos sobre el pecho (o apóyalos en las rodillas si hace falta).',
      'Levántate lentamente sin ayuda de las manos.',
      'Baja con control, sin dejarte caer de golpe.',
    ],
    reps: '5-10 repeticiones · 2-3 series',
    porque:
      'Fortalece cuádriceps y glúteos, los músculos clave para no caerse. Mejora la capacidad de levantarse solo del sofá, del baño o de la cama.',
  },
  {
    title: 'Marcha en el sitio con rodillas altas',
    pasos: [
      'De pie, junto a una mesa o silla para apoyarte si hace falta.',
      'Levanta una rodilla hasta la altura de la cadera, o lo más alto posible.',
      'Baja y alterna con la otra pierna.',
      'Mantén la postura erguida, mirando al frente.',
    ],
    reps: '20-30 segundos · 2-3 series',
    porque:
      'Activa los flexores de cadera, que suelen estar débiles y son los responsables de muchos tropiezos al no levantar lo suficiente el pie.',
  },
  {
    title: 'Apoyo sobre una pierna',
    pasos: [
      'De pie, con una mano apoyada en el respaldo de una silla.',
      'Levanta un pie del suelo unos 10 cm.',
      'Mantén el equilibrio durante 10-30 segundos.',
      'Cambia de pierna.',
      'Progresión: cuando te salga fácil, intenta soltar la mano.',
    ],
    reps: '3 intentos por lado · 2 series',
    porque:
      'El equilibrio estático es la base. Entrena el sistema propioceptivo y los estabilizadores del tobillo, que son los que evitan los traspiés.',
  },
  {
    title: 'Caminar en tándem (talón-punta)',
    pasos: [
      'De pie junto a una pared para apoyarte si hace falta.',
      'Pon un pie justo delante del otro, como si caminaras sobre una línea.',
      'Da 5-10 pasos hacia adelante con control.',
      'Vuelve al inicio caminando hacia atrás del mismo modo.',
    ],
    reps: '3-5 repeticiones · 2 series',
    porque:
      'Trabaja el equilibrio dinámico, que es el tipo de equilibrio que de verdad previene las caídas al caminar por la calle o al girar.',
  },
  {
    title: 'Elevaciones de talones',
    pasos: [
      'De pie, con los pies separados al ancho de caderas.',
      'Apoya las manos en el respaldo de una silla para equilibrio.',
      'Levanta los talones del suelo, poniéndote de puntillas.',
      'Baja con control, sin golpear.',
    ],
    reps: '10-15 repeticiones · 2-3 series',
    porque:
      'Fortalece los gemelos y el arco del pie, claves para amortiguar al caminar y para la estabilidad al girar o subir escaleras.',
  },
  {
    title: 'Elevaciones de punta del pie',
    pasos: [
      'Sentado o de pie con apoyo.',
      'Levanta las puntas de los pies del suelo, manteniendo los talones apoyados.',
      'Baja con control.',
    ],
    reps: '10-15 repeticiones · 2-3 series',
    porque:
      'Fortalece el tibial anterior, el músculo que levanta la punta del pie. Previene el "pie caído" que hace tropezar con alfombras y bordillos.',
  },
  {
    title: 'Semi-squats con apoyo',
    pasos: [
      'De pie frente a una silla, con los pies separados al ancho de caderas.',
      'Apoya las manos en el respaldo para equilibrio.',
      'Flexiona las rodillas y las caderas como si fueras a sentarte, pero sin llegar a tocar la silla.',
      'Baja solo hasta donde las rodillas permitan sin dolor.',
      'Sube empujando con los talones.',
    ],
    reps: '8-12 repeticiones · 2-3 series',
    porque:
      'Combina fuerza de piernas con control de cadera y rodilla. Es el ejercicio más transferible a la vida diaria.',
  },
  {
    title: 'Giros controlados',
    pasos: [
      'De pie, en un espacio abierto y despejado.',
      'Gira 180 grados dando pequeños pasos (4-5 pasos por giro).',
      'Párate, estabiliza, y gira los otros 180 grados.',
      'Si hace falta, puedes hacerlo cerca de una pared para apoyarte.',
    ],
    reps: '3-5 giros a cada lado · 2 series',
    porque:
      'El 50% de las caídas ocurren durante giros. Entrenar giros controlados es uno de los ejercicios más infravalorados y más efectivos.',
  },
  {
    title: 'Desplazamiento lateral con apoyo',
    pasos: [
      'De pie, con apoyo de una silla frente a ti.',
      'Da un paso lateral amplio con la pierna derecha.',
      'Lleva la izquierda al centro.',
      'Sigue 3-5 pasos a la derecha, y luego a la izquierda.',
    ],
    reps: '3-5 pasos en cada dirección · 2 series',
    porque:
      'Trabaja los estabilizadores laterales de la cadera (glúteo medio). Previene caídas laterales, que son las más frecuentes en mayores y causan fracturas de cadera.',
  },
  {
    title: 'Puente de glúteos (tumbado)',
    pasos: [
      'Tumbado boca arriba en la cama o en una colchoneta firme.',
      'Rodillas dobladas, pies apoyados en el suelo.',
      'Levanta la pelvis empujando con los talones.',
      'Mantén 3 segundos arriba, con los glúteos apretados.',
      'Baja con control.',
    ],
    reps: '8-12 repeticiones · 2-3 series',
    porque:
      'Activa los glúteos y el core. Son la base de la estabilidad al caminar y al levantarse. Además es un ejercicio seguro porque se hace tumbado.',
  },
];
