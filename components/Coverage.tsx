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
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-sm font-semibold text-blue-600">Disponibilidad</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Operamos en toda España
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Presente en más de 100 ciudades. ¿Está la tuya?
          </p>
        </div>

        {/* Grid de regiones */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regions.map((region, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border-2 border-blue-200 hover:shadow-xl hover:border-blue-400 transition-all"
            >
              <h3 className="text-2xl font-black text-blue-900 mb-3">
                {region.name}
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                {region.cities}
              </p>
              <div className="mt-4 inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                ✓ Servicio disponible
              </div>
            </div>
          ))}
        </div>

        {/* Info adicional */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-12 border-2 border-orange-200 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            ¿Tu ciudad no aparece?
          </h3>
          <p className="text-lg text-slate-700 mb-8">
            Estamos expandiendo constantemente. Contacta con nosotros y te diremos si pronto llegaremos a tu zona.
          </p>
          <a
            href="tel:+34633261963"
            className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all"
          >
            📞 Consulta disponibilidad
          </a>
        </div>
      </div>
    </section>
  );
}
