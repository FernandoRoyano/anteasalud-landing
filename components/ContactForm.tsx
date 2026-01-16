"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  // Sustituye estos valores por los tuyos de EmailJS dashboard
  const SERVICE_ID = "tu_service_id";
  const TEMPLATE_ID = "tu_template_id";
  const USER_ID = "tu_public_key";

  const enviarEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("Enviando...");

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID)
      .then(
        () => {
          setStatus("¡Mensaje enviado correctamente!");
          formRef.current?.reset();
        },
        () => setStatus("Error al enviar, inténtalo de nuevo.")
      );
  };

  return (
    <form ref={formRef} onSubmit={enviarEmail} className="max-w-md mx-auto bg-white shadow-xl rounded-3xl p-8 space-y-6">
      <h3 className="text-2xl font-bold text-blue-900 mb-2">Solicita información</h3>
      <input
        type="text"
        name="user_name"
        placeholder="Tu nombre"
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="email"
        name="user_email"
        placeholder="Tu email"
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <textarea
        name="message"
        rows={5}
        placeholder="¿En qué te podemos ayudar?"
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        required
      />
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
      >
        Enviar mensaje
      </button>
      {status && <p className="text-center mt-4">{status}</p>}
    </form>
  );
}
