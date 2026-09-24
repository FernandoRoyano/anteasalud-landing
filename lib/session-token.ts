// Token de sesión admin firmado con HMAC-SHA256 (Web Crypto → compatible con Edge/proxy)

export const SESSION_COOKIE =
  process.env.NODE_ENV === 'production' ? '__Host-antea_admin' : 'antea_admin';
export const SESSION_MAX_AGE = 60 * 60 * 12;

const encoder = new TextEncoder();

function getSecret(): string | null {
  // Fallback a ADMIN_PASSWORD: rotar la contraseña invalida todas las sesiones
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

function toBase64Url(bytes: ArrayBuffer): string {
  let binary = '';
  for (const b of new Uint8Array(bytes)) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return toBase64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const nonce = toBase64Url(crypto.getRandomValues(new Uint8Array(16)).buffer);
  const payload = `${Date.now() + SESSION_MAX_AGE * 1000}.${nonce}`;
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [exp, nonce, signature] = parts;
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;

  const expected = await sign(`${exp}.${nonce}`, secret);
  return constantTimeEqual(signature, expected);
}

export async function sha256(value: string): Promise<string> {
  return toBase64Url(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
}

export { constantTimeEqual };
