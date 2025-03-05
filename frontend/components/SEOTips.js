import React, { useState, useEffect } from 'react';

/**
 * Dynamic SEO Tips Component
 * Displays rotating SEO tips relevant to Etsy sellers
 * 
 * @param {Object} props - Component props
 * @param {string} props.category - Category of tips to display (e.g., 'title', 'description', 'keywords')
 * @param {boolean} props.autoRotate - Whether to automatically rotate tips
 * @param {number} props.interval - Interval in milliseconds for auto-rotation
 * @returns {JSX.Element} - SEO Tips component
 */
const SEOTips = ({ category = 'general', autoRotate = true, interval = 10000 }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  // Tips organized by category
  const tipsByCategory = {
    general: [
      {
        title: "Use Long-Tail Keywords",
        content: "Specific, longer phrases (e.g., 'handmade ceramic coffee mug' vs 'mug') attract more qualified buyers."
      },
      {
        title: "Update Listings Regularly",
        content: "Etsy's algorithm favors active shops. Refresh your listings periodically to boost visibility."
      },
      {
        title: "Optimize Images",
        content: "Use high-quality images with descriptive filenames and alt text containing relevant keywords."
      },
      {
        title: "Mobile Optimization",
        content: "Over 60% of Etsy traffic comes from mobile devices. Ensure your listings look good on small screens."
      },
      {
        title: "Analyze Competitors",
        content: "Study successful shops in your niche to understand effective keywords and descriptions."
      }
    ],
    title: [
      {
        title: "Front-Load Keywords",
        content: "Place your most important keywords at the beginning of your title for better SEO impact."
      },
      {
        title: "Avoid Keyword Stuffing",
        content: "Make titles readable and natural while incorporating keywords strategically."
      },
      {
        title: "Include Attributes",
        content: "Mention color, size, material, or style in your title to help buyers find your items."
      },
      {
        title: "Use All 140 Characters",
        content: "Maximize your title length to include more relevant keywords and details."
      },
      {
        title: "Match Search Intent",
        content: "Think about what buyers would type when looking for your product and include those terms."
      }
    ],
    description: [
      {
        title: "Tell a Story",
        content: "Share the inspiration behind your product or how it's made to create an emotional connection."
      },
      {
        title: "Highlight Benefits",
        content: "Explain how your product solves problems or improves the buyer's life, not just its features."
      },
      {
        title: "Use Bullet Points",
        content: "Break up text with bullet points to highlight key features and make information scannable."
      },
      {
        title: "Include Dimensions",
        content: "Always specify size, weight, and measurements to set clear expectations."
      },
      {
        title: "Add Secondary Keywords",
        content: "Include related terms and synonyms that didn't fit in your title."
      }
    ],
    keywords: [
      {
        title: "Research Trending Terms",
        content: "Use tools like Marmalead or eRank to find popular search terms in your niche."
      },
      {
        title: "Use All 13 Tags",
        content: "Always use all available tags to maximize your visibility in search results."
      },
      {
        title: "Match Tags to Title",
        content: "Ensure your tags include the same keywords used in your title for consistency."
      },
      {
        title: "Avoid Single-Word Tags",
        content: "Multi-word tags (e.g., 'birthday gift') are more specific and effective than single words."
      },
      {
        title: "Update Seasonally",
        content: "Adjust your tags for holidays, seasons, and current trends to stay relevant."
      }
    ],
    'shop-name': [
      {
        title: "Keep It Memorable",
        content: "Choose a name that's easy to spell, pronounce, and remember for better word-of-mouth marketing."
      },
      {
        title: "Consider SEO",
        content: "Including a keyword related to your products can help with search visibility."
      },
      {
        title: "Check Availability",
        content: "Ensure your shop name is available across social media platforms for consistent branding."
      },
      {
        title: "Avoid Trademark Issues",
        content: "Research to make sure your chosen name doesn't infringe on existing trademarks."
      },
      {
        title: "Future-Proof Your Name",
        content: "Choose a name that allows for growth and expansion of your product line."
      }
    ],
    'shop-bio': [
      {
        title: "Share Your Story",
        content: "Authentic personal stories create connections with customers and differentiate your brand."
      },
      {
        title: "Highlight Expertise",
        content: "Mention your experience, skills, or credentials to build trust with potential buyers."
      },
      {
        title: "Explain Your Process",
        content: "Describing how you create your products adds value and justifies pricing."
      },
      {
        title: "Include Your Values",
        content: "Mention sustainability, ethical sourcing, or charitable contributions if relevant."
      },
      {
        title: "Add a Call to Action",
        content: "Encourage visitors to browse your shop, follow on social media, or join your mailing list."
      }
    ],
    'customer-response': [
      {
        title: "Respond Promptly",
        content: "Quick responses improve customer satisfaction and can lead to better reviews."
      },
      {
        title: "Personalize Messages",
        content: "Address customers by name and reference specific details from their inquiry or order."
      },
      {
        title: "Stay Professional",
        content: "Maintain a professional tone even when dealing with difficult customers or negative feedback."
      },
      {
        title: "Offer Solutions",
        content: "When addressing issues, focus on solutions rather than explanations or excuses."
      },
      {
        title: "Follow Up",
        content: "Check in with customers after resolving issues to ensure their satisfaction."
      }
    ],
    promotion: [
      {
        title: "Create Urgency",
        content: "Use time-limited offers to encourage immediate purchases ('Limited time only', 'Ends Sunday')."
      },
      {
        title: "Highlight Value",
        content: "Focus on the value customers receive rather than just the discount percentage."
      },
      {
        title: "Target Specific Audiences",
        content: "Tailor promotions to specific customer segments (e.g., first-time buyers, repeat customers)."
      },
      {
        title: "Cross-Promote",
        content: "Encourage additional purchases by offering discounts on related items or bundles."
      },
      {
        title: "Track Performance",
        content: "Monitor which promotions generate the most sales to refine your marketing strategy."
      }
    ],
    announcement: [
      {
        title: "Keep It Current",
        content: "Update your shop announcement regularly to reflect current information and promotions."
      },
      {
        title: "Be Concise",
        content: "Keep announcements brief and to the point for maximum impact."
      },
      {
        title: "Include Important Dates",
        content: "Clearly state order-by dates for holidays, shop vacation dates, or restock timelines."
      },
      {
        title: "Highlight Promotions",
        content: "Feature current sales, discount codes, or special offers prominently."
      },
      {
        title: "Set Expectations",
        content: "Include information about processing times, shipping methods, or potential delays."
      }
    ]
  };
  
  // Get tips for the current category, fallback to general tips if category not found
  const tips = tipsByCategory[category] || tipsByCategory.general;
  
  // Auto-rotate tips if enabled
  useEffect(() => {
    if (!autoRotate) return;
    
    const rotationTimer = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, interval);
    
    return () => clearInterval(rotationTimer);
  }, [autoRotate, interval, tips.length]);
  
  // Get current tip
  const currentTip = tips[currentTipIndex];
  
  // Handle manual navigation
  const goToPreviousTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
  };
  
  const goToNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };
  
  return (
    <div className="bg-[#F9F5FF] border border-[#E9D7FE] rounded-lg p-4 my-4">
      <div className="flex items-start">
        <div className="text-[#9E77ED] mr-3 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#6941C6] text-sm mb-1">SEO TIP: {currentTip.title}</h3>
          <p className="text-sm text-gray-700">{currentTip.content}</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-3">
        <div className="text-xs text-gray-500">
          Tip {currentTipIndex + 1} of {tips.length}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousTip}
            className="text-[#6941C6] hover:text-[#9E77ED] transition"
            aria-label="Previous tip"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToNextTip}
            className="text-[#6941C6] hover:text-[#9E77ED] transition"
            aria-label="Next tip"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SEOTips;