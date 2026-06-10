// client/src/pages/public/SitemapPage.jsx
import { useEffect } from 'react';
import axios from 'axios';

const SitemapPage = () => {
  useEffect(() => {
    const generateSitemap = async () => {
      try {
        // Fetch dynamic content from API
        const [poemsRes, authorsRes, booksRes, blogsRes] = await Promise.all([
          axios.get('/api/poems?limit=5000&isPublished=true'),
          axios.get('/api/authors?limit=5000'),
          axios.get('/api/books?limit=5000&isPublished=true'),
          axios.get('/api/blogs?limit=5000&isPublished=true')
        ]);

        const poems = poemsRes.data?.data || [];
        const authors = authorsRes.data?.data || [];
        const books = booksRes.data?.data || [];
        const blogs = blogsRes.data?.data || [];

        const baseUrl = 'https://zauqapp-site.onrender.com';
        const currentUrl = window.location.pathname;
        
        // Generate appropriate sitemap based on URL
        let xmlContent = '';
        
        if (currentUrl === '/sitemap.xml') {
          xmlContent = generateSitemapIndex(baseUrl);
        } else if (currentUrl === '/sitemap-pages.xml') {
          xmlContent = generatePagesSitemap(baseUrl);
        } else if (currentUrl === '/sitemap-poems.xml') {
          xmlContent = generateDynamicSitemap(poems, baseUrl, 'poem', 0.6);
        } else if (currentUrl === '/sitemap-authors.xml') {
          xmlContent = generateDynamicSitemap(authors, baseUrl, 'author', 0.7);
        } else if (currentUrl === '/sitemap-books.xml') {
          xmlContent = generateDynamicSitemap(books, baseUrl, 'book', 0.6);
        } else if (currentUrl === '/sitemap-blogs.xml') {
          xmlContent = generateDynamicSitemap(blogs, baseUrl, 'blog', 0.6);
        } else {
          xmlContent = '<?xml version="1.0" encoding="UTF-8"?><error>Invalid sitemap request</error>';
        }
        
        // Replace the entire document with XML content
        document.documentElement.innerHTML = xmlContent;
        document.contentType = 'application/xml';
      } catch (error) {
        console.error('Error generating sitemap:', error);
        document.documentElement.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><error>Unable to generate sitemap</error>';
      }
    };
    
    generateSitemap();
  }, []);
  
  return null;
};

// Helper function to generate sitemap index
function generateSitemapIndex(baseUrl) {
  const today = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-poems.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-authors.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-books.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blogs.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// Helper function to generate pages sitemap
function generatePagesSitemap(baseUrl) {
  const pages = [
    { url: '', priority: 1.0, changefreq: 'daily' },
    { url: 'explore', priority: 0.9, changefreq: 'daily' },
    { url: 'poetry', priority: 0.9, changefreq: 'daily' },
    { url: 'authors', priority: 0.9, changefreq: 'daily' },
    { url: 'books', priority: 0.9, changefreq: 'daily' },
    { url: 'audio', priority: 0.8, changefreq: 'daily' },
    { url: 'videos', priority: 0.8, changefreq: 'daily' },
    { url: 'blog', priority: 0.8, changefreq: 'daily' },
    { url: 'about', priority: 0.7, changefreq: 'weekly' },
    { url: 'subscription-plans', priority: 0.7, changefreq: 'weekly' }
  ];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  pages.forEach(page => {
    const lastmod = new Date().toISOString();
    xml += `
  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });
  
  xml += `
</urlset>`;
  return xml;
}

// Helper function to generate dynamic sitemap for poems, authors, books, blogs
function generateDynamicSitemap(items, baseUrl, path, priority) {
  if (!items || items.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
</urlset>`;
  }
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  items.forEach(item => {
    const slug = item.slug || item._id;
    const lastmod = item.updatedAt ? new Date(item.updatedAt).toISOString() : new Date().toISOString();
    
    xml += `
  <url>
    <loc>${baseUrl}/${path}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });
  
  xml += `
</urlset>`;
  return xml;
}

export default SitemapPage;