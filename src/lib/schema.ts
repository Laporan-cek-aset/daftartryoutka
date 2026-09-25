import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Users = sqliteTable('Users', {
  ID: text('ID').primaryKey(), // Diubah menjadi text sesuai Turso
  Nama: text('Nama'), // Diubah dari Sekolah menjadi Nama
  Username: text('Username').notNull().unique(),
  Password: text('Password').notNull(),
  Role: text('Role').notNull().default('guru'),
});

export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(),
  guru_id: text('guru_id').references(() => Users.ID),
  amount: text('amount').notNull(),
  method: text('method'),
  status: text('status').notNull().default('pending'),
});

export const students = sqliteTable('students', {
  id: text('id').primaryKey(),
  guru_id: text('guru_id').references(() => Users.ID),
  username_siswa: text('username_siswa').notNull(),
  password_siswa: text('password_siswa').notNull(),
  nama_siswa: text('nama_siswa').notNull(),
});
