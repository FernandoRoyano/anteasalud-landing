"use client";

import { Check, Phone } from 'lucide-react';
import { useWizard } from '../WizardWhatsApp';

interface LandingHeroProps {
  /** Texto del badge superior */
  badge: string;
  /** H1 principal (incluye la keyword objetivo) */
  h1: string;
  /** Parte destacada del H1 (se pinta en azul, en una nueva línea) */
  h1Highlight: string;
  /** Párrafo de introducción bajo el H1 */
  subtitle: string;
  /** Texto del CTA principal (opcional) */
  ctaText?: string;
}

/**
 * Hero reutilizable para todas las landing pages SEO.
 * Mantiene consistencia visual con el hero principal pero permite contenido único por página.
 */
export default function LandingHero({
  badge,
  h1,
  h1Highlight,
  subtitle,
  ctaText = 'Solicita tu valoración gratuita',
}: LandingHeroProps) {
  const { open: openWizard } = useWizard();

  return (
    <section className="relative w-full bg-gradient-to-br from-[rgb(191,231,249)] via-white to-[rgb(232,237,238)] flex items-center justify-center px-4 pt-32 pb-20">
      <div className="max-w-5xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
          <Check className="w-4 h-4 text-[rgb(0,94,184)]" />
          <span className="text-sm font-semibold text-[rgb(0,94,184)]">{badge}</span>
        </div>

        <h1 className="font-display text-fluid-5xl font-black tracking-tight text-slate-900 leading-[1.1] tracking-tight">
          {h1}
          <span className="block text-[rgb(0,94,184)] mt-2">{h1Highlight}</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
          <button
            onClick={openWizard}
            className="inline-flex items-center justify-center px-8 py-5 bg-[rgb(0,94,184)] hover:bg-[rgb(32,113,188)] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            {ctaText}
          </button>
          <a
            href="tel:+34633261963"
            className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white border-2 border-[rgb(0,94,184)] text-[rgb(0,94,184)] font-semibold text-lg rounded-2xl hover:bg-[rgb(191,231,249)] hover:shadow-lg transition-all duration-200"
          >
            <Phone className="w-5 h-5" /> 633 261 963
          </a>
        </div>
      </div>
    </section>
  );
}
