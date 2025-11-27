export default function Problem() {
  return (
    <section className="w-full bg-[rgb(232,237,238)] py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16 space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-[rgb(31,41,51)] leading-tight">
            Llega un momento en el que notas que pierde movilidad
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-[rgb(130,131,130)] leading-relaxed">
            <p>
              Le cuesta levantarse del sofá, tiene miedo a caerse, ha perdido fuerza en las piernas. 
              Vas a verle siempre que puedes, pero entre tu trabajo, los hijos y el día a día, 
              <span className="font-bold text-[rgb(31,41,51)]"> te come la preocupación</span>.
            </p>
            
            <p>
              Sabes que necesita <span className="font-semibold text-[rgb(0,94,184)]">ejercicio adaptado y fisioterapia profesional</span>, 
              pero no tienes tiempo para llevarlo cada semana a la clínica. 
              Y tampoco quieres que pierda más autonomía esperando "a ver qué pasa".
            </p>
            
            <div className="bg-[rgb(191,231,249)] border-l-4 border-[rgb(0,94,184)] p-6 rounded-r-2xl">
              <p className="font-bold text-[rgb(31,41,51)]">
                ⚠️ Esperar demasiado puede hacer que la recuperación sea más lenta y complicada, 
                tanto para la persona que lo necesita como para toda la familia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
