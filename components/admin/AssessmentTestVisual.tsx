import Image from 'next/image';
import { ASSESSMENT_VIDEO, ASSESSMENT_VISUALS, BALANCE_STANCES, SHOE_HEIGHT, SHOE_WIDTH } from '@/lib/assessment-visuals';
import { VIVIFRAIL_SOURCE } from '@/lib/functional-assessment';

export default function AssessmentTestVisual({ index }: { index: number }) {
  const visual = ASSESSMENT_VISUALS[index];
  if (index !== 0 && !visual) return null;

  return <figure className="mt-5 min-w-0 overflow-hidden rounded-xl border border-primary/20 bg-[#fcf8f1] p-3 sm:p-5">
    {index === 0 ? <>
      <p className="mb-3 font-semibold text-primary-dark">Posición de los pies · vista desde arriba</p>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">{BALANCE_STANCES.map(stance => <div key={stance.id} className="min-w-0 text-center">
        <svg viewBox="0 0 240 420" role="img" aria-label={stance.description} className="mx-auto block w-full max-w-44">
          {stance.id === 'semi' && <path d="M 35 200 H 195" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeDasharray="6 6" />}
          <image href="/valoraciones/antea/pie-cenital.png" x={stance.left.x} y={stance.left.y} width={SHOE_WIDTH} height={SHOE_HEIGHT} preserveAspectRatio="none" />
          <image href="/valoraciones/antea/pie-cenital.png" x={240 - stance.right.x - SHOE_WIDTH} y={stance.right.y} width={SHOE_WIDTH} height={SHOE_HEIGHT} preserveAspectRatio="none" transform="translate(240 0) scale(-1 1)" />
        </svg>
        <p className="mt-2 text-sm font-bold text-primary-dark sm:text-base">{stance.label}</p>
      </div>)}</div>
      <ol className="mt-4 space-y-2 text-sm leading-relaxed text-muted">{BALANCE_STANCES.map(stance => <li key={stance.id}><strong>{stance.label}:</strong> {stance.description}</li>)}</ol>
    </> : visual && <>
      <Image src={`/valoraciones/antea/${visual.file}`} alt={visual.alt} width={visual.width} height={visual.height} sizes="(min-width: 1280px) 850px, (min-width: 1024px) 70vw, 100vw" className="mx-auto h-auto w-full max-w-4xl rounded-lg" />
      <p className="mt-3 text-center font-semibold text-primary-dark">{visual.label}</p>
      {index === 3 && <p className="mt-2 text-center text-sm text-muted">La imagen muestra distintos momentos de una misma persona. El tiempo termina al volver a sentarse.</p>}
    </>}
    <figcaption className="mt-4 border-t border-primary/15 pt-3 text-sm leading-relaxed text-muted">
      Ilustraciones propias de ANTEA creadas con IA. Apoyo visual, no material oficial de Vivifrail ni sustituto del protocolo completo.
      <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1"><a href={`${VIVIFRAIL_SOURCE}#page=${[8, 9, 10, 13, 14][index]}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Consultar la prueba oficial</a><a href={ASSESSMENT_VIDEO} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Ver vídeo oficial de valoración</a></span>
    </figcaption>
  </figure>;
}
