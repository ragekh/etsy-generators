import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { AnnouncementIcon } from '../components/Icons';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import CharacterCounter from '../components/CharacterCounter';
import SEO from '../components/SEO';

export default function AnnouncementGenerator() {
  const [announcementType, setAnnouncementType] = useState('');
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
      const response = await axios.post('http://localhost:5001/api/generate-announcement', {
        announcementType,
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
  const announcementSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Etsy Shop Announcement Generator',
    'url': 'https://etsy-ai-generators.com/announcement',
    'description': 'Create clear, professional shop announcements for your Etsy store with our free AI tool. Perfect for vacations, restocks, and updates.',
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
        title="Etsy Shop Announcement Generator - Keep Customers Informed"
        description="Create clear, professional shop announcements for your Etsy store with our free AI tool. Perfect for vacations, restocks, and updates."
        keywords="Etsy shop announcement, Etsy vacation mode, Etsy shop update"
        schema={announcementSchema}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-[#FDEEE7] rounded-full mb-4">
            <div className="text-[#F1641E]">
              <AnnouncementIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Etsy Shop Announcement Generator</h1>
          <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
            Create clear, professional announcements for your shop updates, vacation mode, restocks, and more.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
          <label className="block mb-2 font-semibold">Announcement Type:</label>
          <select
            value={announcementType}
            onChange={(e) => setAnnouncementType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            required
          >
            <option value="">Select type...</option>
            <option value="shop vacation">Shop Vacation</option>
            <option value="processing time update">Processing Time Update</option>
            <option value="restock announcement">Restock Announcement</option>
            <option value="shipping delay">Shipping Delay</option>
            <option value="new collection launch">New Collection Launch</option>
            <option value="holiday closure">Holiday Closure</option>
            <option value="order cutoff date">Order Cutoff Date</option>
            <option value="policy update">Policy Update</option>
            <option value="shop milestone">Shop Milestone</option>
          </select>
          
          <label className="block mb-2 font-semibold">Announcement Details:</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#F1641E] focus:border-[#F1641E] outline-none transition"
            rows="3"
            placeholder="e.g., shop closed March 10-15 for family vacation, all orders placed after March 8 will ship on March 16"
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
              'Generate Announcement'
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
                  {loading && regenerating ? 'Regenerating Announcement...' : 'Generated Announcement:'}
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
                <p>Tip: Place this announcement in your shop's announcement section and consider also adding it to your shop policies or item descriptions if relevant.</p>
                {!loading && (
                  <button
                    onClick={() => handleSubmit()}
                    className="mt-3 text-[#F1641E] hover:text-[#e05a1c] font-medium transition flex items-center"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generate more announcements
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