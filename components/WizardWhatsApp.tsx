"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, ReactNode } from 'react';
import { trackLeadConversion } from '@/components/GoogleTag';
import { ConsentCheckbox, HoneypotField } from '@/components/ConsentCheckbox';
import { leadInputClass } from '@/components/LeadForm';
import { postLead, useFormTimer } from '@/lib/lead-client';
import { buildWhatsAppUrl, openWhatsAppPlaceholder, openWhatsAppUrl } from '@/lib/lead-whatsapp';
import {
  X,
  ArrowLeft,
  ArrowRight,
  User,
  Calendar,
  Activity,
  MapPin,
  Send,
  Loader2,
  Check,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';

// =============================================================================
// CONFIGURACIÓN DEL WIZARD
// =============================================================================

const PARA_QUIEN = [
  { value: 'mi_padre_madre', label: 'Para mi padre o madre' },
  { value: 'mi_pareja', label: 'Para mi pareja' },
  { value: 'mi_familiar', label: 'Para otro familiar' },
  { value: 'mi', label: 'Para mí' },
];

const EDADES = [
  { value: '<50', label: 'Menos de 50 años' },
  { value: '50-60', label: '50 - 60 años' },
  { value: '60-70', label: '60 - 70 años' },
  { value: '70-80', label: '70 - 80 años' },
  { value: '80-90', label: '80 - 90 años' },
  { value: '+90', label: 'Más de 90 años' },
  { value: 'otra', label: 'Otra edad (especificar)' },
];

const SITUACIONES = [
  { value: 'tras_operacion', label: 'Recuperación tras operación' },
  { value: 'prevenir_caidas', label: 'Prevenir caídas' },
  { value: 'movilidad', label: 'Problemas de movilidad' },
  { value: 'mantenerse', label: 'Mantenerse en forma' },
  { value: 'post_ictus', label: 'Recuperación post-ictus' },
  { value: 'otro', label: 'Otra situación' },
];

const PRECIO_SESION = 55;
const PRECIO_PLAN_SEMANA = 90;

interface Zona {
  value: string;
  label: string;
  recargo: number;
}

const ZONAS_MADRID: Zona[] = [
  { value: 'capital', label: 'Madrid capital', recargo: 0 },
  { value: 'sur', label: 'Sur (Móstoles, Fuenlabrada, Getafe, Leganés, Alcorcón...)', recargo: 10 },
  { value: 'oeste', label: 'Oeste (Pozuelo, Las Rozas, Majadahonda, Boadilla...)', recargo: 10 },
  { value: 'este', label: 'Este (Torrejón de Ardoz, Coslada, Rivas-Vaciamadrid...)', recargo: 10 },
  { value: 'norte', label: 'Norte (Alcobendas, Tres Cantos)', recargo: 10 },
];

// =============================================================================
// CONTEXT
// =============================================================================

interface WizardContextValue {
  open: () => void;
}

const WizardContext = createContext<WizardContextValue>({ open: () => {} });

export function useWizard() {
  return useContext(WizardContext);
}

// =============================================================================
// PROVIDER
// =============================================================================

export function WizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WizardContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      {isOpen && <WizardModal onClose={() => setIsOpen(false)} />}
    </WizardContext.Provider>
  );
}

// =============================================================================
// MODAL DEL WIZARD
// =============================================================================

interface FormData {
  paraQuien: string;
  edad: string;
  /** Si edad === 'otra', el usuario puede escribir aquí su edad o rango personalizado */
  edadCustom: string;
  situacion: string;
  zona: string;
  nombre: string;
  telefono: string;
}

const TOTAL_STEPS = 5;

function WizardModal({ onClose }: { onClose: () => void }) {
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    paraQuien: '',
    edad: '',
    edadCustom: '',
    situacion: '',
    zona: '',
    nombre: '',
    telefono: '',
  });
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const elapsed = useFormTimer();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  // Al cambiar de paso, llevar el foco al título para lectores de pantalla y teclado
  useEffect(() => {
    if (step > 1) headingRef.current?.focus();
  }, [step]);

  const update = (field: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // Evita perder el progreso por un toque accidental
  const requestClose = () => {
    if (step > 1 && !window.confirm('¿Seguro que quieres salir? Se perderán las respuestas.')) return;
    onClose();
  };

  const canContinue = () => {
    if (step === 1) return !!data.paraQuien;
    if (step === 2) {
      if (!data.edad) return false;
      if (data.edad === 'otra') return data.edadCustom.trim().length > 0;
      return true;
    }
    if (step === 3) return !!data.situacion;
    if (step === 4) return !!data.zona;
    if (step === 5) {
      return consent && data.nombre.trim().length > 1 && data.telefono.replace(/\D/g, '').length >= 9;
    }
    return false;
  };

  const handleSubmit = async () => {
    const whatsappWindow = openWhatsAppPlaceholder();
    setSubmitting(true);

    const paraQuienLabel = PARA_QUIEN.find((p) => p.value === data.paraQuien)?.label || data.paraQuien;
    const edadLabel =
      data.edad === 'otra'
        ? data.edadCustom.trim()
        : EDADES.find((e) => e.value === data.edad)?.label || data.edad;
    const situacionLabel = SITUACIONES.find((s) => s.value === data.situacion)?.label || data.situacion;
    const zonaObj = ZONAS_MADRID.find((z) => z.value === data.zona);
    const zonaLabel = zonaObj?.label || data.zona;
    const recargo = zonaObj?.recargo || 0;
    const precioSesion = PRECIO_SESION + recargo;
    const precioPlan = PRECIO_PLAN_SEMANA + recargo * 2;

    const lineaRecargo = recargo > 0
      ? `\n💰 Precios para tu zona (incluye recargo de +${recargo}€/sesión por desplazamiento):\n• Sesión suelta: ${precioSesion}€\n• Plan 2 días/semana: ${precioPlan}€/semana`
      : `\n💰 Precios:\n• Sesión suelta: ${precioSesion}€\n• Plan 2 días/semana: ${precioPlan}€/semana`;

    const mensaje = `Hola, soy ${data.nombre}. Vengo de la web y ya he visto los precios.

📋 Mi consulta:
• ${paraQuienLabel}
• Edad: ${edadLabel}
• Situación: ${situacionLabel}
• Zona: ${zonaLabel}
${lineaRecargo}

Mi teléfono: ${data.telefono}`;

    // Si falla el guardado no bloqueamos: el contacto llega igualmente por WhatsApp
    try {
      const res = await postLead(
        {
          nombre: data.nombre,
          telefono: data.telefono,
          zona: zonaLabel,
          interes: `${situacionLabel} (${paraQuienLabel}, ${edadLabel})${recargo > 0 ? ` · +${recargo}€ desplaz.` : ''}`,
        },
        { consent, website, fillMs: elapsed() }
      );
      if (res.ok) trackLeadConversion();
      else console.error(`[WizardWhatsApp:submit] /api/contact respondió ${res.status}`);
    } catch (error) {
      console.error('[WizardWhatsApp:submit] Error guardando lead', error);
    }

    openWhatsAppUrl(whatsappWindow, buildWhatsAppUrl(mensaje));
    setSubmitting(false);
    onClose();
  };

  const headingId = `${uid}-title`;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      className="m-0 md:m-auto mt-auto w-full max-w-full md:max-w-xl max-h-[95dvh] p-0 bg-white rounded-t-3xl md:rounded-3xl shadow-2xl backdrop:bg-black/60 overflow-y-auto"
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e3ebe6] sticky top-0 bg-white z-10">
          <div>
            <h2 id={headingId} className="text-xl font-black text-[#17372b]">
              Contacto rápido por WhatsApp
            </h2>
            <p className="text-base text-[#4b5563] mt-0.5">
              Paso {step} de {TOTAL_STEPS} · Te llevará 30 segundos
            </p>
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="size-12 rounded-full bg-[#eef5f0] hover:bg-[#dcebe2] flex items-center justify-center transition flex-shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-[#17372b]" aria-hidden="true" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-5 pt-4">
          <div
            className="h-2 bg-[#e3ebe6] rounded-full overflow-hidden"
            role="progressbar"
            aria-label="Progreso"
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
            aria-valuenow={step}
          >
            <div
              className="h-full bg-[#2d6a4f] rounded-full transition-all duration-300"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 md:p-6">
          {step === 1 && (
            <Step headingRef={headingRef} icon={User} title="¿Para quién es el servicio?" subtitle="Así sabremos cómo dirigirnos">
              {PARA_QUIEN.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  selected={data.paraQuien === opt.value}
                  onClick={() => update('paraQuien', opt.value)}
                />
              ))}
            </Step>
          )}

          {step === 2 && (
            <Step headingRef={headingRef} icon={Calendar} title="¿Qué edad tiene la persona?" subtitle="Adaptamos los ejercicios a cada edad">
              {EDADES.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  selected={data.edad === opt.value}
                  onClick={() => update('edad', opt.value)}
                />
              ))}

              {data.edad === 'otra' && (
                <div className="mt-4 p-4 rounded-xl bg-[#eef5f0] border border-[#cfe0d6]">
                  <label htmlFor={`${uid}-edad`} className="block text-base font-semibold text-[#1f2933] mb-2">
                    Indica la edad o el rango
                  </label>
                  <input
                    id={`${uid}-edad`}
                    type="text"
                    maxLength={40}
                    placeholder="Ej: 55 años, 45-50, alrededor de 58…"
                    value={data.edadCustom}
                    onChange={(e) => update('edadCustom', e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && data.edadCustom.trim().length > 0) {
                        e.preventDefault();
                        next();
                      }
                    }}
                    className={leadInputClass}
                  />
                </div>
              )}
            </Step>
          )}

          {step === 3 && (
            <Step headingRef={headingRef} icon={Activity} title="¿Cuál es la situación?" subtitle="Para preparar el plan más adecuado">
              {SITUACIONES.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  selected={data.situacion === opt.value}
                  onClick={() => update('situacion', opt.value)}
                />
              ))}
            </Step>
          )}

          {step === 4 && (
            <Step headingRef={headingRef} icon={MapPin} title="¿En qué zona de Madrid?" subtitle="Vamos a domicilio en Madrid y área metropolitana">
              {ZONAS_MADRID.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  badge={opt.recargo === 0 ? 'Sin recargo' : `+${opt.recargo}€/sesión`}
                  badgeColor={opt.recargo === 0 ? 'green' : 'orange'}
                  selected={data.zona === opt.value}
                  onClick={() => update('zona', opt.value)}
                />
              ))}
              <p className="text-base text-[#4b5563] text-center mt-3">
                El recargo cubre el desplazamiento fuera de Madrid capital.
              </p>
            </Step>
          )}

          {step === 5 && (() => {
            const zonaActual = ZONAS_MADRID.find((z) => z.value === data.zona);
            const recargoZona = zonaActual?.recargo || 0;
            const precioSesionFinal = PRECIO_SESION + recargoZona;
            const precioPlanFinal = PRECIO_PLAN_SEMANA + recargoZona * 2;

            return (
              <Step headingRef={headingRef} icon={Send} title="Resumen y datos de contacto" subtitle="Antes de hablar, mira los precios para tu zona">
                <div className="bg-[#eef5f0] rounded-2xl p-5 mb-4 border border-[#cfe0d6]">
                  <h4 className="font-bold text-[#17372b] mb-3 text-base">
                    Precios para {zonaActual?.label.split(' (')[0] || 'tu zona'}
                  </h4>
                  <ul className="space-y-2 text-base text-[#1f2933]">
                    <li className="flex justify-between">
                      <span>Sesión suelta (30 min)</span>
                      <strong>{precioSesionFinal}€</strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Plan 2 días/semana</span>
                      <strong>{precioPlanFinal}€/sem</strong>
                    </li>
                    {recargoZona > 0 && (
                      <li className="text-[#9a3412]">
                        Incluye +{recargoZona}€ por sesión de desplazamiento
                      </li>
                    )}
                    <li className="flex justify-between text-[#2d6a4f] font-semibold border-t border-[#cfe0d6] pt-2 mt-2">
                      <span>Primera valoración</span>
                      <span>GRATIS</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor={`${uid}-nombre`} className="block text-base font-semibold text-[#1f2933] mb-1.5">
                      Tu nombre
                    </label>
                    <input
                      id={`${uid}-nombre`}
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={100}
                      value={data.nombre}
                      onChange={(e) => update('nombre', e.target.value)}
                      placeholder="Cómo te llamas"
                      className={leadInputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-telefono`} className="block text-base font-semibold text-[#1f2933] mb-1.5">
                      Tu teléfono
                    </label>
                    <input
                      id={`${uid}-telefono`}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={data.telefono}
                      onChange={(e) => update('telefono', e.target.value)}
                      placeholder="600 000 000"
                      className={leadInputClass}
                    />
                  </div>
                  <HoneypotField value={website} onChange={setWebsite} />
                  <ConsentCheckbox id={`${uid}-consent`} checked={consent} onChange={setConsent} disabled={submitting} />
                </div>
              </Step>
            );
          })()}
        </div>

        {/* Footer / Botones */}
        <div className="flex items-center gap-3 p-5 border-t border-[#e3ebe6] sticky bottom-0 bg-white">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              disabled={submitting}
              className="min-h-12 px-4 rounded-xl font-semibold text-lg text-[#17372b] hover:bg-[#eef5f0] transition inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" /> Atrás
            </button>
          )}

          <div className="flex-1" />

          {step < TOTAL_STEPS && (
            <button
              type="button"
              onClick={next}
              disabled={!canContinue()}
              className="min-h-12 px-6 rounded-xl font-bold text-lg bg-[#2d6a4f] hover:bg-[#22543f] text-white shadow-md transition inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          )}

          {step === TOTAL_STEPS && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canContinue() || submitting}
              className="min-h-12 px-6 rounded-xl font-bold text-lg bg-[#15803d] hover:bg-[#166534] text-white shadow-md transition inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Enviando...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" aria-hidden="true" /> Abrir WhatsApp
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}

// =============================================================================
// SUBCOMPONENTES
// =============================================================================

function Step({
  icon: Icon,
  title,
  subtitle,
  headingRef,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id}>
      <div className="flex items-start gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-[#e3f1e8] flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-[#2d6a4f]" aria-hidden="true" />
        </div>
        <div>
          <h3 id={id} ref={headingRef} tabIndex={-1} className="text-xl font-black text-[#17372b] outline-none">
            {title}
          </h3>
          <p className="text-base text-[#4b5563]">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
  badge,
  badgeColor = 'green',
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  badge?: string;
  badgeColor?: 'green' | 'orange';
}) {
  const badgeClass =
    badgeColor === 'green'
      ? 'bg-[#e3f1e8] text-[#1f5a3f] border-[#b7d7c4]'
      : 'bg-orange-50 text-[#9a3412] border-orange-200';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full min-h-14 text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-between gap-2 ${
        selected
          ? 'border-[#2d6a4f] bg-[#e3f1e8] text-[#17372b]'
          : 'border-[#9fb3a8] bg-white text-[#1f2933] hover:border-[#2d6a4f] hover:bg-[#f4f8f5]'
      }`}
    >
      <span className="font-semibold text-lg flex-1">{label}</span>
      <span className="flex items-center gap-2 flex-shrink-0">
        {badge && (
          <span className={`text-sm font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
            {badge}
          </span>
        )}
        {selected && <Check className="w-6 h-6 text-[#2d6a4f]" aria-hidden="true" />}
      </span>
    </button>
  );
}
