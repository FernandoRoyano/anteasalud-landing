"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const links = [
  ['Qué conseguimos', '/#servicios'],
  ['Cómo funciona', '/#como-funciona'],
  ['Precios', '/#precios'],
  ['Artículos', '/articulos'],
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${scrolled ? 'border-[#2d6a4f]/10 bg-[#fbfcf8]/95 shadow-sm backdrop-blur-xl' : 'border-transparent bg-[#fbfcf8]/80 backdrop-blur-md'}`}>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Navegación principal">
        <Link href="/" className="font-display text-2xl font-black tracking-[-.045em] text-[#2d6a4f]">ANTEA <span className="font-medium text-[#6b8c7d]">SALUD</span></Link>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-[#45665a] transition hover:text-[#17372b]">{label}</Link>)}
          <Link href="/#contacto" className="rounded-full bg-[#2d6a4f] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#22543f]">Valoración gratuita</Link>
        </div>
        <button type="button" onClick={() => setMenuOpen(value => !value)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2d6a4f]/15 text-[#2d6a4f] lg:hidden" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      {menuOpen && <div className="border-t border-[#2d6a4f]/10 bg-[#fbfcf8] px-5 pb-6 lg:hidden"><nav className="mx-auto flex max-w-7xl flex-col py-3">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-[#2d6a4f]/10 py-4 font-semibold text-[#45665a]">{label}</Link>)}<Link href="/#contacto" onClick={() => setMenuOpen(false)} className="mt-5 rounded-full bg-[#2d6a4f] px-5 py-4 text-center font-bold text-white">Solicitar valoración gratuita</Link></nav></div>}
    </header>
  );
}
