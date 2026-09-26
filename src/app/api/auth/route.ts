import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client/web';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, nama } = body; 

    // JALUR VIP: Langsung tembak ke Turso tanpa perantara Drizzle ORM
    // Memaksa penggunaan https:// untuk menghindari pemblokiran Vercel
    const rawUrl = process.env.TURSO_DATABASE_URL || process.env.TURSO_URL || 'https://tryouttka20262027-kkgkkmisurabaya10.aws-us-east-1.turso.io';
    const safeUrl = rawUrl.replace('libsql://', 'https://');
    
    // Pastikan Anda sudah menaruh Token rahasia Turso di Environment Variables Vercel!
    const authToken = process.env.TURSO_AUTH_TOKEN || ''; 

    if (!authToken) {
       return NextResponse.json({ success: false, message: 'DETAIL ERROR: Token Turso kosong di Vercel!' }, { status: 500 });
    }

    const client = createClient({
      url: safeUrl,
      authToken: authToken,
    });

    // ================= LOGIKA REGISTER =================
    if (action === 'register') {
      // 1. Cek apakah username sudah dipakai
      const checkUser = await client.execute({
        sql: "SELECT * FROM Users WHERE Username = ?",
        args: [username]
      });

      if (checkUser.rows.length > 0) {
        return NextResponse.json({ success: false, message: 'Username sudah digunakan.' }, { status: 400 });
      }

      const newUserId = `U${Date.now()}`;

      // 2. Simpan Guru ke tabel Users (Langsung pakai SQL murni)
      await client.execute({
        sql: "INSERT INTO Users (ID, Role, Username, Password, Nama) VALUES (?, ?, ?, ?, ?)",
        args: [newUserId, "guru", username, password, nama]
      });

      // 3. Simpan tagihan otomatis ke tabel payments
      await client.execute({
        sql: "INSERT INTO payments (guru_id, amount, status) VALUES (?, ?, ?)",
        args: [newUserId, 0, "pending"]
      });

      return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    }

    // ================= LOGIKA LOGIN =================
    if (action === 'login') {
      if (username === 'admin' && password === 'admin123') {
        return NextResponse.json({ success: true, role: 'admin', nama: 'Administrator' });
      }

      const checkUser = await client.execute({
        sql: "SELECT * FROM Users WHERE Username = ?",
        args: [username]
      });
      
      if (checkUser.rows.length > 0) {
        const user = checkUser.rows[0];
        if (user.Password === password) {
          // Akan otomatis mengembalikan role guru/siswa sesuai data
          return NextResponse.json({ success: true, role: user.Role, nama: user.Nama });
        }
      }
      return NextResponse.json({ success: false, message: 'Username atau password salah.' }, { status: 401 });
    }

    return NextResponse.json({ success: false, message: 'Aksi tidak valid.' }, { status: 400 });

  } catch (error: any) {
    console.error("Database Error: ", error);
    return NextResponse.json({ success: false, message: `DETAIL ERROR: ${error.message}` }, { status: 500 });
  }
}
