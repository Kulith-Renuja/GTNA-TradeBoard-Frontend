'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Check localStorage on mount
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="GTNA Logo" className="h-8 w-auto" />
              <span className="font-bold text-xl text-[#E31837]">TradeBoard</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-[#E31837] font-medium transition-colors">
              Home
            </Link>
            <Link href="/new" className="text-gray-600 hover:text-[#E31837] font-medium transition-colors">
              Post a Job
            </Link>
            
            {username ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Hello, {username}</span>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 hover:text-[#E31837] transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="text-[#E31837] font-medium border border-[#E31837] hover:bg-red-50 px-4 py-1.5 rounded transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
