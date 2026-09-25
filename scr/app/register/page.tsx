import Link from 'next/link';

export default function Register() {
  return (
    <div className="min-h-screen bg-kkgmiLightGreen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-kkgmiGreen">
        <h2 className="text-2xl font-bold text-center text-kkgmiGreen mb-6">Daftar Akun Guru</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lembaga (Sesuai Data KKGMI)</label>
            <input type="text" required className="mt-1 w-full p-2 border rounded focus:ring-kkgmiGreen focus:border-kkgmiGreen" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" required className="mt-1 w-full p-2 border rounded focus:ring-kkgmiGreen focus:border-kkgmiGreen" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" required className="mt-1 w-full p-2 border rounded focus:ring-kkgmiGreen focus:border-kkgmiGreen" />
          </div>
          <button type="submit" className="w-full bg-kkgmiGreen text-white font-bold py-2 rounded hover:bg-green-800 transition">
            Daftar Sekarang
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Sudah punya akun? <Link href="/login" className="text-kkgmiGold font-bold">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
