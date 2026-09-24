import { cookies } from 'next/headers';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  constantTimeEqual,
  createSessionToken,
  sha256,
  verifySessionToken,
} from '@/lib/session-token';

export async function createSession(): Promise<boolean> {
  const token = await createSessionToken();
  if (!token) return false;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  return true;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  // Comparar hashes de longitud fija evita filtrar la longitud por timing
  return constantTimeEqual(await sha256(password), await sha256(adminPassword));
}
