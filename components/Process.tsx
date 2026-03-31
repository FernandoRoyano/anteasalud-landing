import { ClipboardList, FileText, Handshake, TrendingUp, Clock } from 'lucide-react';
import { ReactNode } from 'react';

export default function Process() {
  const steps: { number: string; title: string; description: string; icon: ReactNode; time: string }[] = [
    {
      number: "01",
      title: "Valoración inicial",
      description: "Llamada gratuita y sin compromiso. Conocemos tu situación, necesidades y objetivos de rehabilitación.",
      icon: <ClipboardList className="w-10 h-10 text-[rgb(0,94,184)]" />,
      time: "Menos de 24h"
    },
    {
      number: "02",
      title: "Plan personalizado",
      description: "Nuestro equipo diseña un programa de ejercicio y fisioterapia adaptado a tus necesidades específicas.",
      icon: <FileText className="w-10 h-10 text-[rgb(0,94,184)]" />,
      time: "En 48h"
    },
    {
      number: "03",
      title: "Primera sesión",
      description: "El profesional va a tu domicilio. Evaluación completa y comienzo del programa de recuperación.",
      icon: <Handshake className="w-10 h-10 text-[rgb(0,94,184)]" />,
      time: "En 48-72h"
    },
    {
      number: "04",
      title: "Seguimiento continuo",
      description: "Evaluación regular, ajuste de rutinas según evolución y coordinación con tu médico si es necesario.",
      icon: <TrendingUp className="w-10 h-10 text-[rgb(0,94,184)]" />,
      time: "Cada semana"
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[rgb(232,237,238)] to-white py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">¿Cómo funciona?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[rgb(31,41,51)]">
            4 pasos simples para empezar
          </h2>
          <p className="text-xl text-[rgb(130,131,130)] max-w-2xl mx-auto">
            Desde la primera llamada hasta tu recuperación, te acompañamos en cada paso
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Conectar pasos (línea visual) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-[60%] w-[calc(100%-60%)] h-1 bg-gradient-to-r from-[rgb(0,94,184)] to-transparent"></div>
              )}

              {/* Card del paso */}
              <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[rgb(200,207,210)] hover:border-[rgb(0,94,184)]">

                {/* Número circular */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white font-black text-2xl mb-6 shadow-lg">
                  {step.number}
                </div>

                {/* Icono grande */}
                <div className="mb-4">{step.icon}</div>

                {/* Titulo */}
                <h3 className="text-xl font-bold text-[rgb(31,41,51)] mb-3">
                  {step.title}
                </h3>

                {/* Descripción */}
                <p className="text-[rgb(130,131,130)] text-sm md:text-base leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Tiempo estimado */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[rgb(191,231,249)] rounded-full border border-[rgb(0,94,184)]/30">
                  <Clock className="w-3.5 h-3.5 text-[rgb(0,94,184)]" />
                  <span className="text-xs font-semibold text-[rgb(0,94,184)]">
                    {step.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA pequeño */}
        <div className="text-center pt-12 border-t border-[rgb(200,207,210)]">
          <p className="text-lg text-[rgb(130,131,130)] mb-6">
            ¿Tienes dudas? <span className="font-semibold text-[rgb(31,41,51)]">Nuestro equipo te asesorará sin compromiso</span>
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Solicita valoración gratuita
          </a>
        </div>
      </div>
    </section>
  );
}
