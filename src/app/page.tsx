"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function SinglePageApp() {
  const [view, setView] = useState('landing'); 
  const [authMode, setAuthMode] = useState('login'); 
  
  const [activeUser, setActiveUser] = useState({ nama: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    const username = e.target.username.value.trim().toLowerCase();
    const password = e.target.password.value;

    if (!username || !password) {
      setErrorMsg('Username dan password tidak boleh kosong.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSuccessMsg(`Selamat datang, ${data.nama}!`);
        setTimeout(() => {
          setActiveUser({ nama: data.nama });
          setView(data.role === 'admin' ? 'admin' : 'guru');
        }, 500);
      } else {
        setErrorMsg(data.message || 'Login gagal');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server. Periksa koneksi internet Anda.');
    }
    setLoading(false);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const nama = e.target.nama.value.trim(); 
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const username = e.target.username.value.trim().toLowerCase();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validasi input
    if (!nama || !username || !password) {
      setErrorMsg('Nama lembaga, username, dan password harus diisi.');
      setLoading(false);
      return;
    }

    if (username.length < 5) {
      setErrorMsg('Username minimal 5 karakter.');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password minimal 8 karakter.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Password dan konfirmasi password tidak cocok.');
      setLoading(false);
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMsg('Format email tidak valid.');
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'register', 
          username, 
          password, 
          nama, 
          email: email || null, 
          phone: phone || null 
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSuccessMsg('✅ Pendaftaran berhasil! Akun Anda sedang menunggu persetujuan admin. Silakan login untuk melanjutkan.');
        setTimeout(() => {
          setAuthMode('login');
          setSuccessMsg('');
        }, 2000);
      } else {
        setErrorMsg(data.message || 'Pendaftaran gagal');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke database. Pastikan koneksi internet stabil.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setView('landing');
    setActiveUser({ nama: '' });
    setErrorMsg('');
    setSuccessMsg('');
  };

  // ==========================================
  // PANEL GURU (LEMBAGA)
  // ==========================================
  if (view === 'guru') {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={32} height={32} />
              <h1 className="text-xl font-bold text-gray-800">Panel Lembaga</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:block">Login sebagai: <strong className="text-[#116530] uppercase">{activeUser.nama}</strong></span>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition shadow-sm">Keluar</button>
            </div>
          </div>
        </header>
        <main className="p-8 max-w-5xl mx-auto">
          <div className="mb-8 border-l-4 border-[#116530] pl-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Tryout TKA</h2>
            <p className="text-gray-500 mt-1">Selamat datang, <strong>{activeUser.nama}</strong>. Kelola pendaftaran ujian siswa dan lihat progress pembelajaran.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl font-black text-[#116530] mb-2">0</div>
              <p className="text-gray-600 text-sm">Siswa Terdaftar</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl font-black text-yellow-500 mb-2">0</div>
              <p className="text-gray-600 text-sm">Ujian Selesai</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl font-black text-blue-500 mb-2">0</div>
              <p className="text-gray-600 text-sm">Rata-rata Skor</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-50 to-white px-8 py-5 border-b border-yellow-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-yellow-800 flex items-center gap-2"><span>⏳</span> Status Akun Lembaga</h3>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wide">Pending Approval</span>
            </div>
            <div className="p-8">
              <p className="text-gray-600 mb-4">Akun lembaga Anda sedang dalam tahap review oleh admin KKGMI. Anda akan mendapat notifikasi ketika akun disetujui.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                💡 <strong>Tips:</strong> Persiapkan data siswa Anda dalam format Excel dengan kolom: Nama, NISN, Kelas, Jenis Kelamin
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // PANEL ADMIN
  // ==========================================
  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 md:min-h-screen p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={40} height={40} className="drop-shadow-md" />
            <div>
              <h2 className="text-lg font-black text-[#D4AF37] tracking-tight leading-none">CBT ADMIN</h2>
              <p className="text-[10px] text-gray-400 tracking-widest mt-1 uppercase">Panel Kontrol</p>
            </div>
          </div>
          <nav className="space-y-2 flex-1">
            <div className="px-4 py-3 bg-[#116530]/20 rounded-lg text-white font-bold text-sm">📊 Dashboard</div>
            <div className="px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg text-sm cursor-pointer">👥 Kelola Lembaga</div>
            <div className="px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg text-sm cursor-pointer">📋 Lihat Hasil Ujian</div>
            <div className="px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg text-sm cursor-pointer">⚙️ Pengaturan</div>
          </nav>
          <div className="border-t border-gray-700 pt-4">
            <button onClick={handleLogout} className="w-full bg-red-600/20 text-red-500 border border-red-500/30 px-4 py-3 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition">
              🚪 Keluar Sistem
            </button>
          </div>
        </aside>
        <main className="flex-1 p-8 md:p-12">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight mb-8">📈 Dashboard Admin</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-[#116530] mb-2">0</div>
              <p className="text-gray-600 text-sm">Total Lembaga</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-yellow-500 mb-2">0</div>
              <p className="text-gray-600 text-sm">Menunggu Approval</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-green-500 mb-2">0</div>
              <p className="text-gray-600 text-sm">Aktif</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-blue-500 mb-2">0</div>
              <p className="text-gray-600 text-sm">Total Peserta</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📋 Daftar Permintaan Lembaga Baru</h2>
            <div className="text-center py-8 text-gray-500">
              <p>Belum ada permintaan pendaftaran lembaga baru</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // LANDING PAGE & AUTENTIKASI
  // ==========================================
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      
      {/* SEKSI INFORMASI (KIRI) */}
      <div className="flex-1 bg-gradient-to-br from-[#116530] to-[#0b421f] text-white p-10 md:p-20 flex flex-col justify-center relative overflow-hidden max-h-screen md:max-h-auto overflow-y-auto md:overflow-y-auto">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37] opacity-10 rounded-full blur-[120px]"></div>
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-yellow-300 font-semibold text-sm mb-8 border border-white/20 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            Aplikasi CBT Resmi KKGMI Surabaya 10
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            Tryout TKA <br />
            <span className="text-yellow-400">Terpadu & Presisi</span>
          </h2>
          
          <p className="text-lg text-green-50 mb-8 opacity-90 leading-relaxed">
            Platform Computer Based Test (CBT) yang dirancang khusus untuk meningkatkan kesiapan akademik siswa Madrasah Ibtidaiyah. Dilengkapi dengan simulasi soal berkualitas tinggi, sistem penilaian otomatis, dan analisis performa real-time.
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl mt-1 flex-shrink-0">✓</span>
              <div>
                <p className="font-bold text-white">4 Sesi Tryout TKA</p>
                <p className="text-sm text-green-200">Simulasi penuh sesuai format ujian nasional</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl mt-1 flex-shrink-0">✓</span>
              <div>
                <p className="font-bold text-white">Analisis Hasil Mendalam</p>
                <p className="text-sm text-green-200">Laporan detail per siswa dan per lembaga</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl mt-1 flex-shrink-0">✓</span>
              <div>
                <p className="font-bold text-white">Sistem Keamanan Terpercaya</p>
                <p className="text-sm text-green-200">Data terenkripsi dengan standar internasional</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8 mb-8">
            <div>
              <p className="text-2xl font-bold text-white mb-1">Cepat & Akurat</p>
              <p className="text-sm text-green-200">Sistem responsif tanpa hambatan</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">Data Terpusat</p>
              <p className="text-sm text-green-200">Manajemen lembaga & siswa mudah</p>
            </div>
          </div>

          {/* Info Kontak */}
          <div className="bg-white/5 border border-white/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs text-green-200 uppercase tracking-wider font-bold">📞 Pertanyaan?</p>
            <p className="text-sm text-white mt-2">Hubungi Tim KKGMI: <span className="font-bold text-yellow-400">081234567890</span></p>
            <p className="text-sm text-white mt-1">Email: <span className="font-bold text-yellow-400">tryout@kkgmi.org</span></p>
          </div>
        </div>
      </div>

      {/* SEKSI FORMULIR (KANAN) */}
      <div className="w-full md:w-[450px] lg:w-[500px] bg-white z-20 flex flex-col relative shadow-2xl max-h-screen overflow-y-auto md:max-h-none md:overflow-y-auto">
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-center py-10 md:py-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
               <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={45} height={45} className="drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#116530] leading-none">KKGMI</h1>
              <h1 className="text-xl font-black text-[#D4AF37]">SBY 10</h1>
            </div>
          </div>

          {errorMsg && (
             <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium animate-pulse">
               ⚠️ {errorMsg}
             </div>
          )}

          {successMsg && (
             <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl font-medium">
               {successMsg}
             </div>
          )}

          {authMode === 'login' ? (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Masuk Panel</h2>
              <p className="text-gray-500 text-sm mb-8">Akses dashboard akademik lembaga Anda.</p>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Username</label>
                  <input type="text" name="username" placeholder="Masukkan username Anda..." required className="w-full p-4 bg-slate-50 border border-gray-300 rounded-xl focus:border-[#116530] focus:ring-2 focus:ring-[#116530]/20 outline-none transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-2 block">Password</label>
                  <input type="password" name="password" placeholder="Masukkan password..." required className="w-full p-4 bg-slate-50 border border-gray-300 rounded-xl focus:border-[#116530] focus:ring-2 focus:ring-[#116530]/20 outline-none transition" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#116530] text-white font-bold py-4 rounded-xl hover:bg-[#0b421f] transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? '⏳ MEMPROSES...' : '🔐 MASUK SISTEM'}
                </button>
              </form>
              <p className="mt-8 text-center text-sm text-gray-500">Lembaga belum terdaftar? <button onClick={() => {setAuthMode('register'); setErrorMsg(''); setSuccessMsg('');}} className="text-yellow-600 font-bold hover:text-yellow-700">Daftar sekarang</button></p>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Daftar Lembaga</h2>
              <p className="text-gray-500 text-sm mb-8">Lengkapi data untuk bergabung ke sistem CBT.</p>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Nama Madrasah/Lembaga *</label>
                  <input type="text" name="nama" placeholder="Contoh: MI Baiturrahman" required className="w-full p-3 bg-slate-50 border border-gray-300 rounded-xl focus:border-[#116530] focus:ring-2 focus:ring-[#116530]/20 outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Email Lembaga</label>
                  <input type="email" name="email" placeholder="email@lembaga.com" className="w-full p-3 bg-slate-50 border border-gray-300 rounded-xl focus:border-[#116530] focus:ring-2 focus:ring-[#116530]/20 outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Nomor Telepon</label>
                  <input type="tel" name="phone" placeholder="+62 812 3456 7890" className="w-full p-3 bg-slate-50 border border-gray-300 rounded-xl focus:border-[#116530] focus:ring-2 focus:ring-[#116530]/20 outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Username Admin * (min 5 karakter)</label>
                  <input type="text" name="username" placeholder="Buat username unik" required minLength={5} className="w-full p-3 bg-slate-50 border border-gray-300 rounded-xl focus:border-[#116530] focus:ring-2 focus:ring-[#116530]/20 outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Password * (min 8 karakter)</label>
                  <input type="password" name="password" placeholder="Buat password yang kuat" required minLength={8} className="w-full p-3 bg-slate-50 border border-gray-300 rounded-xl focus:border-[#116530] focus:ring-2 focus:ring-[#116530]/20 outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Konfirmasi Password *</label>
                  <input type="password" name="confirmPassword" placeholder="Ulangi password Anda" required minLength={8} className="w-full p-3 bg-slate-50 border border-gray-300 rounded-xl focus:border-[#116530] focus:ring-2 focus:ring-[#116530]/20 outline-none transition text-sm" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-[#116530] font-black py-4 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6">
                  {loading ? '⏳ MENYIMPAN...' : '✍️ DAFTAR SEKARANG'}
                </button>
              </form>
              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                <p className="font-bold mb-1">ℹ️ Syarat & Ketentuan:</p>
                <p>✓ Akun Anda akan direview oleh admin KKGMI</p>
                <p>✓ Verifikasi email akan dilakukan dalam 24 jam</p>
                <p>✓ Anda akan menerima notifikasi approval melalui email</p>
              </div>
              <p className="mt-6 text-center text-sm text-gray-500 border-t pt-4">Sudah memiliki akun? <button onClick={() => {setAuthMode('login'); setErrorMsg(''); setSuccessMsg('');}} className="text-[#116530] font-bold hover:text-[#0b421f]">Masuk sekarang</button></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
