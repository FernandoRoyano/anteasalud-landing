import AssessmentEditor from '@/components/admin/AssessmentEditor';
import { isAuthenticated } from '@/lib/auth';
import { getClientById } from '@/lib/sheets';
import { redirect } from 'next/navigation';

export default async function AssessmentsPage({ searchParams }: { searchParams: Promise<{ client?: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin');
  const { client } = await searchParams;
  const selected = typeof client === 'string' && client.length <= 64 ? await getClientById(client) : null;
  return <AssessmentEditor initialClient={selected ? { id: selected.id, name: selected.name } : undefined} />;
}
