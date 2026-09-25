import { NextResponse } from 'next/server';
import { db } from '../../../../lib/turso';
import { users } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, nama_lembaga } = body;

    // Logika Pendaftaran (Register)
    if (action === 'register') {
      // Cek apakah username sudah ada di database
      const existingUser = await db.select().from(users).where(eq(users.username, username));
      if (existingUser.length > 0) {
        return NextResponse.json({ success: false, message: 'Username sudah digunakan, silakan pilih yang lain.' }, { status: 400 });
      }

      // Simpan akun baru ke Turso
      await db.insert(users).values({
        role: 'guru',
        username,
        password,
        nama_lembaga,
      });

      return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    }

    // Logika Masuk (Login)
    if (action === 'login') {
      // Bypass khusus untuk akun admin (karena form admin belum dibuatkan khusus)
      if (username === 'admin' && password === 'admin123') {
        return NextResponse.json({ success: true, role: 'admin', nama_lembaga: 'Administrator' });
      }

      // Cek database Turso untuk akun guru
      const user = await db.select().from(users).where(eq(users.username, username));
      
      if (user.length > 0 && user[0].password === password) {
        return NextResponse.json({ success: true, role: user[0].role, nama_lembaga: user[0].nama_lembaga });
      } else {
        return NextResponse.json({ success: false, message: 'Username atau password salah.' }, { status: 401 });
      }
    }

    return NextResponse.json({ success: false, message: 'Aksi tidak valid.' }, { status: 400 });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server database.' }, { status: 500 });
  }
}
