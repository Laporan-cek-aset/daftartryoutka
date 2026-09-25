import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  role: text('role').notNull(), // 'admin', 'guru', 'siswa'
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  nama_lembaga: text('nama_lembaga'), // Khusus guru
});

export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  guru_id: integer('guru_id').references(() => users.id),
  amount: integer('amount').notNull(),
  method: text('method'), // 'Bank' atau 'ShopeePay'
  status: text('status').notNull().default('pending'), // 'pending', 'approved'
});

export const students = sqliteTable('students', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  guru_id: integer('guru_id').references(() => users.id),
  username_siswa: text('username_siswa').notNull(),
  password_siswa: text('password_siswa').notNull(),
  nama_siswa: text('nama_siswa').notNull(),
});
