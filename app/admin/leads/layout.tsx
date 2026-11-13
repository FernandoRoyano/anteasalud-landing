import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLeadsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[rgb(232,237,238)] flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-4 pb-6 pt-20 sm:px-6 sm:pb-10 lg:ml-64 lg:p-10">
        {children}
      </main>
    </div>
  );
}
