"use client";

import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useWizard } from '../WizardWhatsApp';

interface RelatedLink {
  href: string;
  label: string;
}

interface LandingCTAProps {
  /** Título del bloque CTA */
  title: string;
  /** Subtítulo del bloque CTA */
  subtitle: string;
  /** Otras landings relacionadas para enlazado interno */
  related: RelatedLink[];
}

/**
 * Sección final con CTA destacado + enlaces internos a páginas relacionadas.
 * El enlazado interno refuerza la autoridad de las landings entre sí.
 */
export default function LandingCTA({ title, subtitle, related }: LandingCTAProps) {
  const { open: openWizard } = useWizard();

  return (
    <section className="w-full bg-gradient-to-b from-white to-[rgb(232,237,238)] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* CTA principal */}
        <div className="bg-gradient-to-br from-[rgb(0,94,184)] to-[rgb(0,60,115)] rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-4">{title}</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{subtitle}</p>
          <button
            onClick={openWizard}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[rgb(0,94,184)] font-black text-lg md:text-xl rounded-2xl shadow-xl hover:scale-105 transition-all duration-200"
          >
            <MessageCircle className="w-6 h-6" /> Iniciar valoración gratuita
          </button>
          <p className="text-sm text-blue-200 mt-4">
            Sin compromiso · Respuesta en menos de 24 horas
          </p>
        </div>

        {/* Enlaces internos a landings relacionadas */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold text-[rgb(31,41,51)] mb-4 text-center">
              También te puede interesar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {related.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between gap-2 bg-white rounded-xl border border-[rgb(200,207,210)] px-4 py-3 hover:border-[rgb(0,94,184)] hover:shadow-md transition group"
                >
                  <span className="text-sm font-semibold text-[rgb(31,41,51)] group-hover:text-[rgb(0,94,184)]">
                    {link.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[rgb(130,131,130)] group-hover:text-[rgb(0,94,184)] group-hover:translate-x-1 transition" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
