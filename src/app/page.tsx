"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function SinglePageApp() {
  const [view, setView] = useState('landing'); // 'landing', 'guru', 'admin'
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register'
  
  // State untuk menyimpan data user yang sedang login & status loading
  const [activeUser, setActiveUser] = useState({ nama: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fungsi Login ke Turso
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

  // Fungsi Register ke Turso
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const nama = e.target.nama.value;
    const username = e.target.username.value.toLowerCase();
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', username, password, nama })
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert("Pendaftaran berhasil! Akun Anda telah tersimpan di database. Silakan masuk.");
        setAuthMode('login');
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke database. Pastikan koneksi Turso stabil.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setView('landing');
    setActiveUser({ nama: '' });
  };

  // ==========================================
  // TAMPILAN DASHBOARD GURU
  // ==========================================
  if (view === 'guru') {
    const statusPembayaran = 'belum_bayar'; 
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={32} height={32} />
              <h1 className="text-xl font-bold text-gray-800">Panel Guru</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:block">Lembaga: <strong className="text-[#116530] uppercase">{activeUser.nama}</strong></span>
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition shadow-sm">Keluar</button>
            </div>
          </div>
        </header>

        <main className="p-8 max-w-5xl mx-auto">
          <div className="mb-8 border-l-4 border-[#116530] pl-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Akademik</h2>
            <p className="text-gray-500 mt-1">Kelola pendaftaran tryout, pembayaran, dan akses ujian siswa Anda di satu tempat.</p>
          </div>

          {statusPembayaran === 'belum_bayar' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-white px-8 py-5 border-b border-red-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-red-700 flex items-center gap-2"><span>⚠️</span> Menunggu Pembayaran</h3>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wide">Unpaid</span>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-md font-bold text-gray-500 uppercase tracking-wider mb-4">Rincian Layanan</h4>
                  <ul className="space-y-4 mb-6 text-sm">
                    <li className="flex justify-between border-b border-gray-100 pb-2 text-gray-700">
                      <span className="flex items-center gap-2"><span>💻</span> Akses Simulasi CBT (4 Sesi)</span>
                      <span className="font-semibold text-gray-800">Termasuk</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2 text-gray-700">
                      <span className="flex items-center gap-2"><span>📊</span> Unduh Template & Akun Peserta</span>
                      <span className="font-semibold text-gray-800">Termasuk</span>
                    </li>
                    <li className="flex justify-between items-center mt-6 pt-4 border-t-2 border-gray-100">
                      <span className="font-bold text-lg text-gray-900">Investasi per Siswa</span>
                      <span className="font-black text-3xl text-[#116530]">Rp 15.000</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
                  <h4 className="text-md font-bold text-gray-500 uppercase tracking-wider mb-4">Metode Pembayaran</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#116530]"></div>
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Transfer Bank BSI</p>
                      <p className="text-2xl font-mono font-black text-gray-800 tracking-wider">7123 4567 89</p>
                      <p className="text-xs text-gray-500 mt-1">a.n. Panitia Tryout KKGMI SBY 10</p>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-[#116530] text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-[#0b421f] transition transform hover:-translate-y-0.5">
                    Konfirmasi Pembayaran
                  </button>
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
        <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 md:min-h-screen p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={40} height={40} className="drop-shadow-md" />
            <div>
              <h2 className="text-lg font-black text-[#D4AF37] tracking-tight leading-none">CBT ADMIN</h2>
              <p className="text-[10px] text-gray-400 tracking-widest mt-1 uppercase">Pusat Kendali</p>
            </div>
          </div>
          <div className="mt-auto">
            <button onClick={handleLogout} className="w-full bg-red-600/20 text-red-500 border border-red-500/30 px-4 py-3 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition shadow-sm">
              Keluar Sistem
            </button>
          </div>
        </aside>
        <main className="flex-1 p-8 md:p-12">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight mb-8">Overview Panel Admin</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Lembaga Aktif</h3>
                <p className="text-4xl font-black text-gray-800 mt-2">42</p>
              </div>
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">🏫</div>
            </div>
            <div className="bg-gradient-to-br from-[#D4AF37] to-yellow-600 p-6 rounded-3xl shadow-lg text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-20 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <h3 className="text-xs font-bold text-yellow-100 uppercase tracking-wider mb-1">Perlu Persetujuan</h3>
                <p className="text-5xl font-black mt-1">5</p>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center text-2xl relative z-10">💳</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN LANDING PAGE & AUTENTIKASI
  // ==========================================
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      
      {/* BAGIAN KIRI: KONTEN PROMOSI EKSKLUSIF */}
      <div className="flex-1 bg-gradient-to-br from-[#116530] to-[#0b421f] text-white p-10 md:p-20 flex flex-col justify-center relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37] opacity-10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-yellow-300 font-semibold text-sm mb-8 border border-white/20 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            Sistem CBT Resmi KKGMI Surabaya 10
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
            Tryout TKA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">
              Lebih Terukur
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-green-50/90 mb-12 leading-relaxed max-w-xl font-light">
            Tingkatkan kesiapan akademik siswa madrasah dengan platform evaluasi yang presisi, cepat, dan didesain khusus agar mudah dipahami oleh siswa tingkat MI.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
            <div className="group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300 border border-white/10">💻</div>
              <p className="text-2xl font-bold text-white mb-1">4 Sesi Ujian</p>
              <p className="text-sm text-green-200">Simulasi Tryout Lengkap</p>
            </div>
            <div className="group">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300 border border-yellow-500/30">📊</div>
              <p className="text-2xl font-bold text-white mb-1">Real-time</p>
              <p className="text-sm text-green-200">Analisis Hasil Presisi</p>
            </div>
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN: PANEL LOGIN / REGISTER */}
      <div className="w-full md:w-[450px] lg:w-[500px] bg-white z-20 flex flex-col relative shadow-[-20px_0_40px_rgba(0,0,0,0.1)]">
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
          
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={45} height={45} className="drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#116530] tracking-tight leading-none">KKGMI</h1>
              <h1 className="text-xl font-black text-[#D4AF37] tracking-tight">SBY 10</h1>
            </div>
          </div>

          {/* Menampilkan pesan error jika ada */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl font-medium flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <p className="mt-0.5">{errorMsg}</p>
            </div>
          )}

          {authMode === 'login' ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Selamat Datang</h2>
              <p className="text-gray-500 text-sm mb-8">Masuk ke panel untuk mengelola Tryout Madrasah Anda.</p>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Username</label>
                  <input type="text" name="username" required placeholder="Masukkan username..." className="w-full p-4 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition font-medium text-gray-800" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2 ml-1 pr-1">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                  </div>
                  <input type="password" name="password" required placeholder="••••••••" className="w-full p-4 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition text-gray-800" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#116530] text-white font-bold py-4 rounded-2xl hover:bg-[#0b421f] transition shadow-xl shadow-green-900/20 disabled:opacity-70 transform hover:-translate-y-0.5 mt-2">
                  {loading ? 'MEMPROSES...' : 'MASUK SISTEM'}
                </button>
              </form>
              
              <p className="mt-10 text-sm text-gray-500 text-center">
                Belum mendaftarkan lembaga? <br/>
                <button onClick={() => {setAuthMode('register'); setErrorMsg('');}} className="text-[#D4AF37] font-bold hover:underline mt-1">Daftar Akun Baru</button>
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Daftar Lembaga</h2>
              <p className="text-gray-500 text-sm mb-8">Buat akun untuk bergabung ke sistem Tryout KKGMI.</p>
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Nama Lembaga / Sekolah</label>
                  <input type="text" name="nama" required placeholder="Sesuai Data KKGMI..." className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition text-sm text-gray-800 font-medium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Username Admin</label>
                  <input type="text" name="username" required placeholder="Buat username login..." className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition text-sm text-gray-800 font-medium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                  <input type="password" name="password" required placeholder="Buat password aman..." className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition text-sm text-gray-800" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-[#116530] font-black py-4 rounded-2xl hover:bg-yellow-400 transition shadow-xl shadow-yellow-500/20 mt-4 disabled:opacity-70 transform hover:-translate-y-0.5">
                  {loading ? 'MENYIMPAN DATA...' : 'BUAT AKUN SEKARANG'}
                </button>
              </form>
              
              <p className="mt-10 text-sm text-gray-500 text-center border-t border-gray-100 pt-6">
                Sudah memiliki akun? <button onClick={() => {setAuthMode('login'); setErrorMsg('');}} className="text-[#116530] font-bold hover:underline ml-1">Masuk di sini</button>
              </p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
