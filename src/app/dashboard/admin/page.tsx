import Link from 'next/link';

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin KKGMI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-md border-t-4 border-yellow-500">
          <h2 className="text-xl font-bold text-gray-700">Konfirmasi Pembayaran</h2>
          <p className="text-4xl font-black text-yellow-600 my-4">5</p>
          <Link href="/dashboard/admin/konfirmasi" className="text-blue-600 hover:underline">Lihat daftar antrean &rarr;</Link>
        </div>
        
        <div className="bg-white p-6 rounded shadow-md border-t-4 border-kkgmiGreen">
          <h2 className="text-xl font-bold text-gray-700">Total Lembaga Aktif</h2>
          <p className="text-4xl font-black text-kkgmiGreen my-4">42</p>
        </div>

        <div className="bg-white p-6 rounded shadow-md border-t-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-700">Total Peserta (Siswa)</h2>
          <p className="text-4xl font-black text-blue-600 my-4">1.250</p>
        </div>
      </div>
    </div>
  );
}
