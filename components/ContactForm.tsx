"use client";

import { useId, useState } from "react";
import { trackLeadConversion } from "@/components/GoogleTag";
import { ConsentCheckbox, HoneypotField } from "@/components/ConsentCheckbox";
import { leadInputClass } from "@/components/LeadForm";
import { postLead, useFormTimer } from "@/lib/lead-client";
import { openWhatsAppPlaceholder, sendLeadToWhatsApp } from "@/lib/lead-whatsapp";

type FormStatus = "idle" | "sending" | "success" | "error";

const ZONAS = [
  "Madrid capital",
  "Sur (Móstoles, Fuenlabrada, Getafe, Leganés, Alcorcón...)",
  "Oeste (Pozuelo, Las Rozas, Majadahonda, Boadilla...)",
  "Este (Torrejón de Ardoz, Coslada, Rivas-Vaciamadrid...)",
  "Norte (Alcobendas, Tres Cantos)",
  "Otra zona de la Comunidad de Madrid",
];

const INTERESES = [
  "Evaluación gratuita",
  "Sesión suelta (55€)",
  "Plan 2 días/semana (90€)",
  "Solo información y precios",
];

export default function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [zona, setZona] = useState("");
  const [interes, setInteres] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const elapsed = useFormTimer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappWindow = openWhatsAppPlaceholder();
    setStatus("sending");
    const lead = { nombre, email, telefono, zona, interes };

    try {
      const res = await postLead(lead, { consent, website, fillMs: elapsed() });
      if (!res.ok) throw new Error();

      trackLeadConversion();
      sendLeadToWhatsApp(whatsappWindow, lead);
      setStatus("success");
      setNombre("");
      setEmail("");
      setTelefono("");
      setZona("");
      setInteres("");
      setConsent(false);
    } catch {
      whatsappWindow?.close();
      setStatus("error");
    }
  };

  const sending = status === "sending";
  const labelClass = "block text-base font-semibold text-[#1f2933] mb-1.5";
  const required = <span className="text-[#b91c1c]" aria-hidden="true">*</span>;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-md mx-auto bg-white shadow-xl rounded-3xl p-8 space-y-5"
    >
      <h3 className="text-2xl font-bold text-[#17372b] mb-2">Solicita información</h3>

      <div>
        <label htmlFor={`${uid}-nombre`} className={labelClass}>Nombre {required}</label>
        <input
          id={`${uid}-nombre`}
          type="text"
          autoComplete="name"
          placeholder="Ej: María García"
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
        <label htmlFor={`${uid}-telefono`} className={labelClass}>Teléfono {required}</label>
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
          disabled={sending}
        />
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className={labelClass}>
          Email <span className="text-[#4b5563] font-normal">(opcional)</span>
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          autoComplete="email"
          placeholder="Ej: maria@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={leadInputClass}
          disabled={sending}
        />
      </div>

      <div>
        <label htmlFor={`${uid}-zona`} className={labelClass}>Zona</label>
        <select
          id={`${uid}-zona`}
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          className={leadInputClass}
          disabled={sending}
        >
          <option value="">Selecciona tu zona</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${uid}-interes`} className={labelClass}>¿Qué te interesa?</label>
        <select
          id={`${uid}-interes`}
          value={interes}
          onChange={(e) => setInteres(e.target.value)}
          className={leadInputClass}
          disabled={sending}
        >
          <option value="">Selecciona una opción</option>
          {INTERESES.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <HoneypotField value={website} onChange={setWebsite} />
      <ConsentCheckbox id={`${uid}-consent`} checked={consent} onChange={setConsent} disabled={sending} />

      <button
        type="submit"
        disabled={sending}
        className="w-full min-h-14 py-3 bg-[#2d6a4f] hover:bg-[#22543f] text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-60"
      >
        {sending ? "Enviando..." : "Solicitar información"}
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <p className="text-center text-lg text-[#2d6a4f] font-semibold">
            ¡Recibido! Te contactaremos pronto.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-center text-lg text-[#b91c1c] font-medium">
            Error al enviar. Revisa los datos e inténtalo de nuevo.
          </p>
        )}
      </div>
    </form>
  );
}
