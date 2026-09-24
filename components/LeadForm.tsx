"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check } from "lucide-react";
import { trackLeadConversion } from "@/components/GoogleTag";
import { ConsentCheckbox, HoneypotField } from "@/components/ConsentCheckbox";
import { postLead, useFormTimer } from "@/lib/lead-client";
import { openWhatsAppPlaceholder, sendLeadToWhatsApp } from "@/lib/lead-whatsapp";

type FormStatus = "idle" | "sending" | "success" | "error";

interface LeadFormProps {
  /** Texto del botón de envío */
  ctaText?: string;
  /** Etiqueta de interés que se guarda en el lead (identifica la página de origen) */
  origen: string;
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
  title = "Solicita tu valoración gratuita",
  showMessage = true,
}: LeadFormProps) {
  const uid = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [nombre, setNombre] = useState("");
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
    const whatsappWindow = openWhatsAppPlaceholder();
    setStatus("sending");
    const lead = {
      nombre,
      telefono,
      zona: "Madrid",
      interes: `${origen}${mensaje ? ` · ${mensaje}` : ""}`,
    };

    try {
      const res = await postLead(lead, { consent, website, fillMs: elapsed() });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error);
      }

      trackLeadConversion();
      sendLeadToWhatsApp(whatsappWindow, lead);
      setStatus("success");
      setNombre("");
      setTelefono("");
      setMensaje("");
      setConsent(false);
    } catch (error) {
      whatsappWindow?.close();
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
          Fernando se pondrá en contacto contigo en menos de 24 horas para
          concertar tu valoración gratuita.
        </p>
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
        Sin compromiso · Respuesta en menos de 24h · Solo 5 plazas al mes
      </p>

      {status === "error" && (
        <p role="alert" className="text-center text-lg text-[#b91c1c] font-medium">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
