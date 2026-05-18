'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Failed to ${isLogin ? 'login' : 'register'}`);
      }

      if (isLogin) {
        // Save token and username to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        
        // Redirect to Home
        router.push('/');
        // Simple reload to ensure Navbar updates
        setTimeout(() => window.location.reload(), 100);
      } else {
        // After successful registration, switch to login tab
        setIsLogin(true);
        setError('Registration successful! Please log in.');
        // Set error state as a success message styled differently, or just use alert.
        // For simplicity, we'll keep it in error state but style can be updated.
        // Actually let's do a simple alert or just set a success message.
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <img className="mx-auto h-12 w-auto" src="/logo.png" alt="GTNA Logo" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">GTNA TradeBoard</h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Sign in to manage your job requests' : 'Create an account to post jobs'}
          </p>
        </div>

        {error && (
          <div className={`mb-6 p-4 rounded-md border ${error.includes('successful') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-[#E31837] border-red-200'}`}>
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E31837] hover:bg-red-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm font-medium text-gray-600 hover:text-[#E31837] transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
