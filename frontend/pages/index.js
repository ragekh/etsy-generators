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
        images={[
          "https://etsy-ai-generators.com/images/logo.png",
          "https://etsy-ai-generators.com/images/homepage.jpg"
        ]}
      />
      
      <HowToSchema
        name="How to Use Etsy AI Generators"
        description="Learn how to use our free AI tools to optimize your Etsy shop and listings"
        image="https://etsy-ai-generators.com/images/how-to-use.jpg"
        steps={howToSteps}
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
      </div>
    </>
  );
}