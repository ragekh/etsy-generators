import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PromotionIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import CharacterCounter from '../components/CharacterCounter';
import SEO from '../components/SEO';

export default function PromotionGenerator() {
  const [promotionType, setPromotionType] = useState('');
  const [productDetails, setProductDetails] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-promotion', {
        promotionType,
        productDetails,
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
  const promotionSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Etsy Promotion Text Generator',
    'url': 'https://etsy-ai-generators.com/promotion',
    'description': 'Generate catchy, effective promotion text for your Etsy sales, discounts, and social media posts with our free AI tool.',
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
        title="Etsy Promotion Text Generator - Boost Your Sales"
        description="Generate catchy, effective promotion text for your Etsy sales, discounts, and social media posts with our free AI tool."
        keywords="Etsy promotion generator, Etsy sale text, Etsy marketing copy"
        schema={promotionSchema}
      />
      
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
          <CharacterCounter text={productDetails} limit={300} className="mb-4" />
          
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
              'Generate Promotion Text'
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
                  {loading && regenerating ? 'Regenerating Promotion Text...' : 'Generated Promotion Text:'}
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
                <CharacterCounter text={loading && regenerating ? previousResult : result} limit={200} className="mt-2" />
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Tip: Use this text in your social media posts, shop announcements, or email newsletters to drive traffic to your shop.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#F1641E] hover:text-[#e05a1c] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate more promotion text
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