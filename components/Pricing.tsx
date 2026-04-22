"use client";

// components/Pricing.tsx
import { Check, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

export default function Pricing() {
  const headerRef = useScrollAnimation();
  const cardsRef = useScrollAnimation({ stagger: ".pricing-card", staggerDelay: 0.15, y: 80 });

  return (
    <section id="precios" className="w-full bg-[rgb(232,237,238)] py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Precios claros</span>
          </div>
          <h2 className="font-display text-fluid-4xl font-black tracking-tight text-[rgb(31,41,51)]">
            Simple y sin complicaciones
          </h2>
          <p className="text-xl text-[rgb(130,131,130)] max-w-2xl mx-auto">
            Sesiones de 30 minutos adaptadas al ritmo de cada persona. Sin permanencia.
          </p>
        </div>

        {/* Pricing cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">

          {/* Opción 1: Sesión suelta */}
          <div className="pricing-card bg-white rounded-3xl p-8 shadow-lg border-2 border-[rgb(200,207,210)] hover:border-[rgb(0,94,184)] transition-all">
            <h3 className="text-xl font-bold text-[rgb(31,41,51)] mb-2">
              Sesión suelta
            </h3>
            <p className="text-[rgb(130,131,130)] text-sm mb-6">
              Para probar o puntualmente
            </p>

            <div className="mb-6">
              <span className="text-5xl font-black text-[rgb(0,94,184)]">55€</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <Check className="w-4 h-4 text-[rgb(0,94,184)] flex-shrink-0" />
                1 sesión de 30 minutos
              </li>
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <Check className="w-4 h-4 text-[rgb(0,94,184)] flex-shrink-0" />
                Profesional titulado
              </li>
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <Check className="w-4 h-4 text-[rgb(0,94,184)] flex-shrink-0" />
                En tu domicilio
              </li>
            </ul>

            <a
              href="#contacto"
              className="block w-full text-center py-4 rounded-xl font-bold bg-[rgb(232,237,238)] text-[rgb(31,41,51)] hover:bg-[rgb(200,207,210)] transition-all"
            >
              Reservar
            </a>
          </div>

          {/* Opción 2: 2 días por semana (DESTACADO) */}
          <div className="pricing-card relative bg-gradient-to-b from-[rgb(0,94,184)] to-[rgb(0,60,115)] rounded-3xl p-8 shadow-2xl text-white md:scale-105 z-10">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-white text-[rgb(0,94,184)] text-sm font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                Mejor precio
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              2 días por semana
            </h3>
            <p className="text-white/80 text-sm mb-6">
              El ritmo ideal para ver resultados
            </p>

            <div className="mb-2">
              <span className="text-5xl font-black text-white">90€</span>
              <span className="text-white/80"> / semana</span>
            </div>
            <p className="text-sm mb-6">
              <span className="bg-white/20 px-2 py-1 rounded text-white font-semibold">45€/sesión · Ahorras 20€</span>
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-white/90">
                <Check className="w-4 h-4 text-white flex-shrink-0" />
                2 sesiones semanales
              </li>
              <li className="flex items-center gap-3 text-sm text-white/90">
                <Check className="w-4 h-4 text-white flex-shrink-0" />
                Plan personalizado
              </li>
              <li className="flex items-center gap-3 text-sm text-white/90">
                <Check className="w-4 h-4 text-white flex-shrink-0" />
                Seguimiento de evolución
              </li>
              <li className="flex items-center gap-3 text-sm text-white/90">
                <Check className="w-4 h-4 text-white flex-shrink-0" />
                Sin permanencia
              </li>
            </ul>

            <a
              href="#contacto"
              className="block w-full text-center py-4 rounded-xl font-bold bg-white text-[rgb(0,94,184)] hover:bg-[rgb(232,237,238)] transition-all"
            >
              Empezar ahora
            </a>
          </div>

          {/* Opción 3: Pack Personalizado */}
          <div className="pricing-card bg-white rounded-3xl p-8 shadow-lg border-2 border-[rgb(200,207,210)] hover:border-[rgb(0,94,184)] transition-all">
            <h3 className="text-xl font-bold text-[rgb(31,41,51)] mb-2">
              Pack personalizado
            </h3>
            <p className="text-[rgb(130,131,130)] text-sm mb-6">
              Adaptado a tus necesidades
            </p>

            <div className="mb-6">
              <span className="text-4xl font-black text-[rgb(0,94,184)]">A medida</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <Check className="w-4 h-4 text-[rgb(0,94,184)] flex-shrink-0" />
                Frecuencia a tu ritmo
              </li>
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <Check className="w-4 h-4 text-[rgb(0,94,184)] flex-shrink-0" />
                Sesiones de 30 o 60 min
              </li>
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <Check className="w-4 h-4 text-[rgb(0,94,184)] flex-shrink-0" />
                Intensivo o mantenimiento
              </li>
            </ul>

            <a
              href="https://wa.me/34633261963?text=Hola,%20me%20gustaría%20un%20plan%20personalizado%20de%20ANTEA%20Salud"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 rounded-xl font-bold bg-[rgb(232,237,238)] text-[rgb(31,41,51)] hover:bg-[rgb(200,207,210)] transition-all"
            >
              Consultar
            </a>
          </div>

        </div>

        {/* Aviso de recargo por desplazamiento */}
        <div className="max-w-3xl mx-auto bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-lg">€</span>
            </div>
            <div>
              <h4 className="font-bold text-[rgb(31,41,51)] mb-1">Recargo por desplazamiento</h4>
              <p className="text-sm text-[rgb(31,41,51)]">
                <strong>Madrid capital:</strong> sin recargo. <br />
                <strong>Resto de la Comunidad de Madrid</strong> (Móstoles, Leganés, Getafe, Pozuelo, Alcobendas, Torrejón...): <strong className="text-orange-700">+10€ por sesión</strong> para cubrir el desplazamiento.
              </p>
            </div>
          </div>
        </div>

        {/* Garantía */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-[rgb(191,231,249)] px-6 py-3 rounded-full">
            <ShieldCheck className="w-6 h-6 text-[rgb(0,94,184)]" />
            <p className="text-[rgb(0,94,184)] font-semibold text-sm md:text-base">
              Si la primera sesión no te convence, te devolvemos el dinero
            </p>
          </div>

          <p className="text-[rgb(130,131,130)]">
            ¿Dudas? Llámanos al <a href="tel:+34633261963" className="text-[rgb(0,94,184)] font-semibold hover:underline">633 261 963</a>
          </p>
        </div>

      </div>
    </section>
  );
}
