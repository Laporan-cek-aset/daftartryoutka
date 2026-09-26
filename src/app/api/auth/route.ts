import { NextResponse } from 'next/server';
import { getTursoClient } from '../../../lib/turso';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// Simple password hashing function (for production use bcryptjs)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + process.env.SALT_KEY || 'default-salt').digest('hex');
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, password, nama, email, phone } = body; 
    
    const client = getTursoClient();

    if (action === 'register') {
      // Validate input
      if (!nama || !username || !password || !email || !phone) {
        return NextResponse.json({ success: false, message: 'Semua field harus diisi.' }, { status: 400 });
      }

      if (username.length < 5) {
        return NextResponse.json({ success: false, message: 'Username minimal 5 karakter.' }, { status: 400 });
      }

      if (password.length < 8) {
        return NextResponse.json({ success: false, message: 'Password minimal 8 karakter.' }, { status: 400 });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ success: false, message: 'Format email tidak valid.' }, { status: 400 });
      }

      // Check if username already exists
      const checkUser = await client.execute({
        sql: "SELECT * FROM Users WHERE Username = ?",
        args: [username.toLowerCase()]
      });

      if (checkUser.rows.length > 0) {
        return NextResponse.json({ success: false, message: 'Username sudah digunakan.' }, { status: 400 });
      }

      // Check if email already exists
      const checkEmail = await client.execute({
        sql: "SELECT * FROM Users WHERE Email = ?",
        args: [email.toLowerCase()]
      });

      if (checkEmail.rows.length > 0) {
        return NextResponse.json({ success: false, message: 'Email sudah terdaftar.' }, { status: 400 });
      }

      const newUserId = `U${Date.now()}`;
      const hashedPassword = hashPassword(password);

      await client.execute({
        sql: "INSERT INTO Users (ID, Role, Username, Password, Nama, Email, Phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [newUserId, "guru", username.toLowerCase(), hashedPassword, nama, email.toLowerCase(), phone]
      });

      await client.execute({
        sql: "INSERT INTO payments (guru_id, amount, status) VALUES (?, ?, ?)",
        args: [newUserId, 0, "pending"]
      });

      return NextResponse.json({ success: true, message: 'Pendaftaran berhasil!' });
    }

    if (action === 'login') {
      // Admin hardcoded check (IMPORTANT: Change credentials in production!)
      if (username === 'admin' && password === 'admin123') {
        console.warn('⚠️ WARNING: Admin login dengan kredensial default. Ubah segera di production!');
        return NextResponse.json({ success: true, role: 'admin', nama: 'Administrator' });
      }

      if (!username || !password) {
        return NextResponse.json({ success: false, message: 'Username dan password harus diisi.' }, { status: 400 });
      }

      const checkUser = await client.execute({
        sql: "SELECT * FROM Users WHERE Username = ?",
        args: [username.toLowerCase()]
      });
      
      if (checkUser.rows.length === 0) {
        return NextResponse.json({ success: false, message: 'Username atau password salah.' }, { status: 401 });
      }

      const user = checkUser.rows[0] as any;
      
      if (verifyPassword(password, user.Password)) {
        return NextResponse.json({ success: true, role: user.Role, nama: user.Nama });
      }

      return NextResponse.json({ success: false, message: 'Username atau password salah.' }, { status: 401 });
    }

    return NextResponse.json({ success: false, message: 'Aksi tidak valid.' }, { status: 400 });

  } catch (error: any) {
    console.error("Database API Error: ", error);
    return NextResponse.json({ success: false, message: `DETAIL ERROR: ${error.message}` }, { status: 500 });
  }
}
