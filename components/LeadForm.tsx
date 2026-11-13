"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check } from "lucide-react";
import { trackLeadConversion } from "@/components/GoogleTag";
import { ConsentCheckbox, HoneypotField } from "@/components/ConsentCheckbox";
import { postLead, useFormTimer } from "@/lib/lead-client";
import { buildWhatsAppUrl } from "@/lib/lead-whatsapp";

type FormStatus = "idle" | "sending" | "success" | "error";

interface LeadFormProps {
  /** Texto del botón de envío */
  ctaText?: string;
  /** Procedencia que se guarda separada del interés y del mensaje */
  origen: string;
  zone?: string;
  /** Título del formulario */
  title?: string;
  /** Mostrar el textarea opcional de "cuéntanos la situación" */
  showMessage?: boolean;
}

export const leadInputClass =
  "w-full min-h-12 px-4 py-3 rounded-xl border-2 border-[#5d746b] bg-white text-lg text-[#17372b] placeholder:text-[#5d746b] focus:outline-none focus:ring-4 focus:ring-[#2d6a4f]/30 focus:border-[#2d6a4f]";

/**
 * Formulario de captación de 2 campos (nombre + teléfono) reutilizable en
 * heros de landings, home y páginas de Ads. Guarda el lead vía /api/contact
 * y dispara la conversión de Google Ads tras envío exitoso.
 */
export default function LeadForm({
  ctaText = "Quiero la valoración gratuita →",
  origen,
  zone = 'Madrid',
  title = "Solicita tu valoración gratuita",
  showMessage = true,
}: LeadFormProps) {
  const uid = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [barrio, setBarrio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const elapsed = useFormTimer();
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const lead = {
      nombre,
      telefono,
      zona: barrio.trim() ? `${zone} - ${barrio.trim()}` : zone,
      procedencia: origen.replace(/\s*\([^)]*\)$/, ""),
      formulario: "Contacto",
      interes: "Valoración gratuita",
      mensaje: mensaje.trim(),
    };

    try {
      const res = await postLead(lead, { consent, website, fillMs: elapsed() });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error);
      }

      if (!(await res.clone().json()).duplicate) trackLeadConversion();
      setStatus("success");
      setNombre("");
      setBarrio("");
      setTelefono("");
      setMensaje("");
      setConsent(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Error al enviar. Inténtalo de nuevo en unos segundos."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white shadow-xl rounded-3xl p-8 text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#e3f1e8] flex items-center justify-center">
          <Check className="w-7 h-7 text-[#2d6a4f]" aria-hidden="true" />
        </div>
        <h3 ref={successRef} tabIndex={-1} className="text-2xl font-bold text-[#17372b] outline-none">
          ¡Solicitud recibida!
        </h3>
        <p className="text-lg text-[#374151]">
          Fernando te llamará en menos de 24 horas para conocer la situación y organizar la valoración gratuita.
        </p>
        <p className="text-base text-muted">No tienes que hacer nada más. Si lo prefieres, también puedes escribirnos:</p>
        <a href={buildWhatsAppUrl('Hola, he enviado el formulario de ANTEA Salud y prefiero continuar por WhatsApp.')} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-primary/30 px-5 py-3 font-semibold text-primary">Escribir por WhatsApp (opcional)</a>
      </div>
    );
  }

  const sending = status === "sending";
  const labelClass = "block text-base font-semibold text-[#1f2933] mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white shadow-[0_28px_70px_-35px_rgba(23,55,43,.45)] rounded-3xl border border-[#2d6a4f]/10 p-7 sm:p-8 space-y-4"
    >
      <h3 className="font-display text-2xl font-bold text-[#17372b]">{title}</h3>
      <p className="text-base text-muted">Deja tus datos y Fernando te llamará en menos de 24 horas. No necesitas WhatsApp para enviar la solicitud.</p>

      <div>
        <label htmlFor={`${uid}-nombre`} className={labelClass}>
          Nombre <span className="text-[#b91c1c]" aria-hidden="true">*</span>
        </label>
        <input
          id={`${uid}-nombre`}
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={leadInputClass}
          required
          minLength={2}
          maxLength={100}
          disabled={sending}
        />
      </div>

      <div>
        <label htmlFor={`${uid}-telefono`} className={labelClass}>
          Teléfono <span className="text-[#b91c1c]" aria-hidden="true">*</span>
        </label>
        <input
          id={`${uid}-telefono`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Ej: 6XX XXX XXX"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className={leadInputClass}
          required
          pattern="[\d\s\+\-\(\)\.]{9,20}"
          title="Introduce un teléfono válido (mínimo 9 dígitos)"
          disabled={sending}
        />
      </div>

      {showMessage && (
        <div>
          <label htmlFor={`${uid}-mensaje`} className={labelClass}>
            Cuéntanos brevemente la situación <span className="text-[#4b5563] font-normal">(opcional)</span>
          </label>
          <textarea
            id={`${uid}-mensaje`}
            rows={3}
            maxLength={800}
            placeholder="Ej: mi madre tiene 80 años y le cuesta caminar..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className={leadInputClass}
            disabled={sending}
          />
        </div>
      )}

      <div><label htmlFor={`${uid}-barrio`} className="block text-base font-semibold text-[#1f2933] mb-1.5">Barrio o código postal de la persona <span className="font-normal text-muted">(opcional)</span></label><input id={`${uid}-barrio`} type="text" maxLength={80} value={barrio} onChange={event => setBarrio(event.target.value)} placeholder="Ej.: Pacífico o 28007" className={leadInputClass} disabled={sending} /><p className="mt-2 text-sm text-muted">Nos ayuda a comprobar disponibilidad y organizar las visitas en Madrid capital. No hace falta la dirección completa.</p></div>

      <HoneypotField value={website} onChange={setWebsite} />
      <ConsentCheckbox id={`${uid}-consent`} checked={consent} onChange={setConsent} disabled={sending} />

      <button
        type="submit"
        disabled={sending}
        className="w-full min-h-14 py-4 bg-[#2d6a4f] hover:bg-[#22543f] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
      >
        {sending ? "Enviando..." : ctaText}
      </button>

      <p className="text-center text-base text-[#4b5563]">
        Madrid capital · Mañanas hasta las 13:00 · Sin compromiso
      </p>

      {status === "error" && (
        <p role="alert" className="text-center text-lg text-[#b91c1c] font-medium">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
