import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { PromotionIcon } from '../components/Icons';

export default function PromotionGenerator() {
  const [promotionType, setPromotionType] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await axios.post('http://localhost:5001/api/generate-promotion', { promotionType, productDetails });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Etsy Promotion Text Generator - Boost Your Sales</title>
        <meta
          name="description"
          content="Generate catchy, effective promotion text for your Etsy sales, discounts, and social media posts with our free AI tool."
        />
        <meta name="keywords" content="Etsy promotion generator, Etsy sale text, Etsy marketing copy" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#FDEEE7] rounded-full mb-4">
            <div className="text-[#F1641E]">
              <PromotionIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Etsy Promotion Text Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create catchy, compelling text for your sales, discounts, and social media promotions to boost your Etsy shop visibility.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <label className="block mb-2 font-semibold">Promotion Type:</label>
          <select
            value={promotionType}
            onChange={(e) => setPromotionType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            required
          >
            <option value="">Select type...</option>
            <option value="discount sale (10% off)">Discount Sale (10% off)</option>
            <option value="discount sale (15% off)">Discount Sale (15% off)</option>
            <option value="discount sale (20% off)">Discount Sale (20% off)</option>
            <option value="discount sale (25% off)">Discount Sale (25% off)</option>
            <option value="buy one get one free">Buy One Get One Free</option>
            <option value="free shipping">Free Shipping</option>
            <option value="limited time offer">Limited Time Offer</option>
            <option value="new product launch">New Product Launch</option>
            <option value="holiday special">Holiday Special</option>
            <option value="seasonal collection">Seasonal Collection</option>
            <option value="flash sale">Flash Sale</option>
            <option value="clearance sale">Clearance Sale</option>
          </select>
          
          <label className="block mb-2 font-semibold">Product/Shop Details:</label>
          <textarea
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="3"
            placeholder="e.g., handmade candles with cozy scents, perfect for fall evenings"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-[#F1641E] text-white p-3 rounded-md hover:bg-[#e05a1c] transition font-medium"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Promotion Text'}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#232347]">Generated Promotion Text:</h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Tip: Use this text in your social media posts, shop announcements, or email newsletters to drive traffic to your shop.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}