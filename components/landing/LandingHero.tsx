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
    <section className="relative w-full bg-gradient-to-br from-[rgb(191,231,249)] via-white to-[rgb(232,237,238)] px-4 pt-32 pb-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <Check className="w-4 h-4 text-[rgb(0,94,184)]" />
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">{badge}</span>
          </div>

          <h1 className="font-display text-fluid-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
            {h1}
            <span className="block text-[rgb(0,94,184)] mt-2">{h1Highlight}</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-slate-600 font-medium">
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
