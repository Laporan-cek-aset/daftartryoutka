import { NextResponse } from 'next/server';
import { db } from '../../../lib/turso';
import { Users, payments } from '../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, nama } = body; 

    // 1. LOGIKA PENDAFTARAN GURU (Sekolah)
    if (action === 'register') {
      const existingUser = await db.select().from(Users).where(eq(Users.Username, username));
      if (existingUser.length > 0) {
        return NextResponse.json({ success: false, message: 'Username sudah digunakan.' }, { status: 400 });
      }

      // Membuat ID Unik
      const newUserId = `U${Date.now()}`;
      const newPaymentId = `P${Date.now()}`;

      // A. Masukkan Akun Guru ke sheet Users
      await db.insert(Users).values({
        ID: newUserId,
        Role: 'guru',
        Username: username,
        Password: password,
        Nama: nama, // Menyimpan Nama Sekolah
      });

      // B. Masukkan tagihan otomatis ke sheet payments
      await db.insert(payments).values({
        id: newPaymentId,
        guru_id: newUserId,
        amount: 0, // Akan di-update otomatis setelah guru upload siswa nanti
        status: 'pending'
      });

      return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    }

    // 2. LOGIKA LOGIN (Mendeteksi Admin / Guru / Siswa)
    if (action === 'login') {
      if (username === 'admin' && password === 'admin123') {
        return NextResponse.json({ success: true, role: 'admin', nama: 'Administrator' });
      }

      const user = await db.select().from(Users).where(eq(Users.Username, username));
      
      if (user.length > 0 && user[0].Password === password) {
        // Otomatis mengarahkan ke dashboard yang benar sesuai rolenya (guru/siswa)
        return NextResponse.json({ success: true, role: user[0].Role, nama: user[0].Nama });
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
