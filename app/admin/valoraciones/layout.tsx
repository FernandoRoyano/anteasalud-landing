import type { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AssessmentsLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-primary-50 print:bg-white"><div className="print:hidden"><AdminSidebar /></div><main className="p-5 pt-20 lg:ml-64 lg:p-10 print:m-0 print:p-0">{children}</main></div>;
}
