'use client';

import Link from 'next/link';
import AssessmentReportView from '@/components/admin/AssessmentReportView';
import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Pause, Download } from 'lucide-react';
import { ASSESSMENT_VERSION, VIVIFRAIL_MATERIALS, VIVIFRAIL_SOURCE, canExportAssessment, evaluateAssessment, fallCriteria, fallRiskLabel, functionalTests, type AssessmentInput } from '@/lib/functional-assessment';

const inputClass = 'mt-2 block min-h-12 w-full rounded-xl border border-primary/40 bg-white px-4 py-3 text-ink';
const initialAssessment: AssessmentInput = { age: null, scores: [null, null, null], falls: [null, null, null, null], interrupted: false, suitable: false };

const steps = ['Preparación', 'Equilibrio', 'Marcha', 'Silla', 'Caídas', 'Informe'];

export default function AssessmentsPage() {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [savedId, setSavedId] = useState('');
  const savedAttempt = useRef({ content: '', id: '' });
  const [step, setStep] = useState(0);
  const stepHeading = useRef<HTMLParagraphElement>(null);
  const previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current !== step) stepHeading.current?.focus();
    previousStep.current = step;
  }, [step]);
  const [assessment, setAssessment] = useState<AssessmentInput>(initialAssessment);
  const [reference, setReference] = useState('');
  const [date, setDate] = useState('');
  const [observations, setObservations] = useState('');
  const [proposal, setProposal] = useState('');
  const [reviewed, setReviewed] = useState(false);
  const result = evaluateAssessment(assessment);
  const canPrint = canExportAssessment(assessment, { reference, date, proposal, observations, reviewed });
  const completed = [!!reference.trim() && !!date && assessment.age !== null && assessment.suitable, ...assessment.scores.map(score => score !== null), assessment.falls.every(value => value !== null), canPrint];
  const completedCount = completed.filter(Boolean).length;

  async function saveReport(download = false) {
    if (!canPrint || saving) return;
    setSaving(true);
    setSaveError('');
    const payload = { assessment, reference, date, observations, proposal, reviewed };
    const content = JSON.stringify(payload);
    if (savedAttempt.current.content !== content) savedAttempt.current = { content, id: crypto.randomUUID() };
    try {
      const res = await fetch('/api/admin/valoraciones', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(30000), body: JSON.stringify({ ...payload, id: savedAttempt.current.id }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo guardar el informe');
      setSavedId(data.id);
      if (download) {
        const pdf = await fetch(`/api/admin/valoraciones/${data.id}/pdf`, { signal: AbortSignal.timeout(30000) });
        if (!pdf.ok) throw new Error('El informe está guardado, pero no se pudo descargar el PDF. Ábrelo desde el historial para intentarlo de nuevo.');
        const url = URL.createObjectURL(await pdf.blob());
        const link = document.createElement('a');
        link.href = url;
        link.download = `antea-informe-${date}-${data.id.slice(0, 8)}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      }
    } catch (error) { setSaveError(error instanceof Error ? error.message : 'Error al guardar. Vuelve a intentarlo.'); }
    finally { setSaving(false); }
  }

  function update(values: Partial<AssessmentInput>) {
    setReviewed(false);
    setAssessment(previous => ({ ...previous, ...values }));
  }

  return (
    <div className="mx-auto max-w-6xl text-ink">
      <div className="print:hidden">
        <p className="font-semibold text-primary">Herramienta profesional · ANTEA Salud</p>
        <Link href="/admin/valoraciones/informes" className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-primary/25 bg-white px-4 py-2 font-semibold text-primary">Ver informes guardados</Link><h1 className="mt-3 font-display text-fluid-3xl font-bold">Valoración funcional</h1>
        <p className="mt-4 max-w-3xl text-muted">Una prueba cada vez. Lee las instrucciones, registra los puntos y revisa el informe antes de compartirlo con la familia.</p>
        <p className="mt-4 rounded-xl border border-primary/20 bg-white p-4 text-base">Mientras trabajas, los datos permanecen en esta página. Al terminar, pulsa Guardar informe para conservar una copia revisada en tu historial privado. Los cambios sin guardar se pierden al salir.</p>
        <a href={VIVIFRAIL_SOURCE} target="_blank" rel="noreferrer" className="mt-4 inline-block font-semibold text-primary underline">Abrir protocolo y tablas oficiales de Vivifrail (PDF)</a>

        <nav aria-label="Pasos de la valoración" className="mt-7 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {steps.map((label, index) => <button key={label} type="button" onClick={() => setStep(index)} aria-current={step === index ? 'step' : undefined} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border p-2 text-sm font-semibold transition-colors ${step === index ? 'border-primary bg-primary-dark text-white' : 'border-primary/20 bg-white text-muted hover:bg-primary-50'}`}><span aria-hidden="true">{completed[index] ? <Check className="size-4" /> : index + 1}</span>{label}<span className="sr-only">{completed[index] ? 'Completado' : 'Pendiente'}</span></button>)}
        </nav>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p ref={stepHeading} tabIndex={-1} className="font-semibold text-primary outline-none">Paso {step + 1} de {steps.length} · {steps[step]}</p>
          <p className="text-sm text-muted">{completedCount} de {steps.length} pasos completos</p>
        </div>
        <progress aria-label="Pasos completos" value={completedCount} max={steps.length} className="mt-3 h-2 w-full accent-primary" />
        {assessment.interrupted && <p role="status" className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">Valoración interrumpida. Los datos se conservan mientras sigas aquí. Explica el motivo en el informe; no se asignará un perfil automático.</p>}
        {step >= 1 && step <= 4 && !assessment.suitable && <p role="status" className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">Antes de realizar pruebas, revisa su idoneidad en Preparación. Puedes dejar pruebas pendientes e ir al informe.</p>}

        {(step === 0) && (<section className="mt-8 rounded-2xl border border-primary/20 bg-white p-5 sm:p-7">
          <h2 className="font-display text-2xl font-bold">Datos y preparación</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <label>Referencia o iniciales<input className={inputClass} maxLength={100} value={reference} onChange={e => { setReference(e.target.value); setReviewed(false); }} autoComplete="off" /></label>
            <label>Fecha<input className={inputClass} type="date" value={date} onChange={e => { setDate(e.target.value); setReviewed(false); }} /></label>
            <label>Edad<input className={inputClass} type="number" min={0} max={120} value={assessment.age ?? ''} onChange={e => update({ age: e.target.value === '' ? null : Number(e.target.value) })} /></label>
          </div>
          <label className="mt-6 flex items-start gap-3"><input className="mt-1 size-5 shrink-0 accent-primary" type="checkbox" checked={assessment.suitable} onChange={e => update({ suitable: e.target.checked })} /><span>He revisado las indicaciones sanitarias, las contraindicaciones del protocolo y la idoneidad de las pruebas para esta persona.</span></label>
          <label className="mt-4 flex items-start gap-3"><input className="mt-1 size-5 shrink-0 accent-primary" type="checkbox" checked={assessment.interrupted} onChange={e => update({ interrupted: e.target.checked })} /><span>Valoración interrumpida o suspendida por tolerancia, síntomas u otro motivo. Documentar en observaciones.</span></label>
        </section>)}

        {(step >= 1 && step <= 3) && (<section className="mt-7 rounded-2xl border border-primary/20 bg-white p-5 sm:p-7">
          <h2 className="font-display text-2xl font-bold">Prueba SPPB</h2>
          <p className="mt-3 text-muted">Introduce la puntuación de cada componente, de 0 a 4, según el protocolo. Deja «Pendiente» si no se ha valorado. Un cero debe corresponder a una puntuación válida del protocolo, no a un dato ausente.</p>
          <div className="mt-6 space-y-6">{functionalTests.map((test, index) => step === index + 1 ? <fieldset key={test.name} className="border-t border-primary/20 pt-5"><legend className="px-1 font-display text-xl font-bold">{test.name}</legend><p className="mt-2 max-w-3xl text-muted">{test.description}</p><ScoreGuide index={index} /><a href={`${VIVIFRAIL_SOURCE}#page=${[8, 9, 10][index]}`} target="_blank" rel="noreferrer" className="mt-3 inline-block font-semibold text-primary underline">Ver instrucciones y tabla oficial de esta prueba</a><ChoiceButtons label="Puntuación obtenida" value={assessment.scores[index] === null ? '' : String(assessment.scores[index])} options={[{ value: '', label: 'Pendiente' }, ...[0, 1, 2, 3, 4].map(score => ({ value: String(score), label: `${score} puntos` }))]} onChange={value => { const scores = [...assessment.scores] as AssessmentInput['scores']; scores[index] = value === '' ? null : Number(value); update({ scores }); }} /></fieldset> : null)}</div>
        </section>)}

        {(step === 4) && (<section className="mt-7 rounded-2xl border border-primary/20 bg-white p-5 sm:p-7">
          <h2 className="font-display text-2xl font-bold">Criterios de riesgo de caídas</h2>
          <p className="mt-3 text-muted">Registra cada criterio por separado. «Pendiente» no se interpreta como «No». No diagnostiques deterioro cognitivo con esta herramienta.</p>
          <div className="mt-5 space-y-5">{fallCriteria.map((criterion, index) => <div key={criterion} className="border-t border-primary/15 pt-2"><ChoiceButtons label={criterion} value={assessment.falls[index] === null ? '' : assessment.falls[index] ? 'yes' : 'no'} options={[{ value: '', label: 'Pendiente' }, { value: 'yes', label: 'Sí' }, { value: 'no', label: 'No' }]} onChange={value => { const falls = [...assessment.falls] as AssessmentInput['falls']; falls[index] = value === '' ? null : value === 'yes'; update({ falls }); }} /></div>)}</div>
        </section>)}

        {(step === 5) && (<section className="mt-7 rounded-2xl bg-primary-dark p-6 text-white" aria-live="polite" aria-atomic="true">
          <h2 className="font-display text-2xl font-bold">Evaluación automática orientativa</h2>
          <p className="mt-4 text-2xl font-bold">SPPB: {result.total === null ? 'pendiente' : `${result.total} / 12`}</p>
          {result.profile && <p className="mt-3 text-xl font-bold">Perfil de referencia: {result.profile}</p>}
          <p className="mt-4">{result.interpretation}</p><p className="mt-3">{fallRiskLabel(result.risk)}</p>
          <p className="mt-4 text-base text-white/90">Se calcula a partir de SPPB completa para personas de 70 años o más. No se asigna el perfil avanzado E con la SPPB sola, ni se clasifica automáticamente mediante la alternativa de marcha de 6 metros.</p>
          {result.profile && <a href={VIVIFRAIL_MATERIALS} target="_blank" rel="noreferrer" className="mt-4 inline-block font-bold underline">Consultar los ejercicios del pasaporte {result.profile} en los materiales oficiales →</a>}
        </section>)}

        {(step === 5) && (<section className="mt-7 rounded-2xl border border-primary/20 bg-white p-5 sm:p-7">
          <h2 className="font-display text-2xl font-bold">Interpretación y propuesta profesional</h2>
          <label className="mt-5 block">Observaciones, apoyos utilizados y motivos de pruebas pendientes<textarea className={inputClass} rows={4} maxLength={4000} value={observations} onChange={e => { setObservations(e.target.value); setReviewed(false); }} /></label>
          <label className="mt-5 block">Tu interpretación y propuesta para la familia<textarea className={inputClass} rows={5} maxLength={4000} value={proposal} onChange={e => { setProposal(e.target.value); setReviewed(false); }} placeholder="Objetivos, limitaciones, ejercicios a revisar, frecuencia orientativa y siguientes pasos..." /></label>
          <label className="mt-5 flex items-start gap-3"><input className="mt-1 size-5 shrink-0 accent-primary" type="checkbox" checked={reviewed} onChange={e => setReviewed(e.target.checked)} /><span>He revisado las puntuaciones, la interpretación y la propuesta. Si faltan pruebas, he explicado sus limitaciones y el siguiente paso en el informe.</span></label>
          <button type="button" disabled={!canPrint || saving} onClick={() => saveReport()} className="mt-6 mr-3 min-h-12 rounded-full bg-primary-dark px-6 py-3 font-bold text-white disabled:opacity-50">{saving ? 'Guardando...' : 'Guardar informe en el historial'}</button>
          {savedId && <p role="status" className="mt-4 rounded-xl bg-primary-50 p-4 text-primary">Informe guardado. <Link className="font-bold underline" href={`/admin/valoraciones/informes/${savedId}`}>Abrir la copia guardada y compartir PDF</Link>. Los cambios posteriores requieren guardar otra copia.</p>}
          {saveError && <p role="alert" className="mt-4 text-red-700">{saveError}</p>}
          <button type="button" disabled={!canPrint || saving} onClick={() => saveReport(true)} className="mt-6 min-h-12 rounded-full bg-primary px-6 py-3 font-bold text-white disabled:opacity-50"><Download className="mr-2 inline size-5" aria-hidden="true" />Guardar y descargar PDF</button>
          <p className="mt-3 text-base text-muted">La descarga también guarda una copia revisada en tu historial. Para continuar, indica referencia, fecha y propuesta y confirma tu revisión. El envío al familiar lo realizas tú por el medio acordado.</p>
        </section>)}
        {step === 5 && !canPrint && <div role="status" className="mt-5 rounded-xl border border-primary/20 bg-primary-50 p-4 text-sm text-muted"><p className="font-semibold text-primary-dark">Para generar el PDF:</p><ul className="mt-2 list-inside list-disc">{!reference.trim() && <li>Indica la referencia de la persona en Preparación.</li>}{!date && <li>Indica la fecha en Preparación.</li>}{proposal.trim().length < 10 && <li>Escribe tu propuesta para la familia (al menos 10 caracteres).</li>}{assessment.interrupted && observations.trim().length < 10 && <li>Explica el motivo de interrupción en observaciones (al menos 10 caracteres).</li>}{result.status === 'invalid' && <li>Corrige la edad o las puntuaciones no válidas.</li>}{!reviewed && <li>Confirma la revisión profesional.</li>}</ul></div>}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-primary/20 pt-5">
          <button type="button" disabled={step === 0} onClick={() => setStep(value => value - 1)} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-primary/25 bg-white px-4 py-3 font-semibold text-primary disabled:opacity-40"><ArrowLeft className="size-4" /> Anterior</button>
          {step < 5 && <button type="button" onClick={() => setStep(value => value + 1)} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white">{completed[step] ? 'Continuar' : step === 0 ? 'Ir a las pruebas' : 'Continuar con pendientes'}<ArrowRight className="size-4" /></button>}
        </div>
        {step > 0 && step < 5 && <button type="button" onClick={() => { update({ interrupted: true }); setStep(5); }} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-800 underline underline-offset-4"><Pause className="size-4" /> Interrumpir y pasar al informe</button>}
        {step === 5 && <p className="mt-4 text-sm text-muted">Puedes volver a cualquier paso para corregir datos. Un dato pendiente no equivale a cero puntos.</p>}
      </div>

      <AssessmentReportView report={{ assessment, reference, date, observations, proposal, version: ASSESSMENT_VERSION, result }} draft={!canPrint} className={step === 5 ? 'mt-7' : 'hidden print:block'} />
    </div>
  );
}

function ChoiceButtons({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const name = useId();
  return <fieldset className="mt-5"><legend className="mb-3 font-semibold">{label}</legend><div className="flex flex-wrap gap-2">{options.map(option => <label key={option.value} className="cursor-pointer"><input className="peer sr-only" type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} /><span className="flex min-h-12 min-w-20 items-center justify-center rounded-xl border border-primary/30 bg-white px-4 py-3 text-sm font-semibold text-primary-dark peer-checked:border-primary-dark peer-checked:bg-primary-dark peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">{option.label}</span></label>)}</div></fieldset>;
}

function ScoreGuide({ index }: { index: number }) {
  const instructions = [
    'Sigue este orden: pies juntos, semitándem y tándem. Si no mantiene 10 segundos en las dos primeras posiciones, no avances a la siguiente. Registra el resultado conjunto.',
    'Mide 4 metros. La persona camina a su paso habitual tres veces; utiliza el menor tiempo.',
    'Comprueba primero si puede realizar la prueba según el protocolo. Cronometra cinco levantadas con los brazos cruzados; empieza sentada y termina de pie.',
  ];
  const tables = [
    [['0', 'Pies juntos: menos de 10 s'], ['1', 'Pies juntos: 10 s; semitándem: menos de 10 s'], ['2', 'Ambas posiciones: 10 s; tándem: menos de 3 s'], ['3', 'Ambas posiciones: 10 s; tándem: 3–9 s'], ['4', 'Las tres posiciones: 10 s']],
    [['0', 'Incapaz de realizarla'], ['1', 'Más de 8,70 s'], ['2', '6,21–8,70 s'], ['3', '4,82–6,20 s'], ['4', 'Menos de 4,82 s']],
    [['0', 'Más de 60 s'], ['1', '16,7–59 s'], ['2', '13,70–16,69 s'], ['3', '11,20–13,69 s'], ['4', 'Menos de 11,19 s']],
  ];
  return <div className="mt-4 rounded-xl border border-primary/15 bg-primary-50 p-4 sm:p-5"><p className="font-semibold text-primary-dark">Cómo realizarla</p><p className="mt-2 text-sm text-muted">{instructions[index]}</p><table className="mt-4 w-full text-left text-sm"><caption className="mb-2 text-left font-semibold">Tabla de referencia · Vivifrail 2020</caption><thead><tr><th scope="col" className="py-2 pr-4">Puntos</th><th scope="col" className="py-2">Resultado</th></tr></thead><tbody>{tables[index].map(([score, description]) => <tr key={score} className="border-t border-primary/15"><th scope="row" className="py-2 pr-4">{score}</th><td className="py-2">{description}</td></tr>)}</tbody></table>{index === 2 && <p className="mt-3 text-sm text-muted">La tabla original deja algunos límites sin especificar, como 11,19 s o 60 s. No se calculan puntos automáticamente: revisa el protocolo y documenta tu criterio. Si no has realizado la prueba, deja Pendiente.</p>}</div>;
}
