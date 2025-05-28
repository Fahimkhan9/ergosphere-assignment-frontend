'use client';
import DashboardTabs from '@/components/DashboardTabs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
    const router=useRouter()
  async function handleUpload(e) {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/api/documents/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        setMessage(`Upload failed: ${error.error || res.statusText}`);
      } else {
        const data = await res.json();
        setMessage(`Upload successful! Document ID: ${data.document_id}`);
        setFile(null);
        router.push('/dashboard')
      }
    } catch (err) {
      setMessage('Upload error: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <main className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10">
        <DashboardTabs/>
      <h1 className="text-2xl font-semibold mb-5 text-gray-800">Upload Document</h1>
      <form onSubmit={handleUpload} className="space-y-5">
        <input
          type="file"
          accept=".txt"
          onChange={e => setFile(e.target.files[0])}
          className="block w-full text-gray-700 border border-gray-300 rounded-md p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.startsWith('Upload successful')
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </main>
  );
}
