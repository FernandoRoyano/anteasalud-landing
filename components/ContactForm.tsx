"use client";

import { useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

const ZONAS = [
  "Madrid y alrededores",
  "Barcelona y alrededores",
  "Valencia y alrededores",
  "Sevilla y alrededores",
  "Bilbao/País Vasco",
  "Zaragoza",
  "Málaga/Costa del Sol",
  "Otra ciudad",
];

const INTERESES = [
  "Evaluación gratuita",
  "Sesión suelta (45€)",
  "Plan 2 días/semana (70€)",
  "Solo información y precios",
];

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [zona, setZona] = useState("");
  const [interes, setInteres] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, zona, interes }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setNombre("");
      setEmail("");
      setTelefono("");
      setZona("");
      setInteres("");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:outline-none focus:ring-2 focus:ring-[rgb(0,94,184)] focus:border-transparent";
  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(0,94,184)] focus:border-transparent";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-xl rounded-3xl p-8 space-y-5"
    >
      <h3 className="text-2xl font-bold text-[rgb(0,60,115)] mb-2">
        Solicita información
      </h3>

      <div>
        <label htmlFor="nombre" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">Nombre <span className="text-red-500">*</span></label>
        <input
          id="nombre"
          type="text"
          placeholder="Ej: María García"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={inputClass}
          required
          disabled={status === "sending"}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Ej: maria@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          disabled={status === "sending"}
        />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">Teléfono <span className="text-red-500">*</span></label>
        <input
          id="telefono"
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
        <label htmlFor="zona" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">Zona</label>
        <select
          id="zona"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          className={selectClass}
          disabled={status === "sending"}
        >
          <option value="">Selecciona tu zona</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="interes" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-1">¿Qué te interesa?</label>
        <select
          id="interes"
          value={interes}
          onChange={(e) => setInteres(e.target.value)}
          className={selectClass}
          disabled={status === "sending"}
        >
          <option value="">Selecciona una opción</option>
          {INTERESES.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "sending" ? "Enviando..." : "Solicitar información"}
      </button>

      {status === "success" && (
        <p className="text-center text-green-600 font-medium">
          ¡Recibido! Te contactaremos pronto.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-red-600 font-medium">
          Error al enviar. Inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
