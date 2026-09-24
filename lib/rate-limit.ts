import type { NextRequest } from 'next/server';

// Best effort: en serverless cada instancia tiene su propio mapa. Para límites globales → Upstash.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}
