import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8f2] flex text-primary-dark">
      <AdminSidebar />
      <main id="panel-contenido" className="min-w-0 flex-1 p-5 pt-20 sm:p-8 sm:pt-24 lg:ml-64 lg:p-10 xl:p-12">
        {children}
      </main>
    </div>
  );
}
