import { NextResponse } from 'next/server';
import { db } from '../../../lib/turso';
import { Users, payments } from '../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, sekolah } = body; // 'sekolah' dari input form UI

    if (action === 'register') {
      const existingUser = await db.select().from(Users).where(eq(Users.Username, username));
      if (existingUser.length > 0) {
        return NextResponse.json({ success: false, message: 'Username sudah digunakan.' }, { status: 400 });
      }

      // Generate ID string unik untuk tabel Users dan payments
      const newUserId = `U${Date.now()}`;
      const newPaymentId = `P${Date.now()}`;

      // Masukkan ke tabel Users
      await db.insert(Users).values({
        ID: newUserId,
        Role: 'guru',
        Username: username,
        Password: password,
        Nama: sekolah, // Masukkan value 'sekolah' dari form ke kolom 'Nama' di Turso
      });

      // Buat entri awal di tabel payments
      await db.insert(payments).values({
        id: newPaymentId,
        guru_id: newUserId,
        amount: 0,
        status: 'pending'
      });

      return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    }

    if (action === 'login') {
      if (username === 'admin' && password === 'admin123') {
        return NextResponse.json({ success: true, role: 'admin', sekolah: 'Administrator' });
      }

      const user = await db.select().from(Users).where(eq(Users.Username, username));
      
      if (user.length > 0 && user[0].Password === password) {
        return NextResponse.json({ success: true, role: user[0].Role, sekolah: user[0].Nama }); // Ambil dari kolom 'Nama'
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
