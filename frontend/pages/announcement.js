import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { AnnouncementIcon } from '../components/Icons';

export default function AnnouncementGenerator() {
  const [announcementType, setAnnouncementType] = useState('');
  const [details, setDetails] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await axios.post('http://localhost:5001/api/generate-announcement', { announcementType, details });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Etsy Shop Announcement Generator - Keep Customers Informed</title>
        <meta
          name="description"
          content="Create clear, professional shop announcements for your Etsy store with our free AI tool. Perfect for vacations, restocks, and updates."
        />
        <meta name="keywords" content="Etsy shop announcement, Etsy vacation mode, Etsy shop update" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#FDEEE7] rounded-full mb-4">
            <div className="text-[#F1641E]">
              <AnnouncementIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Etsy Shop Announcement Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create clear, professional announcements for your shop updates, vacation mode, restocks, and more.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <label className="block mb-2 font-semibold">Announcement Type:</label>
          <select
            value={announcementType}
            onChange={(e) => setAnnouncementType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            required
          >
            <option value="">Select type...</option>
            <option value="shop vacation">Shop Vacation</option>
            <option value="processing time update">Processing Time Update</option>
            <option value="restock announcement">Restock Announcement</option>
            <option value="shipping delay">Shipping Delay</option>
            <option value="new collection launch">New Collection Launch</option>
            <option value="holiday closure">Holiday Closure</option>
            <option value="order cutoff date">Order Cutoff Date</option>
            <option value="policy update">Policy Update</option>
            <option value="shop milestone">Shop Milestone</option>
          </select>
          
          <label className="block mb-2 font-semibold">Announcement Details:</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="3"
            placeholder="e.g., shop closed March 10-15 for family vacation, all orders placed after March 8 will ship on March 16"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-[#F1641E] text-white p-3 rounded-md hover:bg-[#e05a1c] transition font-medium"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Announcement'}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#232347]">Generated Announcement:</h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Tip: Place this announcement in your shop's announcement section and consider also adding it to your shop policies or item descriptions if relevant.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}