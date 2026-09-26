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

    const nama = e.target.sekolah.value; 
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

  if (view === 'guru') {
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
        </main>
      </div>
    );
  }

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
            <button onClick={handleLogout} className="w-full bg-red-600/20 text-red-500 border border-red-500/30 px-4 py-3 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition shadow-sm">Keluar Sistem</button>
          </div>
        </aside>
        <main className="flex-1 p-8 md:p-12">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight mb-8">Overview Panel Admin</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      <div className="flex-1 bg-gradient-to-br from-[#116530] to-[#0b421f] text-white p-10 md:p-20 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37] opacity-10 rounded-full blur-[120px]"></div>
        <div className="max-w-2xl relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">Tryout TKA <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Lebih Terukur</span></h2>
          <p className="text-lg md:text-xl text-green-50/90 mb-12 leading-relaxed max-w-xl font-light">Tingkatkan kesiapan akademik siswa madrasah dengan platform evaluasi yang presisi, cepat, dan antarmuka mudah dipahami oleh siswa tingkat MI.</p>
        </div>
      </div>

      <div className="w-full md:w-[450px] lg:w-[500px] bg-white z-20 flex flex-col relative shadow-[-20px_0_40px_rgba(0,0,0,0.1)]">
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm"><Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={45} height={45} className="drop-shadow-sm" /></div>
            <div>
              <h1 className="text-xl font-black text-[#116530] tracking-tight leading-none">KKGMI</h1>
              <h1 className="text-xl font-black text-[#D4AF37] tracking-tight">SBY 10</h1>
            </div>
          </div>

          {errorMsg && (
             <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl font-medium flex items-start gap-3"><span className="text-lg">⚠️</span><p className="mt-0.5">{errorMsg}</p></div>
          )}

          {authMode === 'login' ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Selamat Datang</h2>
              <p className="text-gray-500 text-sm mb-8">Masuk ke panel untuk mengelola Tryout Madrasah Anda.</p>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div><label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Username</label><input type="text" name="username" required className="w-full p-4 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition font-medium text-gray-800" /></div>
                <div><label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label><input type="password" name="password" required className="w-full p-4 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition text-gray-800" /></div>
                <button type="submit" disabled={loading} className="w-full bg-[#116530] text-white font-bold py-4 rounded-2xl hover:bg-[#0b421f] transition shadow-xl shadow-green-900/20 disabled:opacity-70 transform hover:-translate-y-0.5 mt-2">{loading ? 'MEMPROSES...' : 'MASUK SISTEM'}</button>
              </form>
              <p className="mt-10 text-sm text-gray-500 text-center">Belum mendaftarkan lembaga? <br/><button onClick={() => {setAuthMode('register'); setErrorMsg('');}} className="text-[#D4AF37] font-bold hover:underline mt-1">Daftar Akun Baru</button></p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Daftar Lembaga</h2>
              <p className="text-gray-500 text-sm mb-8">Buat akun untuk bergabung ke sistem Tryout KKGMI.</p>
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div><label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Nama Lembaga / Sekolah</label><input type="text" name="sekolah" required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition text-sm text-gray-800 font-medium" /></div>
                <div><label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Username Admin</label><input type="text" name="username" required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition text-sm text-gray-800 font-medium" /></div>
                <div><label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label><input type="password" name="password" required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#116530]/10 focus:border-[#116530] transition text-sm text-gray-800" /></div>
                <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-[#116530] font-black py-4 rounded-2xl hover:bg-yellow-400 transition shadow-xl shadow-yellow-500/20 mt-4 disabled:opacity-70 transform hover:-translate-y-0.5">{loading ? 'MENYIMPAN DATA...' : 'BUAT AKUN SEKARANG'}</button>
              </form>
              <p className="mt-10 text-sm text-gray-500 text-center border-t border-gray-100 pt-6">Sudah memiliki akun? <button onClick={() => {setAuthMode('login'); setErrorMsg('');}} className="text-[#116530] font-bold hover:underline ml-1">Masuk di sini</button></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
