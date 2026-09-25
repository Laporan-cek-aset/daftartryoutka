import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-50 to-gray-100 flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-5 rounded-full blur-[100px]"></div>
      
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg relative z-10 border border-gray-100">
        
        <div className="text-center mb-8">
           <div className="inline-block p-3 bg-green-50 rounded-2xl mb-4">
             <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={50} height={50} className="drop-shadow-sm" />
           </div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Pendaftaran Lembaga Baru</h2>
          <p className="text-sm text-gray-500 mt-2">Daftarkan Madrasah Anda untuk mengikuti Tryout TKA KKGMI Surabaya 10</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Nama Lembaga (Sesuai Data KKGMI)</label>
            <input type="text" placeholder="Contoh: MI Baiturrahman" required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#116530]/20 focus:border-[#116530] transition text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Username Administrator</label>
            <input type="text" placeholder="Buat username..." required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#116530]/20 focus:border-[#116530] transition text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Password Pengaman</label>
            <input type="password" placeholder="Minimal 8 karakter..." required className="w-full p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#116530]/20 focus:border-[#116530] transition text-sm" />
          </div>
          
          <div className="pt-2">
            <button type="submit" className="w-full bg-[#116530] text-white font-bold py-3.5 rounded-xl hover:bg-[#0b421f] transition shadow-lg shadow-green-900/20 transform hover:-translate-y-0.5">
              Daftar Sebagai Lembaga
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            Sudah memiliki akun?{' '}
            <Link href="/login" className="text-[#116530] font-bold hover:underline">
              Masuk ke sistem
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
