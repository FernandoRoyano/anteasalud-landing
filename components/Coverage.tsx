export default function Coverage() {
  const regions = [
    { name: "Madrid", cities: "Madrid, Fuenlabrada, Alcalá de Henares, Móstoles" },
    { name: "Cataluña", cities: "Barcelona, Tarragona, Girona, L'Hospitalet" },
    { name: "País Vasco", cities: "Bilbao, San Sebastián, Vitoria" },
    { name: "Valencia", cities: "Valencia, Alicante, Elche, Castellón" },
    { name: "Andalucía", cities: "Sevilla, Málaga, Córdoba, Granada" },
    { name: "Otras ciudades", cities: "Zaragoza, Valladolid, Oviedo, Palma de Mallorca y más" }
  ];

  return (
    <section className="w-full bg-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Disponibilidad</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[rgb(31,41,51)]">
            Operamos en toda España
          </h2>
          <p className="text-xl text-[rgb(130,131,130)] max-w-2xl mx-auto">
            Presente en más de 100 ciudades. ¿Está la tuya?
          </p>
        </div>

        {/* Grid de regiones */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regions.map((region, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[rgb(232,237,238)] to-[rgb(191,231,249)] rounded-2xl p-8 shadow-lg border-2 border-[rgb(200,207,210)] hover:shadow-xl hover:border-[rgb(0,94,184)] transition-all"
            >
              <h3 className="text-2xl font-black text-[rgb(0,94,184)] mb-3">
                {region.name}
              </h3>
              <p className="text-[rgb(31,41,51)] text-sm md:text-base leading-relaxed">
                {region.cities}
              </p>
              <div className="mt-4 inline-block px-3 py-1 bg-[rgb(0,94,184)] text-white text-xs font-bold rounded-full">
                ✓ Servicio disponible
              </div>
            </div>
          ))}
        </div>

        {/* Info adicional */}
        <div className="bg-gradient-to-r from-[rgb(191,231,249)] to-[rgb(232,237,238)] rounded-3xl p-12 border-2 border-[rgb(0,94,184)]/30 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[rgb(31,41,51)] mb-4">
            ¿Tu ciudad no aparece?
          </h3>
          <p className="text-lg text-[rgb(130,131,130)] mb-8">
            Estamos expandiendo constantemente. Contacta con nosotros y te diremos si pronto llegaremos a tu zona.
          </p>
          <a
            href="tel:+34633261963"
            className="inline-flex items-center justify-center px-8 py-4 bg-[rgb(0,94,184)] text-white font-bold rounded-2xl hover:bg-[rgb(32,113,188)] shadow-lg hover:shadow-xl transition-all"
          >
            📞 Consulta disponibilidad
          </a>
        </div>
      </div>
    </section>
  );
}
