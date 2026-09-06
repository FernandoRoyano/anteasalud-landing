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
    <section className="w-full bg-[#fbfcf8] px-5 py-24 sm:px-8 lg:py-32">
      <div className="max-w-4xl mx-auto">
        {/* CTA principal */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[#17372b] p-10 text-center text-white shadow-[0_30px_80px_-35px_rgba(21,62,49,.55)] md:p-14">
          <div className="antea-grid absolute inset-0 opacity-10" aria-hidden="true" />
          <h2 className="relative mb-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1] tracking-[-.04em]">{title}</h2>
          <p className="relative mx-auto mb-8 max-w-2xl text-lg text-white/70 md:text-xl">{subtitle}</p>
          <button
            onClick={openWizard}
            className="relative inline-flex items-center justify-center gap-3 rounded-full bg-[#b9e5ca] px-10 py-5 text-lg font-bold text-[#17372b] shadow-xl transition hover:-translate-y-0.5 hover:bg-white md:text-xl"
          >
            <MessageCircle className="w-6 h-6" /> Iniciar valoración gratuita
          </button>
          <p className="relative mt-4 text-sm text-white/60">
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
