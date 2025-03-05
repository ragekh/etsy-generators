import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      
      {/* Header */}
      <header className="bg-[var(--etsy-orange)] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-white/90 transition" aria-label="Etsy AI Generators Home">
            Etsy AI Generators
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Desktop navigation */}
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
        
        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-[var(--etsy-orange-dark)] py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Link
                href="/shop-name"
                className={`block py-2 px-4 rounded hover:bg-[var(--etsy-orange)] transition ${router.pathname === '/shop-name' ? 'font-bold bg-[var(--etsy-orange)]' : ''}`}
              >
                Shop Names
              </Link>
              <Link
                href="/description"
                className={`block py-2 px-4 rounded hover:bg-[var(--etsy-orange)] transition ${router.pathname === '/description' ? 'font-bold bg-[var(--etsy-orange)]' : ''}`}
              >
                Descriptions
              </Link>
              <Link
                href="/keywords"
                className={`block py-2 px-4 rounded hover:bg-[var(--etsy-orange)] transition ${router.pathname === '/keywords' ? 'font-bold bg-[var(--etsy-orange)]' : ''}`}
              >
                Keywords
              </Link>
              <Link
                href="/title"
                className={`block py-2 px-4 rounded hover:bg-[var(--etsy-orange)] transition ${router.pathname === '/title' ? 'font-bold bg-[var(--etsy-orange)]' : ''}`}
              >
                Titles
              </Link>
              <Link
                href="/customer-response"
                className={`block py-2 px-4 rounded hover:bg-[var(--etsy-orange)] transition ${router.pathname === '/customer-response' ? 'font-bold bg-[var(--etsy-orange)]' : ''}`}
              >
                Responses
              </Link>
              <Link
                href="/shop-bio"
                className={`block py-2 px-4 rounded hover:bg-[var(--etsy-orange)] transition ${router.pathname === '/shop-bio' ? 'font-bold bg-[var(--etsy-orange)]' : ''}`}
              >
                Shop Bio
              </Link>
              <Link
                href="/promotion"
                className={`block py-2 px-4 rounded hover:bg-[var(--etsy-orange)] transition ${router.pathname === '/promotion' ? 'font-bold bg-[var(--etsy-orange)]' : ''}`}
              >
                Promotions
              </Link>
              <Link
                href="/announcement"
                className={`block py-2 px-4 rounded hover:bg-[var(--etsy-orange)] transition ${router.pathname === '/announcement' ? 'font-bold bg-[var(--etsy-orange)]' : ''}`}
              >
                Announcements
              </Link>
            </div>
          </nav>
        )}
      </header>
      
      {/* Main content */}
      <main id="main-content" className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-[var(--etsy-navy)] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© {new Date().getFullYear()} Etsy AI Generators. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="text-sm hover:text-[var(--etsy-orange)] transition">
                Home
              </Link>
              <Link href="/shop-name" className="text-sm hover:text-[var(--etsy-orange)] transition">
                Shop Names
              </Link>
              <Link href="/description" className="text-sm hover:text-[var(--etsy-orange)] transition">
                Descriptions
              </Link>
              <Link href="/keywords" className="text-sm hover:text-[var(--etsy-orange)] transition">
                Keywords
              </Link>
              <Link href="/title" className="text-sm hover:text-[var(--etsy-orange)] transition">
                Titles
              </Link>
              <Link href="/customer-response" className="text-sm hover:text-[var(--etsy-orange)] transition">
                Responses
              </Link>
              <Link href="/shop-bio" className="text-sm hover:text-[var(--etsy-orange)] transition">
                Shop Bio
              </Link>
              <Link href="/promotion" className="text-sm hover:text-[var(--etsy-orange)] transition">
                Promotions
              </Link>
              <Link href="/announcement" className="text-sm hover:text-[var(--etsy-orange)] transition">
                Announcements
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}