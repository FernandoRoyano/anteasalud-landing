export default function TrustBadges() {
  return (
    <section className="w-full bg-white py-12 px-4 border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-slate-500 mb-8 font-medium">
          Reconocidos por:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
          {/* Placeholder badges - reemplaza con logos reales cuando los tengas */}
          <div className="text-center">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-xs font-semibold text-slate-700">Mejor servicio<br/>salud 2024</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-xs font-semibold text-slate-700">4.9 estrellas<br/>Google Reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">✓</div>
            <p className="text-xs font-semibold text-slate-700">Profesionales<br/>colegiados</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🏥</div>
            <p className="text-xs font-semibold text-slate-700">Avalado por<br/>profesionales</p>
          </div>
        </div>
      </div>
    </section>
  );
}
