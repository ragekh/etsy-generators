import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-[#F1641E] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-white/90 transition">
            Etsy AI Generators
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/shop-name"
              className={`hover:text-white/90 transition ${router.pathname === '/shop-name' ? 'font-bold' : ''}`}
            >
              Shop Names
            </Link>
            <Link
              href="/description"
              className={`hover:text-white/90 transition ${router.pathname === '/description' ? 'font-bold' : ''}`}
            >
              Descriptions
            </Link>
            <Link
              href="/keywords"
              className={`hover:text-white/90 transition ${router.pathname === '/keywords' ? 'font-bold' : ''}`}
            >
              Keywords
            </Link>
            <Link
              href="/title"
              className={`hover:text-white/90 transition ${router.pathname === '/title' ? 'font-bold' : ''}`}
            >
              Titles
            </Link>
            <Link
              href="/customer-response"
              className={`hover:text-white/90 transition ${router.pathname === '/customer-response' ? 'font-bold' : ''}`}
            >
              Responses
            </Link>
            <Link
              href="/shop-bio"
              className={`hover:text-white/90 transition ${router.pathname === '/shop-bio' ? 'font-bold' : ''}`}
            >
              Shop Bio
            </Link>
            <Link
              href="/promotion"
              className={`hover:text-white/90 transition ${router.pathname === '/promotion' ? 'font-bold' : ''}`}
            >
              Promotions
            </Link>
            <Link
              href="/announcement"
              className={`hover:text-white/90 transition ${router.pathname === '/announcement' ? 'font-bold' : ''}`}
            >
              Announcements
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-[#232347] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© {new Date().getFullYear()} Etsy AI Generators. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="text-sm hover:text-[#F1641E] transition">
                Home
              </Link>
              <Link href="/shop-name" className="text-sm hover:text-[#F1641E] transition">
                Shop Names
              </Link>
              <Link href="/description" className="text-sm hover:text-[#F1641E] transition">
                Descriptions
              </Link>
              <Link href="/keywords" className="text-sm hover:text-[#F1641E] transition">
                Keywords
              </Link>
              <Link href="/title" className="text-sm hover:text-[#F1641E] transition">
                Titles
              </Link>
              <Link href="/customer-response" className="text-sm hover:text-[#F1641E] transition">
                Responses
              </Link>
              <Link href="/shop-bio" className="text-sm hover:text-[#F1641E] transition">
                Shop Bio
              </Link>
              <Link href="/promotion" className="text-sm hover:text-[#F1641E] transition">
                Promotions
              </Link>
              <Link href="/announcement" className="text-sm hover:text-[#F1641E] transition">
                Announcements
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}