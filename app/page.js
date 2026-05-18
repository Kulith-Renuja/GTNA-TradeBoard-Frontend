'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [category]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const url = category 
        ? `http://localhost:5000/api/jobs?category=${category}` 
        : 'http://localhost:5000/api/jobs';
      const res = await fetch(url);
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Requests</h1>
        
        <div className="flex items-center gap-3">
          <label htmlFor="category" className="text-gray-600 font-medium">Filter by:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-gray-300 bg-white text-gray-900 rounded-md shadow-sm p-2 border focus:border-[#E31837] focus:ring-[#E31837]"
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>
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
            <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">{job.title}</h2>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  job.status === 'Open' ? 'bg-green-100 text-green-800' :
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
                className="mt-auto block text-center w-full bg-gray-50 hover:bg-gray-100 text-[#E31837] font-medium py-2 rounded border border-gray-200 transition-colors"
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
