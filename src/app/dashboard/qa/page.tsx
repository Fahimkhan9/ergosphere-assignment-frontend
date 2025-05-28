'use client';
import DashboardTabs from '@/components/DashboardTabs';
import { useState, useEffect } from 'react';

export default function QA() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/documents/')
      .then(res => res.json())
      .then(data => setDocuments(data))
      .catch(console.error);
  }, []);

  async function askQuestion(e) {
    e.preventDefault();
    if (!selectedDocId || !question.trim()) {
      setAnswer('Please select a document and enter a question.');
      return;
    }

    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('http://localhost:8000/api/documents/ask/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_id: selectedDocId,
          question,
          top_k: 3,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        setAnswer(`Error: ${error.error || res.statusText}`);
      } else {
        const data = await res.json();
        setAnswer(data.answer);
      }
    } catch (err) {
      setAnswer('Error: ' + err.message);
    }

    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
        <DashboardTabs/>
      <h1 className="text-2xl font-semibold mb-5 text-gray-800">Ask a Question</h1>
      <form onSubmit={askQuestion} className="space-y-5">
        <select
          value={selectedDocId}
          onChange={e => setSelectedDocId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Document</option>
          {documents.length>0 && documents.map(doc => (
            <option key={doc.id} value={doc.id}>
              {doc.title}
            </option>
          ))}
        </select>

        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          rows={4}
          placeholder="Enter your question"
          className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>

      {answer && (
        <section className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-50 whitespace-pre-wrap text-gray-900">
          <h2 className="font-semibold mb-2">Answer:</h2>
          <p>{answer}</p>
        </section>
      )}
    </main>
  );
}
