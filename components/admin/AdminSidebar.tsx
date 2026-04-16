"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, LogOut, Menu, X, UserCircle, Calendar, Link2 } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads web', icon: Users },
  { href: '/admin/clientes', label: 'Clientes', icon: UserCircle },
  { href: '/admin/sesiones', label: 'Sesiones', icon: Calendar },
  { href: '/admin/enlaces', label: 'Enlaces', icon: Link2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  return (
    <>
      {/* Botón móvil */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center"
        aria-label="Menú"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-[rgb(200,207,210)] flex flex-col z-40 transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[rgb(200,207,210)]">
          <h1 className="text-xl font-black text-[rgb(0,94,184)]">ANTEA SALUD</h1>
          <p className="text-xs text-[rgb(130,131,130)] mt-1">Panel de control</p>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                  isActive
                    ? 'bg-[rgb(0,94,184)] text-white shadow-md'
                    : 'text-[rgb(31,41,51)] hover:bg-[rgb(232,237,238)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[rgb(200,207,210)]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
