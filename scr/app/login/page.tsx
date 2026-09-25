import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="min-h-screen bg-kkgmiLightGreen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md flex flex-col items-center">
        <Image src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" alt="Logo KKGMI" width={80} height={80} className="mb-4" />
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Login Sistem Tryout</h2>
        <form className="space-y-4 w-full">
          <div>
            <input type="text" placeholder="Username" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-kkgmiGreen" />
          </div>
          <div>
            <input type="password" placeholder="Password" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-kkgmiGreen" />
          </div>
          <button type="submit" className="w-full bg-kkgmiGreen text-white font-bold py-3 rounded-lg hover:bg-green-800 transition shadow-md">
            MASUK
          </button>
        </form>
      </div>
    </div>
  );
}
