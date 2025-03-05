import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { DescriptionIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import CharacterCounter from '../components/CharacterCounter';

export default function DescriptionGenerator() {
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
      // Add timestamp to prevent caching when regenerating
      const timestamp = new Date().getTime();
      const response = await axios.post('http://localhost:5001/api/generate-description', {
        productName,
        description,
        timestamp
      });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Etsy Product Description Generator - Sell More with AI</title>
        <meta
          name="description"
          content="Generate compelling Etsy product descriptions with our free AI tool. Input your product details and get optimized descriptions fast!"
        />
        <meta name="keywords" content="Etsy product description generator, AI product description, Etsy listing tool" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#FDEEE7] rounded-full mb-4">
            <div className="text-[#F1641E]">
              <DescriptionIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Etsy Product Description Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Craft engaging product descriptions that sell. Enter your product name and details to get a professional, SEO-friendly description in seconds.
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
          <label className="block mb-2 font-semibold">Description (materials, features, etc.):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="3"
            placeholder="e.g., Made from high-quality silver, unique design"
            required
          />
          <CharacterCounter text={description} limit={500} className="mb-4" />
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
              'Generate Description'
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
              <h2 className="text-xl font-semibold text-[#232347]">Generated Description:</h2>
              <CopyButton text={result} />
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
              <CharacterCounter text={result} limit={1000} className="mt-2" />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Tip: A good product description highlights benefits, not just features. Edit as needed to match your brand voice.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}