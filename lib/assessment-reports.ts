import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { z } from 'zod';
import { ASSESSMENT_VERSION, canExportAssessment, evaluateAssessment } from '@/lib/functional-assessment';

export const assessmentReportSchema = z.object({
  id: z.uuid(),
  reference: z.string().trim().min(1).max(100),
  date: z.iso.date(),
  observations: z.string().max(4000),
  proposal: z.string().trim().min(10).max(4000),
  reviewed: z.literal(true),
  assessment: z.object({
    age: z.number().int().min(0).max(120).nullable(),
    scores: z.tuple([z.number().int().min(0).max(4).nullable(), z.number().int().min(0).max(4).nullable(), z.number().int().min(0).max(4).nullable()]),
    falls: z.tuple([z.boolean().nullable(), z.boolean().nullable(), z.boolean().nullable(), z.boolean().nullable()]),
    interrupted: z.boolean(),
    suitable: z.boolean(),
  }).strict(),
}).strict().refine(data => canExportAssessment(data.assessment, data), { message: 'Completa y revisa el informe antes de guardarlo' });

export type AssessmentReportInput = z.infer<typeof assessmentReportSchema>;
export type AssessmentReport = AssessmentReportInput & {
  createdAt: string;
  version: string;
  result: ReturnType<typeof evaluateAssessment>;
};

export function createAssessmentReport(input: AssessmentReportInput): AssessmentReport {
  return { ...assessmentReportSchema.parse(input), createdAt: new Date().toISOString(), version: ASSESSMENT_VERSION, result: evaluateAssessment(input.assessment) };
}

function encryptionKey() {
  const value = process.env.ASSESSMENT_ENCRYPTION_KEY?.trim();
  if (!value || !/^[0-9a-f]{64}$/i.test(value)) throw new Error('[Reports:key] Falta la clave de cifrado de informes');
  return Buffer.from(value, 'hex');
}

export function encryptAssessmentReport(report: AssessmentReport): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv);
  cipher.setAAD(Buffer.from(report.id));
  const body = Buffer.concat([cipher.update(JSON.stringify(report), 'utf8'), cipher.final()]);
  return ['v1', iv.toString('base64'), cipher.getAuthTag().toString('base64'), body.toString('base64')].join('.');
}

export function decryptAssessmentReport(id: string, encoded: string): AssessmentReport {
  const [version, iv, tag, body] = encoded.split('.');
  if (version !== 'v1' || !iv || !tag || !body) throw new Error('[Reports:decrypt] Formato de informe inválido');
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), Buffer.from(iv, 'base64'));
  decipher.setAAD(Buffer.from(id));
  decipher.setAuthTag(Buffer.from(tag, 'base64'));
  const report: AssessmentReport = JSON.parse(Buffer.concat([decipher.update(Buffer.from(body, 'base64')), decipher.final()]).toString('utf8'));
  if (report.id !== id) throw new Error('[Reports:decrypt] Identidad de informe inválida');
  return report;
}
