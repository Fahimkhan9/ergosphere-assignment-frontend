'use client';
import DashboardTabs from '@/components/DashboardTabs';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/documents/')
      .then(res => res.json())
      .then(data => {
        setDocuments(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  
  if (loading) return <p className="text-center mt-10 text-gray-600">Loading documents...</p>;
  console.log(documents);
  
  return (
    <main className="max-w-4xl mx-auto p-6">
        <DashboardTabs/>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Document Library</h1>
      {documents.length === 0 ? (
        <p className="text-center text-gray-500">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map(doc => (
            <li
              key={doc.id}
              className="border border-gray-200 rounded-md p-4 hover:shadow-lg transition-shadow bg-white"
            >
              <h2 className="text-lg font-medium text-gray-900">{doc.title}</h2>
              <p className="text-sm text-gray-600">Pages: {doc.pages || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
