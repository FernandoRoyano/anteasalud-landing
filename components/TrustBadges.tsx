export default function TrustBadges() {
  const badges = [
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
      ),
      title: 'Profesionales Colegiados',
      subtitle: 'Fisioterapeutas titulados',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ),
      title: '4.9 Estrellas',
      subtitle: '+200 opiniones verificadas',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
        </svg>
      ),
      title: '+6 Años Experiencia',
      subtitle: 'Atención especializada',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: 'Garantía Satisfacción',
      subtitle: 'Primera sesión sin compromiso',
    },
  ];

  return (
    <section className="w-full bg-[rgb(232,237,238)] py-10 px-4 border-y border-[rgb(200,207,210)]">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-[rgb(130,131,130)] mb-6 font-medium uppercase tracking-wide">
          Por qué confiar en nosotros
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-start justify-items-center">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center p-4 rounded-xl hover:bg-white/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-[rgb(0,94,184)] text-white flex items-center justify-center mb-3 shadow-md">
                {badge.icon}
              </div>
              <p className="text-sm font-bold text-[rgb(31,41,51)] mb-1">
                {badge.title}
              </p>
              <p className="text-xs text-[rgb(130,131,130)]">
                {badge.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
