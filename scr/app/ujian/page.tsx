import Image from 'next/image';
import Link from 'next/link';

export default function UjianCBT() {
  return (
    <div className="min-h-screen bg-[#1F7A46] flex flex-col items-center justify-center p-4">
      
      {/* Header Text */}
      <div className="w-full max-w-6xl text-white mb-6 px-4">
        <h1 className="text-xl font-semibold">Selamat datang di Aplikasi Computer Based Test (CBT) resmi</h1>
        <h2 className="text-lg">Kelompok Kerja Guru Madrasah Ibtidaiyah (KKGMI) Kota Surabaya 10.</h2>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        
        {/* Kiri: Info dan Jadwal */}
        <div className="md:col-span-2 space-y-4">
          
          {/* Card Aturan */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-[#1F7A46] font-bold text-lg mb-3 flex items-center">
              <span className="mr-2">📋</span> Aturan & Cara Mengerjakan
            </h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>Pastikan koneksi internet Anda stabil sebelum mulai ujian.</li>
              <li>Sistem akan otomatis beralih ke mode <strong>Layar Penuh (Fullscreen)</strong>.</li>
              <li><span className="text-red-500 font-bold">DILARANG</span> membuka tab baru, aplikasi lain, atau membagi layar (Split Screen). Pelanggaran maksimal 3 kali akan membuat jawaban otomatis terkirim.</li>
              <li>Tombol <strong>Selesai Ujian</strong> hanya akan muncul di soal nomor terakhir. Gunakan tombol <strong className="text-yellow-600">Ragu-ragu</strong> jika ingin menandai soal yang belum yakin.</li>
            </ul>
          </div>

          {/* Card Jadwal */}
          <div className="bg-[#E8F5E9] rounded-xl p-6 shadow-md border border-green-200">
            <h3 className="text-[#1F7A46] font-bold text-lg mb-4 flex items-center">
              <span className="mr-2">📅</span> Jadwal Pelaksanaan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-blue-600">Tryout 1</h4>
                <p className="text-xs text-gray-500 mb-2">14 - 17 Des 2026</p>
                <p className="text-sm font-semibold text-green-700">{'>'} Gelombang 1:</p>
                <p className="text-sm mb-1">14 - 15 Desember 2026</p>
                <p className="text-sm font-semibold text-green-700">{'>'} Gelombang 2:</p>
                <p className="text-sm">16 - 17 Desember 2026</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-bold text-blue-600">Tryout 2</h4>
                <p className="text-xs text-gray-500 mb-2">25 - 28 Jan 2027</p>
                <p className="text-sm font-semibold text-green-700">{'>'} Gelombang 1:</p>
                <p className="text-sm mb-1">25 - 26 Januari 2027</p>
                <p className="text-sm font-semibold text-green-700">{'>'} Gelombang 2:</p>
                <p className="text-sm">27 - 28 Januari 2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kanan: Form Login CBT */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center">
            <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={80} height={80} className="mb-4" />
            <h2 className="text-xl font-black text-[#1F7A46] tracking-wider mb-6">MASUK UJIAN</h2>
            
            <form className="w-full space-y-4">
              <input type="text" placeholder="Username" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F7A46]" />
              <div className="relative">
                <input type="password" placeholder="Password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F7A46]" />
                <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">👁️</span>
              </div>
              <input type="date" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F7A46] text-gray-500" />
              
              <button type="button" className="w-full bg-[#1F7A46] text-white font-bold py-3 rounded-lg hover:bg-green-800 transition shadow-md mt-4">
                MASUK SEKARANG
              </button>
            </form>
            
            <div className="mt-8 text-center text-xs text-gray-400">
              <p>© 2026 KKGMI SURABAYA 10</p>
              <p>@support by Belajar Inovasi</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
