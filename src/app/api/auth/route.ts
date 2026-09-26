import { NextResponse } from 'next/server';
import { getTursoClient } from '../../../lib/turso';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// Simple password hashing function (upgrade to bcryptjs in production)
function hashPassword(password: string): string {
  const salt = process.env.SALT_KEY || 'kkgmi-default-salt-2024';
  return crypto.createHash('sha256').update(password + salt).digest('hex');
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
      // ========================
      // VALIDASI INPUT REGISTER
      // ========================
      if (!nama || !username || !password) {
        return NextResponse.json({ 
          success: false, 
          message: 'Nama lembaga, username, dan password harus diisi.' 
        }, { status: 400 });
      }

      if (username.length < 5) {
        return NextResponse.json({ 
          success: false, 
          message: 'Username minimal 5 karakter.' 
        }, { status: 400 });
      }

      if (password.length < 8) {
        return NextResponse.json({ 
          success: false, 
          message: 'Password minimal 8 karakter.' 
        }, { status: 400 });
      }

      // Validate email format (optional but recommended)
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return NextResponse.json({ 
            success: false, 
            message: 'Format email tidak valid.' 
          }, { status: 400 });
        }
      }

      // ========================
      // CEK USERNAME & EMAIL
      // ========================
      try {
        const checkUser = await client.execute({
          sql: "SELECT Username FROM Users WHERE Username = ?",
          args: [username.toLowerCase()]
        });

        if (checkUser.rows && checkUser.rows.length > 0) {
          return NextResponse.json({ 
            success: false, 
            message: 'Username sudah digunakan. Pilih username lain.' 
          }, { status: 400 });
        }

        // Check email if provided
        if (email) {
          const checkEmail = await client.execute({
            sql: "SELECT Email FROM Users WHERE Email = ?",
            args: [email.toLowerCase()]
          });

          if (checkEmail.rows && checkEmail.rows.length > 0) {
            return NextResponse.json({ 
              success: false, 
              message: 'Email sudah terdaftar dengan akun lain.' 
            }, { status: 400 });
          }
        }
      } catch (checkError: any) {
        console.log('Info: Email/Username check (mungkin kolom belum ada):', checkError.message);
      }

      // ========================
      // INSERT USER BARU
      // ========================
      const newUserId = `U${Date.now()}`;
      const hashedPassword = hashPassword(password);
      const now = new Date().toISOString();

      try {
        await client.execute({
          sql: `INSERT INTO Users 
            (ID, Nama, Username, Password, Email, Phone, Role, Status, CreatedAt, UpdatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            newUserId, 
            nama, 
            username.toLowerCase(), 
            hashedPassword, 
            email || null, 
            phone || null,
            'guru', 
            'pending',
            now,
            now
          ]
        });
      } catch (insertError: any) {
        // Fallback: jika kolom Email, Phone, Status tidak ada, gunakan query lama
        console.log('Info: Insert dengan kolom baru gagal, menggunakan fallback...');
        await client.execute({
          sql: `INSERT INTO Users (ID, Nama, Username, Password, Role) VALUES (?, ?, ?, ?, ?)`,
          args: [newUserId, nama, username.toLowerCase(), hashedPassword, 'guru']
        });
      }

      // ========================
      // INSERT PAYMENT RECORD
      // ========================
      try {
        await client.execute({
          sql: "INSERT INTO payments (guru_id, amount, status, created_at) VALUES (?, ?, ?, ?)",
          args: [newUserId, 0, "pending", now]
        });
      } catch (paymentError: any) {
        console.error("Error creating payment record:", paymentError);
        // Jika gagal, lanjutkan karena user sudah terdaftar
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Pendaftaran berhasil! Akun Anda sedang menunggu persetujuan admin.' 
      });
    }

    // ========================
    // LOGIN ACTION
    // ========================
    if (action === 'login') {
      // Admin default credentials (CHANGE IN PRODUCTION!)
      if (username === 'admin' && password === 'admin123') {
        console.warn('⚠️ WARNING: Menggunakan admin credentials default. Ubah segera!');
        return NextResponse.json({ 
          success: true, 
          role: 'admin', 
          nama: 'Administrator System' 
        });
      }

      if (!username || !password) {
        return NextResponse.json({ 
          success: false, 
          message: 'Username dan password harus diisi.' 
        }, { status: 400 });
      }

      // Query user dari database
      const checkUser = await client.execute({
        sql: "SELECT * FROM Users WHERE Username = ?",
        args: [username.toLowerCase()]
      });
      
      if (!checkUser.rows || checkUser.rows.length === 0) {
        return NextResponse.json({ 
          success: false, 
          message: 'Username atau password salah.' 
        }, { status: 401 });
      }

      const user = checkUser.rows[0] as any;
      
      // Verify password
      if (!verifyPassword(password, user.Password)) {
        return NextResponse.json({ 
          success: false, 
          message: 'Username atau password salah.' 
        }, { status: 401 });
      }

      // Check status (optional - uncomment jika ingin strict approval)
      // if (user.Status && user.Status !== 'active') {
      //   return NextResponse.json({ 
      //     success: false, 
      //     message: `Akun Anda masih dalam status ${user.Status}. Tunggu persetujuan admin.` 
      //   }, { status: 403 });
      // }

      return NextResponse.json({ 
        success: true, 
        role: user.Role || 'guru', 
        nama: user.Nama || 'User' 
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Aksi tidak valid.' 
    }, { status: 400 });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: `Terjadi kesalahan: ${error.message}` 
    }, { status: 500 });
  }
}
