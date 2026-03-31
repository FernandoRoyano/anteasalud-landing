"use client";

import Image from 'next/image';
import { Check, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Parallax on image
      const img = sectionRef.current.querySelector(".solution-image");
      if (img) {
        gsap.fromTo(
          img,
          { y: 60 },
          {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Text fade-in
      const textElements = sectionRef.current.querySelectorAll(".solution-text");
      gsap.set(textElements, { opacity: 0, x: 60 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(textElements, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-b from-[rgb(0,94,184)] to-[rgb(0,60,115)] py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Columna imagen - CON IMAGEN REAL */}
        <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl order-2 md:order-1">
          <div className="solution-image absolute inset-[-60px] top-[-60px] bottom-[-60px]">
            <Image
              src="/solution-realistic.png"
              alt="Persona mayor recuperando movilidad con ejercicio adaptado en casa"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Columna texto */}
        <div className="space-y-8 order-1 md:order-2">
          <div className="solution-text inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <Check className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">La solución que buscabas</span>
          </div>

          <h2 className="solution-text text-4xl md:text-5xl font-black text-white leading-tight">
            Profesionales expertos que vienen a casa
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-[rgb(191,231,249)] leading-relaxed">
            <p className="solution-text">
              Imagina la <span className="font-bold text-white">tranquilidad de saber</span> que tu padre o tu madre
              recibe ejercicio adaptado y fisioterapia profesional <span className="font-bold text-white">sin salir de casa</span>.
            </p>

            <p className="solution-text">
              Cuando vayas a verle, podrás disfrutar de un rato agradable sabiendo que cuenta con
              la ayuda de profesionales titulados que se preocupan de su <span className="font-bold text-white">bienestar físico y emocional</span>.
            </p>

            <div className="solution-text bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <p className="font-bold text-white text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Recupera su autonomía. Recupera tu tranquilidad.
              </p>
            </div>
          </div>

          <div className="solution-text grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <div className="text-4xl font-black text-white">100%</div>
              <p className="text-sm text-[rgb(191,231,249)]">Profesionales titulados</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-white">24/7</div>
              <p className="text-sm text-[rgb(191,231,249)]">Seguimiento continuo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
