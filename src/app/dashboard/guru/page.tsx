 // Catatan: Ini adalah mockup tampilan. Logika sesungguhnya memerlukan fetching data (SWR/React Query/Server Components)
import Link from 'next/link';

export default function DashboardGuru() {
  // Simulasi status dari database: 'belum_bayar', 'menunggu_admin', 'lunas'
  const statusPembayaran: string = 'lunas';
 
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-kkgmiGreen mb-6">Dashboard Guru</h1>
      
      {statusPembayaran === 'belum_bayar' && (
        <div className="bg-white p-6 rounded shadow-md border-l-4 border-red-500">
          <h2 className="text-xl font-bold mb-2">Selesaikan Pembayaran</h2>
          <p>Silakan transfer biaya pendaftaran (Rp 15.000 / siswa) ke Bank XYZ atau ShopeePay.</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Konfirmasi Pembayaran</button>
        </div>
      )}

      {statusPembayaran === 'menunggu_admin' && (
        <div className="bg-white p-6 rounded shadow-md border-l-4 border-yellow-500">
          <h2 className="text-xl font-bold mb-2">Menunggu Persetujuan Admin</h2>
          <p>Pembayaran Anda sedang dicek oleh admin. Mohon tunggu beberapa saat.</p>
          <p className="text-sm text-gray-500 mt-2">Jika ada masalah, hubungi panitia.</p>
        </div>
      )}

      {statusPembayaran === 'lunas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow-md border-l-4 border-kkgmiGreen">
            <h2 className="text-xl font-bold mb-4 text-kkgmiGreen">Manajemen Peserta</h2>
            <p className="mb-4">Akses Anda telah dibuka. Silakan unduh template Excel dan upload data siswa.</p>
            <div className="flex gap-4">
              <a href="/Template_Upload_Peserta_Siswa.xlsx" download className="bg-kkgmiGold text-white px-4 py-2 rounded hover:bg-yellow-600">
                1. Unduh Template
              </a>
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
                2. Upload Siswa
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">*Gunakan format Template_Upload_Peserta (2).xlsx</p>
          </div>
          
          <div className="bg-white p-6 rounded shadow-md flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold mb-2">Masuk ke Ruang Ujian</h2>
            <p className="text-sm text-center mb-4">Guru dapat memantau atau masuk ke simulasi CBT dari tombol di bawah ini.</p>
            <Link href="/ujian">
              <button className="bg-kkgmiGreen text-white px-8 py-3 rounded-lg font-bold hover:bg-green-800 shadow-md">
                MASUK KE RUANG UJIAN
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
