import { Check } from 'lucide-react';

const PRICE_SESSION = 55;
const PRICE_PLAN = 90;

/** Precio visible en el primer pantallazo: las familias quieren saberlo antes de dejar su teléfono */
export default function PriceLine({
  surcharge = 0,
  zoneNote = false,
  className = '',
}: {
  surcharge?: number;
  /** Aclara que el precio es de Madrid capital y el recargo fuera */
  zoneNote?: boolean;
  className?: string;
}) {
  const items = [
    'Valoración gratis',
    `Sesión suelta ${PRICE_SESSION + surcharge} €`,
    `2 días/semana ${PRICE_PLAN + surcharge * 2} €/sem.`,
    'Sin permanencia',
  ];

  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-base font-semibold text-[#17372b]" aria-label="Precios">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-1.5">
            <Check className="mt-1 h-4 w-4 shrink-0 text-[#2d6a4f]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      {zoneNote && surcharge === 0 && (
        <p className="mt-2 text-sm text-[#4a6358]">Precios en Madrid capital. Resto de la Comunidad: +10 € por sesión.</p>
      )}
      {surcharge > 0 && (
        <p className="mt-2 text-sm text-[#4a6358]">Incluye {surcharge} € por sesión de desplazamiento.</p>
      )}
    </div>
  );
}
