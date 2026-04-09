"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
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
} from 'lucide-react';

// =============================================================================
// CONFIGURACIÓN DEL WIZARD
// =============================================================================

const WHATSAPP_NUMBER = '34633261963';

const PARA_QUIEN = [
  { value: 'mi_padre_madre', label: 'Para mi padre o madre' },
  { value: 'mi_pareja', label: 'Para mi pareja' },
  { value: 'mi_familiar', label: 'Para otro familiar' },
  { value: 'mi', label: 'Para mí' },
];

const EDADES = [
  { value: '60-70', label: '60 - 70 años' },
  { value: '70-80', label: '70 - 80 años' },
  { value: '80-90', label: '80 - 90 años' },
  { value: '+90', label: 'Más de 90 años' },
];

const SITUACIONES = [
  { value: 'tras_operacion', label: 'Recuperación tras operación' },
  { value: 'prevenir_caidas', label: 'Prevenir caídas' },
  { value: 'movilidad', label: 'Problemas de movilidad' },
  { value: 'mantenerse', label: 'Mantenerse en forma' },
  { value: 'post_ictus', label: 'Recuperación post-ictus' },
  { value: 'otro', label: 'Otra situación' },
];

const PRECIO_SESION = 45;
const PRECIO_PLAN_SEMANA = 70;

interface Zona {
  value: string;
  label: string;
  recargo: number;
}

const ZONAS_MADRID: Zona[] = [
  { value: 'capital', label: 'Madrid capital', recargo: 0 },
  { value: 'sur', label: 'Sur (Móstoles, Fuenlabrada, Getafe, Leganés, Alcorcón...)', recargo: 5 },
  { value: 'oeste', label: 'Oeste (Pozuelo, Las Rozas, Majadahonda, Boadilla...)', recargo: 5 },
  { value: 'este', label: 'Este (Torrejón de Ardoz, Coslada, Rivas-Vaciamadrid...)', recargo: 5 },
  { value: 'norte', label: 'Norte (Alcobendas, Tres Cantos)', recargo: 5 },
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
  situacion: string;
  zona: string;
  nombre: string;
  telefono: string;
}

const TOTAL_STEPS = 5;

function WizardModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    paraQuien: '',
    edad: '',
    situacion: '',
    zona: '',
    nombre: '',
    telefono: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const update = (field: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const canContinue = () => {
    if (step === 1) return !!data.paraQuien;
    if (step === 2) return !!data.edad;
    if (step === 3) return !!data.situacion;
    if (step === 4) return !!data.zona;
    if (step === 5) return data.nombre.trim().length > 1 && data.telefono.replace(/\D/g, '').length >= 9;
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    const paraQuienLabel = PARA_QUIEN.find((p) => p.value === data.paraQuien)?.label || data.paraQuien;
    const edadLabel = EDADES.find((e) => e.value === data.edad)?.label || data.edad;
    const situacionLabel = SITUACIONES.find((s) => s.value === data.situacion)?.label || data.situacion;
    const zonaObj = ZONAS_MADRID.find((z) => z.value === data.zona);
    const zonaLabel = zonaObj?.label || data.zona;
    const recargo = zonaObj?.recargo || 0;
    const precioSesion = PRECIO_SESION + recargo;
    const precioPlan = PRECIO_PLAN_SEMANA + recargo * 2;

    const lineaRecargo = recargo > 0
      ? `\n💰 Precios para tu zona (incluye recargo de +${recargo}€/sesión por desplazamiento):\n• Sesión suelta: ${precioSesion}€\n• Plan 2 días/semana: ${precioPlan}€/semana`
      : `\n💰 Precios:\n• Sesión suelta: ${precioSesion}€\n• Plan 2 días/semana: ${precioPlan}€/semana`;

    // Mensaje pre-rellenado para WhatsApp
    const mensaje = `Hola, soy ${data.nombre}. Vengo de la web y ya he visto los precios.

📋 Mi consulta:
• ${paraQuienLabel}
• Edad: ${edadLabel}
• Situación: ${situacionLabel}
• Zona: ${zonaLabel}
${lineaRecargo}

Mi teléfono: ${data.telefono}`;

    // Guardar en Google Sheets vía API
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.nombre,
          email: '',
          telefono: data.telefono,
          zona: zonaLabel,
          interes: `${situacionLabel} (${paraQuienLabel}, ${edadLabel})${recargo > 0 ? ` · +${recargo}€ desplaz.` : ''}`,
        }),
      });
    } catch {
      // No bloqueamos si falla el guardado, igual abrimos WhatsApp
    }

    // Abrir WhatsApp con mensaje pre-rellenado
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    setSubmitting(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[1000] flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full max-w-xl max-h-[95vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[rgb(232,237,238)] sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg md:text-xl font-black text-[rgb(31,41,51)]">
              Contacto rápido por WhatsApp
            </h2>
            <p className="text-xs text-[rgb(130,131,130)] mt-0.5">
              Paso {step} de {TOTAL_STEPS} · Te llevará 30 segundos
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[rgb(232,237,238)] hover:bg-[rgb(200,207,210)] flex items-center justify-center transition flex-shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-[rgb(31,41,51)]" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-5 pt-4">
          <div className="h-1.5 bg-[rgb(232,237,238)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] rounded-full transition-all duration-300"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 md:p-6">
          {step === 1 && (
            <Step
              icon={User}
              title="¿Para quién es el servicio?"
              subtitle="Así sabremos cómo dirigirnos"
            >
              {PARA_QUIEN.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  selected={data.paraQuien === opt.value}
                  onClick={() => {
                    update('paraQuien', opt.value);
                    setTimeout(next, 200);
                  }}
                />
              ))}
            </Step>
          )}

          {step === 2 && (
            <Step
              icon={Calendar}
              title="¿Qué edad tiene la persona?"
              subtitle="Adaptamos los ejercicios a cada edad"
            >
              {EDADES.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  selected={data.edad === opt.value}
                  onClick={() => {
                    update('edad', opt.value);
                    setTimeout(next, 200);
                  }}
                />
              ))}
            </Step>
          )}

          {step === 3 && (
            <Step
              icon={Activity}
              title="¿Cuál es la situación?"
              subtitle="Para preparar el plan más adecuado"
            >
              {SITUACIONES.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  selected={data.situacion === opt.value}
                  onClick={() => {
                    update('situacion', opt.value);
                    setTimeout(next, 200);
                  }}
                />
              ))}
            </Step>
          )}

          {step === 4 && (
            <Step
              icon={MapPin}
              title="¿En qué zona de Madrid?"
              subtitle="Cubrimos hasta 22 km del centro de Madrid"
            >
              {ZONAS_MADRID.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  badge={opt.recargo === 0 ? 'Sin recargo' : `+${opt.recargo}€/sesión`}
                  badgeColor={opt.recargo === 0 ? 'green' : 'orange'}
                  selected={data.zona === opt.value}
                  onClick={() => {
                    update('zona', opt.value);
                    setTimeout(next, 200);
                  }}
                />
              ))}
              <p className="text-xs text-[rgb(130,131,130)] text-center mt-3">
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
            <Step
              icon={Send}
              title="Resumen y datos de contacto"
              subtitle="Antes de hablar, mira los precios para tu zona"
            >
              {/* Resumen de precios */}
              <div className="bg-gradient-to-br from-[rgb(191,231,249)] to-[rgb(232,237,238)] rounded-2xl p-5 mb-4 border border-[rgb(0,94,184)]/20">
                <h3 className="font-bold text-[rgb(0,94,184)] mb-3 text-sm">
                  Precios para {zonaActual?.label.split(' (')[0] || 'tu zona'}
                </h3>
                <ul className="space-y-2 text-sm text-[rgb(31,41,51)]">
                  <li className="flex justify-between">
                    <span>Sesión suelta (30 min)</span>
                    <strong>{precioSesionFinal}€</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Plan 2 días/semana</span>
                    <strong>{precioPlanFinal}€/sem</strong>
                  </li>
                  {recargoZona > 0 && (
                    <li className="text-xs text-orange-700 italic">
                      Incluye +{recargoZona}€ por sesión de desplazamiento
                    </li>
                  )}
                  <li className="flex justify-between text-green-700 font-semibold border-t border-[rgb(0,94,184)]/20 pt-2 mt-2">
                    <span>Primera valoración</span>
                    <span>GRATIS</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1.5">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    value={data.nombre}
                    onChange={(e) => update('nombre', e.target.value)}
                    placeholder="Cómo te llamas"
                    className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] focus:ring-2 focus:ring-[rgb(191,231,249)] outline-none text-[rgb(31,41,51)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1.5">
                    Tu teléfono
                  </label>
                  <input
                    type="tel"
                    value={data.telefono}
                    onChange={(e) => update('telefono', e.target.value)}
                    placeholder="600 000 000"
                    className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] focus:ring-2 focus:ring-[rgb(191,231,249)] outline-none text-[rgb(31,41,51)]"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}
            </Step>
            );
          })()}
        </div>

        {/* Footer / Botones */}
        <div className="flex items-center gap-3 p-5 border-t border-[rgb(232,237,238)] sticky bottom-0 bg-white">
          {step > 1 && (
            <button
              onClick={back}
              disabled={submitting}
              className="px-4 py-3 rounded-xl font-semibold text-[rgb(31,41,51)] hover:bg-[rgb(232,237,238)] transition inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Atrás
            </button>
          )}

          <div className="flex-1" />

          {step < TOTAL_STEPS && (
            <button
              onClick={next}
              disabled={!canContinue()}
              className="px-5 py-3 rounded-xl font-bold bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white shadow-md hover:shadow-lg transition inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === TOTAL_STEPS && (
            <button
              onClick={handleSubmit}
              disabled={!canContinue() || submitting}
              className="px-5 py-3 rounded-xl font-bold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg transition inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" /> Abrir WhatsApp
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SUBCOMPONENTES
// =============================================================================

function Step({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[rgb(191,231,249)] flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[rgb(0,94,184)]" />
        </div>
        <div>
          <h3 className="text-lg font-black text-[rgb(31,41,51)]">{title}</h3>
          <p className="text-sm text-[rgb(130,131,130)]">{subtitle}</p>
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
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-orange-100 text-orange-700 border-orange-200';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all flex items-center justify-between gap-2 ${
        selected
          ? 'border-[rgb(0,94,184)] bg-[rgb(191,231,249)] text-[rgb(0,94,184)]'
          : 'border-[rgb(200,207,210)] bg-white text-[rgb(31,41,51)] hover:border-[rgb(0,94,184)] hover:bg-[rgb(232,237,238)]'
      }`}
    >
      <span className="font-semibold text-sm md:text-base flex-1">{label}</span>
      <div className="flex items-center gap-2 flex-shrink-0">
        {badge && (
          <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
            {badge}
          </span>
        )}
        {selected && <Check className="w-5 h-5" />}
      </div>
    </button>
  );
}
