import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'GTNA TradeBoard',
  description: 'Mini Service Request Board for GTNA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans text-gray-900">
        <Navbar />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
