"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll suave compensando el header fijo
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMenuOpen(false); // Cierra menú en móvil
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/98 shadow-lg" : "bg-white/90"
        } backdrop-blur-md`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between py-3 md:py-4 px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl md:text-3xl font-black text-[rgb(0,94,184)] tracking-tight">
              ANTEA SALUD
            </span>
          </Link>
          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium">
            <li>
              <a
                href="#servicios"
                onClick={(e) => scrollToSection(e, '#servicios')}
                className="text-[rgb(31,41,51)] hover:text-[rgb(0,94,184)] transition cursor-pointer text-base"
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#testimonios"
                onClick={(e) => scrollToSection(e, '#testimonios')}
                className="text-[rgb(31,41,51)] hover:text-[rgb(0,94,184)] transition cursor-pointer text-base"
              >
                Testimonios
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                onClick={(e) => scrollToSection(e, '#contacto')}
                className="text-[rgb(31,41,51)] hover:text-[rgb(0,94,184)] transition cursor-pointer text-base"
              >
                Contacto
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                onClick={(e) => scrollToSection(e, '#contacto')}
                className="px-5 py-2.5 bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all cursor-pointer text-sm"
              >
                Solicita info
              </a>
            </li>
          </ul>
          {/* Móvil: botón de menú */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] active:bg-[rgb(191,231,249)] transition-colors z-50 relative"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span className="block w-6 h-0.5 bg-[rgb(0,94,184)] rounded transition-all duration-300"></span>
            <span className="block w-6 h-0.5 bg-[rgb(0,94,184)] rounded my-1 transition-all duration-300"></span>
            <span className="block w-6 h-0.5 bg-[rgb(0,94,184)] rounded transition-all duration-300"></span>
          </button>
        </nav>
      </header>

      {/* Bottom Sheet Menu móvil */}
      {menuOpen && (
        <>
          {/* Fondo oscuro */}
          <div
            className="fixed inset-0 bg-black/40 z-50 lg:hidden transition-opacity duration-200"
            onClick={() => setMenuOpen(false)}
          />
          {/* Bottom sheet */}
          <div className="fixed bottom-0 left-0 w-full z-50 flex lg:hidden">
            <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-w-md mx-auto animate-slide-up px-8 pt-8 pb-6 border-t-2 border-[rgb(200,207,210)]">
              {/* Botón Cerrar */}
              <button
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] transition ring-1 ring-[rgb(200,207,210)]"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <span className="text-xl text-[rgb(130,131,130)]">✕</span>
              </button>
              {/* Enlaces menú, grandes y centrados */}
              <nav>
                <ul className="flex flex-col items-center gap-2">
                  <li>
                    <a
                      href="#servicios"
                      onClick={(e) => scrollToSection(e, '#servicios')}
                      className="block px-4 py-4 text-xl font-bold text-[rgb(31,41,51)] hover:text-[rgb(0,94,184)] transition cursor-pointer rounded-xl"
                    >
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonios"
                      onClick={(e) => scrollToSection(e, '#testimonios')}
                      className="block px-4 py-4 text-xl font-bold text-[rgb(31,41,51)] hover:text-[rgb(0,94,184)] transition cursor-pointer rounded-xl"
                    >
                      Testimonios
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contacto"
                      onClick={(e) => scrollToSection(e, '#contacto')}
                      className="block px-4 py-4 text-xl font-bold text-[rgb(31,41,51)] hover:text-[rgb(0,94,184)] transition cursor-pointer rounded-xl"
                    >
                      Contacto
                    </a>
                  </li>
                  <li className="w-full pt-2">
                    <a
                      href="#contacto"
                      onClick={(e) => scrollToSection(e, '#contacto')}
                      className="block w-full text-center px-6 py-4 bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer text-lg"
                    >
                      Solicita info
                    </a>
                  </li>
                </ul>
                <hr className="my-5 border-[rgb(200,207,210)]" />
                {/* Info de contacto */}
                <div className="flex flex-col items-center gap-2">
                  <a
                    href="tel:+34633261963"
                    className="flex items-center gap-3 text-[rgb(31,41,51)] text-base hover:text-[rgb(0,94,184)] transition"
                  >
                    <span className="text-xl">📞</span>
                    <span>633 261 963</span>
                  </a>
                  <a
                    href="https://wa.me/34633261963?text=Hola,%20me%20gustaría%20información%20sobre%20ANTEASalud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[rgb(0,94,184)] text-base hover:text-[rgb(32,113,188)] transition"
                  >
                    <span className="text-xl">💬</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.26s cubic-bezier(.4,1.3,.7,1) backwards;
        }
      `}</style>
    </>
  );
}
