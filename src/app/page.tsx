import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans selection:bg-[#D4AF37] selection:text-white">
      {/* Navbar Minimalis */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={45} height={45} className="drop-shadow-sm" />
            <h1 className="text-xl font-bold text-[#116530] tracking-tight">KKGMI SURABAYA 10</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 font-medium hover:text-[#116530] transition">Masuk</Link>
            <Link href="/register" className="bg-[#116530] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#0b421f] transition shadow-lg shadow-green-900/20">Daftar Lembaga</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section Elegan */}
        <section className="relative bg-gradient-to-b from-[#116530] to-[#0b421f] text-white overflow-hidden py-24">
          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Sukseskan Tryout TKA <span className="text-[#D4AF37]">Madrasah Anda</span>
            </h2>
            <p className="text-lg md:text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Platform Computer Based Test (CBT) terintegrasi resmi dari KKGMI Kota Surabaya 10. Tingkatkan kesiapan akademik siswa dengan sistem evaluasi yang akurat, cepat, dan profesional.
            </p>
            <div className="flex justify-center">
              <Link href="/register">
                <button className="bg-[#D4AF37] text-[#116530] px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition shadow-xl hover:scale-105 transform duration-300">
                  Mulai Daftarkan Sekolah Sekarang
                </button>
              </Link>
            </div>
          </div>
          {/* Ornamen Latar Belakang */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute top-10 -right-24 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
        </section>

        {/* Fitur Utama */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-[#116530]">Keunggulan Sistem Kami</h3>
              <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 group">
                <div className="w-14 h-14 bg-green-50 text-green-700 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">💻</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Sistem CBT Modern</h4>
                <p className="text-gray-500 leading-relaxed text-sm">Ujian berbasis komputer dengan antarmuka yang ramah pengguna, didesain khusus agar mudah dipahami oleh siswa tingkat MI.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 group">
                <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">📊</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Analisis Presisi</h4>
                <p className="text-gray-500 leading-relaxed text-sm">Dapatkan hasil yang cepat dan akurat untuk memetakan kemampuan akademik (TKA) siswa sebelum ujian sesungguhnya.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">⚙️</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Manajemen Praktis</h4>
                <p className="text-gray-500 leading-relaxed text-sm">Guru dapat dengan mudah mengelola data peserta melalui sistem upload template cerdas tanpa kerumitan administrasi manual.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; 2026 KKGMI Surabaya 10. All rights reserved.</p>
      </footer>
    </div>
  );
}
