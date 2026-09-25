"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function SinglePageApp() {
  // Pengaturan State untuk mengontrol tampilan tanpa pindah URL
  const [view, setView] = useState('landing'); // 'landing', 'guru', 'admin'
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register'

  // Simulasi Login (Tanpa Database Sementara)
  const handleLogin = (e: any) => {
    e.preventDefault();
    const username = e.target.username.value.toLowerCase();
    if (username === 'admin') {
      setView('admin');
    } else {
      setView('guru');
    }
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    alert("Pendaftaran simulasi berhasil! Silakan masuk dengan akun yang dibuat.");
    setAuthMode('login');
  };

  const handleLogout = () => {
    setView('landing');
  };

  // ==========================================
  // TAMPILAN DASHBOARD GURU
  // ==========================================
  if (view === 'guru') {
    const statusPembayaran = 'belum_bayar'; // Ganti ke 'lunas' untuk tes tampilan lunas
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-xl font-bold text-gray-800">Panel Guru</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:block">Selamat datang, <strong className="text-[#116530]">Nama Lembaga</strong></span>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition">Keluar</button>
            </div>
          </div>
        </header>

        <main className="p-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Akademik</h2>
            <p className="text-gray-500 mt-1">Kelola pendaftaran tryout, pembayaran, dan akses ujian siswa Anda di satu tempat.</p>
          </div>

          {statusPembayaran === 'belum_bayar' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 border-b border-red-100">
                <h3 className="text-xl font-bold text-red-700 flex items-center gap-2"><span>⚠️</span> Tagihan Pembayaran Tryout TKA</h3>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Rincian Layanan</h4>
                  <ul className="space-y-3 mb-6 text-sm">
                    <li className="flex justify-between border-b border-gray-100 pb-2"><span>Akses Simulasi CBT (4 Sesi)</span><span className="font-semibold text-gray-800">Termasuk</span></li>
                    <li className="flex justify-between border-b border-gray-100 pb-2"><span>Unduh Template & Akun Peserta</span><span className="font-semibold text-gray-800">Termasuk</span></li>
                    <li className="flex justify-between items-center mt-4 pt-2">
                      <span className="font-bold text-lg text-gray-900">Biaya per Siswa</span>
                      <span className="font-black text-2xl text-[#116530]">Rp 15.000</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Metode Pembayaran</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Transfer Bank</p>
                      <p className="text-lg font-mono font-bold text-gray-800">7123 4567 89</p>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-[#116530] text-white py-3 rounded-xl font-bold shadow-md hover:bg-[#0b421f] transition">Konfirmasi Pembayaran</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN DASHBOARD ADMIN
  // ==========================================
  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 md:min-h-screen p-6">
          <h2 className="text-xl font-black text-[#D4AF37] tracking-tight mb-8">CBT ADMIN</h2>
          <button onClick={handleLogout} className="w-full bg-red-600 text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-red-700 transition">Keluar dari Admin</button>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-8">Overview Panel Admin</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase">Total Lembaga Aktif</h3>
              <p className="text-4xl font-black text-gray-800 mt-2">42</p>
            </div>
            <div className="bg-gradient-to-br from-[#D4AF37] to-yellow-600 p-6 rounded-2xl shadow-md text-white">
              <h3 className="text-xs font-bold text-yellow-100 uppercase mb-1">Perlu Persetujuan Pembayaran</h3>
              <p className="text-5xl font-black mt-2">5</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN LANDING PAGE & AUTENTIKASI (DEFAULT)
  // ==========================================
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 overflow-hidden">
      
      {/* BAGIAN KIRI: PANEL LOGIN / REGISTER */}
      <div className="w-full md:w-[450px] lg:w-[500px] bg-white shadow-2xl z-20 flex flex-col relative">
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          
          <div className="flex items-center gap-3 mb-10">
            <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={50} height={50} />
            <h1 className="text-2xl font-black text-[#116530] tracking-tight">KKGMI SBY 10</h1>
          </div>

          {authMode === 'login' ? (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <h2 className="text-3xl font-black text-gray-800 mb-2">Masuk Panel</h2>
              <p className="text-gray-500 text-sm mb-8">Masukkan username untuk mengelola Tryout.</p>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Username (Ketik 'admin' untuk Admin)</label>
                  <input type="text" name="username" required className="w-full p-4 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#116530]/20 focus:border-[#116530] transition font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                  <input type="password" name="password" required className="w-full p-4 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#116530]/20 focus:border-[#116530] transition" />
                </div>
                <button type="submit" className="w-full bg-[#116530] text-white font-bold py-4 rounded-xl hover:bg-[#0b421f] transition shadow-lg shadow-green-900/20">MASUK SISTEM</button>
              </form>
              
              <p className="mt-8 text-sm text-gray-600">Lembaga belum terdaftar? <button onClick={() => setAuthMode('register')} className="text-[#D4AF37] font-bold hover:underline">Daftar sekarang</button></p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl font-black text-gray-800 mb-2">Pendaftaran</h2>
              <p className="text-gray-500 text-sm mb-8">Daftarkan lembaga Anda untuk mengikuti Tryout.</p>
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nama Lembaga</label>
                  <input type="text" required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#116530] transition text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Username Administrator</label>
                  <input type="text" required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#116530] transition text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                  <input type="password" required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#116530] transition text-sm" />
                </div>
                <button type="submit" className="w-full bg-[#D4AF37] text-[#116530] font-bold py-4 rounded-xl hover:bg-yellow-500 transition shadow-lg mt-2">DAFTAR LEMBAGA</button>
              </form>
              
              <p className="mt-8 text-sm text-gray-600">Sudah memiliki akun? <button onClick={() => setAuthMode('login')} className="text-[#116530] font-bold hover:underline">Masuk ke sistem</button></p>
            </div>
          )}
        </div>
      </div>

      {/* BAGIAN KANAN: KONTEN PROMOSI EKSKLUSIF */}
      <div className="flex-1 bg-gradient-to-br from-[#116530] to-[#0b421f] text-white p-10 md:p-20 flex flex-col justify-center relative">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D4AF37] opacity-10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-2xl relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-yellow-300 font-semibold text-sm mb-6 border border-white/20">
            Aplikasi CBT Resmi KKGMI
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Sukseskan Tryout TKA <span className="text-[#D4AF37]">Madrasah Anda</span>
          </h2>
          <p className="text-lg md:text-xl text-green-50 mb-10 leading-relaxed opacity-90">
            Platform Computer Based Test terintegrasi. Tingkatkan kesiapan akademik siswa dengan sistem evaluasi yang akurat, cepat, dan antarmuka yang sangat mudah dipahami oleh siswa tingkat MI.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-12 border-t border-white/20 pt-10">
            <div>
              <p className="text-3xl font-black text-[#D4AF37] mb-1">4 Sesi</p>
              <p className="text-sm text-green-100">Simulasi Tryout Lengkap</p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#D4AF37] mb-1">Cepat & Akurat</p>
              <p className="text-sm text-green-100">Hasil Analisis Presisi</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
