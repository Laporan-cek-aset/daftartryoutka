import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Semua pengguna (Guru & Siswa) akan masuk ke sini
export const Users = sqliteTable('Users', {
  ID: text('ID').primaryKey(),
  Nama: text('Nama'), // Di Turso kolomnya bernama 'Nama'
  Username: text('Username').notNull().unique(),
  Password: text('Password').notNull(),
  Role: text('Role').notNull().default('guru'), // Nanti siswa bisa diisi 'siswa'
});

// Tabel tagihan pembayaran khusus untuk lembaga/guru
export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  guru_id: text('guru_id').references(() => Users.ID),
  amount: integer('amount').notNull(),
  method: text('method'),
  status: text('status').notNull().default('pending'),
});
