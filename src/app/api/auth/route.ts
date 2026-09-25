import { NextResponse } from 'next/server';
import { db } from '../../../lib/turso';
import { Users } from '../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, sekolah } = body;

    // Logika Pendaftaran (Register)
    if (action === 'register') {
      const existingUser = await db.select().from(Users).where(eq(Users.Username, username));
      if (existingUser.length > 0) {
        return NextResponse.json({ success: false, message: 'Username sudah digunakan.' }, { status: 400 });
      }

      await db.insert(Users).values({
        Role: 'guru',
        Username: username,
        Password: password,
        Sekolah: sekolah,
      });

      return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    }

    // Logika Masuk (Login)
    if (action === 'login') {
      if (username === 'admin' && password === 'admin123') {
        return NextResponse.json({ success: true, role: 'admin', sekolah: 'Administrator' });
      }

      const user = await db.select().from(Users).where(eq(Users.Username, username));
      
      if (user.length > 0 && user[0].Password === password) {
        return NextResponse.json({ success: true, role: user[0].Role, sekolah: user[0].Sekolah });
      } else {
        return NextResponse.json({ success: false, message: 'Username atau password salah.' }, { status: 401 });
      }
    }

    return NextResponse.json({ success: false, message: 'Aksi tidak valid.' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}
