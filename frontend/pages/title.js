import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { TitleIcon } from '../components/Icons';

export default function TitleGenerator() {
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await axios.post('http://localhost:5001/api/generate-title', { productName, features });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Etsy Listing Title Generator - Catchy Titles with AI</title>
        <meta
          name="description"
          content="Create catchy, SEO-friendly Etsy listing titles with our free AI tool. Enter your product name and features for instant results!"
        />
        <meta name="keywords" content="Etsy listing title generator, AI Etsy titles, Etsy SEO listing" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#FDEEE7] rounded-full mb-4">
            <div className="text-[#F1641E]">
              <TitleIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Etsy Listing Title Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Attract more buyers with optimized listing titles. Input your product name and key features to generate concise, search-friendly titles.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <label className="block mb-2 font-semibold">Product Name:</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            placeholder="e.g., Handmade Silver Necklace"
            required
          />
          <label className="block mb-2 font-semibold">Key Features:</label>
          <textarea
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="3"
            placeholder="e.g., unique design, perfect gift"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#F1641E] text-white p-3 rounded-md hover:bg-[#e05a1c] transition font-medium"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Title'}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#232347]">Generated Title:</h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Tip: Etsy titles have a 140-character limit. Focus on including your most important keywords near the beginning.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}