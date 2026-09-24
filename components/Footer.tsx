import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';
import CookieSettingsButton from '@/components/CookieSettingsButton';
import WizardButton from '@/components/landing/WizardButton';

const linkClass = 'inline-flex min-h-11 items-center transition hover:text-[#b9e5ca] hover:underline underline-offset-4';

const columns = [
  {
    title: 'Servicios',
    links: [
      ['/ejercicio-personas-mayores-madrid', 'Ejercicio para mayores'],
      ['/prevencion-caidas-mayores-madrid', 'Prevención de caídas'],
      ['/recuperar-autonomia-mayores-madrid', 'Recuperar autonomía'],
      ['/valoracion-gratuita', 'Valoración gratuita'],
    ],
  },
  {
    title: 'Zonas',
    links: [
      ['/ejercicio-mayores-madrid-capital', 'Madrid capital'],
      ['/ejercicio-mayores-mostoles', 'Móstoles'],
      ['/ejercicio-mayores-getafe', 'Getafe'],
    ],
  },
  {
    title: 'Recursos',
    links: [
      ['/articulos', 'Artículos para familias'],
      ['/guia-prevencion-caidas', 'Guía gratuita de caídas'],
      ['/#faqs', 'Preguntas frecuentes'],
      ['/sobre-fernando', 'Sobre Fernando Royano'],
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="w-full bg-[#17372b] px-5 pb-28 pt-16 text-white/85 sm:px-8 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <p className="font-display text-2xl font-black text-white">
              ANTEA <span className="font-medium text-[#b9e5ca]">SALUD</span>
            </p>
            <p className="max-w-sm text-base leading-relaxed">
              Ejercicio adaptado a domicilio para personas mayores en Madrid. Fuerza, equilibrio y confianza para seguir
              haciendo su vida.
            </p>
            <ul className="space-y-1 text-base">
              <li>
                <a href="mailto:anteasalud@gmail.com" className={`${linkClass} gap-2`}>
                  <Mail className="h-5 w-5" aria-hidden="true" /> anteasalud@gmail.com
                </a>
              </li>
              <li>
                <WizardButton className={`${linkClass} gap-2 text-left`}>
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> Escribir por WhatsApp
                </WizardButton>
              </li>
              <li className="pt-2 text-white/75">Lunes a viernes, 8:30 - 14:00 (según disponibilidad)</li>
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
              <h2 id={`footer-${column.title}`} className="mb-3 text-lg font-bold text-white">
                {column.title}
              </h2>
              <ul className="text-base">
                {column.links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mb-8 h-px bg-white/15" />

        <div className="flex flex-col items-start justify-between gap-4 text-base text-white/75 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ANTEA Salud. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-6">
            <li><Link href="/privacidad" className={linkClass}>Privacidad</Link></li>
            <li><Link href="/aviso-legal" className={linkClass}>Aviso legal</Link></li>
            <li><Link href="/cookies" className={linkClass}>Cookies</Link></li>
            <li><CookieSettingsButton className={linkClass} /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
