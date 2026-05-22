"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { trackLeadConversion } from "@/components/GoogleAds";

type FormStatus = "idle" | "sending" | "success" | "error";

interface AdsLeadFormProps {
  /** Texto del botón de envío */
  ctaText?: string;
  /** Etiqueta de interés que se guarda en el lead (identifica la landing de origen) */
  origen: string;
}

export default function AdsLeadForm({
  ctaText = "Quiero la valoración gratuita →",
  origen,
}: AdsLeadFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setStatus("success");
      setNombre("");
      setTelefono("");
      setMensaje("");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:outline-none focus:ring-2 focus:ring-[rgb(0,94,184)] focus:border-transparent";

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
      className="bg-white shadow-xl rounded-3xl p-8 space-y-4"
    >
      <h3 className="text-2xl font-bold text-[rgb(0,60,115)]">
        Solicita tu valoración gratuita
      </h3>

      <div>
        <label htmlFor="ads-nombre" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          id="ads-nombre"
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
        <label htmlFor="ads-telefono" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          id="ads-telefono"
          type="tel"
          placeholder="Ej: 633 261 963"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className={inputClass}
          required
          disabled={status === "sending"}
        />
      </div>

      <div>
        <label htmlFor="ads-mensaje" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">
          Cuéntanos brevemente la situación <span className="text-slate-400 font-normal">(opcional)</span>
        </label>
        <textarea
          id="ads-mensaje"
          rows={3}
          placeholder="Ej: mi madre tiene 80 años y le cuesta caminar..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={inputClass}
          disabled={status === "sending"}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-[rgb(0,94,184)] hover:bg-[rgb(32,113,188)] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100"
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
