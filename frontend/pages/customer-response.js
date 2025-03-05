import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { CustomerResponseIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import CharacterCounter from '../components/CharacterCounter';
import SEO from '../components/SEO';

export default function CustomerResponseGenerator() {
  const [inquiryType, setInquiryType] = useState('');
  const [details, setDetails] = useState('');
  const [result, setResult] = useState('');
  const [previousResult, setPreviousResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [regenerating, setRegenerating] = useState(false);
  const resultRef = useRef(null);

  // Scroll to results when they're generated
  useEffect(() => {
    if (result && resultRef.current) {
      // Scroll to results with smooth animation
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [result]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Prevent multiple submissions
    if (loading) return;
    
    setLoading(true);
    setError('');
    
    // If we already have results, we're regenerating
    if (result) {
      setRegenerating(true);
      setPreviousResult(result);
    } else {
      setResult('');
    }
    
    try {
      // Add timestamp to prevent caching when regenerating
      const timestamp = new Date().getTime();
      const response = await axios.post('http://localhost:5001/api/generate-customer-response', {
        inquiryType,
        details,
        timestamp
      });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      // If error occurs during regeneration, keep the previous result
      if (regenerating) {
        setResult(previousResult);
      }
    }
    
    setLoading(false);
    setRegenerating(false);
  };

  // Schema for this specific page
  const responseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Etsy Customer Response Generator',
    'url': 'https://etsy-ai-generators.com/customer-response',
    'description': 'Generate professional, friendly responses to Etsy customer inquiries and reviews with our free AI tool.',
    'applicationCategory': 'BusinessApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web'
  };

  return (
    <>
      <SEO
        title="Etsy Customer Response Generator - Professional Replies"
        description="Generate professional, friendly responses to Etsy customer inquiries and reviews with our free AI tool."
        keywords="Etsy customer response, Etsy message template, reply to Etsy reviews"
        schema={responseSchema}
      />
      
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
          <CharacterCounter text={details} limit={300} className="mb-4" />
          
          <button
            type="submit"
            className="w-full bg-[#F1641E] text-white p-3 rounded-md hover:bg-[#e05a1c] transition font-medium flex justify-center items-center"
            disabled={loading}
          >
            {loading && !regenerating ? (
              <>
                <LoadingSpinner size="sm" color="#ffffff" />
                <span className="ml-2">Generating...</span>
              </>
            ) : (
              'Generate Response'
            )}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {/* Results Section */}
        <div ref={resultRef}>
          {(result || (loading && regenerating)) && (
            <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300 ${loading && regenerating ? 'opacity-60' : 'opacity-100'} ${!previousResult && loading ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#232347]">
                  {loading && regenerating ? 'Regenerating Response...' : 'Generated Response:'}
                </h2>
                {!loading && <CopyButton text={result} />}
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 relative">
                {loading && regenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                    <LoadingSpinner size="lg" color="#F1641E" />
                  </div>
                )}
                <pre className="whitespace-pre-wrap text-gray-800">{loading && regenerating ? previousResult : result}</pre>
                <CharacterCounter text={loading && regenerating ? previousResult : result} limit={500} className="mt-2" />
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Tip: Personalize this response further by adding specific details about your shop or products.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#F1641E] hover:text-[#e05a1c] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate another response
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}