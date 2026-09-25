import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tryout TKA KKGMI Surabaya 10',
  description: 'Aplikasi Tryout Tes Kemampuan Akademik (TKA) KKGMI Kota Surabaya 10',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
