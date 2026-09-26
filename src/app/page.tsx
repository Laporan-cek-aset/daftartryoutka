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
        alert("Pendaftaran berhasil! Akun Anda telah tersimpan. Silakan masuk.");
        setAuthMode('login');
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke database. Pastikan internet stabil.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setView('landing');
    setActiveUser({ nama: '' });
  };

  // --- TAMPILAN DASHBOARD GURU ---
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
            <p className="text-gray-500 mt-1">Selamat datang, {activeUser.nama}. Kelola pendaftaran tryout dan akses ujian siswa Anda di sini.</p>
          </div>
        </main>
      </div>
    );
  }

  // --- TAMPILAN DASHBOARD ADMIN ---
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
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between max-w-sm">
             <div>
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lembaga Terdaftar</h3>
               <p className="text-4xl font-black text-gray-800 mt-2">Data Aktif</p>
             </div>
             <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">🏫</div>
          </div>
        </main>
      </div>
    );
  }

  // --- TAMPILAN LANDING PAGE & LOGIN ---
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      <div className="flex-1 bg-gradient-to-br from-[#116530] to-[#0b421f] text-white p-10 md:p-20 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">Tryout TKA <br /><span className="text-yellow-400">Lebih Terukur</span></h2>
          <p className="text-lg md:text-xl text-green-50 mb-12 opacity-90">Tingkatkan kesiapan akademik siswa madrasah dengan platform evaluasi yang presisi.</p>
        </div>
      </div>

      <div className="w-full md:w-[450px] lg:w-[500px] bg-white z-20 flex flex-col relative shadow-2xl">
        <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-12">
            <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo" width={45} height={45} />
            <div>
              <h1 className="text-xl font-black text-[#116530]">KKGMI</h1>
              <h1 className="text-xl font-black text-[#D4AF37]">SBY 10</h1>
            </div>
          </div>

          {errorMsg && (
             <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium">⚠️ {errorMsg}</div>
          )}

          {authMode === 'login' ? (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Selamat Datang</h2>
              <form onSubmit={handleLogin} className="space-y-5 mt-8">
                <input type="text" name="username" placeholder="Username..." required className="w-full p-4 bg-slate-50 border rounded-xl" />
                <input type="password" name="password" placeholder="Password..." required className="w-full p-4 bg-slate-50 border rounded-xl" />
                <button type="submit" disabled={loading} className="w-full bg-[#116530] text-white font-bold py-4 rounded-xl">{loading ? 'PROSES...' : 'MASUK'}</button>
              </form>
              <p className="mt-8 text-center text-sm">Belum ada akun? <button onClick={() => setAuthMode('register')} className="text-yellow-600 font-bold">Daftar</button></p>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Daftar Lembaga</h2>
              <form onSubmit={handleRegister} className="space-y-4 mt-8">
                <input type="text" name="nama" placeholder="Nama Lembaga/Sekolah" required className="w-full p-4 bg-slate-50 border rounded-xl" />
                <input type="text" name="username" placeholder="Username" required className="w-full p-4 bg-slate-50 border rounded-xl" />
                <input type="password" name="password" placeholder="Password" required className="w-full p-4 bg-slate-50 border rounded-xl" />
                <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-white font-bold py-4 rounded-xl">{loading ? 'PROSES...' : 'DAFTAR'}</button>
              </form>
              <p className="mt-8 text-center text-sm">Sudah ada akun? <button onClick={() => setAuthMode('login')} className="text-[#116530] font-bold">Masuk</button></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
