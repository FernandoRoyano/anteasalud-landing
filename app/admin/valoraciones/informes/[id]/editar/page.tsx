import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';
import { isAuthenticated } from '@/lib/auth';
import { getAssessmentReport } from '@/lib/sheets';
import AssessmentEditor from '@/components/admin/AssessmentEditor';

export default async function EditAssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) redirect('/admin');
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const report = await getAssessmentReport(id);
  if (!report) notFound();
  return <AssessmentEditor initialReport={report} />;
}
