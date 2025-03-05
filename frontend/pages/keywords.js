import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { KeywordsIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import CharacterCounter from '../components/CharacterCounter';

export default function KeywordsGenerator() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await axios.post('http://localhost:5001/api/generate-keywords', { productName, description });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Etsy Product Keywords Generator - Optimize Your Listings</title>
        <meta
          name="description"
          content="Boost your Etsy listings with our free AI keywords generator. Enter product details to get search-optimized keywords instantly!"
        />
        <meta name="keywords" content="Etsy keywords generator, AI Etsy keywords, Etsy SEO tool" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#FDEEE7] rounded-full mb-4">
            <div className="text-[#F1641E]">
              <KeywordsIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Etsy Product Keywords Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Improve your Etsy search rankings with targeted keywords. Provide your product name and description to generate a list of SEO-friendly keywords.
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
          <label className="block mb-2 font-semibold">Brief Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="3"
            placeholder="e.g., Handmade silver necklace with unique design"
            required
          />
          <CharacterCounter text={description} limit={300} className="mb-4" />
          <button
            type="submit"
            className="w-full bg-[#F1641E] text-white p-3 rounded-md hover:bg-[#e05a1c] transition font-medium flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" color="#ffffff" />
                <span className="ml-2">Generating...</span>
              </>
            ) : (
              'Generate Keywords'
            )}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#232347]">Generated Keywords:</h2>
              <CopyButton text={result} />
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Tip: Use these keywords in your title, tags, and description to improve your listing's visibility in search results.</p>
              <p className="mt-1">Etsy allows up to 13 tags per listing, each with a 20-character limit.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}