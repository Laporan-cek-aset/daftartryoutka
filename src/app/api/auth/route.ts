import { NextResponse } from 'next/server';
import { db } from '../../../lib/turso';
import { Users } from '../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // API dengan tegas menangkap variabel "sekolah" dari form depan
    const { action, username, password, sekolah } = body; 

    if (action === 'register') {
      const existingUser = await db.select().from(Users).where(eq(Users.Username, username));
      if (existingUser.length > 0) {
        return NextResponse.json({ success: false, message: 'Username sudah digunakan.' }, { status: 400 });
      }

      // Memasukkan data ke kolom yang benar-benar ada di Turso
      await db.insert(Users).values({
        Role: 'guru',
        Username: username,
        Password: password,
        Sekolah: sekolah, 
      });

      return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    }

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
  } catch (error: any) {
    console.error("Database Error: ", error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan server: ' + error.message }, { status: 500 });
  }
}
