export default function Testimonials() {
  const testimonials = [
    {
      name: "María García",
      city: "Madrid",
      relation: "Hija de usuaria",
      stars: 5,
      text: "Mi madre tenía mucho miedo a caerse después de la operación de cadera. Con ANTEA recuperó la confianza en solo 6 semanas. Ahora camina sola por casa sin ayuda. ¡Increíble!",
      initial: "MG",
      color: "bg-[rgb(0,94,184)]"
    },
    {
      name: "Juan López",
      city: "Barcelona",
      relation: "Esposo",
      stars: 5,
      text: "Mi esposa está mucho más fuerte y activa. Los profesionales son muy cuidadosos y adaptan los ejercicios a su ritmo. Además, el trato es excepcional. Los recomendaría sin dudarlo.",
      initial: "JL",
      color: "bg-[rgb(32,113,188)]"
    },
    {
      name: "Carmen Rodríguez",
      city: "Valencia",
      relation: "Hija",
      stars: 5,
      text: "Llevaba meses sin poder levantarse del sofá. Ahora sube escaleras, camina por la calle y hasta va a pasear al parque. ANTEA ha sido un cambio radical en su vida. ¡Gracias!",
      initial: "CR",
      color: "bg-[rgb(0,94,184)]"
    },
    {
      name: "Roberto Martínez",
      city: "Sevilla",
      relation: "Hijo",
      stars: 5,
      text: "La valoración fue muy completa y personalizada. No es un servicio genérico, cada sesión es diferente según mi padre mejora. Muy profesionales y humanos a la vez.",
      initial: "RM",
      color: "bg-[rgb(32,113,188)]"
    },
    {
      name: "Ana Fernández",
      city: "Bilbao",
      relation: "Cónyuge",
      stars: 5,
      text: "Tras la caída, pensé que mi marido no volvería a ser el mismo. ANTEA me ha devuelto la esperanza. Ahora recupera movilidad cada semana. ¡Increíble profesionalidad!",
      initial: "AF",
      color: "bg-[rgb(0,94,184)]"
    },
    {
      name: "Luis Sánchez",
      city: "Zaragoza",
      relation: "Hijo",
      stars: 5,
      text: "Llevo 3 meses con ANTEA y puedo confirmar que mi madre está como nunca. Más autónoma, más fuerte, más feliz. El equipo es extraordinario. Mejor decisión que hemos tomado.",
      initial: "LS",
      color: "bg-[rgb(32,113,188)]"
    }
  ];

  return (
    <section id="testimonios" className="w-full bg-gradient-to-b from-white to-slate-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">Opiniones reales</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Familias que ya han visto la transformación en sus seres queridos
          </p>
        </div>

        {/* Grid de testimonios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[rgb(0,94,184)] hover:-translate-y-1"
            >
              {/* Rating estrellas */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <span key={i} className="text-2xl text-yellow-400">★</span>
                ))}
              </div>

              {/* Texto testimonio */}
              <p className="text-slate-700 text-base leading-relaxed mb-8 italic">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Separador */}
              <div className="h-1 bg-gradient-to-r from-[rgb(0,94,184)] to-transparent mb-6"></div>

              {/* Info del cliente */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className={`${testimonial.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                  {testimonial.initial}
                </div>

                {/* Datos */}
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-500 text-sm">
                    {testimonial.relation} • {testimonial.city}
                  </p>
                </div>
              </div>

              {/* Badge verificado */}
              <div className="mt-6 inline-block px-3 py-1 bg-[rgb(191,231,249)] rounded-full border border-[rgb(0,94,184)]/30">
                <span className="text-xs font-semibold text-[rgb(0,94,184)]">
                  ✓ Cliente verificado
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2">9/10</div>
              <p className="text-blue-100">Clientes nos recomiendan</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">+200</div>
              <p className="text-blue-100">Familias atendidas</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">4.9★</div>
              <p className="text-blue-100">Valoración media</p>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">6 años</div>
              <p className="text-blue-100">De experiencia</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-16">
          <p className="text-lg text-slate-600 mb-6">
            ¿Quieres que tu familiar también recupere movilidad y confianza?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
  
          >
            Solicita valoración gratuita
          </a>
        </div>
      </div>
    </section>
  );
}
