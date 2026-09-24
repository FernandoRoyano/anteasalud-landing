import { z } from 'zod';
import { NextResponse } from 'next/server';

const text = (max: number) => z.string().trim().max(max);

export const sessionStatusSchema = z.enum(['scheduled', 'completed', 'missed', 'recovered', 'discounted']);
export const zoneSchema = z.enum(['capital', 'sur', 'oeste', 'este', 'norte']);

// Fecha ISO (YYYY-MM-DD o datetime ISO)
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}([T ][\d:.]+(Z|[+-]\d{2}:?\d{2})?)?$/);

export const sessionCreateSchema = z.object({
  clientId: text(64).min(1),
  date: dateSchema,
  status: sessionStatusSchema.default('scheduled'),
  isPending: z.boolean().default(false),
  missedReason: text(500).default(''),
  linkedToSessionId: text(64).default(''),
  notes: text(2000).default(''),
});

export const sessionUpdateSchema = z
  .object({
    date: dateSchema,
    status: sessionStatusSchema,
    isPending: z.boolean(),
    missedReason: text(500),
    notes: text(2000),
  })
  .partial();

const clientBase = z.object({
  name: text(120).min(1),
  phone: text(30),
  address: text(300),
  zone: zoneSchema,
  pricePerSession: z.coerce.number().min(0).max(1000),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  notes: text(2000),
  active: z.boolean(),
  contactName: text(120),
});

export const clientCreateSchema = clientBase.extend({
  phone: clientBase.shape.phone.default(''),
  address: clientBase.shape.address.default(''),
  zone: zoneSchema.default('capital'),
  pricePerSession: clientBase.shape.pricePerSession.default(35),
  color: clientBase.shape.color.default('#1e4a6d'),
  notes: clientBase.shape.notes.default(''),
  active: z.boolean().default(true),
  contactName: clientBase.shape.contactName.default(''),
});

export const clientUpdateSchema = clientBase.partial();

// El admin autoguarda mientras se escribe: la ruta de imagen se valida al renderizar (isLocalImagePath)
const ogImageSchema = text(300);

const articleBase = z.object({
  slug: text(120),
  title: text(200).min(1),
  excerpt: text(500),
  bodyMarkdown: z.string().max(100_000),
  ogImage: ogImageSchema,
  tags: z.array(text(40)).max(15),
  status: z.enum(['draft', 'published']),
});

export const articleCreateSchema = articleBase.extend({
  slug: articleBase.shape.slug.default(''),
  excerpt: articleBase.shape.excerpt.default(''),
  bodyMarkdown: articleBase.shape.bodyMarkdown.default(''),
  ogImage: ogImageSchema.default(''),
  tags: articleBase.shape.tags.default([]),
  status: articleBase.shape.status.default('draft'),
});

export const articleUpdateSchema = articleBase.extend({ title: text(200) }).partial();

export function invalidBody(error: z.ZodError) {
  const field = error.issues[0]?.path.join('.') || 'datos';
  return NextResponse.json({ error: `Campo no válido: ${field}` }, { status: 400 });
}
