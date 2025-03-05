import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * SEO component for consistent metadata across pages
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type
 * @param {Object} props.schema - JSON-LD schema object
 * @returns {JSX.Element} - SEO component with metadata
 */
const SEO = ({
  title = 'Etsy AI Generators',
  description = 'Generate Etsy shop names, product descriptions, keywords, and listing titles with our free AI tools.',
  keywords = 'Etsy AI tools, Etsy shop name generator, Etsy product description, Etsy keywords',
  ogImage = 'https://etsy-ai-generators.com/og-image.jpg',
  ogType = 'website',
  schema = null,
}) => {
  const router = useRouter();
  const canonicalUrl = `https://etsy-ai-generators.com${router.asPath}`;
  const pageTitle = `${title} | Etsy AI Generators`;
  
  // Generate breadcrumbs schema
  const generateBreadcrumbsSchema = () => {
    const path = router.asPath;
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://etsy-ai-generators.com/'
      }
    ];
    
    if (path !== '/') {
      const pathSegments = path.split('/').filter(Boolean);
      let currentPath = '';
      
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        breadcrumbs.push({
          '@type': 'ListItem',
          'position': index + 2,
          'name': segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          'item': `https://etsy-ai-generators.com${currentPath}`
        });
      });
    }
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs
    };
  };
  
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Etsy AI Generators" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Breadcrumbs schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbsSchema())
        }}
      />
      
      {/* Custom schema if provided */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      )}
    </Head>
  );
};

export default SEO;