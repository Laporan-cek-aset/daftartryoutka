import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Semua ID diubah menjadi text dan dihapus autoIncrement-nya untuk menyesuaikan Turso
export const Users = sqliteTable('Users', {
  ID: text('ID').primaryKey(), // Tipe Text, seperti 'U12345'
  Username: text('Username').notNull().unique(),
  Password: text('Password').notNull(),
  Role: text('Role').notNull().default('guru'),
  Nama: text('Nama'), // Di Turso Anda menggunakan 'Nama', bukan 'Sekolah'
});

export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(),
  guru_id: text('guru_id').references(() => Users.ID),
  amount: integer('amount').notNull(), // Amount tetap integer
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
