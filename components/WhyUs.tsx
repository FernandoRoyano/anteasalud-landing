"use client";

import { HeartPulse, Home, BarChart3, Clock, BadgePercent, TrendingUp, Check } from 'lucide-react';
import { ReactNode } from 'react';
import { useScrollAnimation, useCountUp } from '@/lib/useScrollAnimation';

export default function WhyUs() {
  const headerRef = useScrollAnimation();
  const gridRef = useScrollAnimation({ stagger: ".reason-card", staggerDelay: 0.1 });
  const statsRef = useCountUp();

  const reasons: { icon: ReactNode; title: string; description: string; highlight: string }[] = [
    {
      icon: <HeartPulse className="w-12 h-12 text-[rgb(0,94,184)]" />,
      title: "Profesionales titulados",
      description: "100% colegiados y especializados en personas mayores. Verificamos credenciales antes de trabajar con nosotros.",
      highlight: "Máxima seguridad"
    },
    {
      icon: <Home className="w-12 h-12 text-[rgb(0,94,184)]" />,
      title: "Ejercicio en tu casa",
      description: "Sin traslados, sin estrés. El profesional va a ti. Más cómodo, más seguro y más efectivo.",
      highlight: "Comodidad garantizada"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-[rgb(0,94,184)]" />,
      title: "Planes personalizados",
      description: "Cada persona es única. Diseñamos un programa adaptado a tu situación, objetivos y ritmo.",
      highlight: "Hecho para ti"
    },
    {
      icon: <Clock className="w-12 h-12 text-[rgb(0,94,184)]" />,
      title: "Flexibilidad horaria",
      description: "Elige cuándo y cuántas veces a la semana. Lunes a domingo, mañanas o tardes.",
      highlight: "Tú decides"
    },
    {
      icon: <BadgePercent className="w-12 h-12 text-[rgb(0,94,184)]" />,
      title: "Sin compromiso",
      description: "Valoración gratuita, sin obligación de contratar. Tú controlas tu plan y puedes cambiar cuando quieras.",
      highlight: "Libertad total"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[rgb(0,94,184)]" />,
      title: "Resultados reales",
      description: "Seguimiento continuo y evaluaciones regulares. Ves la evolución semana a semana.",
      highlight: "Progreso visible"
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">¿Por qué elegirnos?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Lo que nos diferencia
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            6 razones por las que +200 familias confían en ANTEA Salud
          </p>
        </div>

        {/* Grid 3 columnas */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="reason-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-[rgb(0,94,184)] group"
            >
              {/* Icono grande */}
              <div className="mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                {reason.icon}
              </div>

              {/* Titulo */}
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {reason.title}
              </h3>

              {/* Descripción */}
              <p className="text-slate-600 leading-relaxed mb-6">
                {reason.description}
              </p>

              {/* Highlight badge */}
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
                <Check className="w-4 h-4 text-[rgb(0,94,184)]" />
                <span className="text-sm font-bold text-[rgb(0,94,184)]">
                  {reason.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats comparativo */}
        <div ref={statsRef} className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-black mb-12 text-center">
            Números que hablan por sí solos
          </h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2" data-count="200" data-prefix="+">+0</div>
              <p className="text-blue-100">Familias atendidas</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2" data-count="97" data-suffix="%">0%</div>
              <p className="text-blue-100">Tasa de satisfacción</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2" data-count="4.9" data-suffix="★">0★</div>
              <p className="text-blue-100">Valoración media</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2" data-count="6" data-suffix=" años">0 años</div>
              <p className="text-blue-100">Experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
