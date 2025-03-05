import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { TitleIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import CharacterCounter from '../components/CharacterCounter';
import SEO from '../components/SEO';
import SEOTips from '../components/SEOTips';
import SEOChecklist from '../components/SEOChecklist';

export default function TitleGenerator() {
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-title', { 
        productName, 
        features,
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
  const titleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Etsy Listing Title Generator',
    'url': 'https://etsy-ai-generators.com/title',
    'description': 'Create catchy, SEO-friendly Etsy listing titles with our free AI tool. Enter your product name and features for instant results!',
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
        title="Etsy Listing Title Generator - Catchy Titles with AI"
        description="Create catchy, SEO-friendly Etsy listing titles with our free AI tool. Enter your product name and features for instant results!"
        keywords="Etsy listing title generator, AI Etsy titles, Etsy SEO listing, product title optimization, Etsy shop tools"
        schema={titleSchema}
      />
      
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
            className="w-full bg-[#F1641E] text-white p-3 rounded-md hover:bg-[#e05a1c] transition font-medium flex justify-center items-center"
            disabled={loading}
          >
            {loading && !regenerating ? (
              <>
                <LoadingSpinner size="sm" color="#ffffff" />
                <span className="ml-2">Generating...</span>
              </>
            ) : (
              'Generate Title'
            )}
          </button>
        </form>
        
        {/* SEO Tips Section - Always visible */}
        <div className="mb-6">
          <SEOTips category="title" />
        </div>
        
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
                  {loading && regenerating ? 'Regenerating Title...' : 'Generated Title:'}
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
                <CharacterCounter text={loading && regenerating ? previousResult : result} limit={140} className="mt-2" />
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Tip: Etsy titles have a 140-character limit. Focus on including your most important keywords near the beginning.</p>
                {!loading && (
                  <button 
                    onClick={() => handleSubmit()} 
                    className="mt-3 text-[#F1641E] hover:text-[#e05a1c] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate more titles
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* SEO Checklist - Shown after results are generated */}
        {result && !loading && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Listing Title SEO Checklist</h2>
            <p className="text-gray-600 mb-4">
              Use this checklist to ensure your listing title is optimized for Etsy's search algorithm:
            </p>
            <SEOChecklist type="title" />
            
            <div className="mt-8 bg-[#F0F9FF] border border-[#B9E6FE] rounded-lg p-4">
              <h3 className="font-semibold text-[#026AA2] mb-2">Why Your Listing Title Matters</h3>
              <p className="text-sm text-gray-700 mb-3">
                Your listing title is the most important element for Etsy SEO. Here's why it's crucial to get it right:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Etsy gives more weight to words at the beginning of your title</li>
                <li>Titles have a 140-character limit - use it strategically</li>
                <li>Buyers scan titles quickly, so clarity is essential</li>
                <li>Exact keyword matches rank higher in search results</li>
                <li>Titles should match your tags for maximum SEO impact</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                According to Etsy's own research, listings with optimized titles receive up to 64% more views than those with generic titles. A well-crafted title balances SEO keywords with readability to attract both search engines and human buyers.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}