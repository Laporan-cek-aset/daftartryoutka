import { NextResponse } from 'next/server';
import { db, tursoClient } from '../../../lib/turso';
import { Users } from '../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, nama } = body; 

    if (action === 'register') {
      const existingUser = await db.select().from(Users).where(eq(Users.Username, username));
      if (existingUser.length > 0) {
        return NextResponse.json({ success: false, message: 'Username sudah digunakan.' }, { status: 400 });
      }

      const newUserId = `U${Date.now()}`;

      // Simpan data pakai SQL murni (Tahan banting di Vercel)
      await tursoClient.execute({
        sql: "INSERT INTO Users (ID, Role, Username, Password, Nama) VALUES (?, ?, ?, ?, ?)",
        args: [newUserId, "guru", username, password, nama]
      });

      await tursoClient.execute({
        sql: "INSERT INTO payments (guru_id, amount, status) VALUES (?, ?, ?)",
        args: [newUserId, 0, "pending"]
      });

      return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    }

    if (action === 'login') {
      if (username === 'admin' && password === 'admin123') {
        return NextResponse.json({ success: true, role: 'admin', nama: 'Administrator' });
      }

      const user = await db.select().from(Users).where(eq(Users.Username, username));
      
      if (user.length > 0 && user[0].Password === password) {
        return NextResponse.json({ success: true, role: user[0].Role, nama: user[0].Nama });
      } else {
        return NextResponse.json({ success: false, message: 'Username atau password salah.' }, { status: 401 });
      }
    }

    return NextResponse.json({ success: false, message: 'Aksi tidak valid.' }, { status: 400 });
  } catch (error: any) {
    console.error("Database Error: ", error);
    return NextResponse.json({ success: false, message: `DETAIL ERROR: ${error.message}` }, { status: 500 });
  }
}
