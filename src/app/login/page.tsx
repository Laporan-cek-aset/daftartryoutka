import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#116530] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>

      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-white/50">
        <div className="flex flex-col items-center mb-8">
          <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={70} height={70} className="drop-shadow-md mb-4" />
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Selamat Datang Kembali</h2>
          <p className="text-sm text-gray-500 mt-1">Silakan masuk ke panel Anda</p>
        </div>

        <form className="space-y-5 w-full">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Username / NIP</label>
            <input type="text" placeholder="Masukkan username..." required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#116530]/20 focus:border-[#116530] transition text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <input type="password" placeholder="••••••••" required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#116530]/20 focus:border-[#116530] transition text-sm text-gray-700" />
          </div>
          
          <div className="flex justify-end">
            <a href="#" className="text-xs font-semibold text-[#116530] hover:text-[#0b421f]">Lupa password?</a>
          </div>

          <button type="submit" className="w-full bg-[#116530] text-white font-bold py-3.5 rounded-xl hover:bg-[#0b421f] transition shadow-lg shadow-green-900/20 transform hover:-translate-y-0.5">
            MASUK SISTEM
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Lembaga belum terdaftar?{' '}
            <Link href="/register" className="text-[#D4AF37] font-bold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
