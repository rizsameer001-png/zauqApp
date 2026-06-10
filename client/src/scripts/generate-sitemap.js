// scripts/generate-sitemap.js
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://zauqapp-site.onrender.com';

async function fetchData(endpoint) {
  try {
    const response = await axios.get(`${baseUrl}/api/${endpoint}?limit=5000`);
    return response.data.data || [];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    return [];
  }
}

function generateSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-poems.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-authors.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-books.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blogs.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;
}

function generatePagesSitemap() {
  const pages = [
    '', 'explore', 'poems', 'authors', 'books', 'audio', 'videos', 'about', 'blogs'
  ];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  pages.forEach(page => {
    if (page) {
      sitemap += `
  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

function generateDynamicSitemap(items, urlPath, priority = 0.6) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  items.forEach(item => {
    const slug = item.slug || item._id;
    const lastmod = item.updatedAt ? new Date(item.updatedAt).toISOString() : new Date().toISOString();
    
    sitemap += `
  <url>
    <loc>${baseUrl}/${urlPath}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

async function generateSitemaps() {
  console.log('🚀 Starting sitemap generation...');
  
  // Fetch all dynamic content
  const [poems, authors, books, blogs] = await Promise.all([
    fetchData('poems'),
    fetchData('authors'),
    fetchData('books'),
    fetchData('blogs')
  ]);
  
  console.log(`📚 Found: ${poems.length} poems, ${authors.length} authors, ${books.length} books, ${blogs.length} blogs`);
  
  // Create public directory if it doesn't exist
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write sitemaps to public directory
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemapIndex());
  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), generatePagesSitemap());
  fs.writeFileSync(path.join(publicDir, 'sitemap-poems.xml'), generateDynamicSitemap(poems, 'poem', 0.6));
  fs.writeFileSync(path.join(publicDir, 'sitemap-authors.xml'), generateDynamicSitemap(authors, 'author', 0.7));
  fs.writeFileSync(path.join(publicDir, 'sitemap-books.xml'), generateDynamicSitemap(books, 'book', 0.6));
  fs.writeFileSync(path.join(publicDir, 'sitemap-blogs.xml'), generateDynamicSitemap(blogs, 'blog', 0.6));
  
  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1

Host: ${baseUrl}`;
  
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  
  console.log('✅ Sitemaps generated successfully in /public directory!');
}

// Run the generation
generateSitemaps().catch(console.error);