"use client";

import { Clock } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

export default function Process() {
  const headerRef = useScrollAnimation();
  const stepsRef = useScrollAnimation({ stagger: ".step-row", staggerDelay: 0.18, y: 60 });

  const steps = [
    {
      number: "01",
      title: "Valoración inicial",
      description: "Llamada gratuita y sin compromiso. Conocemos tu situación, necesidades y objetivos de recuperación.",
      time: "Menos de 24h",
    },
    {
      number: "02",
      title: "Plan personalizado",
      description: "Diseñamos un programa de ejercicio funcional y readaptación adaptado a las necesidades específicas.",
      time: "En 48h",
    },
    {
      number: "03",
      title: "Primera sesión",
      description: "El profesional va al domicilio. Evaluación completa y comienzo del programa de recuperación.",
      time: "En 48-72h",
    },
    {
      number: "04",
      title: "Seguimiento continuo",
      description: "Evaluación regular, ajuste de rutinas según evolución y coordinación con el médico si es necesario.",
      time: "Cada semana",
    },
  ];

  return (
    <section className="relative w-full bg-surface-alt overflow-hidden" style={{ paddingTop: 'clamp(5rem, 10vw, 10rem)', paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}>
      <div className="relative max-w-6xl mx-auto px-4">

        {/* Header editorial */}
        <div ref={headerRef} className="max-w-3xl mb-fluid-2xl" style={{ marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>
          <p className="text-fluid-xs font-semibold uppercase tracking-[0.25em] text-accent-dark mb-6">
            ¿Cómo funciona?
          </p>
          <h2 className="font-display font-black tracking-tight text-ink leading-[1.02] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Cuatro pasos. Sin trámites.
          </h2>
          <p className="text-fluid-xl text-muted leading-relaxed max-w-2xl">
            Desde la primera llamada hasta la recuperación, te acompañamos en cada paso.
          </p>
        </div>

        {/* Timeline vertical */}
        <div ref={stepsRef} className="relative">
          {/* Línea vertical (desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-[clamp(6rem,12vw,10rem)] top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent"
          />

          <div className="space-y-fluid-lg" style={{ rowGap: 'clamp(3rem, 6vw, 5rem)', display: 'flex', flexDirection: 'column' }}>
            {steps.map((step, index) => (
              <div key={index} className="step-row relative grid md:grid-cols-[clamp(10rem,22vw,18rem)_1fr] gap-6 md:gap-12 items-start">
                {/* Número gigante */}
                <div className="relative">
                  <span
                    className="font-display font-black text-primary/15 leading-none select-none block"
                    style={{ fontSize: 'clamp(5rem, 14vw, 11rem)' }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  {/* Dot en la línea (solo desktop) */}
                  <div className="hidden md:block absolute right-[-1.5rem] top-[calc(50%-0.5rem)] w-3 h-3 rounded-full bg-accent ring-4 ring-surface-alt" />
                </div>

                {/* Contenido */}
                <div className="pt-2 md:pt-6 max-w-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-fluid-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Paso {step.number}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                      <Clock className="w-3 h-3 text-accent-dark" strokeWidth={2.5} />
                      <span className="text-[0.7rem] font-semibold text-accent-dark">{step.time}</span>
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-ink mb-3 leading-tight"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                    {step.title}
                  </h3>
                  <p className="text-fluid-lg text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cierre sobrio */}
        <div className="mt-fluid-xl pt-12 border-t border-border text-center" style={{ marginTop: 'clamp(4rem, 8vw, 7rem)' }}>
          <p className="text-fluid-lg text-muted mb-6">
            ¿Tienes dudas? Te asesoramos sin compromiso.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold text-fluid-base rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Solicita valoración gratuita
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
