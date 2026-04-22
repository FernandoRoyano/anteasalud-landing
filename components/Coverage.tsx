"use client";

import { Check, Phone } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

export default function Coverage() {
  const headerRef = useScrollAnimation();
  const gridRef = useScrollAnimation({ stagger: ".region-card", staggerDelay: 0.1 });

  const regions = [
    {
      name: "Madrid capital",
      cities: "Centro, Salamanca, Chamberí, Retiro, Tetuán, Chamartín, Latina, Carabanchel, Vallecas, Hortaleza...",
      recargo: 0,
    },
    {
      name: "Sur",
      cities: "Leganés, Alcorcón, Getafe, Móstoles, Fuenlabrada, Parla, Pinto",
      recargo: 5,
    },
    {
      name: "Oeste",
      cities: "Pozuelo de Alarcón, Majadahonda, Boadilla del Monte, Villaviciosa de Odón, Las Rozas",
      recargo: 5,
    },
    {
      name: "Este",
      cities: "Coslada, San Fernando de Henares, Rivas-Vaciamadrid, Torrejón de Ardoz",
      recargo: 5,
    },
    {
      name: "Norte",
      cities: "Alcobendas, Tres Cantos",
      recargo: 5,
    },
  ];

  return (
    <section className="w-full bg-white py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Disponibilidad</span>
          </div>
          <h2 className="font-display text-fluid-4xl font-black tracking-tight text-[rgb(31,41,51)]">
            Vamos a tu casa en la Comunidad de Madrid
          </h2>
          <p className="text-xl text-[rgb(130,131,130)] max-w-2xl mx-auto">
            Cubrimos Madrid capital y municipios hasta 22 km del centro
          </p>
        </div>

        {/* Grid de regiones */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regions.map((region, index) => (
            <div
              key={index}
              className="region-card bg-gradient-to-br from-[rgb(232,237,238)] to-[rgb(191,231,249)] rounded-2xl p-8 shadow-lg border-2 border-[rgb(200,207,210)] hover:shadow-xl hover:border-[rgb(0,94,184)] transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-2xl font-black text-[rgb(0,94,184)]">{region.name}</h3>
                {region.recargo === 0 ? (
                  <span className="text-xs font-bold bg-green-500 text-white px-2.5 py-1 rounded-full whitespace-nowrap">
                    Sin recargo
                  </span>
                ) : (
                  <span className="text-xs font-bold bg-orange-500 text-white px-2.5 py-1 rounded-full whitespace-nowrap">
                    +{region.recargo}€ /sesión
                  </span>
                )}
              </div>
              <p className="text-[rgb(31,41,51)] text-sm md:text-base leading-relaxed">
                {region.cities}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[rgb(0,94,184)] text-white text-xs font-bold rounded-full">
                <Check className="w-3.5 h-3.5" /> Servicio disponible
              </div>
            </div>
          ))}
        </div>

        {/* Aviso de recargo */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 mb-8 text-center">
          <p className="text-[rgb(31,41,51)] text-sm md:text-base">
            <strong className="text-orange-700">Recargo por desplazamiento:</strong> Madrid capital sin recargo. Resto de zonas <strong>+5€ por sesión</strong> para cubrir el desplazamiento.
          </p>
        </div>

        {/* Info adicional */}
        <div className="bg-gradient-to-r from-[rgb(191,231,249)] to-[rgb(232,237,238)] rounded-3xl p-12 border-2 border-[rgb(0,94,184)]/30 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[rgb(31,41,51)] mb-4">
            ¿Tu municipio no aparece?
          </h3>
          <p className="text-lg text-[rgb(130,131,130)] mb-8">
            Trabajamos en un radio de hasta 22 km del centro de Madrid. Llámanos y te confirmamos disponibilidad en tu zona.
          </p>
          <a
            href="tel:+34633261963"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[rgb(0,94,184)] text-white font-bold rounded-2xl hover:bg-[rgb(32,113,188)] shadow-lg hover:shadow-xl transition-all"
          >
            <Phone className="w-5 h-5" /> Consulta disponibilidad
          </a>
        </div>
      </div>
    </section>
  );
}
