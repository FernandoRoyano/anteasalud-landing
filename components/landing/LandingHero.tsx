import { Check, GraduationCap, Home } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import PriceLine from '@/components/PriceLine';

interface LandingHeroProps {
  /** Texto del badge superior */
  badge: string;
  /** H1 principal (incluye la keyword objetivo) */
  h1: string;
  /** Parte destacada del H1 (se pinta en verde, en una nueva línea) */
  h1Highlight: string;
  /** Párrafo de introducción bajo el H1 */
  subtitle: string;
  /** Etiqueta de origen para atribuir el lead a esta landing */
  origen?: string;
  /** Recargo por desplazamiento de la zona (0 = Madrid capital) */
  surcharge?: number;
  /** Mostrar aclaración de zonas cuando el precio es el de Madrid capital */
  zoneNote?: boolean;
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
  surcharge = 0,
  zoneNote = true,
}: LandingHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#fbfcf8] px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
      <div className="antea-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_.96fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2d6a4f]/20 bg-white/75 px-4 py-2 backdrop-blur">
            <Check className="h-4 w-4 text-[#2d6a4f]" aria-hidden="true" />
            <span className="text-base font-semibold text-[#2d6a4f]">{badge}</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[.96] tracking-[-.05em] text-[#153e31]">
            {h1}
            <span className="mt-2 block text-[#2d6a4f]">{h1Highlight}</span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-[#3b5a4e] md:text-xl">
            {subtitle}
          </p>

          <PriceLine surcharge={surcharge} zoneNote={zoneNote} className="rounded-2xl border border-[#2d6a4f]/15 bg-white/80 px-4 py-3" />

          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#2d6a4f]/15 pt-5 text-base text-[#3b5a4e]">
            <li className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-[#2d6a4f]" aria-hidden="true" /> Graduado en CCAFYD</li>
            <li className="flex items-center gap-2"><Home className="h-5 w-5 text-[#2d6a4f]" aria-hidden="true" /> 14 años entrenando a domicilio</li>
            <li className="flex items-center gap-2"><Check className="h-5 w-5 text-[#2d6a4f]" aria-hidden="true" /> Valoración gratuita</li>
          </ul>
        </div>

        <div>
          <LeadForm origen={origen} />
        </div>
      </div>
    </section>
  );
}
