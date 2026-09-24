import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import WizardButton from './WizardButton';

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
  return (
    <section className="w-full bg-[#fbfcf8] px-5 py-24 sm:px-8 lg:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#17372b] p-10 text-center text-white shadow-[0_30px_80px_-35px_rgba(21,62,49,.55)] md:p-14">
          <div className="antea-grid absolute inset-0 opacity-10" aria-hidden="true" />
          <h2 className="relative mb-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1] tracking-[-.04em]">{title}</h2>
          <p className="relative mx-auto mb-8 max-w-2xl text-lg text-white/85 md:text-xl">{subtitle}</p>
          <WizardButton className="relative inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#b9e5ca] px-10 py-5 text-lg font-bold text-[#17372b] shadow-xl transition hover:-translate-y-0.5 hover:bg-white md:text-xl">
            <MessageCircle className="w-6 h-6" aria-hidden="true" /> Iniciar valoración gratuita
          </WizardButton>
          <p className="relative mt-4 text-base text-white/80">Sin compromiso · Respuesta en menos de 24 horas</p>
        </div>

        {related.length > 0 && (
          <nav aria-labelledby="related-links-title" className="mt-12">
            <h2 id="related-links-title" className="text-xl font-bold text-[#17372b] mb-4 text-center">
              También te puede interesar
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-14 items-center justify-between gap-2 bg-white rounded-xl border border-[#2d6a4f]/20 px-4 py-3 hover:border-[#2d6a4f] hover:shadow-md transition group"
                  >
                    <span className="text-lg font-semibold text-[#17372b] group-hover:text-[#2d6a4f]">{link.label}</span>
                    <ArrowRight className="w-5 h-5 text-[#2d6a4f] group-hover:translate-x-1 transition" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
