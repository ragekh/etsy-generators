import React, { useState } from 'react';

/**
 * SEO Checklist Component
 * Provides an interactive checklist of SEO best practices for Etsy listings
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of checklist to display (e.g., 'title', 'description', 'keywords')
 * @returns {JSX.Element} - SEO Checklist component
 */
const SEOChecklist = ({ type = 'general' }) => {
  // Checklists organized by type
  const checklistsByType = {
    general: [
      { id: 'g1', text: 'Use all available attributes and categories' },
      { id: 'g2', text: 'Add high-quality photos from multiple angles' },
      { id: 'g3', text: 'Set competitive pricing' },
      { id: 'g4', text: 'Offer free shipping when possible' },
      { id: 'g5', text: 'Respond to customer messages promptly' }
    ],
    title: [
      { id: 't1', text: 'Include primary keywords at the beginning' },
      { id: 't2', text: 'Use all 140 characters available' },
      { id: 't3', text: 'Include product attributes (color, size, material)' },
      { id: 't4', text: 'Avoid special characters or excessive punctuation' },
      { id: 't5', text: 'Make it readable for humans, not just search engines' }
    ],
    description: [
      { id: 'd1', text: 'Include keywords not used in the title' },
      { id: 'd2', text: 'Specify dimensions and materials' },
      { id: 'd3', text: 'Describe the benefits, not just features' },
      { id: 'd4', text: 'Use formatting (paragraphs, bullet points) for readability' },
      { id: 'd5', text: 'Include shipping, customization, and return information' }
    ],
    keywords: [
      { id: 'k1', text: 'Use all 13 available tags' },
      { id: 'k2', text: 'Include multi-word phrases (long-tail keywords)' },
      { id: 'k3', text: 'Match tags to keywords in your title' },
      { id: 'k4', text: 'Include synonyms and related terms' },
      { id: 'k5', text: 'Update tags seasonally for holidays and trends' }
    ],
    'shop-name': [
      { id: 'sn1', text: 'Keep it short and memorable' },
      { id: 'sn2', text: 'Ensure it\'s easy to spell and pronounce' },
      { id: 'sn3', text: 'Check availability on social media platforms' },
      { id: 'sn4', text: 'Avoid trademark infringement' },
      { id: 'sn5', text: 'Consider including a keyword related to your products' }
    ],
    'shop-bio': [
      { id: 'sb1', text: 'Tell your brand story and mission' },
      { id: 'sb2', text: 'Highlight your unique selling proposition' },
      { id: 'sb3', text: 'Include keywords related to your products' },
      { id: 'sb4', text: 'Mention your production process or materials' },
      { id: 'sb5', text: 'Add a call to action (follow on social media, etc.)' }
    ],
    'customer-response': [
      { id: 'cr1', text: 'Address the customer by name' },
      { id: 'cr2', text: 'Respond to all questions asked' },
      { id: 'cr3', text: 'Keep a professional and friendly tone' },
      { id: 'cr4', text: 'Include your shop policies when relevant' },
      { id: 'cr5', text: 'End with a call to action or thank you' }
    ],
    promotion: [
      { id: 'p1', text: 'Include a clear offer (discount percentage, free shipping, etc.)' },
      { id: 'p2', text: 'Specify any minimum purchase requirements' },
      { id: 'p3', text: 'Add a clear expiration date to create urgency' },
      { id: 'p4', text: 'Make the coupon code easy to remember' },
      { id: 'p5', text: 'Highlight the value proposition, not just the discount' }
    ],
    announcement: [
      { id: 'a1', text: 'Keep it concise and to the point' },
      { id: 'a2', text: 'Include current promotions or sales' },
      { id: 'a3', text: 'Mention shipping timelines or production delays' },
      { id: 'a4', text: 'Update seasonally or for holidays' },
      { id: 'a5', text: 'Include a call to action' }
    ]
  };
  
  // Get checklist for the current type, fallback to general checklist if type not found
  const checklist = checklistsByType[type] || checklistsByType.general;
  
  // State to track checked items
  const [checkedItems, setCheckedItems] = useState({});
  
  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Calculate progress
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = checklist.length > 0 ? Math.round((checkedCount / checklist.length) * 100) : 0;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 my-4">
      <h3 className="font-semibold text-gray-800 mb-3">SEO Checklist</h3>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-[#F1641E] h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        {progress}% complete ({checkedCount}/{checklist.length})
      </p>
      
      {/* Checklist items */}
      <ul className="space-y-2">
        {checklist.map((item) => (
          <li key={item.id} className="flex items-start">
            <input
              type="checkbox"
              id={item.id}
              checked={!!checkedItems[item.id]}
              onChange={() => handleCheckboxChange(item.id)}
              className="mt-1 h-4 w-4 text-[#F1641E] rounded border-gray-300 focus:ring-[#F1641E]"
            />
            <label htmlFor={item.id} className="ml-2 text-sm text-gray-700 cursor-pointer">
              {item.text}
            </label>
          </li>
        ))}
      </ul>
      
      {progress === 100 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-700 font-medium">
            Great job! You've completed all the SEO best practices for this section.
          </p>
        </div>
      )}
    </div>
  );
};

export default SEOChecklist;