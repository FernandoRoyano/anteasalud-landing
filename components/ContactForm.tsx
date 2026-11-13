"use client";

import { useEffect, useId, useRef, useState } from "react";
import { trackLeadConversion } from "@/components/GoogleTag";
import { ConsentCheckbox, HoneypotField } from "@/components/ConsentCheckbox";
import { leadInputClass } from "@/components/LeadForm";
import { postLead, useFormTimer } from "@/lib/lead-client";
import { buildWhatsAppUrl } from "@/lib/lead-whatsapp";

type FormStatus = "idle" | "sending" | "success" | "error";


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
  const [barrio, setBarrio] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const zona = "Madrid capital";
  const [interes, setInteres] = useState("");
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
      nombre, email, telefono, zona: barrio.trim() ? `${zona} - ${barrio.trim()}` : zona,
      interes,
      procedencia: "Valoración gratuita",
      formulario: "Contacto",
    };

    try {
      const res = await postLead(lead, { consent, website, fillMs: elapsed() });
      if (!res.ok) throw new Error();

      if (!(await res.clone().json()).duplicate) trackLeadConversion();
      setStatus("success");
      setNombre("");
      setBarrio("");
      setEmail("");
      setTelefono("");
      setInteres("");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") return <div className="rounded-3xl border border-primary/20 bg-white p-8 text-center space-y-4"><h3 ref={successRef} tabIndex={-1} className="text-2xl font-bold text-primary-dark outline-none">Solicitud recibida</h3><p className="text-lg text-muted">Fernando te llamará en menos de 24 horas para conocer vuestra situación. No tienes que hacer nada más.</p><a href={buildWhatsAppUrl('Hola, he enviado el formulario de ANTEA Salud y prefiero continuar por WhatsApp.')} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-xl border border-primary/30 px-5 py-3 font-semibold text-primary">Escribir por WhatsApp (opcional)</a></div>;

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

      <p className="rounded-xl bg-primary-50 p-4 text-base text-muted">Atendemos solo en Madrid capital, en horario de mañana hasta las 13:00 y según disponibilidad.</p>

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

      <div><label htmlFor={`${uid}-barrio`} className="block text-base font-semibold text-[#1f2933] mb-1.5">Barrio o código postal de la persona <span className="font-normal text-muted">(opcional)</span></label><input id={`${uid}-barrio`} type="text" maxLength={80} value={barrio} onChange={event => setBarrio(event.target.value)} placeholder="Ej.: Pacífico o 28007" className={leadInputClass} disabled={sending} /><p className="mt-2 text-sm text-muted">Nos ayuda a comprobar disponibilidad y organizar las visitas en Madrid capital. No hace falta la dirección completa.</p></div>

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
        {status === "error" && (
          <p role="alert" className="text-center text-lg text-[#b91c1c] font-medium">
            Error al enviar. Revisa los datos e inténtalo de nuevo.
          </p>
        )}
      </div>
    </form>
  );
}
