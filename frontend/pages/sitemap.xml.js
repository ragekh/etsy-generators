export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const pages = ['/', '/shop-name', '/description', '/keywords', '/title'];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => `
          <url>
            <loc>https://yourdomain.com${page}</loc>
            <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>${page === '/' ? '1.0' : '0.8'}</priority>
          </url>
        `)
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}