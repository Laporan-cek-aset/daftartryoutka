import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Semua pengguna (Admin, Guru, Siswa) menyatu di tabel Users
export const Users = sqliteTable('Users', {
  ID: text('ID').primaryKey(),
  Username: text('Username').notNull().unique(),
  Password: text('Password').notNull(),
  Role: text('Role').notNull().default('guru'), // Bisa berisi: 'admin', 'guru', atau 'siswa'
  Nama: text('Nama'), // Untuk guru = Nama Sekolah. Untuk siswa = Nama Siswa.
});

// Tabel tagihan pembayaran khusus untuk lembaga/guru
export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(),
  guru_id: text('guru_id').references(() => Users.ID),
  amount: integer('amount').notNull(),
  method: text('method'),
  status: text('status').notNull().default('pending'),
});
