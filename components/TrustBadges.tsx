export default function TrustBadges() {
  return (
    <section className="w-full bg-[rgb(191,231,249)] py-12 px-4 border-y border-[rgb(200,207,210)]">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-[rgb(130,131,130)] mb-8 font-medium">
          Reconocidos por:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {/* Placeholder badges - reemplaza con logos reales cuando los tengas */}
          <div className="text-center">
            <div className="text-4xl mb-2 text-[rgb(0,94,184)]">🏆</div>
            <p className="text-xs font-semibold text-[rgb(31,41,51)]">Mejor servicio<br/>salud 2024</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 text-[rgb(0,94,184)]">⭐</div>
            <p className="text-xs font-semibold text-[rgb(31,41,51)]">4.9 estrellas<br/>Google Reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 text-[rgb(0,94,184)]">✓</div>
            <p className="text-xs font-semibold text-[rgb(31,41,51)]">Profesionales<br/>colegiados</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2 text-[rgb(0,94,184)]">🏥</div>
            <p className="text-xs font-semibold text-[rgb(31,41,51)]">Avalado por<br/>profesionales</p>
          </div>
        </div>
      </div>
    </section>
  );
}
