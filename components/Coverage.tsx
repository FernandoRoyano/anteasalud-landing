"use client";

import { Check, Phone } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

export default function Coverage() {
  const headerRef = useScrollAnimation();
  const gridRef = useScrollAnimation({ stagger: ".region-card", staggerDelay: 0.1 });

  const regions = [
    { name: "Madrid capital", cities: "Centro, Salamanca, Chamberí, Retiro, Tetuán, Chamartín, Latina, Carabanchel..." },
    { name: "Sur", cities: "Móstoles, Fuenlabrada, Getafe, Leganés, Alcorcón, Parla, Pinto, Valdemoro" },
    { name: "Norte", cities: "Alcobendas, San Sebastián de los Reyes, Tres Cantos, Colmenar Viejo" },
    { name: "Este", cities: "Alcalá de Henares, Torrejón de Ardoz, Coslada, San Fernando, Rivas-Vaciamadrid" },
    { name: "Oeste", cities: "Pozuelo de Alarcón, Las Rozas, Majadahonda, Boadilla, Villaviciosa de Odón" },
    { name: "Sierra", cities: "Collado Villalba, Galapagar, Torrelodones, El Escorial, Guadarrama" },
  ];

  return (
    <section className="w-full bg-white py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Disponibilidad</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[rgb(31,41,51)]">
            Vamos a tu casa en toda la Comunidad de Madrid
          </h2>
          <p className="text-xl text-[rgb(130,131,130)] max-w-2xl mx-auto">
            Cubrimos Madrid capital y todos los municipios de la comunidad
          </p>
        </div>

        {/* Grid de regiones */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regions.map((region, index) => (
            <div
              key={index}
              className="region-card bg-gradient-to-br from-[rgb(232,237,238)] to-[rgb(191,231,249)] rounded-2xl p-8 shadow-lg border-2 border-[rgb(200,207,210)] hover:shadow-xl hover:border-[rgb(0,94,184)] transition-all"
            >
              <h3 className="text-2xl font-black text-[rgb(0,94,184)] mb-3">
                {region.name}
              </h3>
              <p className="text-[rgb(31,41,51)] text-sm md:text-base leading-relaxed">
                {region.cities}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[rgb(0,94,184)] text-white text-xs font-bold rounded-full">
                <Check className="w-3.5 h-3.5" /> Servicio disponible
              </div>
            </div>
          ))}
        </div>

        {/* Info adicional */}
        <div className="bg-gradient-to-r from-[rgb(191,231,249)] to-[rgb(232,237,238)] rounded-3xl p-12 border-2 border-[rgb(0,94,184)]/30 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[rgb(31,41,51)] mb-4">
            ¿Tu municipio no aparece?
          </h3>
          <p className="text-lg text-[rgb(130,131,130)] mb-8">
            Cubrimos toda la Comunidad de Madrid. Llámanos y te confirmamos disponibilidad en tu zona.
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
