import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { ShopBioIcon } from '../components/Icons';

export default function ShopBioGenerator() {
  const [shopFocus, setShopFocus] = useState('');
  const [ownerDetails, setOwnerDetails] = useState('');
  const [uniqueSellingPoint, setUniqueSellingPoint] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await axios.post('http://localhost:5001/api/generate-shop-bio', { 
        shopFocus, 
        ownerDetails, 
        uniqueSellingPoint 
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
        <title>Etsy Shop Bio Generator - Create a Compelling Shop Story</title>
        <meta
          name="description"
          content="Create a compelling Etsy shop bio that attracts customers and builds your brand identity with our free AI tool."
        />
        <meta name="keywords" content="Etsy shop bio generator, Etsy shop description, Etsy about section" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#FDEEE7] rounded-full mb-4">
            <div className="text-[#F1641E]">
              <ShopBioIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Etsy Shop Bio Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create a compelling shop bio that tells your story, connects with customers, and builds your brand identity.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <label className="block mb-2 font-semibold">Shop Focus:</label>
          <input
            value={shopFocus}
            onChange={(e) => setShopFocus(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            placeholder="e.g., handmade silver jewelry, vintage clothing, digital art prints"
            required
          />
          
          <label className="block mb-2 font-semibold">Owner Details:</label>
          <textarea
            value={ownerDetails}
            onChange={(e) => setOwnerDetails(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="2"
            placeholder="e.g., Jane, jewelry maker with 5 years experience, inspired by nature"
            required
          />
          
          <label className="block mb-2 font-semibold">Unique Selling Point:</label>
          <textarea
            value={uniqueSellingPoint}
            onChange={(e) => setUniqueSellingPoint(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="2"
            placeholder="e.g., sustainable materials, one-of-a-kind designs, family recipes passed down generations"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-[#F1641E] text-white p-3 rounded-md hover:bg-[#e05a1c] transition font-medium"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Shop Bio'}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#232347]">Generated Shop Bio:</h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Tip: Etsy allows up to 5,000 characters for your shop bio. Edit this text to add more personal details that make your shop unique.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}