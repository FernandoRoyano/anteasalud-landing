export default function WhyUs() {
  const reasons = [
    {
      icon: "🏥",
      title: "Profesionales titulados",
      description: "100% colegiados y especializados en personas mayores. Verificamos credenciales antes de trabajar con nosotros.",
      highlight: "Máxima seguridad"
    },
    {
      icon: "🏠",
      title: "Ejercicio en tu casa",
      description: "Sin traslados, sin estrés. El profesional va a ti. Más cómodo, más seguro y más efectivo.",
      highlight: "Comodidad garantizada"
    },
    {
      icon: "📊",
      title: "Planes personalizados",
      description: "Cada persona es única. Diseñamos un programa adaptado a tu situación, objetivos y ritmo.",
      highlight: "Hecho para ti"
    },
    {
      icon: "⏱️",
      title: "Flexibilidad horaria",
      description: "Elige cuándo y cuántas veces a la semana. Lunes a domingo, mañanas o tardes.",
      highlight: "Tú decides"
    },
    {
      icon: "💰",
      title: "Sin compromiso",
      description: "Valoración gratuita, sin obligación de contratar. Tú controlas tu plan y puedes cambiar cuando quieras.",
      highlight: "Libertad total"
    },
    {
      icon: "📈",
      title: "Resultados reales",
      description: "Seguimiento continuo y evaluaciones regulares. Ves la evolución semana a semana.",
      highlight: "Progreso visible"
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-2 bg-green-100 rounded-full">
            <span className="text-sm font-semibold text-green-600">¿Por qué elegirnos?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Lo que nos diferencia
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            6 razones por las que +200 familias confían en ANTEASalud
          </p>
        </div>

        {/* Grid 3 columnas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-green-300 group"
            >
              {/* Icono grande */}
              <div className="text-6xl mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                {reason.icon}
              </div>

              {/* Titulo */}
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {reason.title}
              </h3>

              {/* Descripción */}
              <p className="text-slate-600 leading-relaxed mb-6">
                {reason.description}
              </p>

              {/* Highlight badge */}
              <div className="inline-block px-4 py-2 bg-green-100 rounded-full">
                <span className="text-sm font-bold text-green-700">
                  ✓ {reason.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats comparativo */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-black mb-12 text-center">
            Números que hablan por sí solos
          </h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2">+200</div>
              <p className="text-blue-100">Familias atendidas</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">97%</div>
              <p className="text-blue-100">Tasa de satisfacción</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">4.9★</div>
              <p className="text-blue-100">Valoración media</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">6 años</div>
              <p className="text-blue-100">Experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
