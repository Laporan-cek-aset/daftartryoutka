import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const Users = sqliteTable('Users', {
  ID: integer('ID').primaryKey({ autoIncrement: true }),
  Username: text('Username').notNull().unique(),
  Password: text('Password').notNull(),
  Role: text('Role').notNull().default('guru'),
  Sekolah: text('Sekolah'), 
});

export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  guru_id: integer('guru_id').references(() => Users.ID),
  amount: integer('amount').notNull(),
  method: text('method'), // 'Bank' atau 'ShopeePay'
  status: text('status').notNull().default('pending'), // 'pending', 'approved'
});

export const students = sqliteTable('students', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  guru_id: integer('guru_id').references(() => Users.ID),
  username_siswa: text('username_siswa').notNull(),
  password_siswa: text('password_siswa').notNull(),
  nama_siswa: text('nama_siswa').notNull(),
});
