import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Base website information for structured data
  const websiteData = {
    name: 'Etsy AI Generators',
    url: 'https://etsy-ai-generators.com',
    description: 'Free AI tools to help Etsy sellers optimize their shops and listings with AI-generated content.',
    logo: 'https://etsy-ai-generators.com/logo.png'
  };
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: websiteData.name,
              url: websiteData.url,
              description: websiteData.description,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${websiteData.url}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: websiteData.name,
              url: websiteData.url,
              logo: websiteData.logo,
              description: websiteData.description,
              sameAs: [
                'https://twitter.com/etsyaigenerators',
                'https://facebook.com/etsyaigenerators'
              ]
            })
          }}
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;