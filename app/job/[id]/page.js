'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch job details');
      }
      const data = await res.json();
      setJob(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) {
        throw new Error('Failed to update status');
      }
      
      const updatedJob = await res.json();
      setJob(updatedJob);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job request?')) {
      return;
    }
    
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete job request');
      }
      
      router.push('/');
    } catch (err) {
      alert(err.message);
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading job details...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!job) return <div className="text-center py-10">Job not found.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-[#E31837] hover:underline flex items-center gap-1">
          &larr; Back to all jobs
        </Link>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-gray-500 text-sm">
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <label className="text-sm font-medium text-gray-600">Status:</label>
            <select
              value={job.status}
              onChange={handleStatusChange}
              disabled={isUpdating}
              className={`border-gray-300 rounded-md shadow-sm p-2 text-sm font-medium border focus:ring-[#E31837] focus:border-[#E31837] ${
                job.status === 'Open' ? 'text-green-700 bg-green-50' :
                job.status === 'In Progress' ? 'text-blue-700 bg-blue-50' :
                'text-gray-700 bg-gray-50'
              }`}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Details</h2>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-medium text-gray-500 w-24 inline-block">Category:</span> {job.category || 'N/A'}</li>
              <li><span className="font-medium text-gray-500 w-24 inline-block">Location:</span> {job.location || 'N/A'}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h2>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-medium text-gray-500 w-24 inline-block">Name:</span> {job.contactName || 'N/A'}</li>
              <li><span className="font-medium text-gray-500 w-24 inline-block">Email:</span> <a href={`mailto:${job.contactEmail}`} className="text-[#E31837] hover:underline">{job.contactEmail}</a></li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2 border border-[#E31837] text-[#E31837] hover:bg-red-50 font-medium rounded-md transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
