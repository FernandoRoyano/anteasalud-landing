"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll(".problem-anim");
      gsap.set(elements, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-accent-50 py-fluid-2xl px-4 overflow-hidden"
      style={{ paddingTop: 'clamp(5rem, 10vw, 10rem)', paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}
    >
      {/* Textura sutil */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto">
        {/* Eyebrow pequeño */}
        <p className="problem-anim text-fluid-xs font-semibold uppercase tracking-[0.25em] text-accent-dark mb-8">
          Si te suena familiar…
        </p>

        {/* Headline enorme */}
        <h2 className="problem-anim font-display font-black tracking-tight text-ink leading-[1.02] mb-12"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)' }}>
          Llega un momento en el que notas que{' '}
          <span className="relative inline-block">
            <span className="relative z-10">pierde movilidad</span>
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-[0.08em] h-[0.3em] bg-accent/35 -z-0"
            />
          </span>
          {' '}— y tú lo ves desde lejos.
        </h2>

        {/* Pasaje narrativo */}
        <div className="space-y-8 max-w-3xl">
          <p className="problem-anim text-fluid-xl text-ink/80 leading-[1.55]">
            Le cuesta levantarse del sofá, tiene miedo a caerse, ha perdido fuerza en las piernas.
            Vas a verle siempre que puedes, pero entre tu trabajo, los hijos y el día a día,{' '}
            <span className="font-semibold text-ink">te come la preocupación</span>.
          </p>

          <p className="problem-anim text-fluid-xl text-ink/80 leading-[1.55]">
            Sabes que necesita ejercicio <span className="font-semibold text-primary">adaptado y supervisado por un profesional</span>,
            pero no tienes tiempo de llevarlo cada semana a un centro. Y tampoco quieres que pierda más autonomía
            esperando <em className="text-ink/60">&quot;a ver qué pasa&quot;</em>.
          </p>

          {/* Cierre fuerte */}
          <div className="problem-anim pt-6 border-l-2 border-accent pl-6">
            <p className="font-display font-bold text-ink leading-tight"
               style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              Cada semana que pasa, la recuperación se vuelve más lenta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
