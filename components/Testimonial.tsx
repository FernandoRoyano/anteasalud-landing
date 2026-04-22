"use client";

import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

export default function Testimonials() {
  const headerRef = useScrollAnimation();
  const heroRef = useScrollAnimation();
  const gridRef = useScrollAnimation({ stagger: ".testimonial-card", staggerDelay: 0.12 });

  const testimonials = [
    {
      name: "María García",
      city: "Madrid",
      relation: "Hija de usuaria",
      stars: 5,
      text: "Mi madre tenía mucho miedo a caerse después de la operación de cadera. Con ANTEA recuperó la confianza en solo 6 semanas. Ahora camina sola por casa sin ayuda.",
      initial: "MG",
    },
    {
      name: "Juan López",
      city: "Móstoles",
      relation: "Esposo",
      stars: 5,
      text: "Mi esposa está mucho más fuerte y activa. Adaptan los ejercicios a su ritmo. El trato es excepcional.",
      initial: "JL",
    },
    {
      name: "Carmen Rodríguez",
      city: "Alcalá de Henares",
      relation: "Hija",
      stars: 5,
      text: "Llevaba meses sin poder levantarse del sofá. Ahora sube escaleras y va a pasear al parque. Un cambio radical.",
      initial: "CR",
    },
    {
      name: "Roberto Martínez",
      city: "Getafe",
      relation: "Hijo",
      stars: 5,
      text: "No es un servicio genérico: cada sesión cambia según mi padre mejora. Profesionales y humanos a la vez.",
      initial: "RM",
    },
    {
      name: "Ana Fernández",
      city: "Leganés",
      relation: "Cónyuge",
      stars: 5,
      text: "Tras la caída, pensé que mi marido no volvería a ser el mismo. ANTEA me ha devuelto la esperanza.",
      initial: "AF",
    },
    {
      name: "Luis Sánchez",
      city: "Fuenlabrada",
      relation: "Hijo",
      stars: 5,
      text: "En 3 meses mi madre está como nunca. Más autónoma, más fuerte, más feliz. Mejor decisión que hemos tomado.",
      initial: "LS",
    },
  ];

  // Featured = primero. Grid = 3 siguientes. Los 2 últimos solo en SEO schema.
  const [featured, ...rest] = testimonials;
  const gridTestimonials = rest.slice(0, 3);

  // JSON-LD Review schema (mantiene los 6 para Google)
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://anteasalud.com#reviews',
    name: 'ANTEA Salud',
    url: 'https://anteasalud.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: String(testimonials.length),
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.stars),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: t.text,
      itemReviewed: {
        '@type': 'Service',
        name: 'Ejercicio para personas mayores a domicilio',
      },
    })),
  };

  return (
    <section
      id="testimonios"
      className="relative w-full overflow-hidden bg-[#0c1f3a] text-white"
      style={{ paddingTop: 'clamp(5rem, 10vw, 10rem)', paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Mesh gradient dark (blue profundo + accent warmth) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-30%] left-[-15%] w-[70%] h-[70%] rounded-full blur-[140px]"
          style={{ background: 'rgb(0 94 184 / 0.45)' }}
        />
        <div
          className="absolute bottom-[-30%] right-[-15%] w-[65%] h-[65%] rounded-full blur-[130px]"
          style={{ background: 'rgb(224 123 60 / 0.25)' }}
        />
      </div>
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4">

        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-fluid-xl" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <p className="text-fluid-xs font-semibold uppercase tracking-[0.25em] text-accent-light mb-6">
            Opiniones reales
          </p>
          <h2 className="font-display font-black tracking-tight text-white leading-[1.05]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Familias que ya
            <br />
            <span className="text-accent-light">vieron el cambio.</span>
          </h2>
        </div>

        {/* Testimonio destacado — pull quote editorial */}
        <div ref={heroRef} className="relative mb-fluid-xl" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <Quote className="absolute -top-6 -left-2 w-16 h-16 text-accent/30" strokeWidth={1} />
          <blockquote className="relative max-w-4xl">
            <p className="font-display font-medium text-white leading-[1.2] mb-10 tracking-tight"
               style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}>
              &ldquo;{featured.text}&rdquo;
            </p>
            <footer className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                {featured.initial}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-white text-fluid-base">{featured.name}</p>
                  <div className="flex gap-0.5">
                    {[...Array(featured.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" strokeWidth={1} />
                    ))}
                  </div>
                </div>
                <p className="text-fluid-sm text-white/60">
                  {featured.relation} · {featured.city}
                </p>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* Grid compacto — 3 testimonios adicionales */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-5">
          {gridTestimonials.map((t, index) => (
            <div
              key={index}
              className="testimonial-card relative rounded-2xl p-7 bg-white/[0.06] border border-white/10 backdrop-blur-sm hover:bg-white/[0.1] hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" strokeWidth={1} />
                ))}
              </div>
              <p className="text-white/85 text-fluid-base leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-fluid-sm">
                  {t.initial}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-fluid-sm truncate">{t.name}</p>
                  <p className="text-fluid-xs text-white/50 truncate">{t.relation} · {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
