import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const rawUrl = process.env.TURSO_DATABASE_URL || process.env.TURSO_URL || '';
const safeUrl = rawUrl.replace('libsql://', 'https://');

export const tursoClient = createClient({
  url: safeUrl,
  authToken: process.env.TURSO_AUTH_TOKEN || '',
});

export const db = drizzle(tursoClient, { schema });
