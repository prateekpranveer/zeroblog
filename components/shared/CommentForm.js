"use client";
import { useState } from 'react';

export default function CommentForm({ postId, onSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [status, setStatus] = useState('idle'); 
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/createComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, postId }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', comment: '' });
        if (onSuccess) onSuccess();  // Close the form after success (optional)
      } else {
        const result = await res.json();
        setError(result.message || 'Submission failed');
        setStatus('error');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setStatus('error');
    }
  };

  return (
    <div className='bg-red-50 p-6'>
        <h1>Write a Comment</h1>
    <form onSubmit={handleSubmit} className="space-y-2 mt-4 text-xs">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-500 rounded-sm"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-500 rounded-sm"
      />
      <textarea
        name="comment"
        placeholder="Your Comment"
        value={formData.comment}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-500 rounded-sm"
      ></textarea>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded hover:bg-black transition"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Comment'}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {status === 'success' && (
        <p className="text-green-700 text-sm">Thanks! Your comment is awaiting approval.</p>
      )}
    </form>
    </div>
  );
}
