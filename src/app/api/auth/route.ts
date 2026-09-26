import { NextResponse } from 'next/server';
import { getTursoClient } from '../../../lib/turso';

// PERINTAH WAJIB UNTUK VERCEL: Jangan cache API ini!
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, nama } = body; 
    
    // Panggil koneksi database
    const client = getTursoClient();

    // 1. LOGIKA REGISTER (Pendaftaran)
    if (action === 'register') {
      // Cek apakah username sudah ada
      const checkUser = await client.execute({
        sql: "SELECT * FROM Users WHERE Username = ?",
        args: [username]
      });

      if (checkUser.rows.length > 0) {
        return NextResponse.json({ success: false, message: 'Username sudah digunakan.' }, { status: 400 });
      }

      // Generate ID unik
      const newUserId = `U${Date.now()}`;

      // Simpan Guru ke tabel Users (SQL Murni)
      await client.execute({
        sql: "INSERT INTO Users (ID, Role, Username, Password, Nama) VALUES (?, ?, ?, ?, ?)",
        args: [newUserId, "guru", username, password, nama]
      });

      // Simpan tagihan otomatis ke tabel payments (SQL Murni)
      await client.execute({
        sql: "INSERT INTO payments (guru_id, amount, status) VALUES (?, ?, ?)",
        args: [newUserId, 0, "pending"]
      });

      return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    }

    // 2. LOGIKA LOGIN
    if (action === 'login') {
      // Akses khusus Admin
      if (username === 'admin' && password === 'admin123') {
        return NextResponse.json({ success: true, role: 'admin', nama: 'Administrator' });
      }

      // Cek data di Turso
      const checkUser = await client.execute({
        sql: "SELECT * FROM Users WHERE Username = ?",
        args: [username]
      });
      
      if (checkUser.rows.length > 0) {
        const user = checkUser.rows[0];
        if (user.Password === password) {
          return NextResponse.json({ success: true, role: user.Role, nama: user.Nama });
        }
      }
      return NextResponse.json({ success: false, message: 'Username atau password salah.' }, { status: 401 });
    }

    return NextResponse.json({ success: false, message: 'Aksi tidak valid.' }, { status: 400 });

  } catch (error: any) {
    console.error("Database API Error: ", error);
    return NextResponse.json({ success: false, message: `DETAIL ERROR: ${error.message}` }, { status: 500 });
  }
}
