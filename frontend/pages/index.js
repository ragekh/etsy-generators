import Link from 'next/link';
import {
  ShopNameIcon,
  DescriptionIcon,
  KeywordsIcon,
  TitleIcon,
  CustomerResponseIcon,
  ShopBioIcon,
  PromotionIcon,
  AnnouncementIcon,
  EtsyLogo
} from '../components/Icons';
import SEO from '../components/SEO';
import FAQSchema from '../components/FAQSchema';
import LocalBusinessSchema from '../components/LocalBusinessSchema';
import HowToSchema from '../components/HowToSchema';
import SEOTips from '../components/SEOTips';

export default function Home() {
  // FAQ data for the FAQ schema
  const faqs = [
    {
      question: "What are Etsy AI Generators?",
      answer: "Etsy AI Generators are free AI-powered tools designed to help Etsy sellers optimize their shops and listings. Our tools can generate shop names, product descriptions, keywords, listing titles, customer responses, shop bios, promotion text, and shop announcements."
    },
    {
      question: "Are these tools really free?",
      answer: "Yes, all our AI generators are completely free to use. There are no hidden fees or premium tiers."
    },
    {
      question: "How do I use these generators?",
      answer: "Simply select the generator you need, fill in the required information, and click the generate button. The AI will create optimized content for your Etsy shop in seconds."
    },
    {
      question: "Can I edit the generated content?",
      answer: "Absolutely! The AI provides a starting point, but you should always review and personalize the content to match your brand voice and specific products."
    },
    {
      question: "Will using these tools improve my Etsy sales?",
      answer: "While we can't guarantee specific results, our tools are designed to help optimize your Etsy listings for better visibility and conversion. Many sellers report improved performance after implementing AI-generated content."
    }
  ];
  
  // How-to data for the HowTo schema
  const howToSteps = [
    {
      name: "Choose a Generator",
      text: "Select the appropriate generator for your needs from our homepage.",
      image: "https://etsy-ai-generators.com/images/step1.jpg",
      url: "https://etsy-ai-generators.com/#generators"
    },
    {
      name: "Enter Your Information",
      text: "Fill in the required fields with details about your product or shop.",
      image: "https://etsy-ai-generators.com/images/step2.jpg",
      url: "https://etsy-ai-generators.com/#input"
    },
    {
      name: "Generate Content",
      text: "Click the generate button and wait a few seconds for the AI to create your content.",
      image: "https://etsy-ai-generators.com/images/step3.jpg",
      url: "https://etsy-ai-generators.com/#generate"
    },
    {
      name: "Review and Edit",
      text: "Review the generated content, make any necessary edits, and copy it to your Etsy shop.",
      image: "https://etsy-ai-generators.com/images/step4.jpg",
      url: "https://etsy-ai-generators.com/#review"
    }
  ];
  
  return (
    <>
      <SEO
        title="Etsy AI Generators - Boost Your Etsy Shop with AI Tools"
        description="Generate Etsy shop names, product descriptions, keywords, and listing titles with our free AI tools. Optimize your Etsy store for success!"
        keywords="Etsy AI tools, Etsy shop name generator, Etsy product description, Etsy keywords, Etsy SEO, Etsy shop optimization"
        ogImage="https://etsy-ai-generators.com/og-image.jpg"
        ogImageAlt="Etsy AI Generators - Free tools for Etsy sellers"
      />
      
      {/* Additional schema markup for rich results */}
      <FAQSchema faqs={faqs} />
      
      <LocalBusinessSchema
        images={[]} // Removed references to non-existent images
      />
      
      <HowToSchema
        name="How to Use Etsy AI Generators"
        description="Learn how to use our free AI tools to optimize your Etsy shop and listings"
        image="" // Removed reference to non-existent image
        steps={howToSteps.map(step => ({
          ...step,
          image: "" // Removed references to non-existent images
        }))}
        totalTime="PT5M"
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Etsy AI Generators</h1>
        <p className="text-lg mb-10 text-center max-w-2xl mx-auto px-4">
          Boost your Etsy shop with our free AI-powered tools. Create unique shop names, compelling product descriptions, optimized keywords, and catchy listing titles in seconds!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <Link href="/shop-name" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#F1641E] mb-3">
              <ShopNameIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Shop Name Generator</h2>
            <p className="text-gray-600 text-sm">Create a unique and memorable name for your Etsy shop</p>
          </Link>
          
          <Link href="/description" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#F1641E] mb-3">
              <DescriptionIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Product Description Generator</h2>
            <p className="text-gray-600 text-sm">Write compelling product descriptions that sell</p>
          </Link>
          
          <Link href="/keywords" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#F1641E] mb-3">
              <KeywordsIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Product Keywords Generator</h2>
            <p className="text-gray-600 text-sm">Find the perfect keywords to improve visibility</p>
          </Link>
          
          <Link href="/title" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#F1641E] mb-3">
              <TitleIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Listing Title Generator</h2>
            <p className="text-gray-600 text-sm">Create catchy, SEO-friendly listing titles</p>
          </Link>

          <Link href="/customer-response" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#F1641E] mb-3">
              <CustomerResponseIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Customer Response Generator</h2>
            <p className="text-gray-600 text-sm">Craft professional responses to customer inquiries and reviews</p>
          </Link>
          
          <Link href="/shop-bio" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#F1641E] mb-3">
              <ShopBioIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Shop Bio Generator</h2>
            <p className="text-gray-600 text-sm">Create a compelling shop bio to attract customers</p>
          </Link>
          
          <Link href="/promotion" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#F1641E] mb-3">
              <PromotionIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Promotion Text Generator</h2>
            <p className="text-gray-600 text-sm">Generate text for sales, discounts, or social media promotions</p>
          </Link>
          
          <Link href="/announcement" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col items-center">
            <div className="text-[#F1641E] mb-3">
              <AnnouncementIcon />
            </div>
            <h2 className="text-xl font-semibold mb-2">Shop Announcement Generator</h2>
            <p className="text-gray-600 text-sm">Create announcements for shop updates and vacations</p>
          </Link>
        </div>
        
        <div className="mt-12 bg-[#FDEEE7] p-6 rounded-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Why Use Our AI Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4">
              <h3 className="font-semibold text-[#F1641E] mb-2">Save Time</h3>
              <p className="text-sm">Generate professional content in seconds instead of spending hours writing</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#F1641E] mb-2">Increase Sales</h3>
              <p className="text-sm">Optimize your listings with SEO-friendly content that attracts more buyers</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#F1641E] mb-2">Stand Out</h3>
              <p className="text-sm">Create unique content that helps your shop stand out from competitors</p>
            </div>
          </div>
        </div>
        
        {/* SEO Statistics Section */}
        <div className="mt-12 bg-white border border-gray-200 p-6 rounded-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Etsy SEO Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F1641E] mb-2">61%</div>
              <p className="text-sm text-gray-600">of Etsy shoppers use search to find products</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F1641E] mb-2">44%</div>
              <p className="text-sm text-gray-600">higher conversion rate for optimized listings</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F1641E] mb-2">80%</div>
              <p className="text-sm text-gray-600">of clicks go to first page search results</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F1641E] mb-2">5.3x</div>
              <p className="text-sm text-gray-600">more traffic for shops with optimized content</p>
            </div>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-3">
              <strong>Effective SEO is crucial for Etsy success.</strong> With over 5.2 million active sellers on the platform, standing out requires strategic optimization. Etsy's algorithm considers keywords, listing quality, recency, and customer experience when ranking search results.
            </p>
            <p className="mb-3">
              Shops that regularly update their listings with relevant keywords, high-quality images, and compelling descriptions see significantly higher visibility and sales. Our AI generators help you implement these best practices effortlessly, giving you a competitive edge in the marketplace.
            </p>
            <p>
              Whether you're just starting your Etsy journey or looking to boost an established shop, our tools provide the optimization you need to reach more potential customers and increase your conversion rate.
            </p>
          </div>
        </div>
        
        {/* SEO Tips Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">Etsy SEO Tips</h2>
          <p className="text-center text-gray-600 mb-6">Implement these strategies to improve your shop's visibility</p>
          
          {/* Import and use the SEOTips component */}
          <SEOTips category="general" />
        </div>
      </div>
    </>
  );
}