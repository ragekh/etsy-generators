import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ShopBioIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SEO from '../components/SEO';

export default function ShopBioGenerator() {
  const [shopFocus, setShopFocus] = useState('');
  const [ownerDetails, setOwnerDetails] = useState('');
  const [uniqueSellingPoint, setUniqueSellingPoint] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-shop-bio', { 
        shopFocus, 
        ownerDetails, 
        uniqueSellingPoint,
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
  const shopBioSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Etsy Shop Bio Generator',
    'url': 'https://etsy-ai-generators.com/shop-bio',
    'description': 'Create a compelling Etsy shop bio that attracts customers and builds your brand identity with our free AI tool.',
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
        title="Etsy Shop Bio Generator - Create a Compelling Shop Story"
        description="Create a compelling Etsy shop bio that attracts customers and builds your brand identity with our free AI tool."
        keywords="Etsy shop bio generator, Etsy shop description, Etsy about section, shop story, brand identity"
        schema={shopBioSchema}
      />
      
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
            className="w-full bg-[#F1641E] text-white p-3 rounded-md hover:bg-[#e05a1c] transition font-medium flex justify-center items-center"
            disabled={loading}
          >
            {loading && !regenerating ? (
              <>
                <LoadingSpinner size="sm" color="#ffffff" />
                <span className="ml-2">Generating...</span>
              </>
            ) : (
              'Generate Shop Bio'
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
                  {loading && regenerating ? 'Regenerating Shop Bio...' : 'Generated Shop Bio:'}
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
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Tip: Etsy allows up to 5,000 characters for your shop bio. Edit this text to add more personal details that make your shop unique.</p>
                {!loading && (
                  <button 
                    onClick={() => handleSubmit()} 
                    className="mt-3 text-[#F1641E] hover:text-[#e05a1c] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate more shop bios
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
