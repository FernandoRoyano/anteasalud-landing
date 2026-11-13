'use client';

import { useEffect, useState } from 'react';

export default function AssessmentClientPicker({ value, onChange }: { value: string; onChange: (id: string, name?: string) => void }) {
  const [clients, setClients] = useState<Array<{ id: string; name: string; active: boolean }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/admin/clients', { cache: 'no-store', signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error('No se pudieron cargar los clientes. Puedes guardar sin vincular y hacerlo después.');
      const data = await response.json();
      setClients(data.clients);
    }).catch(error => { if (!controller.signal.aborted) setError(error.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  return <div className="mt-5 rounded-xl border border-primary/20 bg-primary-50 p-4"><label className="block font-semibold">Cliente del panel (opcional)<select value={value} disabled={loading} onChange={event => onChange(event.target.value, clients.find(client => client.id === event.target.value)?.name)} className="mt-2 min-h-12 w-full rounded-xl border border-primary/40 bg-white px-4 py-3"><option value="">{loading ? 'Cargando clientes…' : 'Sin vincular a un cliente'}</option>{value && !clients.some(client => client.id === value) && <option value={value}>Cliente vinculado no disponible</option>}{clients.map(client => <option key={client.id} value={client.id}>{client.name}{client.active ? '' : ' (inactivo)'}</option>)}</select></label><p className="mt-2 text-sm text-muted">Vincula la valoración para calcular su próxima revisión mensual. No se agrupan personas solo porque tengan el mismo nombre.</p>{error && <p role="alert" className="mt-2 text-sm text-red-800">{error}</p>}</div>;
}
