import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'GTNA TradeBoard',
  description: 'Mini Service Request Board for GTNA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans text-gray-900">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center gap-2">
                  {/* Placeholder GTNA Logo */}
                  <img src="/logo.png" alt="GTNA Logo" className="h-8 w-auto" />
                  <span className="font-bold text-xl text-[#E31837]">TradeBoard</span>
                </Link>
              </div>
              <div className="flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-[#E31837] font-medium transition-colors">
                  Home
                </Link>
                <Link href="/new" className="text-gray-600 hover:text-[#E31837] font-medium transition-colors">
                  Post a Job
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
