import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const Users = sqliteTable('Users', {
  ID: text('ID').primaryKey(),
  Nama: text('Nama').notNull(),
  Email: text('Email'),
  Phone: text('Phone'),
  Username: text('Username').notNull().unique(),
  Password: text('Password').notNull(),
  Role: text('Role').notNull().default('guru'),
  Status: text('Status').notNull().default('pending'), // pending, active, rejected
  CreatedAt: text('CreatedAt'),
  UpdatedAt: text('UpdatedAt'),
});

export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  guru_id: text('guru_id').references(() => Users.ID),
  amount: integer('amount').notNull(),
  method: text('method'),
  status: text('status').notNull().default('pending'),
  created_at: text('created_at'),
  updated_at: text('updated_at'),
});

export const participants = sqliteTable('participants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  guru_id: text('guru_id').references(() => Users.ID),
  nama_siswa: text('nama_siswa').notNull(),
  nisn: text('nisn'),
  kelas: text('kelas'),
  jenis_kelamin: text('jenis_kelamin'),
  created_at: text('created_at'),
});

export const exam_results = sqliteTable('exam_results', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  participant_id: integer('participant_id').references(() => participants.id),
  exam_session: text('exam_session'), // session 1-4
  score: integer('score'),
  correct_answers: integer('correct_answers'),
  wrong_answers: integer('wrong_answers'),
  completed_at: text('completed_at'),
});
