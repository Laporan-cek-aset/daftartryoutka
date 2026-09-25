import Link from 'next/link';

export default function DashboardGuru() {
  // Ganti value ini menjadi 'menunggu_admin' atau 'lunas' untuk melihat perubahan desain
  const statusPembayaran: string = 'belum_bayar'; 

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar Panel */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800">Panel Guru</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Selamat datang, <strong className="text-[#116530]">Nama Lembaga</strong></span>
            <div className="w-10 h-10 bg-[#116530] text-white rounded-full flex items-center justify-center font-bold shadow-sm">G</div>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Akademik</h2>
          <p className="text-gray-500 mt-1">Kelola pendaftaran tryout, pembayaran, dan akses ujian siswa Anda di satu tempat.</p>
        </div>

        {/* STATE: Belum Bayar (Menampilkan Invoice & Harga) */}
        {statusPembayaran === 'belum_bayar' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 border-b border-red-100">
              <h3 className="text-xl font-bold text-red-700 flex items-center gap-2">
                <span>⚠️</span> Tagihan Pembayaran Tryout TKA
              </h3>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Kolom Kiri: Rincian Biaya */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4">Rincian Layanan</h4>
                <ul className="space-y-3 mb-6 text-sm">
                  <li className="flex justify-between items-center text-gray-600 border-b border-gray-100 pb-2">
                    <span>Akses Simulasi CBT (4 Kali Sesi)</span>
                    <span className="font-semibold text-gray-800">Termasuk</span>
                  </li>
                  <li className="flex justify-between items-center text-gray-600 border-b border-gray-100 pb-2">
                    <span>Unduh Template & Akun Peserta</span>
                    <span className="font-semibold text-gray-800">Termasuk</span>
                  </li>
                  <li className="flex justify-between items-center text-gray-900 mt-4 pt-2">
                    <span className="font-bold text-lg">Investasi per Siswa</span>
                    <span className="font-black text-2xl text-[#116530]">Rp 15.000</span>
                  </li>
                </ul>
                <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm border border-yellow-200 leading-relaxed">
                  <strong>Instruksi:</strong> Silakan hitung total biaya (Rp 15.000 x jumlah siswa yang didaftarkan) dan transfer ke salah satu rekening di samping untuk membuka akses ke sistem.
                </div>
              </div>
              
              {/* Kolom Kanan: Metode Pembayaran */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Metode Pembayaran</h4>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Transfer Bank (BSI)</p>
                    <p className="text-lg font-mono font-bold text-gray-800">7123 4567 89</p>
                    <p className="text-xs text-gray-500">a.n. Panitia Tryout KKGMI SBY 10</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">ShopeePay</p>
                    <p className="text-lg font-mono font-bold text-gray-800">0812 3456 7890</p>
                    <p className="text-xs text-gray-500">a.n. Pak Wanto (Panitia)</p>
                  </div>
                </div>
                <button className="w-full mt-6 bg-[#116530] text-white py-3 rounded-xl font-bold shadow-md hover:bg-[#0b421f] transition">
                  Konfirmasi Pembayaran
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STATE: Menunggu Admin */}
        {statusPembayaran === 'menunggu_admin' && (
          <div className="bg-white rounded-2xl shadow-sm border border-yellow-200 p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">⏳</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Sedang Diverifikasi</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">Bukti pembayaran Anda telah kami terima dan sedang dalam proses pengecekan. Akses menu manajemen siswa akan otomatis terbuka setelah admin menyetujui.</p>
            <button className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition text-sm">Butuh bantuan? Hubungi Panitia</button>
          </div>
        )}

        {/* STATE: Lunas & Aktif */}
        {statusPembayaran === 'lunas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#116530]"></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pusat Data Peserta</h3>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">Unduh template Excel resmi, isi kelengkapan data siswa yang didaftarkan, lalu unggah kembali ke sistem kami.</p>
              
              <div className="space-y-4">
                <a href="/Template_Upload_Peserta_Siswa.xlsx" download className="flex items-center justify-center gap-3 w-full bg-slate-50 border border-gray-200 text-gray-700 px-4 py-3.5 rounded-xl hover:bg-slate-100 transition font-semibold text-sm">
                  <span className="text-lg">⬇️</span> 1. Unduh Template Excel
                </a>
                <Link href="/dashboard/guru/upload">
                  <button className="flex items-center justify-center gap-3 w-full bg-[#116530] text-white px-4 py-3.5 rounded-xl hover:bg-[#0b421f] transition font-semibold shadow-md text-sm">
                    <span className="text-lg">⬆️</span> 2. Upload Data Siswa
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#116530] to-[#0b421f] p-8 rounded-2xl shadow-md text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#D4AF37] opacity-20 rounded-full blur-3xl"></div>
              
              <h3 className="text-2xl font-bold mb-3 relative z-10">Ruang Ujian CBT</h3>
              <p className="text-green-100 mb-8 text-sm max-w-sm relative z-10 leading-relaxed">Akses ruang ujian simulasi dan pantau secara langsung aktivitas peserta didik selama Tryout berlangsung.</p>
              <Link href="/ujian" className="relative z-10 w-full md:w-auto">
                <button className="w-full bg-[#D4AF37] text-[#116530] px-10 py-4 rounded-xl font-bold hover:bg-yellow-400 shadow-xl hover:shadow-yellow-500/30 transition transform hover:-translate-y-1">
                  Masuk CBT Sekarang
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
