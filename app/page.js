'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debounce the live search to avoid spamming the backend
    const debounceTimer = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [category, search]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Force clean URL generation using native URL parsing
      const url = new URL('http://localhost:5000/api/jobs');
      
      if (category) url.searchParams.append('category', category);
      if (search) url.searchParams.append('search', search.trim());

      console.log("Fetching from API URL:", url.toString()); // For easy debugging in terminal

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store' // Prevents Next.js from caching empty search results
      });

      if (!res.ok) throw new Error('Failed to fetch jobs');
      
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Job Requests</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="category" className="text-gray-600 font-medium whitespace-nowrap">Filter by:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            >
              <option value="">All Categories</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Painting">Painting</option>
              <option value="Joinery">Joinery</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white shadow-sm rounded-lg border border-gray-200">
          No job requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">{job.title}</h2>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-800' :
                    job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                  }`}>
                  {job.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{job.description}</p>

              <div className="mb-4 text-sm text-gray-500 space-y-1">
                <p><span className="font-medium text-gray-700">Category:</span> {job.category || 'N/A'}</p>
                <p><span className="font-medium text-gray-700">Location:</span> {job.location || 'N/A'}</p>
              </div>

              <Link
                href={`/job/${job._id}`}
                className="mt-auto block text-center w-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium py-2 rounded transition-colors duration-200"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
