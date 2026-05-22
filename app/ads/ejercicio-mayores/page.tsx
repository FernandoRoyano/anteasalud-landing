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

const ORIGEN = "Ads · Ejercicio mayores";

export const metadata: Metadata = {
  title: "Entrenador para mayores a domicilio en Madrid | ANTEA Salud",
  description:
    "Recupera la fuerza y la autonomía de tu padre o madre desde su casa. Un profesional titulado va a su domicilio en Madrid con sesiones adaptadas a su ritmo. Valoración gratuita.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <AdsHero
        h1="Recupera la fuerza y la autonomía de tu padre"
        h1Highlight="desde su casa"
        subtitle="Un profesional titulado va a su domicilio en Madrid. Sesiones adaptadas a su ritmo, a su condición y a sus objetivos. Primera valoración gratuita."
        bullets={[
          "Entrenamiento funcional a domicilio adaptado a su condición",
          "Más fuerza, más energía y menos riesgo de caídas",
          "Graduado en Ciencias del Deporte · 14 años de experiencia",
          "Sin permanencia: pagas el mes y, si no quieres, no seguimos",
        ]}
        formCta="Quiero la valoración gratuita →"
        origen={ORIGEN}
      />

      <AdsScarcity text="Este mes solo admito 5 nuevas familias en tu zona." />

      {/* Problema + solución */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
            Lo ves perder fuerza cada mes. Sabes que necesita moverse. Pero entre el trabajo, los niños y la distancia, no puedes llevarlo. Y los centros de día no son la solución que buscas.
          </p>
          <p className="font-display text-fluid-2xl font-black text-[rgb(0,94,184)]">
            Nosotros vamos a él.
          </p>
        </div>
      </section>

      <AdsStats
        stats={[
          "En 4 semanas: nota mejoría en fuerza y energía.",
          "En 6 semanas: reduce el riesgo de caídas.",
          "En 3 meses: recupera actividades que había abandonado.",
        ]}
      />

      <AdsCaseStory
        title="El caso de Concha: recuperar fuerza a los 82 años"
        paragraphs={[
          "Concha (82 años, barrio de Pacífico) llegó con parestesia en la pierna izquierda: hormigueo y pérdida de sensibilidad que le hacían difícil algo tan básico como levantarse de la silla o caminar con seguridad. Mujer menuda y con poca masa muscular, cada movimiento le costaba y el miedo a fallar la frenaba aún más.",
          "En la valoración vimos lo principal: faltaba fuerza, y sin fuerza no hay estabilidad ni confianza. Diseñamos un programa centrado en ejercicios de fuerza adaptados a su condición, progresando despacio y respetando sus sensaciones.",
          "El trabajo está dando sus frutos: Concha gana fuerza y movilidad sesión a sesión, se levanta con menos esfuerzo y se mueve con más seguridad por casa. Un recordatorio de que la fuerza se entrena a cualquier edad — y de que nunca es tarde para empezar.",
        ]}
      />

      <AdsAbout methodology="Entrenamiento funcional adaptado: fuerza, movilidad y equilibrio progresivos, respetando el ritmo de cada persona." />

      <AdsSteps
        steps={[
          { title: "Valoración gratuita", text: "Voy a casa, evalúo su condición física y hablamos de objetivos. Sin compromiso." },
          { title: "Programa a medida", text: "Diseño un plan de ejercicio funcional adaptado a su ritmo y a lo que quiere recuperar." },
          { title: "Acompañamiento", text: "Sesiones a domicilio con seguimiento. Vemos la evolución y ajustamos sobre la marcha." },
        ]}
      />

      {/* Precio con ancla de valor + sin permanencia */}
      <section className="w-full bg-[rgb(247,249,250)] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="font-display text-fluid-2xl font-black text-[rgb(31,41,51)]">
            ¿Cuánto vale que tu padre pueda ducharse solo?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            ¿Que no tengas que preocuparte cada vez que te llaman? Sesiones desde <strong>45€</strong>, adaptadas a su caso.
          </p>
          <p className="text-lg font-bold text-[rgb(0,94,184)]">
            Sin permanencia. Pagas el mes y, si no quieres seguir, no sigues.
          </p>
        </div>
      </section>

      <AdsTestimonials
        testimonials={[
          { text: "Viene a casa, puntual, y se nota la formación que tiene. Mi suegra está más fuerte y más animada.", author: "Lucía F., Móstoles" },
          { text: "Mi madre tenía pánico a caerse. En mes y medio volvió a moverse por casa con seguridad. Un profesional como pocos.", author: "Marta R., Chamartín" },
          { text: "Tras la operación de mi padre nos guió paso a paso y coordinado con el médico. Recomendadísimo.", author: "Javier M., Getafe" },
        ]}
      />

      <AdsFinalCTA
        title="Que recupere su vida, desde casa"
        subtitle="Solo 5 nuevas familias al mes. Solicita la valoración gratuita y empieza esta semana."
        formCta="Quiero la valoración gratuita →"
        origen={ORIGEN}
      />
    </>
  );
}
