"use client";

import { Dumbbell, HeartPulse, ShieldCheck, BarChart3, Check } from 'lucide-react';
import { ReactNode } from 'react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

export default function Services() {
  const headerRef = useScrollAnimation();
  const gridRef = useScrollAnimation({ stagger: ".service-card", staggerDelay: 0.12 });

  const services: { icon: ReactNode; title: string; description: string; highlight: string }[] = [
    {
      icon: <Dumbbell className="w-10 h-10 text-[rgb(0,94,184)]" />,
      title: "Entrenamiento funcional",
      description: "Ejercicio pautado y supervisado para recuperar fuerza, equilibrio y movilidad en personas mayores.",
      highlight: "Planes personalizados"
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-[rgb(0,94,184)]" />,
      title: "Readaptación a domicilio",
      description: "Ejercicio adaptado en la vuelta a la actividad tras operaciones o caídas. Coordinado con tu fisioterapeuta médico si es necesario.",
      highlight: "Entrenador titulado"
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-[rgb(0,94,184)]" />,
      title: "Prevención de caídas",
      description: "Evaluación de riesgos en el hogar y ejercicios específicos para mejorar equilibrio y confianza.",
      highlight: "Seguridad garantizada"
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-[rgb(0,94,184)]" />,
      title: "Seguimiento personalizado",
      description: "Evaluación continua de progreso, ajuste de rutinas y coordinación con profesionales sanitarios.",
      highlight: "Evolución controlada"
    }
  ];

  return (
    <section id="servicios" className="w-full bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Nuestros servicios</span>
          </div>
          <h2 className="font-display text-fluid-4xl font-black tracking-tight text-[rgb(31,41,51)]">
            Ejercicio y readaptación para personas mayores
          </h2>
          <p className="text-xl text-[rgb(130,131,130)] max-w-2xl mx-auto">
            Soluciones profesionales diseñadas para recuperar movilidad, autonomía y confianza en casa
          </p>
        </div>

        {/* Grid de servicios */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-gradient-to-br from-[rgb(232,237,238)] to-[rgb(191,231,249)] rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-[rgb(200,207,210)] hover:border-[rgb(0,94,184)]"
            >
              {/* Icono */}
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Titulo */}
              <h3 className="text-xl font-bold text-[rgb(31,41,51)] mb-3">
                {service.title}
              </h3>

              {/* Descripción */}
              <p className="text-[rgb(130,131,130)] text-sm md:text-base leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Highlight */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[rgb(191,231,249)] rounded-full">
                <Check className="w-3.5 h-3.5 text-[rgb(0,94,184)]" />
                <span className="text-xs font-semibold text-[rgb(0,94,184)]">
                  {service.highlight}
                </span>
              </div>

              {/* Link/arrow hover */}
              <a href="#contacto" className="mt-6 flex items-center text-[rgb(0,94,184)] font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                <span>Más info</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
