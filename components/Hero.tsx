import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 pt-24 pb-16">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Columna texto */}
        <div className="space-y-8">
          <div className="inline-block px-4 py-2 bg-orange-100 rounded-full">
            <span className="text-sm font-semibold text-orange-600">✓ Profesionales titulados</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Ejercicio y fisioterapia para mejorar la vida de los mayores
            <span className="block text-orange-500 mt-2">en casa</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl">
            Recupera autonomía, fuerza y confianza sin salir de casa. 
            Profesionales expertos en personas mayores y recuperación funcional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              Solicita valoración gratuita
            </a>
            <a
              href="tel:+34633261963"
              className="inline-flex items-center justify-center px-8 py-5 bg-white border-2 border-slate-200 text-slate-900 font-semibold text-lg rounded-2xl hover:border-slate-300 hover:shadow-lg transition-all duration-200"
            >
              📞 633 261 963
            </a>
          </div>
          
          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-200 border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-orange-200 border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-green-200 border-2 border-white"></div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">+200 familias</p>
              <p className="text-sm text-slate-500">ya confían en ANTEA</p>
            </div>
          </div>
        </div>
        
        {/* Columna imagen */}
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-orange-500/20"></div>
          <Image
  src="/hero-realistic.png"    // Ruta de la imagen en /public
  alt="Descripción de la imagen"  // Para SEO y accesibilidad
  fill                           // Llena todo el contenedor padre
  className="object-cover"       // La imagen cubre todo el espacio sin deformarse
  priority                       // Carga esta imagen primero (importante en Hero)
/>

          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
            <p className="text-2xl font-bold text-slate-400">Imagen profesional aquí</p>
          </div>
        </div>
      </div>
    </section>
  );
}
