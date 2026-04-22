"use client";

import { Phone, MessageCircle, Mail, Clock, Check, HeartPulse } from 'lucide-react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useWizard } from './WizardWhatsApp';

export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null);
  const { open: openWizard } = useWizard();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll(".cta-anim");
      gsap.set(elements, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
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
      id="cta-final"
      className="relative w-full overflow-hidden bg-[#081629] text-white"
      style={{ paddingTop: 'clamp(5rem, 10vw, 10rem)', paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}
    >
      {/* Mesh gradient espejado del Hero (accent izquierda, primary derecha) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px]"
          style={{ background: 'rgb(224 123 60 / 0.32)' }}
        />
        <div
          className="absolute bottom-[-25%] right-[-10%] w-[65%] h-[65%] rounded-full blur-[110px]"
          style={{ background: 'rgb(0 94 184 / 0.45)' }}
        />
      </div>
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto text-center px-4">
        {/* Eyebrow */}
        <p className="cta-anim text-fluid-xs font-semibold uppercase tracking-[0.3em] text-accent-light mb-6">
          Empecemos
        </p>

        {/* Headline */}
        <h2
          className="cta-anim font-display font-black text-white leading-[1.02] tracking-tight mb-8"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Recupera su autonomía.{' '}
          <span className="text-accent-light">Recupera tu tranquilidad.</span>
        </h2>

        <p className="cta-anim text-fluid-xl text-white/75 mb-12 max-w-2xl mx-auto leading-relaxed">
          Solicita una valoración <span className="font-semibold text-white">gratuita y sin compromiso</span>.
          Te respondemos en menos de 24 horas.
        </p>

        {/* CTAs primarios: Llamar + WhatsApp */}
        <div className="cta-anim flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="tel:+34633261963"
            className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-ink font-semibold text-fluid-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Phone className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <div className="text-left leading-tight">
              <div className="text-fluid-xs text-muted font-normal">Llama ahora</div>
              <div className="font-bold">633 261 963</div>
            </div>
          </a>

          <button
            onClick={openWizard}
            className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-accent hover:bg-accent-dark text-white font-semibold text-fluid-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
            <div className="text-left leading-tight">
              <div className="text-fluid-xs text-white/70 font-normal">Abre el wizard</div>
              <div className="font-bold">WhatsApp</div>
            </div>
          </button>
        </div>

        {/* Email terciario */}
        <p className="cta-anim text-fluid-sm text-white/50 mb-12">
          ¿Prefieres escribir?{' '}
          <a
            href="mailto:info@anteasalud.com"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-accent-light transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-accent-light"
          >
            <Mail className="w-3.5 h-3.5" />
            info@anteasalud.com
          </a>
        </p>

        {/* Trust points — línea sutil */}
        <div className="cta-anim flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3 text-fluid-sm text-white/70 pt-8 border-t border-white/10">
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-light" />
            Respuesta en menos de 24h
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="w-4 h-4 text-accent-light" />
            Sin compromiso
          </span>
          <span className="inline-flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-accent-light" />
            Profesional titulado
          </span>
        </div>
      </div>
    </section>
  );
}
