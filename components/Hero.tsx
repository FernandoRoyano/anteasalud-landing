import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-gradient-to-br from-[rgb(191,231,249)] via-white to-[rgb(232,237,238)] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Columna texto */}
        <div className="space-y-8">
          <div className="inline-block px-4 py-2 bg-[rgb(191,231,249)] rounded-full">
            <span className="text-sm font-semibold text-[rgb(0,94,184)]">✓ Profesionales titulados</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Ejercicio y fisioterapia para mejorar la vida de los mayores
            <span className="block text-[rgb(0,94,184)] mt-2">en casa</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl">
            Recupera autonomía, fuerza y confianza sin salir de casa. 
            Profesionales expertos en personas mayores y recuperación funcional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-5 bg-[rgb(0,94,184)] hover:bg-[rgb(32,113,188)] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              Solicita valoración gratuita
            </a>
            <a
              href="tel:+34633261963"
              className="inline-flex items-center justify-center px-8 py-5 bg-white border-2 border-[rgb(0,94,184)] text-[rgb(0,94,184)] font-semibold text-lg rounded-2xl hover:bg-[rgb(191,231,249)] hover:shadow-lg transition-all duration-200"
            >
              📞 633 261 963
            </a>
          </div>
          
          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-[rgb(0,94,184)] border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-[rgb(32,113,188)] border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-[rgb(191,231,249)] border-2 border-white"></div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">+200 familias</p>
              <p className="text-sm text-[rgb(130,131,130)]">ya confían en VITALIA</p>
            </div>
          </div>
        </div>
        
        {/* Columna imagen */}
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(0,94,184)]/20 to-[rgb(191,231,249)]/30"></div>
          <Image
            src="/hero-realistic.png"
            alt="Profesional de VITALIA cuidando a persona mayor"
            fill
            className="object-cover"
            priority
          />

          <div className="w-full h-full bg-gradient-to-br from-[rgb(191,231,249)] to-[rgb(232,237,238)] flex items-center justify-center">
            <p className="text-2xl font-bold text-[rgb(130,131,130)]">Imagen profesional aquí</p>
          </div>
        </div>
      </div>
    </section>
  );
}
