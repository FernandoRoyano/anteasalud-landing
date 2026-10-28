'use client';

export default function GuidesError({ reset }: { reset: () => void }) {
  return <div className="mx-auto max-w-3xl px-5 pb-24 pt-40"><h1 className="font-display text-3xl font-bold text-primary-dark">No hemos podido cargar la guía</h1><p className="mt-5 text-muted">Vuelve a intentarlo en unos instantes.</p><button onClick={reset} className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-white">Volver a intentar</button></div>;
}
