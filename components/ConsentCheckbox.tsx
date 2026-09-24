"use client";

import Link from "next/link";

interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

// Primera capa informativa RGPD + consentimiento explícito para datos de salud (art. 9)
export function ConsentCheckbox({ id, checked, onChange, disabled }: ConsentCheckboxProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer text-base text-[#1f2933]">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          disabled={disabled}
          className="mt-1 size-5 shrink-0 accent-[#2d6a4f] cursor-pointer"
        />
        <span>
          He leído la{" "}
          <Link href="/privacidad" target="_blank" className="font-semibold text-[#2d6a4f] underline underline-offset-2">
            política de privacidad
          </Link>{" "}
          y consiento el tratamiento de mis datos, incluidos los de salud que indique, para que ANTEA Salud me contacte.
        </span>
      </label>
      <p className="text-sm leading-snug text-[#4b5563]">
        Responsable: Fernando Royano (ANTEA Salud). Finalidad: responder tu solicitud. No cedemos datos a terceros
        salvo proveedores técnicos. Puedes acceder, rectificar y suprimir tus datos escribiendo a anteasalud@gmail.com.
      </p>
    </div>
  );
}

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

// Campo trampa invisible para bots (las personas no lo ven ni lo rellenan)
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Web
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
