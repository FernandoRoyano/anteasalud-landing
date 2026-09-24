"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const links = [
  ['Ejercicio a domicilio', '/ejercicio-personas-mayores-madrid'],
  ['Prevención de caídas', '/prevencion-caidas-mayores-madrid'],
  ['Precios', '/#precios'],
  ['Artículos', '/articulos'],
  ['Quién soy', '/sobre-fernando'],
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${scrolled ? 'border-[#2d6a4f]/10 bg-[#fbfcf8]/95 shadow-sm backdrop-blur-xl' : 'border-transparent bg-[#fbfcf8]/80 backdrop-blur-md'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-2xl font-black tracking-[-.045em] text-[#2d6a4f]" aria-label="ANTEA Salud, inicio">
          ANTEA <span className="font-medium text-[#4a6358]">SALUD</span>
        </Link>
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Navegación principal">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-base font-semibold text-[#3b5a4e] transition hover:text-[#17372b]">
              {label}
            </Link>
          ))}
          <Link href="/valoracion-gratuita" className="rounded-full bg-[#2d6a4f] px-5 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#22543f]">
            Valoración gratuita
          </Link>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2d6a4f]/25 text-[#2d6a4f] xl:hidden"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-[#2d6a4f]/10 bg-[#fbfcf8] px-5 pb-6 xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col py-3" aria-label="Menú móvil">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={closeMenu} className="border-b border-[#2d6a4f]/10 py-4 text-lg font-semibold text-[#3b5a4e]">
                {label}
              </Link>
            ))}
            <Link href="/valoracion-gratuita" onClick={closeMenu} className="mt-5 rounded-full bg-[#2d6a4f] px-5 py-4 text-center text-lg font-bold text-white">
              Solicitar valoración gratuita
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
