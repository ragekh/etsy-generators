/**
 * Sitemap Generator Script
 * 
 * This script generates a sitemap.xml file for the Etsy AI Generators website.
 * It includes all pages with their last modified date, change frequency, and priority.
 * 
 * Run with: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const baseUrl = 'https://etsy-ai-generators.com';
const outputPath = path.join(__dirname, '../public/sitemap.xml');
const currentDate = new Date().toISOString().split('T')[0];

// Define all pages with their metadata
const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/shop-name', priority: '0.9', changefreq: 'monthly' },
  { url: '/description', priority: '0.9', changefreq: 'monthly' },
  { url: '/keywords', priority: '0.9', changefreq: 'monthly' },
  { url: '/title', priority: '0.9', changefreq: 'monthly' },
  { url: '/customer-response', priority: '0.8', changefreq: 'monthly' },
  { url: '/shop-bio', priority: '0.8', changefreq: 'monthly' },
  { url: '/promotion', priority: '0.8', changefreq: 'monthly' },
  { url: '/announcement', priority: '0.8', changefreq: 'monthly' }
];

// Generate sitemap XML
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`)
  .join('\n')}
</urlset>`;

  return sitemap;
};

// Write sitemap to file
const writeSitemap = (sitemap) => {
  try {
    fs.writeFileSync(outputPath, sitemap);
    console.log(`Sitemap generated successfully at: ${outputPath}`);
  } catch (error) {
    console.error('Error writing sitemap:', error);
  }
};

// Execute
const sitemap = generateSitemap();
writeSitemap(sitemap);