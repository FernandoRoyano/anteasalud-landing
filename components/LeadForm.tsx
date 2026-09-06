"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { trackLeadConversion } from "@/components/GoogleAds";
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
  const [status, setStatus] = useState<FormStatus>("idle");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappWindow = openWhatsAppPlaceholder();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email: "",
          telefono,
          zona: "Madrid",
          interes: `${origen}${mensaje ? ` · ${mensaje}` : ""}`,
        }),
      });

      if (!res.ok) throw new Error();

      trackLeadConversion();
      sendLeadToWhatsApp(whatsappWindow, {
        nombre,
        telefono,
        zona: "Madrid",
        interes: `${origen}${mensaje ? ` · ${mensaje}` : ""}`,
      });
      setStatus("success");
      setNombre("");
      setTelefono("");
      setMensaje("");
    } catch {
      whatsappWindow?.close();
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-[#2d6a4f]/20 bg-[#fbfcf8] text-[#17372b] placeholder:text-[#82958c] focus:outline-none focus:ring-2 focus:ring-[#4f9f73] focus:border-transparent";

  if (status === "success") {
    return (
      <div className="bg-white shadow-xl rounded-3xl p-8 text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[rgb(0,60,115)]">¡Solicitud recibida!</h3>
        <p className="text-slate-600">
          Fernando se pondrá en contacto contigo en menos de 24 horas para
          concertar tu valoración gratuita.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-[0_28px_70px_-35px_rgba(23,55,43,.45)] rounded-3xl border border-[#2d6a4f]/10 p-7 sm:p-8 space-y-4"
    >
      <h3 className="font-display text-2xl font-bold text-[#17372b]">{title}</h3>

      <div>
        <label htmlFor="lead-nombre" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-nombre"
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={inputClass}
          required
          disabled={status === "sending"}
        />
      </div>

      <div>
        <label htmlFor="lead-telefono" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-telefono"
          type="tel"
          placeholder="Ej: 6XX XXX XXX"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className={inputClass}
          required
          disabled={status === "sending"}
        />
      </div>

      {showMessage && (
        <div>
          <label htmlFor="lead-mensaje" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">
            Cuéntanos brevemente la situación <span className="text-slate-400 font-normal">(opcional)</span>
          </label>
          <textarea
            id="lead-mensaje"
            rows={3}
            placeholder="Ej: mi madre tiene 80 años y le cuesta caminar..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className={inputClass}
            disabled={status === "sending"}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-[#2d6a4f] hover:bg-[#22543f] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Enviando..." : ctaText}
      </button>

      <p className="text-center text-xs text-slate-500">
        Sin compromiso · Respuesta en menos de 24h · Solo 5 plazas al mes
      </p>

      {status === "error" && (
        <p className="text-center text-red-600 font-medium">
          Error al enviar. Inténtalo de nuevo en unos segundos.
        </p>
      )}
    </form>
  );
}
