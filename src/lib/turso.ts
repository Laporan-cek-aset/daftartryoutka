import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Mengambil URL dari Vercel
const rawUrl = process.env.TURSO_DATABASE_URL || process.env.TURSO_URL || '';

// TRIK AMPUH: Memaksa mengubah awalan libsql:// menjadi https:// secara otomatis
const safeUrl = rawUrl.replace('libsql://', 'https://');

const client = createClient({
  url: safeUrl,
  authToken: process.env.TURSO_AUTH_TOKEN || '',
});

export const db = drizzle(client, { schema });
