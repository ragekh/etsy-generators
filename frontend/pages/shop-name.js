import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { ShopNameIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ShopNameGenerator() {
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await axios.post('http://localhost:5001/api/generate-shop-name', { keywords });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Etsy Shop Name Generator - Unique Names for Your Store</title>
        <meta
          name="description"
          content="Create unique and catchy Etsy shop names with our free AI generator. Enter keywords to get personalized shop name ideas instantly!"
        />
        <meta name="keywords" content="Etsy shop name generator, unique Etsy store names, AI shop name tool" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#FDEEE7] rounded-full mb-4">
            <div className="text-[#F1641E]">
              <ShopNameIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Etsy Shop Name Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Need a standout name for your Etsy shop? Enter keywords or a brief description of your shop focus to generate creative, memorable names tailored to your brand.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <label className="block mb-2 font-semibold">Enter keywords or shop focus:</label>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="3"
            placeholder="e.g., handmade jewelry, unique designs"
            required
          />
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
              'Generate Shop Names'
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
              <h2 className="text-xl font-semibold text-[#232347]">Generated Shop Names:</h2>
              <CopyButton text={result} />
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Tip: Choose a name that's memorable, easy to spell, and reflects your brand identity.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}