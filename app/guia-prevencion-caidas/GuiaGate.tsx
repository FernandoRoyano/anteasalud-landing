"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Check, Download, Loader2, Lock, Printer } from "lucide-react";
import { ConsentCheckbox, HoneypotField } from "@/components/ConsentCheckbox";
import { leadInputClass } from "@/components/LeadForm";
import { postLead, useFormTimer } from "@/lib/lead-client";
import { openWhatsAppPlaceholder, sendLeadToWhatsApp } from "@/lib/lead-whatsapp";

const INTERES_GUIA = "Descarga guía prevención caídas";

/** Formulario de acceso a la guía completa. El contenido llega renderizado en servidor como children. */
export default function GuiaGate({ children }: { children: ReactNode }) {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const elapsed = useFormTimer();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const whatsappWindow = openWhatsAppPlaceholder();
    setSubmitting(true);
    setError("");

    try {
      const lead = { nombre: name.trim(), email: email.trim(), interes: INTERES_GUIA };
      const res = await postLead(lead, { consent, website, fillMs: elapsed() });

      if (res.ok) {
        setUnlocked(true);
        sendLeadToWhatsApp(whatsappWindow, lead);
        requestAnimationFrame(() => {
          const target = document.getElementById("contenido-guia");
          target?.focus();
          target?.scrollIntoView({ block: "start" });
        });
      } else {
        whatsappWindow?.close();
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Error al procesar la solicitud");
      }
    } catch {
      whatsappWindow?.close();
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {!unlocked && (
        <section className="w-full bg-primary-50 py-16 px-4 print:hidden">
          <div className="max-w-lg mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl border border-primary-light p-8 md:p-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-ink mb-2">Accede gratis a la guía completa</h2>
                <p className="text-lg text-muted">
                  Déjanos tu nombre y email. Acceso inmediato, sin suscripciones ni spam.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor={`${uid}-name`} className="block text-base font-semibold text-ink mb-1.5">
                    Tu nombre
                  </label>
                  <input
                    id={`${uid}-name`}
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Ej: María García"
                    className={leadInputClass}
                  />
                </div>

                <div>
                  <label htmlFor={`${uid}-email`} className="block text-base font-semibold text-ink mb-1.5">
                    Tu email
                  </label>
                  <input
                    id={`${uid}-email`}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className={leadInputClass}
                  />
                </div>

                <HoneypotField value={website} onChange={setWebsite} />
                <ConsentCheckbox id={`${uid}-consent`} checked={consent} onChange={setConsent} disabled={submitting} />

                {error && (
                  <div role="alert" className="bg-red-50 border border-red-200 text-[#b91c1c] text-base rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-14 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg transition inline-flex items-center justify-center gap-2 disabled:opacity-60 text-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Procesando...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" aria-hidden="true" /> Acceder a la guía gratis
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      <section
        id="contenido-guia"
        tabIndex={-1}
        className={`w-full bg-white py-16 px-4 outline-none ${unlocked ? "" : "hidden print:block"}`}
      >
        <div className="max-w-3xl mx-auto">
          {unlocked && (
            <div className="bg-primary-50 border border-primary-light rounded-2xl p-5 mb-10 flex items-center justify-between flex-wrap gap-3 print:hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-primary-dark">¡Listo! Ya tienes acceso.</p>
                  <p className="text-base text-ink">Puedes leerla aquí o imprimirla en PDF.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="min-h-12 inline-flex items-center gap-2 px-5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition"
              >
                <Printer className="w-5 h-5" aria-hidden="true" /> Imprimir / Guardar PDF
              </button>
            </div>
          )}
          {children}
        </div>
      </section>
    </>
  );
}
