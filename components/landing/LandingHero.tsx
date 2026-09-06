import { Check, Star } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

interface LandingHeroProps {
  /** Texto del badge superior */
  badge: string;
  /** H1 principal (incluye la keyword objetivo) */
  h1: string;
  /** Parte destacada del H1 (se pinta en azul, en una nueva línea) */
  h1Highlight: string;
  /** Párrafo de introducción bajo el H1 */
  subtitle: string;
  /** Etiqueta de origen para atribuir el lead a esta landing */
  origen?: string;
}

/**
 * Hero reutilizable para todas las landing pages SEO.
 * Texto + keyword a la izquierda; formulario de captación visible a la derecha.
 */
export default function LandingHero({
  badge,
  h1,
  h1Highlight,
  subtitle,
  origen = 'Landing SEO',
}: LandingHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#fbfcf8] px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
      <div className="antea-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_.96fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2d6a4f]/20 bg-white/75 px-4 py-2 backdrop-blur">
            <Check className="h-4 w-4 text-[#2d6a4f]" />
            <span className="text-sm font-semibold text-[#2d6a4f]">{badge}</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[.96] tracking-[-.05em] text-[#153e31]">
            {h1}
            <span className="mt-2 block text-[#2d6a4f]">{h1Highlight}</span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-[#45665a] md:text-xl">
            {subtitle}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-[#45665a]">
              4.9 · +200 familias en Madrid confían en nosotros
            </span>
          </div>
        </div>

        <div>
          <LeadForm origen={origen} />
        </div>
      </div>
    </section>
  );
}
