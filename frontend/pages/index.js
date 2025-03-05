import Link from 'next/link';
import Head from 'next/head';
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

export default function Home() {
  return (
    <>
      <Head>
        <title>Etsy AI Generators - Boost Your Etsy Shop with AI Tools</title>
        <meta
          name="description"
          content="Generate Etsy shop names, product descriptions, keywords, and listing titles with our free AI tools. Optimize your Etsy store for success!"
        />
        <meta name="keywords" content="Etsy AI tools, Etsy shop name generator, Etsy product description, Etsy keywords, Etsy SEO, Etsy shop optimization" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://etsy-ai-generators.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Etsy AI Generators - Boost Your Etsy Shop with AI Tools" />
        <meta property="og:description" content="Generate Etsy shop names, product descriptions, keywords, and listing titles with our free AI tools. Optimize your Etsy store for success!" />
        <meta property="og:url" content="https://etsy-ai-generators.com/" />
        <meta property="og:image" content="https://etsy-ai-generators.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Etsy AI Generators - Boost Your Etsy Shop with AI Tools" />
        <meta name="twitter:description" content="Generate Etsy shop names, product descriptions, keywords, and listing titles with our free AI tools." />
        <meta name="twitter:image" content="https://etsy-ai-generators.com/twitter-image.jpg" />
        
        {/* Schema.org markup for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              'name': 'Etsy AI Generators',
              'url': 'https://etsy-ai-generators.com/',
              'description': 'Generate Etsy shop names, product descriptions, keywords, and listing titles with our free AI tools.',
              'applicationCategory': 'BusinessApplication',
              'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'USD'
              },
              'operatingSystem': 'Web'
            })
          }}
        />
        
        {/* Breadcrumbs schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': 'Home',
                  'item': 'https://etsy-ai-generators.com/'
                }
              ]
            })
          }}
        />
      </Head>
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