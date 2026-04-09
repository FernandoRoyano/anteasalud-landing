"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Error de conexión');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(191,231,249)] via-white to-[rgb(232,237,238)] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[rgb(200,207,210)] p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[rgb(0,94,184)] flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-[rgb(31,41,51)]">Panel de Administración</h1>
          <p className="text-sm text-[rgb(130,131,130)] mt-1">ANTEA Salud · CRM de leads</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-[rgb(31,41,51)] mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-[rgb(200,207,210)] focus:border-[rgb(0,94,184)] focus:ring-2 focus:ring-[rgb(191,231,249)] outline-none transition text-[rgb(31,41,51)]"
              placeholder="Introduce tu contraseña"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[rgb(32,113,188)] to-[rgb(0,94,184)] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
