import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

export function getTursoClient() {
  const rawUrl = process.env.TURSO_DATABASE_URL || 'https://daftartryout-laporan-cek-aset.aws-ap-northeast-1.turso.io';
  const safeUrl = rawUrl.replace('libsql://', 'https://');
  const authToken = process.env.TURSO_AUTH_TOKEN || '';

  return createClient({
    url: safeUrl,
    authToken: authToken,
  });
}

export const db = drizzle(getTursoClient(), { schema });
