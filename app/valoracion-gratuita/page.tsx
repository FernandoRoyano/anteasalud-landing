import type { Metadata } from 'next';
import { Check, Clock, HeartPulse, Home, ShieldCheck } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import LandingCTA from '@/components/landing/LandingCTA';
import { SITE_URL, buildMetadata, buildServiceSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { LandingArticles } from '@/components/landing/LandingSections';

const URL = `${SITE_URL}/valoracion-gratuita`;
const DESCRIPTION =
  'Primera valoración gratuita en casa: equilibrio, marcha y fuerza de tu familiar, con un plan claro y sin compromiso. Respuesta en menos de 24 h.';

// Revalida para incluir artículos nuevos en «Guías para familias»
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Valoración funcional gratuita a domicilio en Madrid',
  description: DESCRIPTION,
  path: '/valoracion-gratuita',
});

const jsonLd = buildServiceSchema({
  name: 'Valoración funcional gratuita a domicilio',
  description: DESCRIPTION,
  path: '/valoracion-gratuita',
  areaServed: ['Madrid', 'Comunidad de Madrid'],
});


const incluye = [
  {
    icon: HeartPulse,
    title: 'Evaluación funcional completa',
    text: 'Fuerza, equilibrio, movilidad y resistencia. Identificamos puntos fuertes y áreas a trabajar.',
  },
  {
    icon: ShieldCheck,
    title: 'Análisis del riesgo de caídas',
    text: 'Test específicos para detectar el riesgo y diseñar un plan de prevención adaptado.',
  },
  {
    icon: Home,
    title: 'Revisión del entorno',
    text: 'Comprobamos espacios de la casa para asegurar que el ejercicio se hace con total seguridad.',
  },
  {
    icon: Clock,
    title: 'Plan personalizado sin compromiso',
    text: 'Te entregamos una propuesta de trabajo a medida. Decides tú si quieres continuar.',
  },
];

const faqs = [
  {
    q: '¿Es realmente gratis y sin compromiso?',
    a: 'Sí. La primera valoración a domicilio en Madrid es gratuita y sin ningún compromiso de contratación. Si después decides no continuar, no pasa nada.',
  },
  {
    q: '¿Cuánto dura la valoración?',
    a: 'Entre 45 y 60 minutos. El tiempo justo para conocer el estado funcional, hablar de objetivos y resolver dudas.',
  },
  {
    q: '¿En qué zonas hacéis la valoración a domicilio?',
    a: 'Madrid capital y municipios de la Comunidad de Madrid. Algunas zonas más lejanas pueden tener un pequeño recargo de desplazamiento (10€).',
  },
  {
    q: '¿Quién hace la valoración?',
    a: 'Fernando Royano, Graduado en Ciencias de la Actividad Física y del Deporte (CCAFYD) con 14 años como entrenador personal a domicilio, especializado en personas mayores.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function ValoracionGratuitaPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqSchema} />
      <BreadcrumbSchema items={[
        { name: 'Inicio', url: SITE_URL },
        { name: 'Valoración gratuita', url: URL },
      ]} />

      {/* HERO + FORMULARIO */}
      <section className="relative w-full bg-gradient-to-br from-[rgb(191,231,249)] via-white to-[rgb(232,237,238)] px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
              <Check className="w-4 h-4 text-[rgb(0,94,184)]" />
              <span className="text-sm font-semibold text-[rgb(0,94,184)]">
                100% gratis · Sin compromiso · A domicilio
              </span>
            </div>

            <h1 className="font-display text-fluid-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Valoración gratuita
              <span className="block text-[rgb(0,94,184)] mt-2">para mayores en Madrid</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Un entrenador titulado va a casa, evalúa fuerza, equilibrio y movilidad, y te entrega un plan personalizado. Sin compromiso. Respuesta en menos de 24 horas.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                'Visita gratis a domicilio en Madrid',
                'Evaluación funcional completa y test de caídas',
                'Plan de trabajo personalizado por escrito',
                '14 años como entrenador, especializado en mayores',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[rgb(0,94,184)] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-display text-fluid-3xl font-black text-[rgb(31,41,51)]">
              ¿Qué incluye la valoración gratuita?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              No es una llamada comercial. Es una visita real a domicilio con evaluación funcional, igual que la primera sesión de un servicio de pago.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {incluye.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-[rgb(247,249,250)] rounded-2xl p-6 border border-[rgb(232,237,238)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgb(191,231,249)] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[rgb(0,94,184)]" />
                </div>
                <h3 className="text-lg font-bold text-[rgb(31,41,51)] mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[rgb(247,249,250)] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-fluid-3xl font-black text-[rgb(31,41,51)] text-center mb-12">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white rounded-2xl p-6 border border-[rgb(232,237,238)] hover:border-[rgb(0,94,184)] transition"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-bold text-[rgb(31,41,51)] pr-4">{q}</span>
                  <span className="text-[rgb(0,94,184)] text-2xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LandingArticles title="Qué valoramos y por qué" topics={/valoraci|sppb|tests|fragilidad/i} />

      <LandingCTA
        title="¿Listo para empezar?"
        subtitle="Solicita tu valoración gratuita ahora y recibe tu plan personalizado en menos de 24 horas."
        related={[
          { href: '/ejercicio-personas-mayores-madrid', label: 'Ejercicio para personas mayores en Madrid' },
          { href: '/prevencion-caidas-mayores-madrid', label: 'Prevención de caídas' },
          { href: '/recuperar-autonomia-mayores-madrid', label: 'Recuperar autonomía' },
        ]}
      />
    </>
  );
}
