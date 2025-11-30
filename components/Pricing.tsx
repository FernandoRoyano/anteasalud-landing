// components/Pricing.tsx
export default function Pricing() {
  return (
    <section id="precios" className="w-full bg-[rgb(232,237,238)] py-24 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Precios claros</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[rgb(31,41,51)]">
            Simple y sin complicaciones
          </h2>
          <p className="text-xl text-[rgb(130,131,130)] max-w-2xl mx-auto">
            Sesiones de 30 minutos adaptadas al ritmo de cada persona. Sin permanencia.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          
          {/* Opción 1: Sesión suelta */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[rgb(200,207,210)] hover:border-[rgb(0,94,184)] transition-all">
            <h3 className="text-xl font-bold text-[rgb(31,41,51)] mb-2">
              Sesión suelta
            </h3>
            <p className="text-[rgb(130,131,130)] text-sm mb-6">
              Para probar o puntualmente
            </p>
            
            <div className="mb-6">
              <span className="text-5xl font-black text-[rgb(0,94,184)]">45€</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <span className="text-[rgb(0,94,184)]">✓</span>
                1 sesión de 30 minutos
              </li>
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <span className="text-[rgb(0,94,184)]">✓</span>
                Profesional titulado
              </li>
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <span className="text-[rgb(0,94,184)]">✓</span>
                En tu domicilio
              </li>
            </ul>

            <a
              href="#contacto"
              className="block w-full text-center py-4 rounded-xl font-bold bg-[rgb(232,237,238)] text-[rgb(31,41,51)] hover:bg-[rgb(200,207,210)] transition-all"
            >
              Reservar
            </a>
          </div>

          {/* Opción 2: 2 días por semana (DESTACADO) */}
          <div className="relative bg-gradient-to-b from-[rgb(0,94,184)] to-[rgb(0,60,115)] rounded-3xl p-8 shadow-2xl text-white md:scale-105 z-10">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-white text-[rgb(0,94,184)] text-sm font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                Mejor precio
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              2 días por semana
            </h3>
            <p className="text-white/80 text-sm mb-6">
              El ritmo ideal para ver resultados
            </p>
            
            <div className="mb-2">
              <span className="text-5xl font-black text-white">70€</span>
              <span className="text-white/80"> / semana</span>
            </div>
            <p className="text-sm mb-6">
              <span className="bg-white/20 px-2 py-1 rounded text-white font-semibold">35€/sesión · Ahorras 20€</span>
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-white/90">
                <span className="text-white">✓</span>
                2 sesiones semanales
              </li>
              <li className="flex items-center gap-3 text-sm text-white/90">
                <span className="text-white">✓</span>
                Plan personalizado
              </li>
              <li className="flex items-center gap-3 text-sm text-white/90">
                <span className="text-white">✓</span>
                Seguimiento de evolución
              </li>
              <li className="flex items-center gap-3 text-sm text-white/90">
                <span className="text-white">✓</span>
                Sin permanencia
              </li>
            </ul>

            <a
              href="#contacto"
              className="block w-full text-center py-4 rounded-xl font-bold bg-white text-[rgb(0,94,184)] hover:bg-[rgb(232,237,238)] transition-all"
            >
              Empezar ahora
            </a>
          </div>

          {/* Opción 3: Pack Personalizado */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[rgb(200,207,210)] hover:border-[rgb(0,94,184)] transition-all">
            <h3 className="text-xl font-bold text-[rgb(31,41,51)] mb-2">
              Pack personalizado
            </h3>
            <p className="text-[rgb(130,131,130)] text-sm mb-6">
              Adaptado a tus necesidades
            </p>
            
            <div className="mb-6">
              <span className="text-4xl font-black text-[rgb(0,94,184)]">A medida</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <span className="text-[rgb(0,94,184)]">✓</span>
                Frecuencia a tu ritmo
              </li>
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <span className="text-[rgb(0,94,184)]">✓</span>
                Sesiones de 30 o 60 min
              </li>
              <li className="flex items-center gap-3 text-sm text-[rgb(31,41,51)]">
                <span className="text-[rgb(0,94,184)]">✓</span>
                Intensivo o mantenimiento
              </li>
            </ul>

            <a
              href="https://wa.me/34633261963?text=Hola,%20me%20gustaría%20un%20plan%20personalizado%20de%VITALIA%20Salud"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 rounded-xl font-bold bg-[rgb(232,237,238)] text-[rgb(31,41,51)] hover:bg-[rgb(200,207,210)] transition-all"
            >
              Consultar
            </a>
          </div>

        </div>

        {/* Garantía */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-[rgb(191,231,249)] px-6 py-3 rounded-full">
            <span className="text-2xl">🛡️</span>
            <p className="text-[rgb(0,94,184)] font-semibold text-sm md:text-base">
              Si la primera sesión no te convence, te devolvemos el dinero
            </p>
          </div>
          
          <p className="text-[rgb(130,131,130)]">
            ¿Dudas? Llámanos al <a href="tel:+34633261963" className="text-[rgb(0,94,184)] font-semibold hover:underline">633 261 963</a>
          </p>
        </div>

      </div>
    </section>
  );
}
