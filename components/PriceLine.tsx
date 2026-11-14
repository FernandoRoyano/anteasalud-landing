import { Check } from 'lucide-react';

import { SINGLE_SESSION_PRICE as PRICE_SESSION, PLAN_WEEKLY_PRICE as PRICE_PLAN } from '@/lib/public-pricing';

/** Precio visible en el primer pantallazo: las familias quieren saberlo antes de dejar su teléfono */
export default function PriceLine({
  compact = false,
  surcharge = 0,
  zoneNote = false,
  className = '',
}: {
  compact?: boolean;
  surcharge?: number;
  /** Muestra la cobertura y el horario actuales */
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
      {compact ? <p className="mt-2 text-sm text-[#4a6358]">30–45 minutos por sesión, adaptados a su tolerancia.</p> : (
      <p className="mt-2 text-sm text-[#4a6358]">Sesiones de 30–45 minutos, según su tolerancia. Para muchas personas, 30 minutos son suficientes; ajustamos el trabajo para evitar un cansancio excesivo después.</p>
      )}
      {zoneNote && surcharge === 0 && (
        <p className="mt-2 text-sm text-[#4a6358]">Solo Madrid capital. Mañanas hasta las 13:00, según disponibilidad.</p>
      )}
      {surcharge > 0 && (
        <p className="mt-2 text-sm text-[#4a6358]">Incluye {surcharge} € por sesión de desplazamiento.</p>
      )}
    </div>
  );
}
