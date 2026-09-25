import Link from 'next/link';

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigasi */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 md:min-h-screen hidden md:block">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-black text-[#D4AF37] tracking-tight">CBT ADMIN</h2>
          <p className="text-xs text-gray-400 mt-1">KKGMI Surabaya 10</p>
        </div>
        <nav className="mt-6 flex flex-col gap-1 px-3">
          <Link href="/dashboard/admin" className="flex items-center gap-3 px-4 py-3 bg-[#116530] rounded-lg text-white font-medium shadow-md">
            <span>📊</span> Ringkasan
          </Link>
          <Link href="/dashboard/admin/konfirmasi" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition font-medium">
            <span>💳</span> Persetujuan
          </Link>
          <Link href="/dashboard/admin/peserta" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition font-medium">
            <span>👥</span> Basis Data Peserta
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Header Admin */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Overview Panel</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">Super Admin</p>
              <p className="text-xs text-gray-500">Panitia Pusat</p>
            </div>
            <div className="w-10 h-10 bg-[#116530] text-white rounded-full flex items-center justify-center font-bold">SA</div>
          </div>
        </header>

        <div className="p-8">
          {/* Kartu Analitik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full z-0"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Lembaga</h3>
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-100">Aktif</span>
                </div>
                <p className="text-4xl font-black text-gray-800">42</p>
                <p className="text-xs text-gray-400 mt-2 font-medium">+3 pendaftar minggu ini</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full z-0"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Peserta</h3>
                  <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-bold border border-green-100">Siswa</span>
                </div>
                <p className="text-4xl font-black text-gray-800">1,250</p>
                <p className="text-xs text-gray-400 mt-2 font-medium">Tersinkronisasi dengan database</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#D4AF37] to-yellow-600 p-6 rounded-2xl shadow-md text-white relative overflow-hidden flex flex-col justify-between">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-white opacity-10 rounded-tl-full"></div>
              <div className="relative z-10 mb-4">
                <h3 className="text-xs font-bold text-yellow-100 uppercase tracking-wider mb-1">Perlu Persetujuan</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black text-white">5</p>
                  <p className="text-sm font-medium text-yellow-100">Menunggu</p>
                </div>
              </div>
              <Link href="/dashboard/admin/konfirmasi" className="relative z-10">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white text-sm px-4 py-2.5 rounded-xl font-bold transition w-full shadow-sm">
                  Tinjau Pembayaran &rarr;
                </button>
              </Link>
            </div>

          </div>

          {/* Area Data Tambahan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-gray-800">Aktivitas Terbaru</h3>
            </div>
            <div className="p-10 text-center flex flex-col items-center justify-center text-gray-400">
              <span className="text-4xl mb-3">📭</span>
              <p className="text-sm">Log sistem dan antrean lembaga akan dimuat di tabel ini.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
