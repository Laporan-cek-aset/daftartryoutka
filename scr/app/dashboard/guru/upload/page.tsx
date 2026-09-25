export default function UploadPeserta() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border-t-4 border-kkgmiGreen">
        <h1 className="text-2xl font-bold text-kkgmiGreen mb-4">Upload Data Siswa</h1>
        <p className="mb-6 text-gray-600">Pastikan Anda telah mengisi file <strong className="text-gray-800">Template_Upload_Peserta (2).xlsx</strong> dengan benar sebelum mengunggahnya ke sistem.</p>
        
        <form className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
            <input type="file" accept=".xlsx, .xls" className="mx-auto block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
          </div>
          <button type="submit" className="w-full bg-kkgmiGreen text-white font-bold py-3 rounded hover:bg-green-800">
            Unggah Data
          </button>
        </form>

        <div className="mt-8 p-4 bg-yellow-50 rounded text-sm text-yellow-800 border border-yellow-200">
          <strong>Butuh Bantuan?</strong> Jika terjadi masalah saat mengunggah template, silakan hubungi panitia melalui WhatsApp.
        </div>
      </div>
    </div>
  );
}
