"use client";

import Image from 'next/image';
import { Check, Phone } from 'lucide-react';
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
    <section ref={sectionRef} className="relative w-full min-h-[85vh] bg-gradient-to-br from-[rgb(191,231,249)] via-white to-[rgb(232,237,238)] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Columna texto */}
        <div className="space-y-8">
          <div className="hero-badge inline-flex items-center gap-1.5 px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <Check className="w-4 h-4 text-[rgb(0,94,184)]" />
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Profesionales titulados</span>
          </div>

          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Ejercicio y fisioterapia para mejorar la vida de los mayores
            <span className="block text-[rgb(0,94,184)] mt-2">en casa</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl">
            Recupera autonomía, fuerza y confianza sin salir de casa.
            Profesionales expertos en personas mayores y recuperación funcional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#contacto"
              className="hero-cta inline-flex items-center justify-center px-8 py-5 bg-[rgb(0,94,184)] hover:bg-[rgb(32,113,188)] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              Solicita valoración gratuita
            </a>
            <a
              href="tel:+34633261963"
              className="hero-cta inline-flex items-center justify-center gap-2 px-8 py-5 bg-white border-2 border-[rgb(0,94,184)] text-[rgb(0,94,184)] font-semibold text-lg rounded-2xl hover:bg-[rgb(191,231,249)] hover:shadow-lg transition-all duration-200"
            >
              <Phone className="w-5 h-5" /> 633 261 963
            </a>
          </div>

          <div className="hero-social flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-[rgb(0,94,184)] border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-[rgb(32,113,188)] border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-[rgb(191,231,249)] border-2 border-white"></div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">+200 familias</p>
              <p className="text-sm text-[rgb(130,131,130)]">ya confían en ANTEA</p>
            </div>
          </div>
        </div>

        {/* Columna imagen */}
        <div className="hero-image relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(0,94,184)]/20 to-[rgb(191,231,249)]/30"></div>
          <Image
            src="/hero-realistic.png"
            alt="Profesional de ANTEA cuidando a persona mayor"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
