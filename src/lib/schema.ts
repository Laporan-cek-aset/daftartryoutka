import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const Users = sqliteTable('Users', {
  ID: text('ID').primaryKey(),
  Nama: text('Nama'),
  Username: text('Username').notNull().unique(),
  Password: text('Password').notNull(),
  Role: text('Role').notNull().default('guru'),
});

export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  guru_id: text('guru_id').references(() => Users.ID),
  amount: integer('amount').notNull(),
  method: text('method'),
  status: text('status').notNull().default('pending'),
});
