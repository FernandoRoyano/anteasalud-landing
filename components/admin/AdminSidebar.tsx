"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, LogOut, Menu, X, UserCircle, Calendar, Link2, Video, FileText, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'Resumen', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads web', icon: Users },
  { href: '/admin/clientes', label: 'Clientes', icon: UserCircle },
  { href: '/admin/valoraciones', label: 'Valoraciones', icon: FileText },
  { href: '/admin/sesiones', label: 'Sesiones', icon: Calendar },
  { href: '/admin/articulos', label: 'Artículos', icon: FileText },
  { href: '/admin/guion-video', label: 'Guion vídeo', icon: Video },
  { href: '/admin/enlaces', label: 'Enlaces', icon: Link2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [logoutError, setLogoutError] = useState('');

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth', { method: 'DELETE' });
      if (!res.ok) throw new Error('Logout failed');
      router.push('/admin');
      router.refresh();
    } catch { setLogoutError('No se pudo cerrar la sesión. Inténtalo de nuevo.'); }
  };

  return (
    <>
      {/* Botón móvil */}
      <button
        ref={toggleRef}
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-5 z-50 h-11 rounded-xl border border-primary/15 bg-white px-3 text-primary-dark shadow-sm flex items-center gap-2 text-sm font-semibold"
        aria-label={open ? 'Cerrar navegación del panel' : 'Abrir navegación del panel'}
        aria-expanded={open}
        aria-controls="admin-navigation"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        <span>Menú</span>
      </button>

      {/* Overlay móvil */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-navigation"
        className={`fixed top-0 left-0 h-dvh w-64 bg-[#fbfcf8] border-r border-primary/15 flex flex-col z-40 transition-transform lg:visible lg:translate-x-0 ${
          open ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 pb-6 pt-20 lg:pt-8 border-b border-primary/10">
          <Link href="/admin/dashboard" className="font-display text-2xl font-bold tracking-tight text-primary">ANTEA <span className="font-medium text-muted">SALUD</span></Link>
          <p className="text-xs text-muted mt-2">Tu espacio de trabajo</p>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Navegación del panel">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                  isActive
                    ? 'bg-primary-dark text-white shadow-sm'
                    : 'text-muted hover:bg-primary-light/50 hover:text-primary-dark'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-primary/10">
          <Link href="/" className="mb-2 flex min-h-11 items-center justify-between rounded-xl px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-50">Ir a la web <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
          {logoutError && <p role="alert" className="px-4 text-xs text-red-700">{logoutError}</p>}
        </div>
      </aside>
    </>
  );
}
