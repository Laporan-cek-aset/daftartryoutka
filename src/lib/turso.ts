import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// Fungsi ini yang dicari oleh Vercel (pastikan ada kata 'export')
export function getTursoClient() {
  const rawUrl = process.env.TURSO_DATABASE_URL || process.env.TURSO_URL || '';
  const safeUrl = rawUrl.replace('libsql://', 'https://');
  const authToken = process.env.TURSO_AUTH_TOKEN || '';

  return createClient({
    url: safeUrl,
    authToken: authToken,
  });
}

export const db = drizzle(getTursoClient(), { schema });
