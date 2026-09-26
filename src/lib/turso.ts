import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// Gunakan /web client khusus agar kompatibel dengan Vercel Serverless
const tursoUrl = (process.env.TURSO_DATABASE_URL || process.env.TURSO_URL || '').replace('libsql://', 'https://');
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN || '';

export const tursoClient = createClient({
  url: tursoUrl,
  authToken: tursoAuthToken,
});

export const db = drizzle(tursoClient, { schema });
