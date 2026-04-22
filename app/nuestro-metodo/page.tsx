"use client";

import { useState } from 'react';
import { Phone, Play, Award, Clock, Home, Target, ChevronDown, MessageCircle } from 'lucide-react';
import { useWizard } from '@/components/WizardWhatsApp';

// =============================================================================
// CONFIG — cuando Fernando suba el vídeo a YouTube, cambiar este ID.
// Ej: si la URL es https://www.youtube.com/watch?v=ABC123xyz, el ID es ABC123xyz
// =============================================================================
const YOUTUBE_VIDEO_ID = ''; // ← PEGA AQUÍ EL ID CUANDO EL VÍDEO ESTÉ SUBIDO

export default function NuestroMetodoPage() {
  const { open: openWizard } = useWizard();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const hasVideo = YOUTUBE_VIDEO_ID.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-[rgb(0,60,115)] via-[rgb(0,94,184)] to-[rgb(32,113,188)] pt-28 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
            <Play className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-semibold text-white">Vídeo de 7 minutos</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Mira esto antes de contactar
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            En 7 minutos te explico quién soy, cómo trabajo, qué cuesta y en qué casos no soy la mejor opción.
            Para que decidas con información real, sin presión.
          </p>
        </div>
      </section>

      {/* Video principal */}
      <section className="w-full bg-gradient-to-b from-[rgb(32,113,188)] via-[rgb(0,94,184)] to-[rgb(232,237,238)] px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
            {hasVideo ? (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                title="Nuestro método - ANTEA Salud"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center bg-gradient-to-br from-[rgb(0,60,115)] to-[rgb(0,40,80)]">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white/60 fill-white/60" />
                </div>
                <p className="text-xl md:text-2xl font-bold mb-2">Vídeo en grabación</p>
                <p className="text-sm md:text-base text-white/70 max-w-md">
                  Estamos preparando el vídeo de presentación. Mientras tanto, puedes ver los precios y solicitar
                  una valoración gratuita más abajo.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Resumen rápido debajo del vídeo (para quien no lo vea entero) */}
      <section className="w-full bg-[rgb(232,237,238)] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center text-[rgb(31,41,51)] mb-8">
            Resumen de lo que explico en el vídeo
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <SummaryCard
              icon={Award}
              title="Quién soy"
              text="Graduado en Ciencias del Deporte. 14 años trabajando exclusivamente con personas mayores en Madrid. No soy fisioterapeuta — soy entrenador especializado."
            />
            <SummaryCard
              icon={Home}
              title="Cómo trabajo"
              text="Voy a tu casa. Sesiones de 30 minutos, normalmente 2 días por semana. Ejercicio adaptado a lo que cada persona puede hacer: fuerza, equilibrio, movilidad."
            />
            <SummaryCard
              icon={Target}
              title="Qué consigo"
              text="Parar el deterioro y revertirlo en la mayoría de casos. En 4-6 semanas ya se nota. En 3 meses la gente hace cosas que creía perdidas."
            />
            <SummaryCard
              icon={Clock}
              title="Qué NO hago"
              text="No soy fisioterapeuta. No hago masajes ni tratamientos manuales. No prometo milagros. Si quieres tratamiento médico, busca un fisio. Para ejercicio serio y constante, soy tu profesional."
            />
          </div>
        </div>
      </section>

      {/* Caso real: Tino */}
      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[rgb(191,231,249)] to-[rgb(232,237,238)] rounded-3xl p-8 md:p-10 border-l-4 border-[rgb(0,94,184)]">
            <p className="text-sm font-bold text-[rgb(0,94,184)] uppercase tracking-wide mb-4">
              Caso real
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-[rgb(31,41,51)] mb-6">
              Tino, 96 años
            </h2>
            <div className="space-y-4 text-[rgb(31,41,51)] text-lg leading-relaxed">
              <p>
                Cuando empecé con Tino, había perdido casi toda la capacidad de caminar y subir escaleras.
                Cada semana iba un poco peor que la anterior. La familia estaba desesperada.
              </p>
              <p>
                Antes de llamarme, habían probado con un <strong>fisioterapeuta que les cobraba una pasta</strong> cada
                semana. Mejoraba algo, sí, pero no mucho. Y la factura no paraba de subir.
              </p>
              <p className="font-bold text-[rgb(0,94,184)] text-xl">
                &ldquo;Le hago moverse de verdad.&rdquo;
              </p>
              <p>
                Hoy Tino camina por su casa sin ayuda, sube escaleras, y ha recuperado la confianza. Su familia
                me dice que es la mejor inversión que han hecho por él.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Precios claros */}
      <section className="w-full bg-[rgb(232,237,238)] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[rgb(31,41,51)]">
              Precios sin letra pequeña
            </h2>
            <p className="text-[rgb(130,131,130)] mt-2">
              Sin cuotas de alta, sin permanencia, sin sorpresas
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-[rgb(200,207,210)] p-8 space-y-4">
            <PriceRow label="Sesión suelta (30 min)" price="55€" />
            <PriceRow label="Plan 2 días por semana" price="90€/semana" note="45€/sesión" highlight />
            <PriceRow label="Recargo desplazamiento fuera de Madrid capital" price="+10€/sesión" small />
            <div className="border-t border-[rgb(232,237,238)] pt-4 mt-4">
              <PriceRow label="Primera valoración" price="GRATIS" free />
            </div>
          </div>

          <p className="text-xs text-center text-[rgb(130,131,130)] mt-4">
            Cubrimos Madrid capital y municipios hasta 22 km (Móstoles, Getafe, Leganés, Pozuelo, Alcobendas y más)
          </p>
        </div>
      </section>

      {/* FAQs de objeciones */}
      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center text-[rgb(31,41,51)] mb-10">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={expandedFaq === i}
                onToggle={() => setExpandedFaq(expandedFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="w-full bg-gradient-to-br from-[rgb(0,94,184)] to-[rgb(0,60,115)] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Si encajas con lo que has visto, aquí empieza
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            4 preguntas cortas, 30 segundos. Te confirmamos la fecha de la primera valoración gratuita
            en tu casa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={openWizard}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[rgb(0,94,184)] font-black text-lg md:text-xl rounded-2xl shadow-2xl hover:scale-105 transition"
            >
              <MessageCircle className="w-6 h-6" /> Solicitar valoración gratuita
            </button>
            <a
              href="tel:+34633261963"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-transparent text-white border-2 border-white/40 font-bold rounded-2xl hover:bg-white/10 transition"
            >
              <Phone className="w-5 h-5" /> 633 261 963
            </a>
          </div>

          <p className="text-sm text-blue-200 mt-6">
            Sin compromiso · Sin pago por adelantado · Respuesta en menos de 24h
          </p>
        </div>
      </section>
    </>
  );
}

// =============================================================================
// SUBCOMPONENTES
// =============================================================================

function SummaryCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-[rgb(200,207,210)]">
      <div className="w-11 h-11 rounded-xl bg-[rgb(0,94,184)] flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-bold text-[rgb(31,41,51)] mb-2">{title}</h3>
      <p className="text-[rgb(130,131,130)] leading-relaxed">{text}</p>
    </div>
  );
}

function PriceRow({
  label,
  price,
  note,
  highlight,
  free,
  small,
}: {
  label: string;
  price: string;
  note?: string;
  highlight?: boolean;
  free?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 p-4 rounded-xl ${
        highlight
          ? 'bg-[rgb(191,231,249)] border-2 border-[rgb(0,94,184)]'
          : small
          ? 'bg-orange-50'
          : 'bg-[rgb(232,237,238)]'
      }`}
    >
      <div>
        <p className={`font-semibold ${small ? 'text-sm' : 'text-base md:text-lg'} text-[rgb(31,41,51)]`}>
          {label}
        </p>
        {note && <p className="text-xs text-[rgb(130,131,130)] mt-0.5">{note}</p>}
      </div>
      <span
        className={`font-black whitespace-nowrap ${
          free ? 'text-green-600 text-xl' : small ? 'text-orange-700 text-base' : 'text-[rgb(0,94,184)] text-xl md:text-2xl'
        }`}
      >
        {price}
      </span>
    </div>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border-2 transition ${
        isOpen ? 'border-[rgb(0,94,184)] bg-[rgb(191,231,249)]' : 'border-[rgb(200,207,210)] bg-white'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-bold text-[rgb(31,41,51)] pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180 text-[rgb(0,94,184)]' : 'text-[rgb(130,131,130)]'
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-[rgb(31,41,51)] leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// FAQS
// =============================================================================

const FAQS = [
  {
    question: '¿Realmente la primera valoración es gratis?',
    answer:
      'Sí. Voy a tu casa, hablo con tu familiar, hacemos una pequeña valoración funcional (fuerza, equilibrio, movilidad) y te explico qué se puede trabajar y en cuánto tiempo. Sin compromiso ni pago. Si decides que no encajamos, no pagas nada.',
  },
  {
    question: '¿Qué material se necesita en casa?',
    answer:
      'Nada especial. Una silla firme, un poco de espacio en el salón y ropa cómoda. Llevo yo lo que haga falta (banda elástica, conos de equilibrio, etc.).',
  },
  {
    question: '¿Puede hacer ejercicio una persona con artrosis, diabetes o cardiopatía?',
    answer:
      'En la mayoría de casos sí, pero adaptamos todo al diagnóstico. Si tiene una condición médica importante, pedimos que hable con su médico antes. Y si es necesario, coordinamos el trabajo con su fisioterapeuta o cardiólogo.',
  },
  {
    question: '¿Cuánto tiempo hasta ver resultados?',
    answer:
      'En 4-6 semanas se notan cambios claros: más fuerza al levantarse, más seguridad al caminar. En 3 meses la gente recupera movimientos que creía perdidos. No son milagros, es constancia bien dirigida.',
  },
  {
    question: '¿Qué pasa si la primera valoración no me convence?',
    answer:
      'No pasa nada. No pagas, no hay compromiso, no hay insistencia. Prefiero que te vayas sin contratar a que te sientas presionado. Si no es lo que buscas, mejor saberlo los dos desde el principio.',
  },
  {
    question: '¿Puedo anular o cambiar una sesión?',
    answer:
      'Sí. Si me avisas con 24h de antelación, no hay problema, la movemos a otro día. Lo único que pido es respeto al tiempo: si se cancelan muchas sin avisar, el plan deja de tener sentido.',
  },
  {
    question: '¿En qué zonas trabajas?',
    answer:
      'Madrid capital (sin recargo) y municipios de la Comunidad de Madrid hasta 22 km del centro: Móstoles, Fuenlabrada, Getafe, Leganés, Alcorcón, Pozuelo, Las Rozas, Majadahonda, Alcobendas, Torrejón y más. En estas zonas se añade +10€/sesión por desplazamiento.',
  },
  {
    question: '¿Cómo se paga?',
    answer:
      'Pago por sesión suelta o mensual proporcional. Aceptamos Bizum, transferencia o efectivo. No trabajamos con domiciliaciones bancarias.',
  },
];
