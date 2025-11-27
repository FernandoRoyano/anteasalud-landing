import Image from 'next/image';

export default function Solution() {
  return (
    <section className="w-full bg-gradient-to-b from-[rgb(0,94,184)] to-[rgb(0,60,115)] py-24 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Columna imagen - CON IMAGEN REAL */}
        <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl order-2 md:order-1">
          <Image
            src="/solution-realistic.png"
            alt="Persona mayor recuperando movilidad con ejercicio adaptado en casa"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Columna texto */}
        <div className="space-y-8 order-1 md:order-2">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-semibold text-white">✓ La solución que buscabas</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Profesionales expertos que vienen a casa
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-[rgb(191,231,249)] leading-relaxed">
            <p>
              Imagina la <span className="font-bold text-white">tranquilidad de saber</span> que tu padre o tu madre 
              recibe ejercicio adaptado y fisioterapia profesional <span className="font-bold text-white">sin salir de casa</span>.
            </p>
            
            <p>
              Cuando vayas a verle, podrás disfrutar de un rato agradable sabiendo que cuenta con 
              la ayuda de profesionales titulados que se preocupan de su <span className="font-bold text-white">bienestar físico y emocional</span>.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <p className="font-bold text-white text-xl">
                ✨ Recupera su autonomía. Recupera tu tranquilidad.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <div className="text-4xl font-black text-white">100%</div>
              <p className="text-sm text-[rgb(191,231,249)]">Profesionales titulados</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-white">24/7</div>
              <p className="text-sm text-[rgb(191,231,249)]">Seguimiento continuo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
