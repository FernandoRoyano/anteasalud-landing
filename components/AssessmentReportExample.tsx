import Image from 'next/image';

export default function AssessmentReportExample() {
  return <section aria-labelledby="report-example-title" className="border-y border-primary/15 bg-[#f3f8f4] px-5 py-16 sm:px-8">
    <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[1fr_.65fr] md:gap-14">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">El seguimiento, explicado</p>
        <h2 id="report-example-title" className="mt-4 font-display text-fluid-3xl font-bold text-primary-dark">Qué hemos observado, qué significa y qué vamos a trabajar.</h2>
        <p className="mt-5 text-lg leading-relaxed text-muted">El informe explica cómo se mueve la persona, qué dificultades hemos observado y qué objetivos proponemos trabajar. Las pruebas y los resultados técnicos ayudan a fundamentar esa explicación. Durante el programa de ejercicio pautado, la revisión mensual permite comparar la evolución y ajustar el trabajo.</p>
        <ul className="mt-5 list-inside list-disc space-y-2 text-muted"><li>Qué hemos visto durante la visita y cómo se ha encontrado.</li><li>Qué significa para sus movimientos cotidianos.</li><li>Qué objetivos y siguientes pasos proponemos.</li></ul>
        <a href="/ejemplos/Antea-informe-ejemplo.pdf" download className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 font-bold text-white hover:bg-primary-dark">Descargar informe de ejemplo (PDF)</a>
        <p className="mt-4 text-sm leading-relaxed text-muted">Ejemplo con datos completamente ficticios. Muestra el formato del informe, no resultados de un cliente ni una pauta para hacer ejercicio por tu cuenta. La información real se comparte con la familia de acuerdo con la persona valorada.</p>
      </div>
      <figure className="mx-auto w-full max-w-xs"><Image src="/ejemplos/informe-ejemplo.webp" alt="Primera página de un informe de demostración con resultados ficticios, carnet orientativo y observaciones" width={595} height={842} className="h-auto w-full rounded-lg border border-primary/20 bg-white shadow-lg" /><figcaption className="mt-3 text-center text-sm text-muted">Vista previa · datos ficticios</figcaption></figure>
    </div>
  </section>;
}
