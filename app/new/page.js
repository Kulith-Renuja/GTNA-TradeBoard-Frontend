'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    contactName: '',
    contactEmail: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic Client-Side Validation
    if (!formData.title || !formData.description || !formData.contactEmail) {
      setError('Title, Description, and Contact Email are required.');
      return;
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create job request');
      }

      router.push('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job Request</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-[#E31837] border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            placeholder="e.g. Fix leaking pipe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            placeholder="Describe the issue in detail"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            >
              <option value="">Select a category</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Painting">Painting</option>
              <option value="Joinery">Joinery</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
              placeholder="e.g. 123 Main St"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
              placeholder="e.g. john@example.com"
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E31837] hover:bg-red-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Job Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
