import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { CustomerResponseIcon } from '../components/Icons';

export default function CustomerResponseGenerator() {
  const [inquiryType, setInquiryType] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-customer-response', { inquiryType, details });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Etsy Customer Response Generator - Professional Replies</title>
        <meta
          name="description"
          content="Generate professional, friendly responses to Etsy customer inquiries and reviews with our free AI tool."
        />
        <meta name="keywords" content="Etsy customer response, Etsy message template, reply to Etsy reviews" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#FDEEE7] rounded-full mb-4">
            <div className="text-[#F1641E]">
              <CustomerResponseIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Etsy Customer Response Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Craft polite, professional responses to customer inquiries or reviews. Save time while maintaining a personal touch.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <label className="block mb-2 font-semibold">Inquiry/Review Type:</label>
          <select
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            required
          >
            <option value="">Select type...</option>
            <option value="shipping delay question">Shipping Delay Question</option>
            <option value="product customization inquiry">Product Customization Inquiry</option>
            <option value="positive review">Positive Review</option>
            <option value="neutral review">Neutral Review</option>
            <option value="negative review">Negative Review</option>
            <option value="return request">Return Request</option>
            <option value="order status inquiry">Order Status Inquiry</option>
            <option value="product question">Product Question</option>
          </select>
          
          <label className="block mb-2 font-semibold">Key Details:</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="3"
            placeholder="e.g., Order #12345 delayed by 3 days, customer is concerned about gift deadline"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-[#F1641E] text-white p-3 rounded-md hover:bg-[#e05a1c] transition font-medium"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Response'}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#232347]">Generated Response:</h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Tip: Personalize this response further by adding specific details about your shop or products.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}