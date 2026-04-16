import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminEnlacesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[rgb(232,237,238)] flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 p-6 md:p-10">{children}</main>
    </div>
  );
}
