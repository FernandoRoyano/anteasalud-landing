import { Check, Star, GraduationCap, Users, Calendar, Target } from "lucide-react";
import LeadForm from "@/components/LeadForm";

/* ---------- Prueba social (reutilizable) ---------- */
function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        <span className="ml-1 text-sm font-bold text-slate-700">4.9</span>
      </div>
      <p className="text-sm text-slate-600">
        +200 familias en Madrid · Respuesta en menos de 24h
      </p>
    </div>
  );
}

/* ---------- HERO con formulario ---------- */
interface AdsHeroProps {
  h1: string;
  h1Highlight: string;
  subtitle: string;
  bullets: string[];
  formCta: string;
  origen: string;
}

export function AdsHero({ h1, h1Highlight, subtitle, bullets, formCta, origen }: AdsHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#fbfcf8] px-5 pb-20 pt-16 sm:px-8 lg:py-28">
      <div className="antea-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_.96fr]">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#2d6a4f]/20 bg-white/75 px-4 py-2 text-sm font-semibold text-[#2d6a4f] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#74c69d]" /> Atención personalizada en Madrid
          </p>
          <h1 className="font-display text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[.96] tracking-[-.05em] text-[#153e31]">
            {h1}
            <span className="mt-2 block text-[#2d6a4f]">{h1Highlight}</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">{subtitle}</p>

          <ul className="space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[rgb(0,94,184)] mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <LeadForm ctaText={formCta} origen={origen} />
          <SocialProof />
        </div>
      </div>
    </section>
  );
}

/* ---------- Escasez (una línea) ---------- */
export function AdsScarcity({ text }: { text: string }) {
  return (
    <div className="w-full border-y border-white/10 bg-[#17372b] px-4 py-3 text-center">
      <p className="text-sm md:text-base font-semibold text-white">{text}</p>
    </div>
  );
}

/* ---------- Stats de impacto ---------- */
export function AdsStats({ stats }: { stats: string[] }) {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s} className="bg-[rgb(247,249,250)] rounded-2xl p-6 text-center border border-[rgb(232,237,238)]">
            <p className="text-slate-700 font-medium leading-relaxed">{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Historia de caso ---------- */
export function AdsCaseStory({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="w-full bg-[rgb(247,249,250)] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[rgb(232,237,238)]">
          <h2 className="font-display text-fluid-2xl font-black text-[rgb(31,41,51)] mb-6">{title}</h2>
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-slate-600 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Quién soy (credenciales, fijo) ---------- */
export function AdsAbout({ methodology }: { methodology: string }) {
  const creds = [
    { icon: GraduationCap, text: "Graduado en Ciencias de la Actividad Física y el Deporte (CCAFYD)" },
    { icon: Calendar, text: "14 años de experiencia, especializado en personas mayores" },
    { icon: Users, text: "+200 familias en Madrid confían en ANTEA Salud" },
    { icon: Target, text: methodology },
  ];

  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-fluid-2xl font-black text-[rgb(31,41,51)] text-center mb-10">
          Quién va a estar con tu familiar
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {creds.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-4 bg-[rgb(247,249,250)] rounded-2xl p-5 border border-[rgb(232,237,238)]">
              <div className="w-11 h-11 rounded-xl bg-[rgb(191,231,249)] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[rgb(0,94,184)]" />
              </div>
              <p className="text-slate-700 font-medium leading-snug pt-1.5">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Cómo funciona (pasos) ---------- */
export function AdsSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <section className="w-full bg-[rgb(247,249,250)] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-fluid-2xl font-black text-[rgb(31,41,51)] text-center mb-12">
          Cómo funciona
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-white rounded-2xl p-6 border border-[rgb(232,237,238)]">
              <div className="w-10 h-10 rounded-full bg-[rgb(0,94,184)] text-white font-black flex items-center justify-center mb-4">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-[rgb(31,41,51)] mb-2">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonios ---------- */
export function AdsTestimonials({ testimonials }: { testimonials: { text: string; author: string }[] }) {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-fluid-2xl font-black text-[rgb(31,41,51)] text-center mb-12">
          Lo que dicen las familias
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-[rgb(247,249,250)] rounded-2xl p-6 border border-[rgb(232,237,238)] flex flex-col">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 font-bold text-[rgb(31,41,51)] text-sm">{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA final con formulario ---------- */
interface AdsFinalCTAProps {
  title: string;
  subtitle: string;
  formCta: string;
  origen: string;
}

export function AdsFinalCTA({ title, subtitle, formCta, origen }: AdsFinalCTAProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#17372b] px-5 py-24 sm:px-8 lg:py-32">
      <div className="antea-grid absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_.85fr]">
        <div className="text-white space-y-4">
          <h2 className="font-display text-[clamp(2.8rem,5vw,4.8rem)] font-bold leading-[.98] tracking-[-.04em] text-white">{title}</h2>
          <p className="text-lg md:text-xl text-blue-100">{subtitle}</p>
          <p className="text-base text-blue-100">
            Rellena el formulario y Fernando te escribirá en menos de 24 horas.
          </p>
        </div>
        <LeadForm ctaText={formCta} origen={origen} />
      </div>
    </section>
  );
}
