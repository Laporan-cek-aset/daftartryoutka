import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#E8F5E9] text-gray-800 font-sans">
      <header className="bg-[#116530] text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={50} height={50} />
          <h1 className="text-xl font-bold text-[#D4AF37]">KKGMI SURABAYA 10</h1>
        </div>
        <nav>
          <Link href="/login" className="bg-[#D4AF37] text-[#116530] px-4 py-2 rounded font-bold hover:bg-yellow-500 transition">Login</Link>
        </nav>
      </header>

      <main className="container mx-auto mt-10 p-5 text-center">
        <h2 className="text-4xl font-extrabold text-[#116530] mb-4">TRYOUT TKA KKGMI SURABAYA 10</h2>
        <p className="text-lg mb-8">Persiapan Tes Kemampuan Akademik (TKA)! Sukses Mandiri Berprestasi!</p>
        
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto border-t-4 border-[#D4AF37]">
          <h3 className="text-2xl font-bold text-[#116530] mb-2">Biaya Pendaftaran</h3>
          <p className="text-3xl font-extrabold text-[#D4AF37] mb-4">Rp 15.000 <span className="text-sm text-gray-500">/ Siswa</span></p>
          <p className="mb-6">Mendapatkan fasilitas 4 kali Tryout. Pembayaran dapat dilakukan melalui Transfer Bank atau ShopeePay.</p>
          
          <Link href="/register">
            <button className="bg-[#116530] text-white px-8 py-3 rounded-full text-xl font-bold hover:bg-green-800 shadow-md transition">
              DAFTAR AKUN GURU SEKARANG
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
