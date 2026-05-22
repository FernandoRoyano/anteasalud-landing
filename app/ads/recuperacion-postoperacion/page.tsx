import type { Metadata } from "next";
import {
  AdsHero,
  AdsScarcity,
  AdsStats,
  AdsCaseStory,
  AdsAbout,
  AdsSteps,
  AdsTestimonials,
  AdsFinalCTA,
} from "@/components/ads/AdsSections";

const ORIGEN = "Ads · Recuperación post-operación";

export const metadata: Metadata = {
  title: "Recuperación tras operación a domicilio en Madrid | ANTEA Salud",
  description:
    "El alta médica no es el final de la recuperación. Un entrenador titulado diseña el programa de vuelta a la actividad tras una operación de cadera o rodilla, en tu domicilio. Valoración gratuita.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <AdsHero
        h1="¿Tu padre acaba de salir del hospital"
        h1Highlight="tras la operación?"
        subtitle="El alta médica no es el final de la recuperación. Un entrenador titulado diseña el programa de vuelta a la actividad en tu domicilio. Sin esperas. Sin traslados."
        bullets={[
          "Programa de readaptación a domicilio tras cirugía de cadera o rodilla",
          "Coordinación con tu médico o fisioterapeuta si es necesario",
          "Graduado en Ciencias del Deporte · 14 años de experiencia",
          "Sin permanencia: pagas el mes y, si no quieres, no seguimos",
        ]}
        formCta="Quiero la valoración gratuita →"
        origen={ORIGEN}
      />

      <AdsScarcity text="Cada semana sin ejercicio guiado tras una operación es masa muscular perdida." />

      <AdsStats
        stats={[
          "Se puede perder hasta un 3% de masa muscular por semana de inactividad.",
          "Buena parte de los operados de cadera no recupera la función completa sin trabajo guiado.",
          "El ejercicio supervisado tras cirugía reduce el riesgo de recaída.",
        ]}
      />

      <AdsCaseStory
        title="El caso de José Luis: caminar de nuevo sin bastón"
        paragraphs={[
          "José Luis (71 años, Carabanchel) salió del hospital tras una prótesis de rodilla con el alta médica… y la sensación de estar solo ante el «¿ahora qué?». La fisioterapia había terminado, pero seguía cojeando y con miedo a forzar. Su hijo no sabía si empujarle o frenarle.",
          "Empezamos coordinados con su médico: fase de movilidad (semanas 1-2), fuerza progresiva (semanas 3-6) y reincorporación a su vida (mantenimiento).",
          "A las 8 semanas caminaba sin bastón. Hoy ha vuelto a su partida de petanca de los jueves.",
        ]}
      />

      <AdsAbout methodology="No sustituyo a la fisioterapia: la complemento. Trabajo coordinado con tu médico o fisio cuando hace falta." />

      <AdsSteps
        steps={[
          { title: "Fase 1 · Movilidad", text: "Semanas 1-2: recuperar rango de movimiento y activar la musculatura sin forzar, con total seguridad." },
          { title: "Fase 2 · Fuerza", text: "Semanas 3-6: ejercicio de fuerza progresivo para devolver estabilidad y autonomía a la articulación operada." },
          { title: "Fase 3 · Vuelta a la vida", text: "Mantenimiento: reincorporación a sus actividades cotidianas con un cuerpo más fuerte que antes." },
        ]}
      />

      <AdsTestimonials
        testimonials={[
          { text: "Tras la operación de cadera de mi padre no sabíamos cómo seguir. Nos guió paso a paso y coordinado con el médico. Recomendadísimo.", author: "Javier M., Getafe" },
          { text: "Mi madre tenía pánico a moverse después de la operación. En semanas recuperó la confianza y la fuerza.", author: "Marta R., Chamartín" },
          { text: "Viene a casa, puntual, y se nota la formación que tiene. Mi suegra está más fuerte y más animada.", author: "Lucía F., Móstoles" },
        ]}
      />

      <AdsFinalCTA
        title="No pierdas las semanas más importantes"
        subtitle="Solo 5 nuevas familias al mes. Solicita la valoración gratuita y empieza la recuperación esta semana."
        formCta="Quiero la valoración gratuita →"
        origen={ORIGEN}
      />
    </>
  );
}
