"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function SinglePageApp() {
  const [view, setView] = useState('landing'); 
  const [authMode, setAuthMode] = useState('login'); 
  
  const [activeUser, setActiveUser] = useState({ nama: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    const username = e.target.username.value.toLowerCase();
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setActiveUser({ nama: data.nama });
        setView(data.role === 'admin' ? 'admin' : 'guru');
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server database.');
    }
    setLoading(false);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const nama = e.target.nama.value; 
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const username = e.target.username.value.toLowerCase();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validasi password
    if (password !== confirmPassword) {
      setErrorMsg('Password dan konfirmasi password tidak cocok.');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password minimal 8 karakter.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', username, password, nama, email, phone })
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert("Pendaftaran berhasil! Akun Madrasah/Lembaga Anda telah tersimpan. Silakan masuk.");
        setAuthMode('login');
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke database. Pastikan koneksi internet stabil.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setView('landing');
    setActiveUser({ nama: '' });
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
              <span className="text-sm text-gray-500 hidden sm:block">Status Login: <strong className="text-[#116530] uppercase">{activeUser.nama}</strong></span>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition shadow-sm">Keluar</button>
            </div>
          </div>
        </header>
        <main className="p-8 max-w-5xl mx-auto">
          <div className="mb-8 border-l-4 border-[#116530] pl-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Tryout TKA</h2>
            <p className="text-gray-500 mt-1">Selamat datang, {activeUser.nama}. Kelola pendaftaran ujian siswa dan selesaikan pembayaran di panel ini.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-50 to-white px-8 py-5 border-b border-yellow-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-yellow-800 flex items-center gap-2"><span>⚠️</span> Menunggu Persetujuan Admin</h3>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wide">Pending</span>
            </div>
            <div className="p-8">
              <p className="text-gray-600 mb-6">Akun lembaga Anda sedang dalam tahap tinjauan. Silakan selesaikan kewajiban administrasi untuk membuka akses unggah data siswa.</p>
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
              <p className="text-[10px] text-gray-400 tracking-widest mt-1 uppercase">Pusat Kendali Utama</p>
            </div>
          </div>
          <div className="mt-auto">
            <button onClick={handleLogout} className="w-full bg-red-600/20 text-red-500 border border-red-500/30 px-4 py-3 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition">Keluar Sistem</button>
          </div>
        </aside>
        <main className="flex-1 p-8 md:p-12">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight mb-8">Ikhtisar Panel Admin</h1>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between max-w-sm">
             <div>
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lembaga Terdaftar</h3>
               <p className="text-4xl font-black text-[#116530] mt-2">Data Aktif</p>
             </div>
             <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-2xl">🏫</div>
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
      <div className="flex-1 bg-gradient-to-br from-[#116530] to-[#0b421f] text-white p-10 md:p-20 flex flex-col justify-center relative overflow-hidden">
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
              <span className="text-yellow-400 text-xl mt-1">✓</span>
              <div>
                <p className="font-bold text-white">4 Sesi Tryout TKA</p>
                <p className="text-sm text-green-200">Simulasi penuh sesuai format ujian nasional</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl mt-1">✓</span>
              <div>
                <p className="font-bold text-white">Analisis Hasil Mendalam</p>
                <p className="text-sm text-green-200">Laporan detail per siswa dan per lembaga</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl mt-1">✓</span>
              <div>
                <p className="font-bold text-white">Sistem Keamanan Terpercaya</p>
                <p className="text-sm text-green-200">Data terenkripsi dengan standar internasional</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
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
          <div className="mt-10 bg-white/5 border border-white/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs text-green-200 uppercase tracking-wider font-bold">Pertanyaan?</p>
            <p className="text-sm text-white mt-2">Hubungi Tim KKGMI: <span className="font-bold text-yellow-400">081234567890</span></p>
          </div>
        </div>
      </div>

      {/* SEKSI FORMULIR (KANAN) */}
      <div className="w-full md:w-[450px] lg:w-[500px] bg-white z-20 flex flex-col relative shadow-2xl">
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
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
             <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium">⚠️ {errorMsg}</div>
          )}

          {authMode === 'login' ? (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Masuk Panel</h2>
              <p className="text-gray-500 text-sm mb-8">Akses dashboard akademik lembaga Anda.</p>
              <form onSubmit={handleLogin} className="space-y-5">
                <input type="text" name="username" placeholder="Username Terdaftar..." required className="w-full p-4 bg-slate-50 border rounded-xl focus:border-[#116530] outline-none transition" />
                <input type="password" name="password" placeholder="Password..." required className="w-full p-4 bg-slate-50 border rounded-xl focus:border-[#116530] outline-none transition" />
                <button type="submit" disabled={loading} className="w-full bg-[#116530] text-white font-bold py-4 rounded-xl hover:bg-[#0b421f] transition disabled:opacity-50">{loading ? 'MEMPROSES...' : 'MASUK SISTEM'}</button>
              </form>
              <p className="mt-8 text-center text-sm text-gray-500">Lembaga belum terdaftar? <button onClick={() => {setAuthMode('register'); setErrorMsg('');}} className="text-yellow-600 font-bold hover:underline">Daftar sekarang</button></p>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500 max-h-[calc(100vh-200px)] overflow-y-auto">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Daftar Lembaga</h2>
              <p className="text-gray-500 text-sm mb-8">Lengkapi data untuk bergabung ke sistem CBT.</p>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Nama Madrasah/Lembaga</label>
                  <input type="text" name="nama" placeholder="Contoh: MI Baiturrahman" required className="w-full p-4 bg-slate-50 border rounded-xl focus:border-[#116530] outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Email Lembaga</label>
                  <input type="email" name="email" placeholder="email@lembaga.com" required className="w-full p-4 bg-slate-50 border rounded-xl focus:border-[#116530] outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Nomor Telepon</label>
                  <input type="tel" name="phone" placeholder="+62 812 3456 7890" required className="w-full p-4 bg-slate-50 border rounded-xl focus:border-[#116530] outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Username Admin</label>
                  <input type="text" name="username" placeholder="Buat username (min 5 karakter)" required minLength={5} className="w-full p-4 bg-slate-50 border rounded-xl focus:border-[#116530] outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Password (min 8 karakter)</label>
                  <input type="password" name="password" placeholder="Buat password" required minLength={8} className="w-full p-4 bg-slate-50 border rounded-xl focus:border-[#116530] outline-none transition text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Konfirmasi Password</label>
                  <input type="password" name="confirmPassword" placeholder="Ulangi password" required minLength={8} className="w-full p-4 bg-slate-50 border rounded-xl focus:border-[#116530] outline-none transition text-sm" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-[#116530] font-black py-4 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50">{loading ? 'MENYIMPAN...' : 'DAFTAR SEKARANG'}</button>
              </form>
              <p className="mt-8 text-center text-sm text-gray-500 border-t pt-6">Sudah memiliki akun? <button onClick={() => {setAuthMode('login'); setErrorMsg('');}} className="text-[#116530] font-bold hover:underline">Masuk sekarang</button></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
