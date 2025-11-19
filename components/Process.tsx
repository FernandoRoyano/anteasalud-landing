export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Valoración inicial",
      description: "Llamada gratuita y sin compromiso. Conocemos tu situación, necesidades y objetivos de rehabilitación.",
      icon: "📋",
      time: "Menos de 24h"
    },
    {
      number: "02",
      title: "Plan personalizado",
      description: "Nuestro equipo diseña un programa de ejercicio y fisioterapia adaptado a tus necesidades específicas.",
      icon: "📝",
      time: "En 48h"
    },
    {
      number: "03",
      title: "Primera sesión",
      description: "El profesional va a tu domicilio. Evaluación completa y comienzo del programa de recuperación.",
      icon: "🤝",
      time: "En 48-72h"
    },
    {
      number: "04",
      title: "Seguimiento continuo",
      description: "Evaluación regular, ajuste de rutinas según evolución y coordinación con tu médico si es necesario.",
      icon: "📈",
      time: "Cada semana"
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-sm font-semibold text-blue-600">¿Cómo funciona?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            4 pasos simples para empezar
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Desde la primera llamada hasta tu recuperación, te acompañamos en cada paso
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Conectar pasos (línea visual) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-[60%] w-[calc(100%-60%)] h-1 bg-gradient-to-r from-orange-400 to-transparent"></div>
              )}

              {/* Card del paso */}
              <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-slate-100 hover:border-orange-300">
                
                {/* Número circular */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 text-white font-black text-2xl mb-6 shadow-lg">
                  {step.number}
                </div>

                {/* Icono grande */}
                <div className="text-5xl mb-4">{step.icon}</div>

                {/* Titulo */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                {/* Descripción */}
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Tiempo estimado */}
                <div className="inline-block px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
                  <span className="text-xs font-semibold text-blue-700">
                    ⏱️ {step.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA pequeño */}
        <div className="text-center pt-12 border-t border-slate-200">
          <p className="text-lg text-slate-600 mb-6">
            ¿Tienes dudas? <span className="font-semibold text-slate-900">Nuestro equipo te asesorará sin compromiso</span>
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Solicita valoración gratuita
          </a>
        </div>
      </div>
    </section>
  );
}
