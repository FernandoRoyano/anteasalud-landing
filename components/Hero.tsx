"use client";

import Image from 'next/image';
import { Check, Phone, Star, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { opacity: 0, y: 30, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: 50, duration: 0.8 }, "-=0.3")
        .from(".hero-subtitle", { opacity: 0, y: 40, duration: 0.7 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 30, duration: 0.6, stagger: 0.15 }, "-=0.3")
        .from(".hero-social", { opacity: 0, x: -30, duration: 0.6 }, "-=0.2")
        .from(".hero-image", { opacity: 0, scale: 0.95, duration: 1 }, "-=0.8");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] flex items-center justify-center px-4 pt-24 pb-16 overflow-hidden bg-surface"
    >
      {/* Mesh gradient animado (azul + cálido) */}
      <div className="mesh-bg" aria-hidden="true" />
      {/* Ruido fino sobre el mesh */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Columna texto */}
        <div className="space-y-8">
          <div className="hero-badge badge-glow inline-flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur-sm rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-accent" strokeWidth={2.5} />
            <span className="text-fluid-sm font-semibold text-ink">
              Graduado en Ciencias del Deporte · 14 años de experiencia
            </span>
          </div>

          <h1 className="hero-title font-display font-black text-fluid-6xl text-ink leading-[1.02] tracking-tight">
            Ejercicio a domicilio para{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">personas mayores</span>
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-[0.08em] h-[0.28em] bg-accent/30 -z-0"
              />
            </span>
            <span className="block text-ink/70 font-semibold text-fluid-4xl mt-3">
              en Madrid
            </span>
          </h1>

          <p className="hero-subtitle text-fluid-xl text-muted leading-relaxed max-w-xl">
            Recupera autonomía, fuerza y confianza sin salir de casa.
            Entrenador titulado especializado en personas mayores, prevención de caídas y readaptación funcional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#contacto"
              className="hero-cta group inline-flex items-center justify-center gap-2 px-8 py-5 bg-primary hover:bg-primary-dark text-white font-semibold text-fluid-lg rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Solicita valoración gratuita
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="tel:+34633261963"
              className="hero-cta inline-flex items-center justify-center gap-2 px-8 py-5 bg-surface border border-border hover:border-accent text-ink hover:text-accent font-semibold text-fluid-lg rounded-2xl hover:shadow-md transition-all duration-300"
            >
              <Phone className="w-5 h-5" /> 633 261 963
            </a>
          </div>

          {/* Social proof real — estrellas + rating verificado */}
          <div className="hero-social flex items-center gap-4 pt-6 border-t border-border/60">
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map(i => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-accent text-accent"
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <div className="leading-tight">
              <p className="text-fluid-sm font-bold text-ink">
                4.9 · +200 familias en Madrid
              </p>
              <p className="text-fluid-xs text-muted">
                Valoraciones verificadas
              </p>
            </div>
          </div>
        </div>

        {/* Columna imagen */}
        <div className="hero-image relative h-[500px] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
          {/* Gradient overlay cálido sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/15 z-10 pointer-events-none" />
          <Image
            src="/hero-realistic.png"
            alt="Profesional de ANTEA cuidando a persona mayor"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Pill flotante con micro-insight */}
          <div className="absolute bottom-5 left-5 z-20 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface/95 backdrop-blur-sm shadow-lg">
            <span className="flex h-2 w-2 relative">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-fluid-sm font-semibold text-ink">
              Sesiones disponibles esta semana
            </span>
          </div>

          {/* Check flotante superior */}
          <div className="absolute top-5 right-5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/95 text-white text-fluid-xs font-semibold backdrop-blur-sm shadow-md">
            <Check className="w-3.5 h-3.5" strokeWidth={3} />
            Valoración gratuita
          </div>
        </div>
      </div>
    </section>
  );
}
