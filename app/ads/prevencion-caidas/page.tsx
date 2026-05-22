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

const ORIGEN = "Ads · Prevención de caídas";

export const metadata: Metadata = {
  title: "Prevención de caídas en mayores a domicilio | ANTEA Salud Madrid",
  description:
    "¿Tu padre o madre tiene miedo a caerse en casa? Un profesional titulado va a su domicilio en Madrid y diseña un programa para recuperar equilibrio y confianza. Valoración gratuita.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <AdsHero
        h1="¿Tu padre o madre"
        h1Highlight="tiene miedo a caerse en casa?"
        subtitle="Un profesional titulado va a su domicilio en Madrid y diseña un programa específico para recuperar el equilibrio y la confianza. Primera valoración gratuita."
        bullets={[
          "Valoración del riesgo de caídas a domicilio, gratis",
          "Programa de fuerza y equilibrio personalizado",
          "Graduado en Ciencias del Deporte · 14 años de experiencia",
          "Sin permanencia: pagas el mes y, si no quieres, no seguimos",
        ]}
        formCta="Quiero la valoración gratuita →"
        origen={ORIGEN}
      />

      <AdsScarcity text="Este mes solo admito 5 nuevas familias en tu zona." />

      <AdsStats
        stats={[
          "1 de cada 3 personas mayores de 65 sufre una caída cada año.",
          "El 30% de las caídas provoca una lesión que requiere atención.",
          "Gran parte son prevenibles con ejercicio de fuerza y equilibrio.",
        ]}
      />

      <AdsCaseStory
        title="El caso de Carmen: volver a bajar sola las escaleras"
        paragraphs={[
          "Carmen (78 años, barrio de Prosperidad) llegó tras dos caídas en tres meses. Su hija Marta había dejado de dormir: trabajaba todo el día y vivía con el móvil en la mano por si sonaba el teléfono. Carmen ya no bajaba sola a comprar el pan — había perdido la confianza.",
          "En la primera valoración detectamos debilidad en las piernas y un mal apoyo del pie. Diseñamos un programa de 2 sesiones semanales centrado en fuerza de tren inferior y equilibrio.",
          "A las 6 semanas, Carmen volvió a bajar sola las escaleras de su portal. Hoy pasea cada mañana y Marta vuelve a dormir del tirón.",
        ]}
      />

      <AdsAbout methodology="Metodología en 4 pilares: fuerza, equilibrio, capacidad de reacción y seguridad del entorno." />

      <AdsSteps
        steps={[
          { title: "Valoración gratuita", text: "Voy a casa, evalúo equilibrio, fuerza y riesgo de caídas, y resuelvo tus dudas. Sin compromiso." },
          { title: "Programa a medida", text: "Diseño un plan de ejercicio específico para recuperar estabilidad y confianza, adaptado a su condición." },
          { title: "Acompañamiento", text: "Sesiones a domicilio con seguimiento de la evolución. Ajustamos el programa según los avances." },
        ]}
      />

      <AdsTestimonials
        testimonials={[
          { text: "Mi madre tenía pánico a caerse. En mes y medio volvió a moverse por casa con seguridad. Fernando es un profesional como pocos.", author: "Marta R., Chamartín" },
          { text: "Tras la operación de cadera de mi padre no sabíamos cómo seguir. Nos guió paso a paso y coordinado con el médico. Recomendadísimo.", author: "Javier M., Getafe" },
          { text: "Viene a casa, puntual, y se nota la formación que tiene. Mi suegra está más fuerte y más animada.", author: "Lucía F., Móstoles" },
        ]}
      />

      <AdsFinalCTA
        title="Recupera su confianza al caminar"
        subtitle="Solo 5 nuevas familias al mes. Solicita la valoración gratuita y empieza esta semana."
        formCta="Quiero la valoración gratuita →"
        origen={ORIGEN}
      />
    </>
  );
}
