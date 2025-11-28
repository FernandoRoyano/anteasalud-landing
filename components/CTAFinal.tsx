export default function CTAFinal() {
  return (
    <section id="contacto" className="w-full bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 py-24 px-4 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-orange-500 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          ¿Listo para recuperar tu autonomía?
        </h2>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Solicita una valoración <span className="font-bold text-white">gratuita y sin compromiso</span>. 
          Te acompañaremos en cada paso de tu recuperación.
        </p>

        {/* Botones principales */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          {/* Botón 1: Teléfono */}
          <a
            href="tel:+34633261963"
            className="group inline-flex items-center justify-center px-10 py-6 bg-white text-slate-900 font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl mr-3">📞</span>
            <div className="text-left">
              <div className="text-xs text-slate-500">Llama ahora</div>
              <div className="font-black text-lg">633 261 963</div>
            </div>
          </a>

          {/* Botón 2: WhatsApp */}
          <a
            href="https://wa.me/34633261963?text=Hola,%20me%20gustaría%20información%20sobre%20VITALIASalud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl mr-3">💬</span>
            <div className="text-left">
              <div className="text-xs text-green-100">Envía mensaje</div>
              <div className="font-black text-lg">WhatsApp</div>
            </div>
          </a>

          {/* Botón 3: Email */}
          <a
            href="mailto:info@anteasalud.com"
            className="inline-flex items-center justify-center px-10 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl mr-3">✉️</span>
            <div className="text-left">
              <div className="text-xs text-orange-100">Escribe</div>
              <div className="font-black text-lg">Email</div>
            </div>
          </a>
        </div>

        {/* Info adicional */}
        <div className="space-y-4 text-blue-100 mb-12">
          <p className="flex items-center justify-center gap-2">
            <span className="text-2xl">⏱️</span>
            Valoración inicial en menos de 24 horas
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="text-2xl">✓</span>
            Sin compromiso, totalmente gratuito
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="text-2xl">🏥</span>
            Profesionales titulados y verificados
          </p>
        </div>

        {/* Separador */}
        <div className="h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mb-12"></div>

        {/* Testimonio destacado */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <p className="text-lg md:text-xl text-white italic mb-4">
            "En 6 semanas recuperé toda la movilidad. No solo volví a andar, volví a vivir. Gracias VITALIA."
          </p>
          <p className="text-blue-200 font-semibold">
            — Isabel M., Madrid • Cliente desde hace 1 año
          </p>
        </div>
      </div>
    </section>
  );
}
