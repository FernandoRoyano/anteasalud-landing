"use client";

import Link from 'next/link';
import { Camera, Phone, Mail, MessageCircle } from 'lucide-react';
import { useWizard } from './WizardWhatsApp';

export default function Footer() {
  const { open: openWizard } = useWizard();
  return (
    <footer className="w-full bg-[rgb(31,41,51)] text-[rgb(200,207,210)] py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Grid principal */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* Columna 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white">ANTEA</h3>
            <p className="text-[rgb(130,131,130)] text-sm leading-relaxed">
              Ejercicio funcional y readaptación a domicilio para personas mayores en Madrid. Recupera movilidad, autonomía y confianza en casa.
            </p>
            {/* TODO: Actualizar con URLs reales de redes sociales de ANTEA */}
            <div className="flex gap-4 pt-4">
              <a href="https://facebook.com/anteasalud" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[rgb(0,94,184)] rounded-full flex items-center justify-center text-white hover:bg-[rgb(32,113,188)] transition" aria-label="Facebook">
                <span className="text-lg font-bold">f</span>
              </a>
              <a href="https://instagram.com/anteasalud" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[rgb(0,94,184)] rounded-full flex items-center justify-center text-white hover:bg-[rgb(32,113,188)] transition" aria-label="Instagram">
                <Camera className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/anteasalud" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[rgb(0,94,184)] rounded-full flex items-center justify-center text-white hover:bg-[rgb(32,113,188)] transition" aria-label="LinkedIn">
                <span className="text-sm font-bold">in</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-lg">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/nuestro-metodo" className="hover:text-[rgb(0,94,184)] transition">Nuestro método (vídeo)</Link></li>
              <li><Link href="/ejercicio-personas-mayores-madrid" className="hover:text-[rgb(0,94,184)] transition">Ejercicio para mayores</Link></li>
              <li><Link href="/prevencion-caidas-mayores-madrid" className="hover:text-[rgb(0,94,184)] transition">Prevención de caídas</Link></li>
              <li><Link href="/recuperar-autonomia-mayores-madrid" className="hover:text-[rgb(0,94,184)] transition">Recuperar autonomía</Link></li>
            </ul>
          </div>

          {/* Columna 3: Zonas */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-lg">Zonas</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ejercicio-mayores-madrid-capital" className="hover:text-[rgb(0,94,184)] transition">Madrid capital</Link></li>
              <li><Link href="/ejercicio-mayores-mostoles" className="hover:text-[rgb(0,94,184)] transition">Móstoles</Link></li>
              <li><Link href="/ejercicio-mayores-getafe" className="hover:text-[rgb(0,94,184)] transition">Getafe</Link></li>
              <li><Link href="/#faqs" className="hover:text-[rgb(0,94,184)] transition">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-lg">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+34633261963" className="hover:text-[rgb(0,94,184)] transition flex items-center gap-2">
                  <Phone className="w-4 h-4" /> 633 261 963
                </a>
              </li>
              <li>
                <a href="mailto:info@anteasalud.com" className="hover:text-[rgb(0,94,184)] transition flex items-center gap-2">
                  <Mail className="w-4 h-4" /> info@anteasalud.com
                </a>
              </li>
              <li>
                <button onClick={openWizard} className="hover:text-[rgb(0,94,184)] transition flex items-center gap-2 text-left">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
              </li>
              <li className="text-[rgb(130,131,130)] mt-4">
                Disponible de lunes a viernes<br/>
                9:00 - 19:00 CET
              </li>
            </ul>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="h-px bg-[rgb(130,131,130)]/30 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[rgb(130,131,130)]">
          <p>© 2026 ANTEA SALUD. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-[rgb(0,94,184)] transition">Política de privacidad</Link>
            <Link href="/aviso-legal" className="hover:text-[rgb(0,94,184)] transition">Aviso legal</Link>
            <Link href="/cookies" className="hover:text-[rgb(0,94,184)] transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
